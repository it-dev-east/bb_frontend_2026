<template>
  <div class="flex flex-col h-full">
    <!-- 🔹 Top Action Bar (shadcn Button) -->
    <div class="flex justify-between items-center p-0 bg-white sticky top-0 z-10">
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
      </div>

      <div class="flex gap-2 p-4 bg-white sticky top-0 z-10">
        <Button @click="hasilHb" class="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          <Syringe class="w-5 h-5" />
          Hasil HB
        </Button>
        <Button @click="hasilKuisioner" class="flex items-center gap-2 bg-green-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          <ScrollText class="w-5 h-5" />
          Hasil Kuisioner
        </Button>
      </div>
    </div>

    <!-- 🔹 Tabs Section (Shadcn-Vue Modern Layout) -->
    <Tabs v-model="activeTab" default-value="Identitas" class="flex-1 flex flex-col overflow-y-auto bg-white">

    <!-- 🔸 Tabs Navigation -->
    <div class="px-4 pt-0 border-y bg-white flex items-center justify-between">
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
        <div class="bg-white p-4 rounded-lg shadow space-y-4">
          <h3 class="text-lg font-semibold text-gray-800">Pemeriksaan Fisik</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

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
              <Input v-model="form.noKartuDonor" readonly />
            </div>

            <div class="flex flex-col space-y-1">
              <Label class="text-sm text-gray-600">Nama Donor</Label>
              <Input v-model="form.namaDonor" readonly/>
            </div>

            <div class="flex flex-col space-y-1">
              <Label class="text-sm text-gray-600">Jenis Kelamin</Label>
              <RadioGroup v-model="form.jenisKelamin" class="flex gap-6 mt-1">
                <div class="flex items-center gap-2">
                  <RadioGroupItem id="male" value="LAKI-LAKI" disabled/>
                  <label for="male" class="text-sm">Laki-Laki</label>
                </div>
                <div class="flex items-center gap-2">
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

            <!--
            <div class="flex flex-col space-y-1">
              <Label class="text-sm text-gray-600">Nama Petugas</Label>
              <Input v-model="form.namaPetugas" />
            </div>
            -->
            
          </div>
        </div>
      </TabsContent>

      <!-- 💉 Hasil Periksa Fisik -->
      <TabsContent value="Hasil Periksa Fisik" class="space-y-4">
        <div class="bg-white p-4 rounded-lg shadow space-y-4">
          <h3 class="text-lg font-semibold text-gray-800">Hasil Periksa Fisik</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">

            <div>
              <VitalInput
                label="Sistole"
                note="Normal: 90-120 mmHg"
                v-model="form.sistole"
                :min="90"
                :max="120"
              />
            </div>

            <div>
              <VitalInput
                label="Diastole"
                note="Normal: 60-80 mmHg"
                v-model="form.diastole"
                :min="60"
                :max="80"
              />
            </div>
            
            <!--
            <div class="flex flex-col space-y-1">
              <Label class="text-sm text-gray-600">Donor Apheresis</Label>
              <RadioGroup v-model="form.donorApheresis" class="flex gap-6 mt-1">
                <div class="flex items-center gap-2">
                  <RadioGroupItem id="apheresisYa" value="Ya" />
                  <label for="apheresisYa" class="text-sm">Ya</label>
                </div>
                <div class="flex items-center gap-2">
                  <RadioGroupItem id="apheresisTidak" value="Tidak" />
                  <label for="apheresisTidak" class="text-sm">Tidak</label>
                </div>
              </RadioGroup>
            </div>
            -->

            <div class="flex flex-col space-y-1">
              <Label class="text-sm text-gray-600">Saran Kantong Darah</Label>
              <Select v-model="form.saranKantongDarah">
                <SelectTrigger>
                  <SelectValue placeholder="Pilih" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Double">Double</SelectItem>
                  <SelectItem value="Triple">Triple</SelectItem>
                  <SelectItem value="Quadruple">Quadruple</SelectItem>
                  <SelectItem value="SingleApheresis">Single Apheresis</SelectItem>
                  <SelectItem value="DoubleApheresis">Double Apheresis</SelectItem>
                  <SelectItem value="TripleApheresis">Triple Apheresis</SelectItem>
                  <SelectItem value="QuadrupleApheresis">Quadruple Apheresis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div class="flex flex-col space-y-1">
              <Label class="text-sm text-gray-600">Jenis Donor</Label>
              <Select v-model="form.jenisDonor">
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Jenis" />
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

            <div class="flex flex-col col-start-1 space-y-1">
              <Label class="text-sm text-gray-600">Anamnesis</Label>
              <RadioGroup v-model="form.anamnesis" class="flex gap-6 mt-1">
                <div class="flex items-center gap-2">
                  <RadioGroupItem id="anamnesisDilakukan" value="Dilakukan" />
                  <label for="anamnesisDilakukan" class="text-sm">Dilakukan</label>
                </div>
                <div class="flex items-center gap-2">
                  <RadioGroupItem id="anamnesisTidak" value="Tidak" />
                  <label for="anamnesisTidak" class="text-sm">Tidak</label>
                </div>
              </RadioGroup>
            </div>

            <div class="flex flex-col col-start-2 space-y-1">
              <Label class="text-sm text-gray-600">Dokter Pemeriksa</Label>
              <Input v-model="form.dokterPemeriksa" />
            </div>

          </div>
        </div>
      </TabsContent>

      <!-- 📦 Peruntukan -->
      <TabsContent value="Peruntukan" class="space-y-4">
        <div class="bg-white p-4 rounded-lg shadow space-y-4">
          <h3 class="text-lg font-semibold text-gray-800">Peruntukan</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            <div class="col-span-3 space-y-1">
              <Label class="text-sm text-gray-600">Peruntukan</Label>
              <RadioGroup v-model="form.peruntukan" class="flex gap-6 mt-1">
                <div class="flex items-center gap-2">
                  <RadioGroupItem id="internal" value="Internal" />
                  <label for="internal" class="text-sm">Internal</label>
                </div>
                <div class="flex items-center gap-2">
                  <RadioGroupItem id="eksternal" value="Eksternal" />
                  <label for="eksternal" class="text-sm">Eksternal</label>
                </div>
              </RadioGroup>
            </div>

            <div class="flex flex-col space-y-1">
              <Label class="text-sm text-gray-600">No RM</Label>
              <Input v-model="form.noRM" />
            </div>

            <div class="flex flex-col space-y-1">
              <Label class="text-sm text-gray-600">Nama Pasien</Label>
              <Input v-model="form.namaPasien" />
            </div>

            <div class="flex flex-col space-y-1">
              <Label class="text-sm text-gray-600">Rumah Sakit</Label>
              <Input v-model="form.rumahSakit" />
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
              <Label class="text-sm text-gray-600">Status Cekal</Label>
              <RadioGroup v-model="form.statusCekal" class="flex gap-6 mt-1">
                <div class="flex items-center gap-2">
                  <RadioGroupItem id="statusDiterima" value="Diterima" />
                  <label for="statusDiterima" class="text-sm">Diterima</label>
                </div>
                <div class="flex items-center gap-2">
                  <RadioGroupItem id="statusDitolak" value="Ditolak" />
                  <label for="statusDitolak" class="text-sm">Ditolak</label>
                </div>
              </RadioGroup>
            </div>

            <div class="flex flex-col space-y-1">
              <Label class="text-sm text-gray-600">Alasan Cekal</Label>
              <Select v-model="form.alasanCekal">
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Alasan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nilai Sistole Abnormal">Nilai Sistole Abnormal</SelectItem>
                  <SelectItem value="Nilai Diastole Abnormal">Nilai Diastole Abnormal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div class="flex flex-col md:col-span-2 space-y-1">
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
        Daftar Donor untuk Pemeriksaan fisik
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
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
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

      <!-- 🔹 Patients Search Table -->
      <ScrollArea class="max-h-96">
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
              v-for="(patient, index) in modalPatients"
              :key="patient.id"
              :class="index % 2 === 0 ? 'bg-white' : 'bg-blue-50'"
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
                  class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                  @click="selectPatientFromModal(patient)"
                >
                  Pilih
                </Button>
              </TableCell>
            </TableRow>

            <TableRow v-if="modalPatients.length === 0">
              <TableCell colspan="7" class="text-center text-gray-500">
                No patients found
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ScrollArea>

      <!-- 🔹 Pagination -->
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


    <!-- Modal for Hasil HB -->
    <div v-if="showHbModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div class="bg-white rounded-lg shadow-lg w-4/5 max-h-4/5 overflow-y-auto">

    <!-- 🔹 Top Bar -->
    <div class="flex justify-between items-center p-4 bg-gray-50 border-b">
      <h2 class="text-lg font-semibold text-gray-800">Hasil HB</h2>
      <div class="flex gap-2">
        <Button @click="saveHbData" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
          Simpan
        </Button>
        <Button @click="closeHbModal" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
          Tutup
        </Button>
      </div>
    </div>

    <!-- 🔹 Tabs Navigation -->
    <div class="px-4 pt-4 bg-white border-b flex items-center justify-between">
      <nav class="flex gap-6 text-gray-600">
        <button
          v-for="t in hbTabs"
          :key="t"
          @click="activeHbTab = t"
          class="pb-2 border-b-2 transition-colors"
          :class="activeHbTab === t ? 'border-blue-600 text-blue-600 font-semibold' : 'border-transparent hover:text-blue-500'"
        >
          {{ t }}
        </button>
      </nav>

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

      <!-- 💉 Hasil HB -->
      <div v-if="activeHbTab === 'Hasil HB'" class="space-y-4">
        <div class="bg-white p-4 rounded-lg shadow space-y-3">
          <h3 class="text-lg font-semibold text-gray-800">Hasil HB</h3>
          
      
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <!-- Berat Badan -->
            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Berat Badan</Label>
              <div class="flex items-center">
                <Input v-model="hbForm.beratBadan" class="flex-1 mt-1" />
                <span class="p-2 bg-gray-50 text-gray-600 text-sm border-gray-200">Kg</span>
              </div>
            </div>

            <!-- Tinggi Badan -->
            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Tinggi Badan</Label>
              <div class="flex items-center">
                <Input v-model="hbForm.tinggiBadan" class="flex-1 mt-1" />
                <span class="p-2 bg-gray-50 text-gray-600 text-sm border-gray-200">Cm</span>
              </div>
            </div>

            <!-- Hemoglobin -->
            <div>
              <!-- <VitalInput
                label="Hemoglobin"
                note="Normal: 12.5 - 17.9 g/dL"
                v-model="hbForm.hemoglobin"
                :min="12.5"
                :max="17.9"
              /> -->
              <VitalInput
                label="Hemoglobin"
                :note="hbNote"
                v-model="hbForm.hemoglobin"
                :min="hbMeta.batas_bawah ?? undefined"
                :max="hbMeta.batas_atas ?? undefined"
              />
            </div>

            <!-- Golongan Darah -->
            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Golongan Darah</Label>
              <Select v-model="hbForm.golonganDarah" class="mt-1">
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

            <!-- No Lot Reagen HB -->
            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">No Lot Reagen</Label>
              <Input v-model="hbForm.noLotReagenHb" class="mt-1" />
            </div>

            <!-- Tanggal Expired HB -->
            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Tanggal Expired</Label>
              <Input type="datetime-local" v-model="hbForm.tanggalExpiredHb" class="mt-1" />
            </div>

            <!-- Rhesus -->
            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Rhesus</Label>
              <RadioGroup v-model="hbForm.rhesus" class="flex gap-6 mt-1">
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

            <!-- No Lot Reagen Blood -->
            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">No Lot Reagen</Label>
              <Input v-model="hbForm.noLotReagenBlood" class="mt-1" />
            </div>

            <!-- Tanggal Expired Blood -->
            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Tanggal Expired</Label>
              <Input type="datetime-local" v-model="hbForm.tanggalExpiredBlood" class="mt-1" />
            </div>
          </div>
        </div>
      </div>

      <!-- 🏠 Donasi -->
      <div v-if="activeHbTab === 'Donasi'" class="space-y-4">
        <div class="bg-white p-4 rounded-lg shadow space-y-3">
          <h3 class="text-lg font-semibold text-gray-800">Donasi</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Tanggal Donasi Terakhir</Label>
              <Input type="datetime-local" v-model="hbForm.tanggalDonasiTerakhir" class="mt-1" />
            </div>

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Donasi ke</Label>
              <Input v-model="hbForm.donasiKe" class="mt-1" />
            </div>

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Tempat Donasi Terakhir</Label>
              <Input v-model="hbForm.tempatDonasiTerakhir" class="mt-1" />
            </div>

            <div class="flex flex-col">
              <Label class="text-sm text-gray-600">Lokasi Ambil Darah</Label>
              <Input v-model="hbForm.lokasiAmbilDarah" class="mt-1" />
            </div>

            <div class="flex flex-col md:col-span-2 lg:col-span-2">
              <Label class="text-sm text-gray-600">Catatan</Label>
              <Textarea v-model="hbForm.catatan" rows="3" class="mt-1" />
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>


    <!-- Modal for Hasil Kuisioner -->
    <div
    v-if="showKuisionerModal"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
  >
    <Card class="w-full max-w-4xl max-h-[100vh] flex flex-col shadow-xl">
      <!-- 🔹 Header -->
      <div class="flex items-center justify-between px-6 py-4 bg-gray-50 border-b flex-shrink-0">
        <!-- Left: Title -->
        <h2 class="text-lg font-semibold text-gray-800">Hasil Kuisioner</h2>

        <!-- Middle: Donor info label -->
        <div class="flex-1 flex justify-center">
          <div
            v-if="form.statusCekal === 'Ditolak'"
            class="flex items-center gap-2 px-3 py-2 bg-rose-50 rounded-lg border border-rose-100 shadow-sm"
          >
            <svg class="w-4 h-4 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-sm font-semibold text-rose-800 tracking-tight">
              {{ form.nomorRegistrasi }} - {{ form.namaDonor }}
            </span>
          </div>

          <div
            v-else
            class="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-100 shadow-sm"
          >
            <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-sm font-semibold text-blue-800 tracking-tight">
              {{ form.nomorRegistrasi }} - {{ form.namaDonor }}
            </span>
          </div>
        </div>

        <!-- Right: Action Buttons -->
        <div class="flex gap-2">
          <Button variant="default" class="bg-green-600 hover:bg-green-700" @click="saveKuisionerData">
            Simpan
          </Button>
          <Button variant="destructive" class="bg-red-600 hover:bg-red-700" @click="closeKuisionerModal">
            Tutup
          </Button>
        </div>
      </div>


      <!-- 🔸 Scrollable Content -->
      <ScrollArea class="h-[75vh] p-6 space-y-6">
        <div v-if="!questionnaireData" class="flex items-center justify-center py-10">
          <p class="text-gray-500">Loading...</p>
        </div>

        <div v-else class="space-y-8">
          <!-- 🔹 Questionnaire Groups -->
          <Card v-for="group in questionnaireData.groups.filter(g => g.id !== 99)" :key="group.id" class="border shadow-sm">
            <CardHeader>
              <h3 class="text-lg font-semibold text-gray-800 border-b pb-2">
                {{ group.title }}:
              </h3>
            </CardHeader>
            <CardContent class="space-y-3 mt-3">
              <div
                v-for="q in questionsByGroup(group.id)"
                :key="q.id"
                class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <span class="text-sm font-medium text-gray-600 w-8 flex-shrink-0 mt-1">{{ q.row_num }}.</span>
                <div class="flex-1 min-w-0">
                  <div class="mb-3 text-gray-800 leading-relaxed">
                    {{ q.question }}
                  </div>

                  <RadioGroup v-model="kuisionerAnswers[q.id]" class="flex gap-6">
                    <div class="flex items-center gap-2">
                      <RadioGroupItem :id="'yes-' + q.id" :value="true" class="text-green-600" />
                      <Label :for="'yes-' + q.id" class="text-sm font-medium text-gray-700 cursor-pointer">
                        Ya
                      </Label>
                    </div>
                    <div class="flex items-center gap-2">
                      <RadioGroupItem :id="'no-' + q.id" :value="false" class="text-red-600" />
                      <Label :for="'no-' + q.id" class="text-sm font-medium text-gray-700 cursor-pointer">
                        Tidak
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- 🧾 Informed Consent Section -->
          <Card class="bg-yellow-50 border-yellow-200">
            <CardHeader>
              <h4 class="font-semibold text-gray-800">Informed Consent</h4>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-gray-700 leading-relaxed mb-4">
                {{ questionnaireData.questions.find(q => q.id === 999)?.question || 'Saya telah mendapatkan dan membaca semua informasi yang diberikan dan menjawab pertanyaan dengan jujur.' }}
                 </p>
              <p class="text-sm text-right text-gray-600 mb-4">{{ defaultCity }}, 9 September 2025</p>

              <div class="flex items-center gap-3 p-4 bg-white rounded border">
                <Checkbox v-model:checked="informedConsent" id="consent-check" />
                <Label for="consent-check" class="text-sm font-medium text-gray-700 cursor-pointer">
                  Saya memberikan informed consent untuk donor darah
                </Label>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </Card>
  </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import VitalInput from "../components/VitalInput.vue";
