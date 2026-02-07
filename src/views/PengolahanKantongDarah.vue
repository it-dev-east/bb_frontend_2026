<template>
  <div class="flex flex-col h-full">
    <!-- 🔹 Top Action Bar (shadcn Button) -->
    <div class="flex gap-2 p-4 bg-white border-b sticky top-0 z-10">
    <Button @click="refresh" class="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg">
      <RefreshCcw class="w-5 h-5" />
      Refresh
    </Button>
    <!--
    <Button @click="cari" class="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg">
      <Search class="w-5 h-5" />
      Cari
    </Button>
-->
    <Button @click="undo" class="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">
      <Undo2 class="w-5 h-5" />
      Undo
    </Button>

    <Button @click="simpanData" class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow">
      <Save class="w-5 h-5" />
      Simpan Data
    </Button>

    <Button @click="releaseData" class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
      <Unlock class="w-5 h-5" />
      Release Data
    </Button>
    </div>
    

    <!-- Middle area: Form -->
    <Card class="m-4 p-2 shadow-md border rounded-2xl bg-background">
      <CardHeader class="border-b px-4 py-4">
  <div class="flex justify-between items-start">
    <!-- Left: Title -->
    <h3 class="text-xl font-semibold text-foreground tracking-tight">
      Pengolahan Kantong Darah
    </h3>

    <!-- Right: Blood Info -->
    <div
      v-if="form.statusOlahDarah === 'Proses'"
      class="flex items-center gap-2 px-3 py-2 bg-amber-50 rounded-lg border border-amber-100"
    >
      <Droplet class="w-4 h-4 text-amber-600" />
      <span class="text-sm font-semibold text-amber-800 tracking-tight">
        {{ form.nomorBarcode }}  ( {{ form.golonganDarah }}
        {{ form.rhesus === 'Negatif' ? '-' : form.rhesus === 'Positif' ? '+' : form.rhesus }} )
        - {{ form.statusOlahDarah }}
      </span>
    </div>

    <div
      v-else
      class="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-100"
    >
      <Droplet class="w-4 h-4 text-blue-600" />
      <span class="text-sm font-semibold text-blue-800 tracking-tight">
        {{ form.nomorBarcode }}  ( {{ form.golonganDarah }}
        {{ form.rhesus === 'Negatif' ? '-' : form.rhesus === 'Positif' ? '+' : form.rhesus }} )
         - {{ form.statusOlahDarah }}
      </span>
    </div>
  </div>
</CardHeader>
      
      <CardContent class="pt-6">
        <form class="grid grid-cols-6 gap-4">
          <!-- 🔹 Row 1: Nomor Barcode -->
          <div class="col-span-6 flex flex-col space-y-2">
            <Label class="text-sm text-gray-600">Nomor Barcode (Scan barcode disini)</Label>
            <Input v-model="form.nomorBarcode" placeholder="Scan Barcode disini" @keyup.enter="fetchBarcodeData(form.nomorBarcode)" />
          </div>

          <!-- 🔹 Row 2: All 6 Fields -->
          <div class="flex flex-col space-y-2">
            <Label class="text-sm text-gray-600">No Kantong Darah</Label>
            <Input v-model="form.noKantongDarah" readonly/>
          </div>

          <div class="flex flex-col space-y-2">
            <Label class="text-sm text-gray-600">Jenis Kantong Darah</Label>
            <Input v-model="form.jenisKantongDarah" readonly/>
          </div>

          <div class="flex flex-col space-y-2">
            <Label class="text-sm text-gray-600">Tanggal Aftap</Label>
            <Input type="datetime-local" v-model="form.tanggal_aftap" readonly/>
          </div>

          <div class="flex flex-col space-y-2">
            <Label class="text-sm text-gray-600">Durasi Aftap (menit)</Label>
            <Input type="number" v-model="form.durasiAftap" readonly/>
          </div>

          <div class="flex flex-col space-y-2">
            <Label class="text-sm text-gray-600">Golongan Darah</Label>
            <Input v-model="form.golonganDarah" readonly/>
          </div>

          <div class="flex flex-col space-y-2">
            <Label class="text-sm text-gray-600">Rhesus</Label>
            <Input v-model="form.rhesus" readonly/>
          </div>

          
        </form>
        <!-- Message display -->
        <div v-if="message" class="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          {{ message }}
        </div>
      </CardContent>
    </Card>

    <!-- Bottom area: Grid -->
