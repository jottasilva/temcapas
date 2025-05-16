// components/CartDrawer.vue
<template>
  <div>

    <button 
      class="cart-drawer__toggle"
      @click="isOpen = !isOpen"
      aria-label="Abrir carrinho"
    >
      <div class="cart-drawer__toggle-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span v-if="totalItems > 0" class="cart-drawer__toggle-badge">{{ totalItems }}</span>
      </div>
      <span class="cart-drawer__toggle-text">Carrinho</span>
    </button>

    <div 
      v-if="isOpen" 
      class="cart-drawer__overlay"
      @click="isOpen = false"
    ></div>
    
 
    <div 
      class="cart-drawer__container" 
      :class="{ 'cart-drawer__container--open': isOpen }"
    >
      <div class="cart-drawer__header">
        <h2 class="cart-drawer__title">Seu Carrinho</h2>
        <button 
          class="cart-drawer__close"
          @click="isOpen = false"
          aria-label="Fechar carrinho"
        >
          &times;
        </button>
      </div>
      
      <div class="cart-drawer__content">
        <ShoppingCart @checkout="handleCheckout" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCart } from '../composables/useCart';
import ShoppingCart from '../components/shoppingCart.vue';
const isOpen = ref(false);
const { totalItems } = useCart();
const handleCheckout = () => {
  isOpen.value = false;
};
</script>

<style scoped>
.cart-drawer__toggle {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.cart-drawer__toggle-icon {
  position: relative;
  margin-right: 0.5rem;
}

.cart-drawer__toggle-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #f44336;
  color: white;
  border-radius: 50%;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
}

.cart-drawer__overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.cart-drawer__container {
  position: fixed;
  top: 0;
  right: -100%;
  width: 100%;
  max-width: 400px;
  height: 100%;
  background-color: #fff;
  z-index: 999;
  transition: right 0.3s ease;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.cart-drawer__container--open {
  right: 0;
}

.cart-drawer__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.cart-drawer__title {
  margin: 0;
  font-size: 1.25rem;
}

.cart-drawer__close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
}

.cart-drawer__content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

@media (min-width: 768px) {
  .cart-drawer__container {
    right: -400px;
  }
}
</style>