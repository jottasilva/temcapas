import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    loaded: false,
  }),
  getters: {
    totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    totalAmount: (state) => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    isEmpty: (state) => state.items.length === 0,
    getItemById: (state) => (id) => state.items.find(item => item.id === id),
  },

  actions: {
    initCart() {
      if (import.meta.client) {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          this.items = JSON.parse(savedCart);
        }
        if (this.items.length === 0) {
          this.items = [
            {
              id: 'mock-001',
              name: 'Camiseta Básica',
              price: 49.90,
              image: 'https://via.placeholder.com/150?text=Camiseta',
              quantity: 1,
            },
            {
              id: 'mock-002',
              name: 'Tênis Esportivo',
              price: 199.90,
              image: 'https://via.placeholder.com/150?text=Tenis',
              quantity: 1,
            },
            {
              id: 'mock-003',
              name: 'Mochila Escolar',
              price: 89.90,
              image: 'https://via.placeholder.com/150?text=Mochila',
              quantity: 1,
            },
          ];
          this.saveCart();
        }

        this.loaded = true;

        window.addEventListener('storage', this.handleStorageChange);
      }
    },

    handleStorageChange(event) {
      if (event.key === 'cart' && event.newValue) {
        this.items = JSON.parse(event.newValue);
      }
    },

    saveCart() {
      if (import.meta.client) {
        localStorage.setItem('cart', JSON.stringify(this.items));
      }
    },

    addItem(product, quantity = 1) {
      const existingItem = this.getItemById(product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
        });
      }

      this.saveCart();
    },

    removeItem(productId) {
      const index = this.items.findIndex(item => item.id === productId);

      if (index !== -1) {
        this.items.splice(index, 1);
        this.saveCart();
      }
    },

    updateItemQuantity(productId, quantity) {
      const item = this.getItemById(productId);

      if (item) {
        if (quantity <= 0) {
          this.removeItem(productId);
        } else {
          item.quantity = quantity;
          this.saveCart();
        }
      }
    },

    incrementItemQuantity(productId) {
      const item = this.getItemById(productId);

      if (item) {
        item.quantity++;
        this.saveCart();
      }
    },

    decrementItemQuantity(productId) {
      const item = this.getItemById(productId);

      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          this.removeItem(productId);
        }
        this.saveCart();
      }
    },

    clearCart() {
      this.items = [];
      this.saveCart();
    },
  },
});
