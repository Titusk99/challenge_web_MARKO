<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BaseButton from '@/components/ui/BaseButton.vue'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const handleSubmit = async () => {
  if (!email.value || !password.value) return
  await authStore.login(email.value, password.value)
}
</script>

<template>
  <div class="min-h-screen relative flex items-center justify-center overflow-hidden">
    <!-- Background -->
    <div 
      class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1471')] bg-cover bg-center"
    >
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
    </div>

    <!-- Glass Form -->
    <div class="relative z-10 w-full max-w-md p-8 md:p-12 bg-gl-white-glass backdrop-blur-md rounded-sm shadow-2xl animate-slide-up">
      <div class="text-center mb-10">
        <h1 class="font-serif text-3xl md:text-4xl text-gl-black mb-2">Welcome Back</h1>
        <p class="text-gl-dark-gray text-sm">Sign in to access your exclusive space.</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
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
          <div class="flex justify-between">
            <label class="text-xs uppercase tracking-wider text-gl-dark-gray font-bold">Password</label>
            <a href="#" class="text-xs text-gl-dark-gray hover:text-gl-black underline">Forgot?</a>
          </div>
          <input 
            v-model="password"
            type="password" 
            class="w-full bg-white/50 border border-gray-300 px-4 py-3 focus:outline-none focus:border-gl-black focus:bg-white transition-colors"
            placeholder="••••••••"
          />
        </div>

        <BaseButton 
          type="submit" 
          class="w-full h-12 text-sm"
          :loading="authStore.isLoading"
        >
          Sign In
        </BaseButton>
      </form>

      <div class="mt-8 text-center text-sm text-gl-dark-gray">
        Do not have an account? 
        <router-link to="/register" class="font-bold underline hover:text-gl-black">Create one</router-link>
      </div>
    </div>
  </div>
</template>
