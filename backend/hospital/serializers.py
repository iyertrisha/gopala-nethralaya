from rest_framework import serializers
from .models import (
    Department, Service, Appointment,
    News, ContactInquiry, HospitalInfo, Gallery, Announcement
)

class DepartmentSerializer(serializers.ModelSerializer):
    services_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Department
        fields = ['id', 'name', 'description', 'image', 'is_active', 'services_count']
    
    def get_services_count(self, obj):
        return obj.services.filter(is_active=True).count()

class ServiceSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)
    
    class Meta:
        model = Service
        fields = ['id', 'name', 'description', 'department', 'department_name', 'image', 'price_range', 'is_active']


class AppointmentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = [
            'patient_name', 'patient_email', 'patient_phone', 'patient_age',
            'patient_gender', 'appointment_date', 'appointment_time',
            'reason', 'is_emergency'
        ]
    
    def validate(self, data):
        # Check if appointment slot is available
        appointment_date = data['appointment_date']
        appointment_time = data['appointment_time']
        
        existing_appointment = Appointment.objects.filter(
            appointment_date=appointment_date,
            appointment_time=appointment_time,
            status__in=['pending', 'confirmed']
        ).exists()
        
        if existing_appointment:
            raise serializers.ValidationError("This time slot is already booked.")
        
        return data

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = [
            'id', 'patient_name', 'patient_email', 'patient_phone', 'patient_age',
            'patient_gender', 'appointment_date', 'appointment_time', 'reason', 
            'notes', 'status', 'is_emergency', 'created_at'
        ]

class NewsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ['id', 'title', 'slug', 'excerpt', 'featured_image', 'author', 'published_date', 'is_featured']

class NewsDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ['id', 'title', 'slug', 'content', 'excerpt', 'featured_image', 'author', 'published_date', 'is_featured']

class ContactInquiryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInquiry
        fields = ['name', 'email', 'phone', 'inquiry_type', 'subject', 'message']

class ContactInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInquiry
        fields = [
            'id', 'name', 'email', 'phone', 'inquiry_type', 'subject',
            'message', 'is_resolved', 'response', 'created_at'
        ]

class HospitalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HospitalInfo
        fields = [
            'id', 'name', 'tagline', 'description', 'address', 'phone_primary',
            'phone_secondary', 'email_primary', 'email_secondary', 'emergency_phone',
            'operating_hours', 'emergency_hours', 'website', 'facebook', 'twitter',
            'instagram', 'linkedin', 'latitude', 'longitude', 'logo', 'hero_image'
        ]

class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = ['id', 'title', 'description', 'image', 'category', 'is_featured', 'display_order']

class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = ['id', 'title', 'content', 'is_active', 'is_urgent', 'start_date', 'end_date']
