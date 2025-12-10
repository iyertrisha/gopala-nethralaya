#!/usr/bin/env python
"""
Quick script to check appointments in the database
Run with: python check_appointments.py
"""
import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hospital_website.settings')
django.setup()

from hospital.models import *

def check_appointments():
    print("=" * 50)
    print("🏥 HOSPITAL DATABASE STATUS")
    print("=" * 50)
    
    # Count all models
    print("\n📊 ALL MODELS COUNT:")
    print(f"1. Departments: {Department.objects.count()}")
    print(f"2. Services: {Service.objects.count()}")
    print(f"3. Appointments: {Appointment.objects.count()}")
    print(f"4. News: {News.objects.count()}")
    print(f"5. Contact Inquiries: {ContactInquiry.objects.count()}")
    print(f"6. Hospital Info: {HospitalInfo.objects.count()}")
    print(f"7. Gallery: {Gallery.objects.count()}")
    print(f"8. Announcements: {Announcement.objects.count()}")
    
    # Show appointments
    print(f"\n📅 APPOINTMENTS ({Appointment.objects.count()} total):")
    if Appointment.objects.exists():
        for i, apt in enumerate(Appointment.objects.all(), 1):
            print(f"{i}. {apt.patient_name}")
            print(f"   📧 {apt.patient_email}")
            print(f"   📞 {apt.patient_phone}")
            print(f"   📅 {apt.appointment_date} at {apt.appointment_time}")
            print(f"   📝 {apt.reason}")
            print(f"   🏷️  Status: {apt.status}")
            print(f"   ⏰ Created: {apt.created_at}")
            print()
    else:
        print("   No appointments found.")
    
    # Show departments and services
    print(f"\n🏢 DEPARTMENTS & SERVICES:")
    for dept in Department.objects.all():
        services_count = dept.services.count()
        print(f"📂 {dept.name} ({services_count} services)")
        for service in dept.services.all():
            print(f"   └── {service.name}")
    
    print("=" * 50)

if __name__ == "__main__":
    check_appointments()

