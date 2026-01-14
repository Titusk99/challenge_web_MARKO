<script setup>
import TopBar from '@/components/layout/TopBar.vue'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import ToastManager from '@/components/ui/ToastManager.vue'
</script>

<template>
  <div class="min-h-screen bg-gl-gray text-gl-black font-sans flex flex-col">
    <TopBar />
    <Navbar />
    <main class="flex-grow">
      <router-view />
    </main>
    <Footer />
    <ToastManager />
  </div>
</template>
