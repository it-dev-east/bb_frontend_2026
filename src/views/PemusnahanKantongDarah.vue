<template>
  <div class="space-y-6 flex flex-col h-full">
    <!-- 🔹 Top Action Bar (shadcn Button) -->
    <div class="flex gap-2 p-4 bg-white border-b sticky top-0 z-10">
    <!--
    <Button @click="tambah" class="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow">
      <Plus class="w-5 h-5" />
      Data Baru
    </Button>
    -->
    <Button @click="simpanData" class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow">
      <Save class="w-5 h-5" />
      Simpan Data
    </Button>

    <Button @click="releaseData" class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
      <Unlock class="w-5 h-5" />
      Release Data
    </Button>
    <!--
    <Button class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
      <Barcode class="w-5 h-5" />
      Cetak Barcode
    </Button>
    -->
    <Button @click="printBarcode" class="flex items-center gap-2 bg-indigo-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
        <Barcode class="w-5 h-5" />
        Cetak Barcode
      </Button>

    </div>
    

    <!-- Scan Area -->
    <Card class="mx-4 shadow-sm border rounded-2xl">
  <CardHeader class="flex items-center justify-between border-b px-6 py-4">
    <div class="flex items-center justify-between w-full">
      <!-- Title (left-aligned) -->
      <h3 class="text-xl font-semibold tracking-tight text-foreground">
        Pemusnahan Kantong Darah
      </h3>

      <!-- Status (right-aligned, fixed width) -->
      <div
        v-if="status && status === 'RELEASE'"
        class="w-40 text-center px-3 py-1.5 rounded-md bg-emerald-50 border border-emerald-200"
      >
        <span class="text-sm font-medium text-emerald-700">STATUS: RELEASE</span>
      </div>
      <div
        v-else-if="status"
        class="w-40 text-center px-3 py-1.5 rounded-md bg-yellow-50 border border-yellow-300"
      >
        <span class="text-sm font-medium text-yellow-800">STATUS: PENDING</span>
      </div>
    </div>
  </CardHeader>

  <CardContent class="px-6 py-4">
    <div class="flex items-end gap-4">
      <!-- Input 1 -->
      <div class="flex-1">
        <Label for="noBarcode" class="text-sm font-medium text-gray-700">No Barcode</Label>
        <Input id="noBarcode" v-model="noBarcode" @keyup.enter="fetchDonorData" placeholder="Masukkan No Barcode" />
      </div>

      <!-- Input 2 -->
      <div class="flex-1">
        <Label for="noKantong" class="text-sm font-medium text-gray-700">No Kantong</Label>
        <Input id="noKantong" v-model="noKantong" @keyup.enter="fetchDonorData" placeholder="Masukkan No Kantong" />
      </div>

      <!-- Button -->
      <div class="flex-shrink-0">
        <Button
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          @click="cariData"
        >
        <Search class="w-5 h-5" /> Cari
        </Button>
      </div>
    </div>
  </CardContent>
