<template>
  <div class="alles">
    <div class="head">
    <h2>Name</h2>
      <input type="text" v-model="name" class="input">
      <button @click="fetchProducts()" class="Login">Login</button>
      <h2>Products</h2>
    </div>
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
    <div class="cart-container">
      <h2>Shopping Cart</h2>
      <h3>Hello {{confirmedName}}</h3>
      <ul>
    
        <li v-for="cartItem in cart" :key="cartItem.id" class="cart-item">
          
          <div class="cart-item-name">{{ cartItem.name }}</div>
          <div class="cart-item-price">{{ cartItem.price }} €</div>
          
        </li>
      </ul>
      
      <h3 class="total">Total: {{ total }}€</h3>
      <div class="buttons-bottom">
      <button @click="checkout()" class="checkout-btn">Save Cart</button>
      <button @click="cancel()" class="cancel-btn">Delete Cart</button>
    </div>
    </div>
    
  </div>
</template>
<script>
 import image from "./assets/Astonaloshirt.jpg"
 import image2 from "./assets/AloCap.jpg"
 import image3 from "./assets/AloCapB.jpg"
 import image4 from "./assets/polo-bwt-alpine.jpg"
 import image5 from "./assets/AlpineCap.jpg"
 import image6 from "./assets/AlpineJacket.jpg"
 import image7 from "./assets/Verstappen.jpg"
 import image8 from "./assets/JacketRedbull.jpg"
 import image9 from "./assets/RBRucksack.jpg"
 import image10 from "./assets/MCLShirt.jpg"
 import image11 from "./assets/MCLCap.jpg"
 import image12 from "./assets/BeanMCL.jpg"

export default {
  data() {
    return {
      products: [
        { id: 1, name: 'Alonso AMF1 2023 Shirt', price: 68.95, img:image },
        { id: 2, name: 'Kimoa Alonso x AMF1 Lifestyle Cap - Green', price: 44.95, img: image2 },
        { id: 3, name: 'Kimoa Alonso x AMF1 Lifestyle Cap - Black', price: 44.95, img: image3 },
        { id: 4, name: 'BWT ALPINE F1® Team Polo Black', price: 85.00, img: image4 },
        { id: 5, name: 'BWT ALPINE F1® Team NEW ERA iridescent marine cap', price: 43.00, img: image5 },
        { id: 6, name: 'BWT ALPINE F1® Team Black Jacket', price: 250.00, img: image6 },
        { id: 7, name: 'Official Teamline Max Verstappen Poloshirt', price: 84.95, img: image7 },
        { id: 8, name: 'Official Teamline Softshell-Jacke', price: 139.95, img: image8 },
        { id: 9, name: 'Großer Official Teamline Koffer', price: 289.95, img: image9 },
        { id: 10, name: 'MENS McLAREN REPLICA POLO SHIRT', price: 76.95, img: image10 },
        { id: 11, name: 'REPLICA TEAM CASTORE x McLAREN 9FORTY SNAPBACK - NEW ERA', price: 43.95, img: image11 },
        { id: 12, name: 'ESSENTIAL CUFF BEANIE - NEW ERA', price: 27.95, img: image12 },
      ],
      cart: [],
      name: '',
      confirmedName: '',
      filteredCart:[],
    }
  },
  computed: {
    total() {
      return this.cart.reduce((acc, item) => acc + item.price, 0)
    }
  },
 
  methods: {
    cancel(){
      this.confirmedName = '';
      this.cart=[];
    },
    addToCart(product) {
      this.cart.push(product)
    
    },
    fetchProducts(){
      this.confirmedName = this.name;
      fetch(
        "https://vue-best-content-do-not-open-default-rtdb.europe-west1.firebasedatabase.app/checkout.json"
        ).then((response) => {
          return response.json();
        })
        .then((data) => {
          
          const results = [];
          if(!data) {
            this.devices = results;
            return;
          }

          let newData = Object.entries(data);
         
          for(let i = 0; i < newData.length; i++) {
              
            if(this.name === newData[i][1][newData[i][1].length-1])
            {
              
              for(let j =0; j< newData[i][1].length-1; j++)
              {
                
                results.push({
                    id: newData[i][1][j].id,
                    name: newData[i][1][j].name,
                    price: newData[i][1][j].price,
              
                });      
              }
            }
              
          }
          this.filteredCart=results
          for(let x =0; x<results.length; x++)
          {
            this.cart.push(results[x])
          }
            
          
          console.log(this.cart)
          
         
      })
    },
    filterName(){

    },
      checkout() {
        if(this.cart.length>0){
      this.cart.push(this.name)
      // Perform checkout here, for example by sending the cart data to an API
      fetch("https://vue-best-content-do-not-open-default-rtdb.europe-west1.firebasedatabase.app/checkout.json",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.cart)
               
            }).then((respone)=>console.log(respone))
      
      this.cart = []
      this.confirmedName= ''
        }else
        {return}
      }

  }
}

 
</script>
<style scoped>
.alles{
  font-family: "Comic Sans MS", "Comic Sans", cursive;
  font-weight: 950;
  background: lightgrey;
}
.head
{
  display: flex;
  align-items: center;
  flex-direction: column;
}
.products-container {
  display: flex;
  flex-wrap: wrap ;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  
  gap:50px;
  
 
}
.buttons-bottom{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  
 
}
.input{
  background-color: #62529c;
        border: none;
        color: #fff;
        padding: 15px 30px;
        text-decoration:dotted;
        margin: 4px 2px;
        cursor: pointer;
        transition: all 0.3s ease ;
        font-size: large;
}
.input:hover{
  background-color: grey;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
    transition: all 0.3s ease
  }
  .add-to-cart-btn:hover{
    background-color: blue;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .checkout-btn {
    width: 150px;
    background-color: green;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 10px;
    width: 150px;
    padding: 10px 20px;
    transition: all 0.3s ease
  }
  
  .checkout-btn:hover{
    background-color: blue;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .cancel-btn
  {
    width: 150px;
    background-color: red;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 10px;
    padding: 10px 20px;
    transition: all 0.3s ease
  }
  .cancel-btn:hover{
    background-color: blue;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .Login{
    margin-top: 20px;
    padding: 10px 20px;
    background-color: magenta;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .Login:hover{
    background-color: blue;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  img {
    width: 490px;
    object-fit:scale-down;
    transition: all 0.3s ease;
    cursor:zoom-in;
    
    
  }
  img:active{
    transform: scale(2.5);
    box-shadow: 0 4px 6px black;
    position:absolute;
    left: 44.5rem;
    cursor:zoom-out;
  }
  .cart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 400px;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid gray;
  }
  .product-price
  {
    align-items: center;
    justify-items: center;
    margin: auto;
  }
</style>