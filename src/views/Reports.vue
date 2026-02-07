<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-xl font-semibold tracking-tight flex items-center gap-2">
        <ClipboardList class="w-5 h-5" />
        Reports
      </h1>
      <p class="text-gray-500 mt-1">
        Pilih laporan yang ingin Anda cari dari menu di bawah ini.
      </p>
    </div>

    <!-- Card Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card
        class="cursor-pointer hover:shadow-md transition-all duration-200"
        @click="go('reports-donor-ditolak')"
      >
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <ClipboardClock class="w-5 h-5 text-primary" />
            Laporan Donor yang Ditolak
          </CardTitle>
          <CardDescription>
            Menampilkan daftar donor yang ditolak berdasarkan hasil verifikasi atau skrining.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card class="cursor-pointer hover:shadow-md transition-all duration-200" @click="go('reports-kartu-stok')">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <ClipboardClock class="w-5 h-5 text-primary" />
            Laporan Kartu Stok
          </CardTitle>
          <CardDescription>Menampilkan daftar stok kantong darah yang siap pakai.</CardDescription>
        </CardHeader>
      </Card>

      <Card class="cursor-pointer hover:shadow-md transition-all duration-200" @click="go('reports-registrasi-pendonor')">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <ClipboardClock class="w-5 h-5 text-primary" />
            Laporan Registrasi Pendonor
          </CardTitle>
          <CardDescription>Menampilkan daftar Registrasi Pendonor per rentang waktu.</CardDescription>
        </CardHeader>
      </Card>

      <Card class="cursor-pointer hover:shadow-md transition-all duration-200" @click="go('reports-jumlah-pendonor')">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <ClipboardClock class="w-5 h-5 text-primary" />
            Laporan Jumlah Pendonor
          </CardTitle>
          <CardDescription>Menampilkan jumlah pendonor yang terdaftar per rentang waktu.</CardDescription>
        </CardHeader>
      </Card>

      <Card class="cursor-pointer hover:shadow-md transition-all duration-200" @click="go('reports-jumlah-komponen-diolah')">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <ClipboardClock class="w-5 h-5 text-primary" />
            Laporan Jumlah Komponen Diolah
          </CardTitle>
          <CardDescription>Menampilkan jumlah komponen darah yang telah diolah.</CardDescription>
        </CardHeader>
      </Card>

      <Card class="cursor-pointer hover:shadow-md transition-all duration-200" @click="go('reports-kinerja-aftap')">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <ClipboardClock class="w-5 h-5 text-primary" />
            Laporan Kinerja Aftap
          </CardTitle>
          <CardDescription>Menampilkan kinerja proses Aftap dalam pengolahan darah.</CardDescription>
        </CardHeader>
      </Card>

      <Card class="cursor-pointer hover:shadow-md transition-all duration-200" @click="go('reports-pengiriman-darah')">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <ClipboardClock class="w-5 h-5 text-primary" />
            Laporan Pengiriman Darah
          </CardTitle>
          <CardDescription>Menampilkan data pengiriman kantong darah ke berbagai lokasi.</CardDescription>
        </CardHeader>
      </Card>

      <Card class="cursor-pointer hover:shadow-md transition-all duration-200" @click="go('reports-hasil-skrining')">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <ClipboardClock class="w-5 h-5 text-primary" />
            Laporan Hasil Skrining
          </CardTitle>
          <CardDescription>Menampilkan hasil skrining darah pendonor.</CardDescription>
        </CardHeader>
      </Card>

      <Card class="cursor-pointer hover:shadow-md transition-all duration-200" @click="go('reports-hasil-skrining-ulang')">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <ClipboardClock class="w-5 h-5 text-primary" />
            Laporan Hasil Skrining Ulang
          </CardTitle>
          <CardDescription>Menampilkan hasil skrining ulang darah pendonor.</CardDescription>
        </CardHeader>
      </Card>

      <Card class="cursor-pointer hover:shadow-md transition-all duration-200" @click="go('reports-kontigensi-imltd')">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <ClipboardClock class="w-5 h-5 text-primary" />
            Laporan Kontigensi IMLTD
          </CardTitle>
          <CardDescription>Menampilkan laporan kontigensi terkait IMLTD.</CardDescription>
        </CardHeader>
      </Card>

      <Card class="cursor-pointer hover:shadow-md transition-all duration-200" @click="go('reports-penerimaan-kantong')">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <ClipboardClock class="w-5 h-5 text-primary" />
            Laporan Penerimaan Kantong
          </CardTitle>
          <CardDescription>Menampilkan data penerimaan kantong darah.</CardDescription>
        </CardHeader>
      </Card>

      <Card class="cursor-pointer hover:shadow-md transition-all duration-200" @click="go('reports-pengolahan-darah')">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <ClipboardClock class="w-5 h-5 text-primary" />
            Laporan Pengolahan Darah
          </CardTitle>
          <CardDescription>Menampilkan proses pengolahan darah dan komponennya.</CardDescription>
        </CardHeader>
      </Card>

      <Card class="cursor-pointer hover:shadow-md transition-all duration-200" @click="go('reports-produk-release')">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <ClipboardClock class="w-5 h-5 text-primary" />
            Laporan Produk Release
          </CardTitle>
          <CardDescription>Menampilkan produk darah yang telah direlease.</CardDescription>
        </CardHeader>
      </Card>

      <Card class="cursor-pointer hover:shadow-md transition-all duration-200" @click="go('reports-distribusi-komponen-darah')">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <ClipboardClock class="w-5 h-5 text-primary" />
            Laporan Distribusi Komponen Darah
          </CardTitle>
          <CardDescription>Menampilkan distribusi komponen darah ke rumah sakit.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ClipboardClock, ClipboardList } from "lucide-vue-next"

const router = useRouter()

function go(menuPath) {
  // child routes live under /app
  router.push(`/app/${menuPath}`)
}
</script>
