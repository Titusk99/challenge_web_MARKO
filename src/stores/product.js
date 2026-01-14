import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('product', () => {
    const trendingProducts = ref([])
    const isLoading = ref(false)
    const error = ref(null)

    // Mock data for development when API is not reachable
    const mockTrending = [
        {
            id: 1,
            name: 'Le Classique Silk Scarf',
            price: 250.00,
            image: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&q=80&w=900',
            category: 'Accessories'
        },
        {
            id: 2,
            name: 'Midnight Velvet Blazer',
            price: 590.00,
            image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=900',
            category: 'Women'
        },
        {
            id: 3,
            name: 'Signature Leather Tote',
            price: 890.00,
            image: 'https://images.unsplash.com/photo-1590874102752-e6335372d601?auto=format&fit=crop&q=80&w=900',
            category: 'Bags'
        },
        {
            id: 4,
            name: 'Cashmere Turtleneck',
            price: 320.00,
            image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=900',
            category: 'Men'
        }
    ]

    const fetchTrendingProducts = async () => {
        isLoading.value = true
        error.value = null
        try {
            // Simulate API call
            // const { data } = await useFetch('http://localhost:8000/api/v1/products/trending').json()
            // trendingProducts.value = data.value

            // Using mock data for now
            await new Promise(resolve => setTimeout(resolve, 800)) // Artificial delay for realism
            trendingProducts.value = mockTrending
        } catch (e) {
            console.error('Failed to fetch trending products', e)
            error.value = e
            // Fallback to mock on error
            trendingProducts.value = mockTrending
        } finally {
            isLoading.value = false
        }
    }

    return {
        trendingProducts,
        isLoading,
        error,
        fetchTrendingProducts
    }
})
