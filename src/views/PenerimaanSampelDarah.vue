<template>
  <div class="flex flex-col h-full">
    <!-- 🔹 Top Action Bar (shadcn Button) -->
    <div class="flex gap-2 p-4 bg-white border-0 ">
    <Button @click="refresh" class="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg">
      <RefreshCcw class="w-5 h-5" />
      Refresh
    </Button>
    <!--
    <Button @click="buatPenerimaanBaru" class="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow">
      <Plus class="w-5 h-5" />
      Tambah Data Baru
    </Button>
    -->  
    <Button @click="cariData" class="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg">
      <Search class="w-5 h-5" />
      Cari Data
    </Button>

    </div>

    <!-- Middle area: Form -->
<div class="flex gap-4">
  <!-- Data Pengiriman Sampel Darah -->
  <Card class="flex-1 p-2 shadow-md border rounded-2xl bg-background ml-4">
    <CardHeader class="border-b px-4 py-4">
      <h3 class="text-xl font-semibold text-foreground tracking-tight">Data Pengiriman Sampel Darah</h3>
    </CardHeader>
    
    <CardContent class="pt-6">
        <!-- 🔹 First row: Tanggal & Nomor Pengiriman -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="flex flex-col">
            <Label class="text-sm text-gray-600">Tanggal Pengiriman</Label>
            <Input
              type="datetime-local"
              v-model="form.tanggalPengiriman"
              class="mt-1"
              readonly
            />
          </div>

          <div class="flex flex-col">
            <Label class="text-sm text-gray-600">Nomor Pengiriman</Label>
            <Input
              v-model="form.nomorPengiriman"
              class="mt-1"
              placeholder="Masukkan nomor pengiriman"
              @keyup.enter="checkNomorPengiriman"
            />
          </div>
        </div>

        <!-- 🔹 Second row: Nama Petugas -->
        <div class="flex flex-col">
          <Label class="text-sm text-gray-600">Nama Petugas</Label>
          <Input v-model="form.namaPetugasPengiriman" class="mt-1" readonly/>
        </div>
  </CardContent>
  </Card>

  <!-- Data Penerimaan Sampel Darah -->
  <Card class="flex-1 p-2 shadow-md border rounded-2xl bg-background mr-4">
    <CardHeader class="border-b px-4 py-4">
      <h3 class="text-xl font-semibold text-foreground tracking-tight">Data Penerimaan Sampel Darah</h3>
    </CardHeader>
    
    <CardContent class="pt-6">
      <!-- 🔹 First row: Tanggal & Nomor Pengiriman -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="flex flex-col">
            <Label class="text-sm text-gray-600">Tanggal Penerimaan</Label>
            <Input
              type="datetime-local"
              v-model="form.tanggalPenerimaan"
              class="mt-1"
              readonly
            />
          </div>

          <div class="flex flex-col">
            <Label class="text-sm text-gray-600">Nomor Penerimaan</Label>
            <Input
              v-model="form.nomorPenerimaan"
              class="mt-1"
              readonly
            />
          </div>
        </div>

        <!-- 🔹 Second row: Nama Petugas -->
        <div class="flex flex-col">
          <Label class="text-sm text-gray-600">Nama Petugas</Label>
          <Input v-model="form.namaPetugasPenerimaan"  class="mt-1" readonly/>
        </div>



    </CardContent>
  </Card>
</div>

<!-- Scan Area -->
<Card class="m-4 p-2 shadow-md border rounded-2xl bg-background">
  <CardHeader class="border-b px-4 py-4">
    <h4 class="text-xl font-semibold text-foreground tracking-tight">Scan Area (Konfirmasi Barcode)</h4>
  </CardHeader>
  
  <CardContent class="pt-6">
    <div class="flex flex-col">
      <Label class="text-sm text-gray-600">Nomor Barcode</Label>
      <div class="flex items-center gap-2 mt-1">
        <Input
          v-model="form.scanNomorBarcode"
          @keyup.enter="konfirmasiBarcode"
          placeholder="Scan barcode disini"
          class="flex-1"
        />
        
        <Button 
          @click="konfirmasiBarcode" 
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Konfirmasi
        </Button>
      </div>
    </div>
  </CardContent>
</Card>

