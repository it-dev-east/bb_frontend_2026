<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto space-y-6">
      <!-- Header -->
      <div class="fade-in">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p class="text-gray-600">Ringkasan data donor darah dan stok darah</p>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 fade-in" style="animation-delay: 0.1s">
        <Card class="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader class="pb-2">
            <CardTitle class="text-sm font-medium text-gray-600">Donor Rutin Hari Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold text-blue-600">{{ donasiHariIni.rutin }}</div>
            <p class="text-xs text-gray-500 mt-1">Total donor rutin</p>
          </CardContent>
        </Card>

        <Card class="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader class="pb-2">
            <CardTitle class="text-sm font-medium text-gray-600">Donor Apheresis Hari Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold text-green-600">{{ donasiHariIni.apheresis }}</div>
            <p class="text-xs text-gray-500 mt-1">Total donor apheresis</p>
          </CardContent>
        </Card>

        <Card class="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader class="pb-2">
            <CardTitle class="text-sm font-medium text-gray-600">Darah Direlease Hari Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold text-purple-600">{{ donasiHariIni.release }}</div>
            <p class="text-xs text-gray-500 mt-1">Kantong darah direlease</p>
          </CardContent>
        </Card>

        <Card class="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader class="pb-2">
            <CardTitle class="text-sm font-medium text-gray-600">Total Donor Hari Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold text-indigo-600">{{ donasiHariIni.rutin + donasiHariIni.apheresis }}</div>
            <p class="text-xs text-gray-500 mt-1">Total semua donor</p>
          </CardContent>
        </Card>
      </div>

      <!-- Charts and Tables Grid -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <!-- Donor Chart -->
        <Card class="shadow-sm fade-in" style="animation-delay: 0.2s">
          <CardHeader>
            <CardTitle class="text-lg font-semibold text-gray-900">Grafik Jumlah Donor (30 Hari Terakhir)</CardTitle>
            <CardDescription>Jumlah donor per hari dalam 30 hari terakhir</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="h-80">
              <Line :data="chartData" :options="chartOptions" :key="chartData.labels.join(',')" />
            </div>
          </CardContent>
        </Card>

        <!-- Stock Table 1
        <Card class="shadow-sm fade-in" style="animation-delay: 0.3s">
          <CardHeader>
            <CardTitle class="text-lg font-semibold text-gray-900">Stok Darah Siap Pakai</CardTitle>
            <CardDescription>Daftar stok darah yang tersedia</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nomor Barcode</TableHead>
                    <TableHead>Komponen</TableHead>
                    <TableHead>Golongan Darah</TableHead>
                    <TableHead>Rhesus</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="item in stokDarah.slice(0, 10)" :key="item.nomor_barcode">
                    <TableCell class="font-mono text-sm">{{ item.nomor_barcode }}</TableCell>
                    <TableCell>{{ item.komponen }}</TableCell>
                    <TableCell>{{ item.golongan_darah }}</TableCell>
                    <TableCell>{{ item.rhesus }}</TableCell>
                  </TableRow>
                  <TableRow v-if="stokDarah.length === 0">
                    <TableCell colspan="4" class="text-center text-gray-500 py-8">
                      Tidak ada data stok darah
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div v-if="stokDarah.length > 10" class="text-sm text-gray-500 mt-2">
              Menampilkan 10 dari {{ stokDarah.length }} item
            </div>
          </CardContent>
        </Card>
        -->

        <!-- Stock Table 2 -->
        <Card class="shadow-sm fade-in hover:shadow-md transition-shadow duration-300" style="animation-delay: 0.3s">
          <CardHeader>
            <CardTitle class="text-lg font-semibold text-gray-900">Stok Darah Siap Pakai (Summary)</CardTitle>
            <CardDescription>Ringkasan stok darah berdasarkan komponen dan golongan darah</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead class="bg-gray-50 font-semibold text-gray-700 sticky left-0 z-10">Komponen</TableHead>
                    <TableHead class="bg-gray-50 text-center font-semibold text-gray-700">A+</TableHead>
                    <TableHead class="bg-gray-50 text-center font-semibold text-gray-700">A-</TableHead>
                    <TableHead class="bg-gray-50 text-center font-semibold text-gray-700">B+</TableHead>
                    <TableHead class="bg-gray-50 text-center font-semibold text-gray-700">B-</TableHead>
                    <TableHead class="bg-gray-50 text-center font-semibold text-gray-700">AB+</TableHead>
                    <TableHead class="bg-gray-50 text-center font-semibold text-gray-700">AB-</TableHead>
                    <TableHead class="bg-gray-50 text-center font-semibold text-gray-700">O+</TableHead>
                    <TableHead class="bg-gray-50 text-center font-semibold text-gray-700">O-</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow
                    v-for="item in stokSummary"
                    :key="item.komponen"
                    class="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <TableCell class="font-medium sticky left-0 bg-white border-r border-gray-200">{{ item.komponen }}</TableCell>
                    <TableCell class="text-center" :class="getStockCellClass(item['A+'])">{{ item['A+'] }}</TableCell>
                    <TableCell class="text-center" :class="getStockCellClass(item['A-'])">{{ item['A-'] }}</TableCell>
                    <TableCell class="text-center" :class="getStockCellClass(item['B+'])">{{ item['B+'] }}</TableCell>
                    <TableCell class="text-center" :class="getStockCellClass(item['B-'])">{{ item['B-'] }}</TableCell>
                    <TableCell class="text-center" :class="getStockCellClass(item['AB+'])">{{ item['AB+'] }}</TableCell>
                    <TableCell class="text-center" :class="getStockCellClass(item['AB-'])">{{ item['AB-'] }}</TableCell>
                    <TableCell class="text-center" :class="getStockCellClass(item['O+'])">{{ item['O+'] }}</TableCell>
                    <TableCell class="text-center" :class="getStockCellClass(item['O-'])">{{ item['O-'] }}</TableCell>
                  </TableRow>
                  <TableRow v-if="stokSummary.length === 0">
                    <TableCell colspan="9" class="text-center text-gray-500 py-8">
                      <div class="flex items-center justify-center">
                        <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
                        Memuat data...
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <!-- Expiry Table -->
        <Card class="shadow-sm fade-in xl:col-span-2" style="animation-delay: 0.4s">
          <CardHeader>
            <CardTitle class="text-lg font-semibold text-gray-900">Darah Kadaluarsa ≤ 14 Hari</CardTitle>
            <CardDescription>Daftar darah yang akan kadaluarsa dalam 14 hari ke depan</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nomor Barcode</TableHead>
                    <TableHead>Komponen</TableHead>
                    <TableHead>Golongan Darah</TableHead>
                    <TableHead>Rhesus</TableHead>
                    <TableHead>Tanggal Kadaluarsa</TableHead>
                    <TableHead>Sisa Hari</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow
                    v-for="item in kadaluarsa"
                    :key="item.nomor_barcode"
                    :class="getExpiryRowClass(item.tanggal_kadaluarsa)"
                  >
                    <TableCell class="font-mono text-sm">{{ item.nomor_barcode }}</TableCell>
                    <TableCell>{{ item.komponen }}</TableCell>
                    <TableCell>{{ item.golongan_darah }}</TableCell>
                    <TableCell>{{ item.rhesus }}</TableCell>
                    <TableCell>{{ formatDate(item.tanggal_kadaluarsa) }}</TableCell>
                    <TableCell>{{ item.sisa_hari }}</TableCell>
                  </TableRow>
                  <TableRow v-if="kadaluarsa.length === 0">
                    <TableCell colspan="6" class="text-center text-gray-500 py-8">
                      Tidak ada darah yang akan kadaluarsa dalam 14 hari
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import api from '../lib/axios.js'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../components/ui/table'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

