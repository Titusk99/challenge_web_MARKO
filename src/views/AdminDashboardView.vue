<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter, useRoute } from 'vue-router'
import { Pencil, Trash2, Package } from 'lucide-vue-next'
import { API_URL } from '@/config'


const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

onMounted(async () => {
    if (!authStore.isAuthenticated || authStore.user?.role !== 'admin') {
        router.push('/login')
        return
    }
})

// Stock Management
const isStockModalOpen = ref(false)
const selectedProductForStock = ref(null)

const openStockModal = (product) => {
    selectedProductForStock.value = product
    isStockModalOpen.value = true
}

const closeStockModal = () => {
    isStockModalOpen.value = false
    selectedProductForStock.value = null
}

const updateStock = async (variant) => {
    try {
        const response = await fetch(`${API_URL}/admin/variants/${variant.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authStore.token}`
            },
            body: JSON.stringify({ stock_quantity: variant.stock_quantity })
        })

        if (!response.ok) {
            alert('Failed to update stock')
        }
    } catch (error) {
        console.error('Error updating stock:', error)
    }
}
</script>

<template>
    <div class="min-h-screen pl-64 bg-gray-50">
        <!-- Sidebar -->
        <div class="fixed inset-y-0 left-0 w-64 bg-gl-black text-white p-6">
            <div class="font-serif text-2xl mb-12">MARKO Admin</div>
            <nav class="space-y-4">
                <router-link 
                    to="/admin/products" 
                    class="block transition-colors"
                    :class="route.path.includes('/products') || route.path === '/admin' ? 'text-gl-red font-bold' : 'text-gray-400 hover:text-white'"
                >
                    Products
                </router-link>
                <router-link 
                    to="/admin/orders" 
                    class="block transition-colors"
                    :class="route.path.includes('/orders') ? 'text-gl-red font-bold' : 'text-gray-400 hover:text-white'"
                >
                    Orders
                </router-link>
                <router-link 
                    to="/admin/customers" 
                    class="block transition-colors"
                    :class="route.path.includes('/customers') ? 'text-gl-red font-bold' : 'text-gray-400 hover:text-white'"
                >
                    Customers
                </router-link>
                <router-link 
                    to="/admin/settings" 
                    class="block transition-colors"
                    :class="route.path.includes('/settings') ? 'text-gl-red font-bold' : 'text-gray-400 hover:text-white'"
                >
                    Settings
                </router-link>
            </nav>
            <div class="absolute bottom-6 left-6">
                 <router-link to="/" class="text-xs uppercase tracking-widest text-gray-500 hover:text-white">Back to Site</router-link>
            </div>
        </div>

        <!-- Main Content -->
        <div class="p-12">
            <router-view></router-view>
        </div>
        <!-- Stock Modal -->
        <div v-if="isStockModalOpen && selectedProductForStock" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gl-black-glass backdrop-blur-sm">
            <div class="bg-white w-full max-w-md p-8 shadow-2xl animate-fade-in relative">
                <button @click="closeStockModal" class="absolute top-4 right-4 text-gray-400 hover:text-black">✕</button>
                <h2 class="font-serif text-2xl mb-2">Stock Management</h2>
                <p class="text-sm text-gray-500 mb-6">Manage stock for {{ selectedProductForStock.name }}</p>
                
                <div class="space-y-4">
                    <div v-for="variant in selectedProductForStock.variants" :key="variant.id" class="flex items-center justify-between border-b border-gray-100 pb-3">
                        <span class="font-medium w-16 text-center bg-gray-100 py-1 rounded">{{ variant.size }}</span>
                        <div class="flex items-center gap-4">
                            <label class="text-xs uppercase text-gray-500">Qty:</label>
                            <input 
                                type="number" 
                                v-model.number="variant.stock_quantity" 
                                class="w-20 border border-gray-300 px-2 py-1 text-center focus:border-gl-black outline-none transition-colors"
                            />
                            <button 
                                @click="updateStock(variant)" 
                                class="text-xs bg-gl-black text-white px-3 py-1 hover:bg-gl-red transition-colors uppercase tracking-wider"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                    <div v-if="!selectedProductForStock.variants || selectedProductForStock.variants.length === 0" class="text-center text-gray-500 py-4">
                        No variants found for this product.
                    </div>
                </div>

                <div class="pt-6 flex justify-end">
                    <button @click="closeStockModal" class="bg-gray-100 text-black px-6 py-2 text-sm uppercase tracking-widest hover:bg-gray-200 transition-colors">
                        Done
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