<!-- Bottom area: Grid -->
<Card class="m-4 mt-0 p-4 shadow-md border rounded-2xl bg-background">
  <CardHeader class="border-b px-4 py-4">
    <h3 class="text-xl font-semibold text-foreground tracking-tight">Penerimaan Sampel Darah</h3>
  </CardHeader>
  
  <CardContent class="p-2">
    <Table>
      <TableHeader class="bg-gray-100">
        <TableRow>
          <TableHead class="font-semibold text-gray-800">Nomor Barcode</TableHead>
          <TableHead class="font-semibold text-gray-800">Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow
          v-for="(row, index) in paginatedData"
          :key="row.barcode"
          :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
        >
          <TableCell>{{ row.barcode }}</TableCell>
          <TableCell>
            <span :class="row.status === 'Diterima' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'">
              {{ row.status === 'Diterima' ? '✔ Diterima' : 'Belum Diterima' }}
            </span>
          </TableCell>
        </TableRow>

        <!-- Empty State -->
        <TableRow v-if="paginatedData.length === 0">
          <TableCell colspan="2" class="text-center text-gray-500">
            No data found
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </CardContent>

  <!-- Pagination -->
  <CardFooter class="flex flex-col sm:flex-row justify-between items-center gap-3 py-4 px-6 border-t bg-muted/30">
    <span class="font-medium text-muted-foreground text-sm">
      Page {{ currentPage }} of {{ totalPages }}
    </span>
    <div class="flex items-center gap-2">
      <Button
        class="bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-500 rounded-lg px-4 py-2 transition-colors"
        @click="prevPage"
        :disabled="currentPage === 1"
      >
        Previous
      </Button>
      <Button
        class="bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-500 rounded-lg px-4 py-2 transition-colors"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        Next
      </Button>
    </div>
  </CardFooter>
</Card>

<!-- Modal for Cari Data -->
<div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <Card class="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
    <CardHeader>
      <div class="flex justify-between items-center w-full">
        <CardTitle class="text-lg font-semibold text-gray-800">
          Cari Data Pengiriman
        </CardTitle>
        <Button
          variant="destructive"
          class="px-4 py-2 rounded-lg"
          @click="closeModal"
        >
          Tutup
        </Button>
      </div>
    </CardHeader>

    <CardContent>
     
      <div class="flex items-end gap-4 p-4 bg-white rounded-xl shadow-sm border">

      <!-- 🔍 Search Input -->
      <div class="flex flex-col flex-1">
        <Label class="text-sm font-medium text-gray-700 mb-1">
          Cari berdasarkan Nomor Pengiriman atau Barcode
        </Label>
        <Input
          v-model="searchQuery"
          @input="searchPengiriman"
          placeholder="Masukkan nomor pengiriman atau barcode"
          class="w-full"
        />
      </div>

      <!-- 📅 Date Picker -->
      <div class="flex flex-col w-56">
        <Label class="text-sm font-medium text-gray-700 mb-1">
          Tanggal
        </Label>
        <Input
          type="date"
          v-model="selectedDate"
          @change="searchPengiriman"
          class="w-full"
        />
      </div>

      <!-- 🔘 Action Buttons -->
      <div class="flex gap-2">
        <Button
          variant="default"
          class="px-6 py-2 font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
          @click="searchPengiriman"
        >
          Cari
        </Button>

        <Button
          variant="outline"
          class="px-6 py-2 font-medium rounded-lg hover:bg-gray-50 transition-all"
          @click="clearFilters"
        >
          Clear
        </Button>
      </div>

      </div>

      <!-- Data Table inside Modal -->
      <ScrollArea class="max-h-96">
        <Table>
          <TableHeader class="bg-gray-100">
            <TableRow>
              <TableHead class="font-semibold text-gray-800">Nomor Pengiriman</TableHead>
              <TableHead class="font-semibold text-gray-800">Tanggal Pengiriman</TableHead>
              <TableHead class="font-semibold text-gray-800">Nomor Barcode</TableHead>
              <TableHead class="font-semibold text-gray-800">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow
              v-for="(item, index) in modalPaginatedData"
              :key="index"
              :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
            >
              <TableCell>{{ item.nomor_pengiriman }}</TableCell>
              <TableCell>{{ formatDate(item.tanggal_pengiriman) }}</TableCell>
              <TableCell>{{ item.scan_nomor_barcode }}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  @click="setNomorAndCheck(item)"
                >
                  Pilih
                </Button>
              </TableCell>
            </TableRow>

            <!-- Empty State -->
            <TableRow v-if="modalPaginatedData.length === 0">
              <TableCell colspan="4" class="text-center text-gray-500">
                No data found
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ScrollArea>

      <!-- Pagination inside Modal -->
      <div class="flex justify-between items-center mt-4">
        <Button
          class="bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-500 rounded-lg px-4 py-2 transition-colors"
          @click="modalPrevPage"
          :disabled="modalCurrentPage === 1"
        >
          Previous
        </Button>

        <span class="font-medium text-gray-700">
          Page {{ modalCurrentPage }} of {{ modalTotalPages }}
        </span>

        <Button
          class="bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-500 rounded-lg px-4 py-2 transition-colors"
          @click="modalNextPage"
          :disabled="modalCurrentPage === modalTotalPages"
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
  tanggalPenerimaan: '',
  nomorPenerimaan: '',
  nomorPengiriman: '',
  tanggalPengiriman: '',
  namaPetugasPengiriman: '',
  namaPetugasPenerimaan: '',
  scanNomorBarcode: ''
})

