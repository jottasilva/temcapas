<!-- FeaturesComponent.vue -->
<template>
    <section class="section features">
      <div class="container">
        <h2 class="section-title">Por Que Escolher Nossas Capinhas</h2>
        <p class="section-subtitle">Combinamos qualidade premium com personalização total para entregar o melhor produto para você.</p>
        
        <div class="feature-list">
          <div v-for="(column, columnIndex) in featureColumns" :key="'column-' + columnIndex">
            <div v-for="(feature, featureIndex) in column" :key="'feature-' + featureIndex" class="feature-item">
              <div class="feature-icon">✓</div>
              <div>
                <h3>{{ feature.title }}</h3>
                <p>{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'FeaturesComponent',
    data() {
      return {
        featureColumns: [
          [
            {
              title: 'Material Premium',
              description: 'Utilizamos materiais de alta qualidade que protegem seu aparelho contra quedas e impactos.'
            },
            {
              title: 'Impressão de Alta Definição',
              description: 'Tecnologia de impressão que garante cores vibrantes e detalhes nítidos.'
            }
          ],
          [
            {
              title: 'Personalização Total',
              description: 'Liberdade criativa para personalizar cada detalhe da sua capinha.'
            },
            {
              title: 'Entrega Rápida',
              description: 'Produção e envio em tempo recorde para você receber sua capinha o quanto antes.'
            }
          ]
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .features {
    background: linear-gradient(55deg, #6c63ff, #3c34c3);
    max-width: 1200px;
    border-radius: 10px;
    margin:60px auto;
    color: white;
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
    color: white;
  }
  
  .section-subtitle {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 1.2rem;
    color: white;
    opacity: 0.8;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .feature-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .feature-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1.5rem;
  }
  
  .feature-icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    color: var(--primary);
  }
  
  @media (max-width: 768px) {
    .section {
      padding: 3rem 0;
    }
    
    .section-title {
      font-size: 2rem;
    }
  }
  </style>