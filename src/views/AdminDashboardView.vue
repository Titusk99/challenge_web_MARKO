<script setup>
import { onMounted, ref, reactive } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useToastStore } from '../stores/toast' // Assuming this exists or I should mock it/use alert
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
// Mock toast if not available, but planned to use it.
const toastStore = { addToast: (msg, type) => console.log(msg, type) } 

const products = ref([])
const loading = ref(true)
const isModalOpen = ref(false)
const isEditing = ref(false)
const currentProduct = reactive({
    id: null,
    name: '',
    description: '',
    price: 0,
    category: '',
    image_url: '',
    is_active: true
})

const fetchProducts = async () => {
    loading.value = true
    try {
        const response = await fetch('http://localhost:8000/admin/products', {
            headers: {
                'Authorization': `Bearer ${authStore.token}`
            }
        })
        if (response.ok) {
            products.value = await response.json()
        } else {
            console.error('Failed to fetch products')
        }
    } catch (error) {
        console.error('Error fetching products:', error)
    } finally {
        loading.value = false
    }
}

const openModal = (product = null) => {
    if (product) {
        isEditing.value = true
        Object.assign(currentProduct, product)
    } else {
        isEditing.value = false
        Object.assign(currentProduct, {
            id: null,
            name: '',
            description: '',
            price: 0,
            category: '',
            image_url: '',
            is_active: true
        })
    }
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
}

const saveProduct = async () => {
    try {
        const url = isEditing.value 
            ? `http://localhost:8000/admin/products/${currentProduct.id}`
            : 'http://localhost:8000/admin/products'
        
        const method = isEditing.value ? 'PUT' : 'POST'
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authStore.token}`
            },
            body: JSON.stringify(currentProduct)
        })

        if (response.ok) {
            await fetchProducts()
            closeModal()
            // toastStore.addToast('Product saved successfully', 'success')
        } else {
            const data = await response.json()
            alert(data.detail || 'Failed to save product')
        }
    } catch (error) {
        console.error('Error saving product:', error)
    }
}

const deleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
        const response = await fetch(`http://localhost:8000/admin/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authStore.token}`
            }
        })

        if (response.ok) {
            products.value = products.value.filter(p => p.id !== id)
        } else {
            alert('Failed to delete product')
        }
    } catch (error) {
        console.error('Error deleting product:', error)
    }
}

const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price)
}

onMounted(() => {
    if (!authStore.isAuthenticated || authStore.user?.role !== 'admin') {
        router.push('/login')
        return
    }
    fetchProducts()
})
</script>

