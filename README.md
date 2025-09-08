# Hospital Management Website

A dynamic hospital/medical website built with React.js frontend, Django REST Framework backend, and PostgreSQL database, similar to Narayana Nethralaya.


## Demo

🎥 [Watch the Demo](demo-landingpage.mp4)




## Features

### Frontend (React.js)
- Modern UI components for healthcare
- Responsive design for mobile and desktop
- Real-time content updates from database
- Dynamic data fetching from APIs
- Search functionality for doctors by specialization
- Appointment booking system
- Contact forms
- News/blog section
- Image gallery

### Backend (Django REST Framework)
- API endpoints for dynamic content delivery
- Django admin panel for content management
- PostgreSQL database integration
- RESTful API architecture

### Dynamic Features
- Homepage with dynamic hospital announcements
- Real-time doctor availability and schedules
- Dynamic services and departments
- Doctor profiles with specializations
- Live contact form submissions
- Appointment booking with real-time slots
- Dynamic news/blog section
- Admin-uploadable image gallery
- Search and filtering functionality

## Tech Stack

- **Frontend**: React.js, CSS3, JavaScript ES6+
- **Backend**: Django, Django REST Framework
- **Database**: PostgreSQL (AWS RDS)
- **Containerization**: Docker
- **Deployment**: AWS ECS, CloudFront, Route 53
- **Load Balancer**: AWS Application Load Balancer
- **SSL**: AWS Certificate Manager

## Project Structure

```
hospital-website/
├── backend/                 # Django backend
│   ├── hospital_backend/   # Main Django project
│   ├── apps/              # Django apps
│   ├── requirements.txt   # Python dependencies
│   └── Dockerfile        # Backend Docker config
├── frontend/              # React frontend
│   ├── src/              # React source code
│   ├── public/           # Static assets
│   ├── package.json      # Node dependencies
│   └── Dockerfile       # Frontend Docker config
├── docker-compose.yml    # Local development
├── infrastructure/       # AWS deployment configs
└── README.md
```

## Quick Start

### Local Development with Docker

1. Clone the repository
2. Run with Docker Compose:
   ```bash
   docker-compose up --build
   ```
3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Django Admin: http://localhost:8000/admin

### AWS Deployment

1. Configure AWS credentials
2. Deploy using the provided infrastructure scripts
3. Update environment variables for production

## Admin Panel Access

- URL: `/admin`
- Create superuser: `python manage.py createsuperuser`
- Features:
  - Manage doctors and their profiles
  - Add/edit hospital services and departments
  - Update news and announcements
  - View contact form submissions
  - Handle appointment requests
  - Upload gallery images

## API Endpoints

- `/api/doctors/` - Doctor listings and profiles
- `/api/services/` - Hospital services
- `/api/departments/` - Hospital departments
- `/api/appointments/` - Appointment bookings
- `/api/news/` - News and announcements
- `/api/contact/` - Contact form submissions
- `/api/gallery/` - Image gallery

## Environment Variables

### Backend (.env)
```
DEBUG=False
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:pass@host:port/dbname
ALLOWED_HOSTS=your-domain.com
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-api-domain.com
```

## Development Guidelines

1. All content is database-driven - no hardcoded content
2. API-first architecture for scalability
3. Mobile-first responsive design
4. Professional healthcare appearance
5. Real-time updates and dynamic content

## License

MIT License
