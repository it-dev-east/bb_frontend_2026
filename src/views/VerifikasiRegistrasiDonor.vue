<template>
  <div class="flex flex-col h-full">
    <!-- 🔹 Top Action Bar (shadcn Button) -->
    <div class="flex gap-2 p-4 bg-white border-b sticky top-0 z-10">
    <Button @click="refreshData" class="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg">
      <RefreshCcw class="w-5 h-5" />
      Refresh
    </Button>

    <Button @click="tambah" class="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow">
      <Plus class="w-5 h-5" />
      Tambah
    </Button>

    <Button @click="cariDataRegistrasi" class="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg">
      <Search class="w-5 h-5" />
      Cari Data
    </Button>

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

    
<!-- 🔹 Tabs Section (shadcn-vue modern layout) -->
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
      <span
        v-if="form.kunjunganTerakhir && daysSinceLastVisit !== 'Hari ini'"
        class="text-sm text-gray-500 whitespace-nowrap"
      >
      ( {{ daysSinceLastVisit }} )
    </span>
    </div>
    <div v-else class="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-100">
      <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
      </svg>
      <span class="text-sm font-semibold text-blue-800 tracking-tight">{{ form.nomorRegistrasi }} - {{ form.namaDonor }}</span>
      <span
        v-if="form.kunjunganTerakhir && daysSinceLastVisit !== 'Hari ini'"
        class="text-sm text-gray-500 whitespace-nowrap"
      >
      ( {{ daysSinceLastVisit }} )
    </span>
    </div>
  </div>

  <!-- 🔸 Tabs Content -->
  <div class=" flex-1 p-4 overflow-y-auto space-y-4 ">

  <TabsContent value="Identitas" class="space-y-4">
  <div class="bg-white p-4 rounded-lg shadow">
    <!-- 🔹 Main 2-column layout -->
    <div class="flex flex-col lg:flex-row gap-6">
      
      <!-- LEFT: Title + Form (stacked) -->
      <div class="flex-1 space-y-4">
        <!-- Title -->
        <div>
          <h3 class="text-lg font-semibold text-gray-800">
            Verifikasi Registrasi Donor
          </h3>
          <p class="text-xs text-gray-500">
            Pastikan data identitas donor sesuai dengan dokumen resmi.
          </p>
        </div>

        <!-- Form fields -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="flex flex-col">
            <Label class="text-sm text-gray-600">Nomor Registrasi</Label>
            <Input v-model="form.nomorRegistrasi" readonly class="mt-1" />
          </div>

          <div class="flex flex-col">
            <Label class="text-sm text-gray-600">Tanggal Registrasi</Label>
            <Input
              type="datetime-local"
              v-model="form.tanggalRegistrasi"
              readonly
              class="mt-1"
            />
          </div>

          <div class="flex flex-col">
            <Label class="text-sm text-gray-600">No Kartu Donor</Label>
            <Input v-model="form.noKartuDonor" readonly class="mt-1" />
          </div>

          <div class="flex flex-col">
            <Label class="text-sm text-gray-600">Nama Donor</Label>
            <Input v-model="form.namaDonor" class="mt-1" />
          </div>

          <div class="flex flex-col">
            <Label class="text-sm text-gray-600">Jenis Kelamin</Label>
            <RadioGroup v-model="form.jenisKelamin" class="flex gap-6 mt-1">
              <div class="flex items-center space-x-2">
                <RadioGroupItem id="male" value="LAKI-LAKI" />
                <label for="male" class="text-sm">Laki-Laki</label>
              </div>
              <div class="flex items-center space-x-2">
                <RadioGroupItem id="female" value="PEREMPUAN" />
                <label for="female" class="text-sm">Perempuan</label>
              </div>
            </RadioGroup>
          </div>

          <div class="flex flex-col">
            <Label class="text-sm text-gray-600">Tanggal Lahir</Label>
            <Input type="date" v-model="form.tanggalLahir" class="mt-1" />
          </div>

          <div class="flex flex-col">
            <Label class="text-sm text-gray-600">Tempat Lahir</Label>
            <Input v-model="form.tempatLahir" class="mt-1" />
          </div>

          <div class="flex flex-col">
            <Label class="text-sm text-gray-600">Umur</Label>
            <Input v-model="form.umur" readonly class="mt-1" />
          </div>

          <div class="flex flex-col gap-1">
            <Label class="text-sm text-gray-600">Agama</Label>
            <Select v-model="form.agama">
              <SelectTrigger>
                <SelectValue placeholder="Pilih Agama" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Islam">Islam</SelectItem>
                <SelectItem value="Kristen">Kristen</SelectItem>
                <SelectItem value="Katolik">Katolik</SelectItem>
                <SelectItem value="Hindu">Hindu</SelectItem>
                <SelectItem value="Budha">Budha</SelectItem>
                <SelectItem value="Konghucu">Konghucu</SelectItem>
                <SelectItem value="Tidak tahu">Tidak tahu</SelectItem>
                <SelectItem value="Atheis">Atheis</SelectItem>
                <SelectItem value="Kepercayaan">Kepercayaan</SelectItem>
                <SelectItem value="Lainnya">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <!-- RIGHT: Photo panel -->
      <div class="w-full lg:w-64 shrink-0">
        <Label class="text-sm text-gray-600 mb-2 block">
          Foto Donor
        </Label>

        <div
          class="flex flex-col items-center rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4"
        >
          <!-- Preview -->
          <div
            class="w-40 h-40 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center shadow-inner"
          >
            <img
              v-if="form.photoUrl"
              :src="form.photoUrl"
              alt="Foto pasien"
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="flex flex-col items-center justify-center text-gray-400 text-xs gap-1"
            >
              <User class="w-8 h-8" />
              <span>Tidak ada foto</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="mt-3 flex flex-col gap-2 w-full">
            <Button
              type="button"
              class="w-full justify-center text-sm"
              @click="onChoosePhoto"
            >
              <Upload class="w-4 h-4 mr-2" />
              Upload Foto
            </Button>

            <p class="mt-1 text-[11px] text-gray-400 text-center leading-snug">
              JPG/PNG, maks 2 MB. Gunakan foto close-up orientasi potret.
            </p>
          </div>

          <input
            ref="fileInputRef"
            type="file"
            accept="image/*"
            class="hidden"
            @change="onPhotoSelected"
          />
        </div>
      </div>
    </div>
  </div>