<!-- Bottom area: Grid -->
<Card class="m-4 p-4 shadow-md border rounded-2xl bg-background">    
  <!-- 🔹 Title + Button Row -->
  <CardHeader
    class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b px-4 py-4"
  >
    <!-- Title -->
    <div>
      <h3 class="text-xl font-semibold text-foreground tracking-tight">
        Data Detail Pengolahan Darah
      </h3>
    </div>

    <!-- 🔎 Button -->
    <div class="flex flex-wrap items-center gap-3">
      <Button
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        @click="tambah"
      >
        Tambah
      </Button>
    </div>
  </CardHeader>

  <!-- 🔹 Data Grid -->
  <CardContent class="p-0">
    <Table>
      <TableHeader class="bg-gray-100">
        <TableRow>
          <TableHead class="font-semibold text-gray-800">Nomor Komponen</TableHead>
          <TableHead class="font-semibold text-gray-800">Nomor Kantong</TableHead>
          <TableHead class="font-semibold text-gray-800">Volume</TableHead>
          <TableHead class="font-semibold text-gray-800">Jenis Komponen</TableHead>
          <TableHead class="font-semibold text-gray-800">Golongan</TableHead>
          <TableHead class="font-semibold text-gray-800">Rhesus</TableHead>
          <TableHead class="font-semibold text-gray-800">Tanggal Pengolahan</TableHead>
          <TableHead class="font-semibold text-gray-800">Status Pengolahan</TableHead>
          <TableHead class="font-semibold text-gray-800">Alasan Reject</TableHead>
          <TableHead class="font-semibold text-gray-800">Status Cetak</TableHead>
          <TableHead class="font-semibold text-gray-800">Hapus</TableHead>
          <TableHead class="font-semibold text-gray-800">Cetak</TableHead>
          <TableHead class="font-semibold text-gray-800">Edit</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow
          v-for="(detail, index) in paginatedDetailList"
          :key="index"
          class="hover:bg-gray-50"
        >
          <TableCell>{{ detail.nomor_komponen }}</TableCell>
          <TableCell>{{ detail.nomor_kantong }}</TableCell>
          <TableCell>{{ detail.volume }}</TableCell>
          <TableCell>{{ detail.jenis_komponen }}</TableCell>
          <TableCell>{{ detail.golongan }}</TableCell>
          <TableCell>{{ detail.rhesus }}</TableCell>
          <TableCell>{{ formatDate(detail.tanggal_pengolahan) }}</TableCell>
          <TableCell>{{ getStatusLabel(detail.status_pengolahan) }}</TableCell>
          <TableCell>{{ detail.alasan_reject }}</TableCell>

          <TableCell>{{ detail.status_cetak }}</TableCell>
          <TableCell>
            <Button
              size="sm"
              variant="destructive"
              class="px-2 py-1"
              @click="hapusDetail(detail)"
            >
            <Trash2 class="w-5 h-5" />

            </Button>
          </TableCell>
          <TableCell>
            <Button
              size="sm"
              class="bg-green-600 hover:bg-green-700 text-white px-2 py-1"
              @click="cetakDetail(detail)"
            >
            <Printer class="w-5 h-5" />
            </Button>
          </TableCell>
          <TableCell>
            <Button
              size="sm"
              class="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1"
              @click="editDetail(detail)"
            >
            <SquarePen class="w-5 h-5" />
            </Button>
          </TableCell>
        </TableRow>

        <!-- Empty State -->
        <TableRow v-if="paginatedDetailList.length === 0">
          <TableCell colspan="13" class="text-center text-gray-500">
            No data found
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </CardContent>

  <CardFooter
  class="flex flex-col sm:flex-row justify-between items-center gap-3 py-4 px-6 border-t bg-muted/30"
