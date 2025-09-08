#!/bin/bash

# Hospital Website AWS Deployment Script
# This script deploys the hospital website to AWS ECS with Fargate

set -e

# Configuration
PROJECT_NAME="hospital-website"
AWS_REGION="us-east-1"
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
DOMAIN_NAME="yourdomain.com"  # Replace with your domain
CERTIFICATE_ARN="arn:aws:acm:region:account:certificate/certificate-id"  # Replace with your certificate ARN

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

# Check prerequisites
check_prerequisites() {
    log "Checking prerequisites..."
    
    # Check if AWS CLI is installed
    if ! command -v aws &> /dev/null; then
        error "AWS CLI is not installed. Please install it first."
    fi
    
    # Check if Docker is installed
    if ! command -v docker &> /dev/null; then
        error "Docker is not installed. Please install it first."
    fi
    
    # Check AWS credentials
    if ! aws sts get-caller-identity &> /dev/null; then
        error "AWS credentials not configured. Please run 'aws configure'."
    fi
    
    log "Prerequisites check completed."
}

# Create ECR repositories
create_ecr_repositories() {
    log "Creating ECR repositories..."
    
    # Create backend repository
    aws ecr create-repository \
        --repository-name ${PROJECT_NAME}-backend \
        --region ${AWS_REGION} \
        --image-scanning-configuration scanOnPush=true \
        --encryption-configuration encryptionType=AES256 || warn "Backend repository might already exist"
    
    # Create frontend repository
    aws ecr create-repository \
        --repository-name ${PROJECT_NAME}-frontend \
        --region ${AWS_REGION} \
        --image-scanning-configuration scanOnPush=true \
        --encryption-configuration encryptionType=AES256 || warn "Frontend repository might already exist"
    
    log "ECR repositories created/verified."
}

# Build and push Docker images
build_and_push_images() {
    log "Building and pushing Docker images..."
    
    # Login to ECR
    aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
    
    # Build and push backend image
    log "Building backend image..."
    cd backend
    docker build -t ${PROJECT_NAME}-backend .
    docker tag ${PROJECT_NAME}-backend:latest ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${PROJECT_NAME}-backend:latest
    docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${PROJECT_NAME}-backend:latest
    cd ..
    
    # Build and push frontend image
    log "Building frontend image..."
    cd frontend
    docker build -t ${PROJECT_NAME}-frontend .
    docker tag ${PROJECT_NAME}-frontend:latest ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${PROJECT_NAME}-frontend:latest
    docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${PROJECT_NAME}-frontend:latest
    cd ..
    
    log "Docker images built and pushed successfully."
}

# Deploy infrastructure using CloudFormation
deploy_infrastructure() {
    log "Deploying infrastructure with CloudFormation..."
    
    # Generate a random password for the database
    DB_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-25)
    
    aws cloudformation deploy \
        --template-file aws/cloudformation-infrastructure.yaml \
        --stack-name ${PROJECT_NAME}-infrastructure \
        --parameter-overrides \
            ProjectName=${PROJECT_NAME} \
            DomainName=${DOMAIN_NAME} \
            CertificateArn=${CERTIFICATE_ARN} \
            DatabasePassword=${DB_PASSWORD} \
        --capabilities CAPABILITY_IAM \
        --region ${AWS_REGION}
    
    log "Infrastructure deployed successfully."
    
    # Store database password in AWS Secrets Manager
    aws secretsmanager create-secret \
        --name "${PROJECT_NAME}/db-credentials" \
        --description "Database credentials for ${PROJECT_NAME}" \
        --secret-string "{\"username\":\"postgres\",\"password\":\"${DB_PASSWORD}\"}" \
        --region ${AWS_REGION} || \
    aws secretsmanager update-secret \
        --secret-id "${PROJECT_NAME}/db-credentials" \
        --secret-string "{\"username\":\"postgres\",\"password\":\"${DB_PASSWORD}\"}" \
        --region ${AWS_REGION}
}

