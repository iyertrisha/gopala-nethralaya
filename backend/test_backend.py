#!/usr/bin/env python
"""
Simple test script to check backend functionality
"""
import os
import sys
import django
import requests
import json
from datetime import datetime, timedelta

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hospital_website.settings')
django.setup()

from hospital.models import Appointment, Department, Service

def test_database_connection():
    """Test database connection"""
    try:
        # Try to get count of appointments
        appointment_count = Appointment.objects.count()
        print(f"✅ Database connection successful. Found {appointment_count} appointments.")
        return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False

def test_api_endpoints():
    """Test API endpoints"""
    base_url = "http://localhost:8000/api"
    
    # Test health check
    try:
        response = requests.get(f"{base_url}/health/", timeout=5)
        if response.status_code == 200:
            print("✅ Health check endpoint working")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Health check failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Health check endpoint error: {e}")
    
    # Test appointments endpoint
    try:
        response = requests.get(f"{base_url}/test-appointments/", timeout=5)
        if response.status_code == 200:
            print("✅ Test appointments endpoint working")
            data = response.json()
            print(f"   Found {data.get('count', 0)} appointments")
        else:
            print(f"❌ Test appointments failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Test appointments endpoint error: {e}")
    
    # Test services endpoint
    try:
        response = requests.get(f"{base_url}/services/", timeout=5)
        if response.status_code == 200:
            print("✅ Services endpoint working")
            data = response.json()
            print(f"   Found {len(data)} services")
        else:
            print(f"❌ Services failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Services endpoint error: {e}")

def test_appointment_creation():
    """Test creating an appointment"""
    base_url = "http://localhost:8000/api"
    
    # Test data
    tomorrow = datetime.now() + timedelta(days=1)
    test_data = {
        "patient_name": "Test Patient",
        "patient_email": "test@example.com",
        "patient_phone": "+1234567890",
        "patient_age": 25,
        "patient_gender": "F",
        "appointment_date": tomorrow.strftime("%Y-%m-%d"),
        "appointment_time": "10:00:00",
        "reason": "Test appointment",
        "is_emergency": False
    }
    
    headers = {
        "Content-Type": "application/json",
        "X-API-Key": "hospital-api-key-2024"
    }
    
    try:
        response = requests.post(
            f"{base_url}/appointments/",
            json=test_data,
            headers=headers,
            timeout=5
        )
        
        if response.status_code == 201:
            print("✅ Appointment creation successful")
            print(f"   Created appointment: {response.json()}")
        else:
            print(f"❌ Appointment creation failed: {response.status_code}")
            print(f"   Error: {response.text}")
    except Exception as e:
        print(f"❌ Appointment creation error: {e}")

def create_sample_data():
    """Create sample data for testing"""
    try:
        # Create a department if it doesn't exist
        dept, created = Department.objects.get_or_create(
            name="General Medicine",
            defaults={
                "description": "General medical services",
                "is_active": True
            }
        )
        if created:
            print("✅ Created sample department")
        
        # Create a service if it doesn't exist
        service, created = Service.objects.get_or_create(
            name="General Checkup",
            defaults={
                "description": "Routine general health checkup",
                "department": dept,
                "price_range": "$50-100",
                "is_active": True
            }
        )
        if created:
            print("✅ Created sample service")
        
        print("✅ Sample data ready")
    except Exception as e:
        print(f"❌ Error creating sample data: {e}")

if __name__ == "__main__":
    print("🏥 Testing Hospital Backend...")
    print("=" * 50)
    
    # Test database
    print("\n1. Testing Database Connection:")
    db_ok = test_database_connection()
    
    if db_ok:
        # Create sample data
        print("\n2. Creating Sample Data:")
        create_sample_data()
        
        # Test API endpoints
        print("\n3. Testing API Endpoints:")
        test_api_endpoints()
        
        # Test appointment creation
        print("\n4. Testing Appointment Creation:")
        test_appointment_creation()
    
    print("\n" + "=" * 50)
    print("🏥 Backend test completed!")