</Card>

   

    <!-- Data Seleksi Donor -->
    <Card class="mx-4">
      <CardHeader>
        <CardTitle>Data Kantong Darah</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-4 gap-4">
          <div>
            <Label for="noKartuDonor" class="text-sm font-medium text-gray-700">No Kartu Donor</Label>
            <Input id="noKartuDonor" v-model="donor.noKartuDonor" placeholder="No Kartu Donor" />
          </div>
          
          <div>
            <Label for="sistole" class="text-sm font-medium text-gray-700">Nama Komponen</Label>
            <Input id="sistole" v-model="donor.namaKomponen" placeholder="Nama Komponen" />
          </div>

          <div>
            <Label for="golonganDarah" class="text-sm font-medium text-gray-700">Golongan Darah</Label>
            <Input id="golonganDarah" v-model="donor.golonganDarah" placeholder="Golongan Darah" />
          </div>

          <div>
            <Label for="rhesus" class="text-sm font-medium text-gray-700">Rhesus</Label>
            <Input id="rhesus" v-model="donor.rhesus" placeholder="Rhesus" />
          </div>

          <div>
            <Label for="volumeDarah" class="text-sm font-medium text-gray-700">Volume Darah</Label>
            <Input id="volumeDarah" v-model="donor.volumeDarah" placeholder="Volume Darah" />
          </div>

          <div>
            <Label for="diastole" class="text-sm font-medium text-gray-700">Tanggal Aftap</Label>
            <Input id="diastole" v-model="donor.tanggalAftap" placeholder="Tanggal Aftap" />
          </div>

          <div>
            <Label for="jenisKantong" class="text-sm font-medium text-gray-700">Tanggal Expired</Label>
            <Input id="jenisKantong" v-model="donor.tanggalExpired" placeholder="Tanggal Expired" />
          </div>

        </div>
      </CardContent>
    </Card>

    <Card class="mx-4">
      <CardHeader>
        <CardTitle>Data Pemusnahan Kantong Darah</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-4 gap-4">
           <div>
            <Label for="noKartuDonor" class="text-sm font-medium text-gray-700">No Transaksi</Label>
            <Input id="noKartuDonor" v-model="donor.noTransaksi" placeholder="No Transaksi" />
          </div>

          <div>
            <Label for="noKartuDonor" class="text-sm font-medium text-gray-700">Tanggal Pemusnahan</Label>
            <Input id="noKartuDonor" v-model="donor.tanggalPemusnahan" placeholder="Tanggal Pemusnahan" />
          </div>
          
          <div>
            <Label for="alasan" class="text-sm font-medium text-gray-700">Alasan Pemusnahan</Label>
            <Select v-model="donor.Alasan">
              <SelectTrigger>
                <SelectValue placeholder="Pilih Alasan Pemusnahan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EXP">Expired</SelectItem>
                <SelectItem value="SCR">Hasil Skrining Reaktif</SelectItem>
                <SelectItem value="TMP">Ekskursi Suhu</SelectItem>
                <SelectItem value="DMG">Kerusakan Fisik / Kebocoran</SelectItem>
                <SelectItem value="CNT">Kontaminasi</SelectItem>
                <SelectItem value="PROC">Kesalahan Pemrosesan</SelectItem>
                <SelectItem value="OTH">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label for="metode" class="text-sm font-medium text-gray-700">Metode Pemusnahan</Label>
            <Input id="metode" v-model="donor.metode" placeholder="Metode Pemusnahan" />
          </div>

          <div>
            <Label for="petugas" class="text-sm font-medium text-gray-700">Petugas</Label>
            <Input id="petugas" v-model="donor.petugas" placeholder="Petugas" />
          </div>

          <div>
            <Label for="catatan" class="text-sm font-medium text-gray-700">Catatan</Label>
            <Input id="catatan" v-model="donor.catatan" placeholder="Catatan" />
          </div>

        </div>
      </CardContent>
    </Card>

    
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import api from "../lib/axios.js";
import { RefreshCcw, Plus, Search, Unlock, Barcode, Droplet, Droplets, SlidersHorizontal, Undo2, Save, BrushCleaning, Upload, Printer, SquarePen } from "lucide-vue-next"
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

// Reactive data
const noBarcode = ref('')
const noKantong = ref('')
const status = ref('')
const pemusnahanId = ref(null)

const donor = reactive({
  noKartuDonor: '',
  namaKomponen: '',
  golonganDarah: '',
  rhesus: '',
  volumeDarah: '',
  tanggalAftap: '',
  tanggalExpired: '',
  noTransaksi: '',
  tanggalPemusnahan: '',
  Alasan: 'EXP',
  metode: '',
  petugas: '',
  catatan: ''
})

