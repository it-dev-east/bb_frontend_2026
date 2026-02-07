<template>
  <div class="p-6">
    <Tabs :modelValue="step" @update:modelValue="handleStepChange" class="w-full">
      <TabsList class="grid grid-cols-2 mb-6">
        <TabsTrigger value="0" class="
          data-[state=active]:bg-blue-500 
          data-[state=active]:text-white 
          data-[state=inactive]:bg-gray-100
          data-[state=inactive]:text-gray-700
        " >Step 1: Registrasi Donor</TabsTrigger>
        <TabsTrigger value="1" class="
          data-[state=active]:bg-blue-500 
          data-[state=active]:text-white 
          data-[state=inactive]:bg-gray-100
          data-[state=inactive]:text-gray-700
        ">Step 2: Kuisioner Donor</TabsTrigger>
      </TabsList>

      <!-- 🔹 Step 1: Registrasi Donor -->
      <TabsContent value="0">
        <Card>
          <CardHeader>
            <div class="flex items-center justify-between">
            <CardTitle>Registrasi Donor</CardTitle>
            <!-- 🔹 Error message beside title -->
            <span v-if="regError" class="text-red-600 text-sm font-medium">
              {{ regError }}
            </span>
          </div>
            <CardDescription>
              Mandatory fields (yang harus diisi): Tanggal Rencana Donasi, KTP, Nama Lengkap, Tanggal Lahir (≥17 tahun), No HP/Telepon, Alamat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form @submit.prevent="submitRegistration" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Each field uses consistent spacing and form controls -->
                <div>
                  <Label>Jenis Donor *</Label>
                  <Select v-model="regForm.donor_type" required>
                    <SelectTrigger class="w-full">
                      <SelectValue placeholder="Pilih Jenis Donor" />
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

                <div>
                  <Label>Tanggal Rencana Donasi *</Label>
                  <Input type="date" v-model="regForm.planned_donation_date" required />
                </div>

                <div>
                  <Label>Donasi ke</Label>
                  <Input v-model="regForm.donation_to" />
                </div>

                <div>
                  <Label>No. Kartu Donor (akan digenerate otomatis)</Label>
                  <Input v-model="regForm.donor_card_no" readonly />
                </div>

                <div>
                  <Label>Tanggal Donasi Terakhir</Label>
                  <Input type="datetime-local" v-model="regForm.last_donation_date" />
                </div>

                <div>
                  <Label>Tempat Donasi Terakhir</Label>
                  <Input v-model="regForm.last_donation_place" />
                </div>

                <div>
                  <Label>KTP *</Label>
                  <Input v-model="regForm.ktp" required @keydown.enter="searchMasterDonor" />
                </div>

                <div>
                  <Label>Nama Lengkap *</Label>
                  <Input v-model="regForm.full_name" required />
                </div>

                <div>
                  <Label>Jenis Kelamin</Label>
                  <Select v-model="regForm.gender">
                    <SelectTrigger class="w-full">
                      <SelectValue placeholder="Pilih Jenis Kelamin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LAKI-LAKI">Laki-laki</SelectItem>
                      <SelectItem value="PEREMPUAN">Perempuan</SelectItem>
                      <SelectItem value="TIDAK TAHU">Tidak tahu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Agama</Label>
                  <Select v-model="regForm.religion">
                    <SelectTrigger class="w-full">
                      <SelectValue placeholder="Pilih Agama" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Islam">Islam</SelectItem>
                      <SelectItem value="Kristen">Kristen</SelectItem>
                      <SelectItem value="Katolik">Katolik</SelectItem>
                      <SelectItem value="Hindu">Hindu</SelectItem>
                      <SelectItem value="Budha">Budha</SelectItem>
                      <SelectItem value="Tidak tahu">Tidak tahu</SelectItem>
                      <SelectItem value="Atheis">Atheis</SelectItem>
                      <SelectItem value="Konghucu">Konghucu</SelectItem>
                      <SelectItem value="Kepercayaan">Kepercayaan</SelectItem>
                      <SelectItem value="Lainnya">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Tempat Lahir</Label>
                  <Input v-model="regForm.birth_place" />
                </div>

                <div>
                  <Label>Tanggal Lahir *</Label>
                  <Input type="date" v-model="regForm.birth_date" required />
                </div>

                <div>
                  <Label>Berat Badan (kg)</Label>
                  <Input v-model="regForm.weight" />
                </div>

                <div>
                  <Label>Tinggi Badan (cm)</Label>
                  <Input v-model="regForm.height" />
                </div>

                <div>
                  <Label>No HP / Telepon *</Label>
                  <Input v-model="regForm.phone" required />
                </div>

                <div>
                  <Label>Golongan Darah</Label>
                  <Select v-model="regForm.blood_type">
                    <SelectTrigger class="w-full">
                      <SelectValue placeholder="Pilih Golongan Darah" />
                    </SelectTrigger>
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

                <div>
                  <Label>Pekerjaan</Label>
                  <Input v-model="regForm.occupation" />
                </div>

                <div class="md:col-span-2">
                  <Label>Alamat Sesuai KTP *</Label>
                  <Textarea v-model="regForm.address_ktp" required />
                </div>

                <div>
                  <Label>RT</Label>
                  <Input v-model="regForm.rt" />
                </div>

                <div>
                  <Label>RW</Label>
                  <Input v-model="regForm.rw" />
                </div>

                <div>
                  <Label>Provinsi</Label>
                  <Input v-model="regForm.province" />
                </div>

                <div>
                  <Label>Kabupaten / Kota</Label>
                  <Input v-model="regForm.city" />
                </div>

                <div>
                  <Label>Kecamatan</Label>
                  <Input v-model="regForm.district" />
                </div>

                <div>
                  <Label>Kelurahan</Label>
                  <Input v-model="regForm.subdistrict" />
                </div>

                

                <!-- 🔹 Kewarganegaraan -->
                <div class="flex flex-col">
                  <Label>Kewarganegaraan</Label>
                  <Select v-model="regForm.nationality" >
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
                  <Label>Negara</Label>
                  <Input v-model="regForm.country" class="mt-1" />
                </div>
                
                <div class="md:col-span-2 space-y-3">
                  <div class="flex items-center gap-2">
                    <Label>Foto Pendonor (Upload atau Kamera)</Label>
                    <span class="text-xs text-gray-500">{{ photoEndpointHint }}</span>
                  </div>
                  <div class="flex flex-wrap items-center gap-3">
                    <Input type="file" accept="image/*" @change="onFileChange" />
                    <Button
                      v-if="cameraAvailable"
                      type="button"
                      variant="outline"
                      class="flex items-center gap-2"
                      @click="cameraActive ? stopCamera() : startCamera()"
                    >
                      <template v-if="cameraActive">Tutup Kamera</template>
                      <template v-else>Gunakan Kamera</template>
                    </Button>
                    <span v-else class="text-sm text-gray-500">Perangkat tidak mendukung kamera.</span>
                  </div>

                  <div v-if="cameraActive" class="space-y-2 rounded-lg border border-gray-200 p-3 bg-gray-50">
                    <video ref="videoRef" autoplay playsinline class="w-full rounded" />
                    <div class="flex gap-2">
                      <Button type="button" class="bg-blue-600 hover:bg-blue-700 text-white" @click="capturePhoto">Ambil Foto</Button>
                      <Button type="button" variant="secondary" @click="stopCamera">Batalkan</Button>
                    </div>
                    <p v-if="cameraError" class="text-sm text-red-600">{{ cameraError }}</p>
                  </div>

                  <div v-if="photoPreviewUrl" class="space-y-2">
                    <Label>Preview Foto</Label>
                    <img :src="photoPreviewUrl" alt="Foto pendonor" class="w-48 h-48 object-cover rounded border" />
                  </div>

                  <canvas ref="canvasRef" class="hidden"></canvas>
                </div>

              </div>


              <div class="flex justify-end pt-4">
                <Button class="bg-green-600 hover:bg-green-700 text-white" type="submit">
                  <ArrowBigRight class="w-5 h-5" />
                  Simpan Data & Lanjutkan</Button>
              </div>
            </form>

            <p v-if="regMessage" class="text-green-600 mt-4">{{ regMessage }}</p>
            <p v-if="regError" class="text-red-600 mt-2">{{ regError }}</p>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- 🔹 Step 2: Kuisioner Donor -->
      <TabsContent value="1">
        <Card>
          <CardHeader>
            <CardTitle>Kuisioner Donor</CardTitle>
          </CardHeader>
          <CardContent>
            <div v-if="!data">Loading...</div>
            <div v-else>
              <div v-for="group in data.groups" :key="group.id" class="mb-8">
                <h3 class="font-semibold text-gray-800 mb-3">{{ group.title }}:</h3>
                <div
                  v-for="q in questionsByGroup(group.id)"
                  :key="q.id"
                  class="flex items-start gap-4 border-b border-gray-200 pb-3 mb-3"
                >
                  <span class="text-sm font-medium text-gray-600 w-6">{{ q.row_num }}.</span>
                  <div class="flex-1">
                    <div class="mb-1">{{ q.question }}</div>
                    <div class="flex gap-6 mt-1">
                      <Label class="flex items-center gap-2">
                        <input type="radio" :name="'q'+q.id" v-model="answers[q.id]" :value="true" />
                        <span>Ya</span>
                      </Label>
                      <Label class="flex items-center gap-2">
                        <input type="radio" :name="'q'+q.id" v-model="answers[q.id]" :value="false" />
                        <span>Tidak</span>
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-6 p-4 bg-yellow-50 border border-yellow-300 rounded-lg text-base">
                <p>{{ informedConsentText }}</p>
                <p class="mt-2 text-right">{{ defaultCity }}, {{ currentDate }}</p>
                <label class="flex items-center gap-2 mt-4">
                  <input type="checkbox" v-model="informed" />
                  <span>Ya, saya setuju</span>
                </label>
              </div>

              <div class="flex justify-end mt-6">
                <Button class="bg-green-600 hover:bg-green-700 text-white" @click="submitQuestionnaire">
                  <Save class="w-5 h-5" />Simpan Data</Button>
              </div>

              <p v-if="questMessage" class="mt-4 text-green-700">{{ questMessage }}</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
  <!-- Hidden PDF Content -->
  <div v-if="patientData" id="pdf-content" class="hidden">
    <div class="text-center mb-4">
      <h1 class="text-2xl font-bold">Data Registrasi Donor</h1>
      <p class="text-lg">PMI Jakarta</p>
    </div>
    <div class="space-y-2 p-4 border-2 border-gray-300 rounded-lg">
      <p><strong>Tanggal Rencana Donasi:</strong> {{ formatDate(patientData.planned_donation_date) }}</p>
      <p><strong>No Registrasi:</strong> {{ patientData.reg_no }}</p>
      <p><strong>No Donor:</strong> {{ patientData.donor_card_no }}</p>
      <p><strong>Nama Lengkap:</strong> {{ patientData.full_name }}</p>
      <p><strong>Tanggal Lahir:</strong> {{ formatDate(patientData.birth_date) }}</p>
      <div class="mt-4">
        <strong>Barcode:</strong>
        <div class="text-center p-4">
          <VueBarcode :value="patientData.reg_no" format="CODE128" :options="{ width: 2, height: 60, displayValue: true }" />
        </div>
        <p class="text-center">Barcode Value: {{ patientData.reg_no }}</p>
      </div>
    </div>    
  </div>