>
  <!-- 🔹 Pagination -->
  <span class="font-medium text-muted-foreground text-sm">
    Halaman {{ currentPage }} dari {{ totalPages }}
  </span>
  <div class="flex items-center gap-2">
    <Button
      variant="outline"
      size="sm"
      class="px-3 py-1"
      @click="prevPage"
      :disabled="currentPage === 1"
    >
      Previous
    </Button>
    <span 
      v-for="page in pages" 
      :key="page" 
      @click="goToPage(page)" 
      :class="['px-3 py-1 cursor-pointer rounded', currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200']"
    >
      {{ page }}
    </span>
    <Button
      variant="outline"
      size="sm"
      class="px-3 py-1"
      @click="nextPage"
      :disabled="currentPage === totalPages"
    >
      Next
    </Button>
  </div>
</CardFooter>
</Card>

    <!-- Modal for Komponen List -->
<div
  v-if="showKomponenModal"
  class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
>
  <Card class="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
    <CardHeader>
      <div class="flex justify-between items-center w-full">
        <CardTitle class="text-lg font-semibold text-gray-800">
          Daftar Komponen Darah
        </CardTitle>
        <Button
          variant="destructive"
          class="px-4 py-2 rounded-lg"
          @click="closeKomponenModal"
        >
          Tutup
        </Button>
      </div>
    </CardHeader>

    <CardContent>
      <!-- 🔹 Komponen Table inside Modal -->
      <ScrollArea class="max-h-96">
        <Table>
          <TableHeader class="bg-gray-100">
            <TableRow>
              <TableHead class="font-semibold text-gray-800">Kode</TableHead>
              <TableHead class="font-semibold text-gray-800">Nama</TableHead>
              <TableHead class="font-semibold text-gray-800">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow
              v-for="komponen in komponenList"
              :key="komponen.id"
              class="hover:bg-gray-50"
            >
              <TableCell>{{ komponen.kode }}</TableCell>
              <TableCell>{{ komponen.nama }}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  class="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
                  @click="selectKomponen(komponen)"
                >
                  Pilih
                </Button>
              </TableCell>
            </TableRow>

            <!-- Empty State -->
            <TableRow v-if="komponenList.length === 0">
              <TableCell colspan="3" class="text-center text-gray-500">
                No data found
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ScrollArea>

      <!-- 🔹 Pagination inside Modal -->
      <div class="flex justify-center items-center mt-4 space-x-2">
        <Button
          variant="outline"
          size="sm"
          class="px-3 py-1"
          @click="prevPage"
          :disabled="currentPage === 1"
        >
          Previous
        </Button>
        
        <span v-for="page in pages" :key="page" @click="goToPage(page)" :class="['px-3 py-1 cursor-pointer rounded', currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200']">{{ page }}</span>
       
        <Button
          variant="outline"
          size="sm"
          class="px-3 py-1"
          @click="nextPage"
          :disabled="currentPage === totalPages"
        >
          Next
        </Button>
      </div>
    </CardContent>
  </Card>
</div>

<!-- Modal for Edit Detail -->
<div
  v-if="showEditModal"
  class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
>
  <Card class="w-full max-w-md">
    <CardHeader>
      <div class="flex justify-between items-center w-full">
        <CardTitle class="text-lg font-semibold text-gray-800">
          Edit Detail
        </CardTitle>
        <div class="flex gap-2">
          <Button
            @click="simpanEdit"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Simpan
          </Button>
          <Button
            @click="closeEditModal"
            class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            Tutup
          </Button>
        </div>
      </div>
    </CardHeader>

    <CardContent>
      <form class="space-y-4">
        <div class="flex flex-col space-y-2">
          <Label class="text-sm text-gray-600">Tanggal Pengolahan</Label>
          <Input type="datetime-local" v-model="editForm.tanggal_pengolahan" />
        </div>
        
        <div class="flex flex-col space-y-2">
          <Label class="text-sm text-gray-600">Nomor Kantong</Label>
          <Input v-model="editForm.nomor_kantong" />
        </div>

        <div class="flex flex-col space-y-2">
          <Label class="text-sm text-gray-600">Volume</Label>
          <Input v-model="editForm.volume" />
        </div>

        <div class="flex flex-col space-y-2">
          <Label class="text-sm text-gray-600">Status Pengolahan</Label>
          <Select v-model="editForm.status_pengolahan">
            <SelectTrigger>
              <SelectValue placeholder="Pilih Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Proses">Proses</SelectItem>
              <SelectItem value="Selesai">Selesai</SelectItem>
              <SelectItem value="Reject">Reject</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="flex flex-col space-y-2">
          <Label class="text-sm text-gray-600">Alasan Reject</Label>
          <Select v-model="editForm.alasan_reject">
            <SelectTrigger>
              <SelectValue placeholder="Pilih Alasan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Kantong Rusak">Kantong Rusak</SelectItem>
              <SelectItem value="Kantong Bocor">Kantong Bocor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        
      </form>
    </CardContent>
  </Card>
