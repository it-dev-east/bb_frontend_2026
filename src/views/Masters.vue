<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-xl font-semibold tracking-tight flex items-center gap-2">
        <ClipboardList class="w-5 h-5" />
        Masters
      </h1>
      <p class="text-gray-500 mt-1">
        Pusat pengelolaan data referensi utama (master data) yang digunakan oleh seluruh modul dalam sistem
      </p>
    </div>

    <!-- Card Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card
        class="cursor-pointer hover:shadow-md transition-all duration-200"
        @click="go('masters-user')"
      >
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <UserRoundCog class="w-5 h-5 text-primary" />
            Master User
          </CardTitle>
          <CardDescription>
            Menampilkan daftar user / pengaturan user sistem.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ClipboardList, UserRoundCog } from "lucide-vue-next"

const router = useRouter()

function go(path) {
  router.push(`/app/${path}`)
}
</script>
