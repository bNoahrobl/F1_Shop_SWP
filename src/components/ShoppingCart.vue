<template>
    <div class="shopping-cart">
      <h2>Shopping Cart</h2>
      <div v-if="cart.length === 0" class="empty-cart">Your cart is empty</div>
      <div v-else>
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <div class="item-info">
            <img :src="require('@/assets/' + item.img)" alt="product image">
            <div class="item-details">
              <div class="item-name">{{ item.name }}</div>
              <div class="item-price">{{ item.price }} €</div>
            </div>
          </div>
          <button @click="removeFromCart(item)" class="remove-btn">Remove</button>
        </div>
        <div class="cart-total">Total: {{ calculateTotal() }} €</div>
        <div class="checkout-buttons">
          <button @click="checkout" class="checkout-btn">Checkout</button>
          <button @click="cancel" class="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      cart: {
        type: Array,
        default: () => []
      }
    },
  
    methods: {
      removeFromCart(item) {
        const index = this.cart.findIndex(cartItem => cartItem.id === item.id);
        if (index !== -1) {
          this.cart.splice(index, 1);
        }
      },
  
      calculateTotal() {
        return this.cart.reduce((total, item) => total + item.price, 0).toFixed(2);
      },
  
      checkout() {
        this.$emit('checkout');
      },
  
      cancel() {
        this.$emit('cancel');
      },
    },
  };
  </script>
  
  <style scoped>
  .shopping-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  h2 {
    margin-bottom: 20px;
  }
  
  .empty-cart {
    margin-bottom: 20px;
  }
  
  .cart-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .item-info {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
  
  .item-details {
    margin-left: 10px;
  }
  
  .item-name {
    font-weight: bold;
  }
  
  .remove-btn {
    margin-left: 10px;
  }
  
  .cart-total {
    font-weight: bold;
    margin-top: 10px;
  }
  
  .checkout-buttons {
    display: flex;
    margin-top: 20px;
  }
  
  .checkout-btn {
    margin-right: 10px;
  }
  
  .cancel-btn {
    background-color: #ccc;
    color: white;
  }
  </style>
  