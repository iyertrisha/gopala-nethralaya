from rest_framework import generics, status, filters
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from django.db.models import Q
from datetime import datetime, timedelta

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

class DepartmentListView(generics.ListAPIView):
    queryset = Department.objects.filter(is_active=True)
    serializer_class = DepartmentSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']

class ServiceListView(generics.ListAPIView):
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['department']
    search_fields = ['name', 'description']


class AppointmentCreateView(generics.CreateAPIView):
    serializer_class = AppointmentCreateSerializer

class AppointmentListView(generics.ListAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'is_emergency', 'appointment_date']
    search_fields = ['patient_name', 'patient_email', 'reason']
    ordering_fields = ['appointment_date', 'appointment_time', 'created_at']
    ordering = ['-appointment_date', '-appointment_time']

class NewsListView(generics.ListAPIView):
    queryset = News.objects.filter(is_published=True)
    serializer_class = NewsListSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'content', 'excerpt']
    ordering = ['-published_date']

class NewsDetailView(generics.RetrieveAPIView):
    queryset = News.objects.filter(is_published=True)
    serializer_class = NewsDetailSerializer
    lookup_field = 'slug'

class FeaturedNewsView(generics.ListAPIView):
    queryset = News.objects.filter(is_published=True, is_featured=True)[:5]
    serializer_class = NewsListSerializer

class ContactInquiryCreateView(generics.CreateAPIView):
    serializer_class = ContactInquiryCreateSerializer

class HospitalInfoView(generics.RetrieveAPIView):
    queryset = HospitalInfo.objects.all()
    serializer_class = HospitalInfoSerializer
    
    def get_object(self):
        return HospitalInfo.objects.first()

class GalleryListView(generics.ListAPIView):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category', 'is_featured']
    ordering = ['display_order', '-created_at']

class AnnouncementListView(generics.ListAPIView):
    serializer_class = AnnouncementSerializer
    
    def get_queryset(self):
        now = timezone.now()
        return Announcement.objects.filter(
            is_active=True,
            start_date__lte=now
        ).filter(
            Q(end_date__isnull=True) | Q(end_date__gte=now)
        ).order_by('-is_urgent', '-start_date')


@api_view(['GET'])
def dashboard_stats(request):
    """Get dashboard statistics"""
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
