<template>
  <div class="flex flex-col h-full">
    <!-- 🔹 Top Action Bar (shadcn Button) -->
    <div class="flex gap-2 p-4 bg-white border-0 sticky top-0 z-10">
    <Button @click="refresh" class="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg">
      <RefreshCcw class="w-5 h-5" />
      Refresh
    </Button>
    <!--
    <Button @click="tambahDataBaru" class="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow">
      <Plus class="w-5 h-5" />
      Tambah Data Baru
    </Button>
    -->
    <Button @click="openCariModal" class="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg">
      <Search class="w-5 h-5" />
      Cari Data
    </Button>

    <Button @click="releaseData" class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
      <Unlock class="w-5 h-5" />
      Release
    </Button>

    <Button @click="cetakBarcode" class="flex items-center gap-2 bg-indigo-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
        <Barcode class="w-5 h-5" />
        Cetak Barcode
      </Button>
    </div>

<!-- Middle area: Form -->
<!-- Pengiriman Kantong Darah Section -->
<Card class="mx-4 p-2 shadow-md border rounded-2xl bg-background">
  <CardHeader class="border-b px-4 py-4">
    <h3 class="text-xl font-semibold text-foreground tracking-tight">Pengiriman Kantong Darah</h3>
  </CardHeader>
  
  <CardContent class="pt-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="flex flex-col">
        <Label class="text-sm text-gray-600">Tanggal Pengiriman</Label>
        <Input type="datetime-local" v-model="form.tanggalPengiriman" class="mt-1" readonly/>
      </div>

      <div class="flex flex-col">
        <Label class="text-sm text-gray-600">Nomor Pengiriman</Label>
        <Input v-model="form.nomorPengiriman" class="mt-1" readonly/>
      </div>

      
      <div class="flex flex-col">
        <Label class="text-sm text-gray-600">Nama Petugas</Label>
        <Input v-model="form.namaPetugas" class="mt-1" readonly/>
      </div>
      

      <div class="flex flex-col">
        <Label class="text-sm text-gray-600">Status</Label>
        <Input v-model="form.status" class="mt-1" readonly />
      </div>
    </div>
  </CardContent>
</Card>

<!-- Scan Area (OUTSIDE form) -->
<Card class="m-4 p-2 shadow-md border rounded-2xl bg-background">
  <CardHeader class="border-b px-4 py-4">
    <h4 class="text-xl font-semibold text-foreground tracking-tight">Scan Area</h4>
  </CardHeader>
  
  <CardContent class="pt-6">
    <div class="flex flex-col">
      <Label class="text-sm text-gray-600">Nomor Barcode</Label>
      <div class="flex items-center gap-2 mt-1">
        <Input
          v-model="form.scanNomorBarcode"
          @keyup.enter="scanBarcode"
          placeholder="Scan barcode disini"
          class="flex-1"
        />
        
        <Button 
          @click="scanBarcode" 
          class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus class="w-5 h-5" />
          Tambah
        </Button>
      </div>
    </div>
  </CardContent>
</Card>

