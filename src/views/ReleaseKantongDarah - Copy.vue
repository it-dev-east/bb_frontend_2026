<template>
  <div class="release-kantong-darah">
    <!-- Button Area -->
    <div class="button-area mb-4">
      <button class="bg-blue-500 text-white px-4 py-2 rounded">Button 1</button>
      <button class="bg-green-500 text-white px-4 py-2 rounded ml-2">Button 2</button>
    </div>

    <!-- Scan Area -->
    <div class="scan-area mb-4 p-4 border rounded">
      <h3 class="text-lg font-bold mb-2">Scan Area</h3>
      <div class="grid grid-cols-2 gap-4">
        <input v-model="noBarcode" type="text" placeholder="No Barcode" class="border p-2 rounded">
        <input v-model="noKartuDonor" type="text" placeholder="No Kartu Donor" class="border p-2 rounded">
        <button @click="cariData" class="bg-blue-500 text-white px-4 py-2 rounded col-span-2">Cari Data</button>
        <input v-model="status" type="text" placeholder="Status" class="border p-2 rounded">
      </div>
    </div>

    <!-- Data Seleksi Donor Area -->
    <div class="data-seleksi-donor mb-4 p-4 border rounded">
      <h3 class="text-lg font-bold mb-2">Data Seleksi Donor</h3>
      <div class="grid grid-cols-3 gap-4">
        <input v-model="donor.noKartuDonor" type="text" placeholder="No Kartu Donor" class="border p-2 rounded">
        <input v-model="donor.jenisKelamin" type="text" placeholder="Jenis Kelamin" class="border p-2 rounded">
        <input v-model="donor.tempatLahir" type="text" placeholder="Tempat Lahir" class="border p-2 rounded">
        <input v-model="donor.umur" type="text" placeholder="Umur" class="border p-2 rounded">
        <input v-model="donor.beratBadan" type="text" placeholder="Berat Badan" class="border p-2 rounded">
        <input v-model="donor.tinggiBadan" type="text" placeholder="Tinggi Badan" class="border p-2 rounded">
        <input v-model="donor.statusCekal" type="text" placeholder="Status Cekal" class="border p-2 rounded">
        <input v-model="donor.haemoglobin" type="text" placeholder="Haemoglobin" class="border p-2 rounded">
        <input v-model="donor.golonganDarah" type="text" placeholder="Golongan Darah" class="border p-2 rounded">
        <input v-model="donor.rhesus" type="text" placeholder="Rhesus" class="border p-2 rounded">
        <input v-model="donor.sistole" type="text" placeholder="Sistole" class="border p-2 rounded">
        <input v-model="donor.diastole" type="text" placeholder="Diastole" class="border p-2 rounded">
        <input v-model="donor.volumeDarah" type="text" placeholder="Volume Darah" class="border p-2 rounded">
        <input v-model="donor.jenisKantong" type="text" placeholder="Jenis Kantong" class="border p-2 rounded">
        <input v-model="donor.noKantong" type="text" placeholder="No Kantong" class="border p-2 rounded">
        <input v-model="donor.lokasiDonor" type="text" placeholder="Lokasi Donor" class="border p-2 rounded">
        <input v-model="donor.jenisDonor" type="text" placeholder="Jenis Donor" class="border p-2 rounded">
        <input v-model="donor.peruntukan" type="text" placeholder="Peruntukan" class="border p-2 rounded">
        <input v-model="donor.noRmPasien" type="text" placeholder="No RM Pasien" class="border p-2 rounded">
        <input v-model="donor.namaPasien" type="text" placeholder="Nama Pasien" class="border p-2 rounded">
        <input v-model="donor.rumahSakit" type="text" placeholder="Rumah Sakit" class="border p-2 rounded">
      </div>
    </div>

    <!-- Data Uji Saring IMLTD Area -->
    <div class="data-uji-saring mb-4 p-4 border rounded">
      <h3 class="text-lg font-bold mb-2">Data Uji Saring IMLTD</h3>
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th class="border border-gray-300 p-2">Column 1</th>
            <th class="border border-gray-300 p-2">Column 2</th>
            <th class="border border-gray-300 p-2">Column 3</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in ujiSaringData" :key="item.id">
            <td class="border border-gray-300 p-2">{{ item.col1 }}</td>
            <td class="border border-gray-300 p-2">{{ item.col2 }}</td>
            <td class="border border-gray-300 p-2">{{ item.col3 }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Data Uji Konfirmasi Golongan Darah Area -->
    <div class="data-uji-konfirmasi mb-4 p-4 border rounded">
      <h3 class="text-lg font-bold mb-2">Data Uji Konfirmasi Golongan Darah</h3>
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th class="border border-gray-300 p-2">Column 1</th>
            <th class="border border-gray-300 p-2">Column 2</th>
            <th class="border border-gray-300 p-2">Column 3</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in ujiKonfirmasiData" :key="item.id">
            <td class="border border-gray-300 p-2">{{ item.col1 }}</td>
            <td class="border border-gray-300 p-2">{{ item.col2 }}</td>
            <td class="border border-gray-300 p-2">{{ item.col3 }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Data Pengolahan Komponen Darah Area -->
    <div class="data-pengolahan-komponen mb-4 p-4 border rounded">
      <h3 class="text-lg font-bold mb-2">Data Pengolahan Komponen Darah</h3>
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th class="border border-gray-300 p-2">Column 1</th>
            <th class="border border-gray-300 p-2">Column 2</th>
            <th class="border border-gray-300 p-2">Column 3</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in pengolahanData" :key="item.id">
            <td class="border border-gray-300 p-2">{{ item.col1 }}</td>
            <td class="border border-gray-300 p-2">{{ item.col2 }}</td>
            <td class="border border-gray-300 p-2">{{ item.col3 }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Bottom Area -->
    <div class="bottom-area p-4 border rounded">
      <div class="grid grid-cols-3 gap-4">
        <div>
          <label class="block mb-1">Petugas Release</label>
          <select v-model="petugasRelease" class="border p-2 rounded w-full">
            <option value="petugas1">Petugas 1</option>
            <option value="petugas2">Petugas 2</option>
          </select>
        </div>
        <div>
          <label class="block mb-1">Dicek Oleh</label>
          <select v-model="dicekOleh" class="border p-2 rounded w-full">
            <option value="petugas1">Petugas 1</option>
            <option value="petugas2">Petugas 2</option>
          </select>
        </div>
        <div>
          <label class="block mb-1">Petugas Mutu</label>
          <select v-model="petugasMutu" class="border p-2 rounded w-full">
            <option value="petugas1">Petugas 1</option>
            <option value="petugas2">Petugas 2</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RefreshCcw, Plus, Search, Unlock, Barcode, Droplet, Droplets, SlidersHorizontal, Undo2, Save, BrushCleaning } from "lucide-vue-next"
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

const noBarcode = ref('')
const noKartuDonor = ref('')
const status = ref('')
const donor = ref({
  noKartuDonor: '',
  jenisKelamin: '',
  tempatLahir: '',
  umur: '',
  beratBadan: '',
  tinggiBadan: '',
  statusCekal: '',
  haemoglobin: '',
  golonganDarah: '',
  rhesus: '',
  sistole: '',
  diastole: '',
  volumeDarah: '',
  jenisKantong: '',
  noKantong: '',
  lokasiDonor: '',
  jenisDonor: '',
  peruntukan: '',
  noRmPasien: '',
  namaPasien: '',
  rumahSakit: ''
})

const ujiSaringData = ref([
  { id: 1, col1: 'Data 1', col2: 'Data 2', col3: 'Data 3' },
  { id: 2, col1: 'Data 4', col2: 'Data 5', col3: 'Data 6' }
])

const ujiKonfirmasiData = ref([
  { id: 1, col1: 'Data 1', col2: 'Data 2', col3: 'Data 3' },
  { id: 2, col1: 'Data 4', col2: 'Data 5', col3: 'Data 6' }
])

const pengolahanData = ref([
  { id: 1, col1: 'Data 1', col2: 'Data 2', col3: 'Data 3' },
  { id: 2, col1: 'Data 4', col2: 'Data 5', col3: 'Data 6' }
])

const petugasRelease = ref('')
const dicekOleh = ref('')
const petugasMutu = ref('')

function cariData() {
  // Implement search logic
  console.log('Cari Data clicked')
}
</script>

<style scoped>
.release-kantong-darah {
  padding: 20px;
}
</style>