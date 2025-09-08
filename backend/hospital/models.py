from django.db import models
from django.core.validators import RegexValidator
from django.utils import timezone

class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    image = models.ImageField(upload_to='departments/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']

class Service(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='services')
    image = models.ImageField(upload_to='services/', blank=True, null=True)
    price_range = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.department.name}"

    class Meta:
        ordering = ['name']


class Appointment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('no_show', 'No Show'),
    ]
    
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]
    
    # Patient Information
    patient_name = models.CharField(max_length=200)
    patient_email = models.EmailField()
    patient_phone = models.CharField(max_length=17)
    patient_age = models.PositiveIntegerField()
    patient_gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    
    # Appointment Details
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    reason = models.TextField()
    notes = models.TextField(blank=True)
    
    # Status and Management
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    is_emergency = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.patient_name} - {self.appointment_date}"

    class Meta:
        ordering = ['-appointment_date', '-appointment_time']

class News(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    content = models.TextField()
    excerpt = models.TextField(max_length=300)
    featured_image = models.ImageField(upload_to='news/', blank=True, null=True)
    author = models.CharField(max_length=100)
    is_published = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)
    published_date = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            from django.utils.text import slugify
            self.slug = slugify(self.title)
        if self.is_published and not self.published_date:
            self.published_date = timezone.now()
        super().save(*args, **kwargs)

    class Meta:
        ordering = ['-published_date', '-created_at']
        verbose_name_plural = "News"

class ContactInquiry(models.Model):
    INQUIRY_TYPES = [
        ('general', 'General Inquiry'),
        ('appointment', 'Appointment Request'),
        ('emergency', 'Emergency'),
        ('feedback', 'Feedback'),
        ('complaint', 'Complaint'),
    ]
    
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=17, blank=True)
    inquiry_type = models.CharField(max_length=20, choices=INQUIRY_TYPES, default='general')
    subject = models.CharField(max_length=200)
    message = models.TextField()
    is_resolved = models.BooleanField(default=False)
    response = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.subject}"

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Contact Inquiries"

class HospitalInfo(models.Model):
    name = models.CharField(max_length=200)
    tagline = models.CharField(max_length=300, blank=True)
    description = models.TextField()
    
    # Contact Information
    address = models.TextField()
    phone_primary = models.CharField(max_length=17)
    phone_secondary = models.CharField(max_length=17, blank=True)
    email_primary = models.EmailField()
    email_secondary = models.EmailField(blank=True)
    
    # Emergency Contact
    emergency_phone = models.CharField(max_length=17)
    
    # Operating Hours
    operating_hours = models.TextField()
    emergency_hours = models.TextField(default="24/7")
    
    # Social Media
    website = models.URLField(blank=True)
    facebook = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    instagram = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    
    # Location
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    
    # Images
    logo = models.ImageField(upload_to='hospital/', blank=True, null=True)
    hero_image = models.ImageField(upload_to='hospital/', blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Hospital Information"
        verbose_name_plural = "Hospital Information"

class Gallery(models.Model):
    CATEGORY_CHOICES = [
        ('facility', 'Facility'),
        ('equipment', 'Equipment'),
        ('staff', 'Staff'),
        ('events', 'Events'),
        ('awards', 'Awards'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='gallery/')
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='facility')
    is_featured = models.BooleanField(default=False)
    display_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['display_order', '-created_at']
        verbose_name_plural = "Gallery"

class Announcement(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    is_active = models.BooleanField(default=True)
    is_urgent = models.BooleanField(default=False)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-is_urgent', '-start_date']
