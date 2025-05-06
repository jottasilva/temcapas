
<template>
  <section class="section customizer" id="personalizar">
    <div class="container">
      <h2 class="section-title">Crie Sua Capinha</h2>
      <p class="section-subtitle">Use nossa ferramenta interativa para personalizar sua capinha exatamente como você deseja.</p>
      
      <div class="customizer-container">
        <div class="customizer-preview" :style="{ backgroundColor: backgroundColors[selectedColorIndex] }">
          <!-- Preview do Celular -->
          <div class="phone-mockup" :class="phoneModel.replace(/\s+/g, '-').toLowerCase()">
            <!-- Imagem de fundo personalizada -->
            <div class="custom-image-container" v-if="imagePreview">
              <img 
                :src="imagePreview" 
                alt="Imagem personalizada" 
                class="custom-image"
                :style="{
                  width: `${imageScale * 100}%`,
                  height: `${imageScale * 100}%`,
                  transform: `translate(${imagePositionX}px, ${imagePositionY}px)`,
                  objectFit: 'cover'
                }"
                @mousedown="startImageDrag"
                @touchstart="startImageDrag"
                ref="customImage"
              >
            </div>
            
            <!-- Texto personalizado -->
            <div 
              class="custom-text-container" 
              v-if="customText"
              :style="{
                justifyContent: textPositionH,
                alignItems: textPositionV,
                textAlign: textAlign
              }"
            >
              <p 
                :class="'font-' + fontStyle.toLowerCase()" 
                :style="{ 
                  color: getContrastColor(), 
                  fontSize: `${textSize}px`,
                  transform: `translate(${textPositionX}px, ${textPositionY}px)`
                }"
                @mousedown="startTextDrag"
                @touchstart="startTextDrag"
                ref="customText"
              >
                {{ customText }}
              </p>
            </div>
            
            <!-- Overlay com detalhe do modelo -->
            <div class="model-overlay">
              <span>{{ phoneModel }}</span>
              <span>{{ caseType }}</span>
            </div>
          </div>
        </div>
        
        <div class="customizer-form">
          <div class="form-group">
            <label class="form-label">Modelo do Celular</label>
            <select class="form-control" v-model="phoneModel">
              <option v-for="model in phoneModels" :key="model">{{ model }}</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label">Tipo de Capinha</label>
            <select class="form-control" v-model="caseType">
              <option v-for="type in caseTypes" :key="type">{{ type }}</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label">Enviar Foto</label>
            <input type="file" class="form-control" @change="handleFileUpload" accept="image/*">
            
            <div v-if="imagePreview" class="image-controls">
              <div class="control-group">
                <label>Tamanho:</label>
                <input type="range" min="0.1" max="2" step="0.05" v-model="imageScale">
              </div>
              
              <div class="control-buttons">
                <button @click="removeImage" class="remove-btn">
                  Remover Imagem
                </button>
                <button @click="resetImagePosition" class="reset-btn">
                  Centralizar
                </button>
              </div>
              
              <p class="control-hint">Clique e arraste para posicionar a imagem</p>
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Escreva Sua Frase</label>
            <input type="text" class="form-control" placeholder="Escreva sua frase aqui..." v-model="customText">
            
            <div v-if="customText" class="text-controls">
              <div class="control-group">
                <label>Tamanho da Fonte:</label>
                <input type="range" min="12" max="36" step="1" v-model="textSize">
              </div>
              
              <div class="control-group">
                <label>Posição Horizontal:</label>
                <div class="btn-group">
                  <button 
                    v-for="pos in textHorizontalPositions" 
                    :key="pos.value" 
                    @click="setTextHorizontalPosition(pos.value)"
                    :class="['position-btn', textPositionH === pos.value ? 'active' : '']"
                    :title="pos.label"
                  >
                    <span :class="'icon-' + pos.icon"></span>
                  </button>
                </div>
              </div>
              
              <div class="control-group">
                <label>Posição Vertical:</label>
                <div class="btn-group">
                  <button 
                    v-for="pos in textVerticalPositions" 
                    :key="pos.value" 
                    @click="setTextVerticalPosition(pos.value)"
                    :class="['position-btn', textPositionV === pos.value ? 'active' : '']"
                    :title="pos.label"
                  >
                    <span :class="'icon-' + pos.icon"></span>
                  </button>
                </div>
              </div>
              
              <div class="control-group">
                <label>Alinhamento:</label>
                <div class="btn-group">
                  <button 
                    v-for="align in textAlignOptions" 
                    :key="align.value" 
                    @click="setTextAlign(align.value)"
                    :class="['position-btn', textAlign === align.value ? 'active' : '']"
                    :title="align.label"
                  >
                    <span :class="'icon-' + align.icon"></span>
                  </button>
                </div>
              </div>
              
              <p class="control-hint">Clique e arraste para ajustar a posição do texto</p>
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Cor de Fundo</label>
            <div class="color-options">
              <div 
                v-for="(color, index) in backgroundColors" 
                :key="index"
                class="color-option" 
                :class="{ active: selectedColorIndex === index }"
                :style="{ backgroundColor: color }"
                @click="selectColor(index)">
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Estilo de Fonte</label>
            <select class="form-control" v-model="fontStyle">
              <option v-for="style in fontStyles" :key="style">{{ style }}</option>
            </select>
          </div>
          
          <button @click="addToCart" class="btn" style="width: 100%; text-align: center;">Adicionar ao Carrinho</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CustomizerSection',
  data() {
    return {
      phoneModel: 'iPhone 15 Pro Max',
      phoneModels: [
        'iPhone 15 Pro Max',
        'iPhone 15 Pro',
        'iPhone 15',
        'iPhone 14 Pro Max',
        'Samsung Galaxy S24 Ultra',
        'Samsung Galaxy S24+',
        'Samsung Galaxy S24',
        'Xiaomi 14'
      ],
      caseType: 'Classic',
      caseTypes: ['Classic', 'Premium', 'Glitter', 'Transparente'],
      selectedFile: null,
      imagePreview: null,
      imageScale: 1,
      imagePositionX: 0,
      imagePositionY: 0,
      isDraggingImage: false,
      startX: 0,
      startY: 0,
      
      customText: '',
      textSize: 20,
      textPositionH: 'center', // flex-start, center, flex-end
      textPositionV: 'center', // flex-start, center, flex-end
      textAlign: 'center',     // left, center, right
      textPositionX: 0,
      textPositionY: 0,
      isDraggingText: false,
      textStartX: 0,
      textStartY: 0,
      
      textHorizontalPositions: [
        { value: 'flex-start', label: 'Esquerda', icon: 'left' },
        { value: 'center', label: 'Centro', icon: 'center-h' },
        { value: 'flex-end', label: 'Direita', icon: 'right' }
      ],
      textVerticalPositions: [
        { value: 'flex-start', label: 'Topo', icon: 'top' },
        { value: 'center', label: 'Meio', icon: 'center-v' },
        { value: 'flex-end', label: 'Base', icon: 'bottom' }
      ],
      textAlignOptions: [
        { value: 'left', label: 'Alinhado à Esquerda', icon: 'align-left' },
        { value: 'center', label: 'Centralizado', icon: 'align-center' },
        { value: 'right', label: 'Alinhado à Direita', icon: 'align-right' }
      ],
      
      backgroundColors: ['#FFFFFF', '#000000', '#F5A623', '#6C63FF', '#FF5678'],
      selectedColorIndex: 0,
      fontStyle: 'Moderna',
      fontStyles: ['Moderna', 'Clássica', 'Manuscrita', 'Divertida'],
      price: 59.90
    }
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
      
      // Criar preview da imagem
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
          // Reset posição e escala
          this.resetImagePosition();
        };
        reader.readAsDataURL(this.selectedFile);
      }
    },
    removeImage() {
      this.selectedFile = null;
      this.imagePreview = null;
      this.imageScale = 1;
      this.imagePositionX = 0;
      this.imagePositionY = 0;
      
      // Resetar o input file
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.value = '';
      }
    },
    resetImagePosition() {
      this.imageScale = 1;
      this.imagePositionX = 0;
      this.imagePositionY = 0;
    },
    startImageDrag(event) {
      // Previne comportamento padrão para evitar problemas com drag&drop
      event.preventDefault();
      
      this.isDraggingImage = true;
      
      // Captura coordenadas iniciais (suporta touch e mouse)
      if (event.type === 'touchstart') {
        this.startX = event.touches[0].clientX;
        this.startY = event.touches[0].clientY;
      } else {
        this.startX = event.clientX;
        this.startY = event.clientY;
      }
      
      // Adiciona event listeners para movimento e final do drag
      document.addEventListener('mousemove', this.moveImage);
      document.addEventListener('touchmove', this.moveImage, { passive: false });
      document.addEventListener('mouseup', this.stopImageDrag);
      document.addEventListener('touchend', this.stopImageDrag);
    },
    moveImage(event) {
      if (!this.isDraggingImage) return;
      
      // Previne comportamento padrão para evitar problemas com scroll em touch
      event.preventDefault();
      
      let currentX, currentY;
      
      // Captura coordenadas atuais (suporta touch e mouse)
      if (event.type === 'touchmove') {
        currentX = event.touches[0].clientX;
        currentY = event.touches[0].clientY;
      } else {
        currentX = event.clientX;
        currentY = event.clientY;
      }
      
      // Calcula a mudança de posição
      const deltaX = currentX - this.startX;
      const deltaY = currentY - this.startY;
      
      // Atualiza posição inicial para o próximo movimento
      this.startX = currentX;
      this.startY = currentY;
      
      // Atualiza a posição da imagem
      this.imagePositionX += deltaX;
      this.imagePositionY += deltaY;
    },
    stopImageDrag() {
      this.isDraggingImage = false;
      
      // Remove event listeners
      document.removeEventListener('mousemove', this.moveImage);
      document.removeEventListener('touchmove', this.moveImage);
      document.removeEventListener('mouseup', this.stopImageDrag);
      document.removeEventListener('touchend', this.stopImageDrag);
    },
    startTextDrag(event) {
      // Previne comportamento padrão
      event.preventDefault();
      
      this.isDraggingText = true;
      
      // Captura coordenadas iniciais (suporta touch e mouse)
      if (event.type === 'touchstart') {
        this.textStartX = event.touches[0].clientX;
        this.textStartY = event.touches[0].clientY;
      } else {
        this.textStartX = event.clientX;
        this.textStartY = event.clientY;
      }
      
      // Adiciona event listeners para movimento e final do drag
      document.addEventListener('mousemove', this.moveText);
      document.addEventListener('touchmove', this.moveText, { passive: false });
      document.addEventListener('mouseup', this.stopTextDrag);
      document.addEventListener('touchend', this.stopTextDrag);
    },
    moveText(event) {
      if (!this.isDraggingText) return;
      
      // Previne comportamento padrão
      event.preventDefault();
      
      let currentX, currentY;
      
      // Captura coordenadas atuais (suporta touch e mouse)
      if (event.type === 'touchmove') {
        currentX = event.touches[0].clientX;
        currentY = event.touches[0].clientY;
      } else {
        currentX = event.clientX;
        currentY = event.clientY;
      }
      
      // Calcula a mudança de posição
      const deltaX = currentX - this.textStartX;
      const deltaY = currentY - this.textStartY;
      
      // Atualiza posição inicial para o próximo movimento
      this.textStartX = currentX;
      this.textStartY = currentY;
      
      // Atualiza a posição do texto
      this.textPositionX += deltaX;
      this.textPositionY += deltaY;
    },
    stopTextDrag() {
      this.isDraggingText = false;
      
      // Remove event listeners
      document.removeEventListener('mousemove', this.moveText);
      document.removeEventListener('touchmove', this.moveText);
      document.removeEventListener('mouseup', this.stopTextDrag);
      document.removeEventListener('touchend', this.stopTextDrag);
    },
    selectColor(index) {
      this.selectedColorIndex = index;
    },
    setTextHorizontalPosition(position) {
      this.textPositionH = position;
      this.textPositionX = 0; // Reset fine positioning when using preset positions
    },
    setTextVerticalPosition(position) {
      this.textPositionV = position;
      this.textPositionY = 0; // Reset fine positioning when using preset positions
    },
    setTextAlign(align) {
      this.textAlign = align;
    },
    getContrastColor() {
      // Detectar se a cor de fundo é escura para usar texto claro ou escuro
      const color = this.backgroundColors[this.selectedColorIndex];
      
      // Converter cor hex para RGB
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      
      // Calcular brilho (fórmula YIQ)
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      
      // Retornar cor do texto baseado no brilho do fundo
      return brightness > 128 ? '#000000' : '#FFFFFF';
    },
    generateUniqueId() {
      return 'capinha_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    },
    addToCart() {
      // Criar objeto do produto personalizado
      const productData = {
        id: this.generateUniqueId(),
        name: `Capinha Personalizada ${this.caseType}`,
        description: `Para ${this.phoneModel} - ${this.customText ? 'Com frase personalizada' : 'Personalizada'}`,
        price: this.price,
        image: this.imagePreview || '/api/placeholder/80/80',
        details: {
          phoneModel: this.phoneModel,
          caseType: this.caseType,
          customText: this.customText,
          backgroundColor: this.backgroundColors[this.selectedColorIndex],
          fontStyle: this.fontStyle,
          textSize: this.textSize,
          textPositionH: this.textPositionH,
          textPositionV: this.textPositionV,
          textAlign: this.textAlign,
          textPositionX: this.textPositionX,
          textPositionY: this.textPositionY,
          imageScale: this.imageScale,
          imagePositionX: this.imagePositionX,
          imagePositionY: this.imagePositionY
        }
      };
      
      // Disparar evento para adicionar ao carrinho
      window.dispatchEvent(
        new CustomEvent('add-to-cart', {
          detail: { quantity: 1 }
        })
      );
      
      // Disparar evento para adicionar o item específico ao carrinho
      window.dispatchEvent(
        new CustomEvent('add-item-to-cart', {
          detail: productData
        })
      );
      
      // Feedback visual para o usuário
      alert('Capinha personalizada adicionada ao carrinho!');
    }
  },
  mounted() {
    // Adicionar eventos globais para carregar ao montar o componente
  },
  beforeUnmount() {
    // Limpar event listeners ao desmontar o componente
    document.removeEventListener('mousemove', this.moveImage);
    document.removeEventListener('touchmove', this.moveImage);
    document.removeEventListener('mouseup', this.stopImageDrag);
    document.removeEventListener('touchend', this.stopImageDrag);
    
    document.removeEventListener('mousemove', this.moveText);
    document.removeEventListener('touchmove', this.moveText);
    document.removeEventListener('mouseup', this.stopTextDrag);
    document.removeEventListener('touchend', this.stopTextDrag);
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

.section-subtitle {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 1.2rem;
  color: var(--dark);
  opacity: 0.8;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.customizer {
  background-color: #f0f2f5;
}

.customizer-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.customizer-preview {
  height: 500px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: background-color 0.3s ease;
}

.phone-mockup {
  width: 65%;
  height: 90%;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  border: 10px solid #444;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
}

.custom-image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 1;
}

.custom-image {
  cursor: move; /* Indica que é arrastável */
  transition: transform 0.1s ease; /* Suaviza ajustes de posição */
  transform-origin: center;
  will-change: transform; /* Otimização de performance */
}

.custom-text-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  padding: 20px;
  text-align: center;
  z-index: 2;
  pointer-events: none; /* Permite que o texto não interfira com o arrastar da imagem */
}