</TabsContent>



    <!-- 🏠 Kontak & Alamat -->
    <TabsContent value="Alamat" class="space-y-4">
      <div class="bg-white p-4 rounded-lg shadow space-y-3">
        <h3 class="text-lg font-semibold text-gray-800">Informasi Alamat</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  
          <!-- 🔹 Alamat KTP -->
          <div class="flex flex-col md:col-span-2 lg:col-span-2">
            <Label class="text-sm text-gray-600">Alamat KTP</Label>
            <Textarea v-model="form.alamatKTP" rows="1" class="mt-1 resize-none" />
          </div>
          <!-- 🔹 RT & RW -->
          <div class="flex gap-4 md:col-span-2 lg:col-span-1">
            <div class="flex-1">
              <Label class="text-sm text-gray-600">RT</Label>
              <Input v-model="form.rt" class="mt-1" />
            </div>
            <div class="flex-1">
              <Label class="text-sm text-gray-600">RW</Label>
              <Input v-model="form.rw" class="mt-1" />
            </div>
          </div>

          <!-- 🔹 Kelurahan -->
          <div class="flex flex-col">
            <Label class="text-sm text-gray-600">Kelurahan</Label>
            <Input v-model="form.kelurahan" class="mt-2" />
          </div>

          <!-- 🔹 Kecamatan -->
          <div class="flex flex-col">
            <Label class="text-sm text-gray-600">Kecamatan</Label>
            <Input v-model="form.kecamatan" class="mt-2" />
          </div>

          <!-- 🔹 Kota / Kabupaten -->
          <div class="flex flex-col">
            <Label class="text-sm text-gray-600">Kota / Kabupaten</Label>
            <Input v-model="form.kotaKabupaten" class="mt-1" />
          </div>

          <!-- 🔹 Provinsi -->
          <div class="flex flex-col">
            <Label class="text-sm text-gray-600">Provinsi</Label>
            <Input v-model="form.propinsi" class="mt-1" />
          </div>

          <!-- 🔹 Kewarganegaraan -->
          <div class="flex flex-col gap-1">
            <Label class="text-sm text-gray-600">Kewarganegaraan</Label>
            <Select v-model="form.kewarganegaraan" class="mt-1">
              <SelectTrigger>
                <SelectValue placeholder="Pilih Kewarganegaraan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="WNI">WNI</SelectItem>
                <SelectItem value="WNA">WNA</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- 🔹 Negara -->
          <div class="flex flex-col">
            <Label class="text-sm text-gray-600">Negara</Label>
            <Input v-model="form.negara" class="mt-1" />
          </div>

        </div>
      </div>
    </TabsContent>


    <!-- 💉 Donasi -->
    <TabsContent value="Data Donor" class="space-y-4">
      <div class="bg-white p-4 rounded-lg shadow space-y-3">
        <h3 class="text-lg font-semibold text-gray-800">Informasi Data Donor</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          <!-- 🔹 No KTP -->
          <div class="flex flex-col">
            <Label class="text-sm text-gray-600">No KTP</Label>
            <Input v-model="form.noKTP" class="mt-1" />
          </div>

          <!-- 🔹 No HP -->
          <div class="flex flex-col">
            <Label class="text-sm text-gray-600">No HP</Label>
            <Input v-model="form.noHP" class="mt-1" />
          </div>

          <!-- 🔹 Pekerjaan -->
          <div class="flex flex-col">
            <Label class="text-sm text-gray-600">Pekerjaan</Label>
            <Input v-model="form.pekerjaan" class="mt-1" />
          </div>

          <div class="flex flex-col">
            <Label class="text-sm text-gray-600">Tanggal Donor Terakhir</Label>
            <Input type="date" v-model="form.kunjunganTerakhir" class="mt-1" />
          </div>

          <div class="flex flex-col gap-1">
            <Label class="text-sm text-gray-600">Golongan Darah</Label>
            <Select v-model="form.golonganDarah">
              <SelectTrigger>
                <SelectValue placeholder="Pilih Golongan Darah" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="B">B</SelectItem>
                <SelectItem value="AB">AB</SelectItem>
                <SelectItem value="O">O</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="flex flex-col gap-1">
            <Label class="text-sm text-gray-600">Jenis Donor</Label>
            <Select v-model="form.donorType">
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

        </div>
      </div>
    </TabsContent>

    <!-- ⚙️ Status -->
    <TabsContent value="Status" class="space-y-4">
      <div class="bg-white p-4 rounded-lg shadow space-y-3">
        <h3 class="text-lg font-semibold text-gray-800">Status Donor</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

          <!-- 🟢 Status Cekal -->
          <div class="flex flex-col gap-1">
            <Label for="statusCekal" class="text-sm text-gray-600">Status Cekal</Label>
            <RadioGroup v-model="form.statusCekal" class="flex gap-4 mt-1">
              <div class="flex items-center gap-1">
                <RadioGroupItem id="diterima" value="Diterima" />
                <Label for="diterima" class="cursor-pointer">Diterima</Label>
              </div>
              <div class="flex items-center gap-1">
                <RadioGroupItem id="ditolak" value="Ditolak" />
                <Label for="ditolak" class="cursor-pointer">Ditolak</Label>
              </div>
            </RadioGroup>
          </div>
          <!-- 🟢 Alasan Cekal -->
          <div class="flex flex-col gap-1">
            <Label for="alasanCekal" class="text-sm text-gray-600">Alasan Cekal</Label>
            <Select v-model="form.alasanCekal">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Pilih alasan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Diterima">
                  
                </SelectItem>
                <SelectItem value="Syarat Kunjungan Tidak Terpenuhi">
                  Syarat Kunjungan Tidak Terpenuhi
                </SelectItem>
                <SelectItem value="Syarat Usia Tidak Terpenuhi">
                  Syarat Usia Tidak Terpenuhi
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="flex flex-col md:col-span-2">
            <Label class="text-sm text-gray-600">Keterangan</Label>
            <Textarea v-model="form.keterangan" rows="2" class="mt-1" />
          </div>

        </div>
      </div>
    </TabsContent>

  </div>