<template>
    <div class="min-h-screen pl-64 bg-gray-50">
        <!-- Sidebar (Visual Mockup for Admin) -->
        <div class="fixed inset-y-0 left-0 w-64 bg-gl-black text-white p-6">
            <div class="font-serif text-2xl mb-12">MARKO Admin</div>
            <nav class="space-y-4">
                <a href="#" class="block text-gl-red font-bold">Products</a>
                <a href="#" class="block text-gray-400 hover:text-white transition-colors">Orders</a>
                <a href="#" class="block text-gray-400 hover:text-white transition-colors">Customers</a>
                <a href="#" class="block text-gray-400 hover:text-white transition-colors">Settings</a>
            </nav>
            <div class="absolute bottom-6 left-6">
                 <router-link to="/" class="text-xs uppercase tracking-widest text-gray-500 hover:text-white">Back to Site</router-link>
            </div>
        </div>

        <!-- Main Content -->
        <div class="p-12">
            <div class="flex justify-between items-center mb-8">
                <h1 class="font-serif text-3xl">Product Management</h1>
                <button 
                    @click="openModal()"
                    class="bg-gl-black text-white px-6 py-2 hover:bg-gl-red transition-colors duration-300 uppercase tracking-widest text-xs"
                >
                    Add Product
                </button>
            </div>

            <div class="bg-white shadow-sm rounded-sm overflow-hidden">
                <table class="w-full text-left">
                    <thead class="bg-gray-100 text-xs uppercase tracking-wider text-gray-500">
                        <tr>
                            <th class="p-4 font-medium">Product</th>
                            <th class="p-4 font-medium">Category</th>
                            <th class="p-4 font-medium">Price</th>
                            <th class="p-4 font-medium">Status</th>
                            <th class="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50 transition-colors">
                            <td class="p-4">
                                <div class="flex items-center gap-4">
                                    <div class="w-12 h-12 bg-gray-200">
                                        <img v-if="product.image_url" :src="product.image_url" class="w-full h-full object-cover">
                                    </div>
                                    <span class="font-medium">{{ product.name }}</span>
                                </div>
                            </td>
                            <td class="p-4 text-sm text-gray-600">{{ product.category }}</td>
                            <td class="p-4 font-serif">{{ formatPrice(product.price) }}</td>
                            <td class="p-4">
                                <span :class="['px-2 py-0.5 text-xs rounded-full', product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']">
                                    {{ product.is_active ? 'Active' : 'Inactive' }}
                                </span>
                            </td>
                            <td class="p-4 text-right space-x-2">
                                <button @click="openModal(product)" class="text-sm text-gray-500 hover:text-gl-black">Edit</button>
                                <button @click="deleteProduct(product.id)" class="text-sm text-red-500 hover:text-red-700">Delete</button>
                            </td>
                        </tr>
                        <tr v-if="loading" class="text-center text-gray-500">
                            <td colspan="5" class="p-8">Loading products...</td>
                        </tr>
                        <tr v-else-if="products.length === 0" class="text-center text-gray-500">
                            <td colspan="5" class="p-8">No products found.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Modal -->
        <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gl-black-glass backdrop-blur-sm">
            <div class="bg-white w-full max-w-lg p-8 shadow-2xl animate-fade-in relative">
                <button @click="closeModal" class="absolute top-4 right-4 text-gray-400 hover:text-black">✕</button>
                <h2 class="font-serif text-2xl mb-6">{{ isEditing ? 'Edit Product' : 'New Product' }}</h2>
                
                <form @submit.prevent="saveProduct" class="space-y-4">
                    <div>
                        <label class="block text-xs uppercase tracking-wider text-gray-500 mb-1">Name</label>
                        <input v-model="currentProduct.name" type="text" class="w-full border-b border-gray-300 py-2 focus:border-gl-black outline-none transition-colors" required />
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs uppercase tracking-wider text-gray-500 mb-1">Price</label>
                            <input v-model.number="currentProduct.price" type="number" step="0.01" class="w-full border-b border-gray-300 py-2 focus:border-gl-black outline-none transition-colors" required />
                        </div>
                        <div>
                            <label class="block text-xs uppercase tracking-wider text-gray-500 mb-1">Category</label>
                            <select v-model="currentProduct.category" class="w-full border-b border-gray-300 py-2 focus:border-gl-black outline-none transition-colors">
                                <option value="Women">Women</option>
                                <option value="Men">Men</option>
                                <option value="Accessories">Accessories</option>
                            </select>
                        </div>
                    </div>
                     <div>
                        <label class="block text-xs uppercase tracking-wider text-gray-500 mb-1">Image URL</label>
                        <input v-model="currentProduct.image_url" type="text" class="w-full border-b border-gray-300 py-2 focus:border-gl-black outline-none transition-colors" />
                    </div>
                    <div>
                        <label class="block text-xs uppercase tracking-wider text-gray-500 mb-1">Description</label>
                        <textarea v-model="currentProduct.description" rows="3" class="w-full border-b border-gray-300 py-2 focus:border-gl-black outline-none transition-colors"></textarea>
                    </div>
                    <div class="flex items-center gap-2 mt-4">
                        <input v-model="currentProduct.is_active" type="checkbox" id="active" class="accent-gl-black" />
                        <label for="active" class="text-sm">Active (Visible in store)</label>
                    </div>

                    <div class="pt-6 flex justify-end gap-4">
                        <button type="button" @click="closeModal" class="text-sm uppercase tracking-widest text-gray-500 hover:text-black">Cancel</button>
                        <button type="submit" class="bg-gl-black text-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-gl-red transition-colors duration-300">
                            {{ isEditing ? 'Update' : 'Create' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