<!-- Current Shipment Details -->
<Card v-if="form.id" class="m-4 mt-0 p-4 shadow-md border rounded-2xl bg-background">
  <!-- Title -->
  <CardHeader class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b px-4 py-4">
    <div>
      <h3 class="text-xl font-semibold text-foreground tracking-tight">
        Detail Pengiriman Saat Ini
      </h3>
    </div>
  </CardHeader>

  <!-- Details Table -->
  <CardContent class="p-4">
    <Table>
      <TableHeader class="bg-gray-100">
        <TableRow>
          <TableHead class="font-semibold text-gray-800">Tanggal Pengiriman</TableHead>
          <TableHead class="font-semibold text-gray-800">Nomor Pengiriman</TableHead>
          <TableHead class="font-semibold text-gray-800">Nama Petugas</TableHead>
          <TableHead class="font-semibold text-gray-800">Status</TableHead>
          <TableHead class="font-semibold text-gray-800">Nomor Barcode</TableHead>
          <TableHead class="font-semibold text-gray-800">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow
          v-for="(detail, index) in paginatedDetails"
          :key="detail.id"
          :class="index % 2 === 0 ? 'bg-white' : 'bg-blue-50'"
        >
          <TableCell>{{ formatDate(tableData.find(r => r.id === form.id)?.tanggal_pengiriman) }}</TableCell>
          <TableCell>{{ form.nomorPengiriman }}</TableCell>
          <TableCell>{{ form.namaPetugas }}</TableCell>
          <TableCell>{{ form.status }}</TableCell>
          <TableCell>{{ detail.scan_nomor_barcode }}</TableCell>
          <TableCell>
            <Button
              v-if="form.status === 'draft'"
              size="sm"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              @click="hapusDetail(detail.id)"
            >
              Hapus
            </Button>
          </TableCell>
        </TableRow>

        <!-- Empty State -->
        <TableRow v-if="paginatedDetails.length === 0">
          <TableCell colspan="6" class="text-center text-gray-500">
            No details found
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </CardContent>

  <!-- Pagination -->
  <CardFooter class="flex flex-col sm:flex-row justify-between items-center gap-3 py-4 px-6 border-t bg-muted/30">
    <span class="font-medium text-muted-foreground text-sm">
      Halaman {{ currentPage }} dari {{ totalPages }}
    </span>
    <div class="flex items-center gap-2">
      <Button
        class="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 rounded-lg px-4 py-2 transition-colors"
        @click="prevPage"
        :disabled="currentPage === 1"
      >
        Previous
      </Button>
      <Button
        class="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 rounded-lg px-4 py-2 transition-colors"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        Next
      </Button>
    </div>
  </CardFooter>
</Card>


<div v-show="showCariModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <Card class="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
    <CardHeader>
      <div class="flex justify-between items-center w-full">
        <CardTitle class="text-lg font-semibold text-gray-800">
          Cari Data Pengiriman
        </CardTitle>
        <Button
          variant="destructive"
          class="px-4 py-2 rounded-lg"
          @click="closeCariModal"
        >
          Tutup
        </Button>
      </div>
    </CardHeader>

    <CardContent>
      <!-- 🔎 Search Inputs -->
      <div class="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Nomor Pengiriman</label>
          <Input v-model="search.nomorPengiriman" @input="fetchCariData" placeholder="Nomor Pengiriman" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
          <Input type="date" v-model="search.tanggal" @input="fetchCariData" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select v-model="search.status" @change="fetchCariData" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All</option>
            <option value="draft">Draft</option>
            <option value="Dikirim">Dikirim</option>
          </select>
        </div>
      </div>

      <Button
        variant="default"
        class="mb-4"
        @click="fetchCariData"
      >
        Cari
      </Button>

      <!-- 🔹 Data Table inside Modal -->
      <ScrollArea class="max-h-96">
        <Table>
          <TableHeader class="bg-gray-100">
            <TableRow>
              <TableHead class="font-semibold text-gray-800">Tanggal Pengiriman</TableHead>
              <TableHead class="font-semibold text-gray-800">Nomor Pengiriman</TableHead>
              <TableHead class="font-semibold text-gray-800">Nama Petugas</TableHead>
              <TableHead class="font-semibold text-gray-800">Status</TableHead>
              <TableHead class="font-semibold text-gray-800">Nomor Barcode</TableHead>
              <TableHead class="font-semibold text-gray-800">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow
              v-for="(row, index) in cariPaginatedData"
              :key="row.id"
              :class="index % 2 === 0 ? 'bg-white' : 'bg-blue-50'"
              class="cursor-pointer hover:bg-gray-100"
              @click="selectFromModal(row)"
            >
              <TableCell>{{ formatDate(row.tanggal_pengiriman) }}</TableCell>
              <TableCell>{{ row.nomor_pengiriman }}</TableCell>
              <TableCell>{{ row.nama_petugas }}</TableCell>
              <TableCell>{{ row.status }}</TableCell>
              <TableCell>
                <ul>
                  <li v-for="detail in row.details" :key="detail.id">{{ detail.scan_nomor_barcode }}</li>
                </ul>
              </TableCell>
              <TableCell class="text-center">
                <Button
                  size="sm"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  @click.stop="selectFromModal(row)"
                >
                  Pilih
                </Button>
              </TableCell>
            </TableRow>

            <!-- Empty State -->
            <TableRow v-if="cariPaginatedData.length === 0">
              <TableCell colspan="6" class="text-center text-gray-500">
                No data found
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ScrollArea>

      <!-- 🔹 Pagination inside Modal -->
      <div class="flex justify-between items-center mt-4">
        <Button
          class="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 rounded-lg px-4 py-2 transition-colors"
          @click="cariPrevPage"
          :disabled="cariCurrentPage === 1"
        >
          Previous
        </Button>

        <span class="font-medium text-gray-700">
          Page {{ cariCurrentPage }} of {{ cariTotalPages }}
        </span>

        <Button
          class="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 rounded-lg px-4 py-2 transition-colors"
          @click="cariNextPage"
          :disabled="cariCurrentPage === cariTotalPages"
        >
          Next
        </Button>
      </div>
    </CardContent>
  </Card>