</Tabs>




<!-- 🔹 Bottom: Data Grid (Reg Date) -->
<Card class="m-4 p-4 shadow-md border rounded-2xl bg-background">    <!-- 🔹 Header: Title + Filters -->
  <CardHeader
    class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b px-2 py-2"
  >
  <!-- 🔹 Title + Filters Row -->
    <!-- Title -->
    <div>
      <h3 class="text-xl font-semibold text-foreground tracking-tight">
        Daftar Donor
      </h3>
      <p class="text-sm text-muted-foreground">
        Daftar Donor untuk Verifikasi Registrasi
      </p>
    </div>


    <!-- 🔎 Filters (Right-Aligned) -->
    <div class="flex flex-wrap items-center gap-3">

      <!-- Search by Date -->
      <div class="flex items-center gap-2">
        <input
          :value="searchDate"
          @input="searchDate = $event.target.value"
          @change="applyFilter"
          type="date"
          class="border border-gray-300 rounded-lg px-3 py-2 w-40 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <!-- Search by KTP -->
      <div class="flex items-center gap-2">
        <input
          v-model="searchKtp"
          @keyup.enter="applyFilters"
          type="text"
          placeholder="Cari KTP..."
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

  <!-- Patients Main Table -->
  <CardContent class="p-0">
  <Table >
    <TableHeader class="bg-gray-100">
      <TableRow>
        <TableHead class="font-semibold text-gray-800">KTP</TableHead>
        <TableHead class="font-semibold text-gray-800">No Kartu Donor</TableHead>
        <TableHead class="font-semibold text-gray-800">Nama</TableHead>
        <TableHead class="font-semibold text-gray-800">No Registrasi</TableHead>
        <TableHead class="font-semibold text-gray-800">Tanggal Registrasi</TableHead>
        <TableHead class="font-semibold text-gray-800">Status</TableHead>
        <TableHead class="font-semibold text-gray-800">Action</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow
        v-for="(patient, index) in mainPatients"
        :key="patient.id"
        :class="index % 2 === 0 ? 'bg-white' : 'bg-blue-50'"
      >
        <TableCell>{{ patient.ktp }}</TableCell>
        <TableCell>{{ patient.donor_card_no }}</TableCell>
        <TableCell>{{ patient.full_name }}</TableCell>
        <TableCell>{{ patient.reg_no }}</TableCell>
        <TableCell>{{ formatDate(patient.reg_date) }}</TableCell>
        <TableCell>
          <span
            class="px-3 py-1 rounded-full text-sm font-medium inline-block text-center w-40"
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
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 flex items-center gap-2 rounded-lg"
              @click="selectPatient(patient, false)"
            > 
             
              Pilih
            </Button>
        </TableCell>

      </TableRow>

      <TableRow v-if="mainPatients.length === 0">
        <TableCell colspan="7" class="text-center text-gray-500">
          Donor tidak ditemukan
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
  </CardContent>


  <!-- Pagination -->
  <CardFooter
  class="flex flex-col sm:flex-row justify-between items-center gap-3 py-4 px-6 border-t bg-muted/30"
  >
    <span class="font-medium text-muted-foreground text-sm">
      Halaman {{ mainCurrentPage }}{{ mainTotalPages > 0 ? ' dari ' + mainTotalPages : '' }}
    </span>
    
    <div class="flex items-center gap-2">
      <Button
        class="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 rounded-lg px-4 py-2 transition-colors"
        @click="mainPrevPage"
        :disabled="mainCurrentPage === 1"
      >
        Previous
      </Button>    
      <Button
        class="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 rounded-lg px-4 py-2 transition-colors"
        @click="mainNextPage"
        :disabled="mainCurrentPage === mainTotalPages"
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
      <!-- Search Inputs -->
      <div class="grid grid-cols-2 gap-4 mb-4">
        <Input type="date" v-model="searchPlannedDate" @change="searchPatients" placeholder="Tanggal Rencana Donasi" />
        <Input v-model="searchKtp" @keyup.enter="searchPatients" placeholder="KTP" />
        <Input v-model="searchDonorCard" @keyup.enter="searchPatients" placeholder="No Kartu Donor" />
        <Input v-model="searchNama" @keyup.enter="searchPatients"placeholder="Nama" />
        <Input v-model="searchRegNo" @keyup.enter="searchPatients" placeholder="No Registrasi" />
      </div>

      <Button variant="default" class="mb-4" @click="searchPatients">
        Cari
      </Button>

      <!-- Patients Search Table -->
      <ScrollArea class="max-h-96">
        <Table>
          <TableHeader class="bg-gray-100">
            <TableRow>
              <TableHead class="font-semibold text-gray-800">KTP</TableHead>
              <TableHead class="font-semibold text-gray-800">No Kartu Donor</TableHead>
              <TableHead class="font-semibold text-gray-800">Nama</TableHead>
              <TableHead class="font-semibold text-gray-800">No Registrasi</TableHead>
              <TableHead class="font-semibold text-gray-800">Tanggal Rencana Donasi</TableHead>
              <TableHead class="font-semibold text-gray-800">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
            v-for="(patient, index) in patients"
              :key="patient.id"
              :class="index % 2 === 0 ? 'bg-white' : 'bg-blue-100'"
            >

              <TableCell>{{ patient.ktp }}</TableCell>
              <TableCell>{{ patient.donor_card_no }}</TableCell>
              <TableCell>{{ patient.full_name }}</TableCell>
              <TableCell>{{ patient.reg_no }}</TableCell>
              <TableCell>{{ formatDate(patient.planned_donation_date) }}</TableCell>
              <TableCell class="text-center">
                <Button
                  size="sm"
                  class="bg-green-600 hover:bg-green-700 text-white shadow-sm flex items-center justify-center gap-1 rounded-lg mx-auto"
                  @click="selectPatient(patient, true)"
                >
                  Pilih
                </Button>
              </TableCell>
            </TableRow>

            <TableRow v-if="patients.length === 0">
              <TableCell colspan="6" class="text-center text-gray-500">
                No patients found
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ScrollArea>

      <!-- Pagination -->
      <div class="flex justify-between items-center mt-4">
        <Button
          class="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 rounded-lg px-4 py-2 transition-colors"
          @click="prevPage"
          :disabled="currentPage === 1"
        >
          Previous
        </Button>

        <span class="font-medium text-gray-700">
          Page Page {{ currentPage }} of {{ totalPages }}
        </span>

        <Button
          class="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 rounded-lg px-4 py-2 transition-colors"
          @click="nextPage"
          :disabled="currentPage === totalPages"
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
import { ref, computed, onMounted, inject, watch } from "vue";

import api from "../lib/axios.js";
//shadcnvue
import { Button } from "@/components/ui/button";
import { RefreshCcw, Plus, Search, Undo2, Save, Unlock, User, Upload } from "lucide-vue-next";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
//import { FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toLocalDatetimeInputValue } from '../lib/dateutils.js';

const changeView = inject('changeView');

const tabs = ["Identitas", "Data Donor", "Alamat", "Status"];
const activeTab = ref("Identitas");



const form = ref({
  tanggalRegistrasi: "",
  nomorRegistrasi: "",
  noKartuDonor: "",
  namaDonor: "",
  jenisKelamin: "LAKI-LAKI",
  tempatLahir: "",
  tanggalLahir: "",
  umur: "",
  kunjunganTerakhir: "",
  kewarganegaraan: "WNI",
  negara: "INDONESIA",
  noKTP: "",
  agama: "",
  pekerjaan: "",
  golonganDarah: "A",
  donorType: "",
  noHP: "",
  catatan: "",
  alamatKTP: "",
  rt: "",
  rw: "",
  propinsi: "",
  kotaKabupaten: "",
  kecamatan: "",
  kelurahan: "",
  statusCekal: "Diterima",
  alasanCekal: "Diterima",

  // NEW: photo fields
  photoId: null,
  photoUrl: "",
});

const fileInputRef = ref(null);

const daysSinceLastVisit = computed(() => {
  const lastVisit = form.value.kunjunganTerakhir;
  if (!lastVisit) return "";
  const last = new Date(lastVisit);
  const now = new Date();
  const diffTime = Math.abs(now - last);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 0 ? "Hari ini" : `${diffDays} hari lalu`;
});

// Modal related
const showModal = ref(false);
const patients = ref([]);
const searchKtp = ref("");
const searchDonorCard = ref("");
const searchNama = ref("");
const searchRegNo = ref("");
const searchPlannedDate = ref("");
const searchDate = ref(new Date().toISOString().split('T')[0]);
const currentPage = ref(1);
const total = ref(0);
const limit = ref(8);

// Main table related
const mainPatients = ref([]);
const mainCurrentPage = ref(1);
const mainTotal = ref(0);
const mainLimit = ref(5);
const filterStatus = ref("");

const totalPages = computed(() => Math.ceil(total.value / limit.value));

const mainTotalPages = computed(() => Math.ceil(mainTotal.value / mainLimit.value));

// Helper function to format date to local yyyy-MM-dd string
function toLocalDateString(date) {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d)) return '';
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Helper function to calculate Y M D difference
function calculateAge(regDate, birthDate) {
  let years = regDate.getFullYear() - birthDate.getFullYear();
  let months = regDate.getMonth() - birthDate.getMonth();
  let days = regDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    // ambil jumlah hari di bulan sebelumnya
    const prevMonth = new Date(regDate.getFullYear(), regDate.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}
// Auto-calc umur when tanggalRegistrasi / tanggalLahir changes
watch(
  () => [form.value.tanggalRegistrasi, form.value.tanggalLahir],
  ([regDate, birthDate]) => {
    if (!regDate || !birthDate) {
      form.value.umur = "";
      return;
    }

    // Normalize both values using the helper
    const reg = new Date(regDate);
    const birth = new Date(birthDate);

    if (isNaN(reg) || isNaN(birth)) {
      form.value.umur = "";
      return;
    }

    // Convert to consistent local datetime strings (for display)
    form.value.tanggalRegistrasi = toLocalDatetimeInputValue(reg);
    // For date input, use local date string
    form.value.tanggalLahir = toLocalDateString(birth);

    // Use pure Date objects for age calculation
    const { years, months, days } = calculateAge(reg, birth);

    form.value.umur =
      (years > 0 ? `${years} Tahun ` : "") +
      (months > 0 ? `${months} Bulan ` : "") +
      (days > 0 ? `${days} Hari` : "");

    //console.log('Umur:', years, months, days);
  },
  { immediate: true }
);

function tambah() { changeView('registrasi'); }

function onChoosePhoto() {
  if (!form.value.noKTP) {
    alert("Silakan isi / pilih No KTP terlebih dahulu sebelum upload foto.");
    return;
  }
  // trigger the hidden file input
  fileInputRef.value?.click();
}

async function onPhotoSelected(event) {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const formData = new FormData();
    // pid is KTP, as required by backend handle_patient_photo_upload
    formData.append("pid", form.value.noKTP);
    formData.append("photo", file);

    const res = await api.post("/api/patient-photo", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Set photo id
    form.value.photoId = res.data.photo_id || null;

    // Build absolute URL from API baseURL + public_url returned by backend
    const baseURL = (api.defaults?.baseURL || "").replace(/\/$/, "");
    form.value.photoUrl = baseURL + res.data.photo_url;

    alert("Foto berhasil diupload!");
  } catch (err) {
    console.error("Error uploading photo:", err);
    alert("Gagal mengupload foto");
  } finally {
    // Reset the file input so selecting the same file again will still trigger change
    if (fileInputRef.value) {
      fileInputRef.value.value = "";
    }
  }
}

function cariDataRegistrasi() {
  showModal.value = true;
  searchPlannedDate.value = new Date().toISOString().split('T')[0];
  currentPage.value = 1;
  fetchPatients(1);
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
async function undo() {
  const regno = form.value.nomorRegistrasi;
  if (!regno) {
    alert('Silahkan pilih data donor terlebih dahulu');
    return;
  }
  try {
    const updateData = {
      regno: form.value.nomorRegistrasi,
      status: 'Registrasi Donor',
      status_cekal: 'Diterima',
      release_by: null
    };
    const { data } = await api.put('/api/patients', updateData);
    // console.log('Patient status updated:', data);
    alert('Status berhasil diundo ke Registrasi Donor');
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
      menu: 'Verifikasi Registrasi Donor'
    })
    fetchMainPatients(mainCurrentPage.value);
    // Refresh form data with current record
    await selectPatient({ reg_no: form.value.nomorRegistrasi }, false);
  } catch (err) {
    console.error('Error updating patient status:', err);
    alert('Gagal mengundo status');
  }
}
async function simpanData() {
  const regno = form.value.nomorRegistrasi;
  if (!regno) {
    alert('Silahkan pilih data donor terlebih dahulu');
    return;
  }
  try {
    const updateData = {
      reg_date: form.value.tanggalRegistrasi ? new Date(form.value.tanggalRegistrasi).toISOString() : null,
      regno: form.value.nomorRegistrasi,
      donor_card_no: form.value.noKartuDonor,
      full_name: form.value.namaDonor,
      gender: form.value.jenisKelamin,
      birth_place: form.value.tempatLahir,
      // `date` field → send only "YYYY-MM-DD"
      birth_date: form.value.tanggalLahir ? form.value.tanggalLahir.split("T")[0] : null,
      age: form.value.umur || null,
      nationality: form.value.kewarganegaraan,
      country: form.value.negara,
      ktp: form.value.noKTP,
      religion: form.value.agama,
      occupation: form.value.pekerjaan,
      blood_type: form.value.golonganDarah,
      donor_type: form.value.donorType,
      phone: form.value.noHP,
      note: form.value.catatan,
      address_ktp: form.value.alamatKTP,
      rt: form.value.rt,
      rw: form.value.rw,
      province: form.value.propinsi,
      city: form.value.kotaKabupaten,
      subdistrict: form.value.kecamatan,
      district: form.value.kelurahan,
      status_cekal: form.value.statusCekal,
      alasan_cekal: form.value.alasanCekal,
      last_donation_date: form.value.kunjunganTerakhir ? form.value.kunjunganTerakhir.split("T")[0] : null
    };
    if (form.value.statusCekal === "Ditolak") {
      updateData.status = "Ditolak";
    }
    const { data } = await api.put('/api/patients', updateData);
    // console.log('Patient updated:', data);
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
      menu: 'Verifikasi Registrasi Donor'
    })
    fetchMainPatients(mainCurrentPage.value);
  } catch (err) {
    console.error('Error updating patient:', err);
    alert('Gagal menyimpan data');
  }
}
async function releaseData() {
  const regno = form.value.nomorRegistrasi;
  if (!regno) {
    alert('Silahkan pilih data donor terlebih dahulu');
    return;
  }
  try {
    const updateData = {
      regno: form.value.nomorRegistrasi,
      reg_date: form.value.tanggalRegistrasi ? new Date(form.value.tanggalRegistrasi).toISOString() : null,
      donor_card_no: form.value.noKartuDonor,
      full_name: form.value.namaDonor,
      gender: form.value.jenisKelamin,
      birth_place: form.value.tempatLahir,
      // `date` field → send only "YYYY-MM-DD"
      birth_date: form.value.tanggalLahir ? form.value.tanggalLahir.split("T")[0] : null,
      age: form.value.umur || null,
      nationality: form.value.kewarganegaraan,
      country: form.value.negara,
      ktp: form.value.noKTP,
      religion: form.value.agama,
      occupation: form.value.pekerjaan,
      blood_type: form.value.golonganDarah,
      donor_type: form.value.donorType,
      phone: form.value.noHP,
      note: form.value.catatan,
      address_ktp: form.value.alamatKTP,
      rt: form.value.rt,
      rw: form.value.rw,
      province: form.value.propinsi,
      city: form.value.kotaKabupaten,
      subdistrict: form.value.kecamatan,
      district: form.value.kelurahan,
      status_cekal: form.value.statusCekal,
      alasan_cekal: form.value.alasanCekal,
      last_donation_date: form.value.kunjunganTerakhir ? form.value.kunjunganTerakhir.split("T")[0] : null,
      status: form.value.statusCekal === "Ditolak" ? "Ditolak" : 'Periksa HB'
    };
    const { data } = await api.put('/api/patients', updateData);
    // console.log('Patient updated:', data);
    // Now insert/update master_donor
    const masterDonorData = {
      no_kartu_donor: form.value.noKartuDonor,
      nama_donor: form.value.namaDonor,
      nik: form.value.noKTP,
      tanggal_donasi: null,
      tempat_donasi: null, // Not available in form
      jk: form.value.jenisKelamin === 'LAKI-LAKI' ? 'L' : 'P',
      agama: form.value.agama,
      tempat_lahir: form.value.tempatLahir,
      tanggal_lahir: form.value.tanggalLahir ? form.value.tanggalLahir.split("T")[0] : null,
      berat_badan: null, // Not available
      tinggi_badan: null, // Not available
      telepon: form.value.noHP,
      goldar: form.value.golonganDarah,
      rhesus: null, // Not available
      pekerjaan: form.value.pekerjaan,
      alamat: form.value.alamatKTP,
      rt: form.value.rt,
      rw: form.value.rw,
      provinsi: form.value.propinsi,
      kota: form.value.kotaKabupaten,
      kecamatan: form.value.kecamatan,
      kelurahan: form.value.kelurahan,
      kewarganegaraan: form.value.kewarganegaraan,
      negara: form.value.negara,
      donor_type: form.value.donorType,
      created_by: 'system'
    };
    const { data: masterData } = await api.post('/api/master_donor', masterDonorData);
    console.log('Master donor updated:', masterData);
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
      menu: 'Verifikasi Registrasi Donor'
    })
    fetchMainPatients(mainCurrentPage.value);
  } catch (err) {
    console.error('Error:', err);
    alert('Gagal merelease data');
  }
}
function refreshData() { fetchMainPatients(mainCurrentPage.value); }

function applyFilters() {
  mainCurrentPage.value = 1;
  fetchMainPatients(1);
}

function clearFilters() {
  searchKtp.value = '';
  searchNama.value = '';
  //searchDate.value = '';
  filterStatus.value = '';
  mainCurrentPage.value = 1;
  fetchMainPatients(1);
}

// Modal functions
async function fetchPatients(page = 1) {
  try {
    currentPage.value = page;
    const params = {
      page: page.toString(),
      limit: limit.value.toString()
    };
    if (searchPlannedDate.value) params.planned_donation_date = searchPlannedDate.value;
    if (searchKtp.value) params.ktp = searchKtp.value;
    if (searchDonorCard.value) params.donor_card_no = searchDonorCard.value;
    if (searchNama.value) params.full_name = searchNama.value;
    if (searchRegNo.value) params.reg_no = searchRegNo.value;
    const { data } = await api.get('/api/patients', { params });
    patients.value = data.data;
    total.value = data.total;
  } catch (err) {
    console.error('Error fetching patients:', err);
  }
}

function searchPatients() {
  currentPage.value = 1;
  fetchPatients(1);
}

async function selectPatient(patient, fromModal = false) {
  try {
    // Helper function
    function toLocalDateTimeString(dateStr) {
      const d = new Date(dateStr);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    // Fetch full patient data
    const { data: fullPatient } = await api.get(`/api/patients/${patient.reg_no}`);
    // Populate form with full patient data
    const regDateObj = fullPatient.reg_date ? new Date(fullPatient.reg_date) : null;
    const birthDateObj = fullPatient.birth_date ? new Date(fullPatient.birth_date) : null;

    //form.value.tanggalRegistrasi = fullPatient.reg_date ? toLocalDateTimeString(fullPatient.reg_date) : '';
    form.value.tanggalRegistrasi = regDateObj ? toLocalDateTimeString(regDateObj) : '';
    form.value.nomorRegistrasi = fullPatient.reg_no || '';
    form.value.noKartuDonor = fullPatient.donor_card_no || '';
    form.value.namaDonor = fullPatient.full_name || '';
    form.value.jenisKelamin = fullPatient.gender || '';
    form.value.tempatLahir = fullPatient.birth_place || '';
    form.value.tanggalLahir = toLocalDateString(fullPatient.birth_date);
    //form.value.umur = fullPatient.age ? fullPatient.age.toString() : '';
    if (!fullPatient.age && regDateObj && birthDateObj && !isNaN(regDateObj) && !isNaN(birthDateObj)) {
      const { years, months, days } = calculateAge(regDateObj, birthDateObj);
      form.value.umur =
        (years > 0 ? `${years} Tahun ` : '') +
        (months > 0 ? `${months} Bulan ` : '') +
        (days > 0 ? `${days} Hari` : '');
    } else {
      form.value.umur = fullPatient.age ? fullPatient.age.toString() : '';
    }
    form.value.agama = fullPatient.religion || '';
    form.value.pekerjaan = fullPatient.occupation || '';
    form.value.golonganDarah = fullPatient.blood_type || '';
    form.value.donorType = fullPatient.donor_type || '';
    form.value.noHP = fullPatient.phone || '';
    form.value.catatan = fullPatient.note || '';
    form.value.alamatKTP = fullPatient.address_ktp || '';
    form.value.rt = fullPatient.rt || '';
    form.value.rw = fullPatient.rw || '';
    form.value.propinsi = fullPatient.province || '';
    form.value.kotaKabupaten = fullPatient.city || '';
    form.value.kecamatan = fullPatient.subdistrict || '';
    form.value.kelurahan = fullPatient.district || '';
    form.value.kewarganegaraan = fullPatient.nationality || '';
    form.value.negara = fullPatient.country || '';
    form.value.noKTP = fullPatient.ktp || '';
    form.value.kunjunganTerakhir = toLocalDateString(fullPatient.last_donation_date);
    form.value.statusCekal = fullPatient.status_cekal || 'Diterima'; // Use stored value or default to accepted
    form.value.alasanCekal = fullPatient.alasan_cekal || 'Syarat Kunjungan Tidak Terpenuhi'; // Use stored value or default

    // NEW: photo from backend
    form.value.photoId = fullPatient.photo_id || null;

    if (fullPatient.photo_url) {
      // fullPatient.photo_url is like "/media/patient_photos/9098766/....jpg"
      // Build an absolute URL using the axios baseURL
      const baseURL = (api.defaults?.baseURL || "").replace(/\/$/, "");
      form.value.photoUrl = baseURL + fullPatient.photo_url;
    } else {
      form.value.photoUrl = "";
    }

    console.log(form.value.tanggalRegistrasi);
    // Update database status to 'Registrasi Donor' only if from modal
    if (fromModal) {
      await api.put(`/api/patients/${patient.reg_no}/status`, { status: 'Registrasi Donor' });
      await api.put('/api/patients', {
        regno: patient.reg_no,
        reg_date: new Date().toISOString()
      });
    }

    console.log('Status updated successfully');
    // Update the local patient data to reflect the new status
    patient.status = 'Registrasi Donor';
    if (fromModal) {
      // Update the form with the new reg_date
      form.value.tanggalRegistrasi = toLocalDateTimeString(new Date());
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
        note: 'Ambil Data Donor',
        userid: userid,
        pid: patient.donor_card_no,
        regno: patient.reg_no,
        menu: 'Verifikasi Registrasi Donor'
      })
    }
    fetchMainPatients(); // Refresh main table
    closeModal();
  } catch (err) {
    console.error('Error:', err);
    // Still update local data optimistically
    patient.status = 'Registrasi Donor';
    fetchMainPatients(); // Refresh main table even on error
    closeModal(); // Still close modal even if update fails
  }
}

