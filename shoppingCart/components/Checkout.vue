<template>
    <div class="checkout-page container">
      <h1 class="checkout-page__title">Finalizar Compra</h1>
      
      <div v-if="isEmpty" class="checkout-page__empty">
        <p>Seu carrinho está vazio</p>
        <nuxt-link to="/produtos" class="checkout-page__continue-btn">
          Ver Produtos
        </nuxt-link>
      </div>
      
      <div v-else class="checkout-page__content">
        <div class="checkout-page__form">
          <div class="checkout-page__section">
            <h2 class="checkout-page__section-title">Dados Pessoais</h2>
            
            <div class="form-group">
              <label for="name" class="form-label">Nome completo *</label>
              <input 
                id="name" 
                v-model="customer.name" 
                type="text" 
                class="form-input" 
                required 
              />
            </div>
            
            <div class="form-group">
              <label for="email" class="form-label">E-mail *</label>
              <input 
                id="email" 
                v-model="customer.email" 
                type="email" 
                class="form-input" 
                required 
              />
            </div>
            
            <div class="form-group">
              <label for="phone" class="form-label">Telefone *</label>
              <input 
                id="phone" 
                v-model="customer.phone" 
                type="tel" 
                class="form-input" 
                required 
              />
            </div>
          </div>
          
          <div class="checkout-page__section">
            <h2 class="checkout-page__section-title">Endereço de Entrega</h2>
            
            <div class="form-group">
              <label for="zip" class="form-label">CEP *</label>
              <input 
                id="zip" 
                v-model="shipping.zip" 
                type="text" 
                class="form-input" 
                required 
              />
            </div>
            
            <div class="form-row">
              <div class="form-group form-group--grow">
                <label for="street" class="form-label">Endereço *</label>
                <input 
                  id="street" 
                  v-model="shipping.street" 
                  type="text" 
                  class="form-input" 
                  required 
                />
              </div>
              
              <div class="form-group">
                <label for="number" class="form-label">Número *</label>
                <input 
                  id="number" 
                  v-model="shipping.number" 
                  type="text" 
                  class="form-input" 
                  required 
                />
              </div>
            </div>
            
            <div class="form-group">
              <label for="complement" class="form-label">Complemento</label>
              <input 
                id="complement" 
                v-model="shipping.complement" 
                type="text" 
                class="form-input" 
              />
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="neighborhood" class="form-label">Bairro *</label>
                <input 
                  id="neighborhood" 
                  v-model="shipping.neighborhood" 
                  type="text" 
                  class="form-input" 
                  required 
                />
              </div>
              
              <div class="form-group form-group--grow">
                <label for="city" class="form-label">Cidade *</label>
                <input 
                  id="city" 
                  v-model="shipping.city" 
                  type="text" 
                  class="form-input" 
                  required 
                />
              </div>
              
              <div class="form-group">
                <label for="state" class="form-label">Estado *</label>
                <input 
                  id="state" 
                  v-model="shipping.state" 
                  type="text" 
                  class="form-input" 
                  required 
                />
              </div>
            </div>
          </div>
          
          <div class="checkout-page__section">
            <h2 class="checkout-page__section-title">Pagamento</h2>
            
            <div class="payment-methods">
              <div 
                v-for="method in paymentMethods" 
                :key="method.id" 
                class="payment-method"
                :class="{ 'payment-method--active': payment.method === method.id }"
                @click="payment.method = method.id"
              >
                <div class="payment-method__radio">
                  <div class="payment-method__radio-inner"></div>
                </div>
                <div class="payment-method__info">
                  <div class="payment-method__name">{{ method.name }}</div>
                  <div class="payment-method__description">{{ method.description }}</div>
                </div>
              </div>
            </div>
            
            <div v-if="payment.method === 'credit_card'" class="form-section">
              <div class="form-group">
                <label for="card_number" class="form-label">Número do Cartão *</label>
                <input 
                  id="card_number" 
                  v-model="payment.card.number" 
                  type="text" 
                  class="form-input" 
                  required 
                />
              </div>
              
              <div class="form-group">
                <label for="card_name" class="form-label">Nome no Cartão *</label>
                <input 
                  id="card_name" 
                  v-model="payment.card.name" 
                  type="text" 
                  class="form-input" 
                  required 
                />
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="card_expiry" class="form-label">Validade *</label>
                  <input 
                    id="card_expiry" 
                    v-model="payment.card.expiry" 
                    type="text" 
                    placeholder="MM/AA" 
                    class="form-input" 
                    required 
                  />
                </div>
                
                <div class="form-group">
                  <label for="card_cvv" class="form-label">CVV *</label>
                  <input 
                    id="card_cvv" 
                    v-model="payment.card.cvv" 
                    type="text" 
                    maxlength="4" 
                    class="form-input" 
                    required 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="checkout-page__summary">
          <h2 class="checkout-page__summary-title">Resumo do Pedido</h2>
          
          <ul class="checkout-page__items">
            <li v-for="item in items" :key="item.id" class="checkout-page__item">
              <div class="checkout-page__item-name">
                {{ item.name }} <span class="checkout-page__item-qty">x{{ item.quantity }}</span>
              </div>
              <div class="checkout-page__item-price">
                {{ formatPrice(item.price * item.quantity) }}
              </div>
            </li>
          </ul>
          
          <div class="checkout-page__summary-row">
            <span>Subtotal</span>
            <span>{{ formatPrice(totalAmount) }}</span>
          </div>
          
          <div class="checkout-page__summary-row">
            <span>Frete</span>
            <span>{{ formatPrice(shipping.fee) }}</span>
          </div>
          
          <div class="checkout-page__summary-total">
            <span>Total</span>
            <span>{{ formatPrice(totalAmount + shipping.fee) }}</span>
          </div>
          
          <button 
            class="checkout-page__submit-btn" 
            @click="placeOrder"
            :disabled="!formValid"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, computed } from 'vue';
  import { useCart } from '~/composables/useCart';
  
  const { items, totalAmount, isEmpty, clearCart } = useCart();
  
  // Dados do cliente
  const customer = reactive({
    name: '',
    email: '',
    phone: '',
  });
  
  // Dados de entrega
  const shipping = reactive({
    zip: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    fee: 10 // Taxa de entrega fixa (poderia ser calculada dinamicamente)
  });
  
  // Métodos de pagamento disponíveis
  const paymentMethods = [
    {
      id: 'credit_card',
      name: 'Cartão de Crédito',
      description: 'Pagamento seguro com cartão de crédito'
    },
    {
      id: 'bank_slip',
      name: 'Boleto Bancário',
      description: 'O pedido será confirmado após o pagamento do boleto'
    },
    {
      id: 'pix',
      name: 'Transferência PIX',
      description: 'Pagamento instantâneo via PIX'
    }
  ];
  
  // Dados de pagamento
  const payment = reactive({
    method: 'credit_card',
    card: {
      number: '',
      name: '',
      expiry: '',
      cvv: ''
    }
  });
  
  // Validação simples do formulário (poderia ser mais completa)
  const formValid = computed(() => {
    if (customer.name && customer.email && customer.phone &&
        shipping.zip && shipping.street && shipping.number &&
        shipping.neighborhood && shipping.city && shipping.state) {
      
      if (payment.method === 'credit_card') {
        return payment.card.number && payment.card.name && 
               payment.card.expiry && payment.card.cvv;
      }
      
      return true;
    }
    
    return false;
  });
  
  // Formatador de preço
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };
  
  // Finalizar pedido
  const placeOrder = () => {
    // Normalmente aqui enviaríamos os dados para o backend
    // para processar o pedido
    console.log('Pedido finalizado', {
      customer,
      shipping,
      payment,
      items: items.value,
      total: totalAmount.value + shipping.fee
    });
    
    // Limpar o carrinho
    clearCart();
    
    // Redirecionar para página de confirmação
    alert('Pedido realizado com sucesso!');
    window.location.href = '/';
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
  }
  
  .checkout-page__title {
    margin-bottom: 2rem;
  }
  
  .checkout-page__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 3rem 0;
  }
  
  .checkout-page__continue-btn {
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    background-color: #4caf50;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    display: inline-block;
  }
  
  .checkout-page__content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  @media (min-width: 768px) {
    .checkout-page__content {
      grid-template-columns: 2fr 1fr;
    }
  }
  
  .checkout-page__section {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #eee;
  }
  
  .checkout-page__section:last-child {
    border-bottom: none;
  }
  
  .checkout-page__section-title {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.25rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-row {
    display: flex;
    gap: 1rem;
  }
  
  .form-group--grow {
    flex-grow: 1;
  }
  
  .form-label {
    display: block;
    margin-bottom: 0.25rem;
    font-size: 0.875rem;
  }
  
  .form-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: inherit;
    font-size: 1rem;
  }
  
  .payment-methods {
    margin-bottom: 1.5rem;
  }
  
  .payment-method {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 0.5rem;
    cursor: pointer;
  }
  
  .payment-method--active {
    border-color: #4caf50;
    background-color: #f1f8e9;
  }
  
  .payment-method__radio {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .payment-method--active .payment-method__radio {
    border-color: #4caf50;
  }
  
  .payment-method__radio-inner {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #4caf50;
    display: none;
  }
  
  .payment-method--active .payment-method__radio-inner {
    display: block;
  }
  
  .payment-method__name {
    font-weight: 500;
  }
  
  .payment-method__description {
    font-size: 0.875rem;
    color: #666;
  }
  
  .checkout-page__summary {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 1.5rem;
    align-self: start;
  }
  
  .checkout-page__summary-title {
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
  }
  
  .checkout-page__items {
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem 0;
  }
  
  .checkout-page__item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #eee;
  }
  
  .checkout-page__item:last-child {
    border-bottom: none;
  }
  
  .checkout-page__item-name {
    font-size: 0.875rem;
  }
  
  .checkout-page__item-qty {
    color: #666;
    margin-left: 0.5rem;
  }
  
  .checkout-page__summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
  }
  
  .checkout-page__summary-total {
    display: flex;
    justify-content: space-between;
    margin: 1.5rem 0;
    padding-top: 1rem;
    border-top: 1px solid #ddd;
    font-weight: 700;
    font-size: 1.125rem;
  }
  
  .checkout-page__submit-btn {
    display: block;
    width: 100%;
    padding: 0.75rem;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
  }
  
  .checkout-page__submit-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  </style>