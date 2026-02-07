import axios from 'axios'

// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add access token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle 401 and auto-refresh
api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const refreshToken = localStorage.getItem('refresh_token')
      if (refreshToken) {
        try {
          const response = await axios.post(`${api.defaults.baseURL}/api/auth/refresh`, {
            refresh_token: refreshToken,
          })

          const newAccessToken = response.data.access_token
          localStorage.setItem('access_token', newAccessToken)

          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          return api(originalRequest)
        } catch (refreshError) {
          // Refresh failed, redirect to login
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          window.location.href = '/login'
          return Promise.reject(refreshError)
        }
      } else {
        // No refresh token, redirect to login
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
)


/* 🧩 ADDED: Debug mode interceptor (only active in development)
-------------------------------------------------------------- */
if (import.meta.env.DEV) {
  api.interceptors.request.use((config) => {
    // ✅ Mark start time to calculate request duration later
    config.metadata = { startTime: new Date() }

    console.groupCollapsed(
      `%c📤 API Request: ${config.method?.toUpperCase()} ${config.url}`,
      'color: #00aaff; font-weight: bold;'
    )
    console.log('🔹 Headers:', config.headers)
    console.log('🔹 Body:', config.data)
    console.groupEnd()

    return config
  })

  api.interceptors.response.use(
    (response) => {
      // ⏱️ Calculate request duration
      const duration = new Date() - response.config.metadata.startTime

      console.groupCollapsed(
        `%c📥 API Response: ${response.status} ${response.config.url} (${duration} ms)`,
        'color: #00cc66; font-weight: bold;'
      )
      console.log('✅ Data:', response.data)
      console.groupEnd()

      return response
    },
    (error) => {
      // ⏱️ Calculate request duration even on failure
      const duration = error.config?.metadata
        ? new Date() - error.config.metadata.startTime
        : 'N/A'

      console.groupCollapsed(
        `%c❌ API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url} (${duration} ms)`,
        'color: #ff5555; font-weight: bold;'
      )
      console.error('⚠️ Status:', error.response?.status)
      console.error('⚠️ Data:', error.response?.data)
      console.error('⚠️ Config:', error.config)
      console.groupEnd()

      return Promise.reject(error)
    }
  )
}
/* 🧩 END ADDED DEBUG SECTION
-------------------------------------------------------------- */

export default api