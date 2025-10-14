#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Production Setup Script for Hospital Website
Generates secure keys and creates environment files
"""

import secrets
import string
import os

def generate_secret_key(length=50):
    """Generate a secure Django secret key"""
    return secrets.token_urlsafe(length)

def generate_api_key(length=32):
    """Generate a secure API key"""
    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(length))

def create_backend_env():
    """Create backend .env file with secure keys"""
    secret_key = generate_secret_key()
    api_key_1 = f"hospital-api-{generate_api_key(16)}"
    api_key_2 = f"frontend-api-{generate_api_key(16)}"
    
    env_content = f"""# Django Settings
DEBUG=False
SECRET_KEY={secret_key}
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com

# Database
DATABASE_URL=postgresql://user:password@host:port/dbname

# API Security
API_KEY_1={api_key_1}
API_KEY_2={api_key_2}

# Admin Security (optional - uncomment for IP restriction)
# ADMIN_ALLOWED_IPS=192.168.1.100,10.0.0.5

# AWS Settings
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_STORAGE_BUCKET_NAME=your-bucket-name
AWS_S3_REGION_NAME=us-east-1

# Email Settings
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password

# CORS Settings
CORS_ALLOW_ALL_ORIGINS=False
CORS_ALLOW_CREDENTIALS=True
"""
    
    with open('backend/.env', 'w') as f:
        f.write(env_content)
    
    return api_key_1

def create_frontend_env(api_key):
    """Create frontend .env file"""
    env_content = f"""# API Configuration
REACT_APP_API_URL=https://your-api-domain.com/api
REACT_APP_API_KEY={api_key}
"""
    
    with open('frontend/.env', 'w') as f:
        f.write(env_content)

def main():
    print("Setting up production environment...")
    
    # Create backend .env
    api_key = create_backend_env()
    print("Backend .env created")
    
    # Create frontend .env
    create_frontend_env(api_key)
    print("Frontend .env created")
    
    print("\nProduction setup complete!")
    print("\nNext steps:")
    print("1. Update backend/.env with your actual database and AWS credentials")
    print("2. Update frontend/.env with your actual API domain")
    print("3. Run: cd backend && python manage.py createcachetable")
    print("4. Run: cd backend && python manage.py migrate")
    print("5. Run: cd backend && python manage.py createsuperuser")
    print("6. Deploy to your hosting platform")
    
    print(f"\nYour API key: {api_key}")
    print("Keep this key secure and don't share it publicly!")

if __name__ == "__main__":
    main()