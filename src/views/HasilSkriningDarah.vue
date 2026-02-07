<template>
  <div class="flex flex-col h-full">
    <!-- 🔹 Top Action Bar (shadcn Button) -->
    <div class="flex justify-between items-center p-0  bg-white sticky top-0 z-10">
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
      <div class="flex gap-2 p-4 bg-white border-b sticky top-0 z-10">
        <Button @click="ujiKonfirmasiGolonganDarah" class="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          <Droplets class="w-5 h-5" />
          Uji Konfirmasi Golongan Darah
        </Button>
        <Button @click="ubahNilaiNormal" class="flex items-center gap-2 bg-green-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          <SlidersHorizontal class="w-5 h-5" />
          Ubah Nilai Normal
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

   <!-- Right: Blood Info -->
   <div
  class="flex items-center gap-2 px-3 py-2 rounded-lg border"
  :class="{
    'bg-[#FEE2E2] border-red-200': form.statusCekal === 'Ditolak',
    'bg-amber-50 border-amber-100': form.statusOlahDarah === 'Proses' && form.statusCekal !== 'Ditolak',
    'bg-blue-50 border-blue-100': form.statusOlahDarah !== 'Proses' && form.statusCekal !== 'Ditolak'
  }"
  >
  <span
    class="text-sm font-semibold tracking-tight"
    :class="{
      'text-red-800': form.statusCekal === 'Ditolak',
      'text-amber-800': form.statusOlahDarah === 'Proses' && form.statusCekal !== 'Ditolak',
      'text-blue-800':
        form.statusOlahDarah === 'Selesai' && form.statusCekal !== 'Ditolak'
    }"
  >
        {{ form.nomorBarcode }}  ( {{ form.golonganDarah }}
        {{ form.rhesus === 'Negatif' ? '-' : form.rhesus === 'Positif' ? '+' : form.rhesus }} )
         {{ form.statusOlahDarah }}
      </span>
  </div>    

   <!-- <div
      v-if="form.statusOlahDarah === 'Proses'"
      class="flex items-center gap-2 px-3 py-2 bg-amber-50 rounded-lg border border-amber-100"
    >
      <Droplet class="w-4 h-4 text-amber-600" />
      <span class="text-sm font-semibold text-amber-800 tracking-tight">
        {{ form.nomorBarcode }}  ( {{ form.golonganDarah }}
        {{ form.rhesus === 'Negatif' ? '-' : form.rhesus === 'Positif' ? '+' : form.rhesus }} )
         {{ form.statusOlahDarah }}
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
          {{ form.statusOlahDarah }}
      </span>
    </div> -->
</div>

