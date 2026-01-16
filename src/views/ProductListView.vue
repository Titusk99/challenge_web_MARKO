<script setup>
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router' // Import useRoute
import { useProductStore } from '@/stores/product'
import ProductCard from '@/components/ui/ProductCard.vue'
import FilterSidebar from '@/components/ui/FilterSidebar.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { Filter } from 'lucide-vue-next'

const route = useRoute()
const productStore = useProductStore()
const { filteredProducts, isLoading, activeFilters } = storeToRefs(productStore)
const isFilterOpen = ref(false)

const loadProducts = () => {
    const categoryQuery = route.query.category
    const genderQuery = route.query.gender
    
    // Clear filters first
    productStore.clearFilters()

    // Handle Route Params (Footer Links)
    if (route.name === 'category-root') {
        const id = route.params.id
        if (['women', 'men'].includes(id)) {
            productStore.setFilter('gender', id)
        } else {
            productStore.setFilter('category', [id])
        }
    } else if (route.name === 'sales') {
        // Implement sales logic if needed, for now just load all or specific category
    } else if (route.name === 'new-arrivals') {
        // Implement new arrivals logic
    }

    // Handle Query Params (Sidebar Filters)
    if (categoryQuery) {
        productStore.setFilter('category', [categoryQuery])
    }
    
    if (genderQuery) {
        productStore.setFilter('gender', genderQuery)
    }

    productStore.fetchProducts()
}

onMounted(() => {
    loadProducts()
})

// Watch for any query or param change
watch(() => [route.query, route.params], () => {
    loadProducts()
}, { deep: true })
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Header Spacing for Fixed Navbar -->
    <div class="h-24"></div>

    <div class="container mx-auto px-4 sm:px-8 py-8">
        
        <!-- Header & Toolbar -->
        <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 animate-fade-in">
            <div>
                <h1 class="font-serif text-3xl md:text-4xl text-gl-black mb-2">All Products</h1>
                <p class="text-sm text-gray-500">{{ filteredProducts.length }} items detected</p>
            </div>
            
            <div class="flex items-center gap-4">
                <button 
                    @click="isFilterOpen = true"
                    class="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full hover:bg-black hover:text-white transition-all duration-300"
                >
                    <Filter class="w-4 h-4" />
                    <span class="text-sm font-medium">Filters</span>
                    <span v-if="activeFilters.category.length > 0" class="ml-1 bg-gl-red text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                        {{ activeFilters.category.length }}
                    </span>
                </button>
            </div>
        </div>

        <!-- Product Grid -->
        <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           <div v-for="i in 8" :key="i" class="animate-pulse">
               <div class="bg-gray-100 aspect-[3/4] mb-4"></div>
               <div class="bg-gray-100 h-4 w-3/4 mb-2"></div>
               <div class="bg-gray-100 h-4 w-1/4"></div>
           </div>
        </div>

        <div v-else-if="filteredProducts.length === 0" class="text-center py-24">
            <h3 class="text-xl font-serif mb-4">No products found</h3>
            <p class="text-gray-500 mb-6">Try slightly adjusting your search filters.</p>
            <BaseButton variant="outline" @click="productStore.clearFilters()">Clear All Filters</BaseButton>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            <ProductCard 
                v-for="(product, index) in filteredProducts" 
                :key="product.id" 
                :product="product"
                class="w-full animate-slide-up"
                :style="{ animationDelay: `${index * 50}ms` }"
            />
        </div>
    </div>

    <FilterSidebar 
        :isOpen="isFilterOpen" 
        @close="isFilterOpen = false" 
    />
  </div>
</template>
