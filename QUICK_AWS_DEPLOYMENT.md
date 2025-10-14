# 🚀 Quick AWS Deployment - 3 Steps Only!

## Why App Runner?
- **Zero infrastructure management** - AWS handles everything
- **Automatic scaling** - scales to zero when not used
- **Built-in load balancing** - no ALB setup needed
- **Automatic HTTPS** - SSL certificates included
- **Pay only when used** - starts at $0.007/hour
- **Deploy from GitHub** - automatic deployments

## Step 1: Prepare Your Code (5 minutes)

### 1.1 Update Docker Compose for Production
```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  backend:
    build: ./backend
    environment:
      - DEBUG=False
      - SECRET_KEY=your-super-secret-key-here
      - DB_ENGINE=django.db.backends.sqlite3
      - DB_NAME=db.sqlite3
      - ALLOWED_HOSTS=your-app-name.region.awsapprunner.com
    ports:
      - "8000:8000"
    command: >
      sh -c "
        python manage.py migrate &&
        python manage.py collectstatic --noinput &&
        gunicorn --bind 0.0.0.0:8000 hospital_website.wsgi:application
      "
```

### 1.2 Create Simple Dockerfile for App Runner
```dockerfile
# Dockerfile (in root directory)
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ .

# Create non-root user
RUN adduser --disabled-password --gecos '' appuser && chown -R appuser:appuser /app
USER appuser

# Expose port
EXPOSE 8000

# Command to run
CMD ["sh", "-c", "python manage.py migrate && python manage.py collectstatic --noinput && gunicorn --bind 0.0.0.0:8000 hospital_website.wsgi:application"]
```

### 1.3 Update Settings for App Runner
```python
# backend/hospital_website/settings.py
import os
from decouple import config

# ... existing code ...

# Database - Use SQLite for simplicity
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# Static files
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Security for production
DEBUG = False
ALLOWED_HOSTS = ['*']  # App Runner will handle this

# ... rest of your settings ...
```

## Step 2: Push to GitHub (2 minutes)

```bash
# In your project directory
git add .
git commit -m "Ready for AWS App Runner deployment"
git push origin main
```

## Step 3: Deploy with App Runner (5 minutes)

### 3.1 Go to AWS App Runner Console
1. Open [AWS App Runner Console](https://console.aws.amazon.com/apprunner/)
2. Click "Create service"

### 3.2 Configure Service
1. **Source**: Choose "Source code repository"
2. **Connect to GitHub**: Authorize AWS to access your repo
3. **Repository**: Select your `hospital-website` repository
4. **Branch**: `main`
5. **Configuration file**: Use default (it will auto-detect Dockerfile)

### 3.3 Service Settings
1. **Service name**: `hospital-website`
2. **Virtual CPU**: 0.25 vCPU (minimum)
3. **Virtual memory**: 0.5 GB (minimum)
4. **Environment variables**: Add these:
   ```
   SECRET_KEY=your-super-secret-key-here
   DEBUG=False
   ALLOWED_HOSTS=*
   ```

### 3.4 Deploy
1. Click "Create & deploy"
2. Wait 5-10 minutes for deployment
3. Get your URL: `https://your-app-name.region.awsapprunner.com`

## That's It! 🎉

Your hospital website is now live on AWS with:
- ✅ Automatic HTTPS
- ✅ Auto-scaling
- ✅ Zero maintenance
- ✅ Cost: ~$5-10/month
- ✅ Custom domain support (optional)

## Optional: Add Custom Domain (5 minutes)

1. **In App Runner Console:**
   - Go to your service
   - Click "Custom domains"
   - Add your domain
   - Follow DNS instructions

2. **Update CORS settings:**
   ```python
   CORS_ALLOWED_ORIGINS = [
       "https://yourdomain.com",
   ]
   ```

## Optional: Add Database (10 minutes)

If you need PostgreSQL instead of SQLite:

1. **Create RDS Instance:**
   - Go to RDS Console
   - Create PostgreSQL instance (free tier available)
   - Note the endpoint

2. **Update Environment Variables in App Runner:**
   ```
   DB_ENGINE=django.db.backends.postgresql
   DB_NAME=hospital_db
   DB_USER=postgres
   DB_PASSWORD=your-password
   DB_HOST=your-rds-endpoint.region.rds.amazonaws.com
   DB_PORT=5432
   ```

## Cost Breakdown

- **App Runner**: $0.007/hour + $0.000014/vCPU-second + $0.000002/GB-second
- **RDS (optional)**: $0.017/hour for db.t3.micro (free tier available)
- **Total**: ~$5-15/month depending on usage

## Why This is Better Than Full AWS Setup

| Full AWS | App Runner |
|----------|------------|
| 2-3 hours setup | 15 minutes |
| Complex infrastructure | Zero infrastructure |
| $50-100/month | $5-15/month |
| Manual scaling | Auto-scaling |
| SSL management | Automatic SSL |
| Load balancer setup | Built-in |

## Troubleshooting

### Common Issues:
1. **Build fails**: Check Dockerfile syntax
2. **App won't start**: Check environment variables
3. **Database errors**: Ensure migrations ran

### Useful Commands:
```bash
# Check logs in App Runner console
# View service details
# Monitor metrics
```

## Next Steps (Optional)

1. **Add monitoring**: CloudWatch (free)
2. **Add CDN**: CloudFront (if needed)
3. **Add backup**: RDS automated backups
4. **Add CI/CD**: GitHub Actions

---

**Total time: 15 minutes vs 2-3 hours for full AWS setup!** 🚀
