<template>
  <div class="flex flex-col h-full">
    <!-- 🔹 Top Action Bar (shadcn Button) -->
    <div class="flex gap-2 p-4 bg-white border-b sticky top-0 z-10">
    <Button @click="refreshData" class="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg">
      <RefreshCcw class="w-5 h-5" />
      Refresh
    </Button>

    <!-- Button Cari
    <Button @click="cariDataRegistrasi" class="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg">
      <Search class="w-5 h-5" />
      Cari Data
    </Button>
    -->

    <Button @click="undo" class="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">
      <Undo2 class="w-5 h-5" />
      Undo
    </Button>

    <Button @click="simpanData" class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow">
      <Save class="w-5 h-5" />
      Simpan
    </Button>

    <Button @click="releaseData" class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
      <Unlock class="w-5 h-5" />
      Release
    </Button>
    </div>

    <!-- 🔹 Tabs Section (Shadcn-Vue Modern Layout) -->
    <Tabs v-model="activeTab" default-value="Identitas" class="flex-1 flex flex-col overflow-y-auto bg-white">

    <!-- 🔸 Tabs Navigation -->
    <div class="px-4 pt-0 border-b bg-white flex items-center justify-between">
      <TabsList class="flex justify-start gap-4">
        <TabsTrigger
          v-for="t in tabs"
          :key="t"
          :value="t"
          class="px-4 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50
                data-[state=active]:bg-blue-600 data-[state=active]:text-white
                data-[state=active]:font-semibold transition-colors"
        >
          {{ t }}
        </TabsTrigger>
      </TabsList>
      
      <!-- Label on the right -->
      <!-- Right: Blood Info -->
    <div
      v-if="form.statusKarantina === 'Karantina'"
      class="flex items-center gap-2 px-3 py-2 bg-amber-50 rounded-lg border border-amber-100"
    >
      <Droplet class="w-4 h-4 text-amber-600" />
      <span class="text-sm font-semibold text-amber-800 tracking-tight">
        {{ form.nomorBarcode }}  ( {{ form.golonganDarah }}
        {{ form.rhesus === 'Negatif' ? '-' : form.rhesus === 'Positif' ? '+' : form.rhesus }} )
        - {{ form.jenisKomponen }}
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
         - {{ form.jenisKomponen }}
      </span>
    </div>

    </div>

    <!-- 🔸 Tabs Content -->
    <div class="flex-1 p-4 overflow-y-auto space-y-4">

      <!-- 🧑 Identitas -->
      <TabsContent value="Identitas" class="space-y-4">
        <div class="bg-white p-4 rounded-lg shadow space-y-3">
          <h3 class="text-lg font-semibold text-gray-800">Karantina Kantong Darah</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Nomor Barcode (Scan Disini)</Label>
              <Input v-model="form.nomorBarcode" class="mt-1" @keyup.enter="onBarcodeScan" />
            </div>

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Nomor Kantong</Label>
              <Input v-model="form.nomorKantong" class="mt-1" @keyup.enter="onKantongScan" />
            </div>

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Tanggal Karantina</Label>
              <Input type="datetime-local" v-model="form.tanggalRegistrasi" class="mt-1" readonly/>
            </div>

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">No Kartu Donor</Label>
              <Input v-model="form.noKartuDonor" class="mt-1" readonly/>
            </div>

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Jenis Komponen</Label>
              <Input v-model="form.jenisKomponen" class="mt-1" readonly/>
            </div>

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Golongan Darah</Label>
              <Input v-model="form.golonganDarah" class="mt-1" readonly/>
            </div>
