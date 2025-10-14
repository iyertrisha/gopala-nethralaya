import logging
import bleach
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout as auth_logout
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.cache import never_cache
from django.utils.decorators import method_decorator
from django_ratelimit.decorators import ratelimit
from django.core.cache import cache
from django.conf import settings

from .auth_serializers import (
    UserRegistrationSerializer, 
    UserLoginSerializer, 
    UserSerializer
)
from .middleware import LoginAttemptMiddleware

logger = logging.getLogger('hospital.security')

def get_client_ip(request):
    """Get the real client IP address"""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

@method_decorator(ratelimit(key='ip', rate='5/m', method='POST'), name='post')
class UserRegistrationView(generics.CreateAPIView):
    """Register a new user with enhanced security"""
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
        # Sanitize input data
        sanitized_data = self.sanitize_input(request.data)
        
        serializer = self.get_serializer(data=sanitized_data)
        serializer.is_valid(raise_exception=True)
        
        # Additional password validation
        password = sanitized_data.get('password')
        try:
            validate_password(password)
        except ValidationError as e:
            return Response({'error': e.messages}, status=status.HTTP_400_BAD_REQUEST)
        
        user = serializer.save()
        
        # Log the registration
        logger.info(f"New user registered: {user.username} from IP {self.get_client_ip(request)}")
        
        return Response({
            'message': 'User registered successfully',
            'user': UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)
    
    def sanitize_input(self, data):
        """Sanitize user input"""
        sanitized = {}
        for key, value in data.items():
            if isinstance(value, str):
                sanitized[key] = bleach.clean(value.strip(), strip=True)
            else:
                sanitized[key] = value
        return sanitized
    
    def get_client_ip(self, request):
        """Get the real client IP address"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

@api_view(['POST'])
@permission_classes([AllowAny])
@ratelimit(key='ip', rate='10/m', method='POST')
@never_cache
def login_view(request):
    """Secure session-based login"""
    username = request.data.get('username', '').strip()
    password = request.data.get('password', '')
    
    if not username or not password:
        return Response({
            'error': 'Username and password are required'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    # Sanitize username
    username = bleach.clean(username, strip=True)
    
    # Check for account lockout
    client_ip = get_client_ip(request)
    middleware = LoginAttemptMiddleware(None)
    if middleware.is_locked_out(client_ip):
        logger.warning(f"Login attempt from locked out IP: {client_ip}")
        return Response({
            'error': 'Too many failed login attempts. Please try again later.'
        }, status=status.HTTP_429_TOO_MANY_REQUESTS)
    
    # Authenticate user
    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        if user.is_active:
            # Successful login
            login(request, user)
            
            # Clear failed attempts
            middleware.clear_failed_attempts(client_ip)
            
            # Log successful login
            logger.info(f"Successful login: {username} from IP {client_ip}")
            
            return Response({
                'message': 'Login successful',
                'user': UserSerializer(user).data
            }, status=status.HTTP_200_OK)
        else:
            logger.warning(f"Login attempt for inactive user: {username} from IP {client_ip}")
            return Response({
                'error': 'Account is disabled'
            }, status=status.HTTP_401_UNAUTHORIZED)
    else:
        # Failed login
        middleware.record_failed_attempt(client_ip)
        logger.warning(f"Failed login attempt: {username} from IP {client_ip}")
        
        return Response({
            'error': 'Invalid credentials'
        }, status=status.HTTP_401_UNAUTHORIZED)

class UserProfileView(generics.RetrieveUpdateAPIView):
    """Get and update user profile"""
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    """Change user password"""
    user = request.user
    old_password = request.data.get('old_password')
    new_password = request.data.get('new_password')
    
    if not old_password or not new_password:
        return Response(
            {'error': 'Both old_password and new_password are required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if not user.check_password(old_password):
        return Response(
            {'error': 'Old password is incorrect'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if len(new_password) < 8:
        return Response(
            {'error': 'New password must be at least 8 characters long'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    user.set_password(new_password)
    user.save()
    
    return Response({'message': 'Password changed successfully'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@never_cache
def logout_view(request):
    """Secure session-based logout"""
    username = request.user.username
    client_ip = get_client_ip(request)
    
    # Log the logout
    logger.info(f"User logout: {username} from IP {client_ip}")
    
    # Logout the user
    auth_logout(request)
    
    return Response({
        'message': 'Logout successful'
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_info(request):
    """Get current user information"""
    return Response(UserSerializer(request.user).data)

@api_view(['GET'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def csrf_token(request):
    """Get CSRF token for frontend"""
    return Response({'message': 'CSRF cookie set'})

@api_view(['GET'])
@permission_classes([AllowAny])
def check_auth(request):
    """Check if user is authenticated"""
    if request.user.is_authenticated:
        return Response({
            'authenticated': True,
            'user': UserSerializer(request.user).data
        })
    else:
        return Response({'authenticated': False})

@api_view(['POST'])
@permission_classes([AllowAny])
def create_admin_user(request):
    """Create an admin user (only for initial setup)"""
    # Check if any superuser already exists
    if User.objects.filter(is_superuser=True).exists():
        return Response(
            {'error': 'Admin user already exists'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not all([username, email, password]):
        return Response(
            {'error': 'Username, email, and password are required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if User.objects.filter(username=username).exists():
        return Response(
            {'error': 'Username already exists'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if User.objects.filter(email=email).exists():
        return Response(
            {'error': 'Email already exists'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    user = User.objects.create_superuser(
        username=username,
        email=email,
        password=password,
        first_name=request.data.get('first_name', ''),
        last_name=request.data.get('last_name', '')
    )
    
    return Response({
        'message': 'Admin user created successfully',
        'user': UserSerializer(user).data
    }, status=status.HTTP_201_CREATED)