<!-- 🔸 Tabs Content -->
<div class="flex-1 p-4 overflow-y-auto space-y-4">

  <!-- 🧩 Identitas -->
  <TabsContent value="Identitas" class="space-y-4">
    <div class="bg-white p-4 rounded-lg shadow space-y-4">
      <h3 class="text-lg font-semibold text-gray-800">Identitas</h3>
      <form class="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Tanggal Registrasi</Label>
          <Input type="datetime-local" v-model="form.tanggalRegistrasi" readonly/>
        </div>

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Nomor Barcode</Label>
          <Input v-model="form.nomorBarcode" readonly/>
        </div>

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Nomor Kantong Darah</Label>
          <Input v-model="form.nomorKantongDarah" readonly/>
        </div>

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Nomor Registrasi</Label>
          <Input v-model="form.nomorRegistrasi" readonly/>
        </div>

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Diperiksa Oleh</Label>
          <Input v-model="form.diperiksaOleh" readonly/>
        </div>

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Nama Donor</Label>
          <Input v-model="form.namaDonor" readonly/>
        </div>

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Tanggal Lahir</Label>
          <Input type="date" v-model="form.tanggalLahir" readonly/>
        </div>

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Umur</Label>
          <Input v-model="form.umur" readonly/>
        </div>

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Jenis Kelamin</Label>
          <Input v-model="form.jenisKelamin" readonly/>
        </div>

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Berat Badan</Label>
          <Input v-model="form.beratBadan" readonly/>
        </div>

        <div class="flex flex-col space-y-1">
          <Label class="text-sm text-gray-600">Golongan Darah</Label>
          <Input v-model="form.golonganDarah" readonly/>
        </div>

        <div class="flex flex-col md:col-span-1 space-y-1">
          <Label class="text-sm text-gray-600">Alamat</Label>
          <Textarea v-model="form.alamat" rows="1" readonly/>
        </div>

      </form>
    </div>
  </TabsContent>

  
      <!-- 🧬 METODE CLIA -->
      <TabsContent value="Metode CLIA" class="space-y-4">
        <div class="bg-white p-4 rounded-lg shadow space-y-4">
          <h3 class="text-lg font-semibold text-gray-800">Metode CLIA</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label class="block text-sm text-gray-600">Tanggal Skrinning</Label>
              <Input type="datetime-local" v-model="form.tanggalSkrinning" />
            </div>

            <div>
              <Label class="block text-sm text-gray-600">Nama Alat</Label>
              <Select v-model="form.namaAlat">
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Alat" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alat 1">Sysmex HISCL</SelectItem>
                  <SelectItem value="Alat 2">Roche E411</SelectItem>
                  <SelectItem value="Alat 3">Biomerieux Vidas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <!-- TABLE -->
          <div class="space-y-2 text-sm">
            <div class="flex items-center gap-2 font-medium text-gray-700">
              <span class="w-16"></span>
              <span class="w-28">No. Lot Reagen</span>
              <span class="w-40">Exp Date Reagen</span>
              <span class="w-28">Hasil Final</span>
              <span class="w-28" @dblclick="copyToFinal('Hasil')">Hasil Skrinning</span>
              <span class="w-20" @dblclick="copyToFinal('SelangI')">Selang I</span>
              <span class="w-20" @dblclick="copyToFinal('SelangII')">Selang II</span>
              <span class="w-20" @dblclick="copyToFinal('TabungI')">Tabung I</span>
              <span class="w-20" @dblclick="copyToFinal('TabungII')">Tabung II</span>
              <span class="w-32">Kesimpulan</span>
            </div>

            <!-- SIFILIS -->
            <div class="flex items-center gap-2">
              <Label class="w-16 text-sm">Sifilis</Label>
              <Input v-model="form.sifilisLotReagen" placeholder="No. Lot Reagen" class="border p-1 w-28 text-sm" />
              <Input type="date" v-model="form.sifilisExpDate" class="w-35 text-sm" />
              <Input v-model="form.sifilisHasilFinal" placeholder="Hasil Final" class="border p-1 w-28 text-sm" />
              <Input v-model="form.sifilisHasil" @dblclick="form.sifilisHasilFinal = form.sifilisHasil" placeholder="Hasil Skrining" class="border p-1 w-28 text-sm" />
              <Input v-model="form.sifilisSelangI" @dblclick="form.sifilisHasilFinal = form.sifilisSelangI" placeholder="Selang I" class="border p-1 w-20 text-sm" />
              <Input v-model="form.sifilisSelangII" @dblclick="form.sifilisHasilFinal = form.sifilisSelangII" placeholder="Selang II" class="border p-1 w-20 text-sm" />
              <Input v-model="form.sifilisTabungI" @dblclick="form.sifilisHasilFinal = form.sifilisTabungI" placeholder="Tabung I" class="border p-1 w-20 text-sm" />
              <Input v-model="form.sifilisTabungII" @dblclick="form.sifilisHasilFinal = form.sifilisTabungII" placeholder="Tabung II" class="border p-1 w-20 text-sm" />
              <RadioGroup v-model="form.sifilisKesimpulan" class="flex gap-2">
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
              <Label class="w-16 text-sm">HbsAg</Label>
              <Input v-model="form.hbsagLotReagen" placeholder="No. Lot Reagen" class="border p-1 w-28 text-sm" />
              <Input type="date" v-model="form.hbsagExpDate" class="w-35 text-sm" />
              <Input v-model="form.hbsagHasilFinal" placeholder="Hasil Final" class="border p-1 w-28 text-sm" />
              <Input v-model="form.hbsagHasil" @dblclick="form.hbsagHasilFinal = form.hbsagHasil" placeholder="Hasil Skrining" class="border p-1 w-28 text-sm" />
              <Input v-model="form.hbsagSelangI" @dblclick="form.hbsagHasilFinal = form.hbsagSelangI" placeholder="Selang I" class="border p-1 w-20 text-sm" />
              <Input v-model="form.hbsagSelangII" @dblclick="form.hbsagHasilFinal = form.hbsagSelangII" placeholder="Selang II" class="border p-1 w-20 text-sm" />
              <Input v-model="form.hbsagTabungI" @dblclick="form.hbsagHasilFinal = form.hbsagTabungI" placeholder="Tabung I" class="border p-1 w-20 text-sm" />
              <Input v-model="form.hbsagTabungII" @dblclick="form.hbsagHasilFinal = form.hbsagTabungII" placeholder="Tabung II" class="border p-1 w-20 text-sm" />
              <RadioGroup v-model="form.hbsagKesimpulan" class="flex gap-2">
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
              <Input v-model="form.hcvLotReagen" placeholder="No. Lot Reagen" class="border p-1 w-28 text-sm" />
              <Input type="date" v-model="form.hcvExpDate" class="w-35 text-sm" />
              <Input v-model="form.hcvHasilFinal" placeholder="Hasil Final" class="border p-1 w-28 text-sm" />
              <Input v-model="form.hcvHasil" @dblclick="form.hcvHasilFinal = form.hcvHasil" placeholder="Hasil Skrining" class="border p-1 w-28 text-sm" />
              <Input v-model="form.hcvSelangI" @dblclick="form.hcvHasilFinal = form.hcvSelangI" placeholder="Selang I" class="border p-1 w-20 text-sm" />
              <Input v-model="form.hcvSelangII" @dblclick="form.hcvHasilFinal = form.hcvSelangII" placeholder="Selang II" class="border p-1 w-20 text-sm" />
              <Input v-model="form.hcvTabungI" @dblclick="form.hcvHasilFinal = form.hcvTabungI" placeholder="Tabung I" class="border p-1 w-20 text-sm" />
              <Input v-model="form.hcvTabungII" @dblclick="form.hcvHasilFinal = form.hcvTabungII" placeholder="Tabung II" class="border p-1 w-20 text-sm" />
              <RadioGroup v-model="form.hcvKesimpulan" class="flex gap-2">
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
              <Input v-model="form.hivLotReagen" placeholder="No. Lot Reagen" class="border p-1 w-28 text-sm" />
              <Input type="date" v-model="form.hivExpDate" class="w-35 text-sm" />
              <Input v-model="form.hivHasilFinal" placeholder="Hasil Final" class="border p-1 w-28 text-sm" />
              <Input v-model="form.hivHasil" @dblclick="form.hivHasilFinal = form.hivHasil" placeholder="Hasil Skrining" class="border p-1 w-28 text-sm" />
              <Input v-model="form.hivSelangI" @dblclick="form.hivHasilFinal = form.hivSelangI" placeholder="Selang I" class="border p-1 w-20 text-sm" />
              <Input v-model="form.hivSelangII" @dblclick="form.hivHasilFinal = form.hivSelangII" placeholder="Selang II" class="border p-1 w-20 text-sm" />
              <Input v-model="form.hivTabungI" @dblclick="form.hivHasilFinal = form.hivTabungI" placeholder="Tabung I" class="border p-1 w-20 text-sm" />
              <Input v-model="form.hivTabungII" @dblclick="form.hivHasilFinal = form.hivTabungII" placeholder="Tabung II" class="border p-1 w-20 text-sm" />
              <RadioGroup v-model="form.hivKesimpulan" class="flex gap-2">
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
              <Input v-model="form.malariaLotReagen" placeholder="No. Lot Reagen" class="border p-1 w-28 text-sm" />
              <Input type="date" v-model="form.malariaExpDate" class="w-35 text-sm" />
              <Input v-model="form.malariaHasilFinal" placeholder="Hasil Final" class="border p-1 w-28 text-sm" />
              <Input v-model="form.malariaHasil" @dblclick="form.malariaHasilFinal = form.malariaHasil" placeholder="Hasil Skrining" class="border p-1 w-28 text-sm" />
              <Input v-model="form.malariaSelangI" @dblclick="form.malariaHasilFinal = form.malariaSelangI" placeholder="Selang I" class="border p-1 w-20 text-sm" />
              <Input v-model="form.malariaSelangII" @dblclick="form.malariaHasilFinal = form.malariaSelangII" placeholder="Selang II" class="border p-1 w-20 text-sm" />
              <Input v-model="form.malariaTabungI" @dblclick="form.malariaHasilFinal = form.malariaTabungI" placeholder="Tabung I" class="border p-1 w-20 text-sm" />
              <Input v-model="form.malariaTabungII" @dblclick="form.malariaHasilFinal = form.malariaTabungII" placeholder="Tabung II" class="border p-1 w-20 text-sm" />
              <RadioGroup v-model="form.malariaKesimpulan" class="flex gap-2">
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
        </div>
      </TabsContent>

      <!-- Metode NAT -->
      <TabsContent value="Metode NAT" class="space-y-4">
        <div class="bg-white p-4 rounded-lg shadow space-y-4">
          <h3 class="text-lg font-semibold text-gray-800">Metode NAT</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label class="block text-sm text-gray-600">Tanggal Skrinning</Label>
              <Input type="datetime-local" v-model="form.tanggalSkrinningNat" class="w-full border rounded-lg p-2" />
            </div>

            <div>
              <Label class="block text-sm text-gray-600">Nama Alat</Label>
              <Select v-model="form.namaAlatNat">
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Alat" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Alat 1">Cobas</SelectItem>
                        <SelectItem value="Alat 2">Abbot</SelectItem>
                      </SelectContent>
                    </Select>
            </div>
          </div>

          <!-- TABLE -->
          <div class="space-y-2 text-sm">
            <div class="flex items-center gap-2 font-medium text-gray-700">
              <span class="w-16"></span>
              <span class="w-28">No. Lot Reagen</span>
              <span class="w-40">Exp Date Reagen</span>
              <span class="w-28">Hasil Skrining</span>
              <span class="w-32">Kesimpulan</span>
            </div>

            <!-- SIFILIS -->
            <div class="flex items-center gap-2">
              <Label class="w-16 text-sm">Sifilis</Label>
              <Input v-model="form.sifilisLotReagenNat" placeholder="No. Lot Reagen" class="border p-1 text-sm w-28" />
              <Input type="date" v-model="form.sifilisExpDateNat" class="w-40 text-sm" />
              <Input v-model="form.sifilisHasilNat" placeholder="Hasil Skrinning" class="border p-1 text-sm w-28" />
              <RadioGroup v-model="form.sifilisHasilNat" class="flex gap-2">
                <div class="flex items-center gap-1">
                  <RadioGroupItem id="sifilisNegNat" value="Tidak Reaktif" />
                  <label for="sifilisNegNat">Tidak Reaktif</label>
                </div>
                <div class="flex items-center gap-1">
                  <RadioGroupItem id="sifilisPosNat" value="Reaktif" />
                  <label for="sifilisPosNat">Reaktif</label>
                </div>
              </RadioGroup>
            </div>  

            <!-- HBsAg -->
            <div class="flex items-center gap-2">
              <Label class="w-16 text-sm">HbsAg</Label>
              <Input v-model="form.hbsagLotReagenNat" placeholder="No. Lot Reagen" class="border p-1 w-28 text-sm" />
              <Input type="date" v-model="form.hbsagExpDateNat" class="w-40 text-sm" />
              <Input v-model="form.hbsagHasilNat" placeholder="Hasil Skrinning" class="border p-1 w-28 text-sm" />
              
              <RadioGroup v-model="form.hbsagHasilNat" class="flex gap-2">
                <div class="flex items-center gap-1">
                  <RadioGroupItem id="hbsagNegNat" value="Tidak Reaktif" />
                  <label for="hbsagNegNat">Tidak Reaktif</label>
                </div>
                <div class="flex items-center gap-1">
                  <RadioGroupItem id="hbsagPosNat" value="Reaktif" />
                  <label for="hbsagPosNat">Reaktif</label>
                </div>
              </RadioGroup>
            </div>

            <!-- HCV -->
            <div class="flex items-center gap-2">
              <Label class="w-16 text-sm">HCV</Label>
              <Input v-model="form.hcvLotReagenNat" placeholder="No. Lot Reagen" class="border p-1 w-28 text-sm" />
              <Input type="date" v-model="form.hcvExpDateNat" class="w-40 text-sm" />
              <Input v-model="form.hcvHasilNat" placeholder="Hasil Skrinning" class="border p-1 w-28 text-sm" />
              
              <RadioGroup v-model="form.hcvHasilNat" class="flex gap-2">
                <div class="flex items-center gap-1">
                  <RadioGroupItem id="hcvNegNat" value="Tidak Reaktif" />
                  <label for="hcvNegNat">Tidak Reaktif</label>
                </div>
                <div class="flex items-center gap-1">
                  <RadioGroupItem id="hcvPosNat" value="Reaktif" />
                  <label for="hcvPosNat">Reaktif</label>
                </div>
              </RadioGroup>
            </div>

            <!-- HIV -->
            <div class="flex items-center gap-2">
              <Label class="w-16 text-sm">HIV</Label>
              <Input v-model="form.hivLotReagenNat" placeholder="No. Lot Reagen" class="border p-1 w-28 text-sm" />
              <Input type="date" v-model="form.hivExpDateNat" class="w-40 text-sm" />
              <Input v-model="form.hivHasilNat" placeholder="Hasil Skrinning" class="border p-1 w-28 text-sm" />
              
              <RadioGroup v-model="form.hivHasilNat" class="flex gap-2">
                <div class="flex items-center gap-1">
                  <RadioGroupItem id="hivNegNat" value="Tidak Reaktif" />
                  <label for="hivNegNat">Tidak Reaktif</label>
                </div>
                <div class="flex items-center gap-1">
                  <RadioGroupItem id="hivPosNat" value="Reaktif" />
                  <label for="hivPosNat">Reaktif</label>
                </div>
              </RadioGroup>
            </div>

            <!-- MALARIA -->
            <div class="flex items-center gap-2">
              <Label class="w-16 text-sm">Malaria</Label>
              <Input v-model="form.malariaLotReagenNat" placeholder="No. Lot Reagen" class="border p-1 w-28 text-sm" />
              <Input type="date" v-model="form.malariaExpDateNat" class="w-40 text-sm" />
              <Input v-model="form.malariaHasilNat" placeholder="Hasil Skrinning" class="border p-1 w-28 text-sm" />
              
              <RadioGroup v-model="form.malariaHasilNat" class="flex gap-2">
                <div class="flex items-center gap-1">
                  <RadioGroupItem id="malariaNegNat" value="Tidak Reaktif" />
                  <label for="malariaNegNat">Tidak Reaktif</label>
                </div>
                <div class="flex items-center gap-1">
                  <RadioGroupItem id="malariaPosNat" value="Reaktif" />
                  <label for="malariaPosNat">Reaktif</label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </TabsContent>

      <!-- ⚙️ STATUS -->
      <TabsContent value="Status" class="space-y-4">
        <div class="bg-white p-4 rounded-lg shadow space-y-4">
          <h3 class="text-lg font-semibold text-gray-800">Status</h3>
          <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div>
              <Label>Status Cekal</Label>
              <RadioGroup v-model="form.statusCekal" class="flex gap-4 mt-1">
                <div class="flex items-center gap-1">
                  <RadioGroupItem id="statusDiterima" value="Diterima" />
                  <Label for="statusDiterima">Diterima</Label>
                </div>
                <div class="flex items-center gap-1">
                  <RadioGroupItem id="statusDitolak" value="Ditolak" />
                  <Label for="statusDitolak">Ditolak</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Alasan</Label>
              <Input v-model="form.alasan" />
            </div>

            <!-- <div>
              <Label>Status Skrining</Label>
              <Select v-model="form.statusSkrining">
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Status Olah Darah</Label>
              <Select v-model="form.statusOlahDarah">
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div> -->
          </div>
        </div>
      </TabsContent>

</div>
</Tabs>


  <!-- Bottom: Data Grid -->
