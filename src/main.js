import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import axios from 'axios'
import { initializeTimezone } from './lib/timezone.js'
import router from "./router"

const app = createApp(App)

app.use(router)
app.mount("#app")

// Initialize global timezone configuration
initializeTimezone()

// axios.defaults.baseURL = 'http://localhost:8000'

// // Set token if exists
// const token = localStorage.getItem('token')
// if (token) {
//   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
// }

// createApp(App).mount('#app')
