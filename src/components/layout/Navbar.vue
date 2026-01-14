<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Search, ShoppingBag, User, Menu } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const isScrolled = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 20
  })
})
</script>

<template>
  <nav 
    class="sticky top-0 z-40 transition-all duration-500 border-b border-transparent"
    :class="[
      isScrolled ? 'bg-gl-white-glass backdrop-blur-md shadow-sm border-gray-100' : 'bg-transparent'
    ]"
  >
    <div class="container mx-auto px-6 h-20 flex items-center justify-between">
      
      <!-- Mobile Menu Button -->
      <button class="lg:hidden p-2 hover:bg-black/5 rounded-full transition-colors">
        <Menu class="w-6 h-6" />
      </button>

      <!-- Logo -->
      <RouterLink to="/" class="group flex items-center gap-1">
        <span class="font-serif text-2xl font-bold tracking-tight animate-slide-down">
          MARKO
        </span>
        <span class="w-2 h-2 rounded-full bg-gl-red mt-1 group-hover:animate-pulse"></span>
      </RouterLink>

      <!-- Desktop Navigation -->
      <div class="hidden lg:flex items-center space-x-8">
        <RouterLink to="/category/women" class="text-sm font-medium hover:text-gl-red transition-colors relative group">
          WOMEN
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gl-red transition-all duration-300 group-hover:w-full"></span>
        </RouterLink>
        <RouterLink to="/category/men" class="text-sm font-medium hover:text-gl-red transition-colors relative group">
          MEN
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gl-red transition-all duration-300 group-hover:w-full"></span>
        </RouterLink>
        <RouterLink to="/category/beauty" class="text-sm font-medium hover:text-gl-red transition-colors relative group">
          BEAUTY
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gl-red transition-all duration-300 group-hover:w-full"></span>
        </RouterLink>
        <RouterLink to="/sales" class="text-sm font-medium text-gl-red hover:text-black transition-colors relative group">
          SALES
        </RouterLink>
      </div>

      <!-- Icons -->
      <div class="flex items-center space-x-4">
        <button class="p-2 hover:bg-black/5 rounded-full transition-all duration-300 hover:scale-105">
          <Search class="w-5 h-5 text-gl-dark-gray" />
        </button>
        
        <RouterLink to="/auth" class="p-2 hover:bg-black/5 rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2">
          <User class="w-5 h-5 text-gl-dark-gray" />
          <span v-if="auth.isAuthenticated" class="hidden sm:inline text-xs font-medium truncate max-w-[80px]">
            {{ auth.user?.name }}
          </span>
        </RouterLink>

        <button class="p-2 hover:bg-black/5 rounded-full transition-all duration-300 hover:scale-105 relative">
          <ShoppingBag class="w-5 h-5 text-gl-dark-gray" />
          <!-- Cart Badge (example) -->
          <span class="absolute top-1 right-1 w-2 h-2 bg-gl-red rounded-full ring-2 ring-white"></span>
        </button>
      </div>
    </div>
  </nav>
</template>
