<script setup>
import { Instagram, Facebook, Twitter, Mail } from 'lucide-vue-next'
</script>

<template>
  <footer class="bg-gl-gray text-gl-black pt-20 pb-10 border-t border-gray-200">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        <!-- Brand -->
        <div class="space-y-6">
          <h2 class="font-serif text-2xl font-bold tracking-tight flex items-center gap-1">
            MARKO
            <span class="w-2 h-2 rounded-full bg-gl-red mt-1"></span>
          </h2>
          <p class="text-gl-dark-gray text-sm leading-relaxed max-w-xs">
            Redefining luxury retail with curated collections and timeless elegance. Quality that speaks for itself.
          </p>
          <div class="flex items-center gap-4">
            <a href="#" class="p-2 bg-white rounded-full hover:bg-gl-black hover:text-white transition-all duration-300">
              <Instagram class="w-4 h-4" />
            </a>
            <a href="#" class="p-2 bg-white rounded-full hover:bg-gl-black hover:text-white transition-all duration-300">
              <Facebook class="w-4 h-4" />
            </a>
            <a href="#" class="p-2 bg-white rounded-full hover:bg-gl-black hover:text-white transition-all duration-300">
              <Twitter class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Shop -->
        <div>
          <h3 class="font-serif text-lg font-medium mb-6">Shop</h3>
          <ul class="space-y-4">
            <li><router-link to="/category/women" class="text-sm text-gl-dark-gray hover:text-gl-red transition-colors">Women</router-link></li>
            <li><router-link to="/category/men" class="text-sm text-gl-dark-gray hover:text-gl-red transition-colors">Men</router-link></li>
            <li><router-link to="/category/beauty" class="text-sm text-gl-dark-gray hover:text-gl-red transition-colors">Beauty</router-link></li>
            <li><router-link to="/sales" class="text-sm text-gl-dark-gray hover:text-gl-red transition-colors">Sales</router-link></li>
            <li><router-link to="/new-arrivals" class="text-sm text-gl-dark-gray hover:text-gl-red transition-colors">New Arrivals</router-link></li>
          </ul>
        </div>

        <!-- Help -->
        <div>
          <h3 class="font-serif text-lg font-medium mb-6">Customer Care</h3>
          <ul class="space-y-4">
            <li><a href="#" class="text-sm text-gl-dark-gray hover:text-gl-red transition-colors">Shipping & Returns</a></li>
            <li><a href="#" class="text-sm text-gl-dark-gray hover:text-gl-red transition-colors">Size Guide</a></li>
            <li><a href="#" class="text-sm text-gl-dark-gray hover:text-gl-red transition-colors">FAQ</a></li>
            <li><a href="#" class="text-sm text-gl-dark-gray hover:text-gl-red transition-colors">Contact Us</a></li>
            <li><a href="#" class="text-sm text-gl-dark-gray hover:text-gl-red transition-colors">Terms & Conditions</a></li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h3 class="font-serif text-lg font-medium mb-6">Newsletter</h3>
          <p class="text-sm text-gl-dark-gray mb-6">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <form class="space-y-4">
            <div class="relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                class="w-full bg-white border border-gray-200 py-3 px-4 text-sm focus:outline-none focus:border-gl-black transition-colors placeholder:text-gray-400"
              >
              <Mail class="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
            </div>
            <button class="w-full bg-gl-black text-white py-3 px-4 text-sm font-medium hover:bg-gl-red transition-colors duration-300">
              SUBSCRIBE
            </button>
          </form>
        </div>

      </div>

      <div class="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
        <p class="text-xs text-gl-dark-gray">© 2026 MARKO. All rights reserved.</p>
        <div class="flex gap-6 mt-4 md:mt-0">
          <a href="#" class="text-xs text-gl-dark-gray hover:text-gl-black">Privacy Policy</a>
          <a href="#" class="text-xs text-gl-dark-gray hover:text-gl-black">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
</template>
