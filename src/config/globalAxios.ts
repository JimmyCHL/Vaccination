import axios from 'axios'

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:9000', // Your API base URL
})

// Add a request interceptor to include the token in the headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('token')

    if (token) {
      // Attach token to the request if it exists
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Catch the response and intercept the error
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      // Remove the token from localStorage if the API returns 401 or 403 (unauthorized or expired for token)
      localStorage.removeItem('token')
      alert('Session expired or you do not have permission. Please login again.')
      window.location.href = '/authenticate'
    }
    // Handle the error
    return Promise.reject(error)
  }
)

export default axiosInstance