</template>


<script setup>
import { ref, onMounted, computed, readonly, nextTick, onBeforeUnmount } from 'vue'
import api from '@/lib/axios'
import VueBarcode from '@chenfengyuan/vue-barcode'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
//shadcnvue
import { Button } from "@/components/ui/button"; 
import { RefreshCcw, Plus, Search, Undo2, Save, Unlock, ArrowBigRight, SquareArrowRight } from "lucide-vue-next"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
//import { FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

import { Card, CardHeader, CardTitle, CardContent,CardDescription } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

const step = ref("0")
// 🔹 Control which tab is active
//const activeTab = ref("0")
const submitButton = ref(null)
const regForm = ref({
  donor_type: '',
  planned_donation_date: '',
  donation_to: '',
  donor_card_no: '',
  last_donation_date: '',
  last_donation_place: '',
  ktp: '',
  full_name: '',
  gender: '',
  religion: '',
  birth_place: '',
  birth_date: '',
  weight: '',
  height: '',
  phone: '',
  blood_type: '',
  occupation: '',
  address_ktp: '',
  rt: '',
  rw: '',
  province: '',
  city: '',
  district: '',
  subdistrict: '',
  nationality: '',
  country: '',
  photo_id: '',
  photo_url: '',
  location: 'onsite'
})
const regMessage = ref('')
const regError = ref('')
const data = ref(null)
const answers = ref({})
const informed = ref(false)
const questMessage = ref('')
const patientData = ref(null)
const informedConsentText = ref('')
const defaultCity = ref('Jakarta')
const photoFile = ref(null)
const photoPreviewUrl = ref('')
const cameraStream = ref(null)
const videoRef = ref(null)
const canvasRef = ref(null)
const cameraActive = ref(false)
const cameraError = ref('')
const photoEndpointHint = ''
//const photoEndpointHint = 'Backend endpoint: POST /api/patient-photo (multipart/form-data, field: photo)'

