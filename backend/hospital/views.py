from rest_framework import generics, status, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.utils.decorators import method_decorator
from django.core.cache import cache
from django.conf import settings
from datetime import datetime, timedelta
import json
import time
from django.http import JsonResponse

from .decorators import api_key_required, rate_limit_ip

from .models import (
    Department, Service, Appointment,
    News, ContactInquiry, HospitalInfo, Gallery, Announcement
)
from .serializers import (
    DepartmentSerializer, ServiceSerializer, AppointmentCreateSerializer, 
    AppointmentSerializer, NewsListSerializer, NewsDetailSerializer, 
    ContactInquiryCreateSerializer, HospitalInfoSerializer, GallerySerializer, 
    AnnouncementSerializer
)
from .permissions import IsAdminOrReadOnly, IsAdminUser, PublicReadOnly

@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    """Simple health check endpoint"""
    return Response({
        'status': 'ok',
        'message': 'Backend is running',
        'timestamp': timezone.now().isoformat()
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def test_appointments(request):
    """Test endpoint to check appointments without API key"""
    try:
        appointments = Appointment.objects.all()[:5]  # Get first 5 appointments
        serializer = AppointmentSerializer(appointments, many=True)
        return Response({
            'status': 'success',
            'count': appointments.count(),
            'appointments': serializer.data
        })
    except Exception as e:
        return Response({
            'status': 'error',
            'message': str(e)
        }, status=500)

class DepartmentListView(generics.ListCreateAPIView):
    queryset = Department.objects.filter(is_active=True)
    serializer_class = DepartmentSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']
    permission_classes = [PublicReadOnly]

class ServiceListView(generics.ListCreateAPIView):
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['department']
    search_fields = ['name', 'description']
    permission_classes = [PublicReadOnly]

@csrf_exempt
@api_view(['POST', 'OPTIONS'])
@permission_classes([AllowAny])
def create_appointment(request):
    """Create a new appointment - API key protected"""
    # Handle OPTIONS request for CORS preflight
    if request.method == 'OPTIONS':
        response = Response()
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type, X-API-Key'
        return response
    
    # Apply API key check
    api_key = request.headers.get('X-API-Key') or request.GET.get('api_key')
    valid_keys = getattr(settings, 'API_KEYS', ['hospital-api-key-2024'])
    if api_key not in valid_keys:
        return JsonResponse({'error': 'Invalid API key'}, status=401)
    
    # Apply rate limiting
    from .decorators import get_client_ip
    ip = get_client_ip(request)
    cache_key = f'rate_limit_{ip}_appointment_create'
    requests = cache.get(cache_key, [])
    now = time.time()
    requests = [req_time for req_time in requests if now - req_time < 60]
    if len(requests) >= 5:
        return JsonResponse({'error': 'Rate limit exceeded'}, status=429)
    requests.append(now)
    cache.set(cache_key, requests, 60)
    
    # Create appointment
    serializer = AppointmentCreateSerializer(data=request.data)
    if serializer.is_valid():
        appointment = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AppointmentListView(generics.ListAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'is_emergency', 'appointment_date']
    search_fields = ['patient_name', 'patient_email', 'reason']
    ordering_fields = ['appointment_date', 'appointment_time', 'created_at']
    ordering = ['-appointment_date', '-appointment_time']
    permission_classes = [IsAdminUser]  # Only admins can view all appointments
    
    def dispatch(self, request, *args, **kwargs):
        # Apply API key check
        api_key = request.headers.get('X-API-Key') or request.GET.get('api_key')
        valid_keys = getattr(settings, 'API_KEYS', ['hospital-api-key-2024'])
        if api_key not in valid_keys:
            return JsonResponse({'error': 'Invalid API key'}, status=401)
        
        # Apply rate limiting
        from .decorators import get_client_ip
        ip = get_client_ip(request)
        cache_key = f'rate_limit_{ip}_appointment_list'
        requests = cache.get(cache_key, [])
        now = time.time()
        requests = [req_time for req_time in requests if now - req_time < 60]
        if len(requests) >= 20:
            return JsonResponse({'error': 'Rate limit exceeded'}, status=429)
        requests.append(now)
        cache.set(cache_key, requests, 60)
        
        return super().dispatch(request, *args, **kwargs)

class NewsListView(generics.ListCreateAPIView):
    queryset = News.objects.filter(is_published=True)
    serializer_class = NewsListSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'content', 'excerpt']
    ordering = ['-published_date']
    permission_classes = [PublicReadOnly]

class NewsDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = News.objects.filter(is_published=True)
    serializer_class = NewsDetailSerializer
    lookup_field = 'slug'
    permission_classes = [IsAdminOrReadOnly]

class FeaturedNewsView(generics.ListAPIView):
    queryset = News.objects.filter(is_published=True, is_featured=True)[:5]
    serializer_class = NewsListSerializer
    permission_classes = [AllowAny]

class ContactInquiryCreateView(generics.CreateAPIView):
    serializer_class = ContactInquiryCreateSerializer
    permission_classes = [AllowAny]  # Allow public to create contact inquiries
    
    def dispatch(self, request, *args, **kwargs):
        # Apply API key check
        api_key = request.headers.get('X-API-Key') or request.GET.get('api_key')
        valid_keys = getattr(settings, 'API_KEYS', ['hospital-api-key-2024'])
        if api_key not in valid_keys:
            return JsonResponse({'error': 'Invalid API key'}, status=401)
        
        # Apply rate limiting
        from .decorators import get_client_ip
        ip = get_client_ip(request)
        cache_key = f'rate_limit_{ip}_contact_create'
        requests = cache.get(cache_key, [])
        now = time.time()
        requests = [req_time for req_time in requests if now - req_time < 60]
        if len(requests) >= 3:
            return JsonResponse({'error': 'Rate limit exceeded'}, status=429)
        requests.append(now)
        cache.set(cache_key, requests, 60)
        
        return super().dispatch(request, *args, **kwargs)

class HospitalInfoView(generics.RetrieveUpdateAPIView):
    queryset = HospitalInfo.objects.all()
    serializer_class = HospitalInfoSerializer
    permission_classes = [IsAdminOrReadOnly]
    
    def get_object(self):
        return HospitalInfo.objects.first()

class GalleryListView(generics.ListCreateAPIView):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category', 'is_featured']
    ordering = ['display_order', '-created_at']
    permission_classes = [PublicReadOnly]

class AnnouncementListView(generics.ListCreateAPIView):
    serializer_class = AnnouncementSerializer
    permission_classes = [IsAdminOrReadOnly]
    
    def get_queryset(self):
        now = timezone.now()
        return Announcement.objects.filter(
            is_active=True,
            start_date__lte=now
        ).filter(
            Q(end_date__isnull=True) | Q(end_date__gte=now)
        ).order_by('-is_urgent', '-start_date')


@api_view(['GET'])
@permission_classes([IsAdminUser])
@api_key_required
@rate_limit_ip(max_requests=10, time_window=60)
def dashboard_stats(request):
    """Get dashboard statistics - Admin only"""
    stats = {
        'total_departments': Department.objects.filter(is_active=True).count(),
        'total_services': Service.objects.filter(is_active=True).count(),
        'pending_appointments': Appointment.objects.filter(status='pending').count(),
        'today_appointments': Appointment.objects.filter(
            appointment_date=timezone.now().date()
        ).count(),
        'active_announcements': Announcement.objects.filter(
            is_active=True,
            start_date__lte=timezone.now()
        ).filter(
            Q(end_date__isnull=True) | Q(end_date__gte=timezone.now())
        ).count(),
    }
    return Response(stats)
