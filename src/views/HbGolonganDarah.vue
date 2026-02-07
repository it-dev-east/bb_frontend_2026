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
      <div v-if="form.statusCekal === 'Ditolak'" class="flex items-center gap-2 px-3 py-2 bg-rose-50 rounded-lg border border-rose-100">
      <svg class="w-4 h-4 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
      </svg>
      <span class="text-sm font-semibold text-rose-800 tracking-tight">
        {{ form.nomorRegistrasi }} - {{ form.namaDonor }}
      </span>
      </div>
      <div v-else class="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-100">
        <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
        </svg>
        <span class="text-sm font-semibold text-blue-800 tracking-tight">{{ form.nomorRegistrasi }} - {{ form.namaDonor }}</span>
      </div>

    </div>

    <!-- 🔸 Tabs Content -->
    <div class="flex-1 p-4 overflow-y-auto space-y-4">

      <!-- 🧑 Identitas -->
      <TabsContent value="Identitas" class="space-y-4">
        <div class="bg-white p-4 rounded-lg shadow space-y-3">
          <h3 class="text-lg font-semibold text-gray-800">HB dan Golongan Darah</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Nomor Registrasi</Label>
              <Input v-model="form.nomorRegistrasi" readonly class="mt-1" />
            </div>

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Tanggal Registrasi</Label>
              <Input type="datetime-local" v-model="form.tanggalRegistrasi" readonly class="mt-1" />
            </div>

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">No Kartu Donor</Label>
              <Input v-model="form.noKartuDonor" readonly class="mt-1" />
            </div>

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Nama Donor</Label>
              <Input v-model="form.namaDonor" readonly class="mt-1" />
            </div>

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Jenis Kelamin</Label>
              <RadioGroup v-model="form.jenisKelamin" class="flex gap-6 mt-1">
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="male" value="LAKI-LAKI" disabled/>
                  <label for="male" class="text-sm">Laki-Laki</label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="female" value="PEREMPUAN" disabled/>
                  <label for="female" class="text-sm">Perempuan</label>
                </div>
              </RadioGroup>
            </div>

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Tanggal Lahir</Label>
              <Input type="date" v-model="form.tanggalLahir" readonly class="mt-1" />
            </div>

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Tempat Lahir</Label>
              <Input v-model="form.tempatLahir" readonly class="mt-1" />
            </div>

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Umur</Label>
              <Input v-model="form.umur" readonly class="mt-1" />
            </div>

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600 mb-1">Jenis Donor</Label>
              <Select v-model="form.jenisDonor" disabled>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Tipe Donor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Donor Rutin">Donor Rutin</SelectItem>
                <SelectItem value="Donor Sukarela">Donor Sukarela</SelectItem>
                <SelectItem value="Donor Apheresis">Donor Apheresis</SelectItem>
                <SelectItem value="Donor Langsung">Donor Langsung</SelectItem>
                <SelectItem value="Autologous">Autologous</SelectItem>
              </SelectContent>
            </Select>
            </div>

            <!-- <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Nama Petugas</Label>
              <Input v-model="form.namaPetugas" class="mt-1" />
            </div>
            --> 
          </div>
        </div>
      </TabsContent>

      <!-- 💉 Hasil HB -->
      <TabsContent value="Hasil HB" class="space-y-4">
        <div class="bg-white p-4 rounded-lg shadow space-y-3">
          <h3 class="text-lg font-semibold text-gray-800">Hasil HB</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Berat Badan</Label>
              <div class="flex items-center">
                <Input v-model="form.beratBadan" class="px-2 py-2 flex-1 mt-1" />
                <span class="p-2 bg-gray-50 text-gray-600 text-sm  border-gray-200">Kg</span>
              </div>
            </div>
           
            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Tinggi Badan</Label>
              <div class="flex items-center">
                <Input v-model="form.tinggiBadan" class="flex-1 mt-1" />
                <span class="p-2 bg-gray-50 text-gray-600 text-sm  border-gray-200">Cm</span>
              </div>
            </div>

            <div>
              <!-- <VitalInput
                label="Hemoglobin"
                note="Normal: 12.5 - 17.9 g/dL"
                v-model="form.hemoglobin"
                :min="12.5"
                :max="17.9"
              /> -->
              <VitalInput
                label="Hemoglobin"
                :note="hbNote"
                v-model="form.hemoglobin"
                :min="hbMin"
                :max="hbMax"
              />
            </div>

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Golongan Darah</Label>
              <Select v-model="form.golonganDarah" class="mt-1">
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Golongan Darah" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="AB">AB</SelectItem>
                  <SelectItem value="O">O</SelectItem>
                  <SelectItem value="Tidak Tahu">Tidak Tahu</SelectItem>
                  <SelectItem value="Diskrepansi / Tidak Cocok">
                    Diskrepansi / Tidak Cocok
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">No Lot Reagen</Label>
              <Input v-model="form.noLotReagenHb" class="mt-1" />
            </div>

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Tanggal Expired</Label>
              <Input type="datetime-local" v-model="form.tanggalExpiredHb" class="mt-1" />
            </div>

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Rhesus</Label>
              <RadioGroup v-model="form.rhesus" class="flex gap-6 mt-1">
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="negatif" value="Negatif" />
                  <label for="negatif" class="text-sm">Negatif</label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="positif" value="Positif" />
                  <label for="positif" class="text-sm">Positif</label>
                </div>
              </RadioGroup>
            </div>

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">No Lot Reagen</Label>
              <Input v-model="form.noLotReagenBlood" class="mt-1" />
            </div>

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Tanggal Expired</Label>
              <Input type="datetime-local" v-model="form.tanggalExpiredBlood" class="mt-1" />
            </div>
          </div>
        </div>
      </TabsContent>

      <!-- 🏠 Donasi -->
      <TabsContent value="Donasi" class="space-y-4">
        <div class="bg-white p-4 rounded-lg shadow space-y-3">
          <h3 class="text-lg font-semibold text-gray-800">Donasi</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Tanggal Donasi Terakhir</Label>
              <Input type="datetime-local" v-model="form.tanggalDonasiTerakhir" class="mt-1" />
            </div>

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Donasi ke</Label>
              <Input v-model="form.donasiKe" class="mt-1" />
            </div>

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Tempat Donasi Terakhir</Label>
              <Input v-model="form.tempatDonasiTerakhir" class="mt-1" />
            </div>

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Lokasi Ambil Darah</Label>
              <Input v-model="form.lokasiAmbilDarah" class="mt-1" />
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
                  <SelectItem value="Nilai HB Abnormal">Nilai HB Abnormal</SelectItem>
                  <SelectItem value="Tinggi Badan Tidak Terpenuhi">
                    Tinggi Badan Tidak Terpenuhi
                  </SelectItem>
                  <SelectItem value="Berat Badan Tidak Terpenuhi">
                    Berat Badan Tidak Terpenuhi
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            
            <div class="flex flex-col md:col-span-2">
              <Label class="text-sm text-gray-600">Catatan</Label>
              <Textarea v-model="form.catatan" rows="2" class="mt-1" />
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
          Daftar Donor
        </h3>
        <p class="text-sm text-muted-foreground">
          Daftar Donor untuk Pemeriksaan HB
        </p>
      </div>

      <!-- 🔎 Filters (Right-Aligned) -->
      <div class="flex flex-wrap items-center gap-3">

         <!-- Search by Date -->
        <div class="flex items-center gap-2">
          <input
            v-model="searchRegDate"
            @change="applyFilters"
            type="date"
            class="border border-gray-300 rounded-lg px-3 py-2 w-40 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <!-- Search by No Registrasi -->
        <div class="flex items-center gap-2">
          <input
            v-model="searchNoReg"
            @keyup.enter="applyFilters"
            type="text"
            placeholder="Cari No Registrasi..."
            class="border border-gray-300 rounded-lg px-3 py-2 w-40 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Search by Nama -->
        <div class="flex items-center gap-2">
          <input
            v-model="searchNama"
            @keyup.enter="applyFilters"
            type="text"
            placeholder="Cari Nama..."
            class="border border-gray-300 rounded-lg px-3 py-2 w-40 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Filter Status -->
        <div class="flex items-center gap-2">
          <select
            v-model="filterStatus"
            @change="applyFilters"
            class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Status</option>
            <option value="Registrasi Donor">Registrasi Donor</option>
            <option value="Periksa HB">Periksa HB</option>
            <option value="Periksa Fisik">Periksa Fisik</option>
            <option value="Ambil Darah">Ambil Darah</option>
            <option value="Selesai">Selesai</option>
            <option value="Ditolak">Ditolak</option>
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
          <TableHead class="font-semibold text-gray-800">No Registrasi</TableHead>
          <TableHead class="font-semibold text-gray-800">Tanggal Registrasi</TableHead>
          <TableHead class="font-semibold text-gray-800">No Kartu Donor</TableHead>
          <TableHead class="font-semibold text-gray-800">Nama</TableHead>
          <TableHead class="font-semibold text-gray-800">Tanggal Lahir</TableHead>
          <TableHead class="font-semibold text-gray-800">Status</TableHead>
          <TableHead class="font-semibold text-gray-800">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow
          v-for="(patient, index) in patients"
          :key="patient.id"
          :class="index % 2 === 0 ? 'bg-white' : 'bg-blue-50'"
        >
          <TableCell>{{ patient.reg_no }}</TableCell>
          <TableCell>{{ formatDate(patient.reg_date) }}</TableCell>
          <TableCell>{{ patient.donor_card_no }}</TableCell>
          <TableCell>{{ patient.full_name }}</TableCell>
          <TableCell>{{ formatDateDOB(patient.birth_date) }}</TableCell>
          <TableCell>
            <span
              class="w-40 px-3 py-1 rounded-full text-sm font-medium inline-block text-center"
              :style="{
                backgroundColor: getStatusColor(patient.status),
                color: getTextColor(getStatusColor(patient.status))
              }"
            >
              {{ patient.status }}
            </span>
          </TableCell>
          <TableCell>
            <Button
              size="sm"
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              @click="selectPatient(patient)"
            >
              Pilih
            </Button>
          </TableCell>
        </TableRow>

        <!-- Empty State -->
        <TableRow v-if="patients.length === 0">
          <TableCell colspan="7" class="text-center text-gray-500">
            No patients found
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
              <TableCell>{{ formatDateDOB(patient.birth_date) }}</TableCell>
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
import { ref, computed, onMounted, watch } from 'vue'
import api from "../lib/axios.js";
import VitalInput from "../components/VitalInput.vue";
//shadcnvue
import { Button } from "@/components/ui/button";
import { RefreshCcw, Plus, Search, Undo2, Save, Unlock } from "lucide-vue-next"
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

