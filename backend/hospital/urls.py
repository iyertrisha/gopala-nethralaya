from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from . import views
from .auth_views import (
    UserRegistrationView, login_view, logout_view, UserProfileView,
    change_password, user_info, create_admin_user, csrf_token, check_auth
)

urlpatterns = [
    # Health check
    path('health/', views.health_check, name='health-check'),
    path('test-appointments/', views.test_appointments, name='test-appointments'),
    
    # Authentication URLs
    path('auth/register/', UserRegistrationView.as_view(), name='user-register'),
    path('auth/login/', login_view, name='login'),
    path('auth/logout/', logout_view, name='logout'),
    path('auth/user/', user_info, name='user-info'),
    path('auth/profile/', UserProfileView.as_view(), name='user-profile'),
    path('auth/change-password/', change_password, name='change-password'),
    path('auth/create-admin/', create_admin_user, name='create-admin'),
    path('auth/csrf/', csrf_token, name='csrf-token'),
    path('auth/check/', check_auth, name='check-auth'),
    
    # Departments and Services
    path('departments/', views.DepartmentListView.as_view(), name='department-list'),
    path('services/', views.ServiceListView.as_view(), name='service-list'),
    
    # Appointments
    path('appointments/', views.create_appointment, name='appointment-create'),
    path('appointments/list/', views.AppointmentListView.as_view(), name='appointment-list'),
    
    # News
    path('news/', views.NewsListView.as_view(), name='news-list'),
    path('news/featured/', views.FeaturedNewsView.as_view(), name='featured-news'),
    path('news/<slug:slug>/', views.NewsDetailView.as_view(), name='news-detail'),
    
    # Contact
    path('contact/', views.ContactInquiryCreateView.as_view(), name='contact-create'),
    
    # Hospital Info
    path('hospital-info/', views.HospitalInfoView.as_view(), name='hospital-info'),
    
    # Gallery
    path('gallery/', views.GalleryListView.as_view(), name='gallery-list'),
    
    # Announcements
    path('announcements/', views.AnnouncementListView.as_view(), name='announcement-list'),
    
    # Dashboard
    path('dashboard/stats/', views.dashboard_stats, name='dashboard-stats'),
]