.custom-text-container p {
  margin: 0;
  padding: 10px;
  word-wrap: break-word;
  max-width: 100%;
  cursor: move; /* Indica que é arrastável */
  pointer-events: auto; /* Permite que o texto seja arrastado */
  transition: transform 0.1s ease; /* Suaviza ajustes de posição */
  will-change: transform; /* Otimização de performance */
}

/* Estilos de fontes */
.font-moderna {
  font-family: 'Arial', sans-serif;
  font-weight: 700;
  letter-spacing: 1px;
}

.font-clássica {
  font-family: 'Times New Roman', serif;
  font-style: italic;
}

.font-manuscrita {
  font-family: 'Brush Script MT', cursive;
  line-height: 1.2;
}

.font-divertida {
  font-family: 'Comic Sans MS', cursive;
  font-weight: bold;
  transform: rotate(-2deg);
}

.model-overlay {
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.7);
  background-color: rgba(0, 0, 0, 0.3);
  padding: 5px 0;
  z-index: 3;
}

.customizer-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.form-control:focus {
  outline: none;
  border-color: var(--primary);
}

/* Controles de imagem e texto */
.image-controls,
.text-controls {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 12px;
  margin-top: 10px;
}

.control-group {
  margin-bottom: 12px;
}

.control-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 500;
}

