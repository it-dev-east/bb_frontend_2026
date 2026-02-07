<!--MainMenu.vue -->
<template>
  <main class="flex-1 p-0">
    <Dashboard v-if="currentView === 'dashboard'" />
    <PatientProcess v-else-if="currentView === 'registrasi'" />
    <VerifikasiRegistrasiDonor v-else-if="currentView === 'verifikasi-registrasi-donor'" />
    <HbGolonganDarah v-else-if="currentView === 'hb-golongan-darah'" />
    <PemeriksaanFisik v-else-if="currentView === 'pemeriksaan-fisik'" />
    <PemeriksaanAftap v-else-if="currentView === 'pemeriksaan-aftap'" />
    <AftapApheresis v-else-if="currentView === 'aftap-apheresis'" />
    <PengirimanKantongDarah v-else-if="currentView === 'pengiriman-kantong-darah'" />
    <PenerimaanSampelDarah v-else-if="currentView === 'penerimaan-sampel-darah'" />
    <HasilSkriningDarah v-else-if="currentView === 'hasil-skrining-darah'" />
    <PenerimaanKantongDarah v-else-if="currentView === 'penerimaan-kantong-darah'" />
    <PengolahanKantongDarah v-else-if="currentView === 'pengolahan-kantong-darah'" />
    <KarantinaKantongDarah v-else-if="currentView === 'karantina-kantong-darah'" />
    <ReleaseKantongDarah v-else-if="currentView === 'release-kantong-darah'" />
    <DonorLookback v-else-if="currentView === 'donor-lookback'" />
    <Questionnaire v-else-if="currentView === 'questionnaire'" />
    <ManajemenKantongDarah
      v-else-if="currentView === 'manajemen-kantong-darah'"
      @change-view="$emit('change-view', $event)"
    />
    <PemusnahanKantongDarah
      v-else-if="currentView === 'pemusnahan-kantong-darah'"
      @change-view="$emit('change-view', $event)"
    />
    <Reports 
      v-else-if="currentView === 'reports'" 
      @change-view="$emit('change-view', $event)" 
    />
    <ReportsDonorDitolak
      v-else-if="currentView === 'reports-donor-ditolak'"
      @change-view="$emit('change-view', $event)"
    />
    <ReportsKartuStok
      v-else-if="currentView === 'reports-kartu-stok'"
      @change-view="$emit('change-view', $event)"
    />
    <ReportsRegistrasiPendonor
      v-else-if="currentView === 'reports-registrasi-pendonor'"
      @change-view="$emit('change-view', $event)"
    />
    <ReportsJumlahPendonor
      v-else-if="currentView === 'reports-jumlah-pendonor'"
      @change-view="$emit('change-view', $event)"
    />
    <ReportsJumlahKomponenDiolah
      v-else-if="currentView === 'reports-jumlah-komponen-diolah'"
      @change-view="$emit('change-view', $event)"
    />
    <ReportsKinerjaAftap
      v-else-if="currentView === 'reports-kinerja-aftap'"
      @change-view="$emit('change-view', $event)"
    />
    <ReportsPengirimanDarah
      v-else-if="currentView === 'reports-pengiriman-darah'"
      @change-view="$emit('change-view', $event)"
    />
    <ReportsHasilSkrining
      v-else-if="currentView === 'reports-hasil-skrining'"
      @change-view="$emit('change-view', $event)"
    />
    <ReportsHasilSkriningUlang
      v-else-if="currentView === 'reports-hasil-skrining-ulang'"
      @change-view="$emit('change-view', $event)"
    />
    <ReportsKontigensiIMLTD
      v-else-if="currentView === 'reports-kontigensi-imltd'"
      @change-view="$emit('change-view', $event)"
    />
    <ReportsPenerimaanKantong
      v-else-if="currentView === 'reports-penerimaan-kantong'"
      @change-view="$emit('change-view', $event)"
    />
    <ReportsPengolahanDarah
      v-else-if="currentView === 'reports-pengolahan-darah'"
      @change-view="$emit('change-view', $event)"
    />
    <ReportsProdukRelease
      v-else-if="currentView === 'reports-produk-release'"
      @change-view="$emit('change-view', $event)"
    />
    <ReportsDistribusiKomponenDarah
      v-else-if="currentView === 'reports-distribusi-komponen-darah'"
      @change-view="$emit('change-view', $event)"
    />  
    <Masters 
      v-else-if="currentView === 'masters'" 
      @change-view="$emit('change-view', $event)" 
    />
    <MastersUser 
      v-else-if="currentView === 'masters-user'" 
      @change-view="$emit('change-view', $event)" 
    />
    <Support v-else-if="currentView === 'support'" />
    <div v-else>Unknown View</div>
  </main>
