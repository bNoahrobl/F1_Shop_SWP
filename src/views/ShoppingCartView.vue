<template>
    <div class="cart">
      <shopping-cart></shopping-cart>
    </div>
</template>
  
<script>
import ShoppingCart from '@/components/ShoppingCart.vue'
  
  export default {
    name: 'ShoppingCartView',
    components: {
      ShoppingCart,
    }
  }
  </script>