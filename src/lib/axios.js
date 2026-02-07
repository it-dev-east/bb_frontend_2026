//axios.js 

import axios from 'axios'

// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
})

/* ------------------------------------------------------------------
   🔒 Token & Refresh Handling (Safe with Race-Condition Protection)
------------------------------------------------------------------ */
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

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

    // Handle 401 unauthorized (access token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Prevent infinite retry loop
      originalRequest._retry = true

      if (isRefreshing) {
        // Wait for ongoing refresh to finish
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return api(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      isRefreshing = true

      const refreshToken = localStorage.getItem('refresh_token')
      if (!refreshToken) {
        handleLogout()
        return Promise.reject(error)
      }

      try {
        // Use clean axios instance (no interceptors)
        const { data } = await axios.post(
          `${api.defaults.baseURL}/api/auth/refresh`,
          { refresh_token: refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        )

        const newAccessToken = data.access_token
        localStorage.setItem('access_token', newAccessToken)
        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`

        processQueue(null, newAccessToken)
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        handleLogout()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    
    }

    return Promise.reject(error)
  }
)

/* ------------------------------------------------------------------
   🚪 Logout helper — safely redirect
------------------------------------------------------------------ */
function handleLogout() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')

  // ✅ don't force login redirect when user is on public registrasi
  if (window.location.pathname === '/registrasi') return

  if (window.location.pathname !== '/login') {
    alert('Please log in again.')
    //window.location.href = '/login'
    window.location.href = '/'
  }
}

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
export { handleLogout }