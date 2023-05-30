<template>
  <div v-if="showLoginPage">
    <h2>Login</h2>
    <input type="text" v-model="username" placeholder="Username">
    <input type="password" v-model="password" placeholder="Password">
    <button @click="login">Login</button>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
      showLoginPage: false
    };
  },
  methods: {
    login() {
      if (this.username === 'admin' && this.password === 'password') {
        // Successful login
        alert('Login successful!');
      } else {
        // Failed login
        this.error = 'Invalid username or password';
      }
    }
  }
};
</script>

<style scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
}

#app {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

h2 {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

input[type="text"],
input[type="password"] {
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.error {
  color: red;
  text-align: center;
}

</style>