import api from "../lib/axios.js";
import axios from 'axios';
import * as jwt_decode from 'jwt-decode';
//shadcnvue
import { Button } from "@/components/ui/button";
import { RefreshCcw, Plus, Search, Undo2, Save, Unlock, ScrollText, Syringe } from "lucide-vue-next"
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
import { Checkbox } from "@/components/ui/checkbox"
import { toLocalDatetimeInputValue } from '../lib/dateutils.js';

const tabs = ["Identitas", "Hasil Periksa Fisik", "Peruntukan", "Status"];
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
const filterStatus = ref("Periksa Fisik");

// Donor types
const donorTypes = ref([]);

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

// Hasil HB modal related
const showHbModal = ref(false);
const hbTabs = ["Hasil HB", "Donasi"];
const activeHbTab = ref("Hasil HB");

// Hasil Kuisioner modal related
const showKuisionerModal = ref(false);
const questionnaireData = ref(null);
const kuisionerAnswers = ref({});
const informedConsent = ref(true);
const defaultCity = ref('Jakarta');
const hbForm = ref({
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
  lokasiAmbilDarah: '',
  catatan: ''
});

const form = ref({
  tanggalRegistrasi: '',
  nomorRegistrasi: '',
  noKartuDonor: '',
  namaDonor: '',
  jenisKelamin: 'LAKI-LAKI',
  tempatLahir: '',
  tanggalLahir: '',
  umur: '',
  namaPetugas: '',
  sistole: '',
  diastole: '',
  jenisDonor: 'Sukarela',
  peruntukan: 'Internal',
  noRM: '',
  namaPasien: '',
  rumahSakit: '',
  donorApheresis: 'Tidak',
  saranKantongDarah: 'Single',
  statusCekal: 'Diterima',
  alasanCekal: 'Nilai Sistole Abnormal',
  anamnesis: 'Dilakukan',
  catatan: '',
  dokterPemeriksa: ''
})