<!--             
            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Rhesus</Label>
              <RadioGroup v-model="form.rhesus" class="flex gap-6 mt-1">
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="neg" value="Negatif" />
                  <label for="Negatif" class="text-sm">Negatif</label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="pos" value="Positif" />
                  <label for="Positif" class="text-sm">Positif</label>
                </div>
              </RadioGroup>
            </div> -->
           

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Volume</Label>
              <Input v-model="form.volume" class="mt-1" readonly/>
            </div>

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Tanggal Pengolahan</Label>
              <Input type="datetime-local" v-model="form.tanggalPengolahan" class="mt-1" readonly/>
            </div>

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600 mb-1">Jenis Donor</Label>
              <Input v-model="form.jenisDonor" class="mt-1" readonly/>
            </div>

            <!-- <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Nama Petugas</Label>
              <Input v-model="form.namaPetugas" class="mt-1" />
            </div>
            --> 
          </div>
        </div>
      </TabsContent>

      <!-- 📍 Lokasi Simpan -->
      <TabsContent value="Lokasi Simpan" class="space-y-4">
        <div class="bg-white p-3 rounded-lg shadow space-y-3">
          <h3 class="text-lg font-semibold text-gray-800">Lokasi Simpan</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Lokasi Penyimpanan</Label>
              <div class="flex items-center">
                <Input v-model="form.lokasiPenyimpanan" class="px-2 py-2 flex-1 mt-1" />

              </div>
            </div>

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">No Penyimpanan</Label>
              <div class="flex items-center">
                <Input v-model="form.noSimpan" class="flex-1 mt-1" />

              </div>
            </div>

            <div class="flex flex-col md:col-span-2">
              <Label class="text-sm text-gray-600">Catatan</Label>
              <Textarea v-model="form.catatan" rows="2" class="mt-1" />
            </div>
            
          </div>
        </div>
      </TabsContent>

      <!-- 🔬 Hasil Skrining -->
      <TabsContent value="Hasil Skrining" class="space-y-4">
        <div class="bg-white p-4 rounded-lg shadow space-y-3">
          <h3 class="text-lg font-semibold text-gray-800">Hasil Skrining</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Metode CLIA -->
            <div class="space-y-3">
              <h4 class="text-md font-semibold text-gray-700">Metode CLIA</h4>
              <div class="flex flex-col">
                <Label class="text-sm text-gray-600">Sifilis</Label>
                <Input v-model="form.clia_sifilis" class="mt-1" />
              </div>
              <div class="flex flex-col">
                <Label class="text-sm text-gray-600">HbsAg</Label>
                <Input v-model="form.clia_hbsag" class="mt-1" />
              </div>
              <div class="flex flex-col">
                <Label class="text-sm text-gray-600">HCV</Label>
                <Input v-model="form.clia_hcv" class="mt-1" />
              </div>
              <div class="flex flex-col">
                <Label class="text-sm text-gray-600">HIV</Label>
                <Input v-model="form.clia_hiv" class="mt-1" />
              </div>
              <div class="flex flex-col">
                <Label class="text-sm text-gray-600">Malaria</Label>
                <Input v-model="form.clia_malaria" class="mt-1" />
              </div>
            </div>

            <!-- Metode NAT -->
            <div class="space-y-3">
              <h4 class="text-md font-semibold text-gray-700">Metode NAT</h4>
              <div class="flex flex-col">
                <Label class="text-sm text-gray-600">Sifilis</Label>
                <Input v-model="form.nat_sifilis" class="mt-1" />
              </div>
              <div class="flex flex-col">
                <Label class="text-sm text-gray-600">HbsAg</Label>
                <Input v-model="form.nat_hbsag" class="mt-1" />
              </div>
              <div class="flex flex-col">
                <Label class="text-sm text-gray-600">HCV</Label>
                <Input v-model="form.nat_hcv" class="mt-1" />
              </div>
              <div class="flex flex-col">
                <Label class="text-sm text-gray-600">HIV</Label>
                <Input v-model="form.nat_hiv" class="mt-1" />
              </div>
              <div class="flex flex-col">
                <Label class="text-sm text-gray-600">Malaria</Label>
                <Input v-model="form.nat_malaria" class="mt-1" />
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      <!-- ⚙️ Status -->
      <TabsContent value="Status" class="space-y-4">
        <div class="bg-white p-4 rounded-lg shadow space-y-3">
          <h3 class="text-lg font-semibold text-gray-800">Status</h3>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Status Cekal</Label>
              <RadioGroup v-model="form.statusCekal" class="flex gap-6 mt-1">
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="Diterima" value="Diterima" />
                  <label for="Diterima" class="text-sm">Diterima</label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="Ditolak" value="Ditolak" />
                  <label for="Ditolak" class="text-sm">Ditolak</label>
                </div>
              </RadioGroup>
            </div>

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Alasan Cekal</Label>
              <Select v-model="form.alasanCekal" class="mt-1">
                <SelectTrigger>
                  <SelectValue placeholder="Pilih alasan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nilai HB Abnormal">Hasil Skrining tidak memenuhi syarat</SelectItem>
                  <SelectItem value="Tinggi Badan Tidak Terpenuhi">
                    Kantong Darah Rusak
                  </SelectItem>
                  <SelectItem value="Berat Badan Tidak Terpenuhi">
                    Kantong Darah Bocor
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            
            <div class="flex flex-col md:col-span-2">
              <Label class="text-sm text-gray-600">Catatan</Label>
              <Textarea v-model="form.catatanCekal" rows="2" class="mt-1" />
            </div>
          </div>
        </div>
      </TabsContent>

    </div>
    </Tabs>


    <!-- 🔹 Bottom: Data Grid -->
  <Card class="m-4 p-4 shadow-md border rounded-2xl bg-background">    
  <!-- 🔹 Title + Filters Row -->
    <CardHeader
      class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b px-2 py-2"
    >
      <!-- Title -->
      <div>
        <h3 class="text-xl font-semibold text-foreground tracking-tight">
          Daftar Kantong Darah
        </h3>
        <p class="text-sm text-muted-foreground">
          Daftar Karantina Kantong Darah
        </p>
      </div>

      <!-- 🔎 Filters (Right-Aligned) -->
      <div class="flex flex-wrap items-center gap-3">

         <!-- Begin Date -->
        <div class="flex items-center gap-2">
          <label class="text-sm">Dari:</label>
          <input
            v-model="begindate"
            @change="applyFilters"
            type="date"
            class="border border-gray-300 rounded-lg px-3 py-2 w-40 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <!-- End Date -->
        <div class="flex items-center gap-2">
          <label class="text-sm">Sampai:</label>
          <input
            v-model="enddate"
            @change="applyFilters"
            type="date"
            class="border border-gray-300 rounded-lg px-3 py-2 w-40 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Search by No Barcode -->
        <div class="flex items-center gap-2">
          <input
            v-model="nomorBarcode"
            @keyup.enter="applyFilters"
            type="text"
            placeholder="Cari No Barcode..."
            class="border border-gray-300 rounded-lg px-3 py-2 w-40 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        <!-- Filter Status Karantina -->
        <div class="flex items-center gap-2">
          <select
            v-model="statusKarantina"
            @change="applyFilters"
            class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Status</option>
            <option value="Karantina">Karantina</option>
            <option value="Dikirim">Dikirim</option>
          </select>
        </div>

        <!-- 🆕 Clear Button -->
        <Button
          class="bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-lg"
          @click="clearFilters"
        >
          ✖ Clear
        </Button>

        <!-- Search Button -->
        <Button
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          @click="applyFilters"
        >
        <Search class="w-5 h-5" /> Cari
        </Button>

      </div>
    </CardHeader>
  
    <!-- 🔹 Patients Main Table -->
    <CardContent class="p-0">
    <Table  class="">
      <TableHeader class="bg-gray-100">
        <TableRow>
          <TableHead class="font-semibold text-gray-800">Nomor Kantong</TableHead>
          <TableHead class="font-semibold text-gray-800">Nomor Kartu Donor</TableHead>
          <TableHead class="font-semibold text-gray-800">Jenis Komponen</TableHead>
          <TableHead class="font-semibold text-gray-800">Golongan Darah</TableHead>
          <TableHead class="font-semibold text-gray-800">Lama Karantina</TableHead>
          <TableHead class="font-semibold text-gray-800">Status Karantina</TableHead>
          <TableHead class="font-semibold text-gray-800">Status Skrining</TableHead>
          <TableHead class="font-semibold text-gray-800">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow
          v-for="(item, index) in karantinaData"
          :key="item.id"
          :class="index % 2 === 0 ? 'bg-white' : 'bg-blue-50'"
        >
          <TableCell>{{ item.nomor_kantong }}</TableCell>
          <TableCell>{{ item.nomor_kartu_donor }}</TableCell>
          <TableCell>{{ item.jenis_komponen }}</TableCell>
          <TableCell>{{ item.golongan_rhesus }}</TableCell>
          <TableCell>{{ Math.round(item.hours_since_karantina) }} jam</TableCell>
          <TableCell>{{ item.status_karantina }}</TableCell>
          <TableCell>{{ item.status_skrining }}</TableCell>
          <TableCell>
            <Button
              size="sm"
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              @click="selectKarantinaRecord(item)"
            >
              Pilih
            </Button>
          </TableCell>
        </TableRow>

        <!-- Empty State -->
        <TableRow v-if="karantinaData.length === 0">
          <TableCell colspan="8" class="text-center text-gray-500">
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
        Halaman {{ currentPage }}{{ totalPages > 0 ? ' dari ' + totalPages : '' }} 
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

