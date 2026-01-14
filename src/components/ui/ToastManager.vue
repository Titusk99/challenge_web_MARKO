<script setup>
import { useToastStore } from '@/stores/toast'
import { storeToRefs } from 'pinia'

const toastStore = useToastStore()
const { toasts } = storeToRefs(toastStore)

const getTypeClasses = (type) => {
  switch (type) {
    case 'success':
      return 'bg-gl-black text-white'
    case 'error':
      return 'bg-gl-red text-white'
    default:
      return 'bg-gl-white-glass text-gl-black backdrop-blur-md border border-gray-200'
  }
}
</script>

<template>
  <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
    <TransitionGroup name="slide-up">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="px-6 py-4 rounded shadow-lg min-w-[300px] flex items-center justify-between"
        :class="getTypeClasses(toast.type)"
      >
        <span class="text-sm font-medium">{{ toast.message }}</span>
        <button @click="toastStore.removeToast(toast.id)" class="ml-4 hover:opacity-75">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