const hbMeta = ref({
  nilai_normal: null,
  satuan: 'g/dL',
  batas_bawah: null,
  batas_atas: null,
  kritis_bawah: null,
  kritis_atas: null,
  flag: null,
})

const hbNote = computed(() => {
  const b1 = hbMeta.value.batas_bawah
  const b2 = hbMeta.value.batas_atas
  const satuan = hbMeta.value.satuan || 'g/dL'

  if (b1 != null && b2 != null) return `Normal: ${b1} - ${b2} ${satuan}`
  if (hbMeta.value.nilai_normal) return `Normal: ${hbMeta.value.nilai_normal} ${satuan}`
  return `Normal: -`
})

// Patients table related functions
async function fetchPatients(page = 1) {
  currentPage.value = page;
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.value.toString());
  if (filterStatus.value) {
    params.append('status', filterStatus.value);
  } else {
    params.append('status', 'not_registrasi_periksa');
  }
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
  form.value.jenisDonor = 'Sukarela';
  form.value.peruntukan = 'Internal';
  form.value.donorApheresis = 'Tidak';
  form.value.saranKantongDarah = 'Single';
  form.value.statusCekal = 'Diterima';
  form.value.alasanCekal = 'Nilai Sistole Abnormal';
  form.value.anamnesis = 'Dilakukan';

  // Fetch full patient data
  const { data: fullPatient } = await api.get(`/api/patients/${patient.reg_no}`);
  // Populate Identitas tab with patient data
  if (fullPatient.reg_date) {
    const date = new Date(fullPatient.reg_date);
    form.value.tanggalRegistrasi = toLocalDatetimeInputValue(date);
  } else {
    form.value.tanggalRegistrasi = toLocalDatetimeInputValue(new Date());
  }
  form.value.nomorRegistrasi = fullPatient.reg_no || '';
  form.value.noKartuDonor = fullPatient.donor_card_no || '';
  form.value.namaDonor = fullPatient.full_name || '';
  form.value.jenisKelamin = fullPatient.gender || '';
  form.value.tempatLahir = fullPatient.birth_place || '';
  form.value.tanggalLahir = fullPatient.birth_date || '';
  form.value.umur = fullPatient.age ? fullPatient.age.toString() : '';

  // Fetch data from pemeriksaan_fisik for other tabs
  try {
    const { data: fisikData } = await api.get(`/api/pemeriksaan_fisik/${patient.reg_no}`);
    if (fisikData) {
      // Populate Hasil Periksa Fisik, Peruntukan, Status tabs
      form.value.namaPetugas = fisikData.nama_petugas || '';
      form.value.sistole = fisikData.sistole ? fisikData.sistole.toString() : '';
      form.value.diastole = fisikData.diastole ? fisikData.diastole.toString() : '';
      form.value.jenisDonor = fisikData.jenis_donor || '';
      form.value.peruntukan = fisikData.peruntukan || '';
      form.value.noRM = fisikData.no_rm || '';
      form.value.namaPasien = fisikData.nama_pasien || '';
      form.value.rumahSakit = fisikData.rumah_sakit || '';
      form.value.donorApheresis = fisikData.donor_apheresis || '';
      form.value.saranKantongDarah = fisikData.saran_kantong_darah || '';
      form.value.statusCekal = fisikData.status_cekal || '';
      form.value.alasanCekal = fisikData.alasan_cekal || '';
      form.value.anamnesis = fisikData.anamnesis || '';
      form.value.catatan = fisikData.catatan || '';
      form.value.dokterPemeriksa = fisikData.dokter_pemeriksa || '';
    }
  } catch (error) {
    // No data in pemeriksaan_fisik, leave other fields empty
  }

  // Fetch hb_golongan_darah data to check jenis_donor
  try {
    const { data: hbData } = await api.get(`/api/hb_golongan_darah/${patient.reg_no}`);
    if (hbData && !hbData.jenis_donor && fullPatient.donor_type) {
      form.value.jenisDonor = fullPatient.donor_type;
    }
  } catch (error) {
    // No data in hb_golongan_darah
  }

  // If dokterPemeriksa is empty, fill with logged-in user
  if (!form.value.dokterPemeriksa) {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.username) {
      form.value.dokterPemeriksa = currentUser.username;
    }
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


