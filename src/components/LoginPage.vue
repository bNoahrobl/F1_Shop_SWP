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
    <div v-if="LoggedIn">
      <router-link to="/"></router-link>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  props: {
    isLoggedIn: {
      type: Boolean,
      default: false
    },
    loginSuccess: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      error: '',
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch('https://f1-shop-588b7-default-rtdb.europe-west1.firebasedatabase.app/users.json');
        const data = await response.json();

        const dataArray = Object.values(data);

        const loggedInUser = dataArray.find(u => u.LoggedIn === true);
        if (loggedInUser) {
          this.error = 'Another user is already logged in. Please log out before logging in.';
          return;
        }

        const user = dataArray.find(u => u.username === this.username && u.password === this.password);

        if (user) {
          alert('Login successful!');
          user.LoggedIn = true; 
          const userId = Object.keys(data).find(key => data[key].username === user.username);
          await fetch(`https://f1-shop-588b7-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ LoggedIn: true })
          });
        } else {
          this.error = 'Invalid username or password';
        }
      } catch (error) {
        console.error(error);
        this.error = 'An error occurred during login: ' + error;
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  margin: 0 auto;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f2f2f2;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 90%; /* Set the width to a percentage value */
  max-width: 400px; /* Set a maximum width for smaller screens */
}

/* Center the login page horizontally */
@media (min-width: 768px) {
  .login-page {
    margin-left: auto;
    margin-right: auto;
  }
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