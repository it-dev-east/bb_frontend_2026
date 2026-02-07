<!-- src/views/NotFoundApp.vue -->
<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-2">404</h1>
    <p class="text-gray-600 mb-4">Menu atau halaman tidak ditemukan</p>

    <div class="flex gap-2">
      <router-link to="/app/dashboard" class="text-blue-600 underline">
        Kembali ke Dashboard
      </router-link>
      <button @click="$router.back()" class="text-gray-500 underline">
        Kembali
      </button>
    </div>
  </div>
</template>
