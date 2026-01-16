<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  isOpen: Boolean,
  activeCategory: Object
})
</script>

<template>
  <div 
    v-if="isOpen && activeCategory"
    class="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl z-40 animate-slide-down transform origin-top"
    @mouseenter="$emit('mouseenter')"
    @mouseleave="$emit('mouseleave')"
  >
    <div class="container mx-auto px-8 py-12">
      <div class="grid grid-cols-4 gap-12">
        <!-- Sections -->
        <div v-for="section in activeCategory.sections" :key="section.id" class="space-y-6">
          <h3 class="font-serif text-xl text-gl-black border-b border-gray-100 pb-2">
            {{ section.name }}
          </h3>
          <ul class="space-y-3">
            <li v-for="item in section.items" :key="item.name">
              <RouterLink 
                :to="item.href"
                class="text-gray-500 hover:text-gl-red transition-colors text-sm font-medium block hover:translate-x-1 duration-200"
              >
                {{ item.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Featured (Optional visual block) -->
        <div class="col-span-1 bg-gray-50 p-6 rounded-sm text-center">
            <h4 class="font-serif text-lg mb-4">New Collection</h4>
            <div class="w-full aspect-[3/4] bg-gray-200 mb-4 overflow-hidden relative group">
                <!-- Placeholder for image -->
                 <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
            </div>
            <button class="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gl-red hover:border-gl-red transition-all">
                Shop Now
            </button>
        </div>
      </div>
    </div>
  </div>
</template>
