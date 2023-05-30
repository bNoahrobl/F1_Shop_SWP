<template>
  <div class="home">
    <login-page></login-page>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginPage from '@/components/LoginPage.vue'

export default {
  name: 'HomeView',
  components: {
    LoginPage,
  }
}
</script>