<!-- 🔹 Modal for Cari Data -->
<div
  v-if="showModal"
  class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
>
  <Card class="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
    <CardHeader>
      <div class="flex justify-between items-center w-full">
        <CardTitle class="text-lg font-semibold text-gray-800">
          Cari Data Pasien
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
      <!-- 🔎 Search Inputs -->
      <div class="grid grid-cols-2 gap-4 mb-4">
        <Input v-model="searchNoKartuDonor" placeholder="No Kartu Donor" />
        <Input v-model="searchNoRegistrasi" placeholder="No Registrasi" />
        <Input v-model="modalSearchNama" placeholder="Nama" />
      </div>

      <Button
        variant="default"
        class="mb-4"
        @click="searchPatients"
      >
        Cari
      </Button>

      <!-- 🔹 Patients Table inside Modal -->
      <ScrollArea class="max-h-96">
        <Table>
          <TableHeader class="bg-gray-100">
            <TableRow>
              <TableHead class="font-semibold text-gray-800">No Registrasi</TableHead>
              <TableHead class="font-semibold text-gray-800">Tanggal Registrasi</TableHead>
              <TableHead class="font-semibold text-gray-800">No Kartu Donor</TableHead>
              <TableHead class="font-semibold text-gray-800">Nama</TableHead>
              <TableHead class="font-semibold text-gray-800">Tanggal Lahir</TableHead>
              <TableHead class="font-semibold text-gray-800">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow
              v-for="(patient, index) in modalPatients"
              :key="patient.id"
              :class="index % 2 === 0 ? 'bg-white' : 'bg-blue-50'"
            >
              <TableCell>{{ patient.reg_no }}</TableCell>
              <TableCell>{{ formatDate(patient.reg_date) }}</TableCell>
              <TableCell>{{ patient.donor_card_no }}</TableCell>
              <TableCell>{{ patient.full_name }}</TableCell>
              <TableCell>{{ formatDate(patient.birth_date) }}</TableCell>
              <TableCell class="text-center">
                <Button
                  size="sm"
                  class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                  @click="selectPatientFromModal(patient)"
                >
                  Pilih
                </Button>
              </TableCell>
            </TableRow>

            <!-- Empty State -->
            <TableRow v-if="modalPatients.length === 0">
              <TableCell colspan="6" class="text-center text-gray-500">
                No patients found
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ScrollArea>

      <!-- 🔹 Pagination inside Modal -->
      <div class="flex justify-between items-center mt-4">
        <Button
          class="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 rounded-lg px-4 py-2 transition-colors"
          @click="modalPrevPage"
          :disabled="modalCurrentPage === 1"
        >
          Previous
        </Button>

        <span class="font-medium text-gray-700">
          Page {{ modalCurrentPage }} of {{ modalTotalPages }}
        </span>

        <Button
          class="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 rounded-lg px-4 py-2 transition-colors"
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
import { ref, reactive, computed, onMounted, watch } from 'vue'
import api from "../lib/axios.js";
import VitalInput from "../components/VitalInput.vue";
//shadcnvue
import { Button } from "@/components/ui/button";
import { RefreshCcw, Plus, Search, Undo2, Save, Unlock, Droplet } from "lucide-vue-next"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
//import { FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toLocalDatetimeInputValue } from '../lib/dateutils.js';