const cameraAvailable = computed(() => typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia)

const currentDate = computed(() => {
  const now = new Date()
  const day = now.getDate()
  const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
  const month = monthNames[now.getMonth()]
  const year = now.getFullYear()
  return `${day} ${month} ${year}`
})

onMounted(async () => {
  // Load questionnaire data when component mounts, but only show after registration
  const res = await api.get('/api/questionnaire')
  data.value = res.data
  for (const q of data.value.questions) {
    answers.value[q.id] = false // default no
  }

  // Load informed consent text from database
  try {
    const consentRes = await api.get('/api/questionnaire/question/999')
    informedConsentText.value = consentRes.data.question
  } catch (e) {
    console.error('Failed to load informed consent text:', e)
    informedConsentText.value = 'Default informed consent text here.'
  }

  // Load default city from config
  try {
    const cityRes = await api.get('/api/config/default_city')
    defaultCity.value = cityRes.data.default_city
  } catch (e) {
    console.error('Failed to load default city:', e)
    defaultCity.value = 'Jakarta' // fallback
  }

  // Set last donation date to current date
  regForm.value.last_donation_date = new Date().toISOString().slice(0, 16)
})

onBeforeUnmount(() => {
  stopCamera()
  revokePreviewUrl()
})

function revokePreviewUrl() {
  if (photoPreviewUrl.value) {
    URL.revokeObjectURL(photoPreviewUrl.value)
    photoPreviewUrl.value = ''
  }
}

