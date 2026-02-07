<!--MenuItem.vue -->
<template>
  <li>
    <!-- LEAF MENU ITEM -->
    <Button
      v-if="!menu.children || menu.children.length === 0"
      variant="ghost"
      class="w-full flex items-center transition-all duration-300
      hover:bg-blue-100 hover:text-blue-700
      transition-colors"
      :class="collapsed ? 'justify-center px-2' : 'justify-start gap-2 px-3'"
      @click.prevent="changeView(menu.menu_path)"
    >
      <!-- Icon always visible -->
      <component
        :is="icons[menu.menu_icon]"
        v-if="menu.menu_icon && icons[menu.menu_icon]"
        class="w-5 h-5 shrink-0"
      />
      <!-- Menu name hidden when collapsed -->
      <span v-if="!collapsed" class="truncate">{{ menu.menu_name }}</span>
    </Button>

    <!-- PARENT MENU WITH CHILDREN -->
    <div v-else>
      <div
        class="font-semibold p-2 flex items-center transition-all duration-300"
        :class="collapsed ? 'justify-center' : 'justify-start gap-2'"
      >
        <component
          :is="icons[menu.menu_icon]"
          v-if="menu.menu_icon && icons[menu.menu_icon]"
          class="w-5 h-5 shrink-0"
        />
        <span v-if="!collapsed" class="truncate">{{ menu.menu_name }}</span>
      </div>

      <!-- Show child menus only when expanded -->
      <ul v-if="!collapsed" class="ml-4 space-y-1">
        <MenuItem
          v-for="child in menu.children"
          :key="child.menu_id"
          :menu="child"
          :collapsed="collapsed"
        />
      </ul>
    </div>
  </li>
</template>

<script setup>
import MenuItem from "./MenuItem.vue"
import { Button } from "@/components/ui/button"
import { useRouter } from "vue-router"
import {
  LayoutDashboard,
  UserPen,
  BookUser,
  Syringe,
  Stethoscope,
  HeartPulse,
  ArrowBigRightDash,
  SquareArrowLeft,
  ScanSearch,
  CircleArrowLeft,
  BriefcaseMedical,
  SquareCheckBig,
  ClipboardClock,
  Settings,
  ClipboardList,
  UserRoundX,
  Bolt,
  Info,UserRoundCog,Droplets,TriangleAlert,Package,
  Flame
} from "lucide-vue-next"

// const emit = defineEmits(["change-view"])

const props = defineProps({
  menu: Object,
  collapsed: Boolean
})

const router = useRouter()

const icons = {
  LayoutDashboard,
  UserPen,
  BookUser,
  Syringe,
  Stethoscope,
  HeartPulse,
  ArrowBigRightDash,
  SquareArrowLeft,
  ScanSearch,
  CircleArrowLeft,
  BriefcaseMedical,
  SquareCheckBig,
  ClipboardClock,
  Settings,
  ClipboardList,
  UserRoundX,
  Bolt,
  Info,UserRoundCog,Droplets,TriangleAlert,Package,Flame
}

const isActive = (menuPath) => {
  return router.path === `/app/${menuPath}`
}

function changeView(menuPath) {
  if (!menuPath) return
  router.push(`/app/${menuPath}`)
}

// function changeView(view) {
//   emit("change-view", view)
// }
</script>
