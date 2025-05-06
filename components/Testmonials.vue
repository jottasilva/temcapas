<template>
  <section class="section testimonials">
    <div class="container">
      <h2 class="section-title">O Que Nossos Clientes Dizem</h2>
      
      <div class="testimonial-slider">
        <div class="slider-container">
          <div 
            class="slider-track" 
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div 
              v-for="(testimonial, index) in testimonials" 
              :key="index" 
              class="testimonial"
            >
              <p class="testimonial-text">{{ testimonial.text }}</p>
              <div class="testimonial-author">{{ testimonial.author }}</div>
              <div class="testimonial-role">{{ testimonial.role }}</div>
            </div>
          </div>
        </div>
        
        <!-- Indicadores de slide (pontos) -->
        <div class="slider-indicators">
          <button 
            v-for="(_, index) in testimonials" 
            :key="index"
            class="indicator-dot" 
            :class="{ active: currentSlide === index }"
            @click="goToSlide(index)"
            :aria-label="`Depoimento ${index + 1}`"
          ></button>
        </div>
        
        <!-- Botões de navegação -->
        <div class="slider-controls">
          <button 
            class="slider-control prev" 
            @click="prevSlide"
            aria-label="Depoimento anterior"
          >
            &lsaquo;
          </button>
          <button 
            class="slider-control next" 
            @click="nextSlide"
            aria-label="Próximo depoimento"
          >
            &rsaquo;
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TestimonialSliderComponent',
  data() {
    return {
      currentSlide: 0,
      autoplayInterval: null,
      testimonials: [
        {
          text: 'Fiquei impressionada com a qualidade da impressão da minha foto na capinha. As cores ficaram vibrantes e o material é super resistente!',
          author: 'Ana Oliveira',
          role: 'Curitiba, Paraná'
        },
        {
          text: 'A capinha personalizada ficou incrível! O processo de personalização é super intuitivo e o resultado final superou minhas expectativas.',
          author: 'Carlos Santos',
          role: 'João Pessoa, Paraíba'
        },
        {
          text: 'Já comprei diversas capinhas e sempre fico satisfeita com a qualidade e durabilidade. O atendimento também é excelente!',
          author: 'Mariana Costa',
          role: 'Washington, DC'
        }
      ]
    }
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.testimonials.length;
      this.resetAutoplay();
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.testimonials.length) % this.testimonials.length;
      this.resetAutoplay();
    },
    goToSlide(index) {
      this.currentSlide = index;
      this.resetAutoplay();
    },
    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        this.nextSlide();
      }, 5000); // Muda slide a cada 5 segundos
    },
    resetAutoplay() {
      clearInterval(this.autoplayInterval);
      this.startAutoplay();
    }
  },
  mounted() {
    this.startAutoplay();
  },
  beforeUnmount() {
    clearInterval(this.autoplayInterval);
  }
}
</script>

<style scoped>
:root {
  --primary: #6C63FF;
  --secondary: #F5A623;
  --dark: #333333;
  --light: #F8F9FA;
  --accent: #FF5678;
}

.testimonials {
  background-color: white;
}

.section {
  padding: 5rem 0;
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--dark);
}

.testimonial-slider {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
  position: relative;
}

.slider-container {
  overflow: hidden;
  margin-bottom: 2rem;
}

.slider-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
}

.testimonial {
  padding: 2rem;
  min-width: 100%;
  box-sizing: border-box;
}

.testimonial-text {
  font-size: 1.2rem;
  font-style: italic;
  margin-bottom: 1.5rem;
  position: relative;
}

.testimonial-text::before,
.testimonial-text::after {
  content: '"';
  font-size: 2rem;
  color: var(--primary);
}

.testimonial-author {
  font-weight: 600;
  font-size: 1.1rem;
}

.testimonial-role {
  font-size: 0.9rem;
  opacity: 0.7;
}

.slider-indicators {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  gap: 0.5rem;
}

.indicator-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ddd;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.indicator-dot.active {
  background-color: var(--primary);
}

.slider-controls {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  pointer-events: none;
}

.slider-control {
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  pointer-events: auto;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.slider-control:hover {
  background-color: white;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .testimonial-text {
    font-size: 1rem;
  }
  
  .slider-control {
    width: 30px;
    height: 30px;
    font-size: 1.2rem;
  }
}
</style>