.control-group input[type="range"] {
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: #ddd;
  outline: none;
  -webkit-appearance: none;
}

.control-group input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--primary);
  cursor: pointer;
}

.control-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.control-hint {
  font-size: 12px;
  color: #777;
  margin: 5px 0 0;
  font-style: italic;
}

.btn-group {
  display: flex;
  gap: 5px;
  margin-top: 5px;
}

.position-btn {
  flex: 1;
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.position-btn.active {
  background-color: var(--primary);
  color: white;
  border-color: var(--primary);
}

.position-btn:hover:not(.active) {
  background-color: #f0f0f0;
}

/* Ícones para posicionamento */
[class^="icon-"] {
  display: inline-block;
  width: 14px;
  height: 14px;
  position: relative;
}

.icon-left::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 8px;
  height: 2px;
  background-color: currentColor;
  transform: translateY(-50%);
}

.icon-center-h::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 8px;
  height: 2px;
  background-color: currentColor;
  transform: translate(-50%, -50%);
}

.icon-right::before {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  width: 8px;
  height: 2px;
  background-color: currentColor;
  transform: translateY(-50%);
}

.icon-top::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  width: 2px;
  height: 8px;
  background-color: currentColor;
  transform: translateX(-50%);
}

.icon-center-v::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 2px;
  height: 8px;
  background-color: currentColor;
  transform: translate(-50%, -50%);
}

