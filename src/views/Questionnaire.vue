<template>
  <div class="p-4 border rounded">
    <h2 class="text-lg font-semibold mb-2">Kuisioner Donor</h2>
    <div v-if="!data">Loading...</div>
    <div v-else>
      <div v-for="g in data.groups" :key="g.id" class="mb-3">
        <h3 class="font-medium">{{ g.title }}</h3>
        <div v-for="q in questionsByGroup(g.id)" :key="q.id" class="flex items-center gap-2 mt-1">
          <label class="flex items-center gap-2">
            <input type="radio" :name="'q'+q.id" v-model="answers[q.id]" :value="true" /> Ya
          </label>
          <label class="flex items-center gap-2">
            <input type="radio" :name="'q'+q.id" v-model="answers[q.id]" :value="false" /> Tidak
          </label>
          <span class="ml-2">{{ q.question }}</span>
        </div>
      </div>
      <label class="flex items-center gap-2 mt-2">
        <input type="checkbox" v-model="informed" /> I give informed consent
      </label>
      <div class="mt-2">
        <button @click="submit" class="bg-green-600 text-white px-3 py-1 rounded">Submit</button>
        <p v-if="message" class="mt-2 text-green-700">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const data = ref(null)
const answers = ref({})
const informed = ref(false)
const message = ref('')

onMounted(async () => {
  const res = await axios.get('/api/questionnaire')
  data.value = res.data
  for (const q of data.value.questions) {
    answers.value[q.id] = true // default yes
  }
})

function questionsByGroup(gid) {
  if (!data.value) return []
  return data.value.questions.filter(q => q.group_id === gid)
}

async function submit() {
  if (!informed.value) {
    message.value = 'Harap centang informed consent sebelum submit.'
    return
  }
  const payload = { informed_consent: informed.value, answers: Object.entries(answers.value).map(([k,v]) => [Number(k), v]) }
  try {
    await axios.post('/api/questionnaire/submit', payload)
    message.value = 'Submitted'
  } catch (e) {
    message.value = e?.response?.data?.detail || 'Failed'
  }
}
</script>