<Card class="m-4 p-4 shadow-md border rounded-2xl bg-background">    
  <!-- Title + Filters Row -->
  <CardHeader
    class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b px-4 py-4"
  >
    <!-- Title -->
    <div>
      <h3 class="text-xl font-semibold text-foreground tracking-tight">
        Daftar Hasil Skrining Darah
      </h3>
      <p class="text-sm text-muted-foreground">
        Daftar Hasil Skrining Darah
      </p>
    </div>

    <!-- 🔎 Filters (Right-Aligned) -->
    <div class="flex flex-wrap items-center gap-3">
      <!-- Filter by Date -->
      <div class="flex items-center gap-2">
        <input
          v-model="beginDate"
          @change="applyFilters"
          type="date"
          class="border border-gray-300 rounded-lg px-3 py-2 w-40 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div> -
      <div class="flex items-center gap-2">
        <input
          v-model="endDate"
          @change="applyFilters"
          type="date"
          class="border border-gray-300 rounded-lg px-3 py-2 w-40 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- search by {{ patient.nomor_barcode }} -->
      <div class="flex items-center gap-2">
        <input
          v-model="searchNoReg"
          type="text"
          placeholder="Cari No Registrasi..."
          class="border border-gray-300 rounded-lg px-3 py-2 w-40 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- {{ patient.nama_donor }} -->
      <div class="flex items-center gap-2">
        <input
          v-model="searchNama"
          type="text"
          placeholder="Cari Nama..."
          class="border border-gray-300 rounded-lg px-3 py-2 w-40 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
          <TableHead class="font-semibold text-gray-800">No Barcode</TableHead>
          <TableHead class="font-semibold text-gray-800">Nama Donor</TableHead>
          <TableHead class="font-semibold text-gray-800">Tanggal Lahir</TableHead>
          <TableHead class="font-semibold text-gray-800">Tanggal Skrining</TableHead>
          <TableHead class="font-semibold text-gray-800">Sifilis</TableHead>
          <TableHead class="font-semibold text-gray-800">HBsAg</TableHead>
          <TableHead class="font-semibold text-gray-800">HCV</TableHead>
          <TableHead class="font-semibold text-gray-800">HIV</TableHead>
          <TableHead class="font-semibold text-gray-800">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow
          v-for="patient in patients"
          :key="patient.id"
          class="hover:bg-gray-50"
        >
          <TableCell>{{ patient.nomor_barcode }}</TableCell>
          <TableCell>{{ patient.nama_donor }}</TableCell>
          <TableCell>{{ formatDate(patient.tanggal_lahir) }}</TableCell>
          <TableCell>{{ formatDate(patient.tanggal_skrining) }}</TableCell>
          
          <TableCell>
            <span
              class="px-3 py-1 rounded-full text-sm font-medium inline-block text-center w-40"
              :style="{
                backgroundColor: getResultColor(patient.sifilis_kesimpulan),
                color: getResultTextColor(patient.sifilis_kesimpulan)
              }"
            >
              {{ patient.sifilis_kesimpulan || 'Pending' }}
            </span>
          </TableCell>
          <TableCell>
            <span
              class="px-3 py-1 rounded-full text-sm font-medium inline-block text-center w-40"
              :style="{
                backgroundColor: getResultColor(patient.hbsag_kesimpulan),
                color: getResultTextColor(patient.hbsag_kesimpulan)
              }"
            >
              {{ patient.hbsag_kesimpulan || 'Pending'}}
            </span>
          </TableCell>
          <TableCell>
            <span
              class="px-3 py-1 rounded-full text-sm font-medium inline-block text-center w-40"
              :style="{
                backgroundColor: getResultColor(patient.hcv_kesimpulan),
                color: getResultTextColor(patient.hcv_kesimpulan)
              }"
            >
              {{ patient.hcv_kesimpulan || 'Pending'}}
            </span>
          </TableCell>
          <TableCell>
            <span
              class="px-3 py-1 rounded-full text-sm font-medium inline-block text-center w-40"
              :style="{
                backgroundColor: getResultColor(patient.hiv_kesimpulan),
                color: getResultTextColor(patient.hiv_kesimpulan)
              }"
            >
              {{ patient.hiv_kesimpulan || 'Pending'}}
            </span>
          </TableCell>
          <TableCell>
            <button @click="selectPatient(patient)" class="bg-green-600 text-white px-2 py-1 rounded">Pilih</button>
          </TableCell>
        </TableRow>

        <!-- Empty State -->
        <TableRow v-if="patients.length === 0">
          <TableCell colspan="8" class="text-center text-gray-500">
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
    <span class="font-medium text-muted-foreground text-sm">
      Halaman {{ currentPage }} dari {{ totalPages }}
    </span>
    <div class="flex items-center gap-2">
      <Button
        class="bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-800 px-4 py-2 rounded"
        @click="prevPage"
        :disabled="currentPage === 1"
      >
        Previous
      </Button>      
      <Button
        class="bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-800 px-4 py-2 rounded"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        Next
      </Button>
    </div>
  </CardFooter>
</Card>

   <!-- Modal for Cari Data -->
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
        <Input v-model="searchNoKartuDonor" placeholder="No Kartu Donor" class="border p-2 rounded" />
        <Input v-model="searchNoRegistrasi" placeholder="No Registrasi" class="border p-2 rounded" />
        <Input v-model="searchNama" placeholder="Nama" class="border p-2 rounded" />
        <Input v-model="searchNoBarcode" placeholder="Nomor Barcode" class="border p-2 rounded" />
      </div>

      <button @click="searchPatients" class="bg-blue-600 text-white px-4 py-2 rounded mb-4">Cari</button>

      <!-- 🔹 Patients Table inside Modal -->
      <ScrollArea class="max-h-96">
        <Table>
          <TableHeader class="bg-gray-100">
            <TableRow>
              <TableHead class="font-semibold text-gray-800">Tanggal Registrasi</TableHead>
              <TableHead class="font-semibold text-gray-800">Nomor Registrasi</TableHead>
              <TableHead class="font-semibold text-gray-800">No Barcode</TableHead>
              <TableHead class="font-semibold text-gray-800">No Kantong Darah</TableHead>
              <TableHead class="font-semibold text-gray-800">Nama Donor</TableHead>
              <TableHead class="font-semibold text-gray-800">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow
              v-for="patient in modalPatients"
              :key="patient.id"
              class="hover:bg-gray-50"
            >
              <TableCell>{{ formatDate(patient.tanggal_registrasi) }}</TableCell>
              <TableCell>{{ patient.nomor_registrasi }}</TableCell>
              <TableCell>{{ patient.no_barcode }}</TableCell>
              <TableCell>{{ patient.no_kantong_darah }}</TableCell>
              <TableCell>{{ patient.nama_donor }}</TableCell>
              <TableCell>
                <button @click="selectPatientFromModal(patient)" class="bg-green-600 text-white px-2 py-1 rounded">Pilih</button>
              </TableCell>
            </TableRow>

            <!-- Empty State -->
            <TableRow v-if="modalPatients.length === 0">
              <TableCell colspan="6" class="text-center text-gray-500">
                No data found
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ScrollArea>

      <!-- 🔹 Pagination inside Modal -->
      <div class="flex justify-between items-center mt-4">
        <button @click="modalPrevPage" :disabled="modalCurrentPage === 1" class="bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-800 px-4 py-2 rounded">Previous</button>
        <span>Page {{ modalCurrentPage }} of {{ modalTotalPages }}</span>
        <button @click="modalNextPage" :disabled="modalCurrentPage === modalTotalPages" class="bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-800 px-4 py-2 rounded">Next</button>
      </div>
    </CardContent>
  </Card>
</div>

    <!-- Modal for Ubah Nilai Normal -->
<div
  v-if="showNilaiNormalModal"
  class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
>
  <Card class="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
    <CardHeader>
      <div class="flex justify-between items-center w-full">
        <CardTitle class="text-lg font-semibold text-gray-800">
          Nilai Normal Pemeriksaan
        </CardTitle>
        <Button
          variant="destructive"
          class="px-4 py-2 rounded-lg"
          @click="closeNilaiNormalModal"
        >
          Tutup
        </Button>
      </div>
    </CardHeader>

    <CardContent>
      <!-- Buttons -->
      <div class="flex justify-between mb-4">
        <div class="flex gap-2">
          <Button @click="clearNilaiNormalForm" class="bg-gray-500 text-white px-4 py-2 rounded">
            <BrushCleaning class="w-5 h-5" />Clear</Button>
          <Button @click="simpanNilaiNormal" class="bg-blue-500 text-white px-4 py-2 rounded">
            <Save class="w-5 h-5" />Simpan Data</Button>
        </div>
      </div>

      <!-- Form -->
      <div class="grid grid-cols-7 gap-2 mb-4">
        <Input v-model="nilaiNormalForm.nama" placeholder="Nama Test" class="border p-2" />
        <Input v-model="nilaiNormalForm.satuan" placeholder="Satuan" class="border p-2" />
        <Input v-model="nilaiNormalForm.nilai_normal" placeholder="Nilai Normal" class="border p-2" />
        <Input v-model="nilaiNormalForm.batas_bawah" placeholder="Batas Bawah" class="border p-2" />
        <Input v-model="nilaiNormalForm.batas_atas" placeholder="Batas Atas" class="border p-2" />
        <Input v-model="nilaiNormalForm.kritis_atas" placeholder="Kritis Atas" class="border p-2" />
        <Input v-model="nilaiNormalForm.kritis_bawah" placeholder="Kritis Bawah" class="border p-2" />
      </div>

      <!-- 🔹 Grid inside Modal -->
      <ScrollArea class="max-h-96">
        <Table>
          <TableHeader class="bg-gray-100">
            <TableRow>
              <TableHead class="font-semibold text-gray-800">Nama Test</TableHead>
              <TableHead class="font-semibold text-gray-800">Satuan</TableHead>
              <TableHead class="font-semibold text-gray-800">Nilai Normal</TableHead>
              <TableHead class="font-semibold text-gray-800">Batas Bawah</TableHead>
              <TableHead class="font-semibold text-gray-800">Batas Atas</TableHead>
              <TableHead class="font-semibold text-gray-800">Kritis Atas</TableHead>
              <TableHead class="font-semibold text-gray-800">Kritis Bawah</TableHead>
              <TableHead class="font-semibold text-gray-800">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow
              v-for="item in nilaiNormalList"
              :key="item.id"
              class="hover:bg-gray-50"
            >
              <TableCell>{{ item.nama }}</TableCell>
              <TableCell>{{ item.satuan }}</TableCell>
              <TableCell>{{ item.nilai_normal }}</TableCell>
              <TableCell>{{ item.batas_bawah }}</TableCell>
              <TableCell>{{ item.batas_atas }}</TableCell>
              <TableCell>{{ item.kritis_atas }}</TableCell>
              <TableCell>{{ item.kritis_bawah }}</TableCell>
              <TableCell>
                <button @click="pilihNilaiNormal(item)" class="bg-green-600 text-white px-2 py-1 rounded">Pilih</button>
              </TableCell>
            </TableRow>

            <!-- Empty State -->
            <TableRow v-if="nilaiNormalList.length === 0">
              <TableCell colspan="8" class="text-center text-gray-500">
                No data found
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ScrollArea>
    </CardContent>
  </Card>
</div>

    <!-- Modal for Uji Konfirmasi Golongan Darah -->
<div
  v-if="showKonfirmasiModal"
  class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
