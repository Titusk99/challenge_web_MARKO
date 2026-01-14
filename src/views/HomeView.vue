<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'
import GlassContainer from '@/components/ui/GlassContainer.vue'
import { useToastStore } from '@/stores/toast'

const toastStore = useToastStore()

const showToast = (type) => {
  toastStore.addToast(`This is a ${type} notification`, type)
}
</script>

<template>
  <div class="container mx-auto p-8">
    <h1 class="text-4xl font-bold text-gl-black mb-8">MARKO Design System</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Buttons Section -->
      <section>
        <h2 class="text-2xl mb-4 font-serif">Buttons</h2>
        <div class="flex flex-col gap-4 items-start">
          <BaseButton>Primary Button</BaseButton>
          <BaseButton variant="secondary">Secondary Button</BaseButton>
          <BaseButton variant="outline">Outline Button</BaseButton>
          <BaseButton loading>Loading State</BaseButton>
          <BaseButton disabled>Disabled State</BaseButton>
        </div>
      </section>

      <!-- Glass Container Section -->
      <section class="relative p-8 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover rounded-lg">
        <h2 class="text-2xl mb-4 font-serif text-white drop-shadow-md">Glassmorphism</h2>
        <GlassContainer class="p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-2">Glass Container</h3>
          <p class="text-sm">
            This container uses the <code>gl-white-glass</code> utility with a backdrop blur effect.
            Perfect for overlaying content on busy backgrounds.
          </p>
          <div class="mt-4">
            <BaseButton variant="primary" @click="showToast('info')">Test Toast Info</BaseButton>
          </div>
        </GlassContainer>
      </section>

      <!-- Toasts Section -->
      <section>
        <h2 class="text-2xl mb-4 font-serif">Notifications</h2>
        <div class="flex gap-4">
          <BaseButton variant="outline" @click="showToast('success')">Success</BaseButton>
          <BaseButton variant="outline" @click="showToast('error')">Error</BaseButton>
        </div>
      </section>
    </div>
  </div>
</template>
