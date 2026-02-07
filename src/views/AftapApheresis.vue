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
        <!--
        <Button @click="printBarcode" class="flex items-center gap-2 bg-indigo-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          <Barcode class="w-5 h-5" />
          Cetak Barcode
        </Button>
        -->
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
  
    <!-- 🧑 Identitas Donor -->
    <TabsContent value="Identitas" class="space-y-4">
      <div class="bg-white p-4 rounded-lg shadow space-y-3">
        <h3 class="text-lg font-semibold text-gray-800">Aftap Donor Apheresis</h3>
        
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
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
  
          <div class="flex flex-col  space-y-1">
            <Label class="text-sm text-gray-600">No Barcode (digenerate otomatis)</Label>
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
  <!--
          <div class="flex flex-col space-y-1">
            <Label class="text-sm text-gray-600">No Blood Mixer</Label>
            <Input v-model="form.noBloodMixer" />
          </div>
  -->
          <!-- New Input-->
          <div class="flex flex-col space-y-1">
            <Label class="text-sm text-gray-600">Nama Alat Apheresis</Label>
            <Input v-model="form.nama_alat" />
          </div>
          <div class="flex flex-col space-y-1">
            <Label class="text-sm text-gray-600">Nama Reagen</Label>
            <Input v-model="form.reagen_alat" />
          </div>
          <div class="flex flex-col space-y-1">
            <Label class="text-sm text-gray-600">Nomor Lot</Label>
            <Input v-model="form.no_lot_alat" />
          </div>
          <div class="flex flex-col space-y-1">
            <Label class="text-sm text-gray-600">Expired Date</Label>
            <Input type="date" v-model="form.expired_alat" />
          </div>
          <!--
          <div class="flex flex-col space-y-1">
            <Label class="text-sm text-gray-600">Jenis Komponen yang diambil</Label>
            <Select v-model="form.jenis_komponen">
              <SelectTrigger><SelectValue placeholder="Pilih Jenis Komponen" /></SelectTrigger>
              <SelectContent>
                <SelectItem v-for="komponen in komponenOptions" :key="komponen.nama" :value="komponen.nama">
                  {{ komponen.nama }}
                </SelectItem>
              </SelectContent>
            </Select>
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
            <Label class="text-sm text-gray-600">Volume Darah yang diolah</Label>
            <div class="flex items-center">
              <Input v-model="form.volumeDarah" />
              <span class="px-3 py-2 bg-gray-100 text-sm rounded-r">mL</span>
            </div>
          </div>
          
          <div class="flex flex-col space-y-1">
            <Label class="text-sm text-gray-600">Volume Antikoagulan</Label>
            <div class="flex items-center">
              <Input v-model="form.volume_antikoagulan" />
              <span class="px-3 py-2 bg-gray-100 text-sm rounded-r">mL</span>
            </div>
          </div>
          
          <div class="flex flex-col space-y-1">
            <Label class="text-sm text-gray-600">Estimated Blood Loss</Label>
            <div class="flex items-center">
              <Input v-model="form.volume_ebl" />
              <span class="px-3 py-2 bg-gray-100 text-sm rounded-r">mL</span>
            </div>
          </div>

          <div class="flex flex-col space-y-1">
            <Label class="text-sm text-gray-600">Volume yang dikembalikan</Label>
            <div class="flex items-center">
              <Input v-model="form.volume_return" />
              <span class="px-3 py-2 bg-gray-100 text-sm rounded-r">mL</span>
            </div>
          </div>

          <!--<div class="flex flex-col space-y-1">
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


          -->
          <div class="flex flex-col space-y-1">
            <Label class="text-sm text-gray-600">Jenis Kantong Darah</Label>
            <Select v-model="form.jenisKantongDarah">
              <SelectTrigger><SelectValue placeholder="Pilih Jenis" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="SingleApheresis">Single Apheresis</SelectItem>
                  <SelectItem value="DoubleApheresis">Double Apheresis</SelectItem>
                  <SelectItem value="TripleApheresis">Triple Apheresis</SelectItem>
                  <SelectItem value="QuadrupleApheresis">Quadruple Apheresis</SelectItem>
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
          <!--
          <div class="flex flex-col space-y-1">
            <Label class="text-sm text-gray-600">Jenis Komponen yang diambil</Label>
            <Select v-model="form.jenis_komponen">
              <SelectTrigger><SelectValue placeholder="Pilih Jenis Komponen" /></SelectTrigger>
              <SelectContent>
                <SelectItem v-for="komponen in komponenOptions" :key="komponen.nama" :value="komponen.nama">
                  {{ komponen.nama }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          
          <div class="flex flex-col space-y-1">
            <Label class="text-sm text-gray-600">Volume Apheresis</Label>
            <div class="flex items-center">
              <Input v-model="form.volumeApheresis" class="flex-1" />
              <span class="px-3 py-2 bg-gray-100 text-sm rounded-r">mL</span>
            </div>
          </div>
          -->

        </div>
      </div>
    </TabsContent>

    <!-- 🩸 Komponen Apheresis -->
    <TabsContent value="Komponen Apheresis" class="space-y-4">
      <div class="bg-white p-4 rounded-lg shadow space-y-4">
 <!--
        <h3 class="text-lg font-semibold text-gray-800">Komponen Apheresis</h3>

   
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    
  </div>
-->

  <!-- 🔹 Apheresis Grid Card -->
  <Card class="mt-0 p-4 shadow-md border rounded-2xl bg-background">
    <!-- Header -->
    <CardHeader class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b px-4 py-4">
      <div>
        <h3 class="text-xl font-semibold text-foreground tracking-tight">
          Data Detail Komponen Apheresis
        </h3>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <Button
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          @click="tambah"
        >
          Tambah
        </Button>
      </div>
    </CardHeader>

    <!-- Table -->
    <CardContent class="p-0 overflow-x-auto">
      <Table class="min-w-full">
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

    <!-- Footer / Pagination -->
    <CardFooter
      class="flex flex-col sm:flex-row justify-between items-center gap-3 py-4 px-6 border-t bg-muted/30"
    >
      <span class="font-medium text-muted-foreground text-sm">
        Halaman {{ currentDetailPage }} dari {{ totalDetailPages }}
      </span>

      <div class="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          class="px-3 py-1"
          @click="prevDetailPage"
          :disabled="currentDetailPage === 1"
        >
          Previous
        </Button>

        <span
          v-for="page in detailPages"
          :key="page"
          @click="goToDetailPage(page)"
          :class="[
            'px-3 py-1 cursor-pointer rounded',
            currentDetailPage === page
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200'
          ]"
        >
          {{ page }}
        </span>

        <Button
          variant="outline"
          size="sm"
          class="px-3 py-1"
          @click="nextDetailPage"
          :disabled="currentDetailPage === totalDetailPages"
        >
          Next
        </Button>
      </div>
    </CardFooter>
  </Card>
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
            type="date"
            class="border border-gray-300 rounded-lg px-3 py-2 w-40 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <!-- Search by No Registrasi -->
        <div class="flex items-center gap-2">
          <input
            v-model="searchNoReg"
            type="text"
            placeholder="Cari No Registrasi..."
            class="border border-gray-300 rounded-lg px-3 py-2 w-40 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <!-- Search by Nama -->
        <div class="flex items-center gap-2">
          <input
            v-model="searchNama"
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

        <!-- Filter Donor Type 
        <div class="flex items-center gap-2">
          <select
            v-model="filterDonorType"
            @change="applyFilters"
            class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Donor Type</option>
            <option value="Donor Apheresis">Donor Apheresis</option>
            <option value="Donor Biasa">Donor Biasa</option>
          </select>
        </div>
        -->

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
                <SelectItem value="proses">Proses</SelectItem>
                <SelectItem value="selesai">Selesai</SelectItem>
                <SelectItem value="reject">Reject</SelectItem>
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
            <button @click="printBarcode" class="no-print bg-blue-600 text-white px-4 py-2 rounded mr-2">Print</button>
            <button @click="closeBarcodeModal" class="no-print bg-red-600 text-white px-4 py-2 rounded">Tutup</button>
          </div>
        </div>
      </div>
  
      <!-- Modal for Komponen List -->
      <div
        v-if="showKomponenModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <Card class="w-3/4 max-h-[80vh] overflow-y-auto">
          <CardHeader>
            <div class="flex justify-between items-center">
              <CardTitle class="text-lg font-semibold text-gray-800">
                Pilih Komponen
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
            <Table>
              <TableHeader class="bg-gray-100">
                <TableRow>
                  <TableHead class="font-semibold text-gray-800">Kode</TableHead>
                  <TableHead class="font-semibold text-gray-800">Nama Komponen</TableHead>
                  <TableHead class="font-semibold text-gray-800">Action</TableHead>
                </TableRow>
              </TableHeader>
  
              <TableBody>
                <TableRow
                  v-for="komponen in komponenList"
                  :key="komponen.kode"
                  class="hover:bg-gray-50"
                >
                  <TableCell>{{ komponen.kode }}</TableCell>
                  <TableCell>{{ komponen.nama }}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg"
                      @click="selectKomponen(komponen)"
                    >
                      Pilih
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>/
          </CardContent>
        </Card>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import VueBarcode from '@chenfengyuan/vue-barcode'
  //shadcnvue
  import { Button } from "@/components/ui/button"; 
  import { RefreshCcw, Plus, Search, Undo2, Save, Unlock, Barcode, Trash2, Printer, SquarePen } from "lucide-vue-next"
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
  import api from "../lib/axios.js";
  
  const tabs = ["Identitas", "Informasi Kantong Darah", "Komponen Apheresis", "Kondisi Kantong Darah", "Status"];
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
    selang: 'Tidak Cacat',

    // New fields
    nama_alat: '',
    reagen_alat: '',
    no_lot_alat: '',
    expired_alat: '',
    jenis_komponen: '',
    volume_antikoagulan: '',
    volume_ebl: '',
    volume_return: ''
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
  const filterDonorType = ref("Donor Apheresis");
  
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

  // Apheresis detail grid variables
  const detailList = ref([]);
  const currentDetailPage = ref(1);
  const detailPageSize = 5;
  const totalDetailPages = computed(() => Math.ceil(detailList.value.length / detailPageSize));
  const paginatedDetailList = computed(() => {
    const start = (currentDetailPage.value - 1) * detailPageSize;
    return detailList.value.slice(start, start + detailPageSize);
  });
  const detailPages = computed(() => Array.from({ length: totalDetailPages.value }, (_, i) => i + 1));

  // Modals for apheresis detail
  const showKomponenModal = ref(false);
  const komponenList = ref([]);
  const showEditModal = ref(false);
  const editForm = ref({
    id: '',
    tanggal_pengolahan: '',
    nomor_kantong: '',
    volume: '',
    status_pengolahan: '',
    alasan_reject: ''
  });

  // Komponen options
  const komponenOptions = ref([]);
  
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
  
  function fetchPatients(page = 1) {
    currentPage.value = page;
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.value.toString());
    if (filterStatus.value) {
      params.append('status', filterStatus.value);
    } else {
      params.append('status', 'not_registrasi_aftap');
    }
    if (filterDonorType.value) params.append('donor_type', filterDonorType.value);
    if (searchNoReg.value) params.append('reg_no', searchNoReg.value);
    if (searchNama.value) params.append('full_name', searchNama.value);
    if (searchRegDate.value) params.append('reg_date', searchRegDate.value);
    api.get(`/api/patients?${params.toString()}`)
      .then(res => {
        patients.value = res.data.data;
        total.value = res.data.total;
      })
      .catch(err => console.error('Error fetching patients:', err));
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
  
  function selectPatient(patient) {
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
    api.get(`/api/patients/${patient.reg_no}`)
      .then(res => {
        const fullPatient = res.data;
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
        return api.get(`/api/hb_golongan_darah/${patient.reg_no}`);
      })
      .then(res => {
        if (res.status === 200) {
          return res.data;
        } else {
          // No data in hb_golongan_darah, leave other fields empty
          return null;
        }
      })
      .then(hbData => {
        if (hbData) {
          // Populate fields from hb_golongan_darah
          form.value.namaPetugas = hbData.nama_petugas || '';
          form.value.golonganDarah = hbData.golongan_darah || '';
          form.value.rhesus = hbData.rhesus || '';
        }

        // Fetch data from aftap_apheresis for additional tabs
        return api.get(`/api/aftap_apheresis/${patient.reg_no}`);
      })
      .then(res => {
        if (res.status === 200) {
          return res.data;
        } else {
          // No data in aftap_apheresis, leave fields empty
          return null;
        }
      })
      .then(aftapData => {
        if (aftapData) {
          // Populate Informasi Kantong Darah tab
          form.value.noBarcode = aftapData.no_barcode || form.value.nomorRegistrasi.slice(3) || '';
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
          form.value.jenisKantongDarah = aftapData.jenis_kantong_darah || form.value.saranKantong || 'Single';
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

          // Populate new fields
          form.value.nama_alat = aftapData.nama_alat || '';
          form.value.reagen_alat = aftapData.reagen_alat || '';
          form.value.no_lot_alat = aftapData.no_lot_alat || '';
          form.value.expired_alat = aftapData.expired_alat || '';
          form.value.jenis_komponen = aftapData.jenis_komponen || '';
          form.value.volume_antikoagulan = aftapData.volume_antikoagulan || '';
          form.value.volume_ebl = aftapData.volume_ebl || '';
          form.value.volume_return = aftapData.volume_return || '';

          fetchDetailList();
        }
      })
      .catch(err => {
        console.error('Error:', err);
      })
      .finally(() => {
        // Set default tanggalAftap to now if empty
        if (!form.value.tanggalAftap) {
          const date = new Date();
          date.setHours(date.getHours() + 7); // Adjust to Asia/Bangkok timezone (UTC+7)
          form.value.tanggalAftap = date.toISOString().slice(0, 16);
        }
      });
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

  function fetchModalPatients(page = 1) {
    modalCurrentPage.value = page;
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.value.toString());
    params.append('status', 'not_registrasi_aftap');
    if (searchNoKartuDonor.value) params.append('donor_card_no', searchNoKartuDonor.value);
    if (searchNoRegistrasi.value) params.append('reg_no', searchNoRegistrasi.value);
    if (modalSearchNama.value) params.append('full_name', modalSearchNama.value);
    api.get(`/api/patients?${params.toString()}`)
      .then(res => {
        modalPatients.value = res.data.data;
        modalTotal.value = res.data.total;
      })
      .catch(err => console.error('Error fetching modal patients:', err));
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
    try {
      console.log('Undo clicked')

      const token = localStorage.getItem('token');

      const nomorRegistrasi = form.value.nomorRegistrasi
      if (!nomorRegistrasi) {
        alert('Tidak ada data pasien yang dipilih')
        return
      }

      // Update patient status to 'Ambil Darah'
      const response = await api.put(`/api/patients/${nomorRegistrasi}/status`, { status: 'Ambil Darah' })
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = response.data
      console.log('Patient status updated to Ambil Darah:', data)

      // Update aftap_apheresis status_labu_darah to 'Diterima' and status to 'N', set release_by to null
      const updateData = {
        nomor_registrasi: nomorRegistrasi,
        status_labu_darah: 'Diterima',
        status: 'N',
        release_by: null
      }
      const res = await api.put('/api/aftap_apheresis/undo', updateData)
      const aftapData = res.data
      console.log('Pemeriksaan aftap update response:', aftapData)

      // Delete from log_cekal if exists
      let stokUpdate;
      try {
        const deleteData = await api.delete(`/api/log_cekal?nomor_registrasi=${nomorRegistrasi}&menu=Ambil%20Darah`)
        console.log('Log cekal delete response:', deleteData.data)
        // Update stok_darah status to 'Batal'
        stokUpdate = await updateStokDarahStatus(nomorRegistrasi, 'Batal');
      } catch (err) {
        console.error('Error deleting log_cekal:', err)
        // Even if delete fails, continue to update stok_darah
        stokUpdate = await updateStokDarahStatus(nomorRegistrasi, 'Batal');
      }

      console.log('Stok darah status updated to Batal:', stokUpdate)

      alert('Status pasien berhasil diubah menjadi Ambil Darah dan data diperbarui!')
      refreshData()

      // Log activity
      try {
        const user = getCurrentUser();
        const logData = {
          note: 'Undo',
          userid: user.username,
          pid: form.value.noKartuDonor,
          regno: form.value.nomorRegistrasi,
          menu: 'Pemeriksaan Aftap'
        };
        const activityRes = await api.post('/api/activity_log', logData)
        console.log('Activity logged:', activityRes.data);
      } catch (err) {
        console.error('Error logging activity:', err);
      }
    } catch (error) {
      console.error('Error updating:', error)
      alert('Terjadi kesalahan saat mengubah status: ' + error.message)
    }
  }
  
  async function simpanData() {
    try {
      console.log('Simpan Data clicked', form.value)

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
        status: 'N',
        alasan: form.value.alasan || null,
        catatan: form.value.catatan || null,
        nama_alat: form.value.nama_alat || null,
        reagen_alat: form.value.reagen_alat || null,
        no_lot_alat: form.value.no_lot_alat || null,
        expired_alat: form.value.expired_alat || null,
        jenis_komponen: form.value.jenis_komponen || null,
        volume_antikoagulan: form.value.volume_antikoagulan || null,
        volume_ebl: form.value.volume_ebl || null,
        volume_return: form.value.volume_return || null
      }

      // Send data to backend
      const response = await api.post('/api/aftap_apheresis', dataToSend)
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = response.data
      console.log('Data saved successfully:', data)
      alert('Data berhasil disimpan!')
      if (form.value.statusLabuDarah === 'Ditolak') {
        try {
          const statusRes = await api.put(`/api/patients/${form.value.nomorRegistrasi}/status`, { status: 'Ditolak' })
          console.log('Status update response:', statusRes.data)
        } catch (err) {
          console.error('Error updating status:', err)
        }

        // Insert into log_cekal
        try {
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
          const logRes = await api.post('/api/log_cekal', logData)
          console.log('Log cekal insert response:', logRes.data)
        } catch (err) {
          console.error('Error inserting log_cekal:', err)
        }
      }
      refreshData()

      // Log activity
      try {
        const user = getCurrentUser();
        const logData = {
          note: 'Simpan Data',
          userid: user.username,
          pid: form.value.noKartuDonor,
          regno: form.value.nomorRegistrasi,
          menu: 'Pemeriksaan Aftap'
        };
        const activityRes = await api.post('/api/activity_log', logData)
        console.log('Activity logged:', activityRes.data);
      } catch (err) {
        console.error('Error logging activity:', err);
      }
    } catch (error) {
      console.error('Error saving data:', error)
      alert('Terjadi kesalahan saat menyimpan data: ' + error.message)
    }
  }
  
