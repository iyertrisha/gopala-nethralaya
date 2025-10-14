# AWS Deployment Guide for Hospital Website

## Overview

This guide will help you deploy your hospital website to AWS using:
- **ECS Fargate** for containerized applications
- **RDS PostgreSQL** for the database
- **Application Load Balancer** for traffic distribution
- **CloudFront** for CDN and SSL termination
- **Route 53** for DNS management
- **S3** for static file storage

## Prerequisites

### 1. AWS Account Setup
- AWS Account with appropriate permissions
- AWS CLI installed and configured
- Docker installed on your local machine

### 2. Domain Setup
- A domain name (e.g., `yourhospital.com`)
- SSL certificate in AWS Certificate Manager (ACM)

## Step-by-Step Deployment

### Step 1: Configure AWS CLI

```bash
# Install AWS CLI (if not already installed)
# Windows: Download from AWS website
# macOS: brew install awscli
# Linux: sudo apt-get install awscli

# Configure AWS credentials
aws configure
# Enter your Access Key ID, Secret Access Key, Region (us-east-1), and output format (json)
```

### Step 2: Prepare Your Domain and SSL Certificate

1. **Get an SSL Certificate:**
   - Go to AWS Certificate Manager (ACM) in the AWS Console
   - Request a public certificate for your domain
   - Validate the certificate (DNS or email validation)
   - Note the certificate ARN

2. **Update Configuration:**
   - Edit `aws/deploy-script.sh`
   - Replace `yourdomain.com` with your actual domain
   - Replace the certificate ARN with your actual certificate ARN

### Step 3: Update Environment Variables

Create a production `.env` file:

```bash
# backend/.env.production
SECRET_KEY=your-super-secure-secret-key-for-production
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com

# Database Configuration
DB_ENGINE=django.db.backends.postgresql
DB_NAME=hospital_db
DB_USER=postgres
DB_PASSWORD=will-be-set-by-aws-secrets-manager
DB_HOST=will-be-set-by-ecs-task-definition
DB_PORT=5432

# AWS Configuration
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_STORAGE_BUCKET_NAME=will-be-created-by-cloudformation
AWS_S3_REGION_NAME=us-east-1

# Frontend Configuration
REACT_APP_API_URL=https://yourdomain.com/api
REACT_APP_BACKEND_URL=https://yourdomain.com

# Production Domain
PRODUCTION_DOMAIN=yourdomain.com
PRODUCTION_API_URL=https://yourdomain.com/api
PRODUCTION_BACKEND_URL=https://yourdomain.com

# Security Settings
CORS_ALLOW_ALL_ORIGINS=False
CORS_ALLOW_CREDENTIALS=True
```

### Step 4: Update Docker Files for Production

Update `backend/Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create non-root user
RUN adduser --disabled-password --gecos '' appuser && chown -R appuser:appuser /app
USER appuser

# Expose port
EXPOSE 8000

# Command to run the application
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "3", "hospital_website.wsgi:application"]
```

Update `frontend/Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### Step 5: Update CloudFormation Parameters

Edit `aws/cloudformation-infrastructure.yaml` and update the parameters section:

```yaml
Parameters:
  ProjectName:
    Type: String
    Default: hospital-website
    Description: Name of the project
  
  DomainName:
    Type: String
    Default: yourdomain.com  # Replace with your domain
    Description: Domain name for the website
  
  CertificateArn:
    Type: String
    Default: arn:aws:acm:us-east-1:123456789012:certificate/your-cert-id  # Replace with your certificate ARN
    Description: ARN of the SSL certificate in ACM
  
  DatabasePassword:
    Type: String
    NoEcho: true
    MinLength: 8
    Description: Password for RDS PostgreSQL database
