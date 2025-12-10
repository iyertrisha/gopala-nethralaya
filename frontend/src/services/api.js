import axios from 'axios';


const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
const API_KEY = import.meta.env.VITE_API_KEY || 'hospital-api-key-2024';

// Create axios instance with session support
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY,
  },
  withCredentials: true, // Include cookies for session authentication
});

// CSRF token management
let csrfToken = null;

const getCSRFToken = async () => {
  if (!csrfToken) {
    try {
      await api.get('/auth/csrf/');
      // CSRF token is now set in cookies
      csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
    } catch (error) {
      console.warn('Failed to get CSRF token:', error);
    }
  }
  return csrfToken;
};

// Request interceptor to include CSRF token and API key
api.interceptors.request.use(
  async (config) => {
    // Always include API key
    config.headers['X-API-Key'] = API_KEY;
    
    // For POST, PUT, PATCH, DELETE requests, include CSRF token
    if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase())) {
      const token = await getCSRFToken();
      if (token) {
        config.headers['X-CSRFToken'] = token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle network errors gracefully
    if (!error.response) {
      console.warn('Network error or server unavailable:', error.message);
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  login: (credentials) => api.post('/auth/login/', credentials),
  logout: () => api.post('/auth/logout/', {}),
  register: (userData) => api.post('/auth/register/', userData),
  checkAuth: () => api.get('/auth/check/'),
  getUserInfo: () => api.get('/auth/user/'),
  updateProfile: (userData) => api.patch('/auth/profile/', userData),
  changePassword: (passwordData) => api.post('/auth/change-password/', passwordData),
  createAdmin: (adminData) => api.post('/auth/create-admin/', adminData),
  getCSRFToken: () => api.get('/auth/csrf/'),
};

// Hospital Info API
export const hospitalAPI = {
  getInfo: () => api.get('/hospital-info/'),
  getStats: () => api.get('/dashboard/stats/'),
};

// Departments API
export const departmentsAPI = {
  getAll: (params = {}) => api.get('/departments/', { params }),
  getById: (id) => api.get(`/departments/${id}/`),
};

// Services API
export const servicesAPI = {
  getAll: (params = {}) => api.get('/services/', { params }),
  getById: (id) => api.get(`/services/${id}/`),
};

// Doctors API
export const doctorsAPI = {
  getAll: (params = {}) => api.get('/doctors/', { params }),
  getById: (id) => api.get(`/doctors/${id}/`),
};


// Appointments API
export const appointmentsAPI = {
  create: (data) => api.post('/appointments/', data),
  getAll: (params = {}) => api.get('/appointments/list/', { params }),
  getById: (id) => api.get(`/appointments/${id}/`),
};

// News API
export const newsAPI = {
  getAll: (params = {}) => api.get('/news/', { params }),
  getFeatured: () => api.get('/news/featured/'),
  getBySlug: (slug) => api.get(`/news/${slug}/`),
};

// Contact API
export const contactAPI = {
  create: (data) => api.post('/contact/', data),
  getAll: (params = {}) => api.get('/contact/list/', { params }),
  getById: (id) => api.get(`/contact/${id}/`),
  update: (id, data) => api.patch(`/contact/${id}/`, data),
};

// Gallery API
export const galleryAPI = {
  getAll: (params = {}) => api.get('/gallery/', { params }),
};

// Announcements API
export const announcementsAPI = {
  getAll: (params = {}) => api.get('/announcements/', { params }),
};

export default api;
