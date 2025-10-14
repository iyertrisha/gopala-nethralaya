# JWT Authentication System

## Overview

This hospital management system now includes a comprehensive JWT (JSON Web Token) authentication system that secures all API endpoints and provides role-based access control.

## Features

### 🔐 Authentication Features
- **JWT Token-based Authentication** - Secure token-based authentication
- **Role-based Access Control** - Different permissions for users and admins
- **Token Refresh** - Automatic token refresh to maintain sessions
- **Protected Routes** - Frontend routes that require authentication
- **Admin Dashboard** - Secure admin panel for hospital management

### 🛡️ Security Features
- **Password Validation** - Strong password requirements
- **Token Expiration** - Configurable token lifetimes
- **Secure Headers** - Proper CORS and security headers
- **Input Validation** - Comprehensive data validation
- **Error Handling** - Secure error responses

## API Endpoints

### Authentication Endpoints

| Endpoint | Method | Description | Access |
|----------|--------|-------------|---------|
| `/api/auth/register/` | POST | Register new user | Public |
| `/api/auth/login/` | POST | Login user | Public |
| `/api/auth/token/refresh/` | POST | Refresh access token | Public |
| `/api/auth/logout/` | POST | Logout user | Authenticated |
| `/api/auth/user/` | GET | Get current user info | Authenticated |
| `/api/auth/profile/` | GET/PATCH | Get/Update user profile | Authenticated |
| `/api/auth/change-password/` | POST | Change password | Authenticated |
| `/api/auth/create-admin/` | POST | Create admin user | Public (setup only) |

### Protected Endpoints

| Endpoint | Method | Description | Access Level |
|----------|--------|-------------|--------------|
| `/api/departments/` | GET/POST | List/Create departments | Public Read, Admin Write |
| `/api/services/` | GET/POST | List/Create services | Public Read, Admin Write |
| `/api/appointments/` | POST | Create appointment | Public |
| `/api/appointments/list/` | GET | List appointments | Admin Only |
| `/api/news/` | GET/POST | List/Create news | Public Read, Admin Write |
| `/api/news/<slug>/` | GET/PUT/DELETE | News detail | Public Read, Admin Write |
| `/api/hospital-info/` | GET/PUT | Hospital information | Public Read, Admin Write |
| `/api/gallery/` | GET/POST | Gallery images | Public Read, Admin Write |
| `/api/announcements/` | GET/POST | Announcements | Public Read, Admin Write |
| `/api/dashboard/stats/` | GET | Dashboard statistics | Admin Only |

## Frontend Routes

### Public Routes
- `/` - Home page
- `/about` - About page
- `/services` - Services page
- `/contact` - Contact page
- `/appointments` - Book appointment
- `/gallery` - Gallery page
- `/login` - Login page

### Protected Routes
- `/admin` - Admin dashboard (Admin only)

## Setup Instructions

### 1. Backend Setup

1. **Install Dependencies** (already in requirements.txt):
   ```bash
   pip install djangorestframework-simplejwt
   ```

2. **Run Migrations**:
   ```bash
   python manage.py migrate
   ```

3. **Create Admin User**:
   ```bash
   python manage.py create_admin --username admin --email admin@hospital.com --password securepassword123 --first-name Admin --last-name User
   ```

### 2. Frontend Setup

The frontend automatically handles JWT tokens through the API service. No additional setup required.

### 3. Environment Variables

Add these to your `.env` file:

```bash
# JWT Settings (optional - defaults provided)
JWT_ACCESS_TOKEN_LIFETIME=60  # minutes
JWT_REFRESH_TOKEN_LIFETIME=7  # days
```

## Usage Examples

### 1. User Registration

```javascript
import { authAPI } from './services/api';

const registerUser = async (userData) => {
  try {
    const response = await authAPI.register({
      username: 'johndoe',
      email: 'john@example.com',
      first_name: 'John',
      last_name: 'Doe',
      password: 'securepassword123',
      password_confirm: 'securepassword123'
    });
    
    const { access, refresh, user } = response.data;
    // Store tokens and user data
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Registration failed:', error.response.data);
  }
};
```

### 2. User Login

```javascript
const loginUser = async (credentials) => {
  try {
    const response = await authAPI.login({
      username: 'johndoe',
      password: 'securepassword123'
    });
    
    const { access, refresh, user } = response.data;
    // Store tokens and user data
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Login failed:', error.response.data);
  }
};
```

### 3. Making Authenticated API Calls

```javascript
// The API service automatically adds the JWT token to requests
const fetchAppointments = async () => {
  try {
    const response = await appointmentsAPI.getAll();
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      // User is not authenticated
      window.location.href = '/login';
    }
  }
};
```

### 4. Admin Dashboard Access

```javascript
// Only users with is_staff = true can access admin routes
const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user || !user.is_staff) {
    return <Navigate to="/" replace />;
  }
  
  return <div>Admin Dashboard Content</div>;
};
```

## Security Features

### 1. Token Management
- **Access Token**: Short-lived (60 minutes) for API requests
- **Refresh Token**: Long-lived (7 days) for getting new access tokens
- **Automatic Refresh**: Tokens are automatically refreshed when expired
- **Token Blacklisting**: Refresh tokens are blacklisted on logout

### 2. Permission Levels
- **Public**: Anyone can access (e.g., viewing services, creating appointments)
- **Authenticated**: Requires valid JWT token (e.g., user profile)
- **Admin**: Requires staff privileges (e.g., dashboard stats, managing appointments)
- **Superuser**: Requires superuser privileges (e.g., user management)

### 3. Input Validation
- **Password Strength**: Minimum 8 characters
- **Email Validation**: Proper email format validation
- **Username Uniqueness**: Prevents duplicate usernames
- **Data Sanitization**: All inputs are properly sanitized

## Error Handling

### Common Error Responses

```json
// 400 Bad Request
{
  "error": "Username already exists"
}

// 401 Unauthorized
{
  "detail": "Authentication credentials were not provided."
}

// 403 Forbidden
{
  "detail": "You do not have permission to perform this action."
}

// 500 Internal Server Error
{
  "error": "Internal server error"
}
```

## Testing the Authentication

### 1. Test User Registration
```bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "first_name": "Test",
    "last_name": "User",
    "password": "testpassword123",
    "password_confirm": "testpassword123"
  }'
```

### 2. Test User Login
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpassword123"
  }'
```

### 3. Test Protected Endpoint
```bash
curl -X GET http://localhost:8000/api/dashboard/stats/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Troubleshooting

### Common Issues

1. **Token Expired**: The system automatically refreshes tokens, but if both tokens are expired, user needs to login again.

2. **Permission Denied**: Check if the user has the required permissions (is_staff for admin routes).

3. **CORS Issues**: Ensure CORS settings allow credentials and the frontend domain.

4. **Database Issues**: Run migrations after adding new models or fields.

### Debug Mode

Set `DEBUG=True` in your `.env` file to see detailed error messages during development.

## Security Best Practices

1. **Use HTTPS in Production**: Always use HTTPS for production deployments
2. **Strong Passwords**: Enforce strong password policies
3. **Regular Token Rotation**: Consider implementing shorter token lifetimes for high-security environments
4. **Monitor Access**: Log authentication attempts and monitor for suspicious activity
5. **Keep Dependencies Updated**: Regularly update JWT and Django packages

## Support

For issues or questions about the authentication system, check the Django REST Framework and Simple JWT documentation, or create an issue in the project repository.
