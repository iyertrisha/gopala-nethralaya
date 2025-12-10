
import logging
import time
from django.core.cache import cache
from django.http import JsonResponse
from django.conf import settings
from django.contrib.auth import logout
from django.utils.deprecation import MiddlewareMixin
from django.contrib.auth.signals import user_login_failed
from django.dispatch import receiver

logger = logging.getLogger('hospital.security')

class SecurityLoggingMiddleware:
    """Log security-related events"""
    
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Log suspicious activities
        self.log_suspicious_activity(request)
        
        response = self.get_response(request)
        return response

    def log_suspicious_activity(self, request):
        """Log potentially suspicious activities"""
        user_ip = self.get_client_ip(request)
        
        # Log admin access attempts by non-staff users
        if request.path.startswith('/admin') and request.user.is_authenticated and not request.user.is_staff:
            logger.warning(f"Unauthorized admin access attempt from {user_ip} by user {request.user.username}")
        
        # Log multiple rapid requests (potential DoS)
        cache_key = f"request_count_{user_ip}"
        request_count = cache.get(cache_key, 0)
        if request_count > 100:  # More than 100 requests per minute
            logger.warning(f"High request rate from {user_ip}: {request_count} requests/minute")
        
        cache.set(cache_key, request_count + 1, 60)  # Reset every minute

    def get_client_ip(self, request):
        """Get the real client IP address"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip


class LoginAttemptMiddleware:
    """Track and limit login attempts"""
    
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Check if user is locked out before processing login
        if request.path == '/api/auth/login/' and request.method == 'POST':
            user_ip = self.get_client_ip(request)
            if self.is_locked_out(user_ip):
                logger.warning(f"Login attempt from locked out IP: {user_ip}")
                return JsonResponse({
                    'error': 'Too many failed login attempts. Please try again later.'
                }, status=429)
        
        response = self.get_response(request)
        return response

    def get_client_ip(self, request):
        """Get the real client IP address"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

    def is_locked_out(self, ip):
        """Check if IP is currently locked out"""
        cache_key = f"lockout_{ip}"
        return cache.get(cache_key, False)

    def record_failed_attempt(self, ip):
        """Record a failed login attempt"""
        cache_key = f"failed_attempts_{ip}"
        attempts = cache.get(cache_key, 0) + 1
        cache.set(cache_key, attempts, settings.LOCKOUT_DURATION)
        
        if attempts >= settings.MAX_LOGIN_ATTEMPTS:
            # Lock out the IP
            lockout_key = f"lockout_{ip}"
            cache.set(lockout_key, True, settings.LOCKOUT_DURATION)
            logger.warning(f"IP {ip} locked out after {attempts} failed login attempts")

    def clear_failed_attempts(self, ip):
        """Clear failed attempts after successful login"""
        cache_key = f"failed_attempts_{ip}"
        cache.delete(cache_key)


# Signal handler for failed login attempts
@receiver(user_login_failed)
def handle_failed_login(sender, credentials, request, **kwargs):
    """Handle failed login attempts"""
    if request:
        middleware = LoginAttemptMiddleware(None)
        ip = middleware.get_client_ip(request)
        middleware.record_failed_attempt(ip)
        logger.warning(f"Failed login attempt from {ip} for user: {credentials.get('username', 'unknown')}")


class InputSanitizationMiddleware:
    """Sanitize user inputs"""
    
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Sanitize POST data
        if request.method == 'POST' and hasattr(request, 'POST'):
            self.sanitize_data(request.POST)
        
        # Sanitize GET parameters
        if hasattr(request, 'GET'):
            self.sanitize_data(request.GET)
        
        response = self.get_response(request)
        return response

    def sanitize_data(self, data):
        """Basic input sanitization"""
        import bleach
        
        for key, value in data.items():
            if isinstance(value, str):
                # Remove potentially dangerous HTML/JS
                cleaned_value = bleach.clean(value, strip=True)
                # Log if sanitization occurred
                if cleaned_value != value:
                    logger.warning(f"Sanitized input for field '{key}': {value[:100]}...")
                data[key] = cleaned_value









