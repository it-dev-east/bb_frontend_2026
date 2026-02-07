// timezone.js - Global timezone configuration for Vue app
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import api from './axios.js'

// Extend dayjs with plugins
dayjs.extend(utc)
dayjs.extend(timezone)

// Global timezone variable
let globalTimezone = null

/**
 * Fetch timezone from backend API and set it globally in dayjs
 * This should be called once when the app starts
 */
export async function initializeTimezone() {
  try {
    const response = await api.get('/api/config/timezone')
    const timezone = response.data.timezone

    if (timezone) {
      // Set the global timezone for dayjs
      dayjs.tz.setDefault(timezone)
      globalTimezone = timezone
      console.log(`Global timezone set to: ${timezone}`)
    } else {
      console.warn('No timezone configured from backend, using system default')
    }
  } catch (error) {
    console.error('Failed to fetch timezone from backend:', error)
    // Fallback to system timezone
  }
}

/**
 * Get the current global timezone
 */
export function getGlobalTimezone() {
  return globalTimezone
}

/**
 * Format a date/time using the global timezone
 * @param {string|Date|dayjs.Dayjs} date - The date to format
 * @param {string} format - The format string (default: 'YYYY-MM-DD HH:mm:ss')
 * @returns {string} Formatted date string
 */
export function formatWithTimezone(date, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!globalTimezone) {
    // Fallback to local formatting if no global timezone
    return dayjs(date).format(format)
  }

  return dayjs(date).tz(globalTimezone).format(format)
}

/**
 * Parse a date string assuming it's in the global timezone
 * @param {string} dateString - The date string to parse
 * @param {string} format - The format of the input string
 * @returns {dayjs.Dayjs} Parsed dayjs object
 */
export function parseWithTimezone(dateString, format) {
  if (!globalTimezone) {
    return dayjs(dateString, format)
  }

  return dayjs.tz(dateString, format, globalTimezone)
}

// Export dayjs for convenience
export { dayjs }