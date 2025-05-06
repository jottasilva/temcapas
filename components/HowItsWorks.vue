<template>
    <section class="customization">
      <div class="container">
        <h2 class="section-title">Como Funciona</h2>
        <div class="steps">
          <StepCard 
            v-for="(step, index) in steps" 
            :key="index"
            :step-number="step.number"
            :title="step.title"
            :text="step.text"
          />
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import StepCard from './StepCard.vue'
  
  export default {
    name: 'HowItWorks',
    components: {
      StepCard
    },
    data() {
      return {
        steps: [
          {
            number: '1',
            title: 'Escolha o Modelo',
            text: 'Selecione o modelo do seu celular para garantir o encaixe perfeito.'
          },
          {
            number: '2',
            title: 'Selecione o Design',
            text: 'Escolha entre nossos designs ou faça upload da sua foto favorita.'
          },
          {
            number: '3',
            title: 'Personalize',
            text: 'Adicione texto, ajuste cores e faça a capinha do seu jeito.'
          },
          {
            number: '4',
            title: 'Receba em Casa',
            text: 'Entrega rápida e segura para qualquer lugar do Brasil.'
          }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .customization {
    padding: 80px 0;
  }
  
  .steps {
    display: flex;
    justify-content: space-between;

    flex-wrap: wrap;
  }
  
  @media screen and (max-width: 1024px) {
    .steps {
      justify-content: space-around;
    }
  }
  </style>