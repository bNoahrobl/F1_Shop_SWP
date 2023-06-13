<template>
  <div class="home">
    <shop-page></shop-page>
  </div>
</template>

<script>
// @ is an alias to /src
import ShopPage from '@/components/ShopPage.vue'

export default {
  name: 'HomeView',
  components: {
    ShopPage,
  }
}
</script>
