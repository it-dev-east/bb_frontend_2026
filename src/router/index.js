import { createRouter, createWebHistory } from "vue-router"

// public pages
import Login from "@/views/Login.vue"
import RegistrasiPublic from "@/views/Registration.vue"

// layout (authed)
import LayoutAuthed from "@/layouts/LayoutAuthed.vue"

// views (match DB menu_path)
import Dashboard from "@/views/Dashboard.vue"
import PatientProcess from "@/views/PatientProcess.vue"
import VerifikasiRegistrasiDonor from "@/views/VerifikasiRegistrasiDonor.vue"
import HbGolonganDarah from "@/views/HbGolonganDarah.vue"
import PemeriksaanFisik from "@/views/PemeriksaanFisik.vue"
import PemeriksaanAftap from "@/views/PemeriksaanAftap.vue"
import AftapApheresis from "@/views/AftapApheresis.vue"
import PengirimanKantongDarah from "@/views/PengirimanKantongDarah.vue"
import PenerimaanSampelDarah from "@/views/PenerimaanSampelDarah.vue"
import HasilSkriningDarah from "@/views/HasilSkriningDarah.vue"
import PenerimaanKantongDarah from "@/views/PenerimaanKantongDarah.vue"
import PengolahanKantongDarah from "@/views/PengolahanKantongDarah.vue"
import KarantinaKantongDarah from "@/views/KarantinaKantongDarah.vue"
import ReleaseKantongDarah from "@/views/ReleaseKantongDarah.vue"
import DonorLookback from "@/views/DonorLookback.vue"
import ManajemenKantongDarah from "@/views/ManajemenKantongDarah.vue"
import PemusnahanKantongDarah from "@/views/PemusnahanKantongDarah.vue"

// masters / reports / support
import Reports from "@/views/Reports.vue"
import ReportsDonorDitolak from "@/views/ReportsDonorDitolak.vue"
import ReportsKartuStok from "@/views/ReportsKartuStok.vue"
import ReportsRegistrasiPendonor from "@/views/ReportsRegistrasiPendonor.vue"
import ReportsJumlahPendonor from "@/views/ReportsJumlahPendonor.vue"
import ReportsJumlahKomponenDiolah from "@/views/ReportsJumlahKomponenDiolah.vue"
import ReportsKinerjaAftap from "@/views/ReportsKinerjaAftap.vue"
import ReportsPengirimanDarah from "@/views/ReportsPengirimanDarah.vue"
import ReportsHasilSkrining from "@/views/ReportsHasilSkrining.vue"
import ReportsHasilSkriningUlang from "@/views/ReportsHasilSkriningUlang.vue"
import ReportsKontigensiIMLTD from "@/views/ReportsKontigensiIMLTD.vue"
import ReportsPenerimaanKantong from "@/views/ReportsPenerimaanKantong.vue"
import ReportsPengolahanDarah from "@/views/ReportsPengolahanDarah.vue"
import ReportsProdukRelease from "@/views/ReportsProdukRelease.vue"
import ReportsDistribusiKomponenDarah from "@/views/ReportsDistribusiKomponenDarah.vue"

import Masters from "@/views/Masters.vue"
import MastersUser from "@/views/MastersUser.vue"
import Support from "@/views/Support.vue"

// simple not found (prevents blank page)
const NotFound = { template: `<div style="padding:20px;">404 - Page not found</div>` }
import NotFoundPublic from "@/views/NotFoundPublic.vue"
import NotFoundApp from "@/views/NotFoundApp.vue"

const routes = [
  // ✅ public routes
  { path: "/login", component: Login, meta: { public: true } },
  { path: "/registrasi", component: RegistrasiPublic, meta: { public: true } },

  // ✅ authenticated app routes
  {
    path: "/app",
    component: LayoutAuthed,
    meta: { requiresAuth: true },
    children: [
      { path: "", redirect: "/app/dashboard" },

      // --- must match master_menu.menu_path exactly ---
      { path: "dashboard", component: Dashboard },
      { path: "registrasi", component: PatientProcess },
      { path: "verifikasi-registrasi-donor", component: VerifikasiRegistrasiDonor },
      { path: "hb-golongan-darah", component: HbGolonganDarah },
      { path: "pemeriksaan-fisik", component: PemeriksaanFisik },
      { path: "pemeriksaan-aftap", component: PemeriksaanAftap },
      { path: "aftap-apheresis", component: AftapApheresis },
      { path: "pengiriman-kantong-darah", component: PengirimanKantongDarah },
      { path: "penerimaan-sampel-darah", component: PenerimaanSampelDarah },
      { path: "hasil-skrining-darah", component: HasilSkriningDarah },
      { path: "penerimaan-kantong-darah", component: PenerimaanKantongDarah },
      { path: "pengolahan-kantong-darah", component: PengolahanKantongDarah },
      { path: "karantina-kantong-darah", component: KarantinaKantongDarah },
      { path: "release-kantong-darah", component: ReleaseKantongDarah },
      { path: "donor-lookback", component: DonorLookback },

      { path: "manajemen-kantong-darah", component: ManajemenKantongDarah },
      { path: "pemusnahan-kantong-darah", component: PemusnahanKantongDarah },

      { path: "reports", component: Reports },
      { path: "reports-donor-ditolak", component: ReportsDonorDitolak },
      { path: "reports-kartu-stok", component: ReportsKartuStok },
      { path: "reports-registrasi-pendonor", component: ReportsRegistrasiPendonor },
      { path: "reports-jumlah-pendonor", component: ReportsJumlahPendonor },
      { path: "reports-jumlah-komponen-diolah", component: ReportsJumlahKomponenDiolah },
      { path: "reports-kinerja-aftap", component: ReportsKinerjaAftap },
      { path: "reports-pengiriman-darah", component: ReportsPengirimanDarah },
      { path: "reports-hasil-skrining", component: ReportsHasilSkrining },
      { path: "reports-hasil-skrining-ulang", component: ReportsHasilSkriningUlang },
      { path: "reports-kontigensi-imltd", component: ReportsKontigensiIMLTD },
      { path: "reports-penerimaan-kantong", component: ReportsPenerimaanKantong },
      { path: "reports-pengolahan-darah", component: ReportsPengolahanDarah },
      { path: "reports-produk-release", component: ReportsProdukRelease },
      { path: "reports-distribusi-komponen-darah", component: ReportsDistribusiKomponenDarah },

      { path: "masters", component: Masters },
      { path: "masters-user", component: MastersUser },

      { path: "support", component: Support },

      // ✅ app 404 (must be last inside children)
      { path: ":pathMatch(.*)*", component: NotFoundApp },
    ],
  },

  // default redirect
  { path: "/", redirect: "/app" },

  // 404
  //{ path: "/:pathMatch(.*)*", component: NotFound, meta: { public: true } },
  { path: "/:pathMatch(.*)*", component: NotFoundPublic, meta: { public: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  if (to.meta.public) return true

  // if already logged in, prevent going back to login
  //if (to.path === "/login" && token) return { path: "/app/dashboard" }

  const token = localStorage.getItem("access_token")
  if (!token) return { path: "/login" }

  return true
})

export default router