const tableData = ref([])
const currentPage = ref(1)
const pageSize = 5
const showModal = ref(false)
const searchQuery = ref('')
const selectedDate = ref('')
const pengirimanList = ref([])
const modalCurrentPage = ref(1)
const modalPageSize = 5

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return tableData.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(tableData.value.length / pageSize))

const modalPaginatedData = computed(() => {
  const start = (modalCurrentPage.value - 1) * modalPageSize
  const end = start + modalPageSize
  return pengirimanList.value.slice(start, end)
})

const modalTotalPages = computed(() => Math.ceil(pengirimanList.value.length / modalPageSize))

function refresh() {
  // Implement refresh if needed
}

async function buatPenerimaanBaru() {
  form.tanggalPenerimaan = new Date().toISOString().slice(0, 16)
  try {
    const { data } = await api.get('/api/penerimaan_sampel/next_nomor')
    form.nomorPenerimaan = data.nomor_penerimaan
  } catch (error) {
    console.error('Error getting next nomor:', error.message)
    alert('Error getting next nomor')
  }
}

function cariData() {
  showModal.value = true
  modalCurrentPage.value = 1
  selectedDate.value = new Date().toISOString().split('T')[0]
  searchPengiriman()
}

async function searchPengiriman() {
  try {
    const { data } = await api.get('/api/pengiriman_sampel/search', { params: { query: searchQuery.value, date: selectedDate.value } })
    pengirimanList.value = data.data
    modalCurrentPage.value = 1
  } catch (error) {
    console.error('Error searching pengiriman:', error.message)
  }
}

function setNomorAndCheck(item) {
  form.nomorPengiriman = item.nomor_pengiriman
  checkNomorPengiriman()
}

