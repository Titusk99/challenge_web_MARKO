<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const orders = ref([])
const loading = ref(true)

const fetchOrders = async () => {
    loading.value = true
    try {
        const response = await fetch('http://localhost:8000/users/me/orders', {
            headers: {
                'Authorization': `Bearer ${authStore.token}`
            }
        })
        if (response.ok) {
            orders.value = await response.json()
        } else {
            console.error('Failed to fetch orders')
        }
    } catch (error) {
        console.error('Error fetching orders:', error)
    } finally {
        loading.value = false
    }
}

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price)
}

const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
        case 'pending': return 'bg-gl-red text-white'
        case 'paid': return 'bg-green-600 text-white'
        case 'shipped': return 'bg-blue-600 text-white'
        case 'cancelled': return 'bg-gray-400 text-white'
        default: return 'bg-gl-dark-gray text-white'
    }
}

onMounted(() => {
    if (!authStore.isAuthenticated) {
        router.push('/login')
        return
    }
    fetchOrders()
})

const logout = () => {
    authStore.logout()
}
</script>

<template>
    <div class="min-h-screen pt-24 pb-12 bg-white">
        <div class="container mx-auto px-4 max-w-5xl">
            <!-- Header -->
            <div class="flex justify-between items-end mb-12 animate-fade-in">
                <div>
                    <h1 class="font-serif text-4xl mb-2">My Account</h1>
                    <p class="text-gl-dark-gray">Welcome back, {{ authStore.user?.full_name || authStore.user?.email }}</p>
                </div>
                <button 
                    @click="logout"
                    class="text-sm uppercase tracking-widest border-b border-black pb-1 hover:text-gl-red hover:border-gl-red transition-colors duration-300"
                >
                    Sign Out
                </button>
            </div>

            <!-- Dashboard Content -->
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
                <!-- Sidebar Navigation (Tabs) -->
                <div class="lg:col-span-1 space-y-4 animate-slide-up" style="animation-delay: 0.1s;">
                    <div class="font-serif text-xl mb-6">Dashboard</div>
                    <nav class="space-y-2">
                        <a href="#" class="block text-gl-red font-medium pl-2 border-l-2 border-gl-red">Orders</a>
                        <a href="#" class="block text-gray-500 hover:text-black pl-2 border-l-2 border-transparent transition-colors">Addresses</a>
                        <a href="#" class="block text-gray-500 hover:text-black pl-2 border-l-2 border-transparent transition-colors">Account Details</a>
                    </nav>
                </div>

                <!-- Main Content (Orders) -->
                <div class="lg:col-span-3 animate-slide-up" style="animation-delay: 0.2s;">
                    <h2 class="font-serif text-2xl mb-8">Order History</h2>

                    <div v-if="loading" class="text-center py-12 text-gray-400">
                        Loading orders...
                    </div>

                    <div v-else-if="orders.length === 0" class="text-center py-12 bg-gl-gray rounded-sm">
                        <p class="mb-4 text-gl-dark-gray">You haven't placed any orders yet.</p>
                        <router-link to="/products" class="inline-block bg-gl-black text-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-gl-red transition-colors duration-300">
                            Start Shopping
                        </router-link>
                    </div>

                    <div v-else class="space-y-6">
                        <div v-for="order in orders" :key="order.id" class="border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300 group">
                            <div class="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                                <div>
                                    <div class="text-xs text-gray-400 uppercase tracking-wider mb-1">Order #{{ order.id }}</div>
                                    <div class="font-sans font-medium">{{ formatDate(order.created_at) }}</div>
                                </div>
                                <div class="text-right">
                                    <span :class="['px-3 py-1 text-xs uppercase tracking-wider rounded-full', getStatusColor(order.status)]">
                                        {{ order.status }}
                                    </span>
                                    <div class="mt-2 text-lg font-serif">{{ formatPrice(order.total_amount) }}</div>
                                </div>
                            </div>

                            <div class="space-y-4">
                                <div v-for="item in order.items" :key="item.id" class="flex items-center gap-4">
                                    <div class="w-16 h-20 bg-gray-100 overflow-hidden">
                                        <img 
                                            v-if="item.product && item.product.image_url" 
                                            :src="item.product.image_url" 
                                            :alt="item.product.name" 
                                            class="w-full h-full object-cover"
                                        />
                                        <div v-else class="w-full h-full flex items-center justify-center text-gray-300 text-xs">No Img</div>
                                    </div>
                                    <div class="flex-1">
                                        <div class="font-medium">{{ item.product ? item.product.name : 'Unknown Product' }}</div>
                                        <div class="text-sm text-gray-500">Size: {{ item.size }} | Qty: {{ item.quantity }}</div>
                                    </div>
                                    <div class="text-sm">{{ formatPrice(item.unit_price) }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
