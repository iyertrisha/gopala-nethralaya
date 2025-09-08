from django.contrib import admin
from django.utils.html import format_html
from .models import (
    Department, Service, Appointment,
    News, ContactInquiry, HospitalInfo, Gallery, Announcement
)

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ['name', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'description']
    prepopulated_fields = {}

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['name', 'department', 'price_range', 'is_active']
    list_filter = ['department', 'is_active', 'created_at']
    search_fields = ['name', 'description']


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ['patient_name', 'appointment_date', 'appointment_time', 'status', 'is_emergency']
    list_filter = ['status', 'is_emergency', 'appointment_date']
    search_fields = ['patient_name', 'patient_email']
    date_hierarchy = 'appointment_date'
    
    fieldsets = (
        ('Patient Information', {
            'fields': ('patient_name', 'patient_email', 'patient_phone', 'patient_age', 'patient_gender')
        }),
        ('Appointment Details', {
            'fields': ('appointment_date', 'appointment_time', 'reason', 'notes')
        }),
        ('Status', {
            'fields': ('status', 'is_emergency')
        }),
    )

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'is_published', 'is_featured', 'published_date']
    list_filter = ['is_published', 'is_featured', 'published_date', 'created_at']
    search_fields = ['title', 'content', 'author']
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'published_date'

@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'inquiry_type', 'subject', 'is_resolved', 'created_at']
    list_filter = ['inquiry_type', 'is_resolved', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['created_at']

@admin.register(HospitalInfo)
class HospitalInfoAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone_primary', 'email_primary']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'tagline', 'description')
        }),
        ('Contact Information', {
            'fields': ('address', 'phone_primary', 'phone_secondary', 'email_primary', 'email_secondary', 'emergency_phone')
        }),
        ('Operating Hours', {
            'fields': ('operating_hours', 'emergency_hours')
        }),
        ('Social Media', {
            'fields': ('website', 'facebook', 'twitter', 'instagram', 'linkedin')
        }),
        ('Location', {
            'fields': ('latitude', 'longitude')
        }),
        ('Images', {
            'fields': ('logo', 'hero_image')
        }),
    )

@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'is_featured', 'display_order', 'created_at']
    list_filter = ['category', 'is_featured', 'created_at']
    search_fields = ['title', 'description']
    list_editable = ['display_order', 'is_featured']

@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'is_urgent', 'start_date', 'end_date']
    list_filter = ['is_active', 'is_urgent', 'start_date']
    search_fields = ['title', 'content']
    date_hierarchy = 'start_date'

# Customize admin site
admin.site.site_header = "Hospital Management System"
admin.site.site_title = "Hospital Admin"
admin.site.index_title = "Welcome to Hospital Administration"
