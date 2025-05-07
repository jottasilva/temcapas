<template>
  <div id="app">
    <TheHeader />
    <main>
      <HeroSection />
      <HowItWorks />
      <CustomizeInterface />
      <PopularCases />
      <Testimonials />
      <Features />
    </main>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import HeroSection from './components/HeroSection.vue'
import HowItWorks from './components/HowItsWorks.vue'
import CustomizeInterface from './components/CustomizeInterface.vue'
import PopularCases from './components/PopularCases.vue'
import Testimonials from './components/Testmonials.vue'
import Features from './components/Features.vue'
import TheFooter from './components/Footer.vue'


export default {
  name: 'App',
  components: {
    TheHeader,
    HeroSection,
    HowItWorks,
    CustomizeInterface,
    PopularCases,
    Testimonials,
    Features,
    TheFooter,
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
:root {
    --primary: #FF4E8A;
    --secondary: #8A4FFF;
    --accent: #00D1FF;
    --dark: #1A1A2E;
    --light: #F5F5F7;
    --success: #4CAF50;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body {
    background-color: var(--light);
    color: var(--dark);
    overflow-x: hidden;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.btn {
    padding: 15px 35px;
    background: linear-gradient(to right, var(--primary), var(--secondary));
    color: white;
    border: none;
    border-radius: 30px;
    font-size: 18px;
    letter-spacing: 2px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-block;
    text-decoration: none;
}

.btn:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(138, 79, 255, 0.3);
}

.section-title {
    text-align: center;
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 60px;
    color: var(--dark);
}

@media screen and (max-width: 1024px) {
    .step {
        width: 48%;
        margin-bottom: 30px;
    }
    
    .cases-grid {
        grid-template-columns: repeat(3, 1fr);
    }
    
    .footer-column {
        width: 48%;
        margin-bottom: 40px;
    }
}

@media screen and (max-width: 768px) {
    .hero-content {
        width: 100%;
        text-align: center;
    }
    
    .hero-image {
        display: none;
    }
    
    .step {
        width: 100%;
    }
    
    .customize-sidebar, .customize-preview {
        width: 100%;
    }
    
    .cases-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .testimonial-grid {
        grid-template-columns: 1fr;
    }
    
    .footer-column {
        width: 100%;
    }
}
</style>