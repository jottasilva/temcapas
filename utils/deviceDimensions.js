
const PHYSICAL_DIMENSIONS = {
  'iphone-15-pro-max': { width: 77.6, height: 160.9 },
  'iphone-15-pro': { width: 71.4, height: 146.7 },
  'iphone-15': { width: 71.6, height: 147.6 },
  'iphone-14-pro-max': { width: 77.6, height: 160.7 },
  'samsung-galaxy-s24-ultra': { width: 79.0, height: 162.3 },
  'samsung-galaxy-s24+': { width: 75.9, height: 158.5 },
  'samsung-galaxy-s24': { width: 70.6, height: 147.0 },
  'xiaomi-14': { width: 71.5, height: 152.8 }
};

/**
 * Dimensões para preview na tela (em pixels)
 * Mantém a proporção mas reduz o tamanho para melhor visualização
 */
const DISPLAY_DIMENSIONS = {
  'iphone-15-pro-max': { width: 200, height: 410 },
  'iphone-15-pro': { width: 190, height: 390 },
  'iphone-15': { width: 190, height: 390 },
  'iphone-14-pro-max': { width: 200, height: 410 },
  'samsung-galaxy-s24-ultra': { width: 200, height: 420 },
  'samsung-galaxy-s24+': { width: 195, height: 405 },
  'samsung-galaxy-s24': { width: 190, height: 390 },
  'xiaomi-14': { width: 190, height: 400 }
};

/**
 * Posições da câmera para cada modelo (em porcentagem do container)
 */
const CAMERA_POSITIONS = {
  'iphone-15-pro-max': { top: 3, left: 5, width: 40, height: 20 },
  'iphone-15-pro': { top: 3, left: 5, width: 40, height: 20 },
  'iphone-15': { top: 5, left: 50, width: 15, height: 4, borderRadius: '50%' },
  'iphone-14-pro-max': { top: 3, left: 5, width: 40, height: 20 },
  'samsung-galaxy-s24-ultra': { top: 5, left: 50, width: 6, height: 6, borderRadius: '50%' },
  'samsung-galaxy-s24+': { top: 5, left: 50, width: 6, height: 6, borderRadius: '50%' },
  'samsung-galaxy-s24': { top: 5, left: 50, width: 6, height: 6, borderRadius: '50%' },
  'xiaomi-14': { top: 5, left: 50, width: 6, height: 6, borderRadius: '50%' }
};

export default {
  getPhysicalDimensions(modelName) {
    const key = modelName.replace(/\s+/g, '-').toLowerCase();
    return PHYSICAL_DIMENSIONS[key] || { width: 75, height: 150 }; // Valores padrão
  },
  
  getDisplayDimensions(modelName) {
    const key = modelName.replace(/\s+/g, '-').toLowerCase();
    return DISPLAY_DIMENSIONS[key] || { width: 190, height: 400 }; // Valores padrão
  },
  
  getCameraPosition(modelName) {
    const key = modelName.replace(/\s+/g, '-').toLowerCase();
    return CAMERA_POSITIONS[key] || { top: 3, left: 5, width: 40, height: 20 }; // Valores padrão
  },
  
  // Converte as dimensões do display para escala real em mm
  getScaleFactor(modelName) {
    const key = modelName.replace(/\s+/g, '-').toLowerCase();
    const physical = PHYSICAL_DIMENSIONS[key] || { width: 75, height: 150 };
    const display = DISPLAY_DIMENSIONS[key] || { width: 190, height: 400 };
    
    // Retorna fator de escala (mm por pixel)
    return {
      x: physical.width / display.width,
      y: physical.height / display.height
    };
  }
};