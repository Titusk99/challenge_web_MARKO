<script setup>
import TopBar from '@/components/layout/TopBar.vue'
import Navbar from '@/components/layout/Navbar.vue'
import ToastManager from '@/components/ui/ToastManager.vue'
</script>

<template>
  <div class="min-h-screen bg-gl-gray text-gl-black font-sans">
    <TopBar />
    <Navbar />
    <router-view />
    <ToastManager />
  </div>
</template>
