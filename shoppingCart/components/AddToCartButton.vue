<template>
  <div class="add-to-cart">
    <div v-if="showQuantityControls" class="add-to-cart__quantity">
      <button 
        class="add-to-cart__quantity-btn" 
        @click="decreaseQuantity"
        :disabled="quantity <= 1"
        aria-label="Diminuir quantidade"
      >
        -
      </button>
      
      <input
        type="number"
        class="add-to-cart__quantity-input"
        v-model.number="quantity"
        min="1"
        aria-label="Quantidade do produto"
      />
      
      <button 
        class="add-to-cart__quantity-btn" 
        @click="increaseQuantity"
        aria-label="Aumentar quantidade"
      >
        +
      </button>
    </div>
    
    <button 
      class="add-to-cart__button"
      :class="{ 'add-to-cart__button--in-cart': alreadyInCart }"
      @click="handleClick"
      :disabled="disabled"
    >
      <slot>
        {{ buttonText }}
      </slot>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCart } from '../composables/useCart'; // ajuste o path se necessário

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  showQuantityControls: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  updateCartIfExists: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['added-to-cart']);

const { addToCart, getItem } = useCart();
const quantity = ref(1);

const alreadyInCart = computed(() => {
  return !!getItem(props.product.id);
});

const buttonText = computed(() => {
  return alreadyInCart.value ? 'Atualizar Carrinho' : 'Adicionar ao Carrinho';
});

const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const handleClick = () => {
  if (alreadyInCart.value && !props.updateCartIfExists) {
    return;
  }

  addToCart(props.product, quantity.value);
  emit('added-to-cart', {
    product: props.product,
    quantity: quantity.value,
  });

  quantity.value = 1;
};

onMounted(() => {
  const item = getItem(props.product.id);
  if (item) {
    quantity.value = item.quantity;
  }
});
</script>

<style scoped>
.add-to-cart {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.add-to-cart__quantity {
  display: flex;
  align-items: center;
}

.add-to-cart__quantity-input {
  width: 50px;
  text-align: center;
  margin: 0 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.5rem;
}

.add-to-cart__quantity-btn {
  width: 32px;
  height: 32px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.add-to-cart__quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.add-to-cart__button {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-to-cart__button:hover:not(:disabled) {
  background-color: #45a049;
}

.add-to-cart__button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.add-to-cart__button--in-cart {
  background-color: #2196f3;
}

.add-to-cart__button--in-cart:hover:not(:disabled) {
  background-color: #0b7dda;
}
</style>