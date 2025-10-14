from functools import wraps
from django.http import JsonResponse
from django.core.cache import cache
from django.conf import settings
import time
import logging

logger = logging.getLogger('hospital.security')

def api_key_required(view_func):
    """Simple API key authentication"""
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        api_key = request.headers.get('X-API-Key') or request.GET.get('api_key')
        valid_keys = getattr(settings, 'API_KEYS', ['hospital-api-key-2024'])
        
        if api_key not in valid_keys:
            ip = get_client_ip(request)
            logger.warning(f"Invalid API key attempt from {ip}: {api_key}")
            return JsonResponse({'error': 'Invalid API key'}, status=401)
        
        return view_func(request, *args, **kwargs)
    return wrapper

def rate_limit_ip(max_requests=10, time_window=60):
    """Simple rate limiting by IP"""
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(request, *args, **kwargs):
            ip = get_client_ip(request)
            cache_key = f'rate_limit_{ip}_{view_func.__name__}'
            
            requests = cache.get(cache_key, [])
            now = time.time()
            
            # Remove old requests
            requests = [req_time for req_time in requests if now - req_time < time_window]
            
            if len(requests) >= max_requests:
                logger.warning(f"Rate limit exceeded for {ip} on {view_func.__name__}")
                return JsonResponse({'error': 'Rate limit exceeded'}, status=429)
            
            requests.append(now)
            cache.set(cache_key, requests, time_window)
            
            return view_func(request, *args, **kwargs)
        return wrapper
    return decorator

def get_client_ip(request):
    """Get the real client IP address"""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip