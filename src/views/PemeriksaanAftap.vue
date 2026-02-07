<template>
  <div class="flex flex-col h-full ">
    <!-- 🔹 Top Action Bar (shadcn Button) -->
    <div class="flex gap-2 p-4 bg-white border-b sticky top-0 z-10">
      <Button @click="refreshData" class="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg">
        <RefreshCcw class="w-5 h-5" />
        Refresh
      </Button>

      <!--
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

      <Button @click="printBarcode" class="flex items-center gap-2 bg-indigo-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
        <Barcode class="w-5 h-5" />
        Cetak Barcode
      </Button>
    </div>

  <!-- 🩸 Shadcn-Vue Tabs Layout -->
  <Tabs v-model="activeTab" default-value="Identitas" class="flex-1 flex flex-col overflow-y-auto bg-white">

  <!-- 🔹 Tabs Navigation -->
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
    <div v-if="form.statusLabuDarah === 'Ditolak'" class="flex items-center gap-2 px-3 py-2 bg-rose-50 rounded-lg border border-rose-100">
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

  <!-- 🧑 Identitas Donor -->
  <TabsContent value="Identitas" class="space-y-4">
    <div class="bg-white p-4 rounded-lg shadow space-y-3">
      <h3 class="text-lg font-semibold text-gray-800">Pemeriksaan Aftap</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Nomor Registrasi</Label>
          <Input v-model="form.nomorRegistrasi" readonly/>
        </div>

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Tanggal Registrasi</Label>
          <Input type="datetime-local" v-model="form.tanggalRegistrasi" readonly/>
        </div>

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">No Kartu Donor</Label>
          <Input v-model="form.noKartuDonor" readonly/>
        </div>

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Nama Donor</Label>
          <Input v-model="form.namaDonor" readonly/>
        </div>

        <div class="flex flex-col space-y-1">
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

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Tanggal Lahir</Label>
          <Input type="date" v-model="form.tanggalLahir" readonly/>
        </div>

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Tempat Lahir</Label>
          <Input v-model="form.tempatLahir" readonly/>
        </div>

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Umur</Label>
          <Input v-model="form.umur" readonly/>
        </div>

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Alamat</Label>
          <Input v-model="form.alamat" readonly/>
        </div>

        <!--
        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Nama Petugas</Label>
          <Input v-model="form.namaPetugas" />
        </div>
        -->
        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Golongan Darah</Label>
          <Select v-model="form.golonganDarah" disabled>
            <SelectTrigger><SelectValue placeholder="Pilih Golongan Darah" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="A">A</SelectItem>
              <SelectItem value="B">B</SelectItem>
              <SelectItem value="AB">AB</SelectItem>
              <SelectItem value="O">O</SelectItem>
              <SelectItem value="Tidak Tahu">Tidak Tahu</SelectItem>
              <SelectItem value="Diskrepansi / Tidak Cocok">Diskrepansi / Tidak Cocok</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Rhesus</Label>
          <RadioGroup v-model="form.rhesus" class="flex gap-6 mt-1">
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="negatif" value="Negatif" disabled/>
              <label for="negatif" class="text-sm">Negatif</label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="positif" value="Positif" disabled/>
              <label for="positif" class="text-sm">Positif</label>
            </div>
          </RadioGroup>
        </div>

      </div>
    </div>
  </TabsContent>

  <!-- 🩸 Informasi Kantong Darah -->
  <TabsContent value="Informasi Kantong Darah" class="space-y-4">
    <div class="bg-white p-4 rounded-lg shadow space-y-4">
      <h3 class="text-lg font-semibold text-gray-800">Informasi Kantong Darah</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <div class="flex flex-col  space-y-1">
          <Label class="text-sm text-gray-600">No Barcode (akan digenerate otomatis)</Label>
          <Input v-model="form.noBarcode" readonly/>
        </div>

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">No Kantong Darah</Label>
          <Input v-model="form.noKantongDarah" />
        </div>

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">No Bed</Label>
          <Input v-model="form.noBed" />
        </div>

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">No Blood Mixer</Label>
          <Input v-model="form.noBloodMixer" />
        </div>

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Volume Darah</Label>
          <div class="flex items-center">
            <Input v-model="form.volumeDarah" />
            <span class="px-3 py-2 bg-gray-100 text-sm rounded-r">mL</span>
          </div>
        </div>
<!--
        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Donor Apheresis</Label>
          <RadioGroup v-model="form.donorApheresis" class="flex gap-6 mt-1">
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="tidak" value="Tidak" />
              <label for="tidak" class="text-sm">Tidak</label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="ya" value="Ya" />
              <label for="ya" class="text-sm">Ya</label>
            </div>
          </RadioGroup>
        </div>

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Volume Apheresis</Label>
          <div class="flex items-center">
            <Input v-model="form.volumeApheresis" class="flex-1" />
            <span class="px-3 py-2 bg-gray-100 text-sm rounded-r">mL</span>
          </div>
        </div>
  -->     
        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Jenis Kantong Darah</Label>
          <Select v-model="form.jenisKantongDarah">
            <SelectTrigger><SelectValue placeholder="Pilih Jenis" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Single">Single</SelectItem>
              <SelectItem value="Double">Double</SelectItem>
              <SelectItem value="Triple">Triple</SelectItem>
              <SelectItem value="Quadruple">Quadruple</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="flex flex-col space-y-1">
        <Label class="text-sm text-gray-600">Saran Kantong Darah</Label>
        <span class="px-3 py-2 text-sm text-gray-800 bg-gray-50 border rounded-md">
          {{ form.saranKantong }}
        </span>
      </div>

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Tanggal Aftap</Label>
          <Input type="datetime-local" v-model="form.tanggalAftap" />
        </div>


        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Durasi Aftap</Label>
          <div class="flex items-center">
            <Input v-model="form.durasiAftap" class="flex-1" />
            <span class="px-3 py-2 bg-gray-100 text-sm rounded-r">menit</span>
          </div>
        </div>

      </div>
    </div>
  </TabsContent>

  <!-- 💉 Kondisi Kantong Darah -->
  <TabsContent value="Kondisi Kantong Darah" class="space-y-4">
    <div class="bg-white p-4 rounded-lg shadow space-y-4">
      <h3 class="text-lg font-semibold text-gray-800">Kondisi Kantong Darah</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Merk Kantong</Label>
          <Input v-model="form.merkKantong" />
        </div>

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">No Lot Kantong</Label>
          <Input v-model="form.noLotKantong" />
        </div>

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Kemasan Kantong</Label>
          <RadioGroup v-model="form.kemasanKantong" class="flex gap-6 mt-1">
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="baik" value="Baik" />
              <label for="baik" class="text-sm">Baik</label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="rusak" value="Rusak" />
              <label for="rusak" class="text-sm">Rusak</label>
            </div>
          </RadioGroup>
        </div>

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Warna Antikoagulan</Label>
          <RadioGroup v-model="form.warnaAntikoagulan" class="flex gap-6 mt-1">
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="tidak-keruh" value="Tidak Keruh" />
              <label for="tidak-keruh" class="text-sm">Tidak Keruh</label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="keruh" value="Keruh" />
              <label for="keruh" class="text-sm">Keruh</label>
            </div>
          </RadioGroup>
        </div>

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Kelembaban</Label>
          <RadioGroup v-model="form.kelembaban" class="flex gap-6 mt-1">
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="tidak-lembab" value="Tidak Lembab" />
              <label for="tidak-lembab" class="text-sm">Tidak Lembab</label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="lembab" value="Lembab" />
              <label for="lembab" class="text-sm">Lembab</label>
            </div>
          </RadioGroup>
        </div>

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Jarum</Label>
          <RadioGroup v-model="form.jarum" class="flex gap-6 mt-1">
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="tidak-cacat-jarum" value="Tidak Cacat" />
              <label for="tidak-cacat-jarum" class="text-sm">Tidak Cacat</label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="cacat-jarum" value="Cacat" />
              <label for="cacat-jarum" class="text-sm">Cacat</label>
            </div>
          </RadioGroup>
        </div>

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Selang</Label>
          <RadioGroup v-model="form.selang" class="flex gap-6 mt-1">
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="tidak-cacat-selang" value="Tidak Cacat" />
              <label for="tidak-cacat-selang" class="text-sm">Tidak Cacat</label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="cacat-selang" value="Cacat" />
              <label for="cacat-selang" class="text-sm">Cacat</label>
            </div>
          </RadioGroup>
        </div>

      </div>
    </div>
  </TabsContent>

  <!-- ⚙️ Status -->
  <TabsContent value="Status" class="space-y-4">
    <div class="bg-white p-4 rounded-lg shadow space-y-4">
      <h3 class="text-lg font-semibold text-gray-800">Status</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Status Labu Darah</Label>
          <RadioGroup v-model="form.statusLabuDarah" class="flex gap-6 mt-1">
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="status-diterima" value="Diterima" />
              <label for="status-diterima" class="text-sm">Diterima</label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="status-ditolak" value="Ditolak" />
              <label for="status-ditolak" class="text-sm">Ditolak</label>
            </div>
          </RadioGroup>
        </div>

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Alasan</Label>
          <Select v-model="form.alasan">
            <SelectTrigger><SelectValue placeholder="Pilih alasan" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Kemasan Kantong Rusak">Kemasan Kantong Rusak</SelectItem>
              <SelectItem value="Kantong Bocor">Kantong Bocor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="flex flex-col md:col-span-2  space-y-1">
          <Label class="text-sm text-gray-600">Catatan</Label>
          <Textarea v-model="form.catatan" rows="3" />
        </div>

      </div>
    </div>
  </TabsContent>

</div>
</Tabs>

  <!-- 🔹 Bottom: Data Grid -->
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
        Daftar Donor untuk Pemeriksaan Aftap
      </p>  
    </div>

    <!-- 🔎 Filters (Right-Aligned) -->
    <div class="flex flex-wrap items-center justify-start md:justify-end gap-3 w-full md:w-auto">
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

  <!-- Patients Main Table -->
  <CardContent class="p-0">
  <Table>
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
            class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg"
            @click="selectPatient(patient)"
          >
            Pilih
          </Button>
        </TableCell>
      </TableRow>

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
  <!-- Pagination -->
    <!-- ✅ Page text first (left) -->
    <span class="font-medium text-muted-foreground text-sm">
      Halaman {{ currentPage }}{{ totalPages > 0 ? ' dari ' + totalPages : '' }} 
    </span>
    
    <div class="flex items-center gap-2">
      <Button
        class="bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
        @click="prevPage"
        :disabled="currentPage === 1"
      >
        Previous
      </Button>


      <Button
        class="bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
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
  <Card class="w-3/4 max-h-[80vh] overflow-y-auto">
    <CardHeader>
      <div class="flex justify-between items-center">
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
        <Input v-model="searchNoKartuDonor" placeholder="No Kartu Donor" />
        <Input v-model="searchNoRegistrasi" placeholder="No Registrasi" />
        <Input v-model="modalSearchNama" placeholder="Nama" />
      </div>

      <Button variant="default" class="mb-4" @click="searchPatients">
        Cari
      </Button>

      <!-- Patients Table -->
      <ScrollArea class="max-h-96">
        <Table>
          <TableHeader class="bg-gray-100">
            <TableRow>
              <TableHead class="font-semibold text-gray-800">Reg No</TableHead>
              <TableHead class="font-semibold text-gray-800">Reg Date</TableHead>
              <TableHead class="font-semibold text-gray-800">Donor Card</TableHead>
              <TableHead class="font-semibold text-gray-800">Nama</TableHead>
              <TableHead class="font-semibold text-gray-800">Tanggal Lahir</TableHead>
              <TableHead class="font-semibold text-gray-800">Status</TableHead>
              <TableHead class="font-semibold text-gray-800">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow
              v-for="patient in modalPatients"
              :key="patient.id"
              class="hover:bg-gray-50"
            >
              <TableCell>{{ patient.reg_no }}</TableCell>
              <TableCell>{{ formatDate(patient.reg_date) }}</TableCell>
              <TableCell>{{ patient.donor_card_no }}</TableCell>
              <TableCell>{{ patient.full_name }}</TableCell>
              <TableCell>{{ formatDate(patient.birth_date) }}</TableCell>
              <TableCell>{{ patient.status }}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg"
                  @click="selectPatientFromModal(patient)"
                >
                  Pilih
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ScrollArea>

      <!-- Pagination -->
      <div class="flex justify-between items-center mt-4">
        <Button
          class="bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
          @click="modalPrevPage"
          :disabled="modalCurrentPage === 1"
        >
          Previous
        </Button>

        <span class="font-medium text-gray-700">
          Page {{ modalCurrentPage }} of {{ modalTotalPages }}
        </span>

        <Button
          class="bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
          @click="modalNextPage"
          :disabled="modalCurrentPage === modalTotalPages"
        >
          Next
        </Button>
      </div>
    </CardContent>
  </Card>
</div>


    <!-- Modal for Barcode Print -->
    <div v-if="showBarcodeModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <div id="print-area" class="p-4 bg-white text-center">
          <div class="mb-2">{{ form.noKantongDarah }} / Gol, Rh. D: {{ form.golonganDarah }} ({{ form.rhesus === 'Negatif' ? '-' : '+' }})</div>
          <div class="mb-2 flex justify-center">
            <vue-barcode :value="form.noBarcode" :options="{ format: 'CODE128', width: 2, height: 40 }" v-if="form.noBarcode"></vue-barcode>
          </div>
          <div>Tgl. Aftap: {{ formattedTanggalAftap }}</div>
        </div>
        <div class="flex justify-end mt-4">
          <button @click="printBarcode" class="no-print bg-blue-600 text-white px-4 py-2 rounded mr-2">Download PDF</button>
          <button @click="closeBarcodeModal" class="no-print bg-red-600 text-white px-4 py-2 rounded">Tutup</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import VueBarcode from '@chenfengyuan/vue-barcode'
import api from "../lib/axios.js";
//shadcnvue
import { Button } from "@/components/ui/button";
import { RefreshCcw, Plus, Search, Undo2, Save, Unlock, Barcode } from "lucide-vue-next"
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

const tabs = ["Identitas", "Informasi Kantong Darah", "Kondisi Kantong Darah", "Status"];
const activeTab = ref("Identitas");

const form = ref({
  // Patient area fields
  tanggalRegistrasi: '',
  nomorRegistrasi: '',
  noKartuDonor: '',
  namaDonor: '',
  jenisKelamin: 'LAKI-LAKI',
  tempatLahir: '',
  tanggalLahir: '',
  umur: '',
  alamat: '',
  namaPetugas: '',
  saranKantong: '',

  // Donor area fields
  noBarcode: '',
  noKantongDarah: '',
  noBed: '',
  noBloodMixer: '',
  volumeDarah: '',
  donorApheresis: 'Tidak',
  volumeApheresis: '',
  tanggalAftap: '',
  jenisKantongDarah: 'Single',
  durasiAftap: '',
  statusLabuDarah: 'Diterima',
  alasan: 'Kemasan Kantong Rusak',
  catatan: '',
  merkKantong: '',
  noLotKantong: '',
  kemasanKantong: 'Baik',
  warnaAntikoagulan: 'Tidak Keruh',
  kelembaban: 'Tidak Lembab',
  jarum: 'Tidak Cacat',
  selang: 'Tidak Cacat'
})

// Patients table related
const patients = ref([]);
const currentPage = ref(1);
const total = ref(0);
const limit = ref(10);

// Filter refs
const searchNoReg = ref("");
const searchNama = ref("");
const searchRegDate = ref(new Date().toISOString().split('T')[0]);
const filterStatus = ref("Ambil Darah");

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

// Barcode modal
const showBarcodeModal = ref(false);

const formattedTanggalAftap = computed(() => {
  if (!form.value.tanggalAftap) return '';
  const date = new Date(form.value.tanggalAftap);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
});

async function fetchPatients(page = 1) {
  currentPage.value = page;
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.value.toString());
  if (filterStatus.value) {
    params.append('status', filterStatus.value);
  } else {
    params.append('status', 'not_registrasi_aftap');
  }
  params.append('donor_type_not', 'Donor Apheresis');
  if (searchNoReg.value) params.append('reg_no', searchNoReg.value);
  if (searchNama.value) params.append('full_name', searchNama.value);
  if (searchRegDate.value) params.append('reg_date', searchRegDate.value);
  const { data } = await api.get(`/api/patients?${params.toString()}`);
  patients.value = data.data;
  total.value = data.total;
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

async function selectPatient(patient) {
  // Clear form data first
  Object.keys(form.value).forEach(key => {
    form.value[key] = '';
  });
  // Reset specific fields to defaults
  form.value.jenisKelamin = 'LAKI-LAKI';
  form.value.golonganDarah = 'A';
  form.value.rhesus = 'Negatif';
  form.value.donorApheresis = 'Tidak';
  form.value.jenisKantongDarah = 'Single';
  form.value.statusLabuDarah = 'Diterima';
  form.value.alasan = 'Kemasan Kantong Rusak';
  form.value.kemasanKantong = 'Baik';
  form.value.warnaAntikoagulan = 'Tidak Keruh';
  form.value.kelembaban = 'Tidak Lembab';
  form.value.jarum = 'Tidak Cacat';
  form.value.selang = 'Tidak Cacat';
  form.value.saranKantong = '';

  // Fetch full patient data
  const { data: fullPatient } = await api.get(`/api/patients/${patient.reg_no}`);
  // Populate Identitas Donor tab with patient data
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
  form.value.alamat = fullPatient.address_ktp || '';
  form.value.saranKantong = fullPatient.saran_kantong || '';

  // Fetch data from hb_golongan_darah for other tabs
  try {
    const { data: hbData } = await api.get(`/api/hb_golongan_darah/${patient.reg_no}`);
    if (hbData) {
      // Populate fields from hb_golongan_darah
      form.value.namaPetugas = hbData.nama_petugas || '';
      form.value.golonganDarah = hbData.golongan_darah || '';
      form.value.rhesus = hbData.rhesus || '';
    }
  } catch (error) {
    // No data in hb_golongan_darah, leave other fields empty
  }

  // Fetch data from pemeriksaan_aftap for additional tabs
  try {
    const { data: aftapData } = await api.get(`/api/pemeriksaan_aftap/${patient.reg_no}`);
    if (aftapData) {
      // Populate Informasi Kantong Darah tab
      form.value.noBarcode = aftapData.no_barcode || '';
      form.value.noKantongDarah = aftapData.no_kantong_darah || '';
      form.value.noBed = aftapData.no_bed || '';
      form.value.noBloodMixer = aftapData.no_blood_mixer || '';
      form.value.volumeDarah = aftapData.volume_darah ? aftapData.volume_darah.toString() : '';
      form.value.donorApheresis = aftapData.donor_apheresis || 'Ya';
      form.value.volumeApheresis = aftapData.volume_apheresis ? aftapData.volume_apheresis.toString() : '';
      if (aftapData.tanggal_aftap) {
        const date = new Date(aftapData.tanggal_aftap);
        date.setHours(date.getHours() + 7); // Adjust to Asia/Bangkok timezone (UTC+7)
        form.value.tanggalAftap = date.toISOString().slice(0, 16);
      } else {
        form.value.tanggalAftap = '';
      }
      form.value.jenisKantongDarah = aftapData.jenis_kantong_darah || 'Single';
      form.value.durasiAftap = aftapData.durasi_aftap ? aftapData.durasi_aftap.toString() : '';

      // Populate Kondisi Kantong Darah tab
      form.value.merkKantong = aftapData.merk_kantong || '';
      form.value.noLotKantong = aftapData.no_lot_kantong || '';
      form.value.kemasanKantong = aftapData.kemasan_kantong || 'Baik';
      form.value.warnaAntikoagulan = aftapData.warna_antikoagulan || 'Tidak Keruh';
      form.value.kelembaban = aftapData.kelembaban || 'Tidak Lembab';
      form.value.jarum = aftapData.jarum || 'Tidak Cacat';
      form.value.selang = aftapData.selang || 'Tidak Cacat';

      // Populate Status tab
      form.value.statusLabuDarah = aftapData.status_labu_darah || 'Diterima';
      form.value.alasan = aftapData.alasan || 'Kemasan Kantong Rusak';
      form.value.catatan = aftapData.catatan || '';
    }
  } catch (error) {
    // No data in pemeriksaan_aftap, leave fields empty
  }

  // Set default tanggalAftap to now if empty
  if (!form.value.tanggalAftap) {
    const date = new Date();
    date.setHours(date.getHours() + 7); // Adjust to Asia/Bangkok timezone (UTC+7)
    form.value.tanggalAftap = date.toISOString().slice(0, 16);
  }
  
  // 🔹 NEW: Auto-generate noBarcode if still empty
  if (!form.value.noBarcode && form.value.nomorRegistrasi) {
    // remove first 3 characters from nomorRegistrasi
    form.value.noBarcode = form.value.nomorRegistrasi.slice(3);
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
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.value.toString());
  params.append('status', 'not_registrasi_aftap');
  if (searchNoKartuDonor.value) params.append('donor_card_no', searchNoKartuDonor.value);
  if (searchNoRegistrasi.value) params.append('reg_no', searchNoRegistrasi.value);
  if (modalSearchNama.value) params.append('full_name', modalSearchNama.value);
  const { data } = await api.get(`/api/patients?${params.toString()}`);
  modalPatients.value = data.data;
  modalTotal.value = data.total;
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
  console.log('Refreshing data...')
  fetchPatients(currentPage.value);
}

function cariDataRegistrasi() {
  showModal.value = true;
  modalCurrentPage.value = 1;
  fetchModalPatients(1);
}

async function undo() {
  console.log('Undo clicked');

  const nomorRegistrasi = form.value.nomorRegistrasi;
  if (!nomorRegistrasi) {
    alert('Silahkan pilih data donor terlebih dahulu');
    return;
  }

  try {
    // Update patient status to 'Ambil Darah'
    const statusData = await api.put(`/api/patients/${nomorRegistrasi}/status`, { status: 'Ambil Darah' });
    console.log('Patient status updated to Ambil Darah:', statusData.data);

    // Update pemeriksaan_aftap status_labu_darah to 'Diterima' and status to 'N', set release_by to null
    const updateData = {
      nomor_registrasi: nomorRegistrasi,
      status_labu_darah: 'Diterima',
      status: 'N',
      release_by: null
    };
    const aftapData = await api.put('/api/pemeriksaan_aftap/undo', updateData);
    console.log('Pemeriksaan aftap update response:', aftapData.data);

    // Delete from log_cekal if exists
    try {
      const deleteData = await api.delete(`/api/log_cekal?nomor_registrasi=${nomorRegistrasi}&menu=Ambil%20Darah`);
      console.log('Log cekal delete response:', deleteData.data);
    } catch (err) {
      console.error('Error deleting log_cekal:', err);
    }

    // Update stok_darah status to 'Batal'
    const stokUpdate = await updateStokDarahStatus(nomorRegistrasi, 'Batal');
    console.log('Stok darah status updated to Batal:', stokUpdate);

    alert('Status pasien berhasil diubah menjadi Ambil Darah dan data diperbarui!');
    refreshData();

    // Log activity
    const user = getCurrentUser();
    const logData = {
      note: 'Undo',
      userid: user.username,
      pid: form.value.noKartuDonor,
      regno: form.value.nomorRegistrasi,
      barcodeno: form.value.nomorRegistrasi.slice(3),
      menu: 'Pemeriksaan Aftap',
      no_kantong: form.value.noKantongDarah,
      lokasi: 'Ruang Aftap',
      komponen: ''
    };
    try {
      const activityRes = await api.post('/api/activity_log', logData);
      console.log('Activity logged:', activityRes.data);
    } catch (err) {
      console.error('Error logging activity:', err);
    }
  } catch (error) {
    console.error('Error updating:', error);
    alert('Terjadi kesalahan saat mengubah status: ' + error.message);
  }
}

async function simpanData() {
  //console.log('Simpan Data clicked', form.value)
  
  if (!form.value.nomorRegistrasi) {
    alert('Silakan pilih data donor terlebih dahulu');
    return;
  }
  // Get token and user
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  let created_by = null;
  if (userStr) {
    const user = JSON.parse(userStr);
    created_by = user.username;
  }

  // Generate no_barcode from nomor_registrasi by removing 'REG' from left
  const nomorRegistrasi = form.value.nomorRegistrasi || ''
  const noBarcode = nomorRegistrasi.startsWith('REG') ? nomorRegistrasi.substring(3) : nomorRegistrasi

  // Prepare data to send to backend
  const dataToSend = {
    created_by: created_by,
    tanggal_registrasi: form.value.tanggalRegistrasi ? new Date(form.value.tanggalRegistrasi).toISOString() : null,
    nomor_registrasi: form.value.nomorRegistrasi || '',
    no_kartu_donor: form.value.noKartuDonor || null,
    nama_donor: form.value.namaDonor || null,
    jenis_kelamin: form.value.jenisKelamin || null,
    tempat_lahir: form.value.tempatLahir || null,
    tanggal_lahir: form.value.tanggalLahir || null,
    umur: form.value.umur || null,
    alamat: form.value.alamat || null,
    nama_petugas: form.value.namaPetugas || null,
    golongan_darah: form.value.golonganDarah || null,
    rhesus: form.value.rhesus || null,
    saran_kantong: form.value.saranKantong || null,
    no_barcode: noBarcode,
    no_kantong_darah: form.value.noKantongDarah || null,
    no_bed: form.value.noBed || null,
    no_blood_mixer: form.value.noBloodMixer || null,
    volume_darah: form.value.volumeDarah || null,
    donor_apheresis: form.value.donorApheresis || null,
    volume_apheresis: form.value.volumeApheresis || null,
    tanggal_aftap: form.value.tanggalAftap ? new Date(form.value.tanggalAftap).toISOString() : null,
    jenis_kantong_darah: form.value.jenisKantongDarah || null,
    durasi_aftap: form.value.durasiAftap || null,
    merk_kantong: form.value.merkKantong || null,
    no_lot_kantong: form.value.noLotKantong || null,
    kemasan_kantong: form.value.kemasanKantong || null,
    warna_antikoagulan: form.value.warnaAntikoagulan || null,
    kelembaban: form.value.kelembaban || null,
    jarum: form.value.jarum || null,
    selang: form.value.selang || null,
    status_labu_darah: form.value.statusLabuDarah || null,
    status: 'R',
    alasan: form.value.alasan || null,
    catatan: form.value.catatan || null
  }

  // Send data to backend
  try {
    const { data } = await api.post('/api/pemeriksaan_aftap', dataToSend);
    console.log('Data saved successfully:', data);
    alert('Data berhasil disimpan!');
    if (form.value.statusLabuDarah === 'Ditolak') {
      try {
        const statusData = await api.put(`/api/patients/${form.value.nomorRegistrasi}/status`, { status: 'Ditolak' });
        console.log('Status update response:', statusData.data);
      } catch (err) {
        console.error('Error updating status:', err);
      }

      // Insert into log_cekal
      const currentUser = getCurrentUser();
      const logData = {
        nomor_registrasi: form.value.nomorRegistrasi,
        no_barcode: null,
        no_kartu_donor: form.value.noKartuDonor,
        petugas: currentUser.username,
        alasan: form.value.alasan,
        menu: "Ambil Darah",
        keterangan: form.value.catatan,
        created_by: currentUser.username
      };
      try {
        const logRes = await api.post('/api/log_cekal', logData);
        console.log('Log cekal insert response:', logRes.data);
      } catch (err) {
        console.error('Error inserting log_cekal:', err);
      }
    }
    refreshData();

    // Log activity
    const user = getCurrentUser();
    const activityLogData = {
      note: 'Simpan Data',
      userid: user.username,
      pid: form.value.noKartuDonor,
      regno: form.value.nomorRegistrasi,
      barcodeno: form.value.nomorRegistrasi.slice(3),
      menu: 'Pemeriksaan Aftap',
      no_kantong: form.value.noKantongDarah,
      lokasi: 'Ruang Aftap',
      komponen: ''
    };
    try {
      const activityRes = await api.post('/api/activity_log', activityLogData);
      console.log('Activity logged:', activityRes.data);
    } catch (err) {
      console.error('Error logging activity:', err);
    }
  } catch (error) {
    console.error('Error saving data:', error);
    alert('Terjadi kesalahan saat menyimpan data: ' + error.message);
  }
}

async function calculateExpiredDate(tanggalAftap, kodeKomponen) {
  try {
    const { data } = await api.get(`/api/master_komponen?kode=${kodeKomponen}`);
    if (!data.data || data.data.length === 0) {
      throw new Error('No data found for kode: ' + kodeKomponen);
    }
    const masaSimpanHari = data.data[0].masa_simpan_hari;
    const aftapDate = new Date(tanggalAftap);
    aftapDate.setDate(aftapDate.getDate() + masaSimpanHari);
    return aftapDate.toISOString().split('T')[0]; // Return as YYYY-MM-DD
  } catch (error) {
    console.error('Error calculating expired date:', error);
    return null;
  }
}

async function insertStokDarah(data) {
  try {
    const result = await api.post('/api/stok_darah', data);
    console.log('Stok darah inserted/updated successfully:', result.data);
    return result.data;
  } catch (error) {
    console.error('Error inserting/updating stok_darah:', error);
    throw error;
  }
}

async function updateStokDarahStatus(nomorRegistrasi, status) {
  try {
    const result = await api.put('/api/stok_darah/update_status', { nomor_registrasi: nomorRegistrasi, status: status });
    console.log('Stok darah status updated successfully:', result.data);
    return result.data;
  } catch (error) {
    console.error('Error updating stok_darah status:', error);
    throw error;
  }
}

async function releaseData() {
  if (!form.value.nomorRegistrasi) {
    alert('Silakan pilih data donor terlebih dahulu');
    return;
  }

  if (!form.value.noKantongDarah) {
    alert('Nomor Kantong Darah harus diisi terlebih dahulu');
    return;
  }

  if (!form.value.volumeDarah) {
    alert('Volume Kantong Darah harus diisi terlebih dahulu');
    return;
  }

  // Get user
  const userStr = localStorage.getItem('user');
  let created_by = null;
  if (userStr) {
    const user = JSON.parse(userStr);
    created_by = user.username;
  }

  // Generate no_barcode from nomor_registrasi by removing 'REG' from left
  const nomorRegistrasi = form.value.nomorRegistrasi || '';
  const noBarcode = nomorRegistrasi.startsWith('REG') ? nomorRegistrasi.substring(3) : nomorRegistrasi;

  try {
    // Fetch data from hb_golongan_darah
    let hbData = null;
    try {
      const hbResponse = await api.get(`/api/hb_golongan_darah/${nomorRegistrasi}`);
      hbData = hbResponse.data;
    } catch (error) {
      // No data in hb_golongan_darah, leave empty
    }

    // Fetch data from pemeriksaan_fisik
    let fisikData = null;
    try {
      const fisikResponse = await api.get(`/api/pemeriksaan_fisik/${nomorRegistrasi}`);
      fisikData = fisikResponse.data;
    } catch (error) {
      // No data in pemeriksaan_fisik, leave empty
    }

    // Prepare data to send to backend with new fields
    const dataToSend = {
      created_by: created_by,
      release_by: created_by,
      release_at: new Date().toISOString(),
      tanggal_registrasi: form.value.tanggalRegistrasi || null,
      nomor_registrasi: form.value.nomorRegistrasi || '',
      no_kartu_donor: form.value.noKartuDonor || null,
      nama_donor: form.value.namaDonor || null,
      jenis_kelamin: form.value.jenisKelamin || null,
      tempat_lahir: form.value.tempatLahir || null,
      tanggal_lahir: form.value.tanggalLahir || null,
      umur: form.value.umur || null,
      alamat: form.value.alamat || null,
      nama_petugas: form.value.namaPetugas || null,
      golongan_darah: form.value.golonganDarah || null,
      rhesus: form.value.rhesus || null,
      saran_kantong: form.value.saranKantong || null,
      no_barcode: noBarcode,
      no_kantong_darah: form.value.noKantongDarah || null,
      no_bed: form.value.noBed || null,
      no_blood_mixer: form.value.noBloodMixer || null,
      volume_darah: form.value.volumeDarah || null,
      donor_apheresis: form.value.donorApheresis || null,
      volume_apheresis: form.value.volumeApheresis || null,
      tanggal_aftap: form.value.tanggalAftap ? new Date(form.value.tanggalAftap).toISOString() : null,
      jenis_kantong_darah: form.value.jenisKantongDarah || null,
      durasi_aftap: form.value.durasiAftap || null,
      merk_kantong: form.value.merkKantong || null,
      no_lot_kantong: form.value.noLotKantong || null,
      kemasan_kantong: form.value.kemasanKantong || null,
      warna_antikoagulan: form.value.warnaAntikoagulan || null,
      kelembaban: form.value.kelembaban || null,
      jarum: form.value.jarum || null,
      selang: form.value.selang || null,
      status_labu_darah: form.value.statusLabuDarah || null,
      status: 'R',
      alasan: form.value.alasan || null,
      catatan: form.value.catatan || null,
      // New fields from hb_golongan_darah
      berat_badan: hbData ? hbData.berat_badan : null,
      tinggi_badan: hbData ? hbData.tinggi_badan : null,
      hemoglobin: hbData ? hbData.hemoglobin : null,
      lokasi_donor: hbData ? hbData.lokasi_ambil_darah : null,
      // New fields from pemeriksaan_fisik
      sistole: fisikData ? fisikData.sistole : null,
      diastole: fisikData ? fisikData.diastole : null,
      jenis_donor: fisikData ? fisikData.jenis_donor : null,
      peruntukan: fisikData ? fisikData.peruntukan : null,
      no_rm: fisikData ? fisikData.no_rm : null,
      rumah_sakit: fisikData ? fisikData.rumah_sakit : null
    };

    // First, save the pemeriksaan_aftap data
    const saveResponse = await api.post('/api/pemeriksaan_aftap', dataToSend);
    console.log('Pemeriksaan Aftap data saved successfully:', saveResponse.data);

    // Now update patient status based on statusLabuDarah
    const newStatus = form.value.statusLabuDarah === 'Ditolak' ? 'Ditolak' : 'Selesai';
    const statusResponse = await api.put(`/api/patients/${nomorRegistrasi}/status`, { status: newStatus });
    console.log('Patient status updated:', statusResponse.data);

    // If statusLabuDarah is 'Ditolak', insert into log_cekal
    if (form.value.statusLabuDarah === 'Ditolak') {
      const currentUser = getCurrentUser();
      const logData = {
        nomor_registrasi: nomorRegistrasi,
        no_barcode: null,
        no_kartu_donor: form.value.noKartuDonor,
        petugas: currentUser.username,
        alasan: form.value.alasan,
        menu: "Ambil Darah",
        keterangan: form.value.catatan,
        created_by: currentUser.username
      };
      try {
        const logRes = await api.post('/api/log_cekal', logData);
        console.log('Log cekal insert response:', logRes.data);
      } catch (err) {
        console.error('Error inserting log_cekal:', err);
      }
    }

    // Update master_donor tanggal_donasi
    const masterDonorResponse = await api.post('/api/master_donor', {
      no_kartu_donor: form.value.noKartuDonor,
      tanggal_donasi: new Date().toISOString()
    });
    console.log('Master donor updated:', masterDonorResponse.data);

    // Check if nomor_registrasi exists in hasil_skrining_darah
    const skriningResponse = await api.get(`/api/hasil_skrining_darah?nomor_registrasi=${nomorRegistrasi}`);
    const skriningData = skriningResponse.data;

    if (skriningData.data.length === 0) {
      // Insert data from form into hasil_skrining_darah
      const insertData = {
        nomorRegistrasi: form.value.nomorRegistrasi,
        tanggalRegistrasi: form.value.tanggalRegistrasi,
        nomorBarcode: noBarcode,
        diperiksaOleh: form.value.namaPetugas,
        namaDonor: form.value.namaDonor,
        tanggalLahir: form.value.tanggalLahir,
        umur: form.value.umur,
        alamat: form.value.alamat,
        beratBadan: hbData ? hbData.berat_badan : null,
        jenisKelamin: form.value.jenisKelamin,
        golonganDarah: form.value.golonganDarah,
        rhesus: form.value.rhesus,
        metode: 'CLIA',
        tanggalSkrinning: new Date().toISOString(),
        nomorKantongDarah: form.value.noKantongDarah
      };
      await api.post('/api/hasil_skrining_darah', insertData);
    } else {
      // Update existing record with no_kantong_darah
      const updateData = {
        nomorKantongDarah: form.value.noKantongDarah
      };
      await api.post('/api/hasil_skrining_darah', {
        nomorRegistrasi: form.value.nomorRegistrasi,
        ...updateData
      });
    }

    console.log('Hasil skrining darah processed');

    // Calculate expired date and insert into stok_darah
    const kodeKomponen = '50'; // As per task: kode=50
    const tanggalKadaluarsa = await calculateExpiredDate(form.value.tanggalAftap, kodeKomponen);
    if (!tanggalKadaluarsa) {
      throw new Error('Failed to calculate expired date');
    }

    // Fetch komponen name from master_komponen
    const komponenResponse = await api.get('/api/master_komponen?kode=50');
    const komponenData = komponenResponse.data;
    const komponenNama = komponenData.data && komponenData.data.length > 0 ? komponenData.data[0].nama : 'WB';

    const stokDarahData = {
      nomor_kantong: form.value.noKantongDarah,
      nomor_barcode: noBarcode,
      nomor_registrasi: form.value.nomorRegistrasi,
      nomor_kartu_donor: form.value.noKartuDonor,
      golongan_darah: form.value.golonganDarah,
      rhesus: form.value.rhesus,
      jenis_donor: fisikData ? fisikData.jenis_donor : null,
      jenis_kantong_darah: form.value.jenisKantongDarah,
      kode_komponen: '50',
      komponen: komponenNama,
      volume_ml: form.value.volumeDarah ? parseInt(form.value.volumeDarah) : null,
      durasi_aftap: form.value.durasiAftap ? parseInt(form.value.durasiAftap) : null,
      tanggal_registrasi: form.value.tanggalRegistrasi ? new Date(form.value.tanggalRegistrasi).toISOString() : null,
      tanggal_aftap: form.value.tanggalAftap ? new Date(form.value.tanggalAftap).toISOString() : null,
      tanggal_release: new Date().toISOString(),
      tanggal_kadaluarsa: tanggalKadaluarsa,
      status: 'Proses',
      created_by: created_by
    };

    const stokResult = await insertStokDarah(stokDarahData);
    console.log('Stok darah inserted:', stokResult);
    alert('Data berhasil disimpan dan direlease');
    //refreshData();

    // Log activity
    const user = getCurrentUser();
    const logData = {
      note: 'Release Data',
      userid: user.username,
      pid: form.value.noKartuDonor,
      regno: form.value.nomorRegistrasi,
      barcodeno: form.value.nomorRegistrasi.slice(3),
      menu: 'Pemeriksaan Aftap',
      no_kantong: form.value.noKantongDarah,
      lokasi: 'Ruang Aftap',
      komponen: ''
    };
    try {
      const activityRes = await api.post('/api/activity_log', logData);
      console.log('Activity logged:', activityRes.data);
    } catch (err) {
      console.error('Error logging activity:', err);
    }
  } catch (error) {
    console.error('Error in release process:', error);
    alert('Terjadi kesalahan saat menyimpan data : ' + error.message);
  }
}

function cetakBarcode() {
  console.log('Cetak Barcode clicked')
  if (!form.value.nomorRegistrasi) {
    alert('Silakan pilih data donor terlebih dahulu');
    return;
  }
  showBarcodeModal.value = true;
}

function closeBarcodeModal() {
  showBarcodeModal.value = false;
}

async function printBarcode() {
  // Prepare data for PDF generation
  const pdfData = {
    no_kantong_darah: form.value.noKantongDarah,
    golongan_darah: form.value.golonganDarah,
    rhesus: form.value.rhesus,
    no_barcode: form.value.noBarcode,
    formatted_tanggal_aftap: formattedTanggalAftap.value
  };

  try {
    // Call the new API to generate PDF
    const response = await api.post('/api/generate_barcode_pdf', pdfData, {
      responseType: 'blob' // Important for downloading files
    });

    // Open PDF in new tab
    const blob = new Blob([response.data], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    window.open(url, '_blank')

    // Log activity
    const user = getCurrentUser();
    const logData = {
      note: 'Cetak Barcode',
      userid: user.username,
      pid: form.value.noKartuDonor,
      regno: form.value.nomorRegistrasi,
      barcodeno: form.value.nomorRegistrasi.slice(3),
      menu: 'Pemeriksaan Aftap',
      no_kantong: form.value.noKantongDarah,
      lokasi: 'Ruang Aftap',
      komponen: ''
    };
    try {
      const activityRes = await api.post('/api/activity_log', logData);
      console.log('Activity logged:', activityRes.data);
    } catch (err) {
      console.error('Error logging activity:', err);
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Terjadi kesalahan saat mencetak barcode');
  }
}

// Load patients on component mount
onMounted(() => {
  fetchPatients(1);
});


function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

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
  filterStatus.value = "Ambil Darah";
  currentPage.value = 1;
  fetchPatients(1);
}

function applyFilters() {
  currentPage.value = 1;
  fetchPatients(1);
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