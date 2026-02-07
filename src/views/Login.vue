<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
    <!-- Hospital Name -->
    <div class="mb-6 text-center">
      <h1 class="text-2xl font-bold text-blue-700 tracking-wide">UPD RS Sehat Sentosa</h1>
      <p class="text-gray-600 text-sm">Sistem Informasi Manajemen Donor Darah</p>
    </div>

    <Card class="w-full max-w-md">
      <CardHeader class="text-center">
        <CardTitle class="!text-blue-700 text-xl font-semibold">Blood Donor App Login</CardTitle>
        <p class="text-sm text-gray-500 mt-1">Masuk untuk mengakses sistem</p>
      </CardHeader>

      <CardContent>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <Label for="username">Username</Label>
            <Input id="username" v-model="username" type="text" placeholder="Enter your username" />
          </div>

          <div>
            <Label for="password">Password</Label>
            <Input id="password" v-model="password" type="password" placeholder="Enter your password" />
          </div>

          <Button
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
            type="submit"
          >
            Login
          </Button>
        </form>
      </CardContent>

      <CardFooter class="flex justify-between text-sm">
        <Button variant="link" @click="showForgotModal = true" class="text-blue-600 hover:text-blue-800">
          Lupa Password?
        </Button>
        <span class="text-gray-400 text-xs">&copy; {{ new Date().getFullYear() }} RS Sehat Sentosa</span>
      </CardFooter>
    </Card>

    <!-- App Footer Branding -->
    <div class="mt-6 text-center space-y-1">
      <div class="flex items-center justify-center gap-2 text-gray-500 text-xs">
        <img
          src="/favicon.png"
          alt="SabaVerse logo"
          class="h-4 w-4"
        />
        <span>
          &copy; {{ new Date().getFullYear() }} RS Sehat Sentosa
        </span>
      </div>

      <p class="text-[11px] text-gray-400 tracking-wide">
        Sistem Informasi Manajemen Donor Darah
      </p>

      <p class="text-[10px] text-gray-400">
        Powered by <span class="font-medium text-gray-500">SabaVerse</span>
      </p>
    </div>


    <!-- Forgot Password Modal -->
    <Dialog v-model:open="showForgotModal">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
        </DialogHeader>

        <form @submit.prevent="handleForgotPassword" class="space-y-3">
          <div>
            <Label for="forgot-username">Username</Label>
            <Input id="forgot-username" v-model="forgotUsername" type="text" placeholder="Enter your username" />
          </div>

          <div>
            <Label for="old-password">Old Password</Label>
            <Input id="old-password" v-model="oldPassword" type="password" placeholder="Enter old password" />
          </div>

          <div>
            <Label for="new-password">New Password</Label>
            <Input id="new-password" v-model="newPassword" type="password" placeholder="Enter new password" />
          </div>

          <div>
            <Label for="confirm-new-password">Confirm New Password</Label>
            <Input id="confirm-new-password" v-model="confirmNewPassword" type="password" placeholder="Confirm new password" />
          </div>

          <div class="flex justify-end gap-2 pt-2">
            <Button variant="secondary" @click="showForgotModal = false" type="button">Cancel</Button>
            <Button type="submit">Update Password</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import api from "@/lib/axios"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const router = useRouter()

const username = ref("")
const password = ref("")
const forgotUsername = ref("")
const oldPassword = ref("")
const newPassword = ref("")
const confirmNewPassword = ref("")
const showForgotModal = ref(false)



const handleLogin = async () => {
  try {
    const response = await api.post("/api/login", {
      username: username.value,
      password: password.value,
    })
    localStorage.setItem("access_token", response.data.access_token)
    localStorage.setItem("refresh_token", response.data.refresh_token)
    localStorage.setItem("user", JSON.stringify(response.data.user))
    //window.location.reload()
    // ✅ go to authed area
    await router.replace("/app/dashboard")

  } catch (error) {
    alert(error.response?.data?.detail || "Login failed")
  }
}

const handleForgotPassword = async () => {
  try {
    await api.post("/api/forgot-password", {
      username: forgotUsername.value,
      old_password: oldPassword.value,
      new_password: newPassword.value,
      confirm_new_password: confirmNewPassword.value,
    })
    alert("Password updated successfully")
    showForgotModal.value = false
  } catch (error) {
    alert(error.response?.data?.detail || "Failed to reset password")
  }
}
</script>
