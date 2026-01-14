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

    // --- Mock Data ---
    const mockTrending = [
        {
            id: 1,
            name: 'Le Classique Silk Scarf',
            price: 250.00,
            image: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&q=80&w=900',
            category: 'Accessories',
            color: 'Multi'
        },
        {
            id: 2,
            name: 'Midnight Velvet Blazer',
            price: 590.00,
            image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=900',
            category: 'Women',
            color: 'Black'
        },
        {
            id: 3,
            name: 'Signature Leather Tote',
            price: 890.00,
            image: 'https://images.unsplash.com/photo-1590874102752-e6335372d601?auto=format&fit=crop&q=80&w=900',
            category: 'Bags',
            color: 'Brown'
        },
        {
            id: 4,
            name: 'Cashmere Turtleneck',
            price: 320.00,
            image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=900',
            category: 'Men',
            color: 'Beige'
        }
    ]

    const mockProducts = [
        ...mockTrending,
        {
            id: 5,
            name: 'Italian Leather Loafers',
            price: 450.00,
            image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=900',
            category: 'Shoes',
            color: 'Black'
        },
        {
            id: 6,
            name: 'Structured Wool Coat',
            price: 1200.00,
            image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=900',
            category: 'Men',
            color: 'Grey'
        },
        {
            id: 7,
            name: 'Silk Evening Gown',
            price: 1500.00,
            image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=900',
            category: 'Women',
            color: 'Red'
        },
        {
            id: 8,
            name: 'Minimalist Gold Cuff',
            price: 180.00,
            image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=900',
            category: 'Accessories',
            color: 'Gold'
        },
        {
            id: 9,
            name: 'Pleated Midi Skirt',
            price: 340.00,
            image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=900',
            category: 'Women',
            color: 'White'
        },
        {
            id: 10,
            name: 'Oxford Cotton Shirt',
            price: 180.00,
            image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=900',
            category: 'Men',
            color: 'Blue'
        }
    ]

    // --- Actions ---
    const fetchTrendingProducts = async () => {
        isLoading.value = true
        try {
            await new Promise(resolve => setTimeout(resolve, 800))
            trendingProducts.value = mockTrending
        } catch (e) {
            error.value = e
            trendingProducts.value = mockTrending
        } finally {
            isLoading.value = false
        }
    }

    const fetchProducts = async () => {
        isLoading.value = true
        try {
            await new Promise(resolve => setTimeout(resolve, 600))
            products.value = mockProducts
        } catch (e) {
            error.value = e
            products.value = mockProducts
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
            // Color Filter
            if (activeFilters.value.colors.length > 0 && !activeFilters.value.colors.includes(product.color)) {
                return false
            }
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
        filteredProducts,
        isLoading,
        error,
        activeFilters,
        fetchTrendingProducts,
        fetchProducts,
        setFilter,
        clearFilters
    }
})