//function onFileChange(event) {
async function resizeAndCompressImage(file) {
  const ONE_MB = 1 * 1024 * 1024
  if (file.size <= ONE_MB) {
    return file
  }

  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
    reader.readAsDataURL(file)
  })

  const image = await new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = error => reject(error)
    img.src = dataUrl
  })

  const MAX_DIMENSION = 600
  let { width, height } = image
  const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height, 1)
  width = Math.round(width * ratio)
  height = Math.round(height * ratio)

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return file

  canvas.width = width
  canvas.height = height
  ctx.drawImage(image, 0, 0, width, height)

  const compressedBlob = await new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) resolve(blob)
      else reject(new Error('Failed to compress image'))
    }, 'image/jpeg', 0.7)
  })

  return new File([compressedBlob], file.name, { type: 'image/jpeg', lastModified: Date.now() })
}

async function onFileChange(event) {
  const file = event.target.files?.[0]
  if (file) {
    //photoFile.value = file
    const processedFile = await resizeAndCompressImage(file)
    photoFile.value = processedFile
    cameraError.value = ''
    revokePreviewUrl()
    //photoPreviewUrl.value = URL.createObjectURL(file)
    photoPreviewUrl.value = URL.createObjectURL(processedFile)
  }
}

async function startCamera() {
  cameraError.value = ''
  if (!cameraAvailable.value) {
    cameraError.value = 'Perangkat tidak mendukung kamera.'
    return
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    cameraStream.value = stream
    cameraActive.value = true
    await nextTick()
    if (videoRef.value) {
      videoRef.value.srcObject = stream
      await videoRef.value.play()
    }
  } catch (error) {
    console.error('Cannot start camera', error)
    cameraError.value = 'Tidak dapat mengakses kamera. Periksa izin browser.'
  }
}

