<!--Header.vue -->
<template>
  <header class="bg-blue-600 text-primary-foreground p-4 flex justify-between items-center">
    <div class="flex items-center space-x-2">
      <!-- Sidebar toggle button -->
      <Button variant="ghost" @click="$emit('toggle-sidebar')">☰</Button>
      <h1 class="text-2xl font-bold">Blood Donor Management</h1>
    </div>
    <div v-if="user" class="flex items-center space-x-4">

      <div class="inline-flex items-center px-3 py-1 rounded-md bg-white/10 backdrop-blur-sm border border-white/20">
        <span class="text-sm font-medium text-white tracking-wide">Welcome, {{ user.full_name }}</span>
      </div>
      <Button 
        class="bg-red-500/90 text-white hover:bg-red-600 border-red-400/50 backdrop-blur-sm"
        @click="logout"
      ><Power class="w-5 h-5" />
      </Button>

    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue"
import api, { handleLogout } from "@/lib/axios.js"
import { Button } from "@/components/ui/button"
import { Power } from "lucide-vue-next"

const user = ref(null)

onMounted(() => {
  const userData = localStorage.getItem("user")
  if (userData) {
    user.value = JSON.parse(userData)
  }
})

// const logout = () => {
//   localStorage.removeItem("user")
//   localStorage.removeItem("token")
//   window.location.href = '/'
//   //delete api.defaults.headers.common['Authorization']
//   if (window.location.pathname !== '/login') {
//     alert('Session expired. Please log in again.')
//     window.location.href = '/login'
//   }
// }

const logout = async () => {
  try {
    // Optional: call your backend logout endpoint if it exists
    //await api.post("/api/auth/logout")

    // Use centralized logout logic
    handleLogout()
  } catch (error) {
    console.error("Logout failed:", error)
    handleLogout() // Fallback local logout
  }
}
</script>
