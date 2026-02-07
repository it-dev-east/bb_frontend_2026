<template>
    <div>
      <label class="block text-sm text-gray-600">{{ label }}</label>
      <div class="flex items-center gap-2">
        <!-- Flag -->
        <span
          v-if="flag"
          class="px-2 py-1 text-white rounded-lg text-xs font-bold"
          :class="flag === 'L' || flag === 'H' ? 'bg-[#FAA0A0]' : 'bg-green-400'"
        >
          {{ flag }}
        </span>
  
        <!-- Input -->
        <input
          v-model="localValue"
          :class="[
            'border rounded-lg p-2 text-center',
            inputClass,
            flag === 'L' || flag === 'H' ? 'bg-[#FAA0A0]' : ''
          ]"
          :placeholder="placeholder"
          :type="type"
        />
        
        <!-- Keterangan -->
        <span class="flex-1 p-2 bg-gray-50 text-gray-600 text-sm  border-gray-200">{{ note }}</span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, computed } from "vue";
  
  const props = defineProps({
    label: String,
    note: String,
    placeholder: String,
    type: { type: String, default: "number" },
    modelValue: [String, Number],
    inputClass: { type: String, default: "w-24" },
    min: Number,
    max: Number
  });
  
  const emit = defineEmits(["update:modelValue"]);
  
  const localValue = ref(props.modelValue);
  
  watch(
    () => props.modelValue,
    (val) => {
      localValue.value = val;
    }
  );
  
  watch(localValue, (val) => {
    emit("update:modelValue", val);
  });
  
  const flag = computed(() => {
    const val = parseFloat(localValue.value);
    if (isNaN(val)) return "";
    if (props.min != null && val < props.min) return "L";
    if (props.max != null && val > props.max) return "H";
    return "";
  });
  </script>
  