const tabs = ["Identitas", "Lokasi Simpan", "Hasil Skrining", "Status"];
const activeTab = ref("Identitas");

// Karantina table related
const karantinaData = ref([]);
const currentPage = ref(1);
const total = ref(0);
const limit = ref(10);

// Filter refs
const begindate = ref(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]); // week ago
const enddate = ref(new Date().toISOString().split('T')[0]); // now
const nomorBarcode = ref("");
const statusKarantina = ref("");

const totalPages = computed(() => Math.ceil(total.value / limit.value));

// Modal related
const showModal = ref(false);
const modalPatients = ref([]);
const searchNoKartuDonor = ref("");
const searchNoRegistrasi = ref("");
const modalSearchNama = ref("");
const modalCurrentPage = ref(1);
const modalTotal = ref(0);
const modalTotalPages = computed(() => Math.ceil(modalTotal.value / limit.value));

const defaultForm = {
  id: null,
  tanggalRegistrasi: '',
  nomorRegistrasi: '',
  nomorKantong: '',
  noKartuDonor: '',
  namaDonor: '',
  jenisKelamin: 'LAKI-LAKI',
  tempatLahir: '',
  tanggalLahir: '',
  umur: '',
  jenisDonor: 'Donor Rutin',
  namaPetugas: '',
  beratBadan: '',
  tinggiBadan: '',
  hemoglobin: '',
  golonganDarah: '',
  noLotReagenHb: '',
  tanggalExpiredHb: '',
  rhesus: 'Negatif',
  noLotReagenBlood: '',
  tanggalExpiredBlood: '',
  tanggalDonasiTerakhir: '',
  donasiKe: '',
  tempatDonasiTerakhir: '',
  lokasiAmbilDarah: '',
  statusCekal: 'Diterima',
  alasanCekal: 'Nilai HB Abnormal',
  catatan: '',
  clia_sifilis: '',
  clia_hbsag: '',
  clia_hcv: '',
  clia_hiv: '',
  clia_malaria: '',
  nat_sifilis: '',
  nat_hbsag: '',
  nat_hcv: '',
  nat_hiv: '',
  nat_malaria: '',
  tanggalPengolahan: '',
  volume: '',
  jenisKomponen: '',
  lokasiPenyimpanan: '',
  noSimpan: '',
  catatanCekal: '',
  statusKarantina: ''
};

