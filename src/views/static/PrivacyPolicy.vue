<script setup>
import GlassContainer from '@/components/ui/GlassContainer.vue'
</script>

<template>
  <div class="min-h-screen pt-32 pb-20 px-6">
    <div class="container mx-auto max-w-4xl">
      <h1 class="font-serif text-4xl md:text-5xl text-gl-black mb-12 text-center">Privacy Policy</h1>
      
      <GlassContainer class="p-8 md:p-12 space-y-8">
        <section>
          <h2 class="font-serif text-2xl mb-4">Data Collection</h2>
          <p class="text-gray-600 leading-relaxed">
            We collect personal information that you provide to us when you create an account, make a purchase, or sign up for our newsletter. This includes your name, email address, shipping address, and payment information.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-2xl mb-4">How We Use Your Data</h2>
          <p class="text-gray-600 leading-relaxed">
            We use your information to process your orders, communicate with you about your purchase, and send you marketing communications (if you have opted in).
          </p>
        </section>

        <section>
          <h2 class="font-serif text-2xl mb-4">Data Security</h2>
          <p class="text-gray-600 leading-relaxed">
            We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage.
          </p>
        </section>
      </GlassContainer>
    </div>
  </div>
</template>
