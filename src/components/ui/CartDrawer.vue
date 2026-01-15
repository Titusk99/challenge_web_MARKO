<script setup>
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { X, Minus, Plus, Trash2 } from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'

const cartStore = useCartStore()
const router = useRouter()
const { items, isCartOpen, cartTotal } = storeToRefs(cartStore)

const closeCart = () => {
  cartStore.toggleCart()
}

const checkout = () => {
  cartStore.toggleCart()
  router.push('/checkout')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="slide-over">
      <div v-if="isCartOpen" class="fixed inset-0 z-50 flex justify-end">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-gl-black-glass backdrop-blur-sm transition-opacity" @click="closeCart"></div>
        
        <!-- Drawer -->
        <div class="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform">
          
          <!-- Header -->
          <div class="p-6 flex items-center justify-between border-b border-gray-100">
            <h2 class="text-2xl font-serif text-gl-black">Shopping Cart</h2>
            <button @click="closeCart" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X class="w-6 h-6" />
            </button>
          </div>

          <!-- Body -->
          <div class="flex-1 overflow-y-auto p-6">
            <div v-if="items.length === 0" class="h-full flex flex-col items-center justify-center text-center">
              <p class="text-gray-500 mb-4">Your cart is empty</p>
              <BaseButton variant="outline" @click="closeCart">Continue Shopping</BaseButton>
            </div>

            <div v-else class="space-y-6">
              <div v-for="item in items" :key="`${item.id}-${item.size}`" class="flex gap-4">
                <!-- Image -->
                <div class="w-24 h-32 bg-gray-100 flex-shrink-0">
                  <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                </div>

                <!-- Details -->
                <div class="flex-1 flex flex-col justify-between">
                  <div>
                    <div class="flex justify-between items-start mb-1">
                      <h3 class="font-medium text-gl-black">{{ item.name }}</h3>
                      <p class="font-medium">${{ (item.price * item.quantity).toFixed(2) }}</p>
                    </div>
                    <p class="text-sm text-gray-500 mb-1">{{ item.category }}</p>
                    <p class="text-sm text-gray-500">Size: {{ item.size }}</p>
                  </div>

                  <div class="flex items-center justify-between">
                    <!-- Quantity Controls -->
                    <div class="flex items-center border border-gray-200 rounded-sm">
                      <button 
                        @click="cartStore.updateQuantity(item.id, item.size, item.quantity - 1)"
                        class="p-1 hover:bg-gray-50 transition-colors"
                      >
                        <Minus class="w-4 h-4" />
                      </button>
                      <span class="w-8 text-center text-sm">{{ item.quantity }}</span>
                      <button 
                        @click="cartStore.updateQuantity(item.id, item.size, item.quantity + 1)"
                        class="p-1 hover:bg-gray-50 transition-colors"
                      >
                        <Plus class="w-4 h-4" />
                      </button>
                    </div>

                    <!-- Remove -->
                    <button 
                      @click="cartStore.removeFromCart(item.id, item.size)"
                      class="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div v-if="items.length > 0" class="p-6 border-t border-gray-100 bg-gray-50">
            <div class="flex justify-between items-center mb-4">
              <span class="text-gray-600">Subtotal</span>
              <span class="text-xl font-medium text-gl-black">${{ cartTotal.toFixed(2) }}</span>
            </div>
            <p class="text-xs text-gray-500 mb-6 text-center">Shipping and taxes calculated at checkout.</p>
            <BaseButton class="w-full h-14 text-lg" @click="checkout">Checkout</BaseButton>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.slide-over-enter-active,
.slide-over-leave-active {
  transition: opacity 0.3s ease;
}

.slide-over-enter-from,
.slide-over-leave-to {
  opacity: 0;
}

.slide-over-enter-active .relative,
.slide-over-leave-active .relative {
  transition: transform 0.3s ease-out;
}

.slide-over-enter-from .relative,
.slide-over-leave-to .relative {
  transform: translateX(100%);
}
</style>