function refreshData() {
  console.log('Refresh clicked')
  fetchPatients(1)
}

async function hasilHb() {
  console.log('Hasil HB clicked')
  //console.log('Undo clicked')
  if (!form.value.nomorRegistrasi) {
    alert('Silahkan pilih data donor terlebih dahulu')
    return
  }

  showHbModal.value = true;
  activeHbTab.value = "Hasil HB";
  // Load existing data if available
  if (form.value.nomorRegistrasi) {
    try {
      hbMeta.value = {
              nilai_normal: null,
              satuan: 'g/dL',
              batas_bawah: null,
              batas_atas: null,
              kritis_bawah: null,
              kritis_atas: null,
              flag: null,
            }

      const { data } = await api.get(`/api/hb_golongan_darah/${form.value.nomorRegistrasi}`);
      if (data) {
        hbForm.value.beratBadan = data.berat_badan ? data.berat_badan.toString() : '';
        hbForm.value.tinggiBadan = data.tinggi_badan ? data.tinggi_badan.toString() : '';
        hbForm.value.hemoglobin = data.hemoglobin ? data.hemoglobin.toString() : '';
        hbForm.value.golonganDarah = data.golongan_darah || 'A';
        hbForm.value.noLotReagenHb = data.no_lot_reagen_hb || '';
        hbForm.value.tanggalExpiredHb = data.tanggal_expired_hb ? new Date(data.tanggal_expired_hb).toISOString().slice(0, 16) : '';
        hbForm.value.rhesus = data.rhesus || 'Negatif';
        hbForm.value.noLotReagenBlood = data.no_lot_reagen_blood || '';
        hbForm.value.tanggalExpiredBlood = data.tanggal_expired_blood ? new Date(data.tanggal_expired_blood).toISOString().slice(0, 16) : '';
        hbForm.value.tanggalDonasiTerakhir = data.tanggal_donasi_terakhir ? new Date(data.tanggal_donasi_terakhir).toISOString().slice(0, 16) : '';
        hbForm.value.donasiKe = data.donasi_ke ? data.donasi_ke.toString() : '';
        hbForm.value.tempatDonasiTerakhir = data.tempat_donasi_terakhir || '';
        hbForm.value.lokasiAmbilDarah = data.lokasi_ambil_darah || '';
        hbForm.value.catatan = data.catatan || '';
        //nilai normal hb
        hbMeta.value.flag = data.flag ?? null
        hbMeta.value.nilai_normal = data.nilai_normal ?? '12.5 - 17.9'
        hbMeta.value.satuan = data.satuan ?? 'g/dL'
        hbMeta.value.batas_bawah = data.batas_bawah ?? 12.5
        hbMeta.value.batas_atas = data.batas_atas ?? 17.9
        hbMeta.value.kritis_bawah = data.kritis_bawah ?? null
        hbMeta.value.kritis_atas = data.kritis_atas ?? null

      }
    } catch (err) {
      console.error('Error loading HB data:', err);
    }
  }
}

