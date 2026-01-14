<script setup>
import { computed } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  activeCategory: Object
})

const isVisible = computed(() => props.isOpen && props.activeCategory)
</script>

<template>
  <Transition
    enter-active-class="transition duration-500 ease-out"
    enter-from-class="opacity-0 translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-300 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-2"
  >
    <div 
      v-if="isVisible"
      class="absolute top-20 left-0 w-full bg-gl-white-glass backdrop-blur-md border-b border-gray-100 shadow-sm z-30"
      @mouseenter="$emit('mouseenter')"
      @mouseleave="$emit('mouseleave')"
    >
      <div class="container mx-auto px-6 py-10">
        <div class="grid grid-cols-4 gap-12">
          
          <!-- Column 1 -->
          <div>
            <h3 class="font-serif text-lg font-medium mb-6 text-gl-black">{{ activeCategory.column1.title }}</h3>
            <ul class="space-y-4">
              <li v-for="item in activeCategory.column1.items" :key="item.label">
                <a :href="item.href" class="text-sm text-gl-dark-gray hover:text-gl-red transition-colors block">
                  {{ item.label }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Column 2 -->
          <div>
            <h3 class="font-serif text-lg font-medium mb-6 text-gl-black">{{ activeCategory.column2.title }}</h3>
            <ul class="space-y-4">
              <li v-for="item in activeCategory.column2.items" :key="item.label">
                <a :href="item.href" class="text-sm text-gl-dark-gray hover:text-gl-red transition-colors block">
                  {{ item.label }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Column 3 -->
          <div>
            <h3 class="font-serif text-lg font-medium mb-6 text-gl-black">{{ activeCategory.column3.title }}</h3>
            <ul class="space-y-4">
              <li v-for="item in activeCategory.column3.items" :key="item.label">
                <a :href="item.href" class="text-sm text-gl-dark-gray hover:text-gl-red transition-colors block">
                  {{ item.label }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Featured Image -->
          <div class="relative group cursor-pointer overflow-hidden rounded-sm">
            <div class="aspect-[4/5] w-full overflow-hidden">
                <img 
                :src="activeCategory.featured.image" 
                :alt="activeCategory.featured.title"
                class="w-full h-full object-cover transition-transform duration-[20s] ease-linear group-hover:scale-110"
                >
            </div>
            <div class="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-black/20"></div>
            <div class="absolute bottom-6 left-6 text-white">
              <h4 class="font-serif text-xl mb-2">{{ activeCategory.featured.title }}</h4>
              <span class="text-xs font-bold tracking-widest border-b border-white pb-1">DISCOVER</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </Transition>
</template>