>
  <Card class="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
    <CardHeader>
      <div class="flex justify-between items-center w-full">
        <CardTitle class="text-lg font-semibold text-gray-800">
          Uji Konfirmasi Golongan Darah
        </CardTitle>
        <div class="flex gap-2">
          <Button @click="simpanKonfirmasiData" class="bg-blue-500 text-white px-4 py-2 rounded">
            <Save class="w-5 h-5" />Simpan Data</Button>
          <Button
            variant="destructive"
            class="px-4 py-2 rounded-lg"
            @click="closeKonfirmasiModal"
          >
            Tutup
          </Button>
        </div>
      </div>
    </CardHeader>

    <CardContent>
      
      <div class="space-y-4">
        <div class="border rounded-xl p-4">
           <form class="grid grid-cols-4 gap-4">
            <div>
              <Label class="block text-sm font-medium">Tanggal Registrasi</Label>
              <Input type="datetime-local" v-model="form.tanggalRegistrasi" class="w-full border p-2" readonly />
            </div>
            <div>
              <Label class="block text-sm font-medium">Nomor Barcode</Label>
              <Input v-model="form.nomorBarcode" class="w-full border p-2" readonly />
            </div>
            <div>
              <Label class="block text-sm font-medium">Nomor Kantong Darah</Label>
              <Input v-model="form.nomorKantongDarah" class="w-full border p-2" readonly />
            </div>
            <div>
              <Label class="block text-sm font-medium">Nomor Registrasi</Label>
              <Input v-model="form.nomorRegistrasi" class="w-full border p-2" readonly />
            </div>
            <div>
              <Label class="block text-sm font-medium">Nama Donor</Label>
              <Input v-model="form.namaDonor" class="w-full border p-2" readonly />
            </div>
            <div>
              <Label class="block text-sm font-medium">Tanggal Lahir</Label>
              <Input type="date" v-model="form.tanggalLahir" class="w-full border p-2" readonly />
            </div>
            <div>
              <Label class="block text-sm font-medium">Umur</Label>
              <Input v-model="form.umur" class="w-full border p-2" readonly />
            </div>
            <div>
              <Label class="block text-sm font-medium">Jenis Kelamin</Label>
              <Input v-model="form.jenisKelamin" class="w-full border p-2" readonly />
            </div>
            <div>
              <Label class="block text-sm font-medium">Berat Badan</Label>
              <Input v-model="form.beratBadan" class="w-full border p-2" readonly />
            </div>
            <div>
              <Label class="block text-sm font-medium">Golongan Darah</Label>
              <Input v-model="form.golonganDarah" class="w-full border p-2" readonly />
            </div>
            <div class="col-span-2">
              <Label class="block text-sm font-medium">Alamat</Label>
              <textarea v-model="form.alamat" class="w-full border p-2" rows="2" readonly></textarea>
            </div>
          </form>
        </div>
    

      <div  class="border rounded-xl p-4">
        <div>
          <div class="space-y-2">
            <div class="grid grid-cols-4 gap-2">
              <div>
                <Label class="block text-sm font-medium">Anti A</Label>
                <Input v-model="form.antiA" class="w-full border p-2" />
              </div>
              <div>
                <Label class="block text-sm font-medium">Anti B</Label>
                <Input v-model="form.antiB" class="w-full border p-2" />
              </div>
              <div>
                <Label class="block text-sm font-medium">Anti D</Label>
                <Input v-model="form.antiD" class="w-full border p-2" />
              </div>
              <div>
                <Label class="block text-sm font-medium">RH Ctrl</Label>
                <Input v-model="form.rhCtrl" class="w-full border p-2" />
              </div>
            </div>
            <div class="grid grid-cols-4 gap-2">
              <div>
                <Label class="block text-sm font-medium">Cell A1</Label>
                <Input v-model="form.cellA1" class="w-full border p-2" />
              </div>
              <div>
                <Label class="block text-sm font-medium">Cell B</Label>
                <Input v-model="form.cellB" class="w-full border p-2" />
              </div>
              <div>
                <Label class="block text-sm font-medium">S1</Label>
                <Input v-model="form.s1" class="w-full border p-2" />
              </div>
              <div>
                <Label class="block text-sm font-medium">S2</Label>
                <Input v-model="form.s2" class="w-full border p-2" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <Label class="block text-sm font-medium">Golongan Darah</Label>
          <Select v-model="form.golonganDarahKonfirmasi">
            <SelectTrigger class="w-full">
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
        <div>
          <Label class="block text-sm font-medium">Rhesus</Label>
            <div class="flex items-center gap-1">
    
              <RadioGroup v-model="form.rhesus" class="flex gap-6 mt-1">
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="Negatif" value="Negatif" />
                  <label for="rhesusNegatif" class="text-sm">Negatif</label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="Positif" value="Positif" />
                  <label for="rhesusPositif" class="text-sm">Positif</label>
                </div>
              </RadioGroup>
            </div>

        </div>
      </div>
      </div>
    </CardContent>
  </Card>
</div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from "../lib/axios.js";
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

const tabs = ["Identitas", "Metode CLIA", "Metode NAT", "Status"];
const activeTab = ref("Identitas");

// Helper function
const toNullIfEmpty = (value) => value === '' ? null : value;

// Patients table related
const patients = ref([]);
const currentPage = ref(1);
const total = ref(0);
const limit = ref(10);
const searchNoReg = ref("");
const searchNama = ref("");
const beginDate = ref('');
const endDate = ref('');

const totalPages = computed(() => Math.ceil(total.value / limit.value));

// Modal related
const showModal = ref(false);
const modalPatients = ref([]);
const searchNoKartuDonor = ref("");
const searchNoRegistrasi = ref("");
const searchNoBarcode = ref("");
const modalCurrentPage = ref(1);
const modalTotal = ref(0);
const modalTotalPages = computed(() => Math.ceil(modalTotal.value / limit.value));

// Konfirmasi Golongan Darah Modal related
const showKonfirmasiModal = ref(false);

// Nilai Normal Modal related
const showNilaiNormalModal = ref(false);
const nilaiNormalForm = ref({
  nama: '',
  satuan: '',
  nilai_normal: '',
  batas_atas: '',
  batas_bawah: '',
  kritis_atas: '',
  kritis_bawah: ''
});
const nilaiNormalList = ref([]);

const form = ref({
  tanggalRegistrasi: '',
  nomorBarcode: '',
  nomorKantongDarah: '',
  nomorRegistrasi: '',
  statusCekal: 'Diterima',
  alasan: '',
  statusSkrining: '',
  statusOlahDarah: '',
  diperiksaOleh: '',
  namaDonor: '',
  tanggalLahir: '',
  umur: '',
  jenisKelamin: '',
  beratBadan: '',
  golonganDarah: '',
  alamat: '',
  metode: 'CLIA',
  tanggalSkrinning: '',
  namaAlat: '',
  sifilisLotReagen: '',
  sifilisExpDate: '',
  sifilisHasilFinal: '',
  sifilisHasil: '',
  sifilisSelangI: '',
  sifilisSelangII: '',
  sifilisTabungI: '',
  sifilisTabungII: '',
  sifilisKesimpulan: '',
  hbsagLotReagen: '',
  hbsagExpDate: '',
  hbsagHasilFinal: '',
  hbsagHasil: '',
  hbsagSelangI: '',
  hbsagSelangII: '',
  hbsagTabungI: '',
  hbsagTabungII: '',
  hbsagKesimpulan: '',
  hcvLotReagen: '',
  hcvExpDate: '',
  hcvHasilFinal: '',
  hcvHasil: '',
  hcvSelangI: '',
  hcvSelangII: '',
  hcvTabungI: '',
  hcvTabungII: '',
  hcvKesimpulan: '',
  hivLotReagen: '',
  hivExpDate: '',
  hivHasilFinal: '',
  hivHasil: '',
  hivSelangI: '',
  hivSelangII: '',
  hivTabungI: '',
  hivTabungII: '',
  hivKesimpulan: '',
  malariaLotReagen: '',
  malariaExpDate: '',
  malariaHasilFinal: '',
  malariaHasil: '',
  malariaSelangI: '',
  malariaSelangII: '',
  malariaTabungI: '',
  malariaTabungII: '',
  malariaKesimpulan: '',
  tanggalSkrinningNat: '',
  namaAlatNat: '',
  sifilisLotReagenNat: '',
  sifilisExpDateNat: '',
  sifilisHasilNat: '',
  sifilisKesimpulanNat: 'Tidak Reaktif',
  hbsagLotReagenNat: '',
  hbsagExpDateNat: '',
  hbsagHasilNat: '',
  hbsagKesimpulanNat: 'Tidak Reaktif',
  hcvLotReagenNat: '',
  hcvExpDateNat: '',
  hcvHasilNat: '',
  hcvKesimpulanNat: 'Tidak Reaktif',
  hivLotReagenNat: '',
  hivExpDateNat: '',
  hivHasilNat: '',
  hivKesimpulanNat: 'Tidak Reaktif',
  malariaLotReagenNat: '',
  malariaExpDateNat: '',
  malariaHasilNat: '',
  malariaKesimpulanNat: 'Tidak Reaktif',
  antiA: '',
  antiB: '',
  antiD: '',
  rhCtrl: '',
  cellA1: '',
  cellB: '',
  s1: '',
  s2: '',
  golonganDarahKonfirmasi: '',
  donorCard: '',
  rhesus: 'Negatif'
})

async function fetchPatients(page = 1) {
  currentPage.value = page;
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.value.toString());
  if (searchNoReg.value) params.append('nomor_barcode', searchNoReg.value);
  if (searchNama.value) params.append('nama_donor', searchNama.value);
  if (beginDate.value) params.append('tanggal_skrining_start', beginDate.value);
  if (endDate.value) params.append('tanggal_skrining_end', endDate.value);
  try {
    const { data } = await api.get(`/api/hasil_skrining_darah?${params.toString()}`);
    patients.value = data.data || [];
    total.value = data.total || 0;
  } catch (err) {
    console.error('Error fetching hasil_skrining_darah:', err);
  }
}

function getResultColor(result) {
  if (result === 'Tidak Reaktif') return '#DCFCE7'; // soft green'#DCFCE7' '#A7F3D0'
  if (result === 'Reaktif') return '#FEE2E2';     // soft red
  return '#E5E7EB'; // gray for empty / unknown
}

