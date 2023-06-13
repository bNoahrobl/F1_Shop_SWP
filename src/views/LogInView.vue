<template>
    <div class="login">
      <login-page></login-page>
    </div>
</template>
  
<script>
import LoginPage from '@/components/LoginPage.vue'
  
  export default {
    name: 'LogInView',
    components: {
      LoginPage,
    }
  }
</script>