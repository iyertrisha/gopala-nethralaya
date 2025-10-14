from django.utils.deprecation import MiddlewareMixin

class DisableCSRFForAPIMiddleware(MiddlewareMixin):
    """
    Disable CSRF protection for all API endpoints.
    API endpoints are protected by API key authentication instead.
    """
    
    def process_request(self, request):
        if request.path.startswith('/api/'):
            setattr(request, '_dont_enforce_csrf_checks', True)
        return None
