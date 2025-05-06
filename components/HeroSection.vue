<template>
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Capinhas únicas como você</h1>
          <p class="hero-text">Crie capinhas personalizadas para seu celular com designs exclusivos, fotos especiais e mensagens que representam seu estilo.</p>
          <a href="#" class="btn" @click="scrollToCustomize">Personalizar Agora</a>
        </div>
        <div class="hero-image">
          <div class="phone-mockup">
            <div class="phone-screen">
              <img width="200" src="../assets/ChatGPT_Image_6_de_mai._de_2025__14_20_28-removebg-preview.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'HeroSection',
    methods: {
      scrollToCustomize() {
        const customizeSection = document.querySelector('.customize-interface')
        if (customizeSection) {
          customizeSection.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .hero {
    min-height: 600px;
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, rgba(255,78,138,0.1) 0%, rgba(138,79,255,0.1) 100%);
    margin-top: 20px;
    overflow: hidden;
    position: relative;
  }
  
  .hero-content {
    width: 50%;
    padding: 40px;
    z-index: 2;
  }
  
  .hero-title {
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 20px;
    background: linear-gradient(to right, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  
  .hero-text {
    font-size: 18px;
    line-height: 1.6;
    margin-bottom: 30px;
    color: var(--dark);
  }
  
  .hero-image {
    position: absolute;
    right: 0;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .phone-mockup {
    width: 300px;
    height: 600px;
    top: -400px;
    right: 100px;
    transform: rotate(10deg);
    background-color: #333;
    border-radius: 40px;
    position: relative;
    overflow: hidden;
    border: 10px solid #222;
    box-shadow: 0 30px 60px rgba(0,0,0,0.15);
  }
  
  .phone-screen {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
    font-weight: 600;
  }
  
  @media screen and (max-width: 768px) {
    .hero-content {
      width: 100%;
      text-align: center;
    }
    
    .hero-image {
      display: none;
    }
  }
  </style>