</div>


 
  </div>

</template>


<script setup>
import { ref, reactive, computed } from 'vue'
import VueBarcode from '@chenfengyuan/vue-barcode'
import { RefreshCcw, Plus, Search, Unlock, Barcode } from "lucide-vue-next"
//shadcnvue
import { Button } from "@/components/ui/button"; 
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
//import { FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import CardFooter from '@/components/ui/card/CardFooter.vue';
import api from "../lib/axios.js";

const form = reactive({
  id: null,
  tanggalPengiriman: '',
  nomorPengiriman: '',
  namaPetugas: '',
  status: '',
  scanNomorBarcode: ''
})

const tableData = ref([])

const search = reactive({
  nomorPengiriman: '',
  tanggal: '',
  status: ''
})

const showCariModal = ref(false)
const cariTableData = ref([])
const cariCurrentPage = ref(1)
const cariPageSize = 5


const currentPage = ref(1)
const pageSize = 5

const currentDetails = computed(() => {
  const current = tableData.value.find(row => row.id === form.id)
  return current ? current.details : []
})

const paginatedDetails = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return currentDetails.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(currentDetails.value.length / pageSize))

const cariPaginatedData = computed(() => {
  const start = (cariCurrentPage.value - 1) * cariPageSize
  const end = start + cariPageSize
  return cariTableData.value.slice(start, end)
})

const cariTotalPages = computed(() => Math.ceil(cariTableData.value.length / cariPageSize))