function questionsByGroup(groupId) {
  return questionnaireData.value.questions.filter(q => q.group_id === groupId && q.id !== 999);
}

async function hasilKuisioner() {
  console.log('Hasil Kuisioner clicked')

  // Validate that a patient is selected
  if (!form.value.nomorRegistrasi) {
    alert('Silakan pilih data donor terlebih dahulu');
    return;
  }

  showKuisionerModal.value = true;
  questionnaireData.value = null; // Reset loading state

  // Fetch questionnaire data first
  try {
    const { data } = await api.get('/api/questionnaire');
    questionnaireData.value = data;
    console.log('Questionnaire data loaded:', data);

    // Initialize answers with defaults
    kuisionerAnswers.value = {};
    //informedConsent.value = true;

    // Set defaults based on default_yes
    data.questions.forEach(q => {
      kuisionerAnswers.value[q.id] = q.default_yes ? true : null;
    });

    // Load existing answers for the selected patient using regno
    const regno = form.value.nomorRegistrasi;
    console.log('Loading answers for regno:', regno);

    try {
      const answersResponse = await api.get(`/api/questionnaire_responses/${regno}`);
      const answers = answersResponse.data;
      console.log('Existing answers loaded:', answers);

      // Override defaults with existing answers
      if (answers && answers.length > 0) {
        answers.forEach(ans => {
          kuisionerAnswers.value[ans.questionnaire_id] = ans.answer;
        });

        // Pre-fill informed consent checkbox with answer from questionnaire_id=999
        const consentAnswer = answers.find(ans => ans.questionnaire_id === 999);
        if (consentAnswer !== undefined) {
          informedConsent.value = Boolean(consentAnswer.answer);
          console.log('informed consent checkbox:', informedConsent.value, typeof  informedConsent.value );
        }
      }
    } catch (answersError) {
      if (answersError.response?.status === 404) {
        console.log('No existing answers found for this patient');
      } else {
        throw answersError;
      }
    }

    // Fetch default city from app_config
    try {
      const { data: configData } = await api.get('/api/config/default_city');
      defaultCity.value = configData.default_city || 'Jakarta';
    } catch (configError) {
      console.error('Error loading default city:', configError);
      defaultCity.value = 'Jakarta';
    }

    // Note: informed_consent is not stored separately in the current schema
    // It would need to be added to the database schema if we want to persist it
  } catch (err) {
    console.error('Error loading questionnaire data:', err);
    alert('Error loading questionnaire data: ' + err.message);
    closeKuisionerModal();
  }
}

