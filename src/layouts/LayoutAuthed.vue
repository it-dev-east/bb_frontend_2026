<!--LayoutAuthed.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground">
    <Header @toggle-sidebar="toggleSidebar" />

    <div class="flex flex-1 overflow-hidden">
      <Sidebar :collapsed="sidebarCollapsed" />
      <main class="flex-1 p-4 overflow-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import Header from "@/components/Header.vue"
import Sidebar from "@/components/Sidebar.vue"

const sidebarCollapsed = ref(false)
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}
</script>
