<template>
  <div class="cart-page">
    <h2 class="cart-title">Shopping Cart</h2>
    <div v-if="filteredCart.length === 0" class="empty-cart-message">
      Your cart is empty.
    </div>
    <div v-else>
      <div v-for="item in filteredCart" :key="item.id" class="cart-item">
        <div class="item-name">{{ item.name }}</div>
        <div class="item-price">{{ item.price }} €</div>
        <button @click="removeFromCart(item)" class="remove-from-cart-btn">Remove</button>
      </div>
      <div class="cart-summary">
        <div class="cart-total">Total: {{ calculateTotal() }} €</div>
      </div>
    </div>
    <button class="checkout-button" @click="checkout">Checkout</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filteredCart: [],
      cart: [],
      name: '',
      confirmedName: ''
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      this.confirmedName = this.name;
      fetch("https://vue-best-content-do-not-open-default-rtdb.europe-west1.firebasedatabase.app/checkout.json")
        .then((response) => response.json())
        .then((responseData) => {
          const results = [];

          if (!responseData) {
            this.devices = results;
            return;
          }

          const newData = Object.entries(responseData);

          for (let i = 0; i < newData.length; i++) {
            if (this.name === newData[i][1][newData[i][1].length - 1]) {
              for (let j = 0; j < newData[i][1].length - 1; j++) {
                results.push({
                  id: newData[i][1][j].id,
                  name: newData[i][1][j].name,
                  price: newData[i][1][j].price,
                });
              }
            }
          }

          this.filteredCart = results;

          for (let x = 0; x < results.length; x++) {
            this.cart.push(results[x]);
          }

          console.log(this.cart);
        })
        .catch((error) => {
          console.error("An error occurred while fetching products:", error);
        });
    },
    removeFromCart(item) {
      const index = this.filteredCart.findIndex(i => i.id === item.id);
      if (index !== -1) {
        this.filteredCart.splice(index, 1);
      }
    },
    calculateTotal() {
      return this.filteredCart.reduce((total, item) => total + item.price, 0);
    },
    checkout() {
      if (this.cart.length > 0) {
        this.cart.push(this.name);
        // Perform checkout here, for example by sending the cart data to an API
        fetch("https://vue-best-content-do-not-open-default-rtdb.europe-west1.firebasedatabase.app/checkout.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.cart)
        })
        .then(response => response.json())
          .then(() => {
            // Handle the response from the API if needed
          })
          .catch(error => {
            console.error("An error occurred during checkout:", error);
          });

        this.cart = [];
        this.confirmedName = '';
      }
    }
  }
};
</script>

<style scoped>
/* Existing styles... */
</style>