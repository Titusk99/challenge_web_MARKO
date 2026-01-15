<script setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const products = ref([])
const categories = ref([])
const loading = ref(true)
const isModalOpen = ref(false)
const isEditing = ref(false)

const currentProduct = reactive({
    id: null,
    name: '',
    description: '',
    price: 0,
    category_id: null,
    brand: '',
    color: '',
    image_url: '',
    is_active: true
})

// Temporary selection state for UI before mapping to category_id
const selectedGender = ref('Women')

// Static options based on requirements/navigation
const brands = ['Chanel', 'Dior', 'La Mer', 'Aesop', 'Gucci', 'Prada', 'Nike', 'Zara']
const colors = ['Black', 'White', 'Beige', 'Blue', 'Green', 'Red', 'Pink', 'Grey', 'Brown', 'Multi']

// Computed: Filter categories (types) based on selected Gender
const availableTypes = computed(() => {
    return categories.value.filter(c => c.gender === selectedGender.value && c.parent_id !== null)
})

const fetchProducts = async () => {
    try {
        const response = await fetch('http://localhost:8000/admin/products', {
            headers: { 'Authorization': `Bearer ${authStore.token}` }
        })
        if (response.ok) products.value = await response.json()
    } catch (error) {
        console.error('Error fetching products:', error)
    }
}

const fetchCategories = async () => {
    try {
        const response = await fetch('http://localhost:8000/categories')
        if (response.ok) categories.value = await response.json()
    } catch (error) {
        console.error('Error fetching categories:', error)
    }
}

const openModal = (product = null) => {
    if (product) {
        isEditing.value = true
        Object.assign(currentProduct, product)
        
        // Find existing category to set gender correctly
        const existingCat = categories.value.find(c => c.id === product.category_id)
        if (existingCat) {
            selectedGender.value = existingCat.gender
        }
    } else {
        isEditing.value = false
        Object.assign(currentProduct, {
            id: null,
            name: '',
            description: '',
            price: 0,
            category_id: null,
            brand: '',
            color: '',
            image_url: '',
            is_active: true
        })
        selectedGender.value = 'Women' // Default
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
        
        // Ensure price is number
        const payload = {
            ...currentProduct,
            price: Number(currentProduct.price)
        }
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authStore.token}`
            },
            body: JSON.stringify(payload)
        })

        if (response.ok) {
            await fetchProducts()
            closeModal()
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
            headers: { 'Authorization': `Bearer ${authStore.token}` }
        })
        if (response.ok) products.value = products.value.filter(p => p.id !== id)
    } catch (error) {
        console.error('Error deleting product:', error)
    }
}

const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
}

onMounted(async () => {
    if (!authStore.isAuthenticated || authStore.user?.role !== 'admin') {
        router.push('/login')
        return
    }
    loading.value = true
    await Promise.all([fetchProducts(), fetchCategories()])
    loading.value = false
})
</script>

<template>
    <div class="min-h-screen pl-64 bg-gray-50">
        <!-- Sidebar -->
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
                <button @click="openModal()" class="bg-gl-black text-white px-6 py-2 hover:bg-gl-red transition-colors duration-300 uppercase tracking-widest text-xs">
                    Add Product
                </button>
            </div>

            <div class="bg-white shadow-sm rounded-sm overflow-hidden">
                <table class="w-full text-left">
                    <thead class="bg-gray-100 text-xs uppercase tracking-wider text-gray-500">
                        <tr>
                            <th class="p-4 font-medium">Product</th>
                            <th class="p-4 font-medium">Brand</th>
                            <th class="p-4 font-medium">Type</th>
                            <th class="p-4 font-medium">Color</th>
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
                            <td class="p-4 text-sm text-gray-600">{{ product.brand || '-' }}</td>
                            <td class="p-4 text-sm text-gray-600">{{ categories.find(c => c.id === product.category_id)?.name || '-' }}</td>
                            <td class="p-4 text-sm text-gray-600">{{ product.color || '-' }}</td>
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
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Modal -->
        <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gl-black-glass backdrop-blur-sm">
            <div class="bg-white w-full max-w-lg p-8 shadow-2xl animate-fade-in relative max-h-[90vh] overflow-y-auto">
                <button @click="closeModal" class="absolute top-4 right-4 text-gray-400 hover:text-black">✕</button>
                <h2 class="font-serif text-2xl mb-6">{{ isEditing ? 'Edit Product' : 'New Product' }}</h2>
                
                <form @submit.prevent="saveProduct" class="space-y-4">
                    <div>
                        <label class="block text-xs uppercase tracking-wider text-gray-500 mb-1">Product Name</label>
                        <input v-model="currentProduct.name" type="text" class="w-full border-b border-gray-300 py-2 focus:border-gl-black outline-none transition-colors" required />
                    </div>

                    <!-- New Selectors -->
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs uppercase tracking-wider text-gray-500 mb-1">Gender</label>
                            <select v-model="selectedGender" class="w-full border-b border-gray-300 py-2 focus:border-gl-black outline-none">
                                <option value="Women">Women</option>
                                <option value="Men">Men</option>
                                <option value="Accessories">Accessories</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs uppercase tracking-wider text-gray-500 mb-1">Type (Category)</label>
                            <select v-model="currentProduct.category_id" class="w-full border-b border-gray-300 py-2 focus:border-gl-black outline-none" required>
                                <option v-for="cat in availableTypes" :key="cat.id" :value="cat.id">
                                    {{ cat.name }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs uppercase tracking-wider text-gray-500 mb-1">Brand</label>
                            <select v-model="currentProduct.brand" class="w-full border-b border-gray-300 py-2 focus:border-gl-black outline-none">
                                <option value="">Select Brand...</option>
                                <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs uppercase tracking-wider text-gray-500 mb-1">Color</label>
                            <select v-model="currentProduct.color" class="w-full border-b border-gray-300 py-2 focus:border-gl-black outline-none">
                                <option value="">Select Color...</option>
                                <option v-for="color in colors" :key="color" :value="color">{{ color }}</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs uppercase tracking-wider text-gray-500 mb-1">Price</label>
                        <input v-model.number="currentProduct.price" type="number" step="0.01" class="w-full border-b border-gray-300 py-2 focus:border-gl-black outline-none transition-colors" required />
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
