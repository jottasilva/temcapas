<template>
    <div class="loading-overlay" v-if="show">
      <div class="spinner"></div>
      <p class="loading-text">{{ message || 'Gerando PDF...' }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoadingOverlay',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      message: {
        type: String,
        default: ''
      }
    }
  }
  </script>
  
  <style scoped>
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid var(--secondary, #f5a623);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  .loading-text {
    margin-top: 20px;
    color: white;
    font-size: 18px;
    font-weight: 500;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>