</div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import api from "../lib/axios.js";
import { RefreshCcw, Plus, Search, Unlock, Barcode, Droplet, Droplets, SlidersHorizontal, Undo2, Save, BrushCleaning,Trash2, Printer, SquarePen } from "lucide-vue-next"
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

const form = ref({
  nomorBarcode: '',
  jenisKantongDarah: '',
  noKantongDarah: '',
  durasiAftap: '',
  tanggal_aftap: '',
  golonganDarah: '',
  rhesus: '',
  statusOlahDarah: '',
  donorCard: ''
})

const message = ref('')
const showKomponenModal = ref(false)
const komponenList = ref([])
const detailList = ref([])
const showEditModal = ref(false)
const editForm = ref({
  id: '',
  tanggal_pengolahan: '',
  status_pengolahan: '',
  alasan_reject: '',
  nomor_kantong: '',
  volume: '',
  kode_komponen: ''
})
const currentPage = ref(1)
const pageSize = 5
const totalPages = computed(() => Math.ceil(detailList.value.length / pageSize))
const paginatedDetailList = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return detailList.value.slice(start, start + pageSize)
})
const pages = computed(() => Array.from({length: totalPages.value}, (_, i) => i + 1))

// Function to fetch barcode data
async function fetchBarcodeData(barcode) {
  message.value = '' // Clear previous message
  if (barcode && barcode.trim() !== '') {
    try {
      const { data } = await api.get(`/api/pengolahan/${encodeURIComponent(barcode)}`);
      form.value.noKantongDarah = data.no_kantong_darah || ''
      form.value.jenisKantongDarah = data.jenis_kantong_darah || ''
      form.value.durasiAftap = data.durasi_aftap ? data.durasi_aftap.toString() : ''
      form.value.tanggal_aftap = formatDateTimeForInput(data.tanggal_aftap) || ''
      form.value.golonganDarah = data.golongan_darah || ''
      form.value.rhesus = data.rhesus || ''
      form.value.statusOlahDarah = data.status_olah_darah || ''
      form.value.donorCard = data.donor_card_no || ''
      message.value = '' // Clear message on success
      // Fetch detail list for this barcode
      fetchDetailList()
    } catch (err) {
      if (err.response && err.response.status === 404) {
        // Not found, clear fields and show message
        form.value.noKantongDarah = ''
        form.value.jenisKantongDarah = ''
        form.value.durasiAftap = ''
        form.value.tanggal_aftap = ''
        form.value.golonganDarah = ''
        form.value.rhesus = ''
        form.value.statusOlahDarah = ''
        message.value = `Barcode "${barcode}" tidak ditemukan.`
      } else {
        console.error('Error searching barcode:', err)
        // Clear fields on error
        form.value.noKantongDarah = ''
        form.value.jenisKantongDarah = ''
        form.value.durasiAftap = ''
        form.value.tanggal_aftap = ''
        form.value.golonganDarah = ''
        form.value.rhesus = ''
        form.value.statusOlahDarah = ''
        message.value = 'Terjadi kesalahan saat mencari barcode.'
      }
    }
  } else {
    // Clear fields if barcode is empty
    form.value.noKantongDarah = ''
    form.value.jenisKantongDarah = ''
    form.value.durasiAftap = ''
    form.value.tanggal_aftap = ''
    form.value.golonganDarah = ''
    form.value.rhesus = ''
    form.value.statusOlahDarah = ''
    message.value = ''
  }
}

function refresh() {
  console.log('Refresh clicked')
  // Refresh functionality
}

