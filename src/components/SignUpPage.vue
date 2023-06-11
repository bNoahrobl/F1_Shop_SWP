<template>
    <div class="signup-page">
      <h2 class="signup-title">Sign Up</h2>
      <div class="input-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" class="input-field" placeholder="Username">
      </div>
      <div class="input-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" class="input-field" placeholder="Password">
      </div>
      <button class="signup-button" @click="signup">Sign Up</button>
      <div v-if="isRegistered">
        <router-link to="/login"></router-link>
      </div>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        error: '',
        username: '',
        password: '',
        users: null,
        isRegistered: false,
      };
    },
    methods: {
      async signup() {
        try {
          const response = await fetch('https://f1-shop-588b7-default-rtdb.europe-west1.firebasedatabase.app/users.json');
          const data = await response.json();
  
          const dataArray = Object.values(data); // Convert the response data into an array
  
          const userExists = dataArray.some(u => u.username === this.username);
  
          if (userExists) {
            // User already exists
            this.error = 'Username already taken';
          } else {
            // Register new user
            const newUser = {
              username: this.username,
              password: this.password,
            };
  
            // Save new user to the database (Firebase example)
            const saveResponse = await fetch('https://f1-shop-588b7-default-rtdb.europe-west1.firebasedatabase.app/users.json', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newUser),
            });
  
            if (saveResponse.ok) {
              // Successful registration
              alert('Registration successful!');
              this.isRegistered = true;
              this.$router.push('/login');
            } else {
              // Failed registration
              this.error = 'Failed to register. Please try again later.';
            }
          }
        } catch (error) {
          console.error(error);
          this.error = 'An error occurred during sign up: ' + error;
        }
      },
    }
  };
  </script>
  
  <style scoped>
  .signup-page {
    margin: 0 auto;
    padding: 30px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f2f2f2;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    width: 90%; /* Set the width to a percentage value */
    max-width: 400px; /* Set a maximum width for smaller screens */
  }
  
  /* Center the sign-up page horizontally */
  @media (min-width: 768px) {
    .signup-page {
      margin-left: auto;
      margin-right: auto;
    }
  }
  
  .signup-title {
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
  
  .signup-button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #428bca;
    border: none;
    color: #fff;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
  
  .signup-button:hover {
    background-color: #3071a9;
  }
  
  .error {
    color: red;
    margin-top: 10px;
    font-size: 14px;
  }
  </style>
  