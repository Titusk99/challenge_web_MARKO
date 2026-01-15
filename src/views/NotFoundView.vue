<script setup>
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center bg-gl-gray text-center px-4">
    <div class="font-serif text-9xl text-gl-black opacity-10 mb-4 animate-fade-in">404</div>
    <h1 class="font-serif text-4xl mb-6">Page Not Found</h1>
    <p class="text-gl-dark-gray max-w-md mx-auto mb-12">
      We apologize, but the page you are looking for does not exist or has been moved.
    </p>
    <router-link 
      to="/" 
      class="bg-gl-black text-white px-8 py-4 text-sm uppercase tracking-widest hover:bg-gl-red transition-colors duration-300"
    >
      Return to Home
    </router-link>
  </div>
</template>