const form = ref({ ...defaultForm });

function resetForm() {
  form.value = { ...defaultForm };
}

// computed flag
const hbFlag = computed(() => {
  const val = parseFloat(form.value.hemoglobin);
  if (isNaN(val)) return ""; // kosong kalau bukan angka
  if (val < 12.5) return "L";
  if (val > 17.9) return "H";
  return ""; // normal
});

// computed class untuk input
const hbInputClass = computed(() => {
  return [
    "flex-1 border rounded-lg p-2",
    hbFlag.value ? "bg-[#FAA0A0]" : "", 'w-24'
  ];
});


// Props
const props = defineProps({
  label: String,
  note: String,
  placeholder: String,
  type: { type: String, default: "number" },
  modelValue: [String, Number],
  inputClass: { type: String, default: "w-24" },
  min: Number, // batas bawah normal
  max: Number  // batas atas normal
});

// Emits
const emit = defineEmits(["update:modelValue"]);

// Local value supaya reactive
const localValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    localValue.value = val;
  }
);

watch(localValue, (val) => {
  emit("update:modelValue", val);
});

// Flag L/H
const flag = computed(() => {
  const val = parseFloat(localValue.value);
  if (isNaN(val)) return "";
  if (props.min != null && val < props.min) return "L";
  if (props.max != null && val > props.max) return "H";
  return "";
});

async function loadHasilSkriningByBarcode(rawBarcode) {
  const barcode = (rawBarcode || '').slice(0, 10);

  // Reset dulu supaya jelas kalau gak ada data
  form.value.clia_sifilis = '';
  form.value.clia_hbsag   = '';
  form.value.clia_hcv     = '';
  form.value.clia_hiv     = '';
  form.value.clia_malaria = '';
  form.value.nat_sifilis  = '';
  form.value.nat_hbsag    = '';
  form.value.nat_hcv      = '';
  form.value.nat_hiv      = '';
  form.value.nat_malaria  = '';

  if (!barcode) return;

  try {
    const { data: hasilSkrining } = await api.get(
      `/api/hasil_skrining_darah/by_barcode/${encodeURIComponent(barcode)}`
    );

    // CLIA – pakai *_hasil_final (fallback ke *_hasil kalau perlu)
    form.value.clia_sifilis  = hasilSkrining.sifilis_hasil_final  ||  '';
    form.value.clia_hbsag    = hasilSkrining.hbsag_hasil_final    ||  '';
    form.value.clia_hcv      = hasilSkrining.hcv_hasil_final      ||  '';
    form.value.clia_hiv      = hasilSkrining.hiv_hasil_final      ||  '';
    form.value.clia_malaria  = hasilSkrining.malaria_hasil_final  ||  '';

    // NAT → pakai *_hasil_nat (atau *_kesimpulan_nat, terserah kebutuhan)
    form.value.nat_sifilis   = hasilSkrining.sifilis_hasil_nat    ||  '';
    form.value.nat_hbsag     = hasilSkrining.hbsag_hasil_nat      ||  '';
    form.value.nat_hcv       = hasilSkrining.hcv_hasil_nat        ||  '';
    form.value.nat_hiv       = hasilSkrining.hiv_hasil_nat        ||  '';
    form.value.nat_malaria   = hasilSkrining.malaria_hasil_nat    ||  '';
  } catch (e) {
    // 404 / belum ada hasil → biarkan kosong
    console.warn('Hasil skrining darah belum tersedia untuk barcode ini:', e);
  }
}

async function fetchKarantina(page = 1) {
  currentPage.value = page;
  const params = {};
  params.page = page;
  params.limit = limit.value;
  if (begindate.value) params.begindate = begindate.value;
  if (enddate.value) params.enddate = enddate.value;
  if (nomorBarcode.value) params.nomor_barcode = nomorBarcode.value;
  if (statusKarantina.value) params.status_karantina = statusKarantina.value;
  try {
    const { data } = await api.get('/api/karantina_kantong_darah', { params });
    karantinaData.value = data.data;
    total.value = data.total;
  } catch (err) {
    console.error('Error fetching karantina:', err);
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    fetchKarantina(currentPage.value - 1);
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    fetchKarantina(currentPage.value + 1);
  }
}

