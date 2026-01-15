import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useToastStore } from './toast'

export const useCartStore = defineStore('cart', () => {
    const items = ref([])
    const isCartOpen = ref(false)
    const toastStore = useToastStore()

    const addToCart = (product, size, quantity = 1) => {
        const existingItem = items.value.find(item => item.id === product.id && item.size === size)

        if (existingItem) {
            existingItem.quantity += quantity
        } else {
            items.value.push({
                ...product,
                size,
                quantity
            })
        }

        isCartOpen.value = true
        toastStore.addToast('Product added to cart', 'success')
    }

    const removeFromCart = (itemId, size) => {
        const index = items.value.findIndex(item => item.id === itemId && item.size === size)
        if (index !== -1) {
            items.value.splice(index, 1)
        }
    }

    const updateQuantity = (itemId, size, quantity) => {
        const item = items.value.find(item => item.id === itemId && item.size === size)
        if (item) {
            item.quantity = quantity
            if (item.quantity <= 0) {
                removeFromCart(itemId, size)
            }
        }
    }

    const toggleCart = () => {
        isCartOpen.value = !isCartOpen.value
    }

    const cartTotal = computed(() => {
        return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
    })

    const cartCount = computed(() => {
        return items.value.reduce((count, item) => count + item.quantity, 0)
    })

    return {
        items,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleCart,
        cartTotal,
        cartCount
    }
})