// Functions
const cariData = async () => {
  if (!noBarcode.value && !noKantong.value) {
    alert('Masukkan No Barcode atau No Kantong')
    return
  }

  // ambil user dari localStorage
  const user = JSON.parse(localStorage.getItem('user'))
  const username = user?.username || ''

  try {
    const response = await api.post('/api/stok/pemusnahan/scan', {
      nomor_barcode: noBarcode.value || null,
      nomor_kantong: noKantong.value || null
    })

    const data = response.data

    // Populate stok data
    donor.noKartuDonor = data.stok.nomor_kartu_donor || ''
    donor.namaKomponen = data.stok.komponen || ''
    donor.golonganDarah = data.stok.golongan_darah || ''
    donor.rhesus = data.stok.rhesus || ''
    donor.volumeDarah = data.stok.volume_ml || ''
    donor.tanggalAftap = data.stok.tanggal_aftap || ''
    donor.tanggalExpired = data.stok.tanggal_kadaluarsa || ''

    // Populate pemusnahan data
    pemusnahanId.value = data.pemusnahan.id || null
    donor.noTransaksi = data.pemusnahan.no_transaksi || ''
    donor.tanggalPemusnahan = data.pemusnahan.tanggal_pemusnahan || ''
    status.value = data.pemusnahan.status || ''

    donor.Alasan = data.pemusnahan.alasan_kode || ''
    donor.metode = data.pemusnahan.metode_pemusnahan || ''
    donor.petugas = data.pemusnahan.petugas || username || ''
    donor.catatan = data.pemusnahan.catatan || ''
    

  } catch (error) {
    console.error('Error fetching data:', error)
    if (error.response && error.response.status === 404) {
      alert('Data stok darah tidak ditemukan')
    } else {
      alert('Terjadi kesalahan saat mencari data')
    }
  }
}

const fetchDonorData = () => {
  cariData()
}

const tambah = () => {
  // Reset form
  noBarcode.value = ''
  noKantong.value = ''
  status.value = ''
  pemusnahanId.value = null
  Object.keys(donor).forEach(key => {
    donor[key] = key === 'Alasan' ? 'EXP' : ''
  })
}

const simpanData = async (showAlert = true) => {
  if (!pemusnahanId.value) {
    alert('Tidak ada data pemusnahan untuk disimpan')
    return
  }
  
  // ambil user dari localStorage
  const user = JSON.parse(localStorage.getItem('user'))
  const username = user?.username || ''

  try {
    const response = await api.put(`/api/stok/pemusnahan/${pemusnahanId.value}`, {
      alasan_kode: donor.Alasan,
      metode_pemusnahan: donor.metode,
      petugas: username,
      catatan: donor.catatan
    })

    if (showAlert) {
      alert('Data pemusnahan berhasil disimpan')
    }
  } catch (error) {
    console.error('Error saving data:', error)
    alert('Terjadi kesalahan saat menyimpan data')
  }
}

const releaseData = async () => {
  if (!pemusnahanId.value) {
    alert('Tidak ada data pemusnahan untuk direlease')
    return
  }

  try {
    await simpanData(false)

    const response = await api.put(`/api/stok/pemusnahan/${pemusnahanId.value}/release`)

    alert('Data pemusnahan berhasil direlease')
    status.value = 'RELEASE'  // Update local status
  } catch (error) {
    console.error('Error releasing data:', error)
    alert('Terjadi kesalahan saat release data')
  }
}

const printBarcode = async () => {
  if (!pemusnahanId.value) {
    alert('Tidak ada data pemusnahan untuk dicetak')
    return
  }

  try {
    const response = await api.get(`/api/stok/pemusnahan/print/${pemusnahanId.value}`, {
      responseType: 'blob'
    })
    const blob = new Blob([response.data], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    window.open(url, '_blank')
  } catch (error) {
    console.error('Error printing pemusnahan:', error)
    alert('Error printing pemusnahan: ' + error.message)
  }
}
</script>