function stopCamera() {
  if (cameraStream.value) {
    cameraStream.value.getTracks().forEach(track => track.stop())
    cameraStream.value = null
  }
  cameraActive.value = false
}

async function capturePhoto() {
  cameraError.value = ''
  if (!videoRef.value || !canvasRef.value) {
    cameraError.value = 'Kamera belum siap.'
    return
  }
  const video = videoRef.value
  const canvas = canvasRef.value
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    cameraError.value = 'Gagal mengambil foto.'
    return
  }
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'))
  if (!blob) {
    cameraError.value = 'Gagal memproses foto.'
    return
  }
  const file = new File([blob], 'patient-photo.jpg', { type: blob.type })
  //photoFile.value = file
  const processedFile = await resizeAndCompressImage(file)
  photoFile.value = processedFile
  revokePreviewUrl()
  //photoPreviewUrl.value = URL.createObjectURL(blob)
  photoPreviewUrl.value = URL.createObjectURL(processedFile)
  // ✅ setelah sukses ambil & set preview, auto stop kamera
  stopCamera()
}

async function uploadPatientPhoto() {
  if (!photoFile.value) return null
  const formData = new FormData()
  formData.append('photo', photoFile.value)
  if (regForm.value.ktp) {
    formData.append('pid', regForm.value.ktp)
  }
  const res = await api.post('/api/patient-photo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  const photoId = res.data?.photo_id || res.data?.id || ''
  const photoUrl = res.data?.photo_url || ''
  regForm.value.photo_id = photoId
  regForm.value.photo_url = photoUrl
  return photoId
}

// Handle step changes to prevent moving to Step 2 without submitting Step 1
function handleStepChange(value) {
  if (value === "1" && !patientData.value) {
    regError.value = "Harap isi data dahulu, di Step 1 kemudian pilih Submit"
    nextTick(() => {
      submitButton.value.focus()
    })
    return
  }
  step.value = value
}

async function searchMasterDonor() {
  if (!regForm.value.ktp) return;
  try {
    const res = await api.get(`/api/master_donor/by_nik/${regForm.value.ktp}`);
    const data = res.data;
    // populate regForm
    regForm.value.donor_card_no = data.no_kartu_donor || '';
    regForm.value.full_name = data.nama_donor || '';
    regForm.value.birth_place = data.tempat_lahir || '';
    regForm.value.birth_date = data.tanggal_lahir ? data.tanggal_lahir.split('T')[0] : '';
    regForm.value.weight = data.berat_badan || '';
    regForm.value.height = data.tinggi_badan || '';
    regForm.value.phone = data.telepon || '';
    regForm.value.blood_type = data.goldar || '';
    regForm.value.occupation = data.pekerjaan || '';
    regForm.value.address_ktp = data.alamat || '';
    regForm.value.rt = data.rt || '';
    regForm.value.rw = data.rw || '';
    regForm.value.province = data.provinsi || '';
    regForm.value.city = data.kota || '';
    regForm.value.district = data.kecamatan || '';
    regForm.value.subdistrict = data.kelurahan || '';
    regForm.value.gender = data.jk || '';
    regForm.value.religion = data.agama || '';
    regForm.value.nationality = data.kewarganegaraan || '';
    regForm.value.country = data.negara || '';
  } catch (e) {
    // not found, do nothing
  }
}

async function submitRegistration() {
  regError.value = ''
  regMessage.value = ''
  
  // ✅ Cek foto dulu
  if (!photoFile.value) {
    regError.value = 'Foto pendonor belum diambil / di-upload. Harap ambil atau upload foto terlebih dahulu.'
    // optional: pastikan tetap di Step 1
    step.value = "0"
    return
  }

  console.log('Submitting registration form data:', regForm.value)

  // Validate age >= 17
  if (regForm.value.birth_date) {
    const birthDate = new Date(regForm.value.birth_date)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    if (age < 17) {
      regError.value = 'Calon Pendonor harus berusia minimal 17 tahun!'
      console.log('Age validation failed:', age)
      return
    }
  }

  // Add created_by from logged in user
  const userStr = localStorage.getItem("user")
  if (userStr) {
    const user = JSON.parse(userStr)
    if (user.username) {
      regForm.value.created_by = user.username
    }
  }

  try {
    console.log('Sending POST to /api/patients')
    const payload = {
      ...regForm.value,
      full_name: (regForm.value.full_name || "").trim().toUpperCase(),
    }

    const res = await api.post('/api/patients', payload)
    //const res = await api.post('/api/patients', regForm.value)
    console.log('Response received:', res.data)
    patientData.value = { ...regForm.value, reg_no: res.data.reg_no, donor_card_no: res.data.donor_card_no }
    regMessage.value = `Saved. Nomor Registrasi: ${res.data.reg_no} | No.Kartu Donor: ${res.data.donor_card_no}`
    
    //Upload foto
    if (photoFile.value) {
      try {
        await uploadPatientPhoto()
      } catch (error) {
        console.error('Error uploading patient photo:', error)
        regError.value = error?.response?.data?.detail || 'Gagal mengunggah foto pendonor.'
        return
      }
    }

    step.value = "1" // Move to questionnaire

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
      note: 'submit Registrasi Donor',
      userid: userid,
      pid: patientData.value.donor_card_no,
      regno: patientData.value.reg_no,
      menu: 'Registrasi Donor'
    })
  } catch (e) {
    console.log('Error in submission:', e)
    regError.value = e?.response?.data?.detail || 'Failed to save'
  }
}