async function selectKarantinaRecord(item) {
  // Clear form data first
  Object.keys(form.value).forEach(key => {
    form.value[key] = '';
  });
  // Reset specific fields to defaults
  resetForm();

  try {
    // Fetch full karantina data
    const { data: fullRecord } = await api.get(`/api/karantina_kantong_darah/${item.id}`);
    // Populate form with data
    form.value.id = fullRecord.id;
    form.value.nomorBarcode = fullRecord.nomor_barcode || '';
    form.value.nomorKantong = fullRecord.nomor_kantong || '';
    form.value.noKartuDonor = fullRecord.nomor_kartu_donor || '';
    form.value.jenisKomponen = fullRecord.jenis_komponen || '';
    // const rhesus = fullRecord.rhesus.trim().toLowerCase();
    // console.log(rhesus)
    // const rhesusSymbol =
    //   rhesus === "positif" ? "+" :
    //   rhesus === "negatif" ? "-" :
    //   fullRecord.rhesus || ""; // fallback

    // form.value.golonganDarah = `${fullRecord.golongan_darah.trim() || ''}${rhesusSymbol}`;

    form.value.golonganDarah = `${fullRecord.golongan_darah?.trim() || ''} ${fullRecord.rhesus?.trim() || ''}`;

    // form.value.golonganDarah = fullRecord.golongan_darah || '';
    // form.value.rhesus = fullRecord.rhesus || '';
    form.value.volume = fullRecord.volume ? fullRecord.volume.toString() : '';
    form.value.tanggalPengolahan = fullRecord.tanggal_olah ? new Date(fullRecord.tanggal_olah).toISOString().slice(0, 16) : '';
    form.value.tanggalRegistrasi = fullRecord.tanggal_karantina ? new Date(fullRecord.tanggal_karantina).toISOString().slice(0, 16) : '';
    form.value.jenisDonor = fullRecord.jenis_donor || '';
    form.value.lokasiPenyimpanan = fullRecord.lokasi_penyimpanan || '';
    form.value.noSimpan = fullRecord.no_simpan || '';
    form.value.catatan = fullRecord.catatan || '';
    form.value.statusCekal = fullRecord.status_cekal || 'Diterima';
    form.value.alasanCekal = fullRecord.alasan_cekal || '';
    form.value.catatanCekal = fullRecord.catatan_cekal || '';
    form.value.statusKarantina = fullRecord.status_karantina || '';

   
     // Ambil hasil skrining dari endpoint lain (pakai 10 char pertama barcode)
    await loadHasilSkriningByBarcode(fullRecord.nomor_barcode || form.value.nomorBarcode);
    
  } catch (err) {
    console.error('Error fetching karantina record:', err);
  }
}

async function populateForm(record) {
  form.value.nomorRegistrasi = record.nomor_barcode || '';
  form.value.nomorKantong = record.nomor_kantong || '';
  form.value.noKartuDonor = record.nomor_kartu_donor || '';
  form.value.jenisKomponen = record.jenis_komponen || '';
  form.value.golonganDarah = record.golongan_darah || '';
  form.value.rhesus = record.rhesus || '';
  form.value.volume = record.volume ? record.volume.toString() : '';
  form.value.tanggalPengolahan = record.tanggal_olah ? new Date(record.tanggal_olah).toISOString().slice(0, 16) : '';
  form.value.tanggalRegistrasi = record.tanggal_karantina ? new Date(record.tanggal_karantina).toISOString().slice(0, 16) : '';
  form.value.jenisDonor = record.jenis_donor || '';
  form.value.lokasiPenyimpanan = record.lokasi_penyimpanan || '';
  form.value.noSimpan = record.no_simpan || '';
  form.value.catatan = record.catatan || '';
  form.value.statusCekal = record.status_cekal || 'Diterima';
  form.value.alasanCekal = record.alasan_cekal || '';
  form.value.catatanCekal = record.catatan_cekal || '';
  form.value.statusKarantina = record.status_karantina || '';

  // HAPUS semua mapping lama dari record.syphilis / hbsag / dst
  // GANTI dengan ambil dari hasil_skrining_darah
  await loadHasilSkriningByBarcode(record.nomor_barcode || form.value.nomorBarcode);
  
}

async function onBarcodeScan() {
  const value = form.value.nomorBarcode.trim().slice(0, 10);
  if (!value) return;
  try {
    //console.log(value);
    const { data } = await api.get('/api/karantina_kantong_darah/check', { params: { nomor_barcode: value } });
    if (data.exists) {
      const { data: record } = await api.get(`/api/karantina_kantong_darah/${data.id}`);
      await populateForm(record);
      nomorBarcode.value = form.value.nomorBarcode.trim().slice(0, 10);
      applyFilters();
    } else {
      await insertFromScan('barcode', value);
    }
  } catch (err) {
    console.error('Error on barcode scan:', err);
    console.error('Full error object:', err);
    console.error('Error response:', err.response);
    console.error('Error status:', err.response?.status);
    console.error('Error data:', err.response?.data);
  }
  
}

