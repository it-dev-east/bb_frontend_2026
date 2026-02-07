<template>
  <div class="space-y-6 flex flex-col h-full">
    <!-- 🔹 Top Action Bar (shadcn Button) -->
    <div class="flex gap-2 p-4 bg-white border-b sticky top-0 z-10">
    <Button @click="refresh" class="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg">
      <RefreshCcw class="w-5 h-5" />
      Refresh
    </Button>
    <!--
    <Button @click="cariData" class="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg">
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
    <!--
    <Button class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
      <Barcode class="w-5 h-5" />
      Cetak Barcode
    </Button>
    -->
    <Button
      @click="sendToHCLAB"
      class="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg"
    >
      <Upload class="w-5 h-5" />
      Kirim ke HCLAB BB
    </Button>

    </div>
    

    <!-- Scan Area -->
    <Card class="mx-4 shadow-sm border rounded-2xl">
  <CardHeader class="flex items-center justify-between border-b px-6 py-4">
    <div class="flex items-center justify-between w-full">
      <!-- Title (left-aligned) -->
      <h3 class="text-xl font-semibold tracking-tight text-foreground">
        Release Kantong Darah
      </h3>

      <!-- Status (right-aligned, fixed width) -->
      <div
        v-if="status && status === 'Release'"
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
        <Input id="noKantong" v-model="noKantong" placeholder="Masukkan No Kantong" />
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
        <CardTitle>Data Seleksi Donor</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-4 gap-4">
          <div>
            <Label for="noKartuDonor" class="text-sm font-medium text-gray-700">No Kartu Donor</Label>
            <Input id="noKartuDonor" v-model="donor.noKartuDonor" placeholder="No Kartu Donor" />
          </div>

          <div>
            <Label for="jenisKelamin" class="text-sm font-medium text-gray-700">Jenis Kelamin</Label>
            <Input id="jenisKelamin" v-model="donor.jenisKelamin" placeholder="Jenis Kelamin" />
          </div>

          <div>
            <Label for="tanggalLahir" class="text-sm font-medium text-gray-700">Tanggal Lahir</Label>
            <Input id="tanggalLahir" v-model="donor.tanggalLahir" placeholder="Tanggal Lahir" />
          </div>

          <div>
            <Label for="umur" class="text-sm font-medium text-gray-700">Umur</Label>
            <Input id="umur" v-model="donor.umur" placeholder="Umur" />
          </div>

          <div>
            <Label for="beratBadan" class="text-sm font-medium text-gray-700">Berat Badan</Label>
            <Input id="beratBadan" v-model="donor.beratBadan" placeholder="Berat Badan" />
          </div>

          <div>
            <Label for="tinggiBadan" class="text-sm font-medium text-gray-700">Tinggi Badan</Label>
            <Input id="tinggiBadan" v-model="donor.tinggiBadan" placeholder="Tinggi Badan" />
          </div>

          <div>
            <Label for="statusCekal" class="text-sm font-medium text-gray-700">Status Cekal</Label>
            <Input id="statusCekal" v-model="donor.statusCekal" placeholder="Status Cekal" />
          </div>

          <div>
            <Label for="haemoglobin" class="text-sm font-medium text-gray-700">Haemoglobin</Label>
            <Input id="haemoglobin" v-model="donor.haemoglobin" placeholder="Haemoglobin" />
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
            <Label for="sistole" class="text-sm font-medium text-gray-700">Sistole</Label>
            <Input id="sistole" v-model="donor.sistole" placeholder="Sistole" />
          </div>

          <div>
            <Label for="diastole" class="text-sm font-medium text-gray-700">Diastole</Label>
            <Input id="diastole" v-model="donor.diastole" placeholder="Diastole" />
          </div>

          <div>
            <Label for="volumeDarah" class="text-sm font-medium text-gray-700">Volume Darah</Label>
            <Input id="volumeDarah" v-model="donor.volumeDarah" placeholder="Volume Darah" />
          </div>

          <div>
            <Label for="jenisKantong" class="text-sm font-medium text-gray-700">Jenis Kantong</Label>
            <Input id="jenisKantong" v-model="donor.jenisKantong" placeholder="Jenis Kantong" />
          </div>

          <div>
            <Label for="noKantong" class="text-sm font-medium text-gray-700">No Kantong</Label>
            <Input id="noKantong" v-model="donor.noKantong" placeholder="No Kantong" />
          </div>

          <div>
            <Label for="lokasiDonor" class="text-sm font-medium text-gray-700">Lokasi Donor</Label>
            <Input id="lokasiDonor" v-model="donor.lokasiDonor" placeholder="Lokasi Donor" />
          </div>

          <div>
            <Label for="jenisDonor" class="text-sm font-medium text-gray-700">Jenis Donor</Label>
            <Input id="jenisDonor" v-model="donor.jenisDonor" placeholder="Jenis Donor" />
          </div>

          <div>
            <Label for="peruntukan" class="text-sm font-medium text-gray-700">Peruntukan</Label>
            <Input id="peruntukan" v-model="donor.peruntukan" placeholder="Peruntukan" />
          </div>

          <div>
            <Label for="noRmPasien" class="text-sm font-medium text-gray-700">No RM Pasien</Label>
            <Input id="noRmPasien" v-model="donor.noRmPasien" placeholder="No RM Pasien" />
          </div>

          <div>
            <Label for="rumahSakit" class="text-sm font-medium text-gray-700">Rumah Sakit</Label>
            <Input id="rumahSakit" v-model="donor.rumahSakit" placeholder="Rumah Sakit" />
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Data Uji Saring IMLTD -->
    <Card class="mx-4">
      <CardHeader>
        <CardTitle>Data Uji Saring IMLTD</CardTitle>
      </CardHeader>
      <CardContent>
     <!-- WRAPPER -->