async function saveKuisionerData() {
  //console.log('Save Kuisioner Data clicked');

  // Validate patient selection
  if (!form.value.nomorRegistrasi) {
    alert('Silahkan pilih data donor terlebih dahulu');
    return;
  }

  // Validate informed consent
  if (!informedConsent.value) {
    alert('Harap centang informed consent sebelum menyimpan');
    return;
  }

  // Filter and validate answers - only include answered questions
  const validAnswers = Object.entries(kuisionerAnswers.value)
    .filter(([qid, answer]) => answer !== null && answer !== undefined)
    .map(([qid, answer]) => [parseInt(qid), Boolean(answer)]);

  console.log('Valid answers to save:', validAnswers);

  // Check if we have any answers to save
  if (validAnswers.length === 0) {
    alert('Tidak ada jawaban yang valid untuk disimpan');
    return;
  }

  const payload = {
    reg_no: form.value.nomorRegistrasi,
    answers: validAnswers,
    informed_consent: informedConsent.value
  };

  console.log('Payload to send:', payload);

  try {
    const { data } = await api.post('/api/questionnaire/submit', payload);
    console.log('Save response:', data);
    alert(data.message || 'Data saved successfully');
    // Insert into activity_log
    const userStr = localStorage.getItem("user");
    let userid = null;
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.username) {
        userid = user.username;
      }
    }
    try {
      await api.post('/api/activity_log', {
        note: 'Update Data Kuisioner',
        userid: userid,
        pid: form.value.noKartuDonor,
        regno: form.value.nomorRegistrasi,
        menu: 'Pemeriksaan Fisik'
      });
    } catch (err) {
      console.error('Error logging activity:', err);
    }
    closeKuisionerModal();
  } catch (err) {
    console.error('Error saving data:', err);
    alert('Error saving data: ' + err.message);
  }
}

function closeKuisionerModal() {
  showKuisionerModal.value = false;
}

async function undo() {
  if (!form.value.nomorRegistrasi) {
    alert('Silahkan pilih data donor terlebih dahulu');
    return;
  }

  try {
    // First call the undo endpoint to set release_by to null
    const undoResponse = await api.put(`/api/pemeriksaan_fisik/undo/${form.value.nomorRegistrasi}`);
    const undoData = undoResponse.data;
    console.log('Undo response:', undoData);
    if (undoData.status === 'ok') {
      // Update patient status
      const statusResponse = await api.put(`/api/patients/${form.value.nomorRegistrasi}/status`, { status: 'Periksa Fisik' });
      console.log('Undo status update response:', statusResponse.data);

      // Update pemeriksaan_fisik status_cekal to 'Diterima'
      const updateData = {
        nomor_registrasi: form.value.nomorRegistrasi,
        status_cekal: 'Diterima'
      };
      const fisikResponse = await api.post('/api/pemeriksaan_fisik', updateData);
      console.log('Pemeriksaan fisik update response:', fisikResponse.data);

      // Delete from log_cekal if exists
      try {
        const deleteResponse = await api.delete(`/api/log_cekal?nomor_registrasi=${form.value.nomorRegistrasi}&menu=Periksa%20Fisik`);
        console.log('Log cekal delete response:', deleteResponse.data);
      } catch (err) {
        console.error('Error deleting log_cekal:', err);
      }

      alert('Status berhasil diundo ke Periksa Fisik');
      // Insert into activity_log
      const userStr = localStorage.getItem("user");
      let userid = null;
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user.username) {
          userid = user.username;
        }
      }
      try {
        await api.post('/api/activity_log', {
          note: 'Undo',
          userid: userid,
          pid: form.value.noKartuDonor,
          regno: form.value.nomorRegistrasi,
          menu: 'Pemeriksaan Fisik'
        });
      } catch (err) {
        console.error('Error logging activity:', err);
      }
      fetchPatients(1);
    } else {
      throw new Error(undoData.message || 'Gagal undo pemeriksaan fisik data');
    }
  } catch (err) {
    console.error('Error updating:', err);
    alert('Error updating status');
  }
}

