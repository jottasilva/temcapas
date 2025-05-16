// components/ShoppingCart.vue
<template>
  <div class="shopping-cart">
    <h2 class="shopping-cart__title">Seu Carrinho</h2>
    
    <div v-if="isEmpty" class="shopping-cart__empty">
      <p>Seu carrinho está vazio.</p>
      <slot name="empty-cart-action">
        <button class="shopping-cart__continue-btn" @click="$emit('continue-shopping')">
          Continuar Comprando
        </button>
      </slot>
    </div>
    
    <template v-else>
      <!-- Lista de itens -->
      <div class="shopping-cart__items">
        <cart-item
          v-for="item in items"
          :key="item.id"
          :item="item"
        />
      </div>
      
      <!-- Resumo do carrinho -->
      <div class="shopping-cart__summary">
        <div class="shopping-cart__summary-row">
          <span>Subtotal</span>
          <span>{{ formatPrice(totalAmount) }}</span>
        </div>
        
        <!-- Slot para campos personalizados no resumo -->
        <slot name="summary-extras"></slot>
        
        <div class="shopping-cart__summary-row shopping-cart__summary-row--total">
          <span>Total</span>
          <span>{{ formatPrice(totalAmount) }}</span>
        </div>
      </div>
      <div class="shopping-cart__actions">
        <button class="shopping-cart__clear-btn" @click="clearCart">
          Limpar Carrinho
        </button>
        
        <slot name="checkout-button">
          <button class="shopping-cart__checkout-btn" @click="$emit('checkout')">
            Finalizar Compra
          </button>
        </slot>
      </div>
    </template>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';
import { useCart } from '../composables/useCart';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits(['continue-shopping', 'checkout']);

const { items, totalAmount, isEmpty, clearCart } = useCart();
const formatPrice = (price) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
};
</script>

<style scoped>
.shopping-cart {
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #fff;
}

.shopping-cart__title {
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.shopping-cart__empty {
  text-align: center;
  padding: 2rem 0;
}

.shopping-cart__continue-btn {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.shopping-cart__items {
  margin-bottom: 1.5rem;
}

.shopping-cart__summary {
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.shopping-cart__summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.shopping-cart__summary-row--total {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  font-weight: bold;
  font-size: 1.1rem;
}

.shopping-cart__actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.shopping-cart__clear-btn {
  background: none;
  border: none;
  color: #f44336;
  cursor: pointer;
  padding: 0.5rem 1rem;
  text-decoration: underline;
}

.shopping-cart__checkout-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  cursor: pointer;
}

.shopping-cart__checkout-btn:hover {
  background-color: #45a049;
}
</style>