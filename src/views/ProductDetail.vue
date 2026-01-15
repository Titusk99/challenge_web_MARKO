<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'
import BaseButton from '@/components/ui/BaseButton.vue'
import SizeGuideModal from '@/components/ui/SizeGuideModal.vue'
import { Heart, Share2, Truck, RefreshCw, ShieldCheck } from 'lucide-vue-next'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()
const { currentProduct, isLoading, error } = storeToRefs(productStore)

const selectedSize = ref(null)
const isSizeGuideOpen = ref(false)

const sizes = ['XS', 'S', 'M', 'L', 'XL']

onMounted(() => {
  productStore.fetchProductById(route.params.id)
})

const addToCart = () => {
  if (currentProduct.value && selectedSize.value) {
    cartStore.addToCart(currentProduct.value, selectedSize.value)
  }
}

const toggleFavorite = () => {
  // TODO: Implement favorites
  console.log('Toggle favorite')
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Header Spacing -->
    <div class="h-24"></div>

    <div v-if="isLoading" class="container mx-auto px-4 py-12 flex justify-center">
      <div class="animate-spin h-8 w-8 border-4 border-gl-black border-t-transparent rounded-full"></div>
    </div>

    <div v-else-if="error" class="container mx-auto px-4 py-12 text-center text-red-500">
      {{ error.message }}
    </div>

    <div v-else-if="currentProduct" class="container mx-auto px-4 sm:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        
        <!-- Left: Sticky Image Gallery -->
        <div class="relative">
          <div class="sticky top-32 space-y-4">
            <div class="aspect-[3/4] w-full overflow-hidden rounded-sm bg-gray-100">
              <img 
                :src="currentProduct.image" 
                :alt="currentProduct.name"
                class="w-full h-full object-cover animate-fade-in"
              />
            </div>
            <!-- Additional images would go here -->
          </div>
        </div>

        <!-- Right: Product Info -->
        <div class="relative pt-4">
          <div class="mb-8">
            <h2 class="text-sm tracking-widest text-gray-500 uppercase mb-2">{{ currentProduct.category }}</h2>
            <h1 class="text-4xl md:text-5xl font-serif text-gl-black mb-4">{{ currentProduct.name }}</h1>
            <p class="text-2xl font-medium text-gl-black">${{ Number(currentProduct.price).toFixed(2) }}</p>
          </div>

          <div class="prose prose-sm text-gray-600 mb-8">
            <p>
              Experience luxury with this meticulously crafted piece. 
              Designed for the modern individual who values both style and comfort.
              Made from premium materials to ensure lasting quality.
            </p>
          </div>

          <!-- Size Selector -->
          <div class="mb-8">
            <div class="flex justify-between items-center mb-4">
              <span class="text-sm font-medium text-gl-black">Select Size</span>
              <button 
                @click="isSizeGuideOpen = true"
                class="text-sm text-gray-500 underline hover:text-gl-black transition-colors"
              >
                Size Guide
              </button>
            </div>
            <div class="grid grid-cols-5 gap-4">
              <button
                v-for="size in sizes"
                :key="size"
                @click="selectedSize = size"
                class="h-12 flex items-center justify-center border transition-all duration-300"
                :class="[
                  selectedSize === size 
                    ? 'border-gl-black bg-gl-black text-white' 
                    : 'border-gray-200 hover:border-gl-black text-gray-900'
                ]"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-4 mb-12">
            <BaseButton 
              class="flex-1 h-14 text-lg" 
              :disabled="!selectedSize"
              @click="addToCart"
            >
              {{ selectedSize ? 'Add to Cart' : 'Select a Size' }}
            </BaseButton>
            <button 
              @click="toggleFavorite"
              class="w-14 h-14 flex items-center justify-center border border-gray-200 rounded-sm hover:border-gl-black transition-colors"
            >
              <Heart class="w-6 h-6" />
            </button>
          </div>

          <!-- Features Accordion (Static for now) -->
          <div class="border-t border-gray-200 divide-y divide-gray-200">
            <div class="py-4 flex items-start gap-4">
              <Truck class="w-5 h-5 mt-1" />
              <div>
                <h4 class="font-medium text-sm mb-1">Free Delivery</h4>
                <p class="text-xs text-gray-500">Free standard shipping on orders over $200.</p>
              </div>
            </div>
            <div class="py-4 flex items-start gap-4">
              <RefreshCw class="w-5 h-5 mt-1" />
              <div>
                <h4 class="font-medium text-sm mb-1">Easy Returns</h4>
                <p class="text-xs text-gray-500">30-day return policy for all items.</p>
              </div>
            </div>
            <div class="py-4 flex items-start gap-4">
              <ShieldCheck class="w-5 h-5 mt-1" />
              <div>
                <h4 class="font-medium text-sm mb-1">Secure Payment</h4>
                <p class="text-xs text-gray-500">All transactions are encrypted and secure.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <SizeGuideModal 
      :isOpen="isSizeGuideOpen" 
      @close="isSizeGuideOpen = false" 
    />
  </div>
</template>