function cari() {
  console.log('Cari clicked')
  // Search functionality
}

async function undo() {
  console.log('Undo clicked')
  if (!form.value.nomorBarcode) {
    alert('Nomor Barcode harus diisi')
    return
  }
  try {
    // Undo pengolahan_kantong_darah status
    const { data: pengolahanData } = await api.put(`/api/pengolahan/undo/${encodeURIComponent(form.value.nomorBarcode)}`);
    console.log('Pengolahan undo successful:', pengolahanData);

    // Undo stok_darah status_pengolahan
    const { data: stokData } = await api.put(`/api/stok_darah/undo/${encodeURIComponent(form.value.nomorBarcode)}`);
    console.log('Stok Darah undo successful:', stokData);

    // Undo pemeriksaan_aftap status_olah_darah
    const { data: aftapData } = await api.put(`/api/pemeriksaan_aftap/undo/${encodeURIComponent(form.value.nomorBarcode)}`);
    console.log('Pemeriksaan Aftap undo successful:', aftapData);

    alert('Data berhasil diundo');

    // Log activity
    const user = getCurrentUser();
    const { data: logData } = await api.post('/api/activity_log', {
      note: 'Undo',
      userid: user.username,
      pid: form.value.donorCard,
      regno: 'REG' + form.value.nomorBarcode, // assuming regno is nomorBarcode
      barcodeno: form.value.nomorBarcode,
      menu: 'Pengolahan Kantong Darah'
    });
    console.log('Activity logged:', logData);

    // Refresh form data
    fetchBarcodeData(form.value.nomorBarcode);
  } catch (error) {
    console.error('Error undoing data:', error);
    alert('Terjadi kesalahan saat undo data: ' + error.message);
  }
}

async function simpanData() {
  console.log('Simpan Data clicked', form.value)
  if (!form.value.nomorBarcode) {
      alert('Nomor Barcode harus diisi');
      return;
    }
  try {
    // Log activity
    const user = getCurrentUser();
    const { data } = await api.post('/api/activity_log', {
      note: 'Simpan Data',
      userid: user.username,
      pid: form.value.donorCard,
      regno: 'REG' + form.value.nomorBarcode, // assuming regno is nomorBarcode
      barcodeno: form.value.nomorBarcode,
      menu: 'Pengolahan Kantong Darah'
    });
    console.log('Activity logged:', data);
  } catch (err) {
    console.error('Error logging activity:', err);
  }
  // Save data
}

async function releaseData() {
  console.log('Release Data clicked')
  if (!form.value.nomorBarcode) {
    alert('Nomor Barcode harus diisi')
    return
  }
  try {
    // Release pengolahan
    const { data: pengolahanData } = await api.put(`/api/pengolahan/release/${encodeURIComponent(form.value.nomorBarcode)}`);
    console.log('Pengolahan release successful:', pengolahanData);

    // Now release pemeriksaan_aftap
    const { data: aftapData } = await api.put(`/api/pemeriksaan_aftap/release/${encodeURIComponent(form.value.nomorBarcode)}`);
    console.log('Pemeriksaan Aftap release successful:', aftapData);

    // Now release stok_darah
    const { data: stokData } = await api.put(`/api/stok_darah/release/${encodeURIComponent(form.value.nomorBarcode)}`);
    console.log('Stok Darah release successful:', stokData);

    // Update patient status
    const { data: patientData } = await api.put('/api/patients', {
      regno: 'REG' + form.value.nomorBarcode,
      status_olah_darah: 'Selesai'
    });
    console.log('patient updated:', patientData);

    alert('Data berhasil direlease');

    // Log activity
    // Query: select pa.nomor_registrasi,pa.no_kartu_donor,pd.* from pengolahan_kantong_darah ph, pengolahan_detail_komponen pd, pemeriksaan_aftap pa where ph.id=pd.pengolahan_id and ph.nomor_barcode=pa.no_barcode and ph.nomor_barcode=form.value.nomorBarcode
    const user = getCurrentUser();
    const { data: logData } = await api.post('/api/activity_log/release_details', {
      nomorBarcode: form.value.nomorBarcode,
      userid: user.username,
      sender: 'PengolahanKantongDarah'
    });
    console.log('Activity logged:', logData);

    // Refresh form data
    fetchBarcodeData(form.value.nomorBarcode);
  } catch (error) {
    console.error('Error releasing data:', error);
    alert('Terjadi kesalahan saat release data: ' + error.message);
  }
}

