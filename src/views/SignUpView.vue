<template>
    <div class="signup">
      <sign-up-page></sign-up-page>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import SignUpPage from '@/components/SignUpPage.vue'
  
  export default {
    name: 'SignUpView',
    components: {
      SignUpPage,
    }
  }
  </script>