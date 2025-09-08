# Security Configuration

## Environment Variables Setup

This project uses environment variables to store sensitive information. Follow these steps to secure your application:

### 1. Create Environment File

Create a `.env` file in the `backend/` directory with the following variables:

```bash
# Django Settings
SECRET_KEY=your-super-secret-key-change-this-in-production-make-it-very-long-and-random
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1,*.amazonaws.com

# Database Configuration
DB_ENGINE=django.db.backends.postgresql
DB_NAME=hospital_db
DB_USER=postgres
DB_PASSWORD=your-secure-database-password-here
DB_HOST=localhost
DB_PORT=5432

# Redis Configuration
REDIS_URL=redis://localhost:6379/1

# AWS Configuration (for production)
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_STORAGE_BUCKET_NAME=your-s3-bucket-name
AWS_S3_REGION_NAME=us-east-1

# Frontend Configuration
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_BACKEND_URL=http://localhost:8000

# Production Domain (for deployment)
PRODUCTION_DOMAIN=yourdomain.com
PRODUCTION_API_URL=https://yourdomain.com/api
PRODUCTION_BACKEND_URL=https://yourdomain.com

# Email Configuration (if needed)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password

# Security Settings
CORS_ALLOW_ALL_ORIGINS=True
CORS_ALLOW_CREDENTIALS=True
```

### 2. Security Best Practices

1. **Never commit `.env` files to version control**
2. **Use strong, unique passwords** for all services
3. **Generate a secure SECRET_KEY** using Django's built-in generator:
   ```bash
   python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
   ```
4. **Use different passwords for development and production**
5. **Enable HTTPS in production**
6. **Regularly rotate API keys and passwords**

### 3. Production Deployment

For production deployment:
1. Set `DEBUG=False`
2. Use strong, unique passwords
3. Configure proper `ALLOWED_HOSTS`
4. Set up SSL certificates
5. Use AWS Secrets Manager or similar for sensitive data
6. Enable security headers and HTTPS redirects

### 4. Database Security

- Use strong database passwords
- Enable SSL connections in production
- Restrict database access to application servers only
- Regular backups with encryption

### 5. AWS Security

- Use IAM roles instead of access keys when possible
- Rotate access keys regularly
- Use least privilege principle
- Enable CloudTrail logging
- Use AWS Secrets Manager for sensitive data

## Important Notes

- The `.env` file is already added to `.gitignore`
- All sensitive data has been moved from code to environment variables
- Security headers are automatically enabled in production mode
- CORS settings are configurable via environment variables
