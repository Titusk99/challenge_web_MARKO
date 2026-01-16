<script setup>
import { ref } from 'vue'
import GlassContainer from '@/components/ui/GlassContainer.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useToastStore } from '@/stores/toast'

const toastStore = useToastStore()
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})
const isLoading = ref(false)

const handleSubmit = async () => {
  isLoading.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  toastStore.addToast('Message sent successfully! We will get back to you soon.', 'success')
  form.value = { name: '', email: '', subject: '', message: '' }
  isLoading.value = false
}
</script>

<template>
  <div class="min-h-screen pt-32 pb-20 px-6">
    <div class="container mx-auto max-w-4xl">
      <h1 class="font-serif text-4xl md:text-5xl text-gl-black mb-12 text-center">Contact Us</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Contact Info -->
        <div class="space-y-8">
          <div>
            <h2 class="font-serif text-2xl mb-4">Get in Touch</h2>
            <p class="text-gray-600 leading-relaxed">
              Our client advisors are available to assist you with your order, product questions, or style advice.
            </p>
          </div>
          
          <div>
            <h3 class="font-medium text-gl-black mb-2">Email</h3>
            <p class="text-gray-600">concierge@marko.luxury</p>
          </div>

          <div>
            <h3 class="font-medium text-gl-black mb-2">Phone</h3>
            <p class="text-gray-600">+1 (800) 123-4567</p>
            <p class="text-sm text-gray-500">Mon-Fri, 9am - 6pm EST</p>
          </div>

          <div>
            <h3 class="font-medium text-gl-black mb-2">Address</h3>
            <p class="text-gray-600">
              123 Luxury Avenue<br>
              Paris, France 75001
            </p>
          </div>
        </div>

        <!-- Contact Form -->
        <GlassContainer class="p-8">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="space-y-2">
              <label class="text-xs uppercase tracking-wider text-gray-500">Name</label>
              <input 
                v-model="form.name"
                type="text" 
                required
                class="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gl-black transition-colors bg-transparent"
              />
            </div>
            <div class="space-y-2">
              <label class="text-xs uppercase tracking-wider text-gray-500">Email</label>
              <input 
                v-model="form.email"
                type="email" 
                required
                class="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gl-black transition-colors bg-transparent"
              />
            </div>
            <div class="space-y-2">
              <label class="text-xs uppercase tracking-wider text-gray-500">Subject</label>
              <input 
                v-model="form.subject"
                type="text" 
                required
                class="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gl-black transition-colors bg-transparent"
              />
            </div>
            <div class="space-y-2">
              <label class="text-xs uppercase tracking-wider text-gray-500">Message</label>
              <textarea 
                v-model="form.message"
                required
                rows="4"
                class="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gl-black transition-colors bg-transparent resize-none"
              ></textarea>
            </div>
            <BaseButton type="submit" :loading="isLoading" class="w-full">Send Message</BaseButton>
          </form>
        </GlassContainer>
      </div>
    </div>
  </div>
</template>
