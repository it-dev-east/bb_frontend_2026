<!-- TimezoneExample.vue - Example component showing how to use global timezone -->
<template>
  <div class="p-4 border rounded-lg">
    <h3 class="text-lg font-semibold mb-4">Timezone Configuration Example</h3>

    <div class="space-y-4">
      <!-- Current timezone display -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Current Global Timezone:</label>
        <p class="text-sm text-gray-600">{{ currentTimezone || 'Not set' }}</p>
      </div>

      <!-- Current time display -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Current Time (with timezone):</label>
        <p class="text-sm text-gray-600">{{ currentTimeFormatted }}</p>
      </div>

      <!-- Example date formatting -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Example Date Formatting:</label>
        <div class="text-sm text-gray-600 space-y-1">
          <p>ISO String: {{ exampleDate.iso }}</p>
          <p>Formatted: {{ exampleDate.formatted }}</p>
          <p>Relative: {{ exampleDate.relative }}</p>
        </div>
      </div>

      <!-- Usage instructions -->
      <div class="mt-6 p-3 bg-blue-50 rounded">
        <h4 class="text-sm font-medium text-blue-800 mb-2">How to use in your components:</h4>
        <pre class="text-xs text-blue-700 whitespace-pre-wrap"><code>import { formatWithTimezone, parseWithTimezone, dayjs } from '@/lib/timezone.js'

// Format dates with global timezone
const formattedDate = formatWithTimezone(new Date(), 'YYYY-MM-DD HH:mm:ss')

// Parse dates assuming they're in global timezone
const parsedDate = parseWithTimezone('2024-01-01 12:00:00', 'YYYY-MM-DD HH:mm:ss')

// Use dayjs with global timezone
const now = dayjs().format('YYYY-MM-DD HH:mm:ss')</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { formatWithTimezone, getGlobalTimezone, dayjs } from '@/lib/timezone.js'

const currentTimezone = ref(null)
const currentTime = ref(new Date())

// Computed properties for reactive updates
const currentTimeFormatted = computed(() => {
  return formatWithTimezone(currentTime.value, 'YYYY-MM-DD HH:mm:ss z')
})

const exampleDate = computed(() => {
  const example = dayjs('2024-01-15 14:30:00')
  return {
    iso: example.toISOString(),
    formatted: formatWithTimezone(example, 'dddd, MMMM D, YYYY h:mm A'),
    relative: example.fromNow()
  }
})

// Update current time every second
onMounted(() => {
  currentTimezone.value = getGlobalTimezone()

  const timer = setInterval(() => {
    currentTime.value = new Date()
  }, 1000)

  // Cleanup timer on unmount
  return () => clearInterval(timer)
})
</script>

<style scoped>
/* Add any component-specific styles here */
</style>