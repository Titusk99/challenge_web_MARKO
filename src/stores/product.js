import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { API_URL } from '@/config'

export const useProductStore = defineStore('product', () => {
    // --- State ---
    const trendingProducts = ref([])
    const products = ref([])
    const isLoading = ref(false)
    const error = ref(null)

    const activeFilters = ref({
        category: [],
        brand: [],
        colors: [],
        gender: null,
        minPrice: 0,
        maxPrice: 2000,
        searchQuery: ''
    })

    const currentProduct = ref(null)

    // --- Actions ---
    const fetchTrendingProducts = async () => {
        isLoading.value = true
        try {
            const response = await fetch(`${API_URL}/products`)
            if (!response.ok) throw new Error('Failed to fetch products')
            const data = await response.json()

            trendingProducts.value = data.slice(0, 4).map(p => ({
                ...p,
                image: p.image_url
            }))
        } catch (e) {
            error.value = e
            console.error(e)
        } finally {
            isLoading.value = false
        }
    }

    // Updated fetchProducts to use activeFilters and backend filtering
    const fetchProducts = async (overrides = {}) => {
        isLoading.value = true
        try {
            let url = `${API_URL}/products`
            const params = new URLSearchParams()

            const cats = overrides.category || activeFilters.value.category
            const brands = overrides.brand || activeFilters.value.brand
            const colors = overrides.colors || activeFilters.value.colors
            const gender = overrides.gender || activeFilters.value.gender
            const q = overrides.searchQuery || activeFilters.value.searchQuery

            if (cats && cats.length) {
                if (Array.isArray(cats)) cats.forEach(c => params.append('category', c))
                else params.append('category', cats)
            }

            if (brands && brands.length) {
                brands.forEach(b => params.append('brand', b))
            }

            if (colors && colors.length) {
                colors.forEach(c => params.append('color', c))
            }

            if (gender) {
                params.append('gender', gender)
            }

            if (q) {
                params.append('q', q)
            }

            // Price
            if (activeFilters.value.minPrice > 0) params.append('min_price', activeFilters.value.minPrice)
            if (activeFilters.value.maxPrice < 2000) params.append('max_price', activeFilters.value.maxPrice)

            const queryString = params.toString()
            if (queryString) {
                url += `?${queryString}`
            }

            const response = await fetch(url)
            if (!response.ok) throw new Error('Failed to fetch products')
            const data = await response.json()

            products.value = data.map(p => ({
                ...p,
                image: p.image_url
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
            const response = await fetch(`${API_URL}/products/${id}`)
            if (!response.ok) throw new Error('Product not found')
            const data = await response.json()

            currentProduct.value = {
                ...data,
                image: data.image_url
            }
        } catch (e) {
            error.value = e
            console.error(e)
        } finally {
            isLoading.value = false
        }
    }

    // --- Getters ---
    // Since backend does filtering now, we just return products
    const filteredProducts = computed(() => products.value)

    const setFilter = (key, value) => {
        activeFilters.value[key] = value
        // Auto-fetch when filters change? Or let UI trigger it?
        // UI often calls `apply`. But reactive `watch` in view might call fetch.
        // Let's leave trigger to the View -> Watcher.
    }

    const clearFilters = (shouldFetch = true) => {
        activeFilters.value = {
            category: [],
            brand: [],
            colors: [],
            gender: null,
            minPrice: 0,
            maxPrice: 2000,
            searchQuery: ''
        }
        if (shouldFetch) fetchProducts()
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