# Create ECS services
create_ecs_services() {
    log "Creating ECS services..."
    
    # Get infrastructure outputs
    VPC_ID=$(aws cloudformation describe-stacks \
        --stack-name ${PROJECT_NAME}-infrastructure \
        --query 'Stacks[0].Outputs[?OutputKey==`VPCId`].OutputValue' \
        --output text \
        --region ${AWS_REGION})
    
    CLUSTER_NAME=$(aws cloudformation describe-stacks \
        --stack-name ${PROJECT_NAME}-infrastructure \
        --query 'Stacks[0].Outputs[?OutputKey==`ECSClusterName`].OutputValue' \
        --output text \
        --region ${AWS_REGION})
    
    # Update task definitions with actual account ID and region
    sed "s/ACCOUNT_ID/${AWS_ACCOUNT_ID}/g; s/REGION/${AWS_REGION}/g" aws/ecs-task-definition-backend.json > /tmp/backend-task-def.json
    sed "s/ACCOUNT_ID/${AWS_ACCOUNT_ID}/g; s/REGION/${AWS_REGION}/g" aws/ecs-task-definition-frontend.json > /tmp/frontend-task-def.json
    
    # Register task definitions
    BACKEND_TASK_DEF_ARN=$(aws ecs register-task-definition \
        --cli-input-json file:///tmp/backend-task-def.json \
        --region ${AWS_REGION} \
        --query 'taskDefinition.taskDefinitionArn' \
        --output text)
    
    FRONTEND_TASK_DEF_ARN=$(aws ecs register-task-definition \
        --cli-input-json file:///tmp/frontend-task-def.json \
        --region ${AWS_REGION} \
        --query 'taskDefinition.taskDefinitionArn' \
        --output text)
    
    # Get subnet and security group IDs
    PRIVATE_SUBNETS=$(aws ec2 describe-subnets \
        --filters "Name=vpc-id,Values=${VPC_ID}" "Name=tag:Name,Values=*private*" \
        --query 'Subnets[*].SubnetId' \
        --output text \
        --region ${AWS_REGION})
    
    PUBLIC_SUBNETS=$(aws ec2 describe-subnets \
        --filters "Name=vpc-id,Values=${VPC_ID}" "Name=tag:Name,Values=*public*" \
        --query 'Subnets[*].SubnetId' \
        --output text \
        --region ${AWS_REGION})
    
    ECS_SECURITY_GROUP=$(aws ec2 describe-security-groups \
        --filters "Name=vpc-id,Values=${VPC_ID}" "Name=group-name,Values=*ecs*" \
        --query 'SecurityGroups[0].GroupId' \
        --output text \
        --region ${AWS_REGION})
    
    # Get target group ARNs
    BACKEND_TG_ARN=$(aws elbv2 describe-target-groups \
        --names ${PROJECT_NAME}-backend-tg \
        --query 'TargetGroups[0].TargetGroupArn' \
        --output text \
        --region ${AWS_REGION})
    
    FRONTEND_TG_ARN=$(aws elbv2 describe-target-groups \
        --names ${PROJECT_NAME}-frontend-tg \
        --query 'TargetGroups[0].TargetGroupArn' \
        --output text \
        --region ${AWS_REGION})
    
    # Create backend service
    aws ecs create-service \
        --cluster ${CLUSTER_NAME} \
        --service-name ${PROJECT_NAME}-backend \
        --task-definition ${BACKEND_TASK_DEF_ARN} \
        --desired-count 2 \
        --launch-type FARGATE \
        --network-configuration "awsvpcConfiguration={subnets=[${PRIVATE_SUBNETS// /,}],securityGroups=[${ECS_SECURITY_GROUP}],assignPublicIp=DISABLED}" \
        --load-balancers "targetGroupArn=${BACKEND_TG_ARN},containerName=hospital-backend,containerPort=8000" \
        --region ${AWS_REGION} || warn "Backend service might already exist"
    
    # Create frontend service
    aws ecs create-service \
        --cluster ${CLUSTER_NAME} \
        --service-name ${PROJECT_NAME}-frontend \
        --task-definition ${FRONTEND_TASK_DEF_ARN} \
        --desired-count 2 \
        --launch-type FARGATE \
        --network-configuration "awsvpcConfiguration={subnets=[${PUBLIC_SUBNETS// /,}],securityGroups=[${ECS_SECURITY_GROUP}],assignPublicIp=ENABLED}" \
        --load-balancers "targetGroupArn=${FRONTEND_TG_ARN},containerName=hospital-frontend,containerPort=80" \
        --region ${AWS_REGION} || warn "Frontend service might already exist"
    
    log "ECS services created successfully."
}

# Configure Route 53 (if domain is managed by Route 53)
configure_route53() {
    log "Configuring Route 53..."
    
    # Get CloudFront distribution DNS name
    CLOUDFRONT_DNS=$(aws cloudformation describe-stacks \
        --stack-name ${PROJECT_NAME}-infrastructure \
        --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontDNSName`].OutputValue' \
        --output text \
        --region ${AWS_REGION})
    
    # This assumes you have a hosted zone for your domain
    # You'll need to modify this based on your specific Route 53 setup
    warn "Please manually configure Route 53 to point ${DOMAIN_NAME} to ${CLOUDFRONT_DNS}"
    warn "Or use the AWS Console to create the necessary DNS records."
}

# Main deployment function
main() {
    log "Starting deployment of ${PROJECT_NAME} to AWS..."
    
    check_prerequisites
    create_ecr_repositories
    build_and_push_images
    deploy_infrastructure
    
    # Wait for infrastructure to be ready
    log "Waiting for infrastructure to be ready..."
    sleep 60
    
    create_ecs_services
    configure_route53
    
    log "Deployment completed successfully!"
    log "Your hospital website should be available at: https://${DOMAIN_NAME}"
    log "Backend admin panel: https://${DOMAIN_NAME}/admin/"
}

# Run the deployment
main "$@"