function questionsByGroup(gid) {
  if (!data.value) return []
  return data.value.questions.filter(q => q.group_id === gid && q.id !== 999)
}

async function submitQuestionnaire() {
  if (!informed.value) {
    questMessage.value = 'Harap centang informed consent sebelum submit.'
    return
  }
  // Add created_by from logged in user
  const userStr = localStorage.getItem("user")
  let created_by = null
  if (userStr) {
    const user = JSON.parse(userStr)
    if (user.username) {
      created_by = user.username
    }
  }
  const payload = { reg_no: patientData.value.reg_no, informed_consent: informed.value, answers: Object.entries(answers.value).map(([k,v]) => [Number(k), v]), created_by }
  try {
    await api.post('/api/questionnaire/submit', payload)

    // Generate and open PDF instead of showing modal
    const pdfData = {
      reg_no: patientData.value.reg_no,
      donor_card_no: patientData.value.donor_card_no,
      //full_name: patientData.value.full_name,
      full_name: (patientData.value.full_name || "").trim().toUpperCase(),
      birth_date: patientData.value.birth_date,
      planned_donation_date: patientData.value.planned_donation_date
    };

    const response = await api.post('/api/generate_donor_registration_pdf', pdfData, {
      responseType: 'blob'
    });

    const blob = new Blob([response.data], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    window.open(url, '_blank')

    //clear data 
    // ✅ clear questionnaire answers (set all to default false)
    Object.keys(answers.value).forEach(id => {
      answers.value[id] = false
    })

    // ✅ reset informed consent checkbox
    informed.value = false

    // ✅ clear registration form
    regForm.value = {
      donor_type: '',
      planned_donation_date: '',
      donation_to: '',
      donor_card_no: '',
      last_donation_date: '',
      last_donation_place: '',
      ktp: '',
      full_name: '',
      gender: '',
      religion: '',
      birth_place: '',
      birth_date: '',
      weight: '',
      height: '',
      phone: '',
      blood_type: '',
      occupation: '',
      address_ktp: '',
      rt: '',
      rw: '',
      province: '',
      city: '',
      district: '',
      subdistrict: '',
      nationality: '',
      country: '',
      photo_id: '',
      photo_url: '',
      location: 'onsite'
    }

    // ✅ clear photo + preview
    photoFile.value = null
    revokePreviewUrl()
    stopCamera()

    // ✅ clear patient data so step 2 cannot diakses sebelum registrasi baru
    patientData.value = null

    // ✅ balik ke Tab Step 1
    step.value = "0"

    // (opsional) kalau mau juga kosongkan pesan error registrasi
    regError.value = ''
    regMessage.value = '' 
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
      note: 'submit Kuisioner Donor',
      userid: userid,
      pid: patientData.value.donor_card_no,
      regno: patientData.value.reg_no,
      menu: 'Registrasi Donor'
    })
  } catch (e) {
    questMessage.value = e?.response?.data?.detail || 'Failed'
  }
}

