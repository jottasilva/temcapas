<template>
    <div class="cart-modal" v-if="isOpen">
      <div class="cart-overlay" @click="closeCart"></div>
      <div class="cart-container">
        <div class="cart-header">
          <h2>Seu Carrinho</h2>
          <button class="close-btn" @click="closeCart">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="cart-content">
          <div v-if="items.length === 0" class="empty-cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <p>Seu carrinho está vazio</p>
            <button class="continue-shopping" @click="closeCart">Continuar Comprando</button>
          </div>
          
          <div v-else class="cart-items">
            <div v-for="(item, index) in items" :key="index" class="cart-item">
              <div class="item-image">
                <img :src="item.image" :alt="item.name">
              </div>
              <div class="item-details">
                <h3>{{ item.name }}</h3>
                <p>{{ item.description }}</p>
                <div class="item-price">R$ {{ item.price.toFixed(2) }}</div>
              </div>
              <div class="item-actions">
                <div class="quantity-control">
                  <button @click="decreaseQuantity(index)" :disabled="item.quantity <= 1">-</button>
                  <span>{{ item.quantity }}</span>
                  <button @click="increaseQuantity(index)">+</button>
                </div>
                <button class="remove-btn" @click="removeItem(index)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="items.length > 0" class="cart-footer">
          <div class="cart-total">
            <span>Total:</span>
            <span class="total-price">R$ {{ totalPrice.toFixed(2) }}</span>
          </div>
          <div class="cart-actions">
            <button class="checkout-btn" @click="checkout">Finalizar Compra</button>
            <button class="continue-btn" @click="closeCart">Continuar Comprando</button>
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
          // Itens de exemplo - em produção, seriam carregados do estado da aplicação
          // {
          //   id: 1,
          //   name: 'Capinha Personalizada',
          //   description: 'iPhone 12 - Design Floral',
          //   price: 49.90,
          //   quantity: 1,
          //   image: '/api/placeholder/80/80'
          // }
        ]
      }
    },
    computed: {
      totalPrice() {
        return this.items.reduce((total, item) => {
          return total + (item.price * item.quantity)
        }, 0)
      }
    },
    methods: {
      closeCart() {
        this.$emit('close')
      },
      increaseQuantity(index) {
        this.items[index].quantity += 1
      },
      decreaseQuantity(index) {
        if (this.items[index].quantity > 1) {
          this.items[index].quantity -= 1
        }
      },
      removeItem(index) {
        this.items.splice(index, 1)
      },
      checkout() {
        alert('Redirecionando para checkout...')
        // Aqui seria implementada a lógica de checkout
      }
    },
    mounted() {
      // Adicione event listeners para teclas de escape para fechar o modal
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.closeCart()
        }
      })
      
      // Event listener para adicionar produtos ao carrinho
      window.addEventListener('add-item-to-cart', (event) => {
        const newItem = event.detail
        
        // Verificar se o item já existe no carrinho
        const existingItemIndex = this.items.findIndex(item => item.id === newItem.id)
        
        if (existingItemIndex !== -1) {
          // Se o item já existe, aumenta a quantidade
          this.items[existingItemIndex].quantity += 1
        } else {
          // Se não existe, adiciona ao carrinho
          this.items.push({
            ...newItem,
            quantity: 1
          })
        }
        
        // Emite evento para atualizar o contador no cabeçalho
        this.$emit('update-cart-count', this.items.length)
      })
    }
  }
  </script>
  
  <style scoped>
  .cart-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    display: flex;
    justify-content: flex-end;
  }
  
  .cart-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1001;
  }
  
  .cart-container {
    position: relative;
    width: 400px;
    max-width: 90%;
    height: 100%;
    background-color: white;
    z-index: 1002;
    display: flex;
    flex-direction: column;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    animation: slideIn 0.3s ease-out;
  }
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
  
  .cart-header {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .cart-header h2 {
    margin: 0;
    color: var(--primary);
    font-size: 24px;
  }
  
  .close-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--dark);
    transition: color 0.3s;
  }
  
  .close-btn:hover {
    color: var(--primary);
  }
  
  .cart-content {
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
    text-align: center;
    color: #888;
  }
  
  .empty-cart svg {
    margin-bottom: 20px;
    stroke: var(--primary);
  }
  
  .empty-cart p {
    margin-bottom: 20px;
    font-size: 18px;
  }
  
  .continue-shopping {
    background-color: var(--primary);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 30px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s;
  }
  
  .continue-shopping:hover {
    background-color: var(--secondary);
  }
  
  .cart-items {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .cart-item {
    display: flex;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
  }
  
  .item-image {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    overflow: hidden;
    margin-right: 15px;
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
  }
  
  .item-details p {
    margin: 0 0 10px 0;
    font-size: 14px;
    color: #777;
  }
  
  .item-price {
    font-weight: 600;
    color: var(--primary);
  }
  
  .item-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
  }
  
  .quantity-control {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .quantity-control button {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid #ddd;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
  }
  
  .quantity-control button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .quantity-control span {
    margin: 0 10px;
    min-width: 20px;
    text-align: center;
  }
  
  .remove-btn {
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
    padding: 5px;
    transition: color 0.3s;
  }
  
  .remove-btn:hover {
    color: #ff4444;
  }
  
  .cart-footer {
    padding: 20px;
    border-top: 1px solid #eee;
    background-color: #f9f9f9;
  }
  
  .cart-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    font-size: 18px;
  }
  
  .total-price {
    font-weight: 700;
    color: var(--primary);
    font-size: 24px;
  }
  
  .cart-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .checkout-btn {
    background-color: var(--primary);
    color: white;
    border: none;
    padding: 15px;
    border-radius: 30px;
    cursor: pointer;
    font-weight: 600;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  
  .checkout-btn:hover {
    background-color: var(--secondary);
  }
  
  .continue-btn {
    background-color: transparent;
    border: 2px solid var(--primary);
    color: var(--primary);
    padding: 13px;
    border-radius: 30px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s;
  }
  
  .continue-btn:hover {
    background-color: var(--primary);
    color: white;
  }
  
  @media (max-width: 576px) {
    .cart-container {
      width: 100%;
    }
    
    .item-actions {
      flex-direction: row;
      align-items: center;
      margin-left: 10px;
    }
    
    .quantity-control {
      margin-bottom: 0;
      margin-right: 10px;
    }
  }
  </style>