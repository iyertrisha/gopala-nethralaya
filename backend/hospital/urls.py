from django.urls import path
from . import views

urlpatterns = [
    # Departments and Services
    path('departments/', views.DepartmentListView.as_view(), name='department-list'),
    path('services/', views.ServiceListView.as_view(), name='service-list'),
    
    
    # Appointments
    path('appointments/', views.AppointmentCreateView.as_view(), name='appointment-create'),
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
