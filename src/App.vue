<script setup>
import ToastManager from '@/components/ui/ToastManager.vue'
</script>

<template>
  <div class="min-h-screen bg-gl-gray text-gl-black font-sans">
    <router-view />
    <ToastManager />
  </div>
</template>