</template>

<script setup>
import { defineProps } from 'vue'
import PatientProcess from '../views/PatientProcess.vue'
import Registration from '../views/Registration.vue'
import Questionnaire from '../views/Questionnaire.vue'
import VerifikasiRegistrasiDonor from '../views/VerifikasiRegistrasiDonor.vue'
import HbGolonganDarah from '../views/HbGolonganDarah.vue'
import PemeriksaanFisik from '../views/PemeriksaanFisik.vue'
import PemeriksaanAftap from '../views/PemeriksaanAftap.vue'
import AftapApheresis from '@/views/AftapApheresis.vue'
import PengirimanKantongDarah from '../views/PengirimanKantongDarah.vue'
import PenerimaanSampelDarah from '../views/PenerimaanSampelDarah.vue'
import PenerimaanKantongDarah from '../views/PenerimaanKantongDarah.vue'
import HasilSkriningDarah from '../views/HasilSkriningDarah.vue'
import PengolahanKantongDarah from '../views/PengolahanKantongDarah.vue'
import KarantinaKantongDarah from '../views/KarantinaKantongDarah.vue'
import ReleaseKantongDarah from '../views/ReleaseKantongDarah.vue'
import DonorLookback from '../views/DonorLookback.vue'
import Support from '@/views/Support.vue'
import Dashboard from '@/views/Dashboard.vue'
//Masters
import Masters from '@/views/Masters.vue'
import MastersUser from '@/views/MastersUser.vue'
//Manajemen Kantong Darah
import ManajemenKantongDarah from '@/views/ManajemenKantongDarah.vue'
import PemusnahanKantongDarah from '@/views/PemusnahanKantongDarah.vue'
//Reports
import Reports from '@/views/Reports.vue'
import ReportsDonorDitolak from '@/views/ReportsDonorDitolak.vue'
import ReportsKartuStok from '@/views/ReportsKartuStok.vue'
import ReportsRegistrasiPendonor from '@/views/ReportsRegistrasiPendonor.vue'
import ReportsDistribusiKomponenDarah from '@/views/ReportsDistribusiKomponenDarah.vue'
import ReportsHasilSkrining from '@/views/ReportsHasilSkrining.vue'
import ReportsHasilSkriningUlang from '@/views/ReportsHasilSkriningUlang.vue'
import ReportsJumlahKomponenDiolah from '@/views/ReportsJumlahKomponenDiolah.vue'
import ReportsJumlahPendonor from '@/views/ReportsJumlahPendonor.vue'
import ReportsKinerjaAftap from '@/views/ReportsKinerjaAftap.vue'
import ReportsKontigensiIMLTD from '@/views/ReportsKontigensiIMLTD.vue'
import ReportsPenerimaanKantong from '@/views/ReportsPenerimaanKantong.vue'
import ReportsPengirimanDarah from '@/views/ReportsPengirimanDarah.vue'
import ReportsPengolahanDarah from '@/views/ReportsPengolahanDarah.vue'
import ReportsProdukRelease from '@/views/ReportsProdukRelease.vue'


defineProps({
  currentView: String
})
</script>