<template>
  <header>
    <div class="container nav-container">
      <a href="#" class="logo"><img src="../assets/logo.png" width="120" alt=""></a>


      <button class="menu-toggle" @click="toggleMobileMenu" aria-label="Menu">
        <span class="hamburger-icon" :class="{ 'active': mobileMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      <ul class="menu" :class="{ 'menu-mobile': mobileMenuOpen }">
        <li class="menu-item" v-for="(item, index) in menuItems" :key="index">
          <a :href="item.link" class="menu-link" :class="{ active: item.active }" @click="closeMobileMenu">
            {{ item.text }}
          </a>
        </li>
      </ul>

      <button class="cart-btn" @click="openCart">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
      mobileMenuOpen: false,
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
      this.$emit('open-cart');
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      // Bloquear scroll do body quando o menu estiver aberto
      document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
    },
    closeMobileMenu() {
      if (this.mobileMenuOpen) {
        this.mobileMenuOpen = false;
        document.body.style.overflow = '';
      }
    }
  },
  mounted() {
    window.addEventListener('add-to-cart', () => {
      this.cartCount += 1
    });

    // Fechar menu ao redimensionar para desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.mobileMenuOpen) {
        this.closeMobileMenu();
      }
    });
  },
  beforeUnmount() {
    // Remover listener ao desmontar componente
    window.removeEventListener('resize', this.closeMobileMenu);
  }
}
</script>

<style scoped>
header {
  padding: 20px 0;
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
  z-index: 102;
  /* Manter logo visível acima do menu mobile */
}

.logo span {
  color: var(--secondary);
}

.menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
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

.menu-link:hover,
.menu-link.active {
  border: 2px solid var(--primary);
  color: var(--primary);
}

.cart-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  position: relative;
  z-index: 102;
  /* Manter carrinho visível acima do menu mobile */
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

/* Estilos para menu mobile */
.menu-toggle {
  display: none;
  /* Esconder por padrão */
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 102;
  /* Acima do menu mobile */
}

.hamburger-icon {
  width: 30px;
  height: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hamburger-icon span {
  display: block;
  height: 3px;
  width: 100%;
  border-radius: 3px;
  background: var(--dark);
  transition: all 0.3s ease;
}

/* Animação das barras do hambúrguer quando ativo */
.hamburger-icon.active span:nth-child(1) {
  transform: translateY(8.5px) rotate(45deg);
}

.hamburger-icon.active span:nth-child(2) {
  opacity: 0;
}

.hamburger-icon.active span:nth-child(3) {
  transform: translateY(-8.5px) rotate(-45deg);
}

/* Media query para telas menores (mobile) */
@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 100;
  }

  .menu-mobile {
    transform: translateX(0);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }

  .menu-item {
    margin: 15px 0;
  }

  .menu-link {
    font-size: 18px;
    padding: 12px 20px;
  }

  .nav-container {
    padding: 0 20px;
  }
}
</style>