function tambah() {
  console.log('Tambah clicked')
  showKomponenModal.value = true
  fetchKomponenList()
}

async function fetchKomponenList() {
  try {
    const { data } = await api.get('/api/master_komponen?jenis_donor=Rutin');
    komponenList.value = data.data;
  } catch (err) {
    console.error('Error fetching komponen list:', err);
  }
}

async function selectKomponen(komponen) {
  console.log('Selected komponen:', komponen)

  // Prepare data to send
  const dataToSend = {
    nomorBarcode: form.value.nomorBarcode,
    jenisKantongDarah: form.value.jenisKantongDarah,
    //noKantongDarah: form.value.noKantongDarah,
    noKantongDarah: form.value.noKantongDarah + komponen.kode,
    durasiAftap: form.value.durasiAftap,
    tanggal_aftap: form.value.tanggal_aftap,
    golonganDarah: form.value.golonganDarah,
    rhesus: form.value.rhesus,
    komponenKode: komponen.kode,
    komponenNama: komponen.nama
  }

  try {
    // Call API to create pengolahan
    // 1️⃣ Simpan ke pengolahan_kantong_darah + pengolahan_detail_komponen
    const { data } = await api.post('/api/pengolahan', dataToSend);
    console.log('Pengolahan created:', data);
    
    //print("stok_data:", stok_data)
    //print("types:", {k: type(v).__name__ for k,v in stok_data.items()})

     // 2️⃣ INSERT stok_darah using same release logic 
    const { data: stokData } = await api.put(
      `/api/stok_darah/release/${encodeURIComponent(form.value.nomorBarcode)}`
    );
    console.log('Stok darah updated/created via release:', stokData)

    // 3️⃣ Tutup modal & refresh list
    showKomponenModal.value = false;
    // Refresh detail list
    //fetchDetailList();
    
    // i want to open modal  @click="editDetail(detail)"
    // ✅ refresh list dan ambil hasilnya
    const updatedList = await fetchDetailList()

    // ✅ cari baris detail yang baru (berdasarkan kode komponen)
    // sesuaikan field ini dengan data kamu:
    const detailBaru =
      updatedList.find(d => d.nomor_komponen === komponen.kode) ||
      updatedList.find(d => d.kode_komponen === komponen.kode)

    if (detailBaru) {
      editDetail(detailBaru) // ✅ ini akan buka showEditModal
    } else {
      console.warn('Detail baru tidak ketemu untuk komponen:', komponen.kode)
      // optional: fallback buka edit baris terakhir
      // if (updatedList.length) editDetail(updatedList[updatedList.length - 1])
    }
  } catch (error) {
    console.error('Error creating pengolahan:', error);
    alert('Terjadi kesalahan saat menyimpan data: ' + error.message);
  }
}

// async function fetchDetailList() {
//   if (!form.value.nomorBarcode) return

//   try {
//     const { data } = await api.get(`/api/pengolahan/detail/${encodeURIComponent(form.value.nomorBarcode)}`);
//     detailList.value = data.data;
//     currentPage.value = 1 // Reset to first page when data changes
//   } catch (err) {
//     console.error('Error fetching detail list:', err);
//   }
// }

async function fetchDetailList() {
  if (!form.value.nomorBarcode) return []

  try {
    const { data } = await api.get(
      `/api/pengolahan/detail/${encodeURIComponent(form.value.nomorBarcode)}`
    )
    detailList.value = data.data || []
    currentPage.value = 1
    return detailList.value
  } catch (err) {
    console.error('Error fetching detail list:', err)
    return []
  }
}

function closeKomponenModal() {
  showKomponenModal.value = false
}