const tabs = ["Identitas", "Hasil HB", "Donasi", "Status"];
const activeTab = ref("Identitas");

// Patients table related
const patients = ref([]);
const currentPage = ref(1);
const total = ref(0);
const limit = ref(10);

// Filter refs
const searchNoReg = ref("");
const searchNama = ref("");
const searchRegDate = ref(new Date().toISOString().split('T')[0]);
const filterStatus = ref("Periksa HB");

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
  tanggalRegistrasi: '',
  nomorRegistrasi: '',
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
  golonganDarah: 'A',
  noLotReagenHb: '',
  tanggalExpiredHb: '',
  rhesus: 'Negatif',
  noLotReagenBlood: '',
  tanggalExpiredBlood: '',
  tanggalDonasiTerakhir: '',
  donasiKe: '',
  tempatDonasiTerakhir: '',
  lokasiAmbilDarah: 'UPD RS',
  statusCekal: 'Diterima',
  alasanCekal: 'Nilai HB Abnormal',
  catatan: ''
};

const form = ref({ ...defaultForm });

function resetForm() {
  form.value = { ...defaultForm };
}

// computed flag
// const hbFlag = computed(() => {
//   const val = parseFloat(form.value.hemoglobin);
//   if (isNaN(val)) return ""; // kosong kalau bukan angka
//   if (val < 12.5) return "L";
//   if (val > 17.9) return "H";
//   return ""; // normal
// });
const hbFlag = computed(() => {
  const val = parseFloat(form.value.hemoglobin)
  if (isNaN(val)) return ""

  if (hbMin.value != null && val < hbMin.value) return "L"
  if (hbMax.value != null && val > hbMax.value) return "H"
  return "" // normal
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

async function fetchPatients(page = 1) {
  currentPage.value = page;
  const params = {};
  params.page = page;
  params.limit = limit.value;
  if (filterStatus.value) {
    params.status = filterStatus.value;
  } else {
    params.status = 'not_registrasi_donor';
  }
  if (searchNoReg.value) params.reg_no = searchNoReg.value;
  if (searchNama.value) params.full_name = searchNama.value;
  if (searchRegDate.value) params.reg_date = searchRegDate.value;
  try {
    const { data } = await api.get('/api/patients', { params });
    patients.value = data.data;
    total.value = data.total;
  } catch (err) {
    console.error('Error fetching patients:', err);
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    fetchPatients(currentPage.value - 1);
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    fetchPatients(currentPage.value + 1);
  }
}

// nilai normal HB
const hbMaster = ref(null)

// map jenisKelamin -> jk in master_test
const hbJK = computed(() => (form.value.jenisKelamin === "PEREMPUAN" ? "P" : "L"))

const hbMin = computed(() =>
  hbMaster.value?.batas_bawah != null ? Number(hbMaster.value.batas_bawah) : null
)

const hbMax = computed(() =>
  hbMaster.value?.batas_atas != null ? Number(hbMaster.value.batas_atas) : null
)

const hbNote = computed(() => {
  if (!hbMaster.value) return "Normal: -"
  const normal = hbMaster.value.nilai_normal ?? "-"
  const unit = hbMaster.value.satuan ? ` ${hbMaster.value.satuan}` : ""
  return `Normal: ${normal}${unit}`
})

async function fetchHbMaster() {
  try {
    const { data } = await api.get("/api/master_test_hb", {
      params: { nama: "HB", jk: hbJK.value }
    })
    hbMaster.value = data
  } catch (err) {
    hbMaster.value = null
    console.error("Failed to load master_test HB:", err)
  }
}

function computeHbFlag(hbValue, hbMasterObj) {
  const v = parseFloat(hbValue)
  if (isNaN(v) || !hbMasterObj) return null

  const min = hbMasterObj.batas_bawah != null ? Number(hbMasterObj.batas_bawah) : null
  const max = hbMasterObj.batas_atas != null ? Number(hbMasterObj.batas_atas) : null

  if (min != null && v < min) return "L"
  if (max != null && v > max) return "H"
  return "" // normal
}

async function selectPatient(patient) {
  // Clear form data first
  Object.keys(form.value).forEach(key => {
    form.value[key] = '';
  });
  // Reset specific fields to defaults
  resetForm();
  // form.value.jenisKelamin = 'LAKI-LAKI';
  // form.value.golonganDarah = 'A';
  // form.value.rhesus = 'Negatif';
  // form.value.statusCekal = 'Diterima';
  // form.value.alasanCekal = 'Nilai HB Abnormal';

  try {
    // Fetch full patient data
    const { data: fullPatient } = await api.get(`/api/patients/${patient.reg_no}`);
    //console.log("🧠 Full patient response:", fullPatient);
    // Populate Identitas tab with patient data
    if (fullPatient.reg_date) {
      const date = new Date(fullPatient.reg_date);
      date.setHours(date.getHours() + 7); // Adjust to Asia/Bangkok timezone (UTC+7)
      form.value.tanggalRegistrasi = date.toISOString().slice(0, 16);
    } else {
      const date = new Date();
      date.setHours(date.getHours() + 7);
      form.value.tanggalRegistrasi = date.toISOString().slice(0, 16);
    }
    form.value.nomorRegistrasi = fullPatient.reg_no || '';
    form.value.noKartuDonor = fullPatient.donor_card_no || '';
    form.value.namaDonor = fullPatient.full_name || '';
    form.value.jenisKelamin = fullPatient.gender || '';
    form.value.tempatLahir = fullPatient.birth_place || '';
    form.value.tanggalLahir = fullPatient.birth_date || '';
    form.value.umur = fullPatient.age || '';
    form.value.jenisDonor = fullPatient.donor_type || '';
    form.value.tanggalDonasiTerakhir = fullPatient.last_donation_date
      ? toLocalDatetimeInputValue(fullPatient.last_donation_date)
      : '';
    form.value.donasiKe = fullPatient.donation_to != null
      ? String(fullPatient.donation_to)
      : '';
    form.value.tempatDonasiTerakhir = fullPatient.last_donation_place || '';

    // fetch nilai normal hb
    await fetchHbMaster();

    // Fetch data from hb_golongan_darah for other tabs
    try {
      const { data: hbData } = await api.get(`/api/hb_golongan_darah/${patient.reg_no}`);
      if (hbData) {
        // Populate Hasil HB, Donasi, Status tabs
        if (hbData.jenis_donor) {
          form.value.jenisDonor = hbData.jenis_donor;
        }
        form.value.namaPetugas = hbData.nama_petugas || '';
        form.value.beratBadan = hbData.berat_badan ? hbData.berat_badan.toString() : '';
        form.value.tinggiBadan = hbData.tinggi_badan ? hbData.tinggi_badan.toString() : '';
        form.value.hemoglobin = hbData.hemoglobin ? hbData.hemoglobin.toString() : '';
        form.value.golonganDarah = hbData.golongan_darah || '';
        form.value.noLotReagenHb = hbData.no_lot_reagen_hb || '';
        form.value.tanggalExpiredHb = hbData.tanggal_expired_hb ? new Date(hbData.tanggal_expired_hb).toISOString().slice(0, 16) : '';
        form.value.rhesus = hbData.rhesus || '';
        form.value.noLotReagenBlood = hbData.no_lot_reagen_blood || '';
        form.value.tanggalExpiredBlood = hbData.tanggal_expired_blood ? new Date(hbData.tanggal_expired_blood).toISOString().slice(0, 16) : '';
        //form.value.tanggalDonasiTerakhir = hbData.tanggal_donasi_terakhir ? new Date(hbData.tanggal_donasi_terakhir).toISOString().slice(0, 16) : '';
        //form.value.donasiKe = hbData.donasi_ke ? hbData.donasi_ke.toString() : '';
        //form.value.tempatDonasiTerakhir = hbData.tempat_donasi_terakhir || '';
        form.value.lokasiAmbilDarah = hbData.lokasi_ambil_darah || 'UPD RS';
        form.value.statusCekal = hbData.status_cekal || 'Diterima';
        form.value.alasanCekal = hbData.alasan_cekal || '';
        form.value.catatan = hbData.catatan || '';
      }
    } catch (hbErr) {
      // No data in hb_golongan_darah, leave other fields empty
      // If no hb_golongan_darah record, fill golonganDarah from patients blood_type
      form.value.golonganDarah = fullPatient.blood_type || '';
    }
    //console.log('statusCekal value:', form.value.statusCekal);
  } catch (err) {
    console.error('Error:', err);
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

function formatDateDOB(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
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
  fetchPatients(currentPage.value);
}

function cariDataRegistrasi() {
  showModal.value = true;
  modalCurrentPage.value = 1;
  fetchModalPatients(1);
}

async function undo() {
  const regno = form.value.nomorRegistrasi;
  if (!regno) {
    alert('Silahkan pilih data donor terlebih dahulu');
    return;
  }
  try {
    // Update patients status to 'Periksa HB'
    await api.put('/api/patients', { regno: regno, status: 'Periksa HB' });

    // Update hb_golongan_darah status to 'Periksa HB' and status_cekal to 'Diterima' if exists
    try {
      await api.put('/api/hb_golongan_darah', { nomor_registrasi: regno, status: 'Periksa HB', status_cekal: 'Diterima', release_by: null, release_at: null });
    } catch (updateHbErr) {
      if (updateHbErr.response?.status !== 404) {
        throw new Error('Failed to update hb_golongan_darah status');
      }
    }

    // Delete from log_cekal if exists
    try {
      await api.delete(`/api/log_cekal?nomor_registrasi=${regno}&menu=Periksa%20HB`);
    } catch (deleteLogErr) {
      console.error('Failed to delete log_cekal');
    }

    alert('Data berhasil di undo');
    // Update statusCekal to Diterima
    form.value.statusCekal = 'Diterima';
    // Insert into activity_log
    const userStr = localStorage.getItem("user")
    let userid = null
    if (userStr) {
      const user = JSON.parse(userStr)
      if (user.username) {
        userid = user.username
      }
    }
    await api.post('/api/activity_log', {
      note: 'Undo',
      userid: userid,
      pid: form.value.noKartuDonor,
      regno: form.value.nomorRegistrasi,
      menu: 'HB dan Golongan Darah'
    })
    // Refresh the grid
    fetchPatients(currentPage.value);
  } catch (err) {
    console.error('Error undoing:', err);
    alert('Proses undo gagal');
  }
}

// Function to get current user
function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

function withDefaults(data) {
  return {
    ...data,
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
    release_at: data.release_at || null
  };
}

async function simpanData() {
  const regno = form.value.nomorRegistrasi;
  if (!regno) {
    alert('Silahkan pilih data donor terlebih dahulu');
    return;
  }
  try {
    // ✅ insert data nilai normal
    if (!hbMaster.value) {
      await fetchHbMaster()
    }

    const hbFlagNow = computeHbFlag(form.value.hemoglobin, hbMaster.value)

    // Check if record exists
    let exists = false;
    try {
      await api.get(`/api/hb_golongan_darah/${regno}`);
      exists = true;
    } catch (checkErr) {
      if (checkErr.response?.status !== 404) {
        throw checkErr;
      }
    }

    const currentUser = getCurrentUser();
    const rawData = {
      tanggal_registrasi: form.value.tanggalRegistrasi,
      nomor_registrasi: regno,
      no_kartu_donor: form.value.noKartuDonor,
      nama_donor: form.value.namaDonor,
      jenis_kelamin: form.value.jenisKelamin,
      tempat_lahir: form.value.tempatLahir,
      tanggal_lahir: form.value.tanggalLahir,
      umur: form.value.umur,
      jenis_donor: form.value.jenisDonor,
      nama_petugas: form.value.namaPetugas,
      berat_badan: form.value.beratBadan,
      tinggi_badan: form.value.tinggiBadan,
      hemoglobin: form.value.hemoglobin,
      golongan_darah: form.value.golonganDarah,
      no_lot_reagen_hb: form.value.noLotReagenHb,
      tanggal_expired_hb: form.value.tanggalExpiredHb,
      rhesus: form.value.rhesus,
      no_lot_reagen_blood: form.value.noLotReagenBlood,
      tanggal_expired_blood: form.value.tanggalExpiredBlood,
      tanggal_donasi_terakhir: form.value.tanggalDonasiTerakhir,
      donasi_ke: form.value.donasiKe,
      tempat_donasi_terakhir: form.value.tempatDonasiTerakhir,
      lokasi_ambil_darah: form.value.lokasiAmbilDarah,
      status_cekal: form.value.statusCekal,
      alasan_cekal: form.value.alasanCekal,
      catatan: form.value.catatan,
      created_by: currentUser ? currentUser.username : null,
      // ✅ NEW: save master_test reference values into hb_golongan_darah
      flag: hbFlagNow,
      nilai_normal: hbMaster.value?.nilai_normal ?? null,
      satuan: hbMaster.value?.satuan ?? null,
      batas_bawah: hbMaster.value?.batas_bawah ?? null,
      batas_atas: hbMaster.value?.batas_atas ?? null,
      kritis_bawah: hbMaster.value?.kritis_bawah ?? null,
      kritis_atas: hbMaster.value?.kritis_atas ?? null,
    };

    // apply default values
    const data = withDefaults(rawData);

    if (exists) {
      // Update, don't include status
      const updateData = { ...data };
      delete updateData.status;
      await api.put('/api/hb_golongan_darah', updateData);
      alert('Data berhasil disimpan');
      // Insert into activity_log
      const userStr = localStorage.getItem("user")
      let userid = null
      if (userStr) {
        const user = JSON.parse(userStr)
        if (user.username) {
          userid = user.username
        }
      }
      await api.post('/api/activity_log', {
        note: 'Simpan Data',
        userid: userid,
        pid: form.value.noKartuDonor,
        regno: form.value.nomorRegistrasi,
        menu: 'HB dan Golongan Darah'
      })
      fetchPatients(currentPage.value);
    } else {
      // Insert, include status
      data.status = 'Periksa HB';
      await api.post('/api/hb_golongan_darah', data);
      alert('Data berhasil disimpan');
      // Insert into activity_log
      const userStr = localStorage.getItem("user")
      let userid = null
      if (userStr) {
        const user = JSON.parse(userStr)
        if (user.username) {
          userid = user.username
        }
      }
      await api.post('/api/activity_log', {
        note: 'Simpan Data',
        userid: userid,
        pid: form.value.noKartuDonor,
        regno: form.value.nomorRegistrasi,
        menu: 'HB dan Golongan Darah'
      })
      fetchPatients(currentPage.value);
    }

    // Update patients donor_type
    //await api.put('/api/patients', { regno: regno, donor_type: form.value.jenisDonor });
    await api.put("/api/patients", {
      regno,
      donor_type: form.value.jenisDonor,
      last_donation_date: form.value.tanggalDonasiTerakhir || null,
      donation_to: form.value.donasiKe || null,
      last_donation_place: form.value.tempatDonasiTerakhir || null,
    });

    // If statusCekal is 'Ditolak', update patients status to 'Ditolak'
    if (form.value.statusCekal === 'Ditolak') {
      await api.put('/api/patients', { regno: regno, status: 'Ditolak' });

      // Insert into log_cekal
      const logData = {
        nomor_registrasi: regno,
        no_barcode: null,
        no_kartu_donor: form.value.noKartuDonor,
        petugas: currentUser.username,
        alasan: form.value.alasanCekal,
        menu: "Periksa HB",
        keterangan: form.value.catatan,
        created_by: currentUser.username
      };
      await api.post('/api/log_cekal', logData);
    }
    fetchPatients(currentPage.value);
  } catch (err) {
    console.error('Error saving data:', err);
    alert('Error saving data');
  }
}

async function releaseData() {
  const regno = form.value.nomorRegistrasi;
  if (!regno) {
    alert('Silahkan pilih data donor terlebih dahulu');
    return;
  }
  try {
    // ✅ insert data nilai normal
    if (!hbMaster.value) {
      await fetchHbMaster()
    }

    const hbFlagNow = computeHbFlag(form.value.hemoglobin, hbMaster.value)

    // Check if record exists
    let exists = false;
    try {
      await api.get(`/api/hb_golongan_darah/${regno}`);
      exists = true;
    } catch (checkErr) {
      if (checkErr.response?.status !== 404) {
        throw checkErr;
      }
    }

    const currentUser = getCurrentUser();
    const rawData = {
      tanggal_registrasi: form.value.tanggalRegistrasi,
      nomor_registrasi: regno,
      no_kartu_donor: form.value.noKartuDonor,
      nama_donor: form.value.namaDonor,
      jenis_kelamin: form.value.jenisKelamin,
      tempat_lahir: form.value.tempatLahir,
      tanggal_lahir: form.value.tanggalLahir,
      umur: form.value.umur,
      jenis_donor: form.value.jenisDonor,
      nama_petugas: form.value.namaPetugas,
      berat_badan: form.value.beratBadan,
      tinggi_badan: form.value.tinggiBadan,
      hemoglobin: form.value.hemoglobin,
      golongan_darah: form.value.golonganDarah,
      no_lot_reagen_hb: form.value.noLotReagenHb,
      tanggal_expired_hb: form.value.tanggalExpiredHb,
      rhesus: form.value.rhesus,
      no_lot_reagen_blood: form.value.noLotReagenBlood,
      tanggal_expired_blood: form.value.tanggalExpiredBlood,
      tanggal_donasi_terakhir: form.value.tanggalDonasiTerakhir,
      donasi_ke: form.value.donasiKe,
      tempat_donasi_terakhir: form.value.tempatDonasiTerakhir,
      lokasi_ambil_darah: form.value.lokasiAmbilDarah,
      status_cekal: form.value.statusCekal,
      alasan_cekal: form.value.alasanCekal,
      catatan: form.value.catatan,
      created_by: currentUser ? currentUser.username : null,
      // ✅ NEW: save master_test reference values into hb_golongan_darah
      flag: hbFlagNow,
      nilai_normal: hbMaster.value?.nilai_normal ?? null,
      satuan: hbMaster.value?.satuan ?? null,
      batas_bawah: hbMaster.value?.batas_bawah ?? null,
      batas_atas: hbMaster.value?.batas_atas ?? null,
      kritis_bawah: hbMaster.value?.kritis_bawah ?? null,
      kritis_atas: hbMaster.value?.kritis_atas ?? null,
    };

    // apply default values
    const data = withDefaults(rawData);

    if (exists) {
      // Update, don't include status
      const updateData = { ...data };
      delete updateData.status;
      await api.put('/api/hb_golongan_darah', updateData);
      alert('Data updated successfully');
      // Insert into activity_log
      const userStr = localStorage.getItem("user")
      let userid = null
      if (userStr) {
        const user = JSON.parse(userStr)
        if (user.username) {
          userid = user.username
        }
      }
      await api.post('/api/activity_log', {
        note: 'Release Data',
        userid: userid,
        pid: form.value.noKartuDonor,
        regno: form.value.nomorRegistrasi,
        menu: 'HB dan Golongan Darah'
      })
      fetchPatients(currentPage.value);
    } else {
      // Insert, include status 'Periksa Fisik'
      data.status = 'Periksa Fisik';
      await api.post('/api/hb_golongan_darah', data);
      alert('Data berhasil direlease dan disimpan');
      // Insert into activity_log
      const userStr = localStorage.getItem("user")
      let userid = null
      if (userStr) {
        const user = JSON.parse(userStr)
        if (user.username) {
          userid = user.username
        }
      }
      await api.post('/api/activity_log', {
        note: 'Release Data',
        userid: userid,
        pid: form.value.noKartuDonor,
        regno: form.value.nomorRegistrasi,
        menu: 'HB dan Golongan Darah'
      })
      fetchPatients(currentPage.value);
    }

    // Update patients donor_type
    //await api.put('/api/patients', { regno: regno, donor_type: form.value.jenisDonor });
    await api.put("/api/patients", {
      regno,
      donor_type: form.value.jenisDonor,
      last_donation_date: form.value.tanggalDonasiTerakhir || null,
      donation_to: form.value.donasiKe || null,
      last_donation_place: form.value.tempatDonasiTerakhir || null,
    });

    // Update patients status to 'Periksa Fisik' or 'Ditolak' if statusCekal is 'Ditolak'
    const patientStatus = form.value.statusCekal === 'Ditolak' ? 'Ditolak' : 'Periksa Fisik';
    await api.put('/api/patients', { regno: regno, status: patientStatus });

    // If statusCekal is 'Ditolak', insert into log_cekal
    if (form.value.statusCekal === 'Ditolak') {
      const logData = {
        nomor_registrasi: regno,
        no_barcode: null,
        no_kartu_donor: form.value.noKartuDonor,
        petugas: currentUser.username,
        alasan: form.value.alasanCekal,
        menu: "Periksa HB",
        keterangan: form.value.catatan,
        created_by: currentUser.username
      };
      await api.post('/api/log_cekal', logData);
    }

    // Update master_donor with berat_badan, tinggi_badan, goldar, rhesus
    const masterDonorUpdate = {
      no_kartu_donor: form.value.noKartuDonor,
      nama_donor: form.value.namaDonor,
      berat_badan: form.value.beratBadan ? parseFloat(form.value.beratBadan) : null,
      tinggi_badan: form.value.tinggiBadan ? parseFloat(form.value.tinggiBadan) : null,
      goldar: form.value.golonganDarah,
      rhesus: form.value.rhesus
    };
    await api.post('/api/master_donor', masterDonorUpdate);

    fetchPatients(currentPage.value);

  } catch (err) {
    console.error('Error releasing data:', err);
    alert('Gagal release data');
  }
}

// Load patients on component mount
onMounted(() => {
  fetchPatients(1);
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
  searchNoReg.value = "";
  searchNama.value = "";
  searchRegDate.value = new Date().toISOString().split('T')[0];
  filterStatus.value = "Periksa HB";
  currentPage.value = 1;
  fetchPatients(1);
}

function applyFilters() {
  currentPage.value = 1;
  fetchPatients(1);
}
</script>