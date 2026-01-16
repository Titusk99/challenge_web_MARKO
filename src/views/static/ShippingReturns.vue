<script setup>
import GlassContainer from '@/components/ui/GlassContainer.vue'
</script>

<template>
  <div class="min-h-screen pt-32 pb-20 px-6">
    <div class="container mx-auto max-w-4xl">
      <h1 class="font-serif text-4xl md:text-5xl text-gl-black mb-12 text-center">Shipping & Returns</h1>
      
      <GlassContainer class="p-8 md:p-12 space-y-8">
        <section>
          <h2 class="font-serif text-2xl mb-4">Shipping Policy</h2>
          <p class="text-gray-600 leading-relaxed mb-4">
            At MARKO, we ensure that your luxury items are delivered with the utmost care. We offer complimentary standard shipping on all orders over $200.
          </p>
          <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
            <li>Standard Delivery (3-5 business days): $15</li>
            <li>Express Delivery (1-2 business days): $25</li>
            <li>International Shipping: Calculated at checkout</li>
          </ul>
        </section>

        <section>
          <h2 class="font-serif text-2xl mb-4">Returns & Exchanges</h2>
          <p class="text-gray-600 leading-relaxed mb-4">
            We want you to be completely satisfied with your purchase. If for any reason you are not, we accept returns within 30 days of delivery.
          </p>
          <p class="text-gray-600 leading-relaxed">
            Items must be returned unworn, unwashed, and with all original tags attached. To initiate a return, please visit our Returns Portal or contact our customer care team.
          </p>
        </section>
      </GlassContainer>
    </div>
  </div>
</template>
