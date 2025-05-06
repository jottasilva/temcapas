<!-- StepCard.vue - Componente de passo -->
<template>
    <div class="step">
      <div class="step-icon">{{ stepNumber }}</div>
      <h3 class="step-title">{{ title }}</h3>
      <p class="step-text">{{ text }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'StepCard',
    props: {
      stepNumber: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .step {
    width: 23%;
    background-color: white;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    text-align: center;
    transition: all 0.3s ease;
  }
  
  .step:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(138, 79, 255, 0.2);
  }
  
  .step-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    color: white;
    font-size: 32px;
  }
  
  .step-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 15px;
    color: var(--primary);
  }
  
  .step-text {
    font-size: 16px;
    line-height: 1.5;
    color: #555;
  }
  
  @media screen and (max-width: 1024px) {
    .step {
      width: 48%;
      margin-bottom: 30px;
    }
  }
  
  @media screen and (max-width: 768px) {
    .step {
      width: 100%;
    }
  }
  </style>