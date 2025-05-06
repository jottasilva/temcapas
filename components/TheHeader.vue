<template>
    <header>
      <div class="container nav-container">
        <a href="#" class="logo"><img src="../assets/logo.png" width="120" alt=""></a>
        <ul class="menu">
          <li class="menu-item" v-for="(item, index) in menuItems" :key="index">
            <a :href="item.link" class="menu-link" :class="{ active: item.active }">{{ item.text }}</a>
          </li>
        </ul>
        <button class="cart-btn" @click="openCart">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span class="cart-count">{{ cartCount }}</span>
        </button>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: 'TheHeader',
    data() {
      return {
        cartCount: 0,
        menuItems: [
          { text: 'Início', link: '#', active: true },
          { text: 'Personalizar', link: '#', active: false },
          { text: 'Modelos', link: '#', active: false },
          { text: 'Sobre', link: '#', active: false }
        ]
      }
    },
    methods: {
      openCart() {
        alert('Carrinho aberto')
      }
    },
    mounted() {
  
      window.addEventListener('add-to-cart', () => {
        this.cartCount += 1
      })
    }
  }
  </script>
  
  <style scoped>
  header {
    padding: 40px 0 20px;
    position: relative;
  }
  
  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    font-size: 28px;
    font-weight: 700;
    color: var(--primary);
    text-decoration: none;
    display: flex;
    align-items: center;
  }
  
  .logo span {
    color: var(--secondary);
  }
  
  .menu {
    display: flex;
    list-style: none;
  }
  
  .menu-item {
    margin: 0 15px;
  }
  
  .menu-link {
    text-decoration: none;
    color: var(--dark);
    font-weight: 500;
    font-size: 16px;
    padding: 10px 15px;
    border-radius: 30px;
    transition: all 0.3s ease;
    border: 2px solid transparent;
  }
  
  .menu-link:hover, .menu-link.active {
    border: 2px solid var(--primary);
    color: var(--primary);
  }
  
  .cart-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    position: relative;
  }
  
  .cart-count {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: var(--primary);
    color: white;
    font-size: 12px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>