<div class="flex justify-between gap-8">

<!-- TABLE LEFT -->
<div class="flex-1 space-y-2 text-sm">
  <!-- Header -->
  <div class="flex items-center gap-2 font-medium text-gray-700">
    <span class="w-16"></span>
    <span class="w-28">Hasil CLIA</span>
    <span class="w-32">Kesimpulan</span>
  </div>

  <!-- SIFILIS -->
  <div class="flex items-center gap-2">
    <Label class="w-16 text-sm">Sifilis</Label>
    <Input v-model="screeningLeft.sifilis_hasil_final" placeholder="Hasil Final" class="border p-1 w-28 text-sm" />
    <RadioGroup v-model="screeningLeft.sifilis_kesimpulan" class="flex gap-2">
      <div class="flex items-center gap-1">
        <RadioGroupItem id="sifilisNeg" value="Tidak Reaktif" />
        <Label for="sifilisNeg">Tidak Reaktif</Label>
      </div>
      <div class="flex items-center gap-1">
        <RadioGroupItem id="sifilisPos" value="Reaktif" />
        <Label for="sifilisPos">Reaktif</Label>
      </div>
    </RadioGroup>
  </div>

  <!-- HBsAg -->
  <div class="flex items-center gap-2">
    <Label class="w-16 text-sm">HBsAg</Label>
    <Input v-model="screeningLeft.hbsag_hasil_final" placeholder="Hasil Final" class="border p-1 w-28 text-sm" />
    <RadioGroup v-model="screeningLeft.hbsag_kesimpulan" class="flex gap-2">
      <div class="flex items-center gap-1">
        <RadioGroupItem id="hbsagNeg" value="Tidak Reaktif" />
        <Label for="hbsagNeg">Tidak Reaktif</Label>
      </div>
      <div class="flex items-center gap-1">
        <RadioGroupItem id="hbsagPos" value="Reaktif" />
        <Label for="hbsagPos">Reaktif</Label>
      </div>
    </RadioGroup>
  </div>

  <!-- HCV -->
  <div class="flex items-center gap-2">
    <Label class="w-16 text-sm">HCV</Label>
    <Input v-model="screeningLeft.hcv_hasil_final" placeholder="Hasil Final" class="border p-1 w-28 text-sm" />
    <RadioGroup v-model="screeningLeft.hcv_kesimpulan" class="flex gap-2">
      <div class="flex items-center gap-1">
        <RadioGroupItem id="hcvNeg" value="Tidak Reaktif" />
        <Label for="hcvNeg">Tidak Reaktif</Label>
      </div>
      <div class="flex items-center gap-1">
        <RadioGroupItem id="hcvPos" value="Reaktif" />
        <Label for="hcvPos">Reaktif</Label>
      </div>
    </RadioGroup>
  </div>

  <!-- HIV -->
  <div class="flex items-center gap-2">
    <Label class="w-16 text-sm">HIV</Label>
    <Input v-model="screeningLeft.hiv_hasil_final" placeholder="Hasil Final" class="border p-1 w-28 text-sm" />
    <RadioGroup v-model="screeningLeft.hiv_kesimpulan" class="flex gap-2">
      <div class="flex items-center gap-1">
        <RadioGroupItem id="hivNeg" value="Tidak Reaktif" />
        <Label for="hivNeg">Tidak Reaktif</Label>
      </div>
      <div class="flex items-center gap-1">
        <RadioGroupItem id="hivPos" value="Reaktif" />
        <Label for="hivPos">Reaktif</Label>
      </div>
    </RadioGroup>
  </div>

  <!-- MALARIA -->
  <div class="flex items-center gap-2">
    <Label class="w-16 text-sm">Malaria</Label>
    <Input v-model="screeningLeft.malaria_hasil_final" placeholder="Hasil Final" class="border p-1 w-28 text-sm" />
    <RadioGroup v-model="screeningLeft.malaria_kesimpulan" class="flex gap-2">
      <div class="flex items-center gap-1">
        <RadioGroupItem id="malariaNeg" value="Tidak Reaktif" />
        <Label for="malariaNeg">Tidak Reaktif</Label>
      </div>
      <div class="flex items-center gap-1">
        <RadioGroupItem id="malariaPos" value="Reaktif" />
        <Label for="malariaPos">Reaktif</Label>
      </div>
    </RadioGroup>
  </div>