```

### Step 6: Update ECS Task Definitions

Update `aws/ecs-task-definition-backend.json`:

```json
{
  "family": "hospital-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "1024",
  "memory": "2048",
  "executionRoleArn": "arn:aws:iam::ACCOUNT_ID:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::ACCOUNT_ID:role/ecsTaskRole",
  "containerDefinitions": [
    {
      "name": "hospital-backend",
      "image": "ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/hospital-backend:latest",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 8000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "DEBUG",
          "value": "False"
        },
        {
          "name": "ALLOWED_HOSTS",
          "value": "yourdomain.com,www.yourdomain.com"
        },
        {
          "name": "DB_HOST",
          "value": "hospital-db.cluster-xyz.region.rds.amazonaws.com"
        },
        {
          "name": "DB_NAME",
          "value": "hospital_db"
        },
        {
          "name": "DB_PORT",
          "value": "5432"
        }
      ],
      "secrets": [
        {
          "name": "SECRET_KEY",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:hospital/django-secret-key"
        },
        {
          "name": "DB_USER",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:hospital/db-credentials:username"
        },
        {
          "name": "DB_PASSWORD",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:hospital/db-credentials:password"
        },
        {
          "name": "AWS_ACCESS_KEY_ID",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:hospital/aws-credentials:access_key"
        },
        {
          "name": "AWS_SECRET_ACCESS_KEY",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:hospital/aws-credentials:secret_key"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/hospital-backend",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "healthCheck": {
        "command": [
          "CMD-SHELL",
          "curl -f http://localhost:8000/api/hospital-info/ || exit 1"
        ],
        "interval": 30,
        "timeout": 5,
        "retries": 3,
        "startPeriod": 60
      }
    }
  ]
}
```

### Step 7: Run the Deployment Script

```bash
# Make the script executable
chmod +x aws/deploy-script.sh

# Run the deployment
./aws/deploy-script.sh
```

### Step 8: Manual Steps After Deployment

1. **Create Admin User:**
   ```bash
   # Connect to your ECS task and run migrations
   aws ecs execute-command \
     --cluster hospital-website-cluster \
     --task YOUR_TASK_ID \
     --container hospital-backend \
     --interactive \
     --command "/bin/bash"
   
   # Inside the container
   python manage.py migrate
   python manage.py create_admin --username admin --email admin@yourdomain.com --password your_secure_password
   ```

2. **Configure Route 53:**
   - Go to Route 53 in AWS Console
   - Create a hosted zone for your domain
   - Create an A record pointing to your CloudFront distribution

3. **Set up Monitoring:**
   - Enable CloudWatch logs
   - Set up CloudWatch alarms
   - Configure health checks

## Post-Deployment Configuration

### 1. Database Setup
- The RDS instance will be created automatically
- Run migrations through ECS exec command
- Create admin user using the management command

### 2. Static Files
- Static files will be served from S3
- Media files will be stored in S3
- CloudFront will cache static content

### 3. Security
- All traffic is encrypted with SSL
- Database is in private subnets
- Security groups restrict access
- WAF can be added for additional protection

## Monitoring and Maintenance

### 1. CloudWatch Logs
- Application logs: `/ecs/hospital-backend`
- Access logs: ALB access logs
- Error logs: CloudWatch error logs

### 2. Scaling
- ECS services auto-scale based on CPU/memory
- RDS can be scaled up as needed
- CloudFront provides global CDN

### 3. Backup
- RDS automated backups
- S3 versioning for static files
- ECR image scanning for security

## Troubleshooting

### Common Issues

1. **Certificate Issues:**
   - Ensure certificate is in us-east-1 region
   - Verify domain validation

2. **Database Connection:**
   - Check security groups
   - Verify RDS endpoint

3. **Static Files:**
   - Check S3 bucket permissions
   - Verify CloudFront distribution

4. **ECS Tasks:**
   - Check CloudWatch logs
   - Verify task definition
   - Check health checks

### Useful Commands

```bash
# Check ECS services
aws ecs list-services --cluster hospital-website-cluster

# Check task status
aws ecs list-tasks --cluster hospital-website-cluster

# View logs
aws logs tail /ecs/hospital-backend --follow

# Update service
aws ecs update-service --cluster hospital-website-cluster --service hospital-website-backend --force-new-deployment
```

## Cost Optimization

1. **Use Spot Instances** for non-critical workloads
2. **Set up Auto Scaling** to scale down during low usage
3. **Use S3 Intelligent Tiering** for static files
4. **Enable CloudFront caching** to reduce origin requests
5. **Monitor costs** with AWS Cost Explorer

## Security Best Practices

1. **Use IAM roles** instead of access keys
2. **Enable VPC Flow Logs** for network monitoring
3. **Use AWS WAF** for additional protection
4. **Regular security updates** for containers
5. **Enable AWS Config** for compliance monitoring

Your hospital website will be fully deployed and secured on AWS! 🚀
