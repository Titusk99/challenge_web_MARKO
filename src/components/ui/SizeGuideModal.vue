<script setup>
import { X } from 'lucide-vue-next'

defineProps({
  isOpen: Boolean
})

defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-gl-black-glass backdrop-blur-sm" @click="$emit('close')"></div>
        
        <!-- Modal Content -->
        <div class="relative bg-white w-full max-w-2xl mx-4 p-8 shadow-2xl animate-slide-up">
          <button @click="$emit('close')" class="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X class="w-6 h-6" />
          </button>

          <h2 class="text-3xl font-serif mb-8 text-center">Size Guide</h2>

          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th class="px-6 py-3">Size</th>
                  <th class="px-6 py-3">Chest (cm)</th>
                  <th class="px-6 py-3">Waist (cm)</th>
                  <th class="px-6 py-3">Hips (cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white border-b">
                  <td class="px-6 py-4 font-medium text-gray-900">XS</td>
                  <td class="px-6 py-4">82-86</td>
                  <td class="px-6 py-4">62-66</td>
                  <td class="px-6 py-4">88-92</td>
                </tr>
                <tr class="bg-white border-b">
                  <td class="px-6 py-4 font-medium text-gray-900">S</td>
                  <td class="px-6 py-4">86-90</td>
                  <td class="px-6 py-4">66-70</td>
                  <td class="px-6 py-4">92-96</td>
                </tr>
                <tr class="bg-white border-b">
                  <td class="px-6 py-4 font-medium text-gray-900">M</td>
                  <td class="px-6 py-4">90-94</td>
                  <td class="px-6 py-4">70-74</td>
                  <td class="px-6 py-4">96-100</td>
                </tr>
                <tr class="bg-white border-b">
                  <td class="px-6 py-4 font-medium text-gray-900">L</td>
                  <td class="px-6 py-4">94-98</td>
                  <td class="px-6 py-4">74-78</td>
                  <td class="px-6 py-4">100-104</td>
                </tr>
                <tr class="bg-white">
                  <td class="px-6 py-4 font-medium text-gray-900">XL</td>
                  <td class="px-6 py-4">98-102</td>
                  <td class="px-6 py-4">78-82</td>
                  <td class="px-6 py-4">104-108</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="mt-8 text-center text-gray-500 text-sm">
            <p>Measurements are in centimeters. Fits may vary by style.</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