function getResultTextColor(result) {
  if (result === 'Tidak Reaktif') return '#166534';
  if (result === 'Reaktif') return '#991B1B';
  return '#374151';
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

async function selectPatient(hasil) {
  // Clear form data first
  Object.keys(form.value).forEach(key => {
    form.value[key] = '';
  });
  // Reset specific fields to defaults
  form.value.statusCekal = 'Diterima';
  form.value.statusSkrining = '';
  form.value.statusOlahDarah = '';
  form.value.metode = 'CLIA';

  // Populate Identitas tab with hasil_skrining_darah data
  form.value.tanggalRegistrasi = hasil.tanggal_registrasi ? new Date(hasil.tanggal_registrasi).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16);
  form.value.nomorBarcode = hasil.nomor_barcode || '';
  form.value.nomorKantongDarah = hasil.no_kantong_darah || '';
  form.value.nomorRegistrasi = hasil.nomor_registrasi || '';
  form.value.namaDonor = hasil.nama_donor || '';
  form.value.jenisKelamin = hasil.jenis_kelamin || '';
  form.value.tanggalLahir = hasil.tanggal_lahir ? new Date(hasil.tanggal_lahir).toISOString().slice(0, 10) : '';
  form.value.umur = hasil.umur ? hasil.umur.toString() : '';
  form.value.alamat = hasil.alamat || '';
  form.value.diperiksaOleh = hasil.diperiksa_oleh || getCurrentUser()?.username || '';
  form.value.beratBadan = hasil.berat_badan ? hasil.berat_badan.toString() : '';
  form.value.golonganDarah = hasil.golongan_darah || '';
  form.value.rhesus = hasil.rhesus || '';

  // Populate Metode CLIA fields
  form.value.metode = hasil.metode || 'CLIA';
  form.value.tanggalSkrinning = hasil.tanggal_skrining ? new Date(hasil.tanggal_skrining).toISOString().slice(0, 16) : '';
  form.value.namaAlat = hasil.nama_alat || '';
  form.value.sifilisLotReagen = hasil.sifilis_lot_reagen || '';
  form.value.sifilisExpDate = hasil.sifilis_exp_date || '';
  form.value.sifilisHasilFinal = hasil.sifilis_hasil_final || '';
  form.value.sifilisHasil = hasil.sifilis_hasil || '';
  form.value.sifilisSelangI = hasil.sifilis_selang_i || '';
  form.value.sifilisSelangII = hasil.sifilis_selang_ii || '';
  form.value.sifilisTabungI = hasil.sifilis_tabung_i || '';
  form.value.sifilisTabungII = hasil.sifilis_tabung_ii || '';
  form.value.sifilisKesimpulan = hasil.sifilis_kesimpulan || '';
  form.value.hbsagLotReagen = hasil.hbsag_lot_reagen || '';
  form.value.hbsagExpDate = hasil.hbsag_exp_date || '';
  form.value.hbsagHasilFinal = hasil.hbsag_hasil_final || '';
  form.value.hbsagHasil = hasil.hbsag_hasil || '';
  form.value.hbsagSelangI = hasil.hbsag_selang_i || '';
  form.value.hbsagSelangII = hasil.hbsag_selang_ii || '';
  form.value.hbsagTabungI = hasil.hbsag_tabung_i || '';
  form.value.hbsagTabungII = hasil.hbsag_tabung_ii || '';
  form.value.hbsagKesimpulan = hasil.hbsag_kesimpulan || '';
  form.value.hcvLotReagen = hasil.hcv_lot_reagen || '';
  form.value.hcvExpDate = hasil.hcv_exp_date || '';
  form.value.hcvHasilFinal = hasil.hcv_hasil_final || '';
  form.value.hcvHasil = hasil.hcv_hasil || '';
  form.value.hcvSelangI = hasil.hcv_selang_i || '';
  form.value.hcvSelangII = hasil.hcv_selang_ii || '';
  form.value.hcvTabungI = hasil.hcv_tabung_i || '';
  form.value.hcvTabungII = hasil.hcv_tabung_ii || '';
  form.value.hcvKesimpulan = hasil.hcv_kesimpulan || '';
  form.value.hivLotReagen = hasil.hiv_lot_reagen || '';
  form.value.hivExpDate = hasil.hiv_exp_date || '';
  form.value.hivHasilFinal = hasil.hiv_hasil_final || '';
  form.value.hivHasil = hasil.hiv_hasil || '';
  form.value.hivSelangI = hasil.hiv_selang_i || '';
  form.value.hivSelangII = hasil.hiv_selang_ii || '';
  form.value.hivTabungI = hasil.hiv_tabung_i || '';
  form.value.hivTabungII = hasil.hiv_tabung_ii || '';
  form.value.hivKesimpulan = hasil.hiv_kesimpulan || '';
  form.value.malariaLotReagen = hasil.malaria_lot_reagen || '';
  form.value.malariaExpDate = hasil.malaria_exp_date || '';
  form.value.malariaHasilFinal = hasil.malaria_hasil_final || '';
  form.value.malariaHasil = hasil.malaria_hasil || '';
  form.value.malariaSelangI = hasil.malaria_selang_i || '';
  form.value.malariaSelangII = hasil.malaria_selang_ii || '';
  form.value.malariaTabungI = hasil.malaria_tabung_i || '';
  form.value.malariaTabungII = hasil.malaria_tabung_ii || '';
  form.value.malariaKesimpulan = hasil.malaria_kesimpulan || '';

  // Populate Metode NAT fields
  form.value.tanggalSkrinningNat = hasil.tanggal_skrining_nat ? new Date(hasil.tanggal_skrining_nat).toISOString().slice(0, 16) : '';
  form.value.namaAlatNat = hasil.nama_alat_nat || '';
  form.value.sifilisLotReagenNat = hasil.sifilis_lot_reagen_nat || '';
  form.value.sifilisExpDateNat = hasil.sifilis_exp_date_nat || '';
  form.value.sifilisHasilNat = hasil.sifilis_hasil_nat || '';
  form.value.sifilisKesimpulanNat = hasil.sifilis_kesimpulan_nat || 'Tidak Reaktif';
  form.value.hbsagLotReagenNat = hasil.hbsag_lot_reagen_nat || '';
  form.value.hbsagExpDateNat = hasil.hbsag_exp_date_nat || '';
  form.value.hbsagHasilNat = hasil.hbsag_hasil_nat || '';
  form.value.hbsagKesimpulanNat = hasil.hbsag_kesimpulan_nat || 'Tidak Reaktif';
  form.value.hcvLotReagenNat = hasil.hcv_lot_reagen_nat || '';
  form.value.hcvExpDateNat = hasil.hcv_exp_date_nat || '';
  form.value.hcvHasilNat = hasil.hcv_hasil_nat || '';
  form.value.hcvKesimpulanNat = hasil.hcv_kesimpulan_nat || 'Tidak Reaktif';
  form.value.hivLotReagenNat = hasil.hiv_lot_reagen_nat || '';
  form.value.hivExpDateNat = hasil.hiv_exp_date_nat || '';
  form.value.hivHasilNat = hasil.hiv_hasil_nat || '';
  form.value.hivKesimpulanNat = hasil.hiv_kesimpulan_nat || 'Tidak Reaktif';
  form.value.malariaLotReagenNat = hasil.malaria_lot_reagen_nat || '';
  form.value.malariaExpDateNat = hasil.malaria_exp_date_nat || '';
  form.value.malariaHasilNat = hasil.malaria_hasil_nat || '';
  form.value.malariaKesimpulanNat = hasil.malaria_kesimpulan_nat || 'Tidak Reaktif';

  // Populate Status fields
  form.value.statusCekal = hasil.status_cekal || 'Diterima';
  form.value.alasan = hasil.alasan || '';

  // Fetch patient statuses
  try {
    const { data: patient } = await api.get(`/api/patients/${hasil.nomor_registrasi}`);
    if (patient) {
      form.value.statusSkrining = patient.status_skrining || '';
      form.value.statusOlahDarah = hasil.status || '';
      form.value.donorCard = patient.donor_card_no || '';
    }
  } catch (err) {
    console.error('Error fetching patient statuses:', err);
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
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.value.toString());
  params.append('status', 'R');
  if (searchNoRegistrasi.value) params.append('nomor_registrasi', searchNoRegistrasi.value);
  if (searchNama.value) params.append('nama_donor', searchNama.value);
  if (searchNoBarcode.value) params.append('no_barcode', searchNoBarcode.value);
  try {
    const { data } = await api.get(`/api/pemeriksaan_aftap?${params.toString()}`);
    modalPatients.value = data.data || [];
    modalTotal.value = data.total || 0;
  } catch (err) {
    console.error('Error fetching modal aftap:', err);
  }
}

function searchPatients() {
  modalCurrentPage.value = 1;
  fetchModalPatients(1);
}