async function calculateExpiredDate(tanggalPengolahan, kodeKomponen) {
  try {
    const response = await api.get(`/api/master_komponen?kode=${kodeKomponen}`);
    if (response.status !== 200) {
      throw new Error('Failed to fetch master_komponen data');
    }
    const data = response.data;
    if (!data.data || data.data.length === 0) {
      throw new Error('No data found for kode: ' + kodeKomponen);
    }
    const masaSimpanHari = data.data[0].masa_simpan_hari;
    const pengolahanDate = new Date(tanggalPengolahan);
    pengolahanDate.setDate(pengolahanDate.getDate() + masaSimpanHari);
    return pengolahanDate.toISOString().split('T')[0]; // Return as YYYY-MM-DD
  } catch (error) {
    console.error('Error calculating expired date:', error);
    return null;
  }
}

async function insertStokDarah(data) {
  try {
   const response = await api.post('/api/stok_darah', data);
   if (response.status !== 200) {
     throw new Error('Failed to insert/update stok_darah');
   }
   const result = response.data;
   console.log('Stok darah inserted/updated successfully:', result);
   return result;
  } catch (error) {
   console.error('Error inserting/updating stok_darah:', error);
   throw error;
  }
}

async function updateStokDarahStatus(nomorRegistrasi, status) {
  try {
    const response = await api.put('/api/stok_darah/update_status', { nomor_registrasi: nomorRegistrasi, status: status });
    if (response.status !== 200) {
      throw new Error('Failed to update stok_darah status');
    }
    const result = response.data;
    console.log('Stok darah status updated successfully:', result);
    return result;
  } catch (error) {
    console.error('Error updating stok_darah status:', error);
    throw error;
  }
}