// Reactive data
const grafikDonor = ref([])
const stokDarah = ref([])
const kadaluarsa = ref([])
const stokSummary = ref([])
const donasiHariIni = ref({
  rutin: 0,
  apheresis: 0,
  release: 0
})

// Auto-refresh
let refreshInterval = null

// Chart data
const chartData = ref({
  labels: [],
  datasets: [{
    label: 'Jumlah Donor',
    data: [],
    borderColor: 'rgb(59, 130, 246)',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    tension: 0.4,
    fill: true
  }]
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1
      }
    }
  }
})

// Methods
const fetchDashboardData = async () => {
  try {
    const response = await api.get('/api/dashboard')
    const data = response.data
    console.log('Dashboard data:', data)
    grafikDonor.value = data.grafik_donor || []
    stokDarah.value = data.stok_darah || []
    kadaluarsa.value = data.kadaluarsa || []
    donasiHariIni.value = data.donasi_hari_ini || { rutin: 0, apheresis: 0, release: 0 }

    // Update chart data
    updateChartData()
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
  }
}

const fetchStokSummary = async () => {
  try {
    const response = await api.get('/api/dashboard/stok_summary')
    stokSummary.value = response.data || []
  } catch (error) {
    console.error('Error fetching stok summary:', error)
    stokSummary.value = []
  }
}

const updateChartData = () => {
  const labels = grafikDonor.value.map(item => {
    const date = new Date(item.tanggal)
    return date.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit' })
  })

  const data = grafikDonor.value.map(item => item.jumlah)

  // ✅ Assign a new object reference to trigger chart update
  chartData.value = {
    labels,
    datasets: [
      {
        label: 'Jumlah Donor',
        data,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  }
}


const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const getExpiryRowClass = (tanggalKadaluarsa) => {
  if (!tanggalKadaluarsa) return ''

  const today = new Date()
  const expiryDate = new Date(tanggalKadaluarsa)
  const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24))

  if (daysUntilExpiry <= 7) {
    return 'bg-red-50 hover:bg-red-100'
  }
  return ''
}

const getStockCellClass = (count) => {
  // if (count > 0) {
  //   return 'bg-blue-100 text-blue-800 font-semibold'
  // } //else 
  if (count < 1) 
  {

    return 'bg-red-100 text-red-800 font-semibold'
  }
  return 'text-gray-700'
}

// Lifecycle
onMounted(() => {
  fetchDashboardData()
  fetchStokSummary()
  // Auto-refresh every 5 minutes (300,000 milliseconds)
  refreshInterval = setInterval(() => {
    fetchDashboardData()
    fetchStokSummary()
  }, 300000)
})

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
  }
})
</script>

<style scoped>
.fade-in {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>