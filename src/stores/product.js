import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductStore = defineStore('product', () => {
    // --- State ---
    const trendingProducts = ref([])
    const products = ref([])
    const isLoading = ref(false)
    const error = ref(null)

    const activeFilters = ref({
        category: [],
        minPrice: 0,
        maxPrice: 2000,
        colors: []
    })

    const currentProduct = ref(null)

    // --- Actions ---
    const fetchTrendingProducts = async () => {
        // For now, trending is just the first 4 products
        isLoading.value = true
        try {
            const response = await fetch('http://localhost:8000/products')
            if (!response.ok) throw new Error('Failed to fetch products')
            const data = await response.json()

            // Map backend fields to frontend expected fields
            trendingProducts.value = data.slice(0, 4).map(p => ({
                ...p,
                image: p.image_url, // Map image_url to image
                color: 'Multi' // Default mock color as DB doesn't have it yet
            }))
        } catch (e) {
            error.value = e
            console.error(e)
        } finally {
            isLoading.value = false
        }
    }

    const fetchProducts = async (filters = {}) => {
        isLoading.value = true
        try {
            let url = 'http://localhost:8000/products'
            const params = new URLSearchParams()

            if (filters.category) {
                params.append('category', filters.category)
            }

            const queryString = params.toString()
            if (queryString) {
                url += `?${queryString}`
            }

            const response = await fetch(url)
            if (!response.ok) throw new Error('Failed to fetch products')
            const data = await response.json()

            products.value = data.map(p => ({
                ...p,
                image: p.image_url,
                color: 'Black' // Default mock color
            }))
        } catch (e) {
            error.value = e
            console.error(e)
        } finally {
            isLoading.value = false
        }
    }

    const fetchProductById = async (id) => {
        isLoading.value = true
        currentProduct.value = null
        try {
            const response = await fetch(`http://localhost:8000/products/${id}`)
            if (!response.ok) throw new Error('Product not found')
            const data = await response.json()

            currentProduct.value = {
                ...data,
                image: data.image_url,
                color: 'Black'
            }
        } catch (e) {
            error.value = e
            console.error(e)
        } finally {
            isLoading.value = false
        }
    }

    // --- Getters ---
    const filteredProducts = computed(() => {
        return products.value.filter(product => {
            // Category Filter
            if (activeFilters.value.category.length > 0 && !activeFilters.value.category.includes(product.category)) {
                return false
            }
            // Price Filter
            if (product.price < activeFilters.value.minPrice || product.price > activeFilters.value.maxPrice) {
                return false
            }
            // Color Filter - skipping for now as DB data is sparse
            return true
        })
    })

    const setFilter = (key, value) => {
        activeFilters.value[key] = value
    }

    const clearFilters = () => {
        activeFilters.value = {
            category: [],
            minPrice: 0,
            maxPrice: 2000,
            colors: []
        }
    }

    return {
        trendingProducts,
        products,
        currentProduct,
        filteredProducts,
        isLoading,
        error,
        activeFilters,
        fetchTrendingProducts,
        fetchProducts,
        fetchProductById,
        setFilter,
        clearFilters
    }
})