async function selectPatientFromModal(aftap) {
  // Clear form data first
  Object.keys(form.value).forEach(key => {
    form.value[key] = '';
  });
  // Reset specific fields to defaults
  form.value.statusCekal = 'Diterima';
  form.value.statusSkrining = 'Pending';
  form.value.statusOlahDarah = 'Pending';
  form.value.metode = 'CLIA';

  // Fetch hasil_skrining_darah data using nomor_registrasi from aftap
  try {
    const { data: response } = await api.get(`/api/hasil_skrining_darah?nomor_registrasi=${aftap.nomor_registrasi}`);
    const hasilData = response.data && response.data.length > 0 ? response.data[0] : null;
    if (hasilData) {
      // Populate Identitas tab with hasil_skrining_darah data
      form.value.tanggalRegistrasi = hasilData.tanggal_registrasi ? new Date(hasilData.tanggal_registrasi).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16);
      form.value.nomorBarcode = hasilData.nomor_barcode || '';
      form.value.nomorKantongDarah = hasilData.no_kantong_darah || '';
      form.value.nomorRegistrasi = hasilData.nomor_registrasi || '';
      form.value.namaDonor = hasilData.nama_donor || '';
      form.value.jenisKelamin = hasilData.jenis_kelamin || '';
      form.value.tanggalLahir = hasilData.tanggal_lahir ? new Date(hasilData.tanggal_lahir).toISOString().slice(0, 10) : '';
      form.value.umur = hasilData.umur ? hasilData.umur.toString() : '';
      form.value.alamat = hasilData.alamat || '';
      form.value.diperiksaOleh = hasilData.diperiksa_oleh || '';
      form.value.beratBadan = hasilData.berat_badan ? hasilData.berat_badan.toString() : '';
      form.value.golonganDarah = hasilData.golongan_darah || '';
      form.value.rhesus = hasilData.rhesus || '';

      // Populate Metode CLIA fields
      form.value.metode = hasilData.metode || 'CLIA';
      form.value.tanggalSkrinning = hasilData.tanggal_skrining ? new Date(hasilData.tanggal_skrining).toISOString().slice(0, 16) : '';
      form.value.namaAlat = hasilData.nama_alat || '';
      form.value.sifilisLotReagen = hasilData.sifilis_lot_reagen || '';
      form.value.sifilisExpDate = hasilData.sifilis_exp_date || '';
      form.value.sifilisHasilFinal = hasilData.sifilis_hasil_final || '';
      form.value.sifilisHasil = hasilData.sifilis_hasil || '';
      form.value.sifilisSelangI = hasilData.sifilis_selang_i || '';
      form.value.sifilisSelangII = hasilData.sifilis_selang_ii || '';
      form.value.sifilisTabungI = hasilData.sifilis_tabung_i || '';
      form.value.sifilisTabungII = hasilData.sifilis_tabung_ii || '';
      form.value.sifilisKesimpulan = hasilData.sifilis_kesimpulan || 'Tidak Reaktif';
      form.value.hbsagLotReagen = hasilData.hbsag_lot_reagen || '';
      form.value.hbsagExpDate = hasilData.hbsag_exp_date || '';
      form.value.hbsagHasilFinal = hasilData.hbsag_hasil_final || '';
      form.value.hbsagHasil = hasilData.hbsag_hasil || '';
      form.value.hbsagSelangI = hasilData.hbsag_selang_i || '';
      form.value.hbsagSelangII = hasilData.hbsag_selang_ii || '';
      form.value.hbsagTabungI = hasilData.hbsag_tabung_i || '';
      form.value.hbsagTabungII = hasilData.hbsag_tabung_ii || '';
      form.value.hbsagKesimpulan = hasilData.hbsag_kesimpulan || 'Tidak Reaktif';
      form.value.hcvLotReagen = hasilData.hcv_lot_reagen || '';
      form.value.hcvExpDate = hasilData.hcv_exp_date || '';
      form.value.hcvHasilFinal = hasilData.hcv_hasil_final || '';
      form.value.hcvHasil = hasilData.hcv_hasil || '';
      form.value.hcvSelangI = hasilData.hcv_selang_i || '';
      form.value.hcvSelangII = hasilData.hcv_selang_ii || '';
      form.value.hcvTabungI = hasilData.hcv_tabung_i || '';
      form.value.hcvTabungII = hasilData.hcv_tabung_ii || '';
      form.value.hcvKesimpulan = hasilData.hcv_kesimpulan || 'Tidak Reaktif';
      form.value.hivLotReagen = hasilData.hiv_lot_reagen || '';
      form.value.hivExpDate = hasilData.hiv_exp_date || '';
      form.value.hivHasilFinal = hasilData.hiv_hasil_final || '';
      form.value.hivHasil = hasilData.hiv_hasil || '';
      form.value.hivSelangI = hasilData.hiv_selang_i || '';
      form.value.hivSelangII = hasilData.hiv_selang_ii || '';
      form.value.hivTabungI = hasilData.hiv_tabung_i || '';
      form.value.hivTabungII = hasilData.hiv_tabung_ii || '';
      form.value.hivKesimpulan = hasilData.hiv_kesimpulan || 'Tidak Reaktif';
      form.value.malariaLotReagen = hasilData.malaria_lot_reagen || '';
      form.value.malariaExpDate = hasilData.malaria_exp_date || '';
      form.value.malariaHasilFinal = hasilData.malaria_hasil_final || '';
      form.value.malariaHasil = hasilData.malaria_hasil || '';
      form.value.malariaSelangI = hasilData.malaria_selang_i || '';
      form.value.malariaSelangII = hasilData.malaria_selang_ii || '';
      form.value.malariaTabungI = hasilData.malaria_tabung_i || '';
      form.value.malariaTabungII = hasilData.malaria_tabung_ii || '';
      form.value.malariaKesimpulan = hasilData.malaria_kesimpulan || 'Tidak Reaktif';

      // Populate Metode NAT fields
      form.value.tanggalSkrinningNat = hasilData.tanggal_skrining_nat ? new Date(hasilData.tanggal_skrining_nat).toISOString().slice(0, 16) : '';
      form.value.namaAlatNat = hasilData.nama_alat_nat || '';
      form.value.sifilisLotReagenNat = hasilData.sifilis_lot_reagen_nat || '';
      form.value.sifilisExpDateNat = hasilData.sifilis_exp_date_nat || '';
      form.value.sifilisHasilNat = hasilData.sifilis_hasil_nat || '';
      form.value.sifilisKesimpulanNat = hasilData.sifilis_kesimpulan_nat || 'Tidak Reaktif';
      form.value.hbsagLotReagenNat = hasilData.hbsag_lot_reagen_nat || '';
      form.value.hbsagExpDateNat = hasilData.hbsag_exp_date_nat || '';
      form.value.hbsagHasilNat = hasilData.hbsag_hasil_nat || '';
      form.value.hbsagKesimpulanNat = hasilData.hbsag_kesimpulan_nat || 'Tidak Reaktif';
      form.value.hcvLotReagenNat = hasilData.hcv_lot_reagen_nat || '';
      form.value.hcvExpDateNat = hasilData.hcv_exp_date_nat || '';
      form.value.hcvHasilNat = hasilData.hcv_hasil_nat || '';
      form.value.hcvKesimpulanNat = hasilData.hcv_kesimpulan_nat || 'Tidak Reaktif';
      form.value.hivLotReagenNat = hasilData.hiv_lot_reagen_nat || '';
      form.value.hivExpDateNat = hasilData.hiv_exp_date_nat || '';
      form.value.hivHasilNat = hasilData.hiv_hasil_nat || '';
      form.value.hivKesimpulanNat = hasilData.hiv_kesimpulan_nat || 'Tidak Reaktif';
      form.value.malariaLotReagenNat = hasilData.malaria_lot_reagen_nat || '';
      form.value.malariaExpDateNat = hasilData.malaria_exp_date_nat || '';
      form.value.malariaHasilNat = hasilData.malaria_hasil_nat || '';
      form.value.malariaKesimpulanNat = hasilData.malaria_kesimpulan_nat || 'Tidak Reaktif';

      // Populate Status fields
      form.value.statusCekal = hasilData.status_cekal || 'Diterima';
      form.value.alasan = hasilData.alasan || '';

      // Fetch patient statuses
      try {
        const { data: patient } = await api.get(`/api/patients/${aftap.nomor_registrasi}`);
        if (patient) {
          form.value.statusSkrining = patient.status_skrining || 'Pending';
          form.value.statusOlahDarah = patient.status_olah_darah || 'Pending';
          form.value.donorCard = patient.donor_card_no || '';
        }
      } catch (err) {
        console.error('Error fetching patient statuses:', err);
      }
      closeModal();
    } else {
      closeModal();
    }
  } catch (err) {
    console.error('Error fetching hasil_skrining_darah:', err);
    closeModal();
  }
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

async function refreshData() {
  fetchPatients(currentPage.value);
  // Refresh form.statusOlahDarah if nomorRegistrasi is set
  if (form.value.nomorRegistrasi) {
    try {
      const { data: response } = await api.get(`/api/hasil_skrining_darah?nomor_registrasi=${form.value.nomorRegistrasi}`);
      const hasilData = response.data && response.data.length > 0 ? response.data[0] : null;
      if (hasilData) {
        form.value.statusOlahDarah = hasilData.status || 'Pending';
      }
    } catch (err) {
      console.error('Error refreshing form status:', err);
    }
  }
}

function cariDataRegistrasi() {
  showModal.value = true;
  modalCurrentPage.value = 1;
  fetchModalPatients(1);
}

async function undo() {
   console.log('Undo clicked')
   if (!form.value.nomorBarcode) {
      alert('Silahkan pilih data donor terlebih dahulu');
      return;
    }
   try {
     // Update hasil_skrining_darah
     const { data: hasilData } = await api.post('/api/hasil_skrining_darah', {
       nomorRegistrasi: form.value.nomorRegistrasi,
       nomorBarcode: toNullIfEmpty(form.value.nomorBarcode),
       statusCekal: 'Diterima',
       release_by: null,
       status: 'Proses'
     });
     console.log('hasil_skrining_darah updated:', hasilData);

     // Update pemeriksaan_aftap
     const { data: aftapData } = await api.post('/api/pemeriksaan_aftap', {
       nomor_registrasi: form.value.nomorRegistrasi,
       status_skrining: 'Proses'
     });
     console.log('pemeriksaan_aftap updated:', aftapData);

     // Update patient status
     const { data: patientData } = await api.put('/api/patients', {
       regno: form.value.nomorRegistrasi,
       status_skrining: 'Proses'
     });
     console.log('patient updated:', patientData);

     // Log activity
     const user = getCurrentUser();
     const { data: logData } = await api.post('/api/activity_log', {
       note: 'Undo',
       userid: user.username,
       pid: form.value.donorCard,
       regno: form.value.nomorRegistrasi,
       barcodeno: form.value.nomorBarcode,
       menu: 'Hasil Skrining Darah'
     });
     console.log('Activity logged:', logData);
   } catch (err) {
     console.error('Error undoing:', err);
   }
   refreshData();
 }

