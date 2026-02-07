<template>
  <div
    class="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-gray-50 to-blue-50 p-6 pt-16"
  >
    <Card class="w-full max-w-3xl shadow-md border border-blue-100">
      <CardHeader class="text-center">
        <CardTitle class="text-2xl font-semibold text-gray-800">
          Feedback & Support
        </CardTitle>
        <p class="text-sm text-gray-500 mt-1">
          Kami menghargai masukan Anda untuk meningkatkan layanan kami.
        </p>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="submitFeedback" class="space-y-5">
          <div>
            <Label for="name">Nama</Label>
            <Input id="name" v-model="name" placeholder="Masukkan nama Anda" class="text-base" />
          </div>

          <div>
            <Label for="institution">Instansi</Label>
            <Input id="institution" v-model="institution" placeholder="Nama rumah sakit / instansi" class="text-base" />
          </div>

          <div>
            <Label for="message">Pesan / Saran</Label>
            <textarea
              id="message"
              v-model="message"
              class="w-full border border-gray-300 rounded-lg p-3 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows="6"
              placeholder="Tuliskan masukan, saran, atau bug yang Anda temui..."
            ></textarea>
          </div>

          <Button
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 text-base transition-colors"
            type="submit"
          >
            Kirim Feedback
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>


<script setup>
import { ref } from "vue"
import api from "@/lib/axios"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const name = ref("")
const institution = ref("")
const message = ref("")

const submitFeedback = async () => {
  if (!name.value || !message.value) {
    alert("Nama dan pesan wajib diisi.")
    return
  }

  try {
    await api.post("/api/feedback", {
      name: name.value,
      institution: institution.value,
      message: message.value,
    })
    alert("Terima kasih! Feedback Anda telah dikirim.")
    name.value = ""
    institution.value = ""
    message.value = ""
  } catch (error) {
    alert(error.response?.data?.detail || "Gagal mengirim feedback")
  }
}
</script>