</div>


<!-- TABLE RIGHT -->
<div class="flex-1 space-y-2 text-sm">
  <!-- Header -->
  <div class="flex items-center gap-2 font-medium text-gray-700">
    <span class="w-16"></span>
    <span class="w-28">Hasil NAT</span>
    <span class="w-32">Kesimpulan</span>
  </div>

  <!-- SIFILIS -->
  <div class="flex items-center gap-2">
    <Label class="w-16 text-sm">Sifilis</Label>
    <Input v-model="screeningRight.sifilis_hasil_nat" placeholder="Hasil Final" class="border p-1 w-28 text-sm" />
    <RadioGroup v-model="screeningRight.sifilis_kesimpulan_nat" class="flex gap-2">
      <div class="flex items-center gap-1">
        <RadioGroupItem id="sifilisNegNat" value="Tidak Reaktif" />
        <Label for="sifilisNegNat">Tidak Reaktif</Label>
      </div>
      <div class="flex items-center gap-1">
        <RadioGroupItem id="sifilisPosNat" value="Reaktif" />
        <Label for="sifilisPosNat">Reaktif</Label>
      </div>
    </RadioGroup>
  </div>

  <!-- HBsAg -->
  <div class="flex items-center gap-2">
    <Label class="w-16 text-sm">HBsAg</Label>
    <Input v-model="screeningRight.hbsag_hasil_nat" placeholder="Hasil Final" class="border p-1 w-28 text-sm" />
    <RadioGroup v-model="screeningRight.hbsag_kesimpulan_nat" class="flex gap-2">
      <div class="flex items-center gap-1">
        <RadioGroupItem id="hbsagNegNat" value="Tidak Reaktif" />
        <Label for="hbsagNegNat">Tidak Reaktif</Label>
      </div>
      <div class="flex items-center gap-1">
        <RadioGroupItem id="hbsagPosNat" value="Reaktif" />
        <Label for="hbsagPosNat">Reaktif</Label>
      </div>
    </RadioGroup>
  </div>

  <!-- HCV -->
  <div class="flex items-center gap-2">
    <Label class="w-16 text-sm">HCV</Label>
    <Input v-model="screeningRight.hcv_hasil_nat" placeholder="Hasil Final" class="border p-1 w-28 text-sm" />
    <RadioGroup v-model="screeningRight.hcv_kesimpulan_nat" class="flex gap-2">
      <div class="flex items-center gap-1">
        <RadioGroupItem id="hcvNegNat" value="Tidak Reaktif" />
        <Label for="hcvNegNat">Tidak Reaktif</Label>
      </div>
      <div class="flex items-center gap-1">
        <RadioGroupItem id="hcvPosNat" value="Reaktif" />
        <Label for="hcvPosNat">Reaktif</Label>
      </div>
    </RadioGroup>
  </div>

  <!-- HIV -->
  <div class="flex items-center gap-2">
    <Label class="w-16 text-sm">HIV</Label>
    <Input v-model="screeningRight.hiv_hasil_nat" placeholder="Hasil Final" class="border p-1 w-28 text-sm" />
    <RadioGroup v-model="screeningRight.hiv_kesimpulan_nat" class="flex gap-2">
      <div class="flex items-center gap-1">
        <RadioGroupItem id="hivNegNat" value="Tidak Reaktif" />
        <Label for="hivNegNat">Tidak Reaktif</Label>
      </div>
      <div class="flex items-center gap-1">
        <RadioGroupItem id="hivPosNat" value="Reaktif" />
        <Label for="hivPosNat">Reaktif</Label>
      </div>
    </RadioGroup>
  </div>

  <!-- MALARIA -->
  <div class="flex items-center gap-2">
    <Label class="w-16 text-sm">Malaria</Label>
    <Input v-model="screeningRight.malaria_hasil_nat" placeholder="Hasil Final" class="border p-1 w-28 text-sm" />
    <RadioGroup v-model="screeningRight.malaria_kesimpulan_nat" class="flex gap-2">
      <div class="flex items-center gap-1">
        <RadioGroupItem id="malariaNegNat" value="Tidak Reaktif" />
        <Label for="malariaNegNat">Tidak Reaktif</Label>
      </div>
      <div class="flex items-center gap-1">
        <RadioGroupItem id="malariaPosNat" value="Reaktif" />
        <Label for="malariaPosNat">Reaktif</Label>
      </div>
    </RadioGroup>
  </div>
