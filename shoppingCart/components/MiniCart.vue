// components/MiniCart.vue
<template>
  <div class="mini-cart">
    <div class="mini-cart__header">
      <h3 class="mini-cart__title">Carrinho ({{ totalItems }})</h3>
    </div>
    
    <div v-if="isEmpty" class="mini-cart__empty">
      <p>Seu carrinho está vazio</p>
    </div>
    
    <div v-else class="mini-cart__items">
      <div
        v-for="item in items"
        :key="item.id"
        class="mini-cart__item"
      >
        <div class="mini-cart__item-image">
          <img v-if="item.image" :src="item.image" :alt="item.name" />
          <div v-else class="mini-cart__item-image-placeholder"></div>
        </div>
        
        <div class="mini-cart__item-details">
          <p class="mini-cart__item-name">{{ item.name }}</p>
          <p class="mini-cart__item-price">
            {{ item.quantity }} x {{ formatPrice(item.price) }}
          </p>
        </div>
        
        <button 
          class="mini-cart__item-remove" 
          @click="removeFromCart(item.id)"
          aria-label="Remover item"
        >
          &times;
        </button>
      </div>
    </div>
    
    <div v-if="!isEmpty" class="mini-cart__footer">
      <div class="mini-cart__total">
        <span>Total:</span>
        <span>{{ formatPrice(totalAmount) }}</span>
      </div>
      
      <div class="mini-cart__actions">
        <button 
          class="mini-cart__view-cart" 
          @click="$emit('view-cart')"
        >
          Ver Carrinho
        </button>
        
        <button 
          class="mini-cart__checkout" 
          @click="$emit('checkout')"
        >
          Finalizar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';
import { useCart } from '~/composables/useCart';

const emit = defineEmits(['view-cart', 'checkout']);
const { items, totalItems, totalAmount, isEmpty, removeFromCart } = useCart();
const formatPrice = (price) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
};
</script>

<style scoped>
.mini-cart {
  width: 100%;
  max-width: 300px;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.mini-cart__header {
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
}

.mini-cart__title {
  margin: 0;
  font-size: 1rem;
}

.mini-cart__empty {
  padding: 1.5rem;
  text-align: center;
  color: #999;
}

.mini-cart__items {
  max-height: 300px;
  overflow-y: auto;
}

.mini-cart__item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid #f5f5f5;
}

.mini-cart__item-image {
  width: 40px;
  height: 40px;
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mini-cart__item-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.mini-cart__item-image-placeholder {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}

.mini-cart__item-details {
  flex: 1;
}

.mini-cart__item-name {
  margin: 0 0 0.25rem;
  font-size: 0.875rem;
  line-height: 1.2;
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mini-cart__item-price {
  margin: 0;
  font-size: 0.75rem;
  color: #666;
}

.mini-cart__item-remove {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #999;
  cursor: pointer;
  padding: 0 0.25rem;
}

.mini-cart__item-remove:hover {
  color: #f44336;
}

.mini-cart__footer {
  padding: 0.75rem;
  border-top: 1px solid #eee;
}

.mini-cart__total {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-weight: bold;
}

.mini-cart__actions {
  display: flex;
  gap: 0.5rem;
}

.mini-cart__view-cart {
  flex: 1;
  padding: 0.5rem;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
}

.mini-cart__checkout {
  flex: 1;
  padding: 0.5rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
}

.mini-cart__checkout:hover {
  background-color: #45a049;
}
</style>