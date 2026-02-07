<!-- App.vue -->
<template>
  <router-view />
</template>



<script setup>
import { ref, provide, onMounted } from "vue"
import Header from "./components/Header.vue"
import Sidebar from "./components/Sidebar.vue"
import MainMenu from "./components/MainMenu.vue"
import Login from "./views/Login.vue"
import { useIdleTimeoutFromServer } from "./composables/useIdleTimeoutFromServer.js"
import api from "./lib/axios.js"

const currentView = ref("dashboard")
const isLoggedIn = ref(false)
const sidebarOpen = ref(true)
const sidebarCollapsed = ref(false)

// Logout function
const logout = () => {
  isLoggedIn.value = false
  localStorage.removeItem("user")
  localStorage.removeItem("access_token")
  localStorage.removeItem("refresh_token")
}

// Use idle timeout composable with logout callback
const { resetTimer } = useIdleTimeoutFromServer(logout)

const changeView = (view) => {
  currentView.value = view
}
const toggleSidebar = () => {
  //sidebarOpen.value = !sidebarOpen.value
  sidebarCollapsed.value = !sidebarCollapsed.value
}

onMounted(() => {
  const accessToken = localStorage.getItem("access_token")
  if (accessToken) {
    isLoggedIn.value = true
  }
})

provide("changeView", changeView)

// <template>
//   <!-- Show Login if user not logged in -->
//   <Login v-if="!isLoggedIn" />

//   <!-- Main layout -->
//   <div v-else class="min-h-screen flex flex-col bg-background text-foreground">
//     <!-- Top header -->
//     <Header @toggle-sidebar="toggleSidebar" />

//     <!-- Main content area -->
//     <div class="flex flex-1 overflow-hidden">
//       <!-- Sidebar -->
//       <Sidebar :collapsed="sidebarCollapsed" @change-view="currentView = $event" />

//       <!-- Main content / view container -->
//       <main class="flex-1 p-4 overflow-auto">
//         <MainMenu :current-view="currentView" @change-view="currentView = $event" />
//       </main>
//     </div>
//   </div>
// </template>

</script>
