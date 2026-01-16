<script setup>
import { ref } from 'vue'
import GlassContainer from '@/components/ui/GlassContainer.vue'
import { Plus, Minus } from 'lucide-vue-next'

const faqs = ref([
  {
    question: "How do I track my order?",
    answer: "Once your order has shipped, you will receive an email confirmation with a tracking number. You can also track your order status in your account dashboard.",
    isOpen: false
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to over 100 countries worldwide. Shipping costs and delivery times vary by location and will be calculated at checkout.",
    isOpen: false
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay.",
    isOpen: false
  },
  {
    question: "Can I change or cancel my order?",
    answer: "We process orders quickly to ensure fast delivery. If you need to make changes, please contact our customer care team immediately. We cannot guarantee changes once an order has been processed.",
    isOpen: false
  }
])

const toggleFaq = (index) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen
}
</script>

<template>
  <div class="min-h-screen pt-32 pb-20 px-6">
    <div class="container mx-auto max-w-3xl">
      <h1 class="font-serif text-4xl md:text-5xl text-gl-black mb-12 text-center">Frequently Asked Questions</h1>
      
      <GlassContainer class="p-8 md:p-12">
        <div class="space-y-4">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index"
            class="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
          >
            <button 
              @click="toggleFaq(index)"
              class="w-full flex justify-between items-center py-4 text-left group"
            >
              <span class="font-medium text-lg text-gl-black group-hover:text-gl-red transition-colors">{{ faq.question }}</span>
              <component :is="faq.isOpen ? Minus : Plus" class="w-5 h-5 text-gray-400" />
            </button>
            <div 
              v-show="faq.isOpen"
              class="text-gray-600 leading-relaxed pb-4 animate-fade-in"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </GlassContainer>
    </div>
  </div>
</template>