function clearFilters() {
  searchQuery.value = ''
  selectedDate.value = new Date().toISOString().split('T')[0]
  searchPengiriman()
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  // Add 7 hours for GMT+7
  date.setHours(date.getHours() + 7)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${day}-${month}-${year} ${hours}:${minutes}`
}

function closeModal() {
  showModal.value = false
}

async function checkNomorPengiriman() {
  if (!form.nomorPengiriman) return
  try {
    // Check pengiriman_master
    const { data: pengirimanData } = await api.get('/api/pengiriman', { params: { nomor_pengiriman: form.nomorPengiriman } })
    if (pengirimanData.data.length > 0) {
      const pengiriman = pengirimanData.data[0]
      form.tanggalPengiriman = new Date(pengiriman.tanggal_pengiriman).toISOString().slice(0, 16)
      form.namaPetugasPengiriman = pengiriman.created_by || ''
      // Check penerimaan_sampel
      const { data: penerimaanData } = await api.get('/api/penerimaan_sampel', { params: { nomor_pengiriman: form.nomorPengiriman } })
      if (penerimaanData.data.length > 0) {
        const penerimaan = penerimaanData.data[0]
        form.tanggalPenerimaan = new Date(penerimaan.tanggal_penerimaan).toISOString().slice(0, 16)
        form.nomorPenerimaan = penerimaan.nomor_penerimaan
        form.namaPetugasPenerimaan = penerimaan.created_by || ''
      } else {
        // Generate new
        form.tanggalPenerimaan = new Date().toISOString().slice(0, 16)
        const { data: nextData } = await api.get('/api/penerimaan_sampel/next_nomor')
        form.nomorPenerimaan = nextData.nomor_penerimaan
        // Insert
        await api.post('/api/penerimaan_sampel', {
          nomor_penerimaan: form.nomorPenerimaan,
          nomor_pengiriman: form.nomorPengiriman
        })
      }
      // Fetch details
      await fetchDetails()
      showModal.value = false
    } else {
      alert('No Pengiriman tidak ditemukan')
    }
  } catch (error) {
    console.error('Error in checkNomorPengiriman:', error.message)
    alert('Error checking nomor pengiriman')
  }
}

async function konfirmasiBarcode() {
  if (!form.scanNomorBarcode) return
  const userStr = localStorage.getItem("user")
  let userid = null
  if (userStr) {
    const user = JSON.parse(userStr)
    if (user.username) {
      userid = user.username
    }
  }
  // Check if barcode exists in pengiriman_detail
  if (!form.nomorPengiriman) {
    try {
      const { data: searchData } = await api.get('/api/pengiriman/search', { params: { query: form.scanNomorBarcode } })
      if (searchData.data.length > 0) {
        const item = searchData.data[0]
        form.nomorPengiriman = item.nomor_pengiriman
        form.tanggalPengiriman = new Date(item.tanggal_pengiriman).toISOString().slice(0, 16)
        form.namaPetugasPengiriman = item.created_by
        // Now check if penerimaan exists
        const { data: penerimaanData } = await api.get('/api/penerimaan_sampel', { params: { nomor_pengiriman: form.nomorPengiriman } })
        if (penerimaanData.data.length > 0) {
          const penerimaan = penerimaanData.data[0]
          form.tanggalPenerimaan = new Date(penerimaan.tanggal_penerimaan).toISOString().slice(0, 16)
          form.nomorPenerimaan = penerimaan.nomor_penerimaan
          form.namaPetugasPenerimaan = penerimaan.created_by || ''
        } else {
          // Generate new nomorPenerimaan
          const { data: nextData } = await api.get('/api/penerimaan_sampel/next_nomor')
          form.nomorPenerimaan = nextData.nomor_penerimaan
          form.tanggalPenerimaan = new Date().toISOString().slice(0, 16)
          form.namaPetugasPenerimaan = userid
          // Insert penerimaan
          await api.post('/api/penerimaan_sampel', {
            nomor_penerimaan: form.nomorPenerimaan,
            nomor_pengiriman: form.nomorPengiriman,
            created_by: userid
          })
        }
        // Fetch details
        await fetchDetails()
      }
    } catch (error) {
      console.error('Error checking pengiriman:', error.message)
      alert('Error checking pengiriman')
      return
    }
  }
  // Check if barcode exists in pemeriksaan_aftap
  try {
    await api.get(`/api/pengolahan/${form.scanNomorBarcode}`)
  } catch (error) {
    if (error.response?.status === 404) {
      alert('Nomor Barcode tidak terdaftar')
      return
    } else {
      console.error('Error checking barcode:', error.message)
      alert('Error checking barcode')
      return
    }
  }
  const item = tableData.value.find(row => row.barcode === form.scanNomorBarcode)
  if (item) {
    item.status = 'Diterima'
    // Update backend status
    try {
      await api.put(`/api/penerimaan_sampel_detail/${item.id}`, { status: 'Diterima' })
    } catch (error) {
      console.error('Error updating status:', error.message)
    }
    //alert(`Barcode ${form.scanNomorBarcode} dikonfirmasi`)
  }
  // Fetch stok_darah data for activity log
  let stokData = { nomor_kartu_donor: '', nomor_kantong: '' }
      try {
        const { data: stokResponse } = await api.get(`/api/data_stok_darah/${form.scanNomorBarcode}`)
        console.log('Request params:', { scanNomorBarcode: form.scanNomorBarcode })
        console.log('API Response:', stokResponse)
        if (stokResponse.data && stokResponse.data.length > 0) {
          const stokRecord = stokResponse.data[0]
          stokData.nomor_kartu_donor = stokRecord.nomor_kartu_donor || ''
          stokData.nomor_kantong = stokRecord.nomor_kantong || ''
        }
      } catch (error) {
        console.error('Error fetching stok_darah data:', error.message)
      }
      await api.post('/api/activity_log', {
        note: 'Pengiriman:' + form.nomorPengiriman + ',Penerimaan:' + form.nomorPenerimaan,
        userid: userid,
        pid: stokData.nomor_kartu_donor,
        regno: 'REG'+form.scanNomorBarcode,
        barcodeno: form.scanNomorBarcode,
        menu: 'Penerimaan Sampel Darah',
        no_kantong: stokData.nomor_kantong,
        lokasi: 'Ruang Skrining',
        komponen: ''
      })
  form.scanNomorBarcode = ''
}

async function fetchDetails() {
  if (!form.nomorPenerimaan) return
  try {
    const { data } = await api.get(`/api/penerimaan_sampel/${form.nomorPenerimaan}/details`)
    tableData.value = data.data.map(item => ({ id: item.id, barcode: item.barcode, status: item.status }))
  } catch (error) {
    console.error('Error fetching details:', error.message)
  }
}


function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

function modalPrevPage() {
  if (modalCurrentPage.value > 1) modalCurrentPage.value--
}

function modalNextPage() {
  if (modalCurrentPage.value < modalTotalPages.value) modalCurrentPage.value++
}
</script>