async function onKantongScan() {
  const value = form.value.nomorKantong.trim();
  if (!value) return;
  try {
    const { data } = await api.get('/api/karantina_kantong_darah/check', { params: { nomor_kantong: value } });
    if (data.exists) {
      const { data: record } = await api.get(`/api/karantina_kantong_darah/${data.id}`);
      await populateForm(record);
      nomorBarcode.value = form.value.nomorBarcode.trim().slice(0, 10);
      applyFilters();
    } else {
      await insertFromScan('kantong', value);
    }
  } catch (err) {
    console.error('Error on kantong scan:', err);
  }
}

async function insertFromScan(type, value) {
  //const jenisDonor = form.value.jenisDonor;
  const jenisDonor = 'Donor Rutin';
  
  if (!jenisDonor) {
    alert('Please select jenis donor first');
    return;
  }
  try {
    console.log(value);
    console.log(jenisDonor);
    const { data } = await api.post('/api/karantina_kantong_darah/scan', { type, value, jenis_donor: jenisDonor });
    await populateForm(data); 
    nomorBarcode.value = form.value.nomorBarcode.trim().slice(0, 10);
    applyFilters();
  } catch (err) {
    console.error('Error inserting from scan:', err);
  }
}

function formatDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}-${month}-${year} ${hours}:${minutes}`;
}

async function fetchModalPatients(page = 1) {
  modalCurrentPage.value = page;
  const params = {};
  params.page = page;
  params.limit = limit.value;
  params.status = 'not_registrasi_donor';
  if (searchNoKartuDonor.value) params.donor_card_no = searchNoKartuDonor.value;
  if (searchNoRegistrasi.value) params.reg_no = searchNoRegistrasi.value;
  if (modalSearchNama.value) params.full_name = modalSearchNama.value;
  try {
    const { data } = await api.get('/api/patients', { params });
    modalPatients.value = data.data;
    modalTotal.value = data.total;
  } catch (err) {
    console.error('Error fetching modal patients:', err);
  }
}

function searchPatients() {
  modalCurrentPage.value = 1;
  fetchModalPatients(1);
}

function selectPatientFromModal(patient) {
  selectPatient(patient);
  closeModal();
}

function modalPrevPage() {
  if (modalCurrentPage.value > 1) {
    fetchModalPatients(modalCurrentPage.value - 1);
  }
}

function modalNextPage() {
  if (modalCurrentPage.value < modalTotalPages.value) {
    fetchModalPatients(modalCurrentPage.value + 1);
  }
}

function closeModal() {
  showModal.value = false;
}

function refreshData() {
  fetchKarantina(currentPage.value);
}

function cariDataRegistrasi() {
  showModal.value = true;
  modalCurrentPage.value = 1;
  fetchModalPatients(1);
}

async function undo() {
  try {
    const payload = {
      action: 'undo',
      id: form.value.id,
      nomor_barcode: form.value.nomorBarcode,
      lokasi_penyimpanan: form.value.lokasiPenyimpanan,
      no_simpan: form.value.noSimpan,
      catatan: form.value.catatan,
      alasan_cekal: form.value.alasanCekal,
      catatan_cekal: form.value.catatanCekal
    };
    await api.put('/api/karantina_kantong_darah/update', payload);
    await api.put('/api/stok_darah/update_karantina', {
      nomor_barcode: form.value.nomorBarcode,
      status_karantina: 'Karantina',
      lokasi: 'Karantina',
      status: 'Proses Karantina'
    });
    alert('Undo berhasil');
    refreshData();
  } catch (err) {
    console.error('Error undoing:', err);
    alert('Gagal melakukan undo');
  }
}

// Function to get current user
function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

function withDefaults(data) {
  return {
    tanggal_registrasi: data.tanggal_registrasi || null,
    nomor_registrasi: data.nomor_registrasi || null,
    no_kartu_donor: data.no_kartu_donor || "",
    nama_donor: data.nama_donor || "",
    jenis_kelamin: data.jenis_kelamin || "LAKI-LAKI",
    tempat_lahir: data.tempat_lahir || "",
    tanggal_lahir: data.tanggal_lahir || null,
    umur: data.umur || "",
    jenis_donor: data.jenis_donor || "Donor Rutin",
    nama_petugas: data.nama_petugas || "",
    berat_badan: data.berat_badan || 0,
    tinggi_badan: data.tinggi_badan || 0,
    hemoglobin: data.hemoglobin || 0,
    golongan_darah: data.golongan_darah || "A",
    no_lot_reagen_hb: data.no_lot_reagen_hb || "",
    tanggal_expired_hb: data.tanggal_expired_hb || null,
    rhesus: data.rhesus || "Negatif",
    no_lot_reagen_blood: data.no_lot_reagen_blood || "",
    tanggal_expired_blood: data.tanggal_expired_blood || null,
    tanggal_donasi_terakhir: data.tanggal_donasi_terakhir || null,
    donasi_ke: data.donasi_ke || 0,
    tempat_donasi_terakhir: data.tempat_donasi_terakhir || "",
    lokasi_ambil_darah: data.lokasi_ambil_darah || "",
    status_cekal: data.status_cekal || "Diterima",
    alasan_cekal: data.alasan_cekal || "",
    catatan: data.catatan || "",
    release_by: data.release_by || null,
    release_at: data.release_at || null,
    clia_sifilis: data.clia_sifilis || "",
    clia_hbsag: data.clia_hbsag || "",
    clia_hcv: data.clia_hcv || "",
    clia_hiv: data.clia_hiv || "",
    clia_malaria: data.clia_malaria || "",
    nat_sifilis: data.nat_sifilis || "",
    nat_hbsag: data.nat_hbsag || "",
    nat_hcv: data.nat_hcv || "",
    nat_hiv: data.nat_hiv || "",
    nat_malaria: data.nat_malaria || ""
  };
}

async function simpanData() {
  try {
    const payload = {
      action: 'simpanData',
      id: form.value.id,
      nomor_barcode: form.value.nomorBarcode,
      lokasi_penyimpanan: form.value.lokasiPenyimpanan,
      no_simpan: form.value.noSimpan,
      catatan: form.value.catatan,
      status_cekal: form.value.statusCekal,
      alasan_cekal: form.value.alasanCekal,
      catatan_cekal: form.value.catatanCekal
    };
    await api.put('/api/karantina_kantong_darah/update', payload);
    alert('Data berhasil disimpan');
    refreshData();
  } catch (err) {
    console.error('Error saving data:', err);
    alert('Gagal menyimpan data');
  }
}

async function releaseData() {
  try {
    const payload = {
      action: 'releaseData',
      id: form.value.id,
      nomor_barcode: form.value.nomorBarcode,
      lokasi_penyimpanan: form.value.lokasiPenyimpanan,
      no_simpan: form.value.noSimpan,
      catatan: form.value.catatan,
      status_cekal: form.value.statusCekal,
      alasan_cekal: form.value.alasanCekal,
      catatan_cekal: form.value.catatanCekal
    };
    await api.put('/api/karantina_kantong_darah/update', payload);
    await api.put('/api/stok_darah/update_karantina', {
      nomor_barcode: form.value.nomorBarcode,
      status_karantina: 'Dikirim',
      lokasi: 'in Transit Release',
      status: 'Proses Release'
    });
    const user = getCurrentUser();
    const { data: logData } = await api.post('/api/activity_log/release_details', {
      nomorBarcode: form.value.nomorBarcode.slice(0, 10),
      userid: user.username,
      jenisdonor: form.value.jenisDonor,
      sender: 'KarantinaKantongDarah'
    });
    console.log('Activity logged:', logData);
    alert('Data berhasil direlease');
    refreshData();
  } catch (err) {
    console.error('Error releasing data:', err);
    alert('Gagal merelease data');
  }
}

// Load karantina on component mount
onMounted(() => {
  fetchKarantina(1);
});


function getStatusColor(status) {
  const colors = {
    'Registrasi Donor': '#E6E6FA',
    'Periksa HB': '#FFD700',
    'Periksa Fisik': '#3CB371',
    'Ambil Darah': '#87CEEB',
    'Selesai': 'Grey',
    'Ditolak': '#FAA0A0'
  };
  return colors[status] || 'transparent';
}

function getTextColor(bgColor) {
  if (!bgColor) return 'black';

  // Convert HEX to RGB
  let r, g, b;
  if (bgColor.startsWith('#')) {
    const hex = bgColor.replace('#', '');
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else if (bgColor.startsWith('rgb')) {
    [r, g, b] = bgColor.match(/\d+/g).map(Number);
  }

  // Relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? 'black' : 'white';
}

function clearFilters() {
  begindate.value = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  enddate.value = new Date().toISOString().split('T')[0];
  nomorBarcode.value = "";
  statusKarantina.value = "";
  currentPage.value = 1;
  fetchKarantina(1);
}

function applyFilters() {
  currentPage.value = 1;
  fetchKarantina(1);
}
</script>