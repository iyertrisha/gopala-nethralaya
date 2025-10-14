# 🔐 Production Security Guide

## Quick Setup

1. **Run the setup script:**
   ```bash
   python setup-production.py
   ```

2. **Deploy with the script:**
   ```bash
   # Windows
   deploy-production.bat
   
   # Linux/Mac
   chmod +x deploy-production.sh
   ./deploy-production.sh
   ```

## Security Features Implemented

### ✅ Admin Panel Security
- **Hidden URL**: Admin panel moved from `/admin/` to `/secure-admin-2024-xyz/`
- **Access Logging**: All admin access attempts are logged
- **IP Restriction**: Optional IP whitelist (uncomment in .env)
- **Session Security**: Enhanced session settings

### ✅ API Security
- **API Key Authentication**: All API endpoints require valid API key
- **Rate Limiting**: Prevents abuse with IP-based rate limiting
- **Input Validation**: Sanitizes all user inputs
- **CSRF Protection**: Cross-site request forgery protection

### ✅ Rate Limits Applied
- **Appointments**: 5 requests per minute
- **Contact Forms**: 3 requests per minute
- **General API**: 20 requests per minute
- **Admin Dashboard**: 10 requests per minute

### ✅ Security Logging
- Failed login attempts tracked and logged
- Suspicious activity monitoring
- Admin access attempts logged
- Rate limit violations logged

## Environment Configuration

### Backend (.env)
```env
DEBUG=False
SECRET_KEY=your-generated-secret-key
API_KEY_1=your-generated-api-key
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://yourdomain.com/api
REACT_APP_API_KEY=your-generated-api-key
```

## Testing Security

### Test Admin Security
```bash
# Should return 404
curl https://yourdomain.com/admin/

# Should require login
curl https://yourdomain.com/secure-admin-2024-xyz/
```

### Test API Security
```bash
# Should fail without API key
curl https://yourdomain.com/api/appointments/

# Should work with API key
curl -H "X-API-Key: your-api-key" https://yourdomain.com/api/appointments/
```

### Test Rate Limiting
```bash
# Make multiple rapid requests to test rate limiting
for i in {1..10}; do
  curl -H "X-API-Key: your-api-key" https://yourdomain.com/api/appointments/
done
```

## Production Checklist

- [ ] Environment files created with secure keys
- [ ] Database credentials updated
- [ ] Domain configured in ALLOWED_HOSTS
- [ ] SSL certificate installed
- [ ] Admin superuser created
- [ ] Cache table created
- [ ] Static files collected
- [ ] Frontend built and deployed
- [ ] Security testing completed

## Important URLs

- **Admin Panel**: `https://yourdomain.com/secure-admin-2024-xyz/`
- **API Base**: `https://yourdomain.com/api/`
- **Frontend**: `https://yourdomain.com/`

## Security Monitoring

Check these log files regularly:
- `backend/logs/security.log` - Security events
- `backend/logs/django.log` - General application logs

## Emergency Response

If security breach suspected:
1. Change API keys immediately
2. Review security logs
3. Update admin URL if compromised
4. Enable IP restrictions
5. Force password reset for all users

## Support

For security issues or questions, review the logs and check the Django admin panel for suspicious activity.