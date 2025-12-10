from rest_framework import serializers
from .models import (
    Department, Service, Doctor, DoctorSchedule, Appointment,
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

class DoctorScheduleSerializer(serializers.ModelSerializer):
    day_name = serializers.CharField(source='get_day_of_week_display', read_only=True)
    
    class Meta:
        model = DoctorSchedule
        fields = ['id', 'day_of_week', 'day_name', 'start_time', 'end_time', 'is_active']

class DoctorListSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)
    full_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Doctor
        fields = [
            'id', 'first_name', 'last_name', 'full_name', 'specialization', 
            'department', 'department_name', 'photo', 'years_of_experience',
            'consultation_fee', 'is_available'
        ]
    
    def get_full_name(self, obj):
        return f"Dr. {obj.first_name} {obj.last_name}"

class DoctorDetailSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)
    schedules = DoctorScheduleSerializer(many=True, read_only=True)
    full_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Doctor
        fields = [
            'id', 'first_name', 'last_name', 'full_name', 'email', 'phone', 
            'gender', 'date_of_birth', 'photo', 'medical_license', 'specialization',
            'department', 'department_name', 'years_of_experience', 'qualifications',
            'bio', 'consultation_fee', 'consultation_duration', 'is_available',
            'is_active', 'schedules'
        ]
    
    def get_full_name(self, obj):
        return f"Dr. {obj.first_name} {obj.last_name}"


class AppointmentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = [
            'patient_name', 'patient_email', 'patient_phone', 'patient_age',
            'patient_gender', 'doctor', 'appointment_date', 'appointment_time',
            'reason'
        ]
    
    def validate(self, data):
        # Check if appointment slot is available
        appointment_date = data['appointment_date']
        appointment_time = data['appointment_time']
        doctor = data.get('doctor')
        
        # If doctor is specified, check for conflicts with that doctor
        query = Appointment.objects.filter(
            appointment_date=appointment_date,
            appointment_time=appointment_time,
            status__in=['pending', 'confirmed']
        )
        
        if doctor:
            query = query.filter(doctor=doctor)
            if query.exists():
                raise serializers.ValidationError("This doctor is not available at this time slot.")
        else:
            if query.exists():
                raise serializers.ValidationError("This time slot is already booked.")
        
        # Validate appointment date is not in the past
        from django.utils import timezone
        today = timezone.now().date()
        if appointment_date < today:
            raise serializers.ValidationError("Appointment date cannot be in the past.")
        
        return data

class AppointmentSerializer(serializers.ModelSerializer):
    doctor_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Appointment
        fields = [
            'id', 'patient_name', 'patient_email', 'patient_phone', 'patient_age',
            'patient_gender', 'doctor', 'doctor_name', 'appointment_date', 'appointment_time', 
            'reason', 'notes', 'status', 'is_emergency', 'created_at'
        ]
    
    def get_doctor_name(self, obj):
        if obj.doctor:
            return f"Dr. {obj.doctor.first_name} {obj.doctor.last_name}"
        return None

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

class DepartmentDetailSerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True, read_only=True)
    doctors = DoctorListSerializer(many=True, read_only=True)
    services_count = serializers.SerializerMethodField()
    doctors_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Department
        fields = ['id', 'name', 'description', 'image', 'is_active', 'services', 'doctors', 'services_count', 'doctors_count']
    
    def get_services_count(self, obj):
        return obj.services.filter(is_active=True).count()
    
    def get_doctors_count(self, obj):
        return obj.doctors.filter(is_active=True).count()
