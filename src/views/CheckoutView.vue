<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'
import { useToastStore } from '@/stores/toast'
import { useAuthStore } from '@/stores/auth'
import BaseButton from '@/components/ui/BaseButton.vue'
import { CheckCircle, CreditCard, Truck } from 'lucide-vue-next'
import { API_URL } from '@/config'
import { onMounted, watch } from 'vue'

const router = useRouter()
const cartStore = useCartStore()
const toastStore = useToastStore()
const { items, cartTotal } = storeToRefs(cartStore)

const currentStep = ref(1)
const isProcessing = ref(false)

const shippingForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  city: '',
  zipCode: '',
  country: 'France'
})

const authStore = useAuthStore() // Add auth store use
const addresses = ref([])
const savedAddressId = ref('new')

const paymentForm = ref({
  cardNumber: '',
  expiry: '',
  cvc: '',
  nameOnCard: ''
})

onMounted(async () => {
    if (authStore.isAuthenticated) {
        try {
            const response = await fetch(`${API_URL}/users/me/addresses`, {
                headers: { 'Authorization': `Bearer ${authStore.token}` }
            })
            if (response.ok) {
                addresses.value = await response.json()
                if (addresses.value.length > 0) {
                    savedAddressId.value = addresses.value[0].id
                    fillFormWithAddress(addresses.value[0])
                }
            }
        } catch (e) {
            console.error(e)
        }
    }
})

const fillFormWithAddress = (addr) => {
    shippingForm.value = {
        firstName: authStore.user?.full_name?.split(' ')[0] || '',
        lastName: authStore.user?.full_name?.split(' ').slice(1).join(' ') || '',
        email: authStore.user?.email || '',
        address: addr.street,
        city: addr.city,
        zipCode: addr.zip_code,
        country: addr.country
    }
}

watch(savedAddressId, (newVal) => {
    if (newVal === 'new') {
        shippingForm.value = { firstName: '', lastName: '', email: '', address: '', city: '', zipCode: '', country: 'France' }
    } else {
        const addr = addresses.value.find(a => a.id === newVal)
        if (addr) fillFormWithAddress(addr)
    }
})

const shippingCost = computed(() => cartTotal.value > 200 ? 0 : 15)
const total = computed(() => cartTotal.value + shippingCost.value)

const nextStep = async () => {
  if (currentStep.value === 1) {
    if ((savedAddressId.value === 'new') && (!shippingForm.value.firstName || !shippingForm.value.address)) {
      toastStore.addToast('Please fill in all required fields', 'error')
      return
    }
    
    // Auto-save address if new and authenticated
    if (savedAddressId.value === 'new' && authStore.isAuthenticated) {
        try {
             await fetch(`${API_URL}/users/me/addresses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authStore.token}`
                },
                body: JSON.stringify({
                    name: 'Checkout Address',
                    street: shippingForm.value.address,
                    city: shippingForm.value.city,
                    zip_code: shippingForm.value.zipCode,
                    country: shippingForm.value.country
                })
            })
        } catch (e) {
            console.error('Failed to auto-save address', e)
        }
    }

    currentStep.value = 2
  }
}

const prevStep = () => {
  currentStep.value = 1
}

