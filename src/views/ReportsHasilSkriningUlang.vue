<template>
    <div class="flex flex-col h-full">
     <!-- 🔹 Top Action Bar (shadcn Button) -->
      <div class="sticky top-0 z-10 bg-white border-b">
        <div class="flex items-center justify-between gap-3 p-4">
          <!-- Left: Back + Title -->
          <div class="flex items-center gap-3">
            <Button variant="ghost" class="h-9 px-2" @click="goBack">
              <ArrowLeft class="w-4 h-4 mr-2" />
              Kembali
            </Button>

            <div class="hidden sm:block">
              <div class="text-sm text-muted-foreground">Reports</div>
              <h2 class="text-base font-semibold leading-none">
                Laporan Hasil Skrining Ulang
              </h2>
            </div>
          </div>

          <!-- Right: optional actions (if you want later) -->
          <div class="flex items-center gap-2">
            <!-- keep empty or add small actions -->
          </div>
        </div>
      </div>

  <!-- Middle area: Form -->
  <!-- Pengiriman Kantong Darah Section -->
  <Card class="m-4 p-2 shadow-md border rounded-2xl bg-background">
    <div class="p-4 bg-white rounded-lg shadow-sm">
  <div class="flex flex-col gap-6">
    
    <!-- 📅 Rentang Tanggal -->
    <div class="flex flex-col sm:flex-row sm:items-center gap-3">
      <Label class="text-sm font-medium text-gray-700 whitespace-nowrap">Rentang Tanggal</Label>
      <div class="flex items-center gap-2">
        <Input type="date" v-model="startDate" class="w-[160px]" />
        <span class="text-gray-500">–</span>
        <Input type="date" v-model="endDate" class="w-[160px]" />
      </div>
    </div>

    <!-- 🔘 Radio Group 
    <div class="flex flex-col gap-3">
      <Label class="text-sm font-medium text-gray-700">Cari Berdasarkan</Label>
      <RadioGroup v-model="selectedOption" class="flex flex-wrap items-center gap-6">
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="noRegistrasi" value="noRegistrasi" />
          <Label for="noRegistrasi" class="text-sm text-gray-700">No Registrasi</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="noBarcode" value="noBarcode" />
          <Label for="noBarcode" class="text-sm text-gray-700">No Barcode</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="noKartuDonor" value="noKartuDonor" />
          <Label for="noKartuDonor" class="text-sm text-gray-700">No Kartu Donor</Label>
        </div>
      </RadioGroup>
    </div> -->

    <!-- 🔍 Input + Tombol -->
    <div class="flex flex-col sm:flex-row sm:items-center gap-3">
      
      <div class="flex gap-2">
        <Button
          @click="handleSearch"
          class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Search class="w-5 h-5" /> Cari
        </Button>
        <Button
          @click="exportExcel"
          class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          <FileOutput class="w-5 h-5" /> Export Excel
        </Button>
        <Button variant="outline" @click="clearSearch" class="px-4">Clear</Button>
      </div>
    </div>

  </div>
