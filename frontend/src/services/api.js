import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error('Unauthorized access');
    }
    return Promise.reject(error);
  }
);

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