async function updateApheresisStatus(nomorBarcode, menu) {
  try {
    const response = await api.put('/api/apheresis_update_komponen/update_status', { nomor_barcode: nomorBarcode, menu: menu });
    if (response.status !== 200) {
      throw new Error('Failed to update apheresis status');
    }
    const result = response.data;
    console.log('Apheresis status updated successfully:', result);
    return result;
  } catch (error) {
    console.error('Error updating apheresis status:', error);
    throw error;
  }
}

  async function releaseData() {
    try {
      console.log('Release Data clicked', form.value)

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

      // Fetch data from hb_golongan_darah
      const hbRes = await api.get(`/api/hb_golongan_darah/${nomorRegistrasi}`)
      const hbData = hbRes.status === 200 ? hbRes.data : null;

      // Fetch data from pemeriksaan_fisik
      const fisikRes = await api.get(`/api/pemeriksaan_fisik/${nomorRegistrasi}`)
      const fisikData = fisikRes.status === 200 ? fisikRes.data : null;

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
        nama_alat: form.value.nama_alat || null,
        reagen_alat: form.value.reagen_alat || null,
        no_lot_alat: form.value.no_lot_alat || null,
        expired_alat: form.value.expired_alat || null,
        jenis_komponen: form.value.jenis_komponen || null,
        volume_antikoagulan: form.value.volume_antikoagulan || null,
        volume_ebl: form.value.volume_ebl || null,
        volume_return: form.value.volume_return || null,
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
      }

      // First, save the aftap_apheresis data
      const saveRes = await api.post('/api/aftap_apheresis', dataToSend)
      if (saveRes.status !== 200) {
        throw new Error(`HTTP error! status: ${saveRes.status}`)
      }
      const data = saveRes.data
      console.log('Pemeriksaan Aftap data saved successfully:', data)

      // Fetch the saved aftap_apheresis record to get the ID
      const aftapRes = await api.get(`/api/aftap_apheresis/${nomorRegistrasi}`)
      if (aftapRes.status !== 200) {
        throw new Error(`HTTP error fetching aftap_apheresis! status: ${aftapRes.status}`)
      }
      const aftapData = aftapRes.data
      console.log('Fetched aftap_apheresis data:', aftapData)

      // Now update patient status based on statusLabuDarah
      const newStatus = form.value.statusLabuDarah === 'Ditolak' ? 'Ditolak' : 'Selesai'
      const statusRes = await api.put(`/api/patients/${nomorRegistrasi}/status`, { status: newStatus })
      if (statusRes.status !== 200) {
        throw new Error(`HTTP error updating status! status: ${statusRes.status}`)
      }
      const statusData = statusRes.data
      console.log('Patient status updated:', { aftapData, statusData })

      // If statusLabuDarah is 'Ditolak', insert into log_cekal
      if (form.value.statusLabuDarah === 'Ditolak') {
        try {
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
          const logRes = await api.post('/api/log_cekal', logData)
          console.log('Log cekal insert response:', logRes.data)
        } catch (err) {
          console.error('Error inserting log_cekal:', err)
        }
      }

      // Update master_donor tanggal_donasi
      const masterRes = await api.post('/api/master_donor', {
        no_kartu_donor: form.value.noKartuDonor,
        tanggal_donasi: new Date().toISOString()
      })
      if (masterRes.status !== 200) {
        throw new Error(`HTTP error updating master_donor! status: ${masterRes.status}`)
      }
      const masterData = masterRes.data
      console.log('Master donor updated:', masterData)

      // Check if nomor_registrasi exists in hasil_skrining_darah
      const skriningRes = await api.get(`/api/hasil_skrining_darah?nomor_registrasi=${nomorRegistrasi}`)
      if (skriningRes.status !== 200) {
        throw new Error(`HTTP error checking hasil_skrining_darah! status: ${skriningRes.status}`)
      }
      const skriningData = skriningRes.data
      let skriningProcessed;
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
          nomorKantongDarah: form.value.noKantongDarah,
          jenis_donor: 'Apheresis'
        }
        skriningProcessed = await api.post('/api/hasil_skrining_darah', insertData)
      } else {
        // Update existing record with no_kantong_darah and jenis_donor
        const updateData = {
          nomorKantongDarah: form.value.noKantongDarah,
          jenis_donor: 'Apheresis'
        }
        skriningProcessed = await api.post('/api/hasil_skrining_darah', {
          nomorRegistrasi: form.value.nomorRegistrasi,
          ...updateData
        })
      }
      const skriningResult = skriningProcessed.data
      console.log('Hasil skrining darah processed:', skriningResult)

      // Fetch apheresis_detail_komponen using nomor_registrasi
      const detailRes = await api.get(`/api/apheresis_detail_komponen?nomor_registrasi=${encodeURIComponent(nomorRegistrasi)}`)
      const details = detailRes.data.data;
      if (!details || details.length === 0) {
        throw new Error('No apheresis components found for this registration.');
      }

      // Fetch master_komponen to get kode for each jenis_komponen
      const komponenRes = await api.get('/api/master_komponen?jenis_donor=Apheresis')
      const komponenList = komponenRes.data.data || [];

      // Loop through each component and insert/update into stok_darah
      const insertPromises = details.map(async (detail) => {
        const komponen = komponenList.find(k => k.nama === detail.jenis_komponen);
        if (!komponen) {
          throw new Error(`Component ${detail.jenis_komponen} not found in master_komponen`);
        }
        const tanggalKadaluarsa = await calculateExpiredDate(detail.tanggal_pengolahan, komponen.kode);
        if (!tanggalKadaluarsa) {
          throw new Error(`Failed to calculate expired date for component ${detail.jenis_komponen}`);
        }
        console.log('kode komponen:', komponen.kode);
        const stokDarahData = {
          nomor_kantong: detail.nomor_kantong || form.value.noKantongDarah,
          nomor_barcode: noBarcode,
          nomor_registrasi: form.value.nomorRegistrasi,
          nomor_kartu_donor: form.value.noKartuDonor,
          golongan_darah: form.value.golonganDarah,
          rhesus: form.value.rhesus,
          jenis_donor: fisikData ? fisikData.jenis_donor : null,
          jenis_kantong_darah: form.value.jenisKantongDarah,
          kode_komponen: komponen.kode,
          suhu_simpan: komponen.suhu_simpan,
          komponen: detail.jenis_komponen,
          volume_ml: detail.volume ? parseInt(detail.volume) : (form.value.volumeDarah ? parseInt(form.value.volumeDarah) : null),
          durasi_aftap: form.value.durasiAftap ? parseInt(form.value.durasiAftap) : null,
          tanggal_registrasi: form.value.tanggalRegistrasi ? new Date(form.value.tanggalRegistrasi).toISOString() : null,
          tanggal_aftap: form.value.tanggalAftap ? new Date(form.value.tanggalAftap).toISOString() : null,
          tanggal_release: new Date().toISOString(),
          tanggal_kadaluarsa: tanggalKadaluarsa,
          status: 'Proses',
          status_pengolahan: 'Selesai',
          tanggal_pengolahan: new Date().toISOString(),
          created_by: created_by
        };

        return insertStokDarah(stokDarahData);
      });

      const results = await Promise.all(insertPromises);
      console.log('All stok darah inserted:', results);
      console.log('barcode', noBarcode);
      // Update apheresis detail komponen status to 'Selesai'
      try {
        await updateApheresisStatus(noBarcode, 'AftapApheresis');
      } catch (err) {
        console.error('Error updating apheresis status:', err);
      }
  
      alert('Data berhasil disimpan, status pasien diubah, dan stok darah ditambahkan!')
      refreshData()

      // Log activity with api api/activity_log/release_details
      try {
        const user = getCurrentUser();
        const { data: logData } = await api.post('/api/activity_log/release_details', {
          nomorBarcode: noBarcode,
          userid: user.username,
          sender: 'AftapApheresis'
        });
        console.log('Activity logged:', logData);
        
      } catch (err) {
        console.error('Error logging activity:', err);
      }
    } catch (error) {
      console.error('Error in release process:', error)
      alert('Terjadi kesalahan saat menyimpan data atau mengubah status: ' + error.message)
    }
  }
  
  function cetakBarcode() {
    console.log('Cetak Barcode clicked')
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
        menu: 'Pemeriksaan Aftap'
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
    fetchKomponenOptions();
  });

  // Apheresis detail functions
  function tambah() {
    console.log('Tambah clicked');
    showKomponenModal.value = true;
    fetchKomponenList();
  }

  function fetchKomponenList() {
    api.get('/api/master_komponen?jenis_donor=Apheresis')
      .then(res => {
        komponenList.value = res.data.data;
      })
      .catch(err => console.error('Error fetching komponen list:', err));
  }

  function selectKomponen(komponen) {
    console.log('Selected komponen:', komponen);

    // Prepare data to send
    const dataToSend = {
      nomor_registrasi: form.value.nomorRegistrasi,
      kode_komponen: komponen.kode,
      jenis_komponen: komponen.nama,
      golongan: form.value.golonganDarah,
      rhesus: form.value.rhesus
    };

    console.log('data to send:', dataToSend);
    // Call API to create apheresis detail
    api.post('/api/apheresis_detail_komponen', dataToSend)
    .then(response => {
      if (response.status !== 200) {
        if (response.status === 400) {
          throw new Error(response.data.detail);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.data;
    })
    .then(data => {
      console.log('Apheresis detail created:', data);
      // Close modal
      showKomponenModal.value = false;
      // Refresh detail list
      fetchDetailList();
    })
    .catch(error => {
      console.error('Error creating apheresis detail:', error);
      alert('Terjadi kesalahan saat menyimpan data: ' + error.message);
    });
  }

  function fetchDetailList() {
    if (!form.value.nomorRegistrasi) return;

    api.get(`/api/apheresis_detail_komponen?nomor_registrasi=${encodeURIComponent(form.value.nomorRegistrasi)}`)
      .then(res => {
        detailList.value = res.data.data;
        currentDetailPage.value = 1; // Reset to first page when data changes
      })
      .catch(err => console.error('Error fetching detail list:', err));
  }

  function hapusDetail(detail) {
    console.log('Hapus detail:', detail);

    if (confirm('Apakah Anda yakin ingin menghapus komponen ini?')) {
      api.delete(`/api/apheresis_detail_komponen/${detail.id}`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.data;
      })
      .then(data => {
        console.log('Detail deleted:', data);
        // Refresh the detail list
        fetchDetailList();
      })
      .catch(error => {
        console.error('Error deleting detail:', error);
        alert('Terjadi kesalahan saat menghapus data: ' + error.message);
      });
    }
  }

  async function cetakDetail(detail) {
    console.log('Cetak detail:', detail)
    try {
      const response = await api.get(`/api/stok_darah/print/${detail.id}?origin=AftapApheresis`, {
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

  function editDetail(detail) {
    editForm.value.id = detail.id;
    editForm.value.tanggal_pengolahan = formatDateTimeForInput(detail.tanggal_pengolahan);
    editForm.value.nomor_kantong = detail.nomor_kantong;
    editForm.value.volume = detail.volume;
    editForm.value.status_pengolahan = detail.status_pengolahan;
    editForm.value.alasan_reject = detail.alasan_reject;
    showEditModal.value = true;
  }

  function simpanEdit() {
    const dataToUpdate = {
      tanggal_pengolahan: editForm.value.tanggal_pengolahan,
      nomor_kantong: editForm.value.nomor_kantong,
      volume: editForm.value.volume,
      status_pengolahan: editForm.value.status_pengolahan,
      alasan_reject: editForm.value.alasan_reject
    };

    api.put(`/api/apheresis_detail_komponen/${editForm.value.id}`, dataToUpdate)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.data;
    })
    .then(data => {
      console.log('Detail updated:', data);
      showEditModal.value = false;
      fetchDetailList(); // Refresh the list
    })
    .catch(error => {
      console.error('Error updating detail:', error);
      alert('Terjadi kesalahan saat menyimpan data: ' + error.message);
    });
  }

  function closeEditModal() {
    showEditModal.value = false;
  }

  function closeKomponenModal() {
    showKomponenModal.value = false;
  }

  function nextDetailPage() {
    if (currentDetailPage.value < totalDetailPages.value) currentDetailPage.value++;
  }

  function prevDetailPage() {
    if (currentDetailPage.value > 1) currentDetailPage.value--;
  }

  function goToDetailPage(page) {
    if (page >= 1 && page <= totalDetailPages.value) currentDetailPage.value = page;
  }

  function getStatusLabel(status) {
    switch (status) {
      case 'proses':
        return 'Proses';
      case 'selesai':
        return 'Selesai';
      case 'reject':
        return 'Reject';
      default:
        return status;
    }
  }

  function formatDateTimeForInput(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  
  
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
    filterDonorType.value = "Donor Apheresis";
    currentPage.value = 1;
    fetchPatients(1);
  }
  
  function applyFilters() {
    currentPage.value = 1;
    fetchPatients(1);
  }

  function fetchKomponenOptions() {
    api.get('/api/master_komponen?jenis_donor=Apheresis')
      .then(res => {
        komponenOptions.value = res.data.data || [];
      })
      .catch(err => console.error('Error fetching komponen options:', err));
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