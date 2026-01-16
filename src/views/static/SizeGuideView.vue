<script setup>
import GlassContainer from '@/components/ui/GlassContainer.vue'
</script>

<template>
  <div class="min-h-screen pt-32 pb-20 px-6">
    <div class="container mx-auto max-w-4xl">
      <h1 class="font-serif text-4xl md:text-5xl text-gl-black mb-12 text-center">Size Guide</h1>
      
      <GlassContainer class="p-8 md:p-12 space-y-12">
        <section>
          <h2 class="font-serif text-2xl mb-6">Women's Sizing</h2>
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-600">
              <thead class="text-xs text-gl-black uppercase bg-gray-50">
                <tr>
                  <th class="px-6 py-3">Size</th>
                  <th class="px-6 py-3">Bust (cm)</th>
                  <th class="px-6 py-3">Waist (cm)</th>
                  <th class="px-6 py-3">Hips (cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-gray-100">
                  <td class="px-6 py-4 font-medium">XS</td>
                  <td class="px-6 py-4">80-84</td>
                  <td class="px-6 py-4">60-64</td>
                  <td class="px-6 py-4">86-90</td>
                </tr>
                <tr class="border-b border-gray-100">
                  <td class="px-6 py-4 font-medium">S</td>
                  <td class="px-6 py-4">84-88</td>
                  <td class="px-6 py-4">64-68</td>
                  <td class="px-6 py-4">90-94</td>
                </tr>
                <tr class="border-b border-gray-100">
                  <td class="px-6 py-4 font-medium">M</td>
                  <td class="px-6 py-4">88-92</td>
                  <td class="px-6 py-4">68-72</td>
                  <td class="px-6 py-4">94-98</td>
                </tr>
                <tr class="border-b border-gray-100">
                  <td class="px-6 py-4 font-medium">L</td>
                  <td class="px-6 py-4">92-96</td>
                  <td class="px-6 py-4">72-76</td>
                  <td class="px-6 py-4">98-102</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 class="font-serif text-2xl mb-6">Men's Sizing</h2>
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-600">
              <thead class="text-xs text-gl-black uppercase bg-gray-50">
                <tr>
                  <th class="px-6 py-3">Size</th>
                  <th class="px-6 py-3">Chest (cm)</th>
                  <th class="px-6 py-3">Waist (cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-gray-100">
                  <td class="px-6 py-4 font-medium">S</td>
                  <td class="px-6 py-4">92-96</td>
                  <td class="px-6 py-4">76-80</td>
                </tr>
                <tr class="border-b border-gray-100">
                  <td class="px-6 py-4 font-medium">M</td>
                  <td class="px-6 py-4">96-100</td>
                  <td class="px-6 py-4">80-84</td>
                </tr>
                <tr class="border-b border-gray-100">
                  <td class="px-6 py-4 font-medium">L</td>
                  <td class="px-6 py-4">100-104</td>
                  <td class="px-6 py-4">84-88</td>
                </tr>
                <tr class="border-b border-gray-100">
                  <td class="px-6 py-4 font-medium">XL</td>
                  <td class="px-6 py-4">104-108</td>
                  <td class="px-6 py-4">88-92</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </GlassContainer>
    </div>
  </div>
</template>
