import { ref, onMounted, onUnmounted } from 'vue'
import api from '@/lib/axios'

export function useIdleTimeoutFromServer(onLogout) {
  const idleTimeoutMs = ref(0)
  const lastActivity = ref(Date.now())
  const timeoutId = ref(null)

  // Events to track user activity
  const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']

  const resetTimer = () => {
    lastActivity.value = Date.now()
    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
    }
    if (idleTimeoutMs.value > 0) {
      timeoutId.value = setTimeout(logout, idleTimeoutMs.value)
    }
  }

  const logout = () => {
    // Clear tokens and call logout callback
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    if (onLogout) {
      onLogout()
    }
  }

  const fetchIdleTimeout = async () => {
    try {
      const response = await api.get('/api/config/idle-timeout')
      idleTimeoutMs.value = response.data.timeout_minutes * 60 * 1000 // Convert minutes to milliseconds
      resetTimer()
    } catch (error) {
      console.error('Error fetching idle timeout:', error)
      idleTimeoutMs.value = 15 * 60 * 1000 // Default 15 minutes
      resetTimer()
    }
  }

  const addEventListeners = () => {
    events.forEach(event => {
      document.addEventListener(event, resetTimer, true)
    })
  }

  const removeEventListeners = () => {
    events.forEach(event => {
      document.removeEventListener(event, resetTimer, true)
    })
  }

  onMounted(() => {
    fetchIdleTimeout()
    addEventListeners()
  })

  onUnmounted(() => {
    removeEventListeners()
    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
    }
  })

  return {
    idleTimeoutMs,
    resetTimer
  }
}