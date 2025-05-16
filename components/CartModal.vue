<template>
  <div class="cart-modal-overlay" v-if="isOpen" @click.self="closeCart">
    <div class="cart-modal">
      <div class="cart-modal-header">
        <h2>Seu Carrinho</h2>
        <button class="close-btn" @click="closeCart" aria-label="Fechar">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <div class="cart-items-container">
        <div v-if="items.length === 0" class="empty-cart">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <p>Seu carrinho está vazio</p>
          <button class="primary-btn" @click="closeCart">Continuar Comprando</button>
        </div>
        
        <div v-else class="cart-items">
          <div v-for="(item, index) in items" :key="index" class="cart-item">
            <div class="item-image">
              <img :src="item.image" :alt="item.name">
            </div>
            <div class="item-details">
              <h3>{{ item.name }}</h3>
              <p class="item-options" v-if="item.options">{{ item.options }}</p>
              <div class="item-price">R$ {{ item.price.toFixed(2) }}</div>
            </div>
            <div class="item-quantity">
              <button @click="decrementQuantity(index)" :disabled="item.quantity <= 1">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="incrementQuantity(index)">+</button>
            </div>
            <button class="remove-btn" @click="removeItem(index)" aria-label="Remover item">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div v-if="items.length > 0" class="cart-summary">
        <div class="summary-row">
          <span>Subtotal:</span>
          <span>R$ {{ subtotal.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Frete:</span>
          <span>{{ shipping > 0 ? `R$ ${shipping.toFixed(2)}` : 'Grátis' }}</span>
        </div>
        <div class="summary-row total">
          <span>Total:</span>
          <span>R$ {{ total.toFixed(2) }}</span>
        </div>
        
        <div class="cart-actions">
          <button class="secondary-btn" @click="closeCart">Continuar Comprando</button>
          <button class="primary-btn" @click="checkout">Finalizar Compra</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      items: [
         {
           name: 'Capa Iphone 15 Pro Max',
           options: 'Vingadores, homem de ferro',
           price: 79.90,
           quantity: 1,
          image: 'https://i.imgur.com/btWhIEW_d.webp?maxwidth=760&fidelity=grand'
         }
      ],
      shipping: 0
    }
  },
  computed: {
    subtotal() {
      return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    total() {
      return this.subtotal + this.shipping;
    }
  },
  beforeUnmount() {
    window.removeEventListener('add-item-to-cart', this.addToCart);
  },
  mounted() {
    window.addEventListener('add-item-to-cart', (event) => {
      if (event.detail) {
        this.addToCart(event.detail);
      }
    });
  },
  methods: {
    closeCart() {
      this.$emit('close');
    },
    incrementQuantity(index) {
      this.items[index].quantity += 1;
      this.updateCartCount();
    },
    decrementQuantity(index) {
      if (this.items[index].quantity > 1) {
        this.items[index].quantity -= 1;
        this.updateCartCount();
      }
    },
    removeItem(index) {
      this.items.splice(index, 1);
      this.updateCartCount();
    },
    updateCartCount() {
      const totalItems = this.items.reduce((count, item) => count + item.quantity, 0);
      this.$emit('update-count', totalItems);
    },
    checkout() {
      alert('Redirecionando para checkout');
    },
    addToCart(item) {
      const existingItem = this.items.find(i => 
        i.name === item.name && i.options === item.options
      );
      
      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        this.items.push({...item, quantity: item.quantity || 1});
      }
      
      this.updateCartCount();
    }
  }
}
</script>

<style scoped>
.cart-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  z-index: 1000;
  overflow-y: auto;
  transition: all 0.3s ease;
}

.cart-modal {
  width: 100%;
  max-width: 40vw;
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transform: translateX(0);
  transition: transform 0.3s ease;
}

.cart-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.cart-modal-header h2 {
  margin: 0;
  font-size: 24px;
  color: var(--dark);
}

.close-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  color: var(--dark);
  transition: color 0.2s ease;
}

.close-btn:hover {
  color: var(--primary);
}

.cart-items-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 200px;
  text-align: center;
  color: #999;
}

.empty-cart svg {
  margin-bottom: 20px;
}

.empty-cart p {
  margin-bottom: 20px;
  font-size: 18px;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  position: relative;
}

.item-image {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  margin-right: 15px;
  border-radius: 8px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-details h3 {
  margin: 0 0 5px 0;
  font-size: 16px;
  font-weight: 500;
}

.item-options {
  margin: 0 0 5px 0;
  font-size: 14px;
  color: #777;
}

.item-price {
  font-weight: 500;
  color: var(--primary);
}

.item-quantity {
  display: flex;
  align-items: center;
  margin: 0 15px;
}

.item-quantity button {
  width: 30px;
  height: 30px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease;
}

.item-quantity button:hover:not(:disabled) {
  background-color: #eee;
}

.item-quantity button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.item-quantity span {
  margin: 0 10px;
  min-width: 20px;
  text-align: center;
}

.remove-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: #999;
  transition: color 0.2s ease;
  padding: 5px;
}

.remove-btn:hover {
  color: #ff4d4d;
}

.cart-summary {
  background-color: #f9f9f9;
  padding: 20px;
  border-top: 1px solid #eee;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 16px;
}

.summary-row.total {
  font-weight: 700;
  font-size: 18px;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.cart-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.primary-btn, .secondary-btn {
  padding: 12px 20px;
  border-radius: 30px;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid var(--primary);

}

.primary-btn {
  background-color: var(--primary);
  color: white;

}

.primary-btn:hover {
  background-color: var(--primary-dark, #0056b3);
  border-color: var(--primary-dark, #0056b3);
}

.secondary-btn {
  background-color: transparent;
  color: var(--primary);
}

.secondary-btn:hover {
  background-color: rgba(0, 123, 255, 0.1);
}

/* Media queries para responsividade */
@media (max-width: 768px) {
  .cart-modal {
    max-width: 100%;
    width: 100%;
  }
  
  .item-image {
    width: 60px;
    height: 60px;
  }
  
  .cart-actions {
    flex-direction: column;
  }
}
</style>