const processPayment = async () => {
  isProcessing.value = true
  
  try {
    // 1. Create Payment Intent (Mock or Real)
    if (!authStore.isAuthenticated) {
        toastStore.addToast('You must be logged in to pay', 'error')
        router.push('/login')
        return
    }

    const response = await fetch(`${API_URL}/payment/create-payment-intent`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authStore.token}` 
        },
        body: JSON.stringify({
            amount: Math.round(total.value * 100), // In cents
            currency: 'usd',
            // payment_method_id: ... (would come from Stripe.js in real mode)
        })
    })

    if (!response.ok) {
        const err = await response.json()
        console.error('Payment intent error:', err)
        throw new Error(err.detail || 'Payment failed')
    }

    const data = await response.json()

    // 2. Confirm Order (Update status in DB)
    if (data.status === 'succeeded') {
        const confirmResponse = await fetch(`${API_URL}/payment/confirm-order?payment_intent_id=${data.id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authStore.token}`
            }
        })
        
        if (confirmResponse.ok) {
            toastStore.addToast('Payment successful! Order confirmed.', 'success')
            cartStore.items = [] // Clear cart
            router.push('/') // Redirect to home (or order success page)
        } else {
             throw new Error('Failed to confirm order')
        }
    } else {
        throw new Error('Payment not succeeded')
    }
    
  } catch (error) {
    console.error(error)
    toastStore.addToast(error.message || 'Payment failed. Please try again.', 'error')
  } finally {
    isProcessing.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-white pt-24 pb-12">
    <div class="container mx-auto px-4 sm:px-8">
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <!-- Left Column: Forms -->
        <div class="lg:col-span-7">
          <!-- Steps Indicator -->
          <div class="flex items-center mb-12">
            <div class="flex items-center">
              <div 
                class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300"
                :class="currentStep >= 1 ? 'bg-gl-black text-white' : 'bg-gray-200 text-gray-500'"
              >
                1
              </div>
              <span class="ml-3 text-sm font-medium" :class="currentStep >= 1 ? 'text-gl-black' : 'text-gray-500'">Shipping</span>
            </div>
            <div class="w-12 h-px bg-gray-200 mx-4"></div>
            <div class="flex items-center">
              <div 
                class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300"
                :class="currentStep >= 2 ? 'bg-gl-black text-white' : 'bg-gray-200 text-gray-500'"
              >
                2
              </div>
              <span class="ml-3 text-sm font-medium" :class="currentStep >= 2 ? 'text-gl-black' : 'text-gray-500'">Payment</span>
            </div>
          </div>

          <!-- Step 1: Shipping -->
          <div v-if="currentStep === 1" class="animate-fade-in">
            <h2 class="text-2xl font-serif mb-8">Shipping Information</h2>

            <!-- Address Selection -->
            <div v-if="addresses.length > 0" class="mb-8">
                <label class="text-xs uppercase tracking-wider text-gray-500 block mb-2">Select Address</label>
                <select v-model="savedAddressId" class="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gl-black bg-transparent">
                    <option v-for="addr in addresses" :key="addr.id" :value="addr.id">{{ addr.name }} - {{ addr.street }}</option>
                    <option value="new">Use a new address</option>
                </select>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6" :class="{ 'opacity-50 pointer-events-none': savedAddressId !== 'new' }">
              <div class="space-y-2">
                <label class="text-xs uppercase tracking-wider text-gray-500">First Name</label>
                <input 
                  v-model="shippingForm.firstName"
                  type="text" 
                  class="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gl-black transition-colors bg-transparent"
                  placeholder="Jane"
                />
              </div>
              <div class="space-y-2">
                <label class="text-xs uppercase tracking-wider text-gray-500">Last Name</label>
                <input 
                  v-model="shippingForm.lastName"
                  type="text" 
                  class="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gl-black transition-colors bg-transparent"
                  placeholder="Doe"
                />
              </div>
              <div class="space-y-2 md:col-span-2">
                <label class="text-xs uppercase tracking-wider text-gray-500">Email</label>
                <input 
                  v-model="shippingForm.email"
                  type="email" 
                  class="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gl-black transition-colors bg-transparent"
                  placeholder="jane@example.com"
                />
              </div>
              <div class="space-y-2 md:col-span-2">
                <label class="text-xs uppercase tracking-wider text-gray-500">Address</label>
                <input 
                  v-model="shippingForm.address"
                  type="text" 
                  class="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gl-black transition-colors bg-transparent"
                  placeholder="123 Luxury Avenue"
                />
              </div>
              <div class="space-y-2">
                <label class="text-xs uppercase tracking-wider text-gray-500">City</label>
                <input 
                  v-model="shippingForm.city"
                  type="text" 
                  class="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gl-black transition-colors bg-transparent"
                  placeholder="Paris"
                />
              </div>
              <div class="space-y-2">
                <label class="text-xs uppercase tracking-wider text-gray-500">Zip Code</label>
                <input 
                  v-model="shippingForm.zipCode"
                  type="text" 
                  class="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gl-black transition-colors bg-transparent"
                  placeholder="75001"
                />
              </div>
            </div>

            <div class="mt-12 flex justify-end">
              <BaseButton @click="nextStep">Continue to Payment</BaseButton>
            </div>
          </div>

          <!-- Step 2: Payment -->
          <div v-else class="animate-fade-in">
            <h2 class="text-2xl font-serif mb-8">Payment Details</h2>
            
            <div class="bg-gray-50 p-6 rounded-sm mb-8 border border-gray-100">
              <div class="flex items-center gap-4 mb-6">
                <CreditCard class="w-5 h-5 text-gray-400" />
                <span class="text-sm font-medium">Credit Card</span>
              </div>
              
              <div class="space-y-6">
                <div class="space-y-2">
                  <label class="text-xs uppercase tracking-wider text-gray-500">Card Number</label>
                  <input 
                    v-model="paymentForm.cardNumber"
                    type="text" 
                    class="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gl-black transition-colors bg-transparent"
                    placeholder="0000 0000 0000 0000"
                  />
                </div>
                <div class="grid grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="text-xs uppercase tracking-wider text-gray-500">Expiry Date</label>
                    <input 
                      v-model="paymentForm.expiry"
                      type="text" 
                      class="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gl-black transition-colors bg-transparent"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div class="space-y-2">
                    <label class="text-xs uppercase tracking-wider text-gray-500">CVC</label>
                    <input 
                      v-model="paymentForm.cvc"
                      type="text" 
                      class="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gl-black transition-colors bg-transparent"
                      placeholder="123"
                    />
                  </div>
                </div>
                <div class="space-y-2">
                  <label class="text-xs uppercase tracking-wider text-gray-500">Name on Card</label>
                  <input 
                    v-model="paymentForm.nameOnCard"
                    type="text" 
                    class="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gl-black transition-colors bg-transparent"
                    placeholder="JANE DOE"
                  />
                </div>
              </div>
            </div>

            <div class="mt-12 flex justify-between items-center">
              <button @click="prevStep" class="text-sm text-gray-500 hover:text-gl-black transition-colors">
                Return to Shipping
              </button>
              <BaseButton :loading="isProcessing" @click="processPayment">
                Pay ${{ total.toFixed(2) }}
              </BaseButton>
            </div>
          </div>
        </div>

        <!-- Right Column: Order Summary -->
        <div class="lg:col-span-5">
          <div class="bg-gray-50 p-8 rounded-sm sticky top-32">
            <h3 class="font-serif text-xl mb-6">Order Summary</h3>
            
            <div class="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2">
              <div v-for="item in items" :key="`${item.id}-${item.size}`" class="flex gap-4">
                <div class="w-16 h-20 bg-gray-200 flex-shrink-0">
                  <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                </div>
                <div class="flex-1">
                  <h4 class="text-sm font-medium">{{ item.name }}</h4>
                  <p class="text-xs text-gray-500">{{ item.size }} | Qty: {{ item.quantity }}</p>
                  <p class="text-sm font-medium mt-1">${{ (item.price * item.quantity).toFixed(2) }}</p>
                </div>
              </div>
            </div>

            <div class="border-t border-gray-200 pt-6 space-y-3">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Subtotal</span>
                <span>${{ cartTotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Shipping</span>
                <span>{{ shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}` }}</span>
              </div>
              <div class="flex justify-between text-lg font-medium pt-4 border-t border-gray-200 mt-4">
                <span>Total</span>
                <span>${{ total.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
