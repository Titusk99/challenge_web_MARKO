<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter, useRoute } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

onMounted(async () => {
    if (!authStore.isAuthenticated || authStore.user?.role !== 'admin') {
        router.push('/login')
        return
    }
})
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
    </div>
</template>