function setStep(newStep) {
  step.value = newStep
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID')
}

async function printModal() {
  // Prepare data for PDF generation
  const pdfData = {
    reg_no: patientData.value.reg_no,
    donor_card_no: patientData.value.donor_card_no,
    full_name: patientData.value.full_name,
    birth_date: patientData.value.birth_date,
    planned_donation_date: patientData.value.planned_donation_date
  };

  try {
    // Call the API to generate PDF
    const response = await api.post('/api/generate_donor_registration_pdf', pdfData, {
      responseType: 'blob'
    });

    // Open PDF in new tab
    const blob = new Blob([response.data], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    window.open(url, '_blank')

    // Log activity
    const userStr = localStorage.getItem("user")
    let userid = null
    if (userStr) {
      const user = JSON.parse(userStr)
      if (user.username) {
        userid = user.username
      }
    }
    await api.post('/api/activity_log', {
      note: 'Print Donor Card',
      userid: userid,
      pid: patientData.value.donor_card_no,
      regno: patientData.value.reg_no,
      menu: 'Registrasi Donor'
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    alert('Error generating PDF. Please try again.')
  }
}

async function saveToPDF() {
  const pdfElement = document.getElementById('pdf-content')
  if (!pdfElement) return

  // Temporarily show the element to ensure rendering
  pdfElement.style.display = 'block'
  pdfElement.style.position = 'absolute'
  pdfElement.style.left = '-9999px'

  try {
    // Wait for rendering
    await new Promise(resolve => setTimeout(resolve, 500))

    const canvas = await html2canvas(pdfElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')

    const imgWidth = 210
    const pageHeight = 295
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight

    let position = 0

    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    pdf.save(`donor_registration_${patientData.value.reg_no}.pdf`)
  } catch (error) {
    console.error('Error generating PDF:', error)
    alert('Error generating PDF. Please try again.')
  } finally {
    // Hide it back
    pdfElement.style.display = 'none'
    pdfElement.style.position = ''
    pdfElement.style.left = ''
  }
}
</script>