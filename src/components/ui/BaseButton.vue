<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button'
  }
})

const baseClasses = 'inline-flex items-center justify-center px-8 py-3 text-sm font-medium transition-all duration-300 ease-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-gl-black text-white hover:bg-gray-900'
    case 'secondary':
      return 'bg-gl-white-glass text-gl-black backdrop-blur-md hover:bg-white'
    case 'outline':
      return 'border border-gl-black text-gl-black hover:bg-gl-black hover:text-white'
    default:
      return 'bg-gl-black text-white'
  }
})
</script>

<template>
  <button
    :type="type"
    :class="[baseClasses, variantClasses]"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="mr-2">
      <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </span>
    <slot></slot>
  </button>
</template>
