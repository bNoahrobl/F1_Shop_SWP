
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
    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="product-item">
        <div class="product-name">{{ product.name }}</div>
        <div class="product-price">{{ product.price }} €</div>
        <button @click="addToCart(product)" class="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
    <button class="checkout-button" @click="checkout">Checkout</button>
  </div>
</template>
<script>
import image from "./assets/Astonaloshirt.jpg";
import image2 from "./assets/AloCap.jpg";
import image3 from "./assets/AloCapB.jpg";
import image4 from "./assets/polo-bwt-alpine.jpg";
import image5 from "./assets/AlpineCap.jpg";
import image6 from "./assets/AlpineJacket.jpg";
import image7 from "./assets/Verstappen.jpg";
import image8 from "./assets/JacketRedbull.jpg";
import image9 from "./assets/RBRucksack.jpg";
import image10 from "./assets/MCLShirt.jpg";
import image11 from "./assets/MCLCap.jpg";
import image12 from "./assets/BeanMCL.jpg";

export default {
  data() {
    return {
      products: [
        { id: 1, name: "Alonso AMF1 2023 Shirt", price: 68.95, img: image },
        { id: 2, name: "Kimoa Alonso x AMF1 Lifestyle Cap - Green", price: 44.95, img: image2 },
        { id: 3, name: "Kimoa Alonso x AMF1 Lifestyle Cap - Black", price: 44.95, img: image3 },
        { id: 4, name: "BWT ALPINE F1® Team Polo Black", price: 85.0, img: image4 },
        { id: 5, name: "BWT ALPINE F1® Team NEW ERA iridescent marine cap", price: 43.0, img: image5 },
        { id: 6, name: "BWT ALPINE F1® Team Black Jacket", price: 250.0, img: image6 },
        { id: 7, name: "Official Teamline Max Verstappen Poloshirt", price: 84.95, img: image7 },
        { id: 8, name: "Official Teamline Softshell-Jacke", price: 139.95, img: image8 },
        { id: 9, name: "Großer Official Teamline Koffer", price: 289.95, img: image9 },
        { id: 10, name: "MENS McLAREN REPLICA POLO SHIRT", price: 76.95, img: image10 },
        { id: 11, name: "REPLICA TEAM CASTORE x McLAREN 9FORTY SNAPBACK - NEW ERA", price: 43.95, img: image11 },
        { id: 12, name: "ESSENTIAL CUFF BEANIE - NEW ERA", price: 27.95, img: image12 },
      ],
      cart: [],
      name: "",
      confirmedName: "",
      filteredCart: [],
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
      const index = this.filteredCart.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        this.filteredCart.splice(index, 1);
      }
    },
    calculateTotal() {
      return this.filteredCart.reduce((total, item) => total + item.price, 0);
    },
    addToCart(product) {
      this.cart.push(product);
    },
    checkout() {
      if (this.cart.length > 0) {
        this.cart.push(this.name);
        // Perform checkout here, for example by sending the cart data to an API
        fetch("https://vue-best-content-do-not-open-default-rtdb.europe-west1.firebasedatabase.app/checkout.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.cart),
        })
          .then((response) => response.json())
          .then(() => {
            // Handle the response from the API if needed
          })
          .catch((error) => {
            console.error("An error occurred during checkout:", error);
          });

        this.cart = [];
        this.confirmedName = "";
      }
    },
  },
};
</script>
<style scoped>
/* Existing styles... */

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.product-item {
  border: 1px solid #ddd;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.product-name {
  font-weight: bold;
  margin-bottom: 10px;
}

.product-price {
  margin-bottom: 10px;
}

.add-to-cart-btn {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

.add-to-cart-btn:hover {
  background-color: #45a049;
}

.cart-container {
  margin-top: 20px;
}

.cart-item {
  border: 1px solid #ddd;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.cart-item-name {
  flex-grow: 1;
  margin-right: 10px;
}

.cart-item-price {
  font-weight: bold;
}

.cart-total {
  font-weight: bold;
  margin-top: 10px;
}

.checkout-button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #2196f3;
  color: white;
  border: none;
  cursor: pointer;
}

.checkout-button:hover {
  background-color: #0b7dda;
}
</style>