<!--Sidebar.vue -->
<template>
  <!-- Desktop Sidebar <p class="text-xs text-gray-500">Collapsed: {{ collapsed }}</p> -->
  
  <aside
    class="flex flex-col border-r bg-background transition-all duration-300"
    :class="collapsed ? 'w-16' : 'w-72'"
  >
    <div class="p-4 font-semibold text-lg truncate">
      <span v-if="!collapsed">Menu Utama</span>
      <span v-else>🩸</span> <!-- small logo or icon -->
    </div>
    <nav class="px-2 py-4 space-y-1">
      <ul>
        <MenuItem
          v-for="menu in menus"
          :key="menu.menu_id"
          :menu="menu"
          :collapsed="collapsed"
        />
      </ul>
    </nav>
  </aside>

  <!-- Mobile Sidebar (Sheet/Drawer) -->
  <Sheet v-model:open="mobileOpen">
    <SheetTrigger as-child>
      <Button variant="ghost" class="md:hidden m-2">☰</Button>
    </SheetTrigger>
    <SheetContent side="left" class="p-0 w-64">
      <div class="p-4 font-semibold text-lg">Menu Utama</div>
      <nav class="px-2 py-4 space-y-1">
        <ul>
          <MenuItem
            v-for="menu in menus"
            :key="menu.menu_id"
            :menu="menu"
            :collapsed="collapsed"
          />
        </ul>
      </nav>
    </SheetContent>
  </Sheet>
</template>

<script setup>
import { ref, onMounted } from "vue"
import api from "@/lib/axios.js"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import MenuItem from "./MenuItem.vue"

const menus = ref([])
const mobileOpen = ref(false)
// const emit = defineEmits(['change-view'])
const props = defineProps({
  collapsed: Boolean
})


onMounted(async () => {
  const userData = localStorage.getItem('user')
  //console.log("const user:", userData)
  if (userData) {
    const user = JSON.parse(userData)
    //console.log("Fetched user:", userData)
    try {
      const response = await api.get(`/api/user_menus/${user.user_id}`)
      menus.value = response.data.menus
      //console.log("Fetched menus:", response.data.menus)
    } catch (error) {
      console.error('Failed to fetch menus:', error)
    }
  } else {
    // User not found in localStorage, log out and redirect to login
    localStorage.removeItem('user')
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    window.location.href = '/login'
  }
})

// function changeView(view) {
//   emit('change-view', view)
// }
</script>
