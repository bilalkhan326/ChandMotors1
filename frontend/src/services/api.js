import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Auth APIs
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
}

// Car APIs
export const carAPI = {
  getAllCars: (params) => api.get('/cars', { params }),
  getCarById: (id) => api.get(`/cars/${id}`),
  createCar: (data) => api.post('/cars', data),
  updateCar: (id, data) => api.put(`/cars/${id}`, data),
  deleteCar: (id) => api.delete(`/cars/${id}`),
  searchCars: (params) => api.get('/cars/search', { params }),
}

// Service APIs
export const serviceAPI = {
  getAllServices: () => api.get('/services'),
  getServiceById: (id) => api.get(`/services/${id}`),
  bookService: (data) => api.post('/services/book', data),
}

// User APIs
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  getBookings: () => api.get('/users/bookings'),
  updateBookingStatus: (id, status) => api.patch(`/users/bookings/${id}/status`, { status }),
}

// Contact APIs
export const contactAPI = {
  sendMessage: (data) => api.post('/contact', data),
  getAllContacts: () => api.get('/contact'),
}

// Settings APIs
export const settingsAPI = {
  getSettings: () => api.get('/settings'),
  updateSettings: (data) => api.put('/settings', data),
}

// Upload APIs - Upload files and get back image path
export const uploadAPI = {
  uploadCarImage: (file) => {
    const formData = new FormData()
    formData.append('image', file)
    return api.post('/upload/car', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  uploadLogo: (file) => {
    const formData = new FormData()
    formData.append('image', file)
    return api.post('/upload/logo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  uploadHero: (file) => {
    const formData = new FormData()
    formData.append('image', file)
    return api.post('/upload/hero', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
}

export default api