function formatDate(dateString) {
  if (!dateString) return '-'
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${day}-${month}-${year} ${hours}:${minutes}`
}

async function hapusDetail(detail) {
  console.log('Hapus detail:', detail)

  if (confirm('Apakah Anda yakin ingin menghapus komponen ini?')) {
    try {
      // 1️⃣ Hapus detail pengolahan
      const { data } = await api.delete(`/api/pengolahan/detail/${detail.id}`);
      console.log('Detail deleted:', data);

      // 2️⃣ 🔹 NEW: Hapus stok_darah untuk barcode + komponen ini
      try {
        await api.delete('/api/stok_darah/by_detail', {
          data: {
            nomor_barcode: form.value.nomorBarcode,
            kode_komponen: detail.nomor_komponen
          }
        })
        console.log('Stok darah deleted for', form.value.nomorBarcode, detail.nomor_komponen)
      } catch (err) {
        console.error('Error deleting stok_darah (mungkin sudah tidak ada):', err)
        // Optional: boleh kasih alert atau di-silent saja
      }

      // 3️⃣ Refresh the detail list
      fetchDetailList();
    } catch (error) {
      console.error('Error deleting detail:', error);
      alert('Terjadi kesalahan saat menghapus data: ' + error.message);
    }
  }
}

async function cetakDetail(detail) {
  console.log('Cetak detail:', detail)
  try {
    // 1) print PDF
    const response = await api.get(`/api/stok_darah/print/${detail.id}?origin=PengolahanKantongDarah`, 
    //{ responseType: 'blob' }
    )
    console.log(response.data)
    const blob = new Blob([response.data], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    window.open(url, '_blank')

    // 2) update status cetak (per detail row)
    await api.put(`/api/pengolahan/detailcetak/${detail.id}`)

    // 3) refresh list biar kolom "Status Cetak" berubah
    await fetchDetailList()

  } catch (error) {
    console.error('Error printing detail:', error)
    alert('Error printing detail: ' + error.message)
  }
}

function editDetail(detail) {
  editForm.value.id = detail.id
  editForm.value.tanggal_pengolahan = formatDateTimeForInput(detail.tanggal_pengolahan)
  editForm.value.status_pengolahan = detail.status_pengolahan
  editForm.value.alasan_reject = detail.alasan_reject
  editForm.value.nomor_kantong = detail.nomor_kantong
  editForm.value.volume = detail.volume || ''
  editForm.value.kode_komponen = detail.nomor_komponen
  showEditModal.value = true
}

async function simpanEdit() {
  // ✅ volume wajib isi (kosong / null / spasi)
  const vol = String(editForm.value.volume ?? '').trim()
  if (!vol) {
    alert('Volume wajib diisi')
    // fokus ke input
    volumeInput.value?.focus?.()
    return
  }

  const dataToUpdate = {
    tanggal_pengolahan: editForm.value.tanggal_pengolahan,
    status_pengolahan: editForm.value.status_pengolahan,
    alasan_reject: editForm.value.alasan_reject,
    nomor_kantong: editForm.value.nomor_kantong,
    volume: editForm.value.volume
  }
  console.log('nokantong:', editForm.value.nomor_kantong);
  try {
    const { data } = await api.put(`/api/pengolahan/detail/${editForm.value.id}`, dataToUpdate);
    console.log('Detail updated:', data);

    // Update stok_darah
    const stokDataToUpdate = {
      nomor_kantong: editForm.value.nomor_kantong,
      volume_ml: editForm.value.volume || 0,
      tanggal_pengolahan: editForm.value.tanggal_pengolahan,
      nomor_barcode: form.value.nomorBarcode,
      kode_komponen: editForm.value.kode_komponen
    }
    //console.log('data Stok Darah :', editForm.value.kode_komponen);
    const { data: stokData } = await api.put('/api/stok_darah/update_kantong', stokDataToUpdate);
    console.log('Stok Darah updated:', stokData);

    showEditModal.value = false;
    fetchDetailList(); // Refresh the list
  } catch (error) {
    console.error('Error updating detail:', error);
    alert('Terjadi kesalahan saat menyimpan data: ' + error.message);
  }
}

function closeEditModal() {
  showEditModal.value = false
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page
}

function getStatusLabel(status) {
  switch (status) {
    case 'proses':
      return 'Proses'
    case 'selesai':
      return 'Selesai'
    case 'reject':
      return 'Reject'
    default:
      return status
  }
}

function formatDateTimeForInput(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}
</script>