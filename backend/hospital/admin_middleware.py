import logging
from django.http import HttpResponseForbidden
from django.conf import settings

logger = logging.getLogger('hospital.security')

class AdminSecurityMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Log all admin access attempts
        if request.path.startswith('/secure-admin-2024-xyz/'):
            ip = self.get_client_ip(request)
            user = request.user if request.user.is_authenticated else 'Anonymous'
            logger.warning(f"Admin access attempt: {user} from {ip}")
            
            # Optional: IP whitelist for admin
            if not settings.DEBUG:
                allowed_ips = getattr(settings, 'ADMIN_ALLOWED_IPS', [])
                if allowed_ips and ip not in allowed_ips:
                    logger.critical(f"Blocked admin access from unauthorized IP: {ip}")
                    return HttpResponseForbidden("Access denied")
        
        response = self.get_response(request)
        return response
    
    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip