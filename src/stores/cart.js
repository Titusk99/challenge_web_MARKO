import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useToastStore } from './toast'
import { useAuthStore } from './auth'

export const useCartStore = defineStore('cart', () => {
    const items = ref([]) // This should mirror backend OrderItems
    const cartId = ref(null)
    const isCartOpen = ref(false)
    const toastStore = useToastStore()
    const { token } = useAuthStore() // Access token for API

    // Helper to get headers
    const getHeaders = () => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    })

    const fetchCart = async () => {
        if (!localStorage.getItem('token')) return
        try {
            const response = await fetch('http://localhost:8001/cart', {
                headers: getHeaders()
            })
            if (response.ok) {
                const data = await response.json()
                items.value = data.items
                cartId.value = data.id
            }
        } catch (e) {
            console.error('Failed to fetch cart', e)
        }
    }

    const addToCart = async (product, size, quantity = 1) => {
        // Find variant ID matching size
        const variant = product.variants?.find(v => v.size === size)

        if (!variant) {
            toastStore.addToast('Error: Size variant not found for this product.', 'error')
            return
        }

        try {
            const response = await fetch('http://localhost:8001/cart/items', {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({
                    product_variant_id: variant.id,
                    quantity: quantity
                })
            })

            if (response.ok) {
                await fetchCart() // Refresh cart
                isCartOpen.value = true
                toastStore.addToast('Product added to cart', 'success')
            } else {
                const err = await response.json()
                toastStore.addToast(err.detail || 'Failed to add to cart', 'error')
            }
        } catch (e) {
            toastStore.addToast('Network error adding to cart', 'error')
        }
    }

    const removeFromCart = async (itemId) => {
        try {
            const response = await fetch(`http://localhost:8001/cart/items/${itemId}`, {
                method: 'DELETE',
                headers: getHeaders()
            })
            if (response.ok) {
                await fetchCart()
            }
        } catch (e) {
            console.error(e)
        }
    }

    // Initial fetch if logged in
    // We could call this from main.js or App.vue or just when store inits if token exists
    if (localStorage.getItem('token')) {
        fetchCart()
    }

    const toggleCart = () => {
        isCartOpen.value = !isCartOpen.value
        if (isCartOpen.value) fetchCart()
    }

    const cartTotal = computed(() => {
        // Backend calculates total usually, but we can sum here for UI responsiveness if needed
        // Or better, use the total from the order object if we stored it
        // For now, simple sum of items
        return items.value.reduce((total, item) => total + (item.unit_price * item.quantity), 0)
    })

    const cartCount = computed(() => {
        return items.value.reduce((count, item) => count + item.quantity, 0)
    })

    return {
        items,
        isCartOpen,
        addToCart,
        removeFromCart,
        toggleCart,
        cartTotal,
        cartCount,
        fetchCart
    }
})
