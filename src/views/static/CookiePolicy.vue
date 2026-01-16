<script setup>
import GlassContainer from '@/components/ui/GlassContainer.vue'
</script>

<template>
  <div class="min-h-screen pt-32 pb-20 px-6">
    <div class="container mx-auto max-w-4xl">
      <h1 class="font-serif text-4xl md:text-5xl text-gl-black mb-12 text-center">Cookie Policy</h1>
      
      <GlassContainer class="p-8 md:p-12 space-y-8">
        <section>
          <h2 class="font-serif text-2xl mb-4">What Are Cookies</h2>
          <p class="text-gray-600 leading-relaxed">
            Cookies are small text files that are placed on your computer or mobile device when you visit our website. They help us improve your experience by remembering your preferences and shopping cart items.
          </p>
        </section>

        <section>
          <h2 class="font-serif text-2xl mb-4">Types of Cookies We Use</h2>
          <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
            <li><strong>Essential Cookies:</strong> Necessary for the website to function properly.</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website.</li>
            <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements to you.</li>
          </ul>
        </section>

        <section>
          <h2 class="font-serif text-2xl mb-4">Managing Cookies</h2>
          <p class="text-gray-600 leading-relaxed">
            You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
          </p>
        </section>
      </GlassContainer>
    </div>
  </div>
</template>
