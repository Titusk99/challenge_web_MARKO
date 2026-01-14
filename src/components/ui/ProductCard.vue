<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}
</script>

<template>
  <div class="group cursor-pointer flex-shrink-0 w-72 snap-start">
    <div class="relative overflow-hidden aspect-[3/4] mb-4 bg-gray-100">
      <img 
        :src="product.image" 
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />
      
      <!-- Overlay (optional, for add to cart etc later) -->
      <div class="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <!-- Placeholder for future actions -->
      </div>
    </div>
    
    <div class="space-y-1">
      <p class="text-xs uppercase tracking-wider text-gl-dark-gray">{{ product.category }}</p>
      <h3 class="font-serif text-lg leading-tight group-hover:text-gl-red transition-colors duration-300">{{ product.name }}</h3>
      <p class="font-sans font-medium">{{ formatPrice(product.price) }}</p>
    </div>
  </div>
</template>
