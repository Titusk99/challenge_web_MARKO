<script setup>
import { onMounted, ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import { Trash2, ShoppingBag } from 'lucide-vue-next'

const authStore = useAuthStore()
const router = useRouter()

const cart = ref(null)
const loading = ref(true)

const fetchCart = async () => {
    loading.value = true
    try {
        const response = await fetch('http://localhost:8000/cart', {
            headers: { 'Authorization': `Bearer ${authStore.token}` }
        })
        if (response.ok) {
            cart.value = await response.json()
        } else {
             // If 404 or other, cart might be empty/null, handle gracefully
             cart.value = null
        }
    } catch (error) {
        console.error('Error fetching cart:', error)
    } finally {
        loading.value = false
    }
}

const removeFromCart = async (itemId) => {
    if (!confirm('Remove this item?')) return
    try {
        const response = await fetch(`http://localhost:8000/cart/items/${itemId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${authStore.token}` }
        })
        if (response.ok) {
            // Update cart locally
            cart.value = await response.json()
        }
    } catch (error) {
        console.error('Error removing item:', error)
    }
}

const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
}

const cartItems = computed(() => cart.value?.items || [])
const cartTotal = computed(() => cart.value?.total_amount || 0)

onMounted(() => {
    if (!authStore.isAuthenticated) {
        router.push('/login')
        return
    }
    fetchCart()
})
</script>

<template>
    <div class="min-h-screen pt-24 pb-12 bg-white">
        <div class="container mx-auto px-4 max-w-6xl">
            <h1 class="font-serif text-4xl mb-8 flex items-center gap-4">
                <ShoppingBag class="w-10 h-10" /> Shopping Cart
            </h1>

            <div v-if="loading" class="text-center py-12 text-gray-400">Loading cart...</div>
            <div v-else-if="!cart || cartItems.length === 0" class="text-center py-24 bg-gray-50 rounded-sm">
                <p class="text-xl text-gray-500 mb-6">Your shopping bag is empty.</p>
                <router-link to="/products">
                    <BaseButton>Start Shopping</BaseButton>
                </router-link>
            </div>

            <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <!-- Cart Items -->
                <div class="lg:col-span-2 space-y-6">
                    <div v-for="item in cartItems" :key="item.id" class="flex gap-6 p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                        <div class="w-24 h-32 bg-gray-100 flex-shrink-0">
                             <img v-if="item.product_image" :src="item.product_image" class="w-full h-full object-cover">
                             <div v-else class="w-full h-full flex items-center justify-center text-gray-300 bg-gray-200">IMG</div>
                        </div>
                        <div class="flex-1">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h3 class="font-serif text-lg font-medium mb-1">{{ item.product_name }}</h3>
                                    <p class="text-sm text-gray-500">Variant ID: {{ item.product_variant_id }} | Qty: {{ item.quantity }}</p>
                                </div>
                                <button @click="removeFromCart(item.id)" class="text-gray-400 hover:text-red-600 transition-colors">
                                    <Trash2 class="w-5 h-5" />
                                </button>
                            </div>
                            <div class="mt-4 font-medium">{{ formatPrice(item.unit_price) }}</div>
                        </div>
                    </div>
                </div>

                <!-- Summary -->
                <div class="lg:col-span-1">
                    <div class="bg-gray-50 p-8 rounded-sm sticky top-28">
                        <h2 class="font-serif text-2xl mb-6">Summary</h2>
                        <div class="space-y-4 mb-8 border-b border-gray-200 pb-8">
                            <div class="flex justify-between">
                                <span class="text-gray-600">Subtotal</span>
                                <span>{{ formatPrice(cartTotal) }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Shipping</span>
                                <span>Calculated at checkout</span>
                            </div>
                        </div>
                        <div class="flex justify-between text-lg font-bold mb-8">
                            <span>Total</span>
                            <span>{{ formatPrice(cartTotal) }}</span>
                        </div>
                        <BaseButton class="w-full">Proceed to Checkout</BaseButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