async function simpanData() {
  if (!form.value.nomorRegistrasi) {
    alert('Silahkan pilih data donor terlebih dahulu');
    return;
  }
  // Prepare data
  const data = {
    nomor_registrasi: form.value.nomorRegistrasi,
    nama_petugas: form.value.namaPetugas,
    sistole: form.value.sistole ? parseInt(form.value.sistole) : null,
    diastole: form.value.diastole ? parseInt(form.value.diastole) : null,
    jenis_donor: form.value.jenisDonor,
    peruntukan: form.value.peruntukan,
    no_rm: form.value.noRM,
    nama_pasien: form.value.namaPasien,
    rumah_sakit: form.value.rumahSakit,
    donor_apheresis: form.value.donorApheresis,
    saran_kantong_darah: form.value.saranKantongDarah,
    status_cekal: form.value.statusCekal,
    alasan_cekal: form.value.alasanCekal,
    anamnesis: form.value.anamnesis,
    catatan: form.value.catatan,
    dokter_pemeriksa: form.value.dokterPemeriksa
  };

  try {
    const { data: saveResponse } = await api.post('/api/pemeriksaan_fisik', data);
    console.log('Save response:', saveResponse);
    alert('Data berhasil disimpan');

    // Insert into activity_log
    const userStr = localStorage.getItem("user");
    let userid = null;
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.username) {
        userid = user.username;
      }
    }
    try {
      await api.post('/api/activity_log', {
        note: 'Simpan Data',
        userid: userid,
        pid: form.value.noKartuDonor,
        regno: form.value.nomorRegistrasi,
        menu: 'Pemeriksaan Fisik'
      });
    } catch (err) {
      console.error('Error logging activity:', err);
    }

    // Update patients table with saran_kantong
    try {
      const patientResponse = await api.put('/api/patients', { regno: form.value.nomorRegistrasi, saran_kantong: form.value.saranKantongDarah });
      console.log('Patient update response:', patientResponse.data);
    } catch (err) {
      console.error('Error updating patient:', err);
    }

    if (form.value.statusCekal === 'Ditolak') {
      try {
        const statusResponse = await api.put(`/api/patients/${form.value.nomorRegistrasi}/status`, { status: 'Ditolak' });
        console.log('Status update response:', statusResponse.data);
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
        alasan: form.value.alasanCekal,
        menu: "Periksa Fisik",
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
    fetchPatients(1);
  } catch (err) {
    console.error('Error saving data:', err);
    alert('Error saving data');
  }
}

async function checkTokenValidity() {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No access token found');
  }
  try {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // Token expired, try to refresh
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        throw new Error('No refresh token found');
      }
      const response = await axios.post(`${api.defaults.baseURL}/api/auth/refresh`, {
        refresh_token: refreshToken,
      });
      const newAccessToken = response.data.access_token;
      localStorage.setItem('access_token', newAccessToken);
      console.log('Token refreshed successfully');
    }
  } catch (error) {
    console.error('Token check/refresh failed:', error);
    // Redirect to login if refresh fails
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
    throw error;
  }
}

