<template>
 <div class="login-page">
    <h2 class="login-title">Login</h2>
    <div class="input-group">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" class="input-field" placeholder="Username">
    </div>
    <div class="input-group">
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" class="input-field" placeholder="Password">
    </div>
    <button class="login-button" @click="login">Login</button>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: ''
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
.login-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f2f2f2;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.login-title {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.login-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  border: none;
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #45a049;
}

.error {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}
</style>