async function simpanData() {
    console.log('simpanData called');
 
    if (!form.value.nomorBarcode) {
      alert('Silahkan pilih data donor terlebih dahulu');
      return;
    }
    
    // Helper function to convert empty strings to null
    const toNullIfEmpty = (value) => value === '' ? null : value;

    // Prepare data to send
    const dataToSend = {
      nomorRegistrasi: form.value.nomorRegistrasi,
      tanggalRegistrasi: toNullIfEmpty(form.value.tanggalRegistrasi),
      nomorBarcode: toNullIfEmpty(form.value.nomorBarcode),
      // nomorKantongDarah: toNullIfEmpty(form.value.nomorKantongDarah),
      diperiksaOleh: toNullIfEmpty(form.value.diperiksaOleh),
      namaDonor: toNullIfEmpty(form.value.namaDonor),
      tanggalLahir: toNullIfEmpty(form.value.tanggalLahir),
      umur: toNullIfEmpty(form.value.umur),
      jenisKelamin: toNullIfEmpty(form.value.jenisKelamin),
      beratBadan: toNullIfEmpty(form.value.beratBadan),
      golonganDarah: toNullIfEmpty(form.value.golonganDarah),
      alamat: toNullIfEmpty(form.value.alamat),
      metode: form.value.metode,
      tanggalSkrinning: toNullIfEmpty(form.value.tanggalSkrinning),
      namaAlat: toNullIfEmpty(form.value.namaAlat),
      sifilisLotReagen: toNullIfEmpty(form.value.sifilisLotReagen),
      sifilisExpDate: toNullIfEmpty(form.value.sifilisExpDate),
      sifilisHasilFinal: toNullIfEmpty(form.value.sifilisHasilFinal),
      sifilisHasil: toNullIfEmpty(form.value.sifilisHasil),
      sifilisSelangI: toNullIfEmpty(form.value.sifilisSelangI),
      sifilisSelangII: toNullIfEmpty(form.value.sifilisSelangII),
      sifilisTabungI: toNullIfEmpty(form.value.sifilisTabungI),
      sifilisTabungII: toNullIfEmpty(form.value.sifilisTabungII),
      sifilisKesimpulan: form.value.sifilisKesimpulan,
      hbsagLotReagen: toNullIfEmpty(form.value.hbsagLotReagen),
      hbsagExpDate: toNullIfEmpty(form.value.hbsagExpDate),
      hbsagHasilFinal: toNullIfEmpty(form.value.hbsagHasilFinal),
      hbsagHasil: toNullIfEmpty(form.value.hbsagHasil),
      hbsagSelangI: toNullIfEmpty(form.value.hbsagSelangI),
      hbsagSelangII: toNullIfEmpty(form.value.hbsagSelangII),
      hbsagTabungI: toNullIfEmpty(form.value.hbsagTabungI),
      hbsagTabungII: toNullIfEmpty(form.value.hbsagTabungII),
      hbsagKesimpulan: form.value.hbsagKesimpulan,
      hcvLotReagen: toNullIfEmpty(form.value.hcvLotReagen),
      hcvExpDate: toNullIfEmpty(form.value.hcvExpDate),
      hcvHasilFinal: toNullIfEmpty(form.value.hcvHasilFinal),
      hcvHasil: toNullIfEmpty(form.value.hcvHasil),
      hcvSelangI: toNullIfEmpty(form.value.hcvSelangI),
      hcvSelangII: toNullIfEmpty(form.value.hcvSelangII),
      hcvTabungI: toNullIfEmpty(form.value.hcvTabungI),
      hcvTabungII: toNullIfEmpty(form.value.hcvTabungII),
      hcvKesimpulan: form.value.hcvKesimpulan,
      hivLotReagen: toNullIfEmpty(form.value.hivLotReagen),
      hivExpDate: toNullIfEmpty(form.value.hivExpDate),
      hivHasilFinal: toNullIfEmpty(form.value.hivHasilFinal),
      hivHasil: toNullIfEmpty(form.value.hivHasil),
      hivSelangI: toNullIfEmpty(form.value.hivSelangI),
      hivSelangII: toNullIfEmpty(form.value.hivSelangII),
      hivTabungI: toNullIfEmpty(form.value.hivTabungI),
      hivTabungII: toNullIfEmpty(form.value.hivTabungII),
      hivKesimpulan: form.value.hivKesimpulan,
      malariaLotReagen: toNullIfEmpty(form.value.malariaLotReagen),
      malariaExpDate: toNullIfEmpty(form.value.malariaExpDate),
      malariaHasilFinal: toNullIfEmpty(form.value.malariaHasilFinal),
      malariaHasil: toNullIfEmpty(form.value.malariaHasil),
      malariaSelangI: toNullIfEmpty(form.value.malariaSelangI),
      malariaSelangII: toNullIfEmpty(form.value.malariaSelangII),
      malariaTabungI: toNullIfEmpty(form.value.malariaTabungI),
      malariaTabungII: toNullIfEmpty(form.value.malariaTabungII),
      malariaKesimpulan: form.value.malariaKesimpulan,
      tanggalSkrinningNat: toNullIfEmpty(form.value.tanggalSkrinningNat),
      namaAlatNat: toNullIfEmpty(form.value.namaAlatNat),
      sifilisLotReagenNat: toNullIfEmpty(form.value.sifilisLotReagenNat),
      sifilisExpDateNat: toNullIfEmpty(form.value.sifilisExpDateNat),
      sifilisHasilNat: toNullIfEmpty(form.value.sifilisHasilNat),
      sifilisKesimpulanNat: form.value.sifilisKesimpulanNat,
      hbsagLotReagenNat: toNullIfEmpty(form.value.hbsagLotReagenNat),
      hbsagExpDateNat: toNullIfEmpty(form.value.hbsagExpDateNat),
      hbsagHasilNat: toNullIfEmpty(form.value.hbsagHasilNat),
      hbsagKesimpulanNat: form.value.hbsagKesimpulanNat,
      hcvLotReagenNat: toNullIfEmpty(form.value.hcvLotReagenNat),
      hcvExpDateNat: toNullIfEmpty(form.value.hcvExpDateNat),
      hcvHasilNat: toNullIfEmpty(form.value.hcvHasilNat),
      hcvKesimpulanNat: form.value.hcvKesimpulanNat,
      hivLotReagenNat: toNullIfEmpty(form.value.hivLotReagenNat),
      hivExpDateNat: toNullIfEmpty(form.value.hivExpDateNat),
      hivHasilNat: toNullIfEmpty(form.value.hivHasilNat),
      hivKesimpulanNat: form.value.hivKesimpulanNat,
      malariaLotReagenNat: toNullIfEmpty(form.value.malariaLotReagenNat),
      malariaExpDateNat: toNullIfEmpty(form.value.malariaExpDateNat),
      malariaHasilNat: toNullIfEmpty(form.value.malariaHasilNat),
      malariaKesimpulanNat: form.value.malariaKesimpulanNat,
      statusCekal: form.value.statusCekal,
      alasan: toNullIfEmpty(form.value.alasan)
    };

    console.log('dataToSend:', dataToSend);

    try {
      const { data: hasilData } = await api.post('/api/hasil_skrining_darah', dataToSend);
      console.log('hasil_skrining_darah response:', hasilData);

      // Update patient statuses
      const patientUpdate = {
        regno: form.value.nomorRegistrasi,
        status_skrining: form.value.statusSkrining,
        status_olah_darah: form.value.statusOlahDarah
      };
      console.log('patientUpdate:', patientUpdate);
      const { data: patientData } = await api.put('/api/patients', patientUpdate);
      console.log('patients PUT response:', patientData);

      alert('Data saved successfully');

      // Log activity
      const user = getCurrentUser();
      console.log('user:', user);
      const { data: logData } = await api.post('/api/activity_log', {
        note: 'Simpan Data',
        userid: user.username,
        pid: form.value.donorCard,
        regno: form.value.nomorRegistrasi,
        barcodeno: form.value.nomorBarcode,
        menu: 'Hasil Skrining Darah'
      });
      console.log('Activity logged:', logData);

      // Insert into log_cekal if statusCekal is Ditolak
      if (form.value.statusCekal === 'Ditolak') {
        console.log('Inserting log_cekal');
        const { data: patient } = await api.get(`/api/patients/${form.value.nomorRegistrasi}`);
        console.log('patient for log_cekal:', patient);
        const logData = {
          nomor_registrasi: form.value.nomorRegistrasi,
          no_barcode: null,
          no_kartu_donor: patient.donor_card_no,
          petugas: getCurrentUser().username,
          alasan: form.value.alasan,
          menu: 'Skrining Sampel Darah',
          keterangan: form.value.alasan,
          created_by: getCurrentUser().username
        };
        console.log('logData:', logData);
        const { data: logResult } = await api.post('/api/log_cekal', logData);
        console.log('Log cekal inserted:', logResult);
      }
    } catch (err) {
      console.error('Error saving data:', err);
      alert('Error saving data');
    }
    refreshData();
  }

