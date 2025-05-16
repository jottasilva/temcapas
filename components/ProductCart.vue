<template>
    <div class="product-card">
      <div class="product-image">
        <img :src="product.image || '/api/placeholder/300/300'" :alt="product.name">
      </div>
      
      <div class="product-info">
        <h3 class="product-title">{{ product.name }}</h3>
        <p class="product-price">R$ {{ product.price.toFixed(2) }}</p>
        
        <!-- Opções de produto (se disponíveis) -->
        <div class="product-options" v-if="product.hasOptions">
          <div class="size-options">
            <span class="option-label">Tamanho:</span>
            <div class="option-buttons">
              <button 
                v-for="size in sizes" 
                :key="size" 
                :class="{ active: selectedSize === size }"
                @click="selectedSize = size"
                type="button"
              >
                {{ size }}
              </button>
            </div>
          </div>
          
          <div class="color-options">
            <span class="option-label">Cor:</span>
            <div class="option-buttons">
              <button 
                v-for="color in colors" 
                :key="color.name" 
                :class="{ active: selectedColor === color.name }"
                @click="selectedColor = color.name"
                :style="{ backgroundColor: color.hex }"
                type="button"
              >
                <span class="visually-hidden">{{ color.name }}</span>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Quantidade e botão de adicionar ao carrinho -->
        <div class="purchase-actions">
          <div class="quantity-selector">
            <button @click="decreaseQuantity" type="button">-</button>
            <span>{{ quantity }}</span>
            <button @click="increaseQuantity" type="button">+</button>
          </div>
          
          <button class="add-to-cart-btn" @click="addProductToCart" type="button">
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProductCard',
    props: {
      product: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        quantity: 1,
        selectedSize: 'M',
        selectedColor: 'Azul',
        sizes: ['P', 'M', 'G', 'GG'],
        colors: [
          { name: 'Branco', hex: '#FFFFFF' },
          { name: 'Preto', hex: '#000000' },
          { name: 'Azul', hex: '#0055FF' },
          { name: 'Vermelho', hex: '#FF0000' }
        ]
      }
    },
    methods: {
      increaseQuantity() {
        this.quantity++;
      },
      decreaseQuantity() {
        if (this.quantity > 1) {
          this.quantity--;
        }
      },
      addProductToCart() {
        // Preparar os dados do produto para o carrinho
        let optionsText = '';
        
        if (this.product.hasOptions) {
          optionsText = `Tamanho: ${this.selectedSize}, Cor: ${this.selectedColor}`;
        }
        
        const productData = {
          id: this.product.id,
          name: this.product.name,
          options: optionsText,
          price: this.product.price,
          quantity: this.quantity,
          image: this.product.image || '/api/placeholder/300/300'
        };
        
        // Disparar evento para adicionar ao carrinho
        window.dispatchEvent(new CustomEvent('add-item-to-cart', {
          detail: productData
        }));
        
        // Exibir mensagem de sucesso (opcional)
        this.showSuccessMessage();
        
        // Resetar quantidade
        this.quantity = 1;
      },
      showSuccessMessage() {
        // Implementação básica de notificação
        // Você pode substituir por um componente de toast
        const message = document.createElement('div');
        message.className = 'success-toast';
        message.textContent = 'Produto adicionado ao carrinho!';
        document.body.appendChild(message);
        
        // Remover após 3 segundos
        setTimeout(() => {
          message.classList.add('hide');
          setTimeout(() => {
            document.body.removeChild(message);
          }, 300);
        }, 3000);
      }
    }
  }
  </script>
  
  <style scoped>
  .product-card {
    background-color: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  .product-image {
    height: 250px;
    overflow: hidden;
  }
  
  .product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  .product-card:hover .product-image img {
    transform: scale(1.05);
  }
  
  .product-info {
    padding: 20px;
  }
  
  .product-title {
    margin: 0 0 10px 0;
    font-size: 18px;
    font-weight: 500;
  }
  
  .product-price {
    color: var(--primary);
    font-weight: 700;
    font-size: 20px;
    margin: 0 0 15px 0;
  }
  
  .product-options {
    margin-bottom: 20px;
  }
  
  .option-label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    color: var(--gray);
  }
  
  .option-buttons {
    display: flex;
    gap: 8px;
    margin-bottom: 15px;
  }
  
  .option-buttons button {
    min-width: 40px;
    height: 40px;
    border: 2px solid #e5e7eb;
    background: white;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    transition: all 0.2s ease;
  }
  
  .option-buttons button.active {
    border-color: var(--primary);
    color: var(--primary);
  }
  
  .color-options .option-buttons button {
    border-radius: 50%;
    position: relative;
  }
  
  .color-options .option-buttons button.active::after {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border: 2px solid var(--primary);
    border-radius: 50%;
  }
  
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
  
  .purchase-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .quantity-selector {
    display: flex;
    align-items: center;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .quantity-selector button {
    width: 40px;
    height: 40px;
    background: #f9fafb;
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;
  }
  
  .quantity-selector button:hover {
    background-color: #e5e7eb;
  }
  
  .quantity-selector span {
    width: 40px;
    text-align: center;
    font-weight: 500;
  }
  
  .add-to-cart-btn {
    flex: 1;
    height: 44px;
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0 15px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .add-to-cart-btn:hover {
    background-color: var(--primary-dark);
  }
  
  /* Estilo para mensagem de sucesso */
  .success-toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: var(--primary);
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    opacity: 1;
    transition: opacity 0.3s ease;
  }
  
  .success-toast.hide {
    opacity: 0;
  }
  
  @media (max-width: 768px) {
    .product-image {
      height: 200px;
    }
    
    .purchase-actions {
      flex-direction: column;
      align-items: stretch;
    }
    
    .quantity-selector {
      margin-bottom: 10px;
    }
  }
  </style>