function closeModal() {
  showModal.value = false;
}

function mainPrevPage() {
  if (mainCurrentPage.value > 1) {
    fetchMainPatients(mainCurrentPage.value - 1);
  }
}

function mainNextPage() {
  if (mainCurrentPage.value < mainTotalPages.value) {
    fetchMainPatients(mainCurrentPage.value + 1);
  }
}

// Fetch patients for main table
async function fetchMainPatients(page = 1) {
  try {
    mainCurrentPage.value = page;
    const params = {
      page: page.toString(),
      limit: mainLimit.value.toString(),
      status: filterStatus.value || 'not_null'
    };
    if (searchKtp.value) params.ktp = searchKtp.value;
    if (searchNama.value) params.full_name = searchNama.value;
    if (searchDate.value) params.reg_date = searchDate.value;
    
    //console.log(" Sending request with params:", params);

    const { data } = await api.get('/api/patients', { params });
    console.log(" API response:", data.data);

    mainPatients.value = data.data || [];
    mainTotal.value = data.total;
  } catch (err) {
    //console.error('Error fetching main patients:', err);
  }
}

// Load main patients on component mount
onMounted(() => {
  // api.get('http://localhost:8000/test')
  // .then(r => console.log(r.data))
  // .catch(e => console.error(e));

  fetchMainPatients(1);
});

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

function getStatusColor(status) {
  const colors = {
    'Registrasi Donor': '#FCFCFF',
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

</script>

