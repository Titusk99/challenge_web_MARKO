<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BaseButton from '@/components/ui/BaseButton.vue'

const authStore = useAuthStore()
const router = useRouter()

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')

const handleSubmit = async () => {
  error.value = ''
  
  if (!email.value || !password.value || !fullName.value || !confirmPassword.value) {
    error.value = 'All fields are required'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }

  await authStore.register(fullName.value, email.value, password.value)
}
</script>

<template>
  <div class="min-h-screen relative flex items-center justify-center overflow-hidden">
    <!-- Background -->
    <div 
      class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center"
    >
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
    </div>

    <!-- Glass Form -->
    <div class="relative z-10 w-full max-w-md p-8 md:p-12 bg-gl-white-glass backdrop-blur-md rounded-sm shadow-2xl animate-slide-up">
      <div class="text-center mb-10">
        <h1 class="font-serif text-3xl md:text-4xl text-gl-black mb-2">Join Marko</h1>
        <p class="text-gl-dark-gray text-sm">Create your account to start your journey.</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="space-y-2">
          <label class="text-xs uppercase tracking-wider text-gl-dark-gray font-bold">Full Name</label>
          <input 
            v-model="fullName"
            type="text" 
            class="w-full bg-white/50 border border-gray-300 px-4 py-3 focus:outline-none focus:border-gl-black focus:bg-white transition-colors"
            placeholder="Jane Doe"
          />
        </div>

        <div class="space-y-2">
          <label class="text-xs uppercase tracking-wider text-gl-dark-gray font-bold">Email</label>
          <input 
            v-model="email"
            type="email" 
            class="w-full bg-white/50 border border-gray-300 px-4 py-3 focus:outline-none focus:border-gl-black focus:bg-white transition-colors"
            placeholder="name@example.com"
          />
        </div>

        <div class="space-y-2">
          <label class="text-xs uppercase tracking-wider text-gl-dark-gray font-bold">Password</label>
          <input 
            v-model="password"
            type="password" 
            class="w-full bg-white/50 border border-gray-300 px-4 py-3 focus:outline-none focus:border-gl-black focus:bg-white transition-colors"
            placeholder="••••••••"
          />
        </div>

        <div class="space-y-2">
          <label class="text-xs uppercase tracking-wider text-gl-dark-gray font-bold">Confirm Password</label>
          <input 
            v-model="confirmPassword"
            type="password" 
            class="w-full bg-white/50 border border-gray-300 px-4 py-3 focus:outline-none focus:border-gl-black focus:bg-white transition-colors"
            placeholder="••••••••"
          />
        </div>

        <div v-if="error" class="text-red-500 text-sm text-center font-medium">
          {{ error }}
        </div>

        <BaseButton 
          type="submit" 
          class="w-full h-12 text-sm"
          :loading="authStore.isLoading"
        >
          Create Account
        </BaseButton>
      </form>

      <div class="mt-8 text-center text-sm text-gl-dark-gray">
        Already have an account? 
        <router-link to="/login" class="font-bold underline hover:text-gl-black">Sign In</router-link>
      </div>
    </div>
  </div>
</template>