const formattedTanggalPengiriman = computed(() => {
  if (!form.tanggalPengiriman) return ''
  const date = new Date(form.tanggalPengiriman)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${day}-${month}-${year} ${hours}:${minutes}`
})

function refresh() {
  console.log('Refresh clicked')
  fetchData()
}

async function tambahDataBaru() {
  console.log('Tambah Data Baru clicked')

  const user = JSON.parse(localStorage.getItem('user'))
  const username = user?.username || ''
  // set supaya username UI langsung kebaca
  form.namaPetugas = username

  // Fill tanggal pengiriman with now in GMT+7
  const date = new Date()
  date.setHours(date.getHours() + 7) // Adjust to Asia/Bangkok timezone (UTC+7)
  form.tanggalPengiriman = date.toISOString().slice(0, 16)
  console.log('Set tanggalPengiriman to:', form.tanggalPengiriman)

  // Create master record
  try {
    const { data } = await api.post('/api/pengiriman', {
      tanggal_pengiriman: form.tanggalPengiriman,
      nama_petugas: form.namaPetugas
    })
    console.log('Created pengiriman:', data)
    form.id = data.id
    form.nomorPengiriman = data.nomor_pengiriman
    form.status = data.status
    // Don't fetchData here, will fetch after scanning
  } catch (error) {
    console.error('Error creating pengiriman:', error.message)
  }
}

function hapusData() {
  console.log('Hapus Data clicked')
  // Delete data functionality
}

function openCariModal() {
  showCariModal.value = true
  cariCurrentPage.value = 1
  search.tanggal = new Date().toISOString().split('T')[0]
  fetchCariData()
}

function closeCariModal() {
  showCariModal.value = false
}

async function fetchCariData() {
  const params = {}
  if (search.nomorPengiriman) {
    params.nomor_pengiriman = search.nomorPengiriman
  }
  if (search.tanggal) {
    params.tanggal = search.tanggal
  }
  if (search.status) {
    params.status = search.status
  }
  try {
    const { data } = await api.get('/api/pengiriman', { params })
    cariTableData.value = data.data
  } catch (error) {
    console.error('Error fetching cari data:', error.message)
  }
}

function selectFromModal(row) {
  selectPengiriman(row)
  tableData.value = [row]
  closeCariModal()
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const hour12 = hours % 12 || 12
  return `${day}-${month}-${year} ${hour12}:${minutes} ${ampm}`
}

async function releaseData() {
  console.log('Release Data clicked')
  if (!form.id) {
    alert('No pengiriman selected')
    return
  }
  try {
    // Get JWT token from localStorage
    const user = JSON.parse(localStorage.getItem('user'))

    const { data } = await api.put(`/api/pengiriman/${form.id}/release`, {
      nama_petugas: user.username
    })
    alert('Pengiriman released')
    form.status = 'Dikirim'
    fetchData()

    // Insert activity log for each detail
    const { data: detailsData } = await api.get(`/api/pengiriman/${form.nomorPengiriman}/details`)
    const userid = user ? user.username : 'unknown'
    for (const detail of detailsData.data) {
      const barcode = detail.barcode
      // Get aftap data
      const { data: aftap } = await api.get(`/api/pengolahan/${barcode}`)
      const regno = aftap.nomor_registrasi
      const nokantong = aftap.no_kantong_darah
      
      // Get patient data
      const { data: patient } = await api.get(`/api/patients/${regno}`)
      const pid = patient.donor_card_no
      // Insert activity log
      await api.post('/api/activity_log', {
        note: 'Release Data, no:' + form.nomorPengiriman,
        userid: userid,
        pid: pid,
        regno: regno,
        barcodeno: barcode,
        menu: 'Pengiriman Kantong Darah',
        no_kantong: nokantong,
        lokasi: 'In Transit',
        komponen: ''
      })
    }
  } catch (error) {
    console.error('Error releasing:', error.message)
    alert('Error releasing')
  }
}

async function cetakBarcode() {
  console.log('Cetak Barcode clicked')
  if (!form.nomorPengiriman) {
    alert('Silakan pilih data pengiriman terlebih dahulu');
    return;
  }

  // Prepare data for PDF generation
  const pdfData = {
    nomor_pengiriman: form.nomorPengiriman,
    tanggal_pengiriman: form.tanggalPengiriman,
    formatted_tanggal_pengiriman: formattedTanggalPengiriman.value
  };

  try {
    // Call the new API to generate PDF
    const response = await api.post('/api/generate_barcode_pdf_pengiriman', pdfData, {
      responseType: 'blob' // Important for downloading files
    });

    // Open PDF in new tab
    const blob = new Blob([response.data], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    window.open(url, '_blank')

    // Log activity
    const user = JSON.parse(localStorage.getItem('user'))
    const { data: detailsData } = await api.get(`/api/pengiriman/${form.nomorPengiriman}/details`)
    for (const detail of detailsData.data) {
      const barcode = detail.barcode
      const { data: aftap } = await api.get(`/api/pengolahan/${barcode}`)
      const regno = aftap.nomor_registrasi
      const { data: patient } = await api.get(`/api/patients/${regno}`)
      const pid = patient.donor_card_no
      const logData = {
        note: 'Cetak Barcode',
        userid: user.username,
        pid: pid,
        regno: regno,
        barcodeno: barcode,
        no_kantong: aftap.no_kantong_darah,
        lokasi: 'in Transit Pengolahan',
        menu: 'Pengiriman Kantong Darah'
      };
      try {
        const activityRes = await api.post('/api/activity_log', logData);
        console.log('Activity logged:', activityRes.data);
      } catch (err) {
        console.error('Error logging activity:', err);
      }
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Terjadi kesalahan saat mencetak barcode');
  }
}

async function hapusDetail(detailId) {
  if (confirm('Hapus barcode ini?')) {
    try {
      // Get detail info first for activity log
      const { data: detailData } = await api.get(`/api/pengiriman/detail/${detailId}`)
      console.log('Detail data:', detailData)

      // Get data from pemeriksaan_aftap for activity log
      let aftapData = null
      try {
        const { data: aftapResult } = await api.get('/api/pemeriksaan_aftap', { params: { no_barcode: detailData.scan_nomor_barcode } })
        console.log('Aftap data:', aftapResult)
        aftapData = aftapResult.data && aftapResult.data.length > 0 ? aftapResult.data[0] : null
      } catch (aftapError) {
        console.error('Error fetching aftap data:', aftapError)
      }

      // Delete the detail
      const { data: deleteData } = await api.delete(`/api/pengiriman/detail/${detailId}`)
      console.log('Delete response:', deleteData)

      // Insert activity log
      const user = JSON.parse(localStorage.getItem('user'))
      const userid = user ? user.username : 'unknown'
      console.log('User:', user, 'userid:', userid)

      const activityLogData = {
        note: 'Hapus dari Pengiriman, no:' + form.nomorPengiriman,
        userid: userid,
        pid: aftapData ? aftapData.no_kartu_donor : null,
        regno: aftapData ? aftapData.nomor_registrasi : null,
        barcodeno: detailData.scan_nomor_barcode,
        menu: 'Pengiriman Kantong Darah'
      }
      console.log('Activity log data:', activityLogData)

      const { data: activityResult } = await api.post('/api/activity_log', activityLogData)
      console.log('Activity log result:', activityResult)

      fetchData()
    } catch (error) {
      console.error('Error deleting detail:', error.message)
      alert('Error deleting detail')
    }
  }
}

function selectPengiriman(row) {
  form.id = row.id
  form.tanggalPengiriman = row.tanggal_pengiriman.slice(0, 16)
  form.nomorPengiriman = row.nomor_pengiriman
  form.namaPetugas = row.nama_petugas
  form.status = row.status
  currentPage.value = 1
}

async function selectPengirimanByNomor(nomorPengiriman) {
  try {
    const { data } = await api.get('/api/pengiriman', { params: { nomor_pengiriman: nomorPengiriman } })
    if (data.data && data.data.length > 0) {
      const row = data.data[0]
      selectPengiriman(row)
      tableData.value = [row]
      fetchData()
    }
  } catch (error) {
    console.error('Error fetching pengiriman by nomor:', error.message)
  }
}

async function scanBarcode() {
  if (!form.scanNomorBarcode) return

  // First check if barcode already exists in pengiriman_detail
  try {
    const { data: checkData } = await api.get(`/api/pengiriman/check_barcode/${form.scanNomorBarcode}`)
    if (checkData.exists) {
      // Barcode already exists in another pengiriman, load existing data
      selectPengirimanByNomor(checkData.nomor_pengiriman)
      form.scanNomorBarcode = ''
      return
    }
  } catch (error) {
    console.error('Error checking barcode in pengiriman:', error.message)
    alert('Error checking barcode in pengiriman')
    return
  }

  // Second check if barcode exists in pemeriksaan_aftap
  try {
    await api.get(`/api/pengolahan/${form.scanNomorBarcode}`)
  } catch (error) {
    if (error.response?.status === 404) {
      alert('Nomor Barcode tidak terdaftar')
      return
    } else {
      console.error('Error checking barcode in aftap:', error.message)
      alert('Error checking barcode in aftap')
      return
    }
  }

  if (!form.nomorPengiriman) {
    await tambahDataBaru()
  }
  try {
    const { data } = await api.post('/api/pengiriman/scan', {
      scan_nomor_barcode: form.scanNomorBarcode,
      nomor_pengiriman: form.nomorPengiriman
    })
    if (data.status === 'inserted') {
      // Successfully inserted, clear input and refresh data
      form.scanNomorBarcode = ''
      fetchData()
    }
  } catch (error) {
    console.error('Error scanning barcode:', error.message)
    alert('Error scanning barcode')
  }
}

async function fetchData() {
  const params = {}
  if (form.nomorPengiriman) {
    params.nomor_pengiriman = form.nomorPengiriman
  }
  try {
    const { data } = await api.get('/api/pengiriman', { params })
    tableData.value = data.data
  } catch (error) {
    console.error('Error fetching data:', error.message)
  }
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

function cariPrevPage() {
  if (cariCurrentPage.value > 1) cariCurrentPage.value--
}

function cariNextPage() {
  if (cariCurrentPage.value < cariTotalPages.value) cariCurrentPage.value++
}
</script>

<style scoped>
@media print {
  body * {
    visibility: hidden;
  }
  #print-area, #print-area * {
    visibility: visible;
  }
  #print-area {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: auto;
    border: none !important;   /* remove any border */
    box-shadow: none !important; /* remove any shadow */
    background: white !important; /* force clean background */
    padding: 0 !important;       /* remove padding if modal added some */
    outline: none !important;
  }

  .no-print {
    display: none !important;
  }
}
</style>