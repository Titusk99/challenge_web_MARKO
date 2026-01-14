<script setup>
import { defineProps, defineEmits } from 'vue'
import { useProductStore } from '@/stores/product'
import { storeToRefs } from 'pinia'
import BaseButton from '@/components/ui/BaseButton.vue'
import { X } from 'lucide-vue-next'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close'])

const productStore = useProductStore()
const { activeFilters } = storeToRefs(productStore)

const categories = ['Women', 'Men', 'Accessories', 'Shoes', 'Bags']
const colors = ['Black', 'White', 'Blue', 'Red', 'Imprimé', 'Brown', 'Grey', 'Gold', 'Beige', 'Multi']

const updateCategory = (category) => {
  const index = activeFilters.value.category.indexOf(category)
  if (index === -1) {
    activeFilters.value.category.push(category)
  } else {
    activeFilters.value.category.splice(index, 1)
  }
}

const updateColor = (color) => {
  const index = activeFilters.value.colors.indexOf(color)
  if (index === -1) {
    activeFilters.value.colors.push(color)
  } else {
    activeFilters.value.colors.splice(index, 1)
  }
}

const clearAll = () => {
  productStore.clearFilters()
}
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <div 
      v-if="isOpen" 
      class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
      @click="emit('close')"
    ></div>

    <!-- Sidebar -->
    <div 
      class="fixed inset-y-0 left-0 w-80 bg-gl-white-glass backdrop-blur-md shadow-2xl z-50 transform transition-transform duration-500 ease-out"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="h-full flex flex-col p-6">
        <!-- Header -->
        <div class="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
          <h2 class="font-serif text-2xl">Filters</h2>
          <button @click="emit('close')" class="hover:bg-gray-100 p-2 rounded-full transition-colors">
            <X class="w-6 h-6" />
          </button>
        </div>

        <!-- Scrollable Content -->
        <div class="flex-grow overflow-y-auto space-y-8">
            
            <!-- Categories -->
            <div>
                <h3 class="text-xs font-bold uppercase tracking-widest mb-4">Categories</h3>
                <div class="space-y-2">
                    <label v-for="cat in categories" :key="cat" class="flex items-center space-x-3 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            :value="cat" 
                            :checked="activeFilters.category.includes(cat)"
                            @change="updateCategory(cat)"
                            class="form-checkbox h-4 w-4 text-gl-black border-gray-300 rounded focus:ring-gl-black transition duration-150 ease-in-out"
                        />
                        <span class="text-sm font-medium group-hover:text-gl-black text-gray-600 transition-colors">{{ cat }}</span>
                    </label>
                </div>
            </div>

            <!-- Price Range -->
            <div>
                <h3 class="text-xs font-bold uppercase tracking-widest mb-4">Price</h3>
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <span class="text-sm">Min: ${{ activeFilters.minPrice }}</span>
                        <span class="text-sm">Max: ${{ activeFilters.maxPrice }}</span>
                    </div>
                    <input 
                        type="range" 
                        min="0" 
                        max="2000" 
                        step="50"
                        v-model.number="activeFilters.maxPrice"
                        class="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gl-black"
                    />
                </div>
            </div>

            <!-- Colors -->
            <div>
                <h3 class="text-xs font-bold uppercase tracking-widest mb-4">Colors</h3>
                <div class="flex flex-wrap gap-3">
                    <button 
                        v-for="color in colors" 
                        :key="color"
                        @click="updateColor(color)"
                        class="w-8 h-8 rounded-full border border-gray-200 shadow-sm transition-transform hover:scale-110 flex items-center justify-center relative"
                        :class="{'ring-2 ring-gl-black ring-offset-2': activeFilters.colors.includes(color)}"
                        :style="{ backgroundColor: color.toLowerCase() === 'multi' ? 'transparent' : color.toLowerCase() }"
                        :title="color"
                    >
                         <span v-if="color === 'Multi'" class="text-[0.6rem] font-bold">Multi</span>
                         <span v-if="color === 'White'" class="block w-full h-full rounded-full border border-gray-100"></span>
                    </button>
                </div>
            </div>

        </div>

        <!-- Footer Actions -->
        <div class="border-t border-gray-200 pt-6 mt-4 space-y-3">
            <BaseButton class="w-full" @click="emit('close')">View Results</BaseButton>
            <button 
                @click="clearAll"
                class="w-full text-center text-sm underline hover:text-gl-red transition-colors"
            >
                Clear Filters
            </button>
        </div>

      </div>
    </div>
  </Teleport>
</template>
