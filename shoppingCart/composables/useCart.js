// composables/useCart.js
import { useCartStore } from '../stores/cartStore';
import { storeToRefs } from 'pinia';
import { onMounted, watch } from 'vue';

export const useCart = () => {
  const cartStore = useCartStore();
  const { items, totalItems, totalAmount, isEmpty, loaded } = storeToRefs(cartStore);
  onMounted(() => {
    if (!cartStore.loaded) {
      cartStore.initCart();
    }
  });

  watch(loaded, (isLoaded) => {
    if (isLoaded && import.meta.client) {
      cartStore.saveCart();
    }
  });
  const addToCart = (product, quantity = 1) => {
    cartStore.addItem(product, quantity);
  };
  
  const removeFromCart = (productId) => {
    cartStore.removeItem(productId);
  };
  
  const updateQuantity = (productId, quantity) => {
    cartStore.updateItemQuantity(productId, quantity);
  };
  
  const incrementQuantity = (productId) => {
    cartStore.incrementItemQuantity(productId);
  };
  
  const decrementQuantity = (productId) => {
    cartStore.decrementItemQuantity(productId);
  };
  
  const clearCart = () => {
    cartStore.clearCart();
  };
  
  const getItem = (productId) => {
    return cartStore.getItemById(productId);
  };
  
  return {
    items,
    totalItems,
    totalAmount,
    isEmpty,
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    getItem,
  };
};