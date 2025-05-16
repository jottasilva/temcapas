// components/CartItem.vue
<template>
  <div class="cart-item">
    <div class="cart-item__image">
      <img v-if="item.image" :src="item.image" :alt="item.name" />
      <div v-else class="cart-item__image-placeholder"></div>
    </div>
    
    <div class="cart-item__content">
      <h3 class="cart-item__name">{{ item.name }}</h3>
      <p class="cart-item__price">{{ formatPrice(item.price) }}</p>
      
      <div class="cart-item__quantity">
        <button 
          class="cart-item__quantity-btn" 
          @click="decrementQuantity(item.id)"
          aria-label="Diminuir quantidade"
        >
          -
        </button>
        
        <input
          type="number"
          class="cart-item__quantity-input"
          :value="item.quantity"
          min="1"
          @change="(e) => updateQuantity(item.id, parseInt(e.target.value))"
          aria-label="Quantidade do produto"
        />
        
        <button 
          class="cart-item__quantity-btn" 
          @click="incrementQuantity(item.id)"
          aria-label="Aumentar quantidade"
        >
          +
        </button>
      </div>
    </div>
    
    <div class="cart-item__subtotal">
      <p>{{ formatPrice(item.price * item.quantity) }}</p>
    </div>
    
    <button 
      class="cart-item__remove-btn" 
      @click="removeFromCart(item.id)"
      aria-label="Remover item"
    >
      &times;
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useCart } from '~/composables/useCart';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const { removeFromCart, updateQuantity, incrementQuantity, decrementQuantity } = useCart();

// Função para formatar o preço
const formatPrice = (price) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
};
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.cart-item__image {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}

.cart-item__image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.cart-item__image-placeholder {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}

.cart-item__content {
  flex: 1;
}

.cart-item__name {
  margin: 0 0 0.5rem;
  font-size: 1rem;
}

.cart-item__price {
  margin: 0 0 0.5rem;
  color: #555;
}

.cart-item__quantity {
  display: flex;
  align-items: center;
}

.cart-item__quantity-input {
  width: 40px;
  text-align: center;
  margin: 0 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.25rem;
}

.cart-item__quantity-btn {
  width: 30px;
  height: 30px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.cart-item__subtotal {
  margin: 0 1rem;
  font-weight: bold;
}

.cart-item__remove-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
  padding: 0.25rem 0.5rem;
}

.cart-item__remove-btn:hover {
  color: #f44336;
}
</style>