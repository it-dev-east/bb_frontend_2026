<template>
    <div class="p-6 space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-semibold tracking-tight">Master User</h1>
        <Button @click="openAddUser" class="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus class="w-4 h-4 mr-2" /> Tambah User
        </Button>
      </div>
  
      <!-- Search Bar -->
      <div class="flex items-center gap-2 max-w-md">
        <Input
          v-model="search"
          placeholder="Cari username / nama..."
          class="flex-1"
          @keyup.enter="fetchUsers"
        />
        <Button variant="outline" @click="fetchUsers" >
          <Search class="w-4 h-4" />
        </Button>
        <Button variant="outline" @click="refreshData">
          <RotateCw class="w-4 h-4" />
        </Button>
      </div>
  
      <!-- Table -->
      <Card>
        <CardContent>
          <table class="w-full text-sm border-collapse">
            <thead class="border-b bg-gray-50">
              <tr>
                <th class="text-left py-2 px-3">Username</th>
                <th class="text-left py-2 px-3">Full Name</th>
                <th class="text-left py-2 px-3">Active</th>
                <th class="text-left py-2 px-3">Created By</th>
                <th class="text-left py-2 px-3">Updated</th>
                <th class="text-right py-2 px-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="u in filteredUsers"
                :key="u.user_id"
                class="border-b hover:bg-gray-50"
              >
                <td class="py-2 px-3">{{ u.username }}</td>
                <td class="py-2 px-3">{{ u.full_name }}</td>
                <td class="py-2 px-3">
                  <span
                    :class="u.is_active ? 'text-green-600' : 'text-rose-600'"
                    class="font-semibold"
                  >
                    {{ u.is_active ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="py-2 px-3">{{ u.created_by }}</td>
                <td class="py-2 px-3">
                  {{ new Date(u.updated_at).toLocaleString() }}
                </td>
                <td class="py-2 px-3 text-right space-x-2">
                  <Button size="sm" variant="outline" @click="openEdit(u)">
                    <Pencil class="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" @click="openAccess(u)">
                    <Lock class="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
  
      <!-- Dialog: Add/Edit User -->
      <Dialog v-model:open="showForm">
        <DialogContent class="max-w-md">
          <DialogHeader>
            <DialogTitle>{{ formMode === 'add' ? 'Tambah User' : 'Edit User' }}</DialogTitle>
          </DialogHeader>
  
          <div class="space-y-3">
            <div>
              <Label>Username</Label>
              <Input v-model="form.username" placeholder="Username" />
            </div>
  
            <div>
              <Label>Full Name</Label>
              <Input v-model="form.full_name" placeholder="Nama Lengkap" />
            </div>
  
            <div v-if="formMode === 'add'">
              <Label>Password</Label>
              <Input type="password" v-model="form.password" placeholder="Password" />
            </div>
  
            <div class="flex items-center gap-2">
              <Checkbox v-model="form.is_active" />
              <Label>Active</Label>
            </div>
          </div>
  
          <DialogFooter>
            <Button variant="outline" @click="showForm = false">Batal</Button>
            <Button class="bg-blue-600 hover:bg-blue-700 text-white" @click="saveUser">Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  
      <!-- Dialog: Menu Access -->
      <Dialog v-model:open="showAccess">
        <DialogContent class="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Hak Akses Menu: {{ selectedUser?.username }}</DialogTitle>
          </DialogHeader>
  
          <div v-if="loadingMenus" class="flex items-center justify-center p-4">
            <RotateCw class="w-4 h-4 animate-spin mr-2" />
            Loading menus...
          </div>
          <div v-else class="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
            <div
              v-for="menu in menuList"
              :key="menu.menu_id"
              class="flex items-center gap-2 border p-2 rounded-lg"
            >
              <Checkbox
                v-model="menuAccess[menu.menu_id]"
                @update:modelValue="toggleAccess(menu.menu_id, $event)"
              />
              <Label>{{ menu.menu_name }}</Label>
            </div>
          </div>
  
          <DialogFooter>
            <Button variant="outline" @click="showAccess = false">Tutup</Button>
            <Button class="bg-blue-600 hover:bg-blue-700 text-white" @click="saveAccess">Simpan Akses</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  </template>
  

  <script setup>
  import api from "../lib/axios.js";
  import { ref, computed, onMounted } from "vue";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Card, CardContent } from "@/components/ui/card";
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from "@/components/ui/dialog";
  import { Label } from "@/components/ui/label";
  import { Checkbox } from "@/components/ui/checkbox";
  import { Plus, Pencil, Lock, Search, Rotate3D, RotateCw } from "lucide-vue-next";
  
  const users = ref([]);
  const search = ref("");
  const showForm = ref(false);
  const showAccess = ref(false);
  const formMode = ref("add");
  const selectedUser = ref(null);
  const form = ref({
    username: "",
    full_name: "",
    password: "",
    is_active: true,
  });
  const menuList = ref([]);
  const loadingMenus = ref(false);
  const menuAccess = ref({});
  
  const filteredUsers = computed(() => {
    if (!search.value) return users.value;
    const q = search.value.toLowerCase();
    return users.value.filter(
      (u) =>
        u.username.toLowerCase().includes(q) ||
        (u.full_name || "").toLowerCase().includes(q)
    );
  });
  
  function openAddUser() {
    formMode.value = "add";
    form.value = { username: "", full_name: "", password: "", is_active: true };
    showForm.value = true;
  }
  
  function openEdit(user) {
    formMode.value = "edit";
    form.value = { ...user, password: "" };
    showForm.value = true;
  }
  
  async function openAccess(user) {
    selectedUser.value = user;
    try {
      const { data } = await api.get(`/api/user_menu_access/${user.user_id}`);
      menuAccess.value = {};
      data.data.forEach(menu => {
        menuAccess.value[menu.menu_id] = menu.can_access;
      });
      showAccess.value = true;
    } catch (error) {
      console.error('Error fetching menu access:', error);
    }
  }
  
  async function saveUser() {
    try {
      const method = formMode.value === 'add' ? 'post' : 'put';
      const url = formMode.value === 'add' ? '/api/master_users' : `/api/master_users/${form.value.user_id}`;

      await api[method](url, form.value);

      await fetchUsers(); // Refresh the list
      showForm.value = false;
      refreshData(); // Clear search and refresh grid
    } catch (error) {
      console.error('Error saving user:', error);
    }
  }
  
  async function saveAccess() {
    try {
      await api.put(`/api/user_menu_access/${selectedUser.value.user_id}`, { menu_access: menuAccess.value });
      showAccess.value = false;
    } catch (error) {
      console.error('Error saving menu access:', error);
    }
  }
  
  function toggleAccess(menu_id, value) {
    menuAccess.value[menu_id] = value;
  }

  async function fetchMenus() {
    loadingMenus.value = true;
    try {
      const { data } = await api.get('/api/master_menus');
      menuList.value = data.data || [];
    } catch (error) {
      console.error('Error fetching menus:', error);
      menuList.value = [];
    } finally {
      loadingMenus.value = false;
    }
  }

  function refreshData() {
    search.value = "";
    fetchUsers();
  }
  
  async function fetchUsers() {
    try {
      const { data } = await api.get('/api/master_users');
      users.value = data.data;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  
  onMounted(() => {
    fetchUsers();
    fetchMenus();
  });
  </script>
  