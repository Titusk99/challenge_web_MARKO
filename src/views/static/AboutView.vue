<script setup>
import GlassContainer from '@/components/ui/GlassContainer.vue'
</script>

<template>
  <div class="min-h-screen pt-32 pb-20 px-6">
    <!-- Hero Section -->
    <div class="container mx-auto max-w-6xl mb-24">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div class="space-y-8 animate-slide-up">
          <h1 class="font-serif text-5xl md:text-7xl text-gl-black leading-tight">
            Crafting <br>
            <span class="italic text-gl-red">Timeless</span> <br>
            Elegance.
          </h1>
          <p class="text-lg text-gray-600 leading-relaxed max-w-md">
            MARKO was born from a desire to redefine luxury retail. We believe that true style is not just about what you wear, but how it makes you feel.
          </p>
        </div>
        <div class="relative h-[600px] w-full animate-fade-in">
          <img 
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=2074" 
            alt="Fashion Editorial" 
            class="absolute inset-0 w-full h-full object-cover rounded-sm shadow-2xl"
          />
          <div class="absolute inset-0 bg-black/10"></div>
        </div>
      </div>
    </div>

    <!-- Values Section -->
    <div class="container mx-auto max-w-4xl mb-24">
      <GlassContainer class="p-12 md:p-16">
        <div class="text-center mb-16">
          <h2 class="font-serif text-3xl md:text-4xl mb-6">Our Philosophy</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            We curate collections that bridge the gap between contemporary trends and classic sophistication. Every piece is selected with an eye for detail, quality, and longevity.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div class="space-y-4">
            <h3 class="font-serif text-xl">Quality</h3>
            <p class="text-sm text-gray-500">Uncompromising attention to materials and craftsmanship.</p>
          </div>
          <div class="space-y-4">
            <h3 class="font-serif text-xl">Sustainability</h3>
            <p class="text-sm text-gray-500">Committed to ethical sourcing and responsible production.</p>
          </div>
          <div class="space-y-4">
            <h3 class="font-serif text-xl">Individuality</h3>
            <p class="text-sm text-gray-500">Celebrating unique style and personal expression.</p>
          </div>
        </div>
      </GlassContainer>
    </div>

    <!-- Heritage Section -->
    <div class="container mx-auto max-w-6xl">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div class="relative h-[500px] w-full order-2 md:order-1">
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2070" 
            alt="Atelier" 
            class="absolute inset-0 w-full h-full object-cover rounded-sm shadow-xl"
          />
        </div>
        <div class="space-y-8 order-1 md:order-2">
          <h2 class="font-serif text-3xl md:text-4xl">Our Heritage</h2>
          <p class="text-gray-600 leading-relaxed">
            Founded in Paris in 2024, MARKO started as a small boutique with a big vision. Today, we are a global destination for fashion-forward individuals who appreciate the finer things in life.
          </p>
          <p class="text-gray-600 leading-relaxed">
            Our journey is just beginning. We invite you to be a part of our story.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
