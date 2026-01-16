<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import BaseButton from '@/components/ui/BaseButton.vue'
import ProductCard from '@/components/ui/ProductCard.vue'
import { useProductStore } from '@/stores/product'

const productStore = useProductStore()
const { trendingProducts, isLoading } = storeToRefs(productStore)

onMounted(() => {
  productStore.fetchTrendingProducts()
})
</script>

<template>
  <div class="flex flex-col w-full">
    
    <!-- HERO SECTION -->
    <section class="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <!-- Background Image with Zoom Animation -->
      <div 
        class="absolute inset-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center animate-zoom-subtle z-0"
      ></div>
      
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/20 z-10"></div>

      <!-- Content -->
      <div class="relative z-20 text-center px-4 max-w-4xl mx-auto space-y-8 animate-fade-in text-white">
        <h2 class="text-sm md:text-base uppercase tracking-[0.2em] mb-2 text-white/90">New Collection 2024</h2>
        <h1 class="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight mb-6">
          Editorial <br/> Elegance
        </h1>
        <p class="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto mb-8">
          Discover the new standards of luxury. Minimalist cuts, premium materials, and timeless style.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <router-link to="/category/women">
            <BaseButton class="min-w-[180px] !bg-white !text-gl-black hover:!bg-gl-gray">Shop Women</BaseButton>
          </router-link>
          <router-link to="/category/men">
            <BaseButton class="min-w-[180px] !bg-transparent border border-white !text-white hover:!bg-white/10">Shop Men</BaseButton>
          </router-link>
        </div>
      </div>
    </section>

    <!-- TRENDING SECTION -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 md:px-8">
        <div class="flex justify-between items-end mb-12 animate-slide-up">
          <div>
            <span class="text-gl-red uppercase tracking-widest text-xs font-bold mb-2 block">This Week</span>
            <h2 class="font-serif text-3xl md:text-4xl">Trending Now</h2>
          </div>
          <router-link to="/products" class="hidden md:block text-sm border-b border-gl-black pb-1 hover:text-gl-red hover:border-gl-red transition-colors">
            View All Products
          </router-link>
        </div>

        <!-- Horizontal Slider -->
        <div class="relative">
            <div 
                v-if="isLoading" 
                class="flex gap-8 overflow-hidden py-4"
            >
                <!-- Loading Skeletons -->
                <div v-for="i in 4" :key="i" class="w-72 flex-shrink-0 space-y-4 animate-pulse">
                    <div class="bg-gray-200 aspect-[3/4] w-full"></div>
                    <div class="h-4 bg-gray-200 w-3/4"></div>
                    <div class="h-4 bg-gray-200 w-1/4"></div>
                </div>
            </div>

            <div 
                v-else
                class="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
            >
                <ProductCard 
                    v-for="(product, index) in trendingProducts" 
                    :key="product.id"
                    :product="product"
                    class="animate-slide-up"
                    :style="{ animationDelay: `${index * 100}ms` }"
                />
            </div>
        </div>
        
        <div class="mt-8 text-center md:hidden">
            <router-link to="/products" class="text-sm border-b border-gl-black pb-1">View All Products</router-link>
        </div>
      </div>
    </section>

    <!-- BRAND STORY / EXTRA SECTION (Placeholder for more homepage content) -->
    <section class="py-24 bg-gl-gray/30">
        <div class="container mx-auto px-4 text-center max-w-3xl">
            <span class="text-xs font-bold tracking-widest uppercase text-gl-dark-gray mb-4 block">Our Philosophy</span>
            <h2 class="font-serif text-3xl md:text-5xl mb-6">"Luxury is in each detail."</h2>
            <p class="text-gl-dark-gray leading-relaxed mb-8">
                Created for the modern connoisseur, MARKO redefines the shopping experience with a focus on quality, aesthetics, and fluidity.
            </p>
            <router-link to="/about">
              <BaseButton variant="outline">Read Our Story</BaseButton>
            </router-link>
        </div>
    </section>

  </div>
</template>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>