</div>

</div>


      </CardContent>
    </Card>

    <!-- Data Uji Konfirmasi Golongan Darah -->
    <Card class="mx-4">
      <CardHeader>
        <CardTitle>Data Uji Konfirmasi Golongan Darah</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex flex-wrap items-end gap-3">
          <div class="flex flex-col w-24">
            <Label class="block text-xs font-medium">Anti A</Label>
            <Input v-model="ujiKonfirmasi.antiA" class="w-full border p-1 text-sm" />
          </div>
          <div class="flex flex-col w-24">
            <Label class="block text-xs font-medium">Anti B</Label>
            <Input v-model="ujiKonfirmasi.antiB" class="w-full border p-1 text-sm" />
          </div>
          <div class="flex flex-col w-24">
            <Label class="block text-xs font-medium">Anti D</Label>
            <Input v-model="ujiKonfirmasi.antiD" class="w-full border p-1 text-sm" />
          </div>
          <div class="flex flex-col w-24">
            <Label class="block text-xs font-medium">RH Ctrl</Label>
            <Input v-model="ujiKonfirmasi.rhCtrl" class="w-full border p-1 text-sm" />
          </div>
          <div class="flex flex-col w-24">
            <Label class="block text-xs font-medium">Cell A1</Label>
            <Input v-model="ujiKonfirmasi.cellA1" class="w-full border p-1 text-sm" />
          </div>
          <div class="flex flex-col w-24">
            <Label class="block text-xs font-medium">Cell B</Label>
            <Input v-model="ujiKonfirmasi.cellB" class="w-full border p-1 text-sm" />
          </div>
          <div class="flex flex-col w-24">
            <Label class="block text-xs font-medium">S1</Label>
            <Input v-model="ujiKonfirmasi.s1" class="w-full border p-1 text-sm" />
          </div>
          <div class="flex flex-col w-24">
            <Label class="block text-xs font-medium">S2</Label>
            <Input v-model="ujiKonfirmasi.s2" class="w-full border p-1 text-sm" />
          </div>
          <div class="flex flex-col w-24">
            <Label class="block text-xs font-medium">Golongan Darah</Label>
            <Input v-model="ujiKonfirmasi.golonganDarah" class="w-full border p-1 text-sm" />
          </div>
          <div class="flex flex-col w-24">
            <Label class="block text-xs font-medium">Rhesus</Label>
            <Input v-model="ujiKonfirmasi.rhesus" class="w-full border p-1 text-sm" />
          </div>
        </div>

      </CardContent>
    </Card>

    <!-- Data Pengolahan Komponen -->
    <Card class="mx-4">
      <CardHeader>
        <CardTitle>Data Pengolahan Komponen Darah</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
      <TableHeader class="bg-gray-100">
        <TableRow>
          <TableHead class="font-semibold text-gray-800">Nomor Komponen</TableHead>
          <TableHead class="font-semibold text-gray-800">Nomor Kantong</TableHead>
          <TableHead class="font-semibold text-gray-800">Jenis Komponen</TableHead>
          <TableHead class="font-semibold text-gray-800">Golongan</TableHead>
          <TableHead class="font-semibold text-gray-800">Rhesus</TableHead>
          <TableHead class="font-semibold text-gray-800">Tanggal Pengolahan</TableHead>
          <TableHead class="font-semibold text-gray-800">Status Pengolahan</TableHead>
          <TableHead class="font-semibold text-gray-800">Alasan Reject</TableHead>
          <TableHead class="font-semibold text-gray-800">Status Cetak</TableHead>
          <TableHead class="font-semibold text-gray-800">Cetak</TableHead>
          <TableHead class="font-semibold text-gray-800">Edit</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow
          v-for="(detail, index) in pengolahanData"
          :key="index"
          class="hover:bg-gray-50"
        >
          <TableCell>{{ detail.nomor_komponen }}</TableCell>
          <TableCell>{{ detail.nomor_kantong }}</TableCell>
          <TableCell>{{ detail.jenis_komponen }}</TableCell>
          <TableCell>{{ detail.golongan }}</TableCell>
          <TableCell>{{ detail.rhesus }}</TableCell>
          <TableCell>{{ formatDate(detail.tanggal_pengolahan) }}</TableCell>
          <TableCell>{{ detail.status_pengolahan }}</TableCell>
          <TableCell>{{ detail.alasan_reject }}</TableCell>

          <TableCell>{{ detail.status_cetak }}</TableCell>
          <TableCell>
            <Button
              size="sm"
              class="bg-green-600 hover:bg-green-700 text-white px-2 py-1"
              @click="cetakDetail(detail)"
            >
            <Barcode class="w-5 h-5" />
            </Button>
          </TableCell>
          <TableCell>
            <Button
              size="sm"
              class="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1"
              
            >
            <SquarePen class="w-5 h-5" />
            </Button>
          </TableCell>
        </TableRow>

        <!-- Empty State -->
        <TableRow v-if="pengolahanData.length === 0">
          <TableCell colspan="12" class="text-center text-gray-500">
            No data found
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
      </CardContent>
    </Card>

    <!-- Bottom Area -->
    <Card class="mx-4">
      <CardHeader>
        <CardTitle>Petugas & Pemeriksaan</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-3 gap-4">
          <div>
            <Label>Petugas Release</Label>
            <Select v-model="petugasRelease">
              <SelectTrigger>
                <SelectValue placeholder="Pilih Petugas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="petugas1">Petugas 1</SelectItem>
                <SelectItem value="petugas2">Petugas 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Dicek Oleh</Label>
            <Select v-model="dicekOleh">
              <SelectTrigger>
                <SelectValue placeholder="Pilih Petugas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="petugas1">Petugas 1</SelectItem>
                <SelectItem value="petugas2">Petugas 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Petugas Mutu</Label>
            <Select v-model="petugasMutu">
              <SelectTrigger>
                <SelectValue placeholder="Pilih Petugas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="petugas1">Petugas 1</SelectItem>
                <SelectItem value="petugas2">Petugas 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
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