</div>



  </Card>
  
 
  
  <!-- Bottom Grid -->
  <Card class="m-4 mt-0 p-4 shadow-md border rounded-2xl bg-background">
    <!-- Title -->
    <CardHeader class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b px-4 py-4">
      <div>
        <h3 class="text-xl font-semibold text-foreground tracking-tight">
          Laporan Hasil Skrining Ulang
        </h3>
      </div>
    </CardHeader>
  
    <!-- Details Table -->
    <CardContent class="p-4">
      <Table>
        <TableHeader class="bg-gray-100">
          <TableRow>
           <TableHead class="font-semibold text-gray-800">Tanggal</TableHead>
            <TableHead class="font-semibold text-gray-800">No Registrasi</TableHead>
            <TableHead class="font-semibold text-gray-800">No Barcode</TableHead>
            <TableHead class="font-semibold text-gray-800">Golongan Darah</TableHead>
            <TableHead class="font-semibold text-gray-800">Rhesus</TableHead>
            <TableHead class="font-semibold text-gray-800">Hasil Sifilis(NAT)</TableHead>
            <TableHead class="font-semibold text-gray-800">Hasil HBsAg(NAT)</TableHead>
            <TableHead class="font-semibold text-gray-800">Hasil HCV(NAT)</TableHead>
            <TableHead class="font-semibold text-gray-800">Hasil HIV(NAT)</TableHead>
          </TableRow>
        </TableHeader>
  
        <TableBody>
           <TableRow
             v-for="(result, index) in paginatedSearchResults"
             :key="index"
             :class="index % 2 === 0 ? 'bg-white' : 'bg-blue-50'"
           >
             <TableCell>{{ formatDate(result.tanggal_registrasi) }}</TableCell>
             <TableCell>{{ result.nomor_registrasi}}</TableCell>
             <TableCell>{{ result.nomor_barcode }}</TableCell>
             <TableCell>{{ result.golongan_darah }}</TableCell>
             <TableCell>{{ result.rhesus }}</TableCell>
             <TableCell>{{ result.sifilis_kesimpulan_nat }}</TableCell>
             <TableCell>{{ result.hbsag_kesimpulan_nat }}</TableCell>
             <TableCell>{{ result.hcv_kesimpulan_nat }}</TableCell>
             <TableCell>{{ result.hiv_kesimpulan_nat }}</TableCell>
            </TableRow>

           <!-- Empty State -->
           <TableRow v-if="paginatedSearchResults.length === 0">
             <TableCell colspan="7" class="text-center text-gray-500">
               No data found
             </TableCell>
           </TableRow>
         </TableBody>
      </Table>
    </CardContent>
  
    <!-- Pagination -->
    <CardFooter class="flex flex-col sm:flex-row justify-between items-center gap-3 py-4 px-6 border-t bg-muted/30">
      <span class="font-medium text-muted-foreground text-sm">
        Halaman {{ currentPage }} dari {{ totalSearchPages }}
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
          :disabled="currentPage === totalSearchPages"
        >
          Next
        </Button>
      </div>
    </CardFooter>
  </Card>
  
  <!-- Cari Modal -->
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
  
    <!-- Modal for Barcode Print -->
    <div v-if="showBarcodeModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <div id="print-area" class="p-4 bg-white text-center">
          <div class="mb-2">{{ formattedTanggalPengiriman }}</div>
          <div class="mb-2 flex justify-center">
            <vue-barcode :value="form.nomorPengiriman" :options="{ format: 'CODE128', width: 2, height: 40 }" v-if="form.nomorPengiriman"></vue-barcode>
          </div>
        </div>
        <div class="flex justify-end mt-4">
          <button @click="printBarcode" class="no-print bg-blue-600 text-white px-4 py-2 rounded mr-2">Print</button>
          <button @click="closeBarcodeModal" class="no-print bg-red-600 text-white px-4 py-2 rounded">Tutup</button>
        </div>
      </div>
    </div>
  </template>
  

  <script setup>
  import api from "../lib/axios.js";
  import { ref, reactive, computed } from 'vue'
  import VueBarcode from '@chenfengyuan/vue-barcode'
  import { RefreshCcw, Plus, Search, Unlock, Barcode, TextSearch, FileOutput } from "lucide-vue-next"
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
  
  // navigation
  import { useRouter } from "vue-router"
  import { ArrowLeft } from "lucide-vue-next"
  
  const router = useRouter()

  const goBack = () => {
    // if user came from another page, go back
    if (window.history.length > 1) return router.back()
    // fallback if opened directly
    router.push("/app/reports")
  }

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
  
  const showBarcodeModal = ref(false)
  
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
  
  // For search results
  const searchResults = ref([])
  const paginatedSearchResults = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    const end = start + pageSize
    return searchResults.value.slice(start, end)
  })
  
  const totalSearchPages = computed(() => Math.ceil(searchResults.value.length / pageSize))
  
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
  
  const selectedOption = ref("noRegistrasi") // default option
  const searchQuery = ref("")
  const startDate = ref(new Date().toISOString().split('T')[0])
  const endDate = ref(new Date().toISOString().split('T')[0])

// Computed placeholder text based on selected option
const placeholderText = computed(() => {
  switch (selectedOption.value) {
    case "noRegistrasi":
      return "Masukkan No Registrasi"
    case "noBarcode":
      return "Masukkan No Barcode"
    case "noKartuDonor":
      return "Masukkan No Kartu Donor"
    default:
      return "Masukkan pencarian"
  }
})

// Handle search event (press Enter)
const handleSearch = async () => {
  // Allow search if searchQuery is provided or if dates are provided
  if (!searchQuery.value && !startDate.value && !endDate.value) return

  console.log("Searching by:", selectedOption.value, "Value:", searchQuery.value, "Start Date:", startDate.value, "End Date:", endDate.value)
  try {
    const params = {}

    // if (searchQuery.value) {
    //   params.search_type = selectedOption.value
    //   params.search_value = searchQuery.value
    // }

    if (startDate.value) {
      params.start_date = startDate.value
    }
    if (endDate.value) {
      params.end_date = endDate.value
    }

    const { data } = await api.get('/api/reports/hasil_skrining_ulang', { params })
    // Update the search results
    searchResults.value = data.data
    console.log("Search Results (for table):", searchResults.value)
    currentPage.value = 1
  } catch (error) {
    console.error('Error fetching search results:', error.message)
    alert('Error searching data')
  }
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
    try {
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
  
  
  
  function cetakBarcode() {
    console.log('Cetak Barcode clicked')
    showBarcodeModal.value = true
  }
  
  function closeBarcodeModal() {
    showBarcodeModal.value = false
  }
  
  function printBarcode() {
    window.print()
  }
  
  
  
  
  function prevPage() {
    if (currentPage.value > 1) currentPage.value--
  }

  function nextPage() {
    if (currentPage.value < totalSearchPages.value) currentPage.value++
  }
  
  function cariPrevPage() {
    if (cariCurrentPage.value > 1) cariCurrentPage.value--
  }
  
  function cariNextPage() {
    if (cariCurrentPage.value < cariTotalPages.value) cariCurrentPage.value++
  }

  function clearSearch() {
    searchQuery.value = ""
    searchResults.value = []
    currentPage.value = 1
  }
  
  const exportExcel = async () => {
    try {
      const params = {}

      // if (searchQuery.value) {
      //   params.search_type = selectedOption.value
      //   params.search_value = searchQuery.value
      // }

      if (startDate.value) {
        params.start_date = startDate.value
      }
      if (endDate.value) {
        params.end_date = endDate.value
      }

      const response = await api.get('/api/reports/hasil_skrining_ulang/export_excel', { params, responseType: 'blob' })
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = `Laporan_Hasil_Skrining_Ulang_${new Date().toISOString().split('T')[0]}.xlsx`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error('Error exporting Excel:', error.message)
      alert('Error exporting data to Excel')
    }
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