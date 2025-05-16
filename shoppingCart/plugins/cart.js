import { useCartStore } from '../stores/cartStore';
export default defineNuxtPlugin((nuxtApp) => {
  const cartStore = useCartStore();
  if (import.meta.client) {
    nuxtApp.vueApp.use(() => {
      nuxtApp.hook('app:mounted', () => {
        cartStore.initCart();
      });
    });
  }
  return {
    provide: {
      cart: {
        addToCart: (product, quantity = 1) => cartStore.addItem(product, quantity),
        removeFromCart: (productId) => cartStore.removeItem(productId),
        getCartItems: () => cartStore.items,
        getCartTotal: () => cartStore.totalAmount,
        clearCart: () => cartStore.clearCart(),
        isInCart: (productId) => !!cartStore.getItemById(productId),
        isEmpty: () => cartStore.isEmpty,
      }
    }
  };
});