async function releaseData() {
     console.log('Release Data clicked')
     // 1️⃣ Check donor selected
     if (!form.value.nomorBarcode) {
      alert('Silahkan pilih data donor terlebih dahulu');
      return;
    }
    // 2️⃣ Check hasil skrining
    const {
      sifilisHasilFinal,
      hbsagHasilFinal,
      hcvHasilFinal,
      hivHasilFinal
    } = form.value

    if (
      !sifilisHasilFinal ||
      !hbsagHasilFinal ||
      !hcvHasilFinal ||
      !hivHasilFinal
    ) {
      alert('Lengkapi semua hasil skrining (Sifilis, HBsAg, HCV, HIV) sebelum Release')
      return
    }

    // Add request data logging
    const dataToSend = {
      nomorRegistrasi: form.value.nomorRegistrasi,
      nomorBarcode: toNullIfEmpty(form.value.nomorBarcode),
      nomorKantongDarah: toNullIfEmpty(form.value.nomorKantongDarah),
      statusCekal: form.value.statusCekal,
      release_by: 'admin',
      status: 'Selesai',
      release_at: new Date().toISOString(),
      tanggalRegistrasi: toNullIfEmpty(form.value.tanggalRegistrasi),
      nomorBarcode: toNullIfEmpty(form.value.nomorBarcode),
      // nomorKantongDarah: toNullIfEmpty(form.value.nomorKantongDarah),
      diperiksaOleh: toNullIfEmpty(form.value.diperiksaOleh),
      namaDonor: toNullIfEmpty(form.value.namaDonor),
      tanggalLahir: toNullIfEmpty(form.value.tanggalLahir),
      umur: toNullIfEmpty(form.value.umur),
      jenisKelamin: toNullIfEmpty(form.value.jenisKelamin),
      beratBadan: toNullIfEmpty(form.value.beratBadan),
      golonganDarah: toNullIfEmpty(form.value.golonganDarah),
      alamat: toNullIfEmpty(form.value.alamat),
      metode: form.value.metode,
      tanggalSkrinning: toNullIfEmpty(form.value.tanggalSkrinning),
      namaAlat: toNullIfEmpty(form.value.namaAlat),
      sifilisLotReagen: toNullIfEmpty(form.value.sifilisLotReagen),
      sifilisExpDate: toNullIfEmpty(form.value.sifilisExpDate),
      sifilisHasilFinal: toNullIfEmpty(form.value.sifilisHasilFinal),
      sifilisHasil: toNullIfEmpty(form.value.sifilisHasil),
      sifilisSelangI: toNullIfEmpty(form.value.sifilisSelangI),
      sifilisSelangII: toNullIfEmpty(form.value.sifilisSelangII),
      sifilisTabungI: toNullIfEmpty(form.value.sifilisTabungI),
      sifilisTabungII: toNullIfEmpty(form.value.sifilisTabungII),
      sifilisKesimpulan: form.value.sifilisKesimpulan,
      hbsagLotReagen: toNullIfEmpty(form.value.hbsagLotReagen),
      hbsagExpDate: toNullIfEmpty(form.value.hbsagExpDate),
      hbsagHasilFinal: toNullIfEmpty(form.value.hbsagHasilFinal),
      hbsagHasil: toNullIfEmpty(form.value.hbsagHasil),
      hbsagSelangI: toNullIfEmpty(form.value.hbsagSelangI),
      hbsagSelangII: toNullIfEmpty(form.value.hbsagSelangII),
      hbsagTabungI: toNullIfEmpty(form.value.hbsagTabungI),
      hbsagTabungII: toNullIfEmpty(form.value.hbsagTabungII),
      hbsagKesimpulan: form.value.hbsagKesimpulan,
      hcvLotReagen: toNullIfEmpty(form.value.hcvLotReagen),
      hcvExpDate: toNullIfEmpty(form.value.hcvExpDate),
      hcvHasilFinal: toNullIfEmpty(form.value.hcvHasilFinal),
      hcvHasil: toNullIfEmpty(form.value.hcvHasil),
      hcvSelangI: toNullIfEmpty(form.value.hcvSelangI),
      hcvSelangII: toNullIfEmpty(form.value.hcvSelangII),
      hcvTabungI: toNullIfEmpty(form.value.hcvTabungI),
      hcvTabungII: toNullIfEmpty(form.value.hcvTabungII),
      hcvKesimpulan: form.value.hcvKesimpulan,
      hivLotReagen: toNullIfEmpty(form.value.hivLotReagen),
      hivExpDate: toNullIfEmpty(form.value.hivExpDate),
      hivHasilFinal: toNullIfEmpty(form.value.hivHasilFinal),
      hivHasil: toNullIfEmpty(form.value.hivHasil),
      hivSelangI: toNullIfEmpty(form.value.hivSelangI),
      hivSelangII: toNullIfEmpty(form.value.hivSelangII),
      hivTabungI: toNullIfEmpty(form.value.hivTabungI),
      hivTabungII: toNullIfEmpty(form.value.hivTabungII),
      hivKesimpulan: form.value.hivKesimpulan,
      malariaLotReagen: toNullIfEmpty(form.value.malariaLotReagen),
      malariaExpDate: toNullIfEmpty(form.value.malariaExpDate),
      malariaHasilFinal: toNullIfEmpty(form.value.malariaHasilFinal),
      malariaHasil: toNullIfEmpty(form.value.malariaHasil),
      malariaSelangI: toNullIfEmpty(form.value.malariaSelangI),
      malariaSelangII: toNullIfEmpty(form.value.malariaSelangII),
      malariaTabungI: toNullIfEmpty(form.value.malariaTabungI),
      malariaTabungII: toNullIfEmpty(form.value.malariaTabungII),
      malariaKesimpulan: form.value.malariaKesimpulan,
      tanggalSkrinningNat: toNullIfEmpty(form.value.tanggalSkrinningNat),
      namaAlatNat: toNullIfEmpty(form.value.namaAlatNat),
      sifilisLotReagenNat: toNullIfEmpty(form.value.sifilisLotReagenNat),
      sifilisExpDateNat: toNullIfEmpty(form.value.sifilisExpDateNat),
      sifilisHasilNat: toNullIfEmpty(form.value.sifilisHasilNat),
      sifilisKesimpulanNat: form.value.sifilisKesimpulanNat,
      hbsagLotReagenNat: toNullIfEmpty(form.value.hbsagLotReagenNat),
      hbsagExpDateNat: toNullIfEmpty(form.value.hbsagExpDateNat),
      hbsagHasilNat: toNullIfEmpty(form.value.hbsagHasilNat),
      hbsagKesimpulanNat: form.value.hbsagKesimpulanNat,
      hcvLotReagenNat: toNullIfEmpty(form.value.hcvLotReagenNat),
      hcvExpDateNat: toNullIfEmpty(form.value.hcvExpDateNat),
      hcvHasilNat: toNullIfEmpty(form.value.hcvHasilNat),
      hcvKesimpulanNat: form.value.hcvKesimpulanNat,
      hivLotReagenNat: toNullIfEmpty(form.value.hivLotReagenNat),
      hivExpDateNat: toNullIfEmpty(form.value.hivExpDateNat),
      hivHasilNat: toNullIfEmpty(form.value.hivHasilNat),
      hivKesimpulanNat: form.value.hivKesimpulanNat,
      malariaLotReagenNat: toNullIfEmpty(form.value.malariaLotReagenNat),
      malariaExpDateNat: toNullIfEmpty(form.value.malariaExpDateNat),
      malariaHasilNat: toNullIfEmpty(form.value.malariaHasilNat),
      malariaKesimpulanNat: form.value.malariaKesimpulanNat,
      statusCekal: form.value.statusCekal,
      alasan: toNullIfEmpty(form.value.alasan)
    };

    console.log('Sending data to hasil_skrining_darah:', dataToSend);

    try {
      // 1️⃣ Update hasil_skrinning_darah
      const { data: hasilData } = await api.post('/api/hasil_skrining_darah', dataToSend);
      console.log('hasil_skrining_darah updated:', hasilData);

      // 2️⃣ Update pemeriksaan_aftap
      const { data: aftapData } = await api.post('/api/pemeriksaan_aftap', {
        nomor_registrasi: form.value.nomorRegistrasi,
        status_skrining: 'Selesai'
      });
      console.log('pemeriksaan_aftap updated:', aftapData);

      // 3️⃣ Update patient status
      const { data: patientData } = await api.put('/api/patients', {
        regno: form.value.nomorRegistrasi,
        status_skrining: 'Selesai'
      });
      console.log('patient updated:', patientData);

      //update di api post('/api/hasil_skrining_darah
      // 4️⃣ Update status_skrining di karantina_kantong_darah 
      // const barcode10 = (form.value.nomorBarcode || '').slice(0, 10);
      // const statusSkriningKarantina =
      //   form.value.statusCekal === 'Ditolak' ? 'Ditolak' : 'Release';

      // if (barcode10) {
      //   await api.put('/api/karantina_kantong_darah/update', {
      //     nomor_barcode: barcode10,
      //     status_skrining: statusSkriningKarantina
      //     // tidak perlu action/id → backend kita handle khusus
      //   });
      //   console.log('karantina_kantong_darah status_skrining updated:', statusSkriningKarantina);
      // }

      alert('Data saved successfully');
      
      // 5️⃣ Log activity
      const user = getCurrentUser();
      const { data: logData } = await api.post('/api/activity_log', {
        note: 'Release Data',
        userid: user.username,
        pid: form.value.donorCard,
        regno: form.value.nomorRegistrasi,
        barcodeno: form.value.nomorBarcode,
        menu: 'Hasil Skrining Darah'
      });
      console.log('Activity logged:', logData);

      // 6️⃣ Insert into log_cekal if Ditolak
      if (form.value.statusCekal === 'Ditolak') {
        const { data: patient } = await api.get(`/api/patients/${form.value.nomorRegistrasi}`);
        const logData = {
          nomor_registrasi: form.value.nomorRegistrasi,
          no_barcode: null,
          no_kartu_donor: patient.donor_card_no,
          petugas: getCurrentUser().username,
          alasan: form.value.alasan,
          menu: 'Skrining Sampel Darah',
          keterangan: form.value.alasan,
          created_by: getCurrentUser().username
        };
        const { data: logResult } = await api.post('/api/log_cekal', logData);
        console.log('Log cekal inserted:', logResult);
      }
    } catch (err) {
      console.error('Error releasing:', err);
    }
    refreshData();
  }

async function ujiKonfirmasiGolonganDarah() {
  if (!form.value.nomorBarcode) {
      alert('Silahkan pilih data donor terlebih dahulu');
      return;
  }
  try {
    // Fetch existing konfirmasi data if available
    const { data } = await api.get(`/api/hasil_konfirmasi_golongan_darah/${form.value.nomorRegistrasi}`);
    if (data) {
      // Populate form with existing data
      form.value.antiA = data.anti_a || '';
      form.value.antiB = data.anti_b || '';
      form.value.antiD = data.anti_d || '';
      form.value.rhCtrl = data.rh_ctrl || '';
      form.value.cellA1 = data.cell_a1 || '';
      form.value.cellB = data.cell_b || '';
      form.value.s1 = data.s1 || '';
      form.value.s2 = data.s2 || '';
      form.value.golonganDarahKonfirmasi = data.golongan_darah || '';
      form.value.rhesus = data.rhesus || 'Negatif';
    } else {
      // Clear fields for new entry
      form.value.antiA = '';
      form.value.antiB = '';
      form.value.antiD = '';
      form.value.rhCtrl = '';
      form.value.cellA1 = '';
      form.value.cellB = '';
      form.value.s1 = '';
      form.value.s2 = '';
      form.value.golonganDarahKonfirmasi = '';
      form.value.rhesus = 'Negatif';
    }
  } catch (err) {
    console.error('Error fetching konfirmasi data:', err);
    // Clear fields on error
    form.value.antiA = '';
    form.value.antiB = '';
    form.value.antiD = '';
    form.value.rhCtrl = '';
    form.value.cellA1 = '';
    form.value.cellB = '';
    form.value.s1 = '';
    form.value.s2 = '';
    form.value.golonganDarahKonfirmasi = '';
    form.value.rhesus = 'Negatif';
  } finally {
    showKonfirmasiModal.value = true;
  }
}

function ubahNilaiNormal() {
  showNilaiNormalModal.value = true;
  fetchNilaiNormalList();
}

function closeKonfirmasiModal() {
  showKonfirmasiModal.value = false;
}

async function simpanKonfirmasiData() {
  // Prepare data to send
  const dataToSend = {
    nomorRegistrasi: form.value.nomorRegistrasi,
    no_barcode: form.value.nomorBarcode,
    no_kantong_darah: form.value.nomorKantongDarah,
    antiA: form.value.antiA,
    antiB: form.value.antiB,
    antiD: form.value.antiD,
    rhCtrl: form.value.rhCtrl,
    cellA1: form.value.cellA1,
    cellB: form.value.cellB,
    s1: form.value.s1,
    s2: form.value.s2,
    golonganDarah: form.value.golonganDarahKonfirmasi,
    rhesus: form.value.rhesus,
    createdBy: getCurrentUser().username
  };

  try {
    const { data } = await api.post('/api/hasil_konfirmasi_golongan_darah', dataToSend);
    alert(data.message || 'Data saved successfully');
    closeKonfirmasiModal();
  } catch (err) {
    console.error('Error saving data:', err);
    alert('Error saving data');
  }
}

function closeNilaiNormalModal() {
  showNilaiNormalModal.value = false;
}

function clearNilaiNormalForm() {
  nilaiNormalForm.value = {
    nama: '',
    satuan: '',
    nilai_normal: '',
    batas_atas: '',
    batas_bawah: '',
    kritis_atas: '',
    kritis_bawah: ''
  };
}

async function simpanNilaiNormal() {
  try {
    const { data } = await api.post('/api/master_test', nilaiNormalForm.value);
    alert(data.message || 'Data saved');
    fetchNilaiNormalList();
    clearNilaiNormalForm();
  } catch (err) {
    console.error('Error saving:', err);
  }
}

function pilihNilaiNormal(item) {
  nilaiNormalForm.value = { ...item };
}

async function fetchNilaiNormalList() {
  try {
    const { data } = await api.get('/api/master_test');
    nilaiNormalList.value = data.data || [];
  } catch (err) {
    console.error('Error fetching:', err);
  }
}

function copyToFinal(column) {
  const tests = ['sifilis', 'hbsag', 'hcv', 'hiv', 'malaria'];
  tests.forEach(test => {
    const sourceKey = `${test}${column}`;
    const targetKey = `${test}HasilFinal`;
    form.value[targetKey] = form.value[sourceKey];
  });
}

function applyFilters() {
  fetchPatients(1);
}

function clearFilters() {
  searchNoReg.value = '';
  searchNama.value = '';
  fetchPatients(1);
}

function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

// Load patients on component mount
onMounted(() => {
  endDate.value = new Date().toISOString().slice(0, 10);
  beginDate.value = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  fetchPatients(1);
});
</script>