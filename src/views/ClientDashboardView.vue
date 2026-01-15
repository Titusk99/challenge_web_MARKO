<script setup>
import { onMounted, ref, reactive } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import { Trash2, Plus, MapPin, User, Package } from 'lucide-vue-next'

const authStore = useAuthStore()
const router = useRouter()
const orders = ref([])
const addresses = ref([])
const loading = ref(true)
const activeTab = ref('orders') // 'orders', 'addresses', 'details'

// Forms
const showAddAddress = ref(false)
const newAddress = reactive({
    name: '',
    street: '',
    city: '',
    zip_code: '',
    country: ''
})

const userForm = reactive({
    full_name: '',
    email: '',
    password: '', 
    confirmPassword: ''
})

const showConfirmModal = ref(false)

// --- Messages ---
const message = ref({ text: '', type: '' }) // type: 'success' | 'error'

const showMessage = (text, type = 'success') => {
    message.value = { text, type }
    setTimeout(() => message.value = { text: '', type: '' }, 3000)
}

// ... existing fetch functions ...
const fetchOrders = async () => {
    // ... (keep existing)
    try {
        const response = await fetch('http://localhost:8000/users/me/orders', {
            headers: { 'Authorization': `Bearer ${authStore.token}` }
        })
        if (response.ok) orders.value = await response.json()
    } catch (error) {
        console.error('Error fetching orders:', error)
    }
}
const fetchAddresses = async () => {
     // ... (keep existing)
    try {
        const response = await fetch('http://localhost:8000/users/me/addresses', {
            headers: { 'Authorization': `Bearer ${authStore.token}` }
        })
        if (response.ok) addresses.value = await response.json()
    } catch (error) {
        console.error('Error fetching addresses:', error)
    }
}

// --- Actions ---
// ... createAddress, deleteAddress ... (keep existing)

const attemptUpdateUser = () => {
    // Validation
    if (userForm.password && userForm.password !== userForm.confirmPassword) {
        showMessage('Passwords do not match', 'error')
        return
    }
    showConfirmModal.value = true
}

