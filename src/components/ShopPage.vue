<template>
  <div class="alles" v-if="showNavbar">
    <nav class="navigationWrapper">
      <div class="logoWrapper"></div>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/login">LogIn</router-link> |
        <router-link to="/cart">Shopping Cart</router-link> |
        <router-link to="/signup">SignUp</router-link>
      </div>
    </nav>
    <router-view/>
    <div v-if="isLoggedIn">
      <shopping-cart :loggedInUsername="loggedInUsername" :addToCart="addToCart" v-if="loggedInUsername" />
    </div>
    <p v-if="loggedInUsername">Logged-in username: {{ loggedInUsername }}</p>
    <div class="products-container">
      <div v-for="product in products" :key="product.id" class="product-item">
        <img :src="product.img" alt="product image">
        <div class="product-info">
          <div class="product-name">{{ product.name }}</div>
          <div class="product-price">{{ product.price }} €</div>
        </div>
        <button @click="addToCart(product)" class="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  </div>
  <div v-else>
    <router-view/>
  </div>
</template>

<script>
import Astonaloshirt from "@/assets/Astonaloshirt.jpg";
import AloCap from "@/assets/AloCap.jpg";
import AloCapB from "@/assets/AloCapB.jpg";
import PoloBwtAlpine from "@/assets/polo-bwt-alpine.jpg";
import AlpineCap from "@/assets/AlpineCap.jpg";
import AlpineJacket from "@/assets/AlpineJacket.jpg";
import Verstappen from "@/assets/Verstappen.jpg";
import JacketRedbull from "@/assets/JacketRedbull.jpg";
import RBRucksack from "@/assets/RBRucksack.jpg";
import McLarenTshirt from "@/assets/MCLShirt.jpg";
import McLarenCap from "@/assets/MCLCap.jpg";
import McLarenBeanie from "@/assets/BeanMCL.jpg";

export default {
  components: {

  },
  props: {},
  data() {
    return {
      showNavbar: true,
      loggedInUsername: '',
      isLoggedIn: false,
      products: [
        { id: 1, name: 'Alonso AMF1 2023 Shirt', price: 68.95, img: Astonaloshirt },
        { id: 2, name: 'Kimoa Alonso x AMF1 Lifestyle Cap - Green', price: 44.95, img: AloCap },
        { id: 3, name: 'Kimoa Alonso x AMF1 Lifestyle Cap - Black', price: 44.95, img: AloCapB },
        { id: 4, name: 'BWT ALPINE F1® Team Polo Black', price: 85.00, img: PoloBwtAlpine },
        { id: 5, name: 'BWT ALPINE F1® Team NEW ERA iridescent marine cap', price: 43.00, img: AlpineCap },
        { id: 6, name: 'BWT ALPINE F1® Team Black Jacket', price: 250.00, img: AlpineJacket },
        { id: 7, name: 'Official Teamline Max Verstappen Poloshirt', price: 84.95, img: Verstappen },
        { id: 8, name: 'Official Teamline Softshell-Jacke', price: 139.95, img: JacketRedbull },
        { id: 9, name: 'Red Bull Racing Rucksack', price: 79.95, img: RBRucksack },
        { id: 10, name: 'McLaren F1® T-Shirt', price: 59.95, img: McLarenTshirt },
        { id: 11, name: 'McLaren F1® Lifestyle Cap', price: 39.95, img: McLarenCap },
        { id: 12, name: 'McLaren F1® Beanie', price: 34.95, img: McLarenBeanie },
      ],
      name: "",
    };
  },
  mounted() {
    this.checkNavbarVisibility();
  },
  watch: {
    '$route'() {
      this.checkNavbarVisibility();
    }
  },
  methods: {
    loadHome() {
      this.$router.push('/home');
    },
    onLoginSuccess(username) {
      this.loggedInUsername = username;
    },
    handleLoginSuccess(username) {
      this.loggedInUsername = username;
      this.isLoggedIn = true;
    },
    addToCart(product) {
      console.log('Adding to cart:', product);
    },
    checkNavbarVisibility() {
      const hiddenRoutes = ['/login', '/signup'];
      this.showNavbar = !hiddenRoutes.includes(this.$route.path);
    }
  },
};
</script>

<style scoped>
.alles {
  font-family: "Comic Sans MS", "Comic Sans", cursive;
  font-weight: 950;
  background: lightgrey;
}

.products-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 50px;
}

.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: auto;
  height: auto;
  padding: 10px;
  margin-bottom: 10px;
  background: whitesmoke;
  border: 1px solid gray;
}

.product-name {
  font-weight: bold;
}

.product-price {
  font-style: italic;
  text-align: center;
}

.add-to-cart-btn {
  padding: 10px 20px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-to-cart-btn:hover {
  background-color: blue;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

img {
  width: 490px;
  object-fit: scale-down;
  transition: all 0.3s ease;
  cursor: zoom-in;
}

img:active {
  transform: scale(2.5);
  box-shadow: 0 4px 6px black;
  position: absolute;
  left: 44.5rem;
  cursor: zoom-out;
}

li {
  opacity: 1;
  list-style-type: none;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
}

.alles {
  font-family: "Comic Sans MS", "Comic Sans", cursive;
  font-weight: 950;
  background: lightgrey;
  overflow: hidden;
  width: 100%;
}

.head {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.buttons-bottom {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}

.logoWrapper {
  display: flex;
}

.navigationWrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  background-color: #222;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.25);
  color: white;
  text-transform: uppercase;
  overflow: hidden;
  width: 100%;
}

.navigation {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.parent {
  padding: 0 10px;
  cursor: pointer;
}

.link {
  position: relative;
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  color: white;
}

.link:hover {
  color: #ea4f4c;
}

.navigation-left,
.navigation-right {
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
}

.navigation-left {
  left: 20px;
}

.navigation-right {
  right: 20px;
}
</style>