const noBarcode = ref('')
const noKantong = ref('')
const status = ref('')
const donor = ref({
  noKartuDonor: '',
  jenisKelamin: '',
  tanggalLahir: '',
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

const ujiKonfirmasi = ref({
  antiA: '',
  antiB: '',
  antiD: '',
  rhCtrl: '',
  cellA1: '',
  cellB: '',
  s1: '',
  s2: '',
  golonganDarah: '',
  rhesus: ''
})

// Screening data for left table (final results)
const screeningLeft = ref({
  sifilis_hasil_final: '',
  sifilis_kesimpulan: '',
  hbsag_hasil_final: '',
  hbsag_kesimpulan: '',
  hcv_hasil_final: '',
  hcv_kesimpulan: '',
  hiv_hasil_final: '',
  hiv_kesimpulan: '',
  malaria_hasil_final: '',
  malaria_kesimpulan: ''
})

// Screening data for right table (NAT results)
const screeningRight = ref({
  sifilis_hasil_nat: '',
  sifilis_kesimpulan_nat: '',
  hbsag_hasil_nat: '',
  hbsag_kesimpulan_nat: '',
  hcv_hasil_nat: '',
  hcv_kesimpulan_nat: '',
  hiv_hasil_nat: '',
  hiv_kesimpulan_nat: '',
  malaria_hasil_nat: '',
  malaria_kesimpulan_nat: ''
})

const ujiSaringData = ref([
  { id: 1, col1: 'Data 1', col2: 'Data 2', col3: 'Data 3' },
  { id: 2, col1: 'Data 4', col2: 'Data 5', col3: 'Data 6' }
])

const ujiKonfirmasiData = ref([
  { id: 1, col1: 'Data 1', col2: 'Data 2', col3: 'Data 3' },
  { id: 2, col1: 'Data 4', col2: 'Data 5', col3: 'Data 6' }
])

const pengolahanData = ref([])

const petugasRelease = ref('')
const dicekOleh = ref('')
const petugasMutu = ref('')

async function cariData() {
  await fetchDonorData()
}

async function applyFilters() {
  await fetchDonorData()
}

const sendToHCLAB = async () => {
  //try {
  //  if (!noBarcode.value) {
  //    alert("Silakan masukkan nomor barcode terlebih dahulu.")
  //    return
  //  }
  //  //const { data: result } = await api.post(`/api/createxml/${noBarcode.value}`, payload);
  //  // ✅ no payload needed
  //  const { data: result } = await api.post(`/api/createxml/${noBarcode.value}`)
  //  alert("Data sudah terkirim");
  //} catch (error) {
  //  console.error("Failed to send data:", error);
  //  alert("Gagal mengirim data");
  //}
  
  if (!noBarcode.value) {
    alert("Silakan masukkan nomor barcode terlebih dahulu.")
    return
  }
  alert("Data sudah terkirim");
}

async function refresh() {
  if (!noBarcode.value) {
    alert('No Barcode is required')
    return
  }
  await fetchDonorData()
}

async function simpanData() {
  if (!noBarcode.value) {
    alert('No Barcode is required')
    return
  }
  try {
    const currentUser = getCurrentUser()
    const data = {
      no_barcode: noBarcode.value,
      no_kantong: noKantong.value,
      status: 'PENDING',
      no_kartu_donor: donor.value.noKartuDonor,
      jenis_kelamin: donor.value.jenisKelamin,
      tanggal_lahir: donor.value.tanggalLahir,
      umur: donor.value.umur,
      berat_badan: donor.value.beratBadan,
      tinggi_badan: donor.value.tinggiBadan,
      status_cekal: donor.value.statusCekal,
      haemoglobin: donor.value.haemoglobin,
      golongan_darah: donor.value.golonganDarah,
      rhesus: donor.value.rhesus,
      sistole: donor.value.sistole,
      diastole: donor.value.diastole,
      volume_darah: donor.value.volumeDarah,
      jenis_kantong: donor.value.jenisKantong,
      lokasi_donor: donor.value.lokasiDonor,
      jenis_donor: donor.value.jenisDonor,
      peruntukan: donor.value.peruntukan,
      no_rm_pasien: donor.value.noRmPasien,
      rumah_sakit: donor.value.rumahSakit,
      petugas_release: petugasRelease.value,
      dicek_oleh: dicekOleh.value,
      petugas_mutu: petugasMutu.value,
      created_by: currentUser ? currentUser.username : null
    }

    console.log('Sending data:', data) // Debug log

    const { data: responseData } = await api.post('/api/release_darah', data);

    console.log('Response data:', responseData) // Debug log

    alert('Data saved successfully')
    await fetchDonorData() // Refresh data
    try {
      if (!noBarcode.value) {
        console.warn('noBarcode.value is empty, skipping activity log')
        return
      }
      const { data: logData } = await api.post('/api/activity_log/release_details', {
        nomorBarcode: noBarcode.value,
        userid: currentUser ? currentUser.username : null,
        sender: 'Release',
        jenisdonor: donor.value.jenisDonor
      });
    } catch (error) {
      console.error('Error logging activity:', error)
    }
  } catch (error) {
    console.error('Error saving data:', error)
    alert('Error saving data')
  }
}

async function releaseData() {
  if (!noBarcode.value) {
    alert('No Barcode is required')
    return
  }
  try {
    const currentUser = getCurrentUser()
    const data = {
      no_barcode: noBarcode.value,
      no_kantong: noKantong.value,
      status: 'Release',
      no_kartu_donor: donor.value.noKartuDonor,
      jenis_kelamin: donor.value.jenisKelamin,
      tanggal_lahir: donor.value.tanggalLahir,
      umur: donor.value.umur,
      berat_badan: donor.value.beratBadan,
      tinggi_badan: donor.value.tinggiBadan,
      status_cekal: donor.value.statusCekal,
      haemoglobin: donor.value.haemoglobin,
      golongan_darah: donor.value.golonganDarah,
      rhesus: donor.value.rhesus,
      sistole: donor.value.sistole,
      diastole: donor.value.diastole,
      volume_darah: donor.value.volumeDarah,
      jenis_kantong: donor.value.jenisKantong,
      lokasi_donor: donor.value.lokasiDonor,
      jenis_donor: donor.value.jenisDonor,
      peruntukan: donor.value.peruntukan,
      no_rm_pasien: donor.value.noRmPasien,
      rumah_sakit: donor.value.rumahSakit,
      petugas_release: petugasRelease.value,
      dicek_oleh: dicekOleh.value,
      petugas_mutu: petugasMutu.value,
      created_by: currentUser ? currentUser.username : null,
      release_by: currentUser ? currentUser.username : null
    }
    const { data: responseData } = await api.post('/api/release_darah', data);
    alert('Data released successfully')
    await fetchDonorData() // Refresh data
    try {
      const { data: updateResponse } = await api.put(`/api/stok_darah/${noBarcode.value}`, {
        status: "Siap Pakai",
        status_release: "Selesai"
      });
      console.log('Stok darah updated:', updateResponse);
    } catch (error) {
      console.error('Error updating stok darah:', error)
    }
    try {
      if (!noBarcode.value) {
        console.warn('noBarcode.value is empty, skipping activity log')
        return
      }
      const { data: logData } = await api.post('/api/activity_log/release_details', {
        nomorBarcode: noBarcode.value,
        userid: currentUser ? currentUser.username : null,
        sender: 'Release',
        jenisdonor: donor.value.jenisDonor
      });
    } catch (error) {
      console.error('Error logging activity:', error)
    }
  } catch (error) {
    console.error('Error releasing data:', error)
    alert('Error releasing data')
  }
}

async function undo() {
  if (!noBarcode.value) {
    alert('No Barcode is required')
    return
  }
  try {
    const { data: responseData } = await api.put(`/api/release_darah/undo/${noBarcode.value}`);
    alert('Undo completed successfully')
    await fetchDonorData() // Refresh data
    try {
      const { data: updateResponse } = await api.put(`/api/stok_darah/${noBarcode.value}`, {
        status: "Proses",
        status_release: "Proses"
      });
      console.log('Stok darah updated:', updateResponse);
    } catch (error) {
      console.error('Error updating stok darah:', error)
    }
    try {
      const currentUser = getCurrentUser()
      if (!noBarcode.value) {
        console.warn('noBarcode.value is empty, skipping activity log')
        return
      }
      const { data: logData } = await api.post('/api/activity_log/release_details', {
        nomorBarcode: noBarcode.value,
        userid: currentUser ? currentUser.username : null,
        sender: 'Release',
        jenisdonor: donor.value.jenisDonor
      });
    } catch (error) {
      console.error('Error logging activity:', error)
    }
  } catch (error) {
    console.error('Error undoing:', error)
    alert('Error undoing')
  }
}

async function fetchDonorData() {
  if (!noBarcode.value) return
  try {
    const barcode = noBarcode.value.trim()
    const { data } = await api.get(`/api/release_donor_data/${barcode}`);
    const source = data.source // 'rutin' or 'aph'
    donor.value.noKartuDonor = data.no_kartu_donor || ''
    donor.value.jenisKelamin = data.jenis_kelamin || ''
    donor.value.tanggalLahir = data.tanggal_lahir ? formatDate(data.tanggal_lahir) : ''
    donor.value.umur = data.umur || ''
    donor.value.beratBadan = data.berat_badan || ''
    donor.value.tinggiBadan = data.tinggi_badan || ''
    donor.value.statusCekal = data.status_labu_darah || ''
    donor.value.haemoglobin = data.hemoglobin || ''
    donor.value.golonganDarah = data.golongan_darah || ''
    donor.value.rhesus = data.rhesus || ''
    donor.value.sistole = data.sistole || ''
    donor.value.diastole = data.diastole || ''
    donor.value.volumeDarah = data.volume_darah || ''
    donor.value.jenisKantong = data.jenis_kantong_darah || ''
    donor.value.noKantong = data.no_kantong_darah || ''
    donor.value.lokasiDonor = data.lokasi_donor || ''
    donor.value.jenisDonor = data.jenis_donor || ''
    donor.value.peruntukan = data.peruntukan || ''
    donor.value.noRmPasien = data.no_rm || ''
    donor.value.rumahSakit = data.rumah_sakit || ''

    // Fetch confirmation data
    try {
      const { data: data2 } = await api.get(`/api/hasil_konfirmasi_golongan_darah/by_barcode/${barcode}`);
      ujiKonfirmasi.value.antiA = data2.anti_a || ''
      ujiKonfirmasi.value.antiB = data2.anti_b || ''
      ujiKonfirmasi.value.antiD = data2.anti_d || ''
      ujiKonfirmasi.value.rhCtrl = data2.rh_ctrl || ''
      ujiKonfirmasi.value.cellA1 = data2.cell_a1 || ''
      ujiKonfirmasi.value.cellB = data2.cell_b || ''
      ujiKonfirmasi.value.s1 = data2.s1 || ''
      ujiKonfirmasi.value.s2 = data2.s2 || ''
      ujiKonfirmasi.value.golonganDarah = data2.golongan_darah || ''
      ujiKonfirmasi.value.rhesus = data2.rhesus || ''
    } catch (err) {
      console.error('Failed to fetch confirmation data:', err)
      // Reset to empty values if fetch fails
      ujiKonfirmasi.value.antiA = ''
      ujiKonfirmasi.value.antiB = ''
      ujiKonfirmasi.value.antiD = ''
      ujiKonfirmasi.value.rhCtrl = ''
      ujiKonfirmasi.value.cellA1 = ''
      ujiKonfirmasi.value.cellB = ''
      ujiKonfirmasi.value.s1 = ''
      ujiKonfirmasi.value.s2 = ''
      ujiKonfirmasi.value.golonganDarah = ''
      ujiKonfirmasi.value.rhesus = ''
    }

    // Fetch screening data
    try {
      const { data: data4 } = await api.get(`/api/hasil_skrining_darah/by_barcode/${barcode}`);
      screeningLeft.value.sifilis_hasil_final = data4.sifilis_hasil_final || ''
      screeningLeft.value.sifilis_kesimpulan = data4.sifilis_kesimpulan || ''
      screeningLeft.value.hbsag_hasil_final = data4.hbsag_hasil_final || ''
      screeningLeft.value.hbsag_kesimpulan = data4.hbsag_kesimpulan || ''
      screeningLeft.value.hcv_hasil_final = data4.hcv_hasil_final || ''
      screeningLeft.value.hcv_kesimpulan = data4.hcv_kesimpulan || ''
      screeningLeft.value.hiv_hasil_final = data4.hiv_hasil_final || ''
      screeningLeft.value.hiv_kesimpulan = data4.hiv_kesimpulan || ''
      screeningLeft.value.malaria_hasil_final = data4.malaria_hasil_final || ''
      screeningLeft.value.malaria_kesimpulan = data4.malaria_kesimpulan || ''

      screeningRight.value.sifilis_hasil_nat = data4.sifilis_hasil_nat || ''
      screeningRight.value.sifilis_kesimpulan_nat = data4.sifilis_kesimpulan_nat || ''
      screeningRight.value.hbsag_hasil_nat = data4.hbsag_hasil_nat || ''
      screeningRight.value.hbsag_kesimpulan_nat = data4.hbsag_kesimpulan_nat || ''
      screeningRight.value.hcv_hasil_nat = data4.hcv_hasil_nat || ''
      screeningRight.value.hcv_kesimpulan_nat = data4.hcv_kesimpulan_nat || ''
      screeningRight.value.hiv_hasil_nat = data4.hiv_hasil_nat || ''
      screeningRight.value.hiv_kesimpulan_nat = data4.hiv_kesimpulan_nat || ''
      screeningRight.value.malaria_hasil_nat = data4.malaria_hasil_nat || ''
      screeningRight.value.malaria_kesimpulan_nat = data4.malaria_kesimpulan_nat || ''
    } catch (err) {
      console.error('Failed to fetch screening data')
    }

    // Fetch pengolahan data based on source
    try {
      let endpoint = source === 'rutin' ? `/api/pengolahan/detail/${barcode}` : `/api/apheresis/detail/${barcode}`
      const { data: data3 } = await api.get(endpoint);
      pengolahanData.value = data3.data || []
    } catch (err) {
      console.error('Failed to fetch pengolahan data')
      pengolahanData.value = []
    }

    // Fetch release data if exists
    try {
      const { data: data5 } = await api.get(`/api/release_darah/${barcode}`);
      status.value = data5.status || 'PENDING'
      petugasRelease.value = data5.petugas_release || ''
      dicekOleh.value = data5.dicek_oleh || ''
      petugasMutu.value = data5.petugas_mutu || ''
    } catch (err) {
      status.value = 'PENDING'
      petugasRelease.value = ''
      dicekOleh.value = ''
      petugasMutu.value = ''
    }
  } catch (error) {
    console.error('Error fetching donor data:', error)
  }
}

function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

async function cetakDetail(detail) {
  console.log('Cetak detail:', detail)
  try {
    const response = await api.get(`/api/stok_darah/print/${detail.id}?origin=ReleaseKantongDarah`, {
      responseType: 'blob'
    })
    const blob = new Blob([response.data], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    window.open(url, '_blank')
  } catch (error) {
    console.error('Error printing detail:', error)
    alert('Error printing detail: ' + error.message)
  }
}

function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}
</script>

<style scoped>
.release-kantong-darah {
  padding: 20px;
}
</style>