async function releaseData() {
  if (!form.value.nomorRegistrasi) {
    alert('Silakan pilih data donor terlebih dahulu');
    return;
  }

  // Check token validity before proceeding
  // try {
  //   await checkTokenValidity();
  // } catch (error) {
  //   alert('Session expired. Please login again.');
  //   return;
  // }

  // First save the data
  const data = {
    nomor_registrasi: form.value.nomorRegistrasi,
    nama_petugas: form.value.namaPetugas,
    sistole: form.value.sistole ? parseInt(form.value.sistole) : null,
    diastole: form.value.diastole ? parseInt(form.value.diastole) : null,
    jenis_donor: form.value.jenisDonor,
    peruntukan: form.value.peruntukan,
    no_rm: form.value.noRM,
    nama_pasien: form.value.namaPasien,
    rumah_sakit: form.value.rumahSakit,
    donor_apheresis: form.value.donorApheresis,
    saran_kantong_darah: form.value.saranKantongDarah,
    status_cekal: form.value.statusCekal,
    alasan_cekal: form.value.alasanCekal,
    anamnesis: form.value.anamnesis,
    catatan: form.value.catatan,
    dokter_pemeriksa: form.value.dokterPemeriksa
  };

  try {
    const saveResponse = await api.post('/api/pemeriksaan_fisik', data);
    const saveData = saveResponse.data;
    console.log('Save response:', saveData);
    if (saveData.status === 'ok') {
      // Now call the release endpoint
      const releaseResponse = await api.put(`/api/pemeriksaan_fisik/release/${form.value.nomorRegistrasi}`);
      const releaseData = releaseResponse.data;
      console.log('Release response:', releaseData);
      if (releaseData.status === 'ok') {
        // Update patient status based on statusCekal
        const newStatus = form.value.statusCekal === 'Ditolak' ? 'Ditolak' : 'Ambil Darah';
        const statusResponse = await api.put(`/api/patients/${form.value.nomorRegistrasi}/status`, { status: newStatus });
        const statusData = statusResponse.data;
        console.log('Status update response:', statusData);

        // Update patients table with saran_kantong
        try {
          const patientResponse = await api.put('/api/patients', { regno: form.value.nomorRegistrasi, saran_kantong: form.value.saranKantongDarah });
          console.log('Patient update response:', patientResponse.data);
        } catch (err) {
          console.error('Error updating patient:', err);
        }

        // If statusCekal is 'Ditolak', insert into log_cekal
        if (form.value.statusCekal === 'Ditolak') {
          const currentUser = getCurrentUser();
          const logData = {
            nomor_registrasi: form.value.nomorRegistrasi,
            no_barcode: null,
            no_kartu_donor: form.value.noKartuDonor,
            petugas: currentUser.username,
            alasan: form.value.alasanCekal,
            menu: "Periksa Fisik",
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

        alert('Data berhasil direlease');
        // Insert into activity_log
        const userStr = localStorage.getItem("user");
        let userid = null;
        if (userStr) {
          const user = JSON.parse(userStr);
          if (user.username) {
            userid = user.username;
          }
        }
        try {
          await api.post('/api/activity_log', {
            note: 'Release Data',
            userid: userid,
            pid: form.value.noKartuDonor,
            regno: form.value.nomorRegistrasi,
            menu: 'Pemeriksaan Fisik'
          });
        } catch (err) {
          console.error('Error logging activity:', err);
        }
        fetchPatients(1);
      } else {
        throw new Error(releaseData.message || 'Failed to release pemeriksaan fisik data');
      }
    } else {
      throw new Error(saveData.message || 'Failed to save pemeriksaan fisik data');
    }
  } catch (err) {
    console.error('Error:', err);
    alert('Error: ' + err.message);
  }
}

function cariDataRegistrasi() {
  showModal.value = true;
  modalCurrentPage.value = 1;
  fetchModalPatients(1);
}

async function fetchModalPatients(page = 1) {
  modalCurrentPage.value = page;
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.value.toString());
  params.append('status', 'not_registrasi_periksa');
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

async function saveHbData() {
  if (!form.value.nomorRegistrasi) {
    alert('Silahkan pilih data donor terlebih dahulu');
    return;
  }
  const data = {
    tanggal_registrasi: form.value.tanggalRegistrasi || null,
    nomor_registrasi: form.value.nomorRegistrasi,
    no_kartu_donor: form.value.noKartuDonor || null,
    nama_donor: form.value.namaDonor || null,
    jenis_kelamin: form.value.jenisKelamin || null,
    tempat_lahir: form.value.tempatLahir || null,
    tanggal_lahir: form.value.tanggalLahir || null,
    umur: form.value.umur || null,
    nama_petugas: form.value.namaPetugas || null,
    berat_badan: hbForm.value.beratBadan ? parseFloat(hbForm.value.beratBadan) : null,
    tinggi_badan: hbForm.value.tinggiBadan ? parseFloat(hbForm.value.tinggiBadan) : null,
    hemoglobin: hbForm.value.hemoglobin ? parseFloat(hbForm.value.hemoglobin) : null,
    golongan_darah: hbForm.value.golonganDarah || null,
    no_lot_reagen_hb: hbForm.value.noLotReagenHb || null,
    tanggal_expired_hb: hbForm.value.tanggalExpiredHb || null,
    rhesus: hbForm.value.rhesus || null,
    no_lot_reagen_blood: hbForm.value.noLotReagenBlood || null,
    tanggal_expired_blood: hbForm.value.tanggalExpiredBlood || null,
    tanggal_donasi_terakhir: hbForm.value.tanggalDonasiTerakhir || null,
    donasi_ke: hbForm.value.donasiKe ? parseInt(hbForm.value.donasiKe) : null,
    tempat_donasi_terakhir: hbForm.value.tempatDonasiTerakhir || null,
    lokasi_ambil_darah: hbForm.value.lokasiAmbilDarah || null,
    status_cekal: form.value.statusCekal || null,
    alasan_cekal: form.value.alasanCekal || null,
    catatan: hbForm.value.catatan || null,
  };

  try {
    const { data: response } = await api.put('/api/hb_golongan_darah', data);
    console.log('HB Save response:', response);
    alert('Data berhasil disimpan');
    // Insert into activity_log
    const userStr = localStorage.getItem("user");
    let userid = null;
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.username) {
        userid = user.username;
      }
    }
    try {
      await api.post('/api/activity_log', {
        note: 'Update Hasil HB',
        userid: userid,
        pid: form.value.noKartuDonor,
        regno: form.value.nomorRegistrasi,
        menu: 'Pemeriksaan Fisik'
      });
    } catch (err) {
      console.error('Error logging activity:', err);
    }
    fetchPatients(1);
    closeHbModal();
  } catch (err) {
    console.error('Error saving HB data:', err);
    alert('Error saving data');
  }
}

function closeHbModal() {
  showHbModal.value = false;
}

// Load patients on component mount
onMounted(() => {
  fetchPatients(1);
  fetchDonorTypes();
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
  filterStatus.value = "Periksa Fisik";
  currentPage.value = 1;
  fetchPatients(1);
}

function applyFilters() {
  currentPage.value = 1;
  fetchPatients(1);
}

async function fetchDonorTypes() {
  try {
    const { data } = await api.get('/api/donor_types');
    donorTypes.value = data.data;
  } catch (err) {
    console.error('Error fetching donor types:', err);
  }
}
</script>