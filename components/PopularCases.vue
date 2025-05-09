<template>
  <section class="section gallery" id="galeria">
    <div class="container">
      <h2 class="section-title">Galeria de Inspirações</h2>
      <p class="section-subtitle">Veja algumas criações dos nossos clientes e inspire-se para sua próxima capinha
        personalizada.</p>

      <div class="gallery-grid">
        <div v-for="(item, index) in galleryItems" :key="index" class="gallery-item" @click="showItemDetails(item)">
          <img :src="item.imgSrc" :alt="item.alt" class="gallery-img">
          <div class="gallery-overlay">
            <div>Ver Detalhes</div>
          </div>
        </div>
      </div>

      <!-- Modal para exibir detalhes (opcional) -->
      <div v-if="showModal" class="gallery-modal">
        <div class="modal-content">
          <span class="close-button" @click="closeModal">&times;</span>
          <img :src="selectedItem.imgSrc" :alt="selectedItem.alt" class="modal-img">
          <h3>{{ selectedItem.title }}</h3>
          <p>{{ selectedItem.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'GallerySection',
  data() {
    return {
      showModal: false,
      selectedItem: null,
      galleryItems: [
        {
          imgSrc: 'https://case4you.s3.amazonaws.com/products/5f934b0d36d8fb7995a7129f/images/viagem-simple-name-transp.jpg',
          alt: 'Inspiração 1',
          title: 'Capinha Personalizada - Família',
          description: 'Capinha com foto da família em alta definição.'
        },
        {
          imgSrc: 'https://down-br.img.susercontent.com/file/sg-11134201-22090-exyvokoghyhve5',
          alt: 'Inspiração 2',
          title: 'Capinha Personalizada - Pets',
          description: 'Capinha com foto do pet querido.'
        },
        {
          imgSrc: 'https://cdn.iset.io/assets/55268/produtos/52044/capa-para-celular.jpg',
          alt: 'Inspiração 3',
          title: 'Capinha Personalizada - Viagem',
          description: 'Capinha com fotos de momentos especiais de viagem.'
        },
        {
          imgSrc: 'https://acdn-us.mitiendanube.com/stores/003/559/920/products/moto-g84-83-2ae67159e665f1db8817010427076717-1024-1024.jpg',
          alt: 'Inspiração 4',
          title: 'Capinha Personalizada - Frases',
          description: 'Capinha com frase motivacional.'
        },
        {
          imgSrc: 'https://acdn-us.mitiendanube.com/stores/001/392/588/products/sao-paulo-611d24eaf24242e64816224998957985-1024-1024.png',
          alt: 'Inspiração 5',
          title: 'Capinha Personalizada - Artística',
          description: 'Capinha com design artístico exclusivo.'
        },
        {
          imgSrc: 'https://images-americanas.b2w.io/produtos/4855638595/imagens/capa-case-capinha-personalizada-samsung-a03-borboletas-cod-1386/4855638595_1_large.jpg',
          alt: 'Inspiração 6',
          title: 'Capinha Personalizada - Hobbies',
          description: 'Capinha temática para amantes de música.'
        },
        {
          imgSrc: 'https://photos.enjoei.com.br/case-iphone-13-pro-marvel-capinha-protetora-personalizada-personagem-84449589/800x800/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8xNTgzNTA3MS8zYTZiNTcxMWI3OWRlOTgzMDJjNDdiZmMzMTdhZTJmZC5qcGc',
          alt: 'Inspiração 7',
          title: 'Capinha Personalizada - Esportes',
          description: 'Capinha para torcedores apaixonados.'
        },
        {
          imgSrc: 'https://cdn.awsli.com.br/2500x2500/401/401817/produto/251920338/segery-x7kax5hvey.jpg',
          alt: 'Inspiração 8',
          title: 'Capinha Personalizada - Natureza',
          description: 'Capinha com fotos de paisagens naturais.'
        }
      ]

    }
  },
  methods: {
    showItemDetails(item) {
      this.selectedItem = item;
      this.showModal = true;
      document.body.style.overflow = 'hidden'; // Previne rolagem quando o modal está aberto
    },
    closeModal() {
      this.showModal = false;
      document.body.style.overflow = 'auto'; // Restaura rolagem quando o modal é fechado
    }
  },
  // Adiciona um evento de escuta para fechar o modal ao clicar ESC
  mounted() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.showModal) {
        this.closeModal();
      }
    });
  },
  // Remove o event listener quando o componente é destruído
  beforeUnmount() {
    document.removeEventListener('keydown', this.closeModal);
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

.gallery {
  background-color: #f0f2f5;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  height: 250px;
  cursor: pointer;
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-item:hover .gallery-img {
  transform: scale(1.1);
}

.gallery-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

/* Modal Styles */
.gallery-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 80%;
  max-height: 90%;
  overflow-y: auto;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 2rem;
  cursor: pointer;
  color: var(--dark);
}

.modal-img {
  width: 100%;
  max-height: 500px;
  object-fit: contain;
  margin-bottom: 1rem;
  border-radius: 8px;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .section {
    padding: 3rem 0;
  }

  .modal-content {
    max-width: 95%;
    padding: 1rem;
  }
}
</style>