.icon-bottom::before {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 2px;
  height: 8px;
  background-color: currentColor;
  transform: translateX(-50%);
}

.icon-align-left::before {
  content: '';
  position: absolute;
  left: 0;
  top: 3px;
  width: 14px;
  height: 2px;
  background-color: currentColor;
}

.icon-align-left::after {
  content: '';
  position: absolute;
  left: 0;
  top: 7px;
  width: 10px;
  height: 2px;
  background-color: currentColor;
}

.icon-align-center::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 3px;
  width: 14px;
  height: 2px;
  background-color: currentColor;
  transform: translateX(-50%);
}

.icon-align-center::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 7px;
  width: 10px;
  height: 2px;
  background-color: currentColor;
  transform: translateX(-50%);
}

.icon-align-right::before {
  content: '';
  position: absolute;
  right: 0;
  top: 3px;
  width: 14px;
  height: 2px;
  background-color: currentColor;
}

.icon-align-right::after {
  content: '';
  position: absolute;
  right: 0;
  top: 7px;
  width: 10px;
  height: 2px;
  background-color: currentColor;
}

.color-options {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}


.color-option {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
}

.color-option.active {
  border-color: var(--primary);
}

.btn {
  display: inline-block;
  padding: 0.8rem 2rem;
  background-color: var(--secondary);
  color: white;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  border: none;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  background-color: #e09010;
}

.remove-btn {
  margin-top: 0.5rem;
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.remove-btn:hover {
  background-color: #d32f2f;
}

/* Diferenças de tamanho específicas para modelos de telefone */
.iphone-15-pro-max {
  height: 92%;
}

.samsung-galaxy-s24-ultra {
  height: 95%;  
  width: 60%;
}

.xiaomi-14 {
  height: 88%;
  width: 62%;
}

@media (max-width: 992px) {
  .customizer-container {
    grid-template-columns: 1fr;
  }
  
  .customizer-preview {
    height: 350px;
  }
  
  .phone-mockup {
    width: 45%;
    height: 85%;
  }
}

@media (max-width: 768px) {
  .section {
    padding: 3rem 0;
  }
  
  .phone-mockup {
    width: 60%;
  }
}
</style>