const executeUpdateUser = async () => {
    showConfirmModal.value = false
    try {
        const payload = {
            full_name: userForm.full_name,
            email: userForm.email
        }
        if (userForm.password) payload.password = userForm.password

        const response = await fetch('http://localhost:8000/users/me', {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authStore.token}` 
            },
            body: JSON.stringify(payload)
        })
        
        if (response.ok) {
            const updatedUser = await response.json()
            authStore.user = updatedUser 
            showMessage('Profile updated successfully')
            userForm.password = ''
            userForm.confirmPassword = ''
        } else {
            const err = await response.json()
            showMessage(err.detail || 'Update failed', 'error')
        }
    } catch (e) {
        showMessage('Error updating profile', 'error')
    }
}

// --- Utils ---
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    })
}
const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
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

const logout = () => {
    authStore.logout()
    router.push('/')
}

onMounted(async () => {
    if (!authStore.isAuthenticated) {
        router.push('/login')
        return
    }
    // Init User Form
    if (authStore.user) {
        userForm.full_name = authStore.user.full_name || ''
        userForm.email = authStore.user.email || ''
    }

    loading.value = true
    await Promise.all([fetchOrders(), fetchAddresses()])
    loading.value = false
})
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

            <!-- Message Notification -->
            <div v-if="message.text" :class="`mb-6 p-4 rounded text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`">
                {{ message.text }}
            </div>

            <!-- Dashboard Content -->
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
                <!-- Sidebar Navigation (Tabs) -->
                <div class="lg:col-span-1 space-y-4 animate-slide-up" style="animation-delay: 0.1s;">
                    <div class="font-serif text-xl mb-6">Dashboard</div>
                    <nav class="space-y-2">
                        <button 
                            @click="activeTab = 'orders'"
                            :class="['block w-full text-left pl-2 border-l-2 transition-colors duration-300', activeTab === 'orders' ? 'text-gl-red border-gl-red font-medium' : 'text-gray-500 border-transparent hover:text-black']"
                        >
                            <div class="flex items-center gap-2">
                                <Package class="w-4 h-4" /> Orders
                            </div>
                        </button>
                        <button 
                            @click="activeTab = 'addresses'"
                            :class="['block w-full text-left pl-2 border-l-2 transition-colors duration-300', activeTab === 'addresses' ? 'text-gl-red border-gl-red font-medium' : 'text-gray-500 border-transparent hover:text-black']"
                        >
                            <div class="flex items-center gap-2">
                                <MapPin class="w-4 h-4" /> Addresses
                            </div>
                        </button>
                        <button 
                            @click="activeTab = 'details'"
                            :class="['block w-full text-left pl-2 border-l-2 transition-colors duration-300', activeTab === 'details' ? 'text-gl-red border-gl-red font-medium' : 'text-gray-500 border-transparent hover:text-black']"
                        >
                             <div class="flex items-center gap-2">
                                <User class="w-4 h-4" /> Account Details
                            </div>
                        </button>
                    </nav>
                </div>

                <!-- Main Content Area -->
                <div class="lg:col-span-3 min-h-[400px]">
                    
                    <!-- ORDERS TAB -->
                    <div v-if="activeTab === 'orders'" class="animate-fade-in">
                        <h2 class="font-serif text-2xl mb-8">Order History</h2>
                        <div v-if="loading" class="text-center py-12 text-gray-400">Loading...</div>
                        <div v-else-if="orders.length === 0" class="text-center py-12 bg-gl-gray rounded-sm">
                            <p class="mb-4 text-gl-dark-gray">No orders yet.</p>
                            <router-link to="/products" class="text-gl-red underline">Start Shopping</router-link>
                        </div>
                        <div v-else class="space-y-6">
                            <div v-for="order in orders" :key="order.id" class="border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
                                <!-- Existing Order Card Markup -->
                                <div class="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                                    <div>
                                        <div class="text-xs text-gray-400 uppercase tracking-wider mb-1">Order #{{ order.id }}</div>
                                        <div class="font-sans font-medium">{{ formatDate(order.created_at) }}</div>
                                    </div>
                                    <div class="text-right">
                                        <span :class="['px-3 py-1 text-xs uppercase tracking-wider rounded-full', getStatusColor(order.status)]">{{ order.status }}</span>
                                        <div class="mt-2 text-lg font-serif">{{ formatPrice(order.total_amount) }}</div>
                                    </div>
                                </div>
                                <div class="space-y-4">
                                    <div v-for="item in order.items" :key="item.id" class="flex items-center gap-4">
                                        <div class="w-16 h-20 bg-gray-100 overflow-hidden">
                                             <img v-if="item.product?.image_url" :src="item.product.image_url" class="w-full h-full object-cover">
                                        </div>
                                        <div class="flex-1">
                                            <div class="font-medium">{{ item.product?.name }}</div>
                                            <div class="text-sm text-gray-500">Qty: {{ item.quantity }}</div>
                                        </div>
                                        <div class="text-sm">{{ formatPrice(item.unit_price) }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ADDRESSES TAB -->
                    <div v-else-if="activeTab === 'addresses'" class="animate-fade-in">
                        <div class="flex justify-between items-center mb-8">
                            <h2 class="font-serif text-2xl">My Addresses</h2>
                            <BaseButton v-if="!showAddAddress" @click="showAddAddress = true" size="sm">
                                <Plus class="w-4 h-4 mr-1" /> Add New
                            </BaseButton>
                        </div>

                        <!-- Add Address Form -->
                        <div v-if="showAddAddress" class="bg-gray-50 p-6 rounded-sm mb-8 border border-gray-200">
                            <h3 class="font-medium mb-4">New Address</h3>
                            <form @submit.prevent="createAddress" class="space-y-4">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input v-model="newAddress.name" placeholder="Address Name (e.g. Home)" class="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-gl-black outline-none" required />
                                    <input v-model="newAddress.country" placeholder="Country" class="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-gl-black outline-none" required />
                                </div>
                                <input v-model="newAddress.street" placeholder="Street Address" class="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-gl-black outline-none" required />
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input v-model="newAddress.city" placeholder="City" class="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-gl-black outline-none" required />
                                    <input v-model="newAddress.zip_code" placeholder="Postal Code (5 digits)" maxlength="5" class="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-gl-black outline-none" required />
                                </div>
                                <div class="flex justify-end gap-3 pt-2">
                                    <button type="button" @click="showAddAddress = false" class="text-sm text-gray-500 hover:text-black">Cancel</button>
                                    <button type="submit" class="bg-gl-black text-white px-6 py-2 text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors">Save Address</button>
                                </div>
                            </form>
                        </div>

                        <!-- Address List -->
                        <div v-if="addresses.length === 0 && !showAddAddress" class="text-center py-12 text-gray-400">
                            No addresses saved.
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div v-for="address in addresses" :key="address.id" class="border border-gray-200 p-6 rounded-sm hover:border-gl-black transition-colors relative group">
                                <div class="flex justify-between items-start mb-2">
                                    <h4 class="font-serif font-bold">{{ address.name }}</h4>
                                    <button @click="deleteAddress(address.id)" class="text-gray-400 hover:text-red-600 transition-colors">
                                        <Trash2 class="w-4 h-4" />
                                    </button>
                                </div>
                                <p class="text-gray-600 text-sm leading-relaxed">
                                    {{ address.street }}<br>
                                    {{ address.city }}, {{ address.zip_code }}<br>
                                    {{ address.country }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- ACCOUNT DETAILS TAB -->
                    <div v-else-if="activeTab === 'details'" class="animate-fade-in">
                        <h2 class="font-serif text-2xl mb-8">Account Details</h2>
                        <form @submit.prevent="attemptUpdateUser" class="max-w-md space-y-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input v-model="userForm.full_name" type="text" class="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-gl-black outline-none transition-shadow" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input v-model="userForm.email" type="email" class="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-gl-black outline-none transition-shadow" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                <input v-model="userForm.password" type="password" placeholder="Leave blank to keep current" class="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-gl-black outline-none transition-shadow" />
                            </div>
                            <div v-if="userForm.password">
                                <label class="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                <input v-model="userForm.confirmPassword" type="password" placeholder="Confirm new password" class="w-full p-3 border border-gray-300 rounded focus:ring-1 focus:ring-gl-black outline-none transition-shadow" />
                            </div>
                            <div class="pt-4">
                                <BaseButton type="submit" class="w-full">Save Changes</BaseButton>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>

        <!-- Confirm Modal (Simple Implementation) -->
        <Teleport to="body">
            <div v-if="showConfirmModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div class="bg-white p-6 w-full max-w-sm rounded shadow-xl animate-fade-in">
                    <h3 class="text-lg font-serif mb-4">Confirm Changes</h3>
                    <p class="text-gray-600 mb-6">Are you sure you want to update your profile details?</p>
                    <div class="flex justify-end gap-3">
                        <button @click="showConfirmModal = false" class="px-4 py-2 text-sm hover:bg-gray-100 rounded">Cancel</button>
                        <BaseButton @click="executeUpdateUser" size="sm">Confirm</BaseButton>
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>
