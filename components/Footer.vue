<!-- FooterComponent.vue -->
<template>
    <footer id="contato">
      <div class="container">
        <div class="footer-grid">
          <div>
            <h3 class="footer-heading">TEMCAPAS</h3>
            <p>Transformando seu celular em uma expressão do seu estilo com capinhas personalizadas de alta qualidade.</p>
            <div class="social-links">
              <a v-for="(social, index) in socialLinks" :key="index" :href="social.link" class="social-link">
                {{ social.icon }}
              </a>
            </div>
          </div>
          
          <div>
            <h3 class="footer-heading">Links Rápidos</h3>
            <ul class="footer-links">
              <li v-for="(link, index) in quickLinks" :key="index">
                <a :href="link.url">{{ link.text }}</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 class="footer-heading">Suporte</h3>
            <ul class="footer-links">
              <li v-for="(link, index) in supportLinks" :key="index">
                <a :href="link.url">{{ link.text }}</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 class="footer-heading">Contato</h3>
            <p v-for="(info, index) in contactInfo" :key="index">{{ info }}</p>
          </div>
        </div>
        
        <div class="copyright">
          <p>&copy; {{ new Date().getFullYear() }} TemCapas. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FooterComponent',
    data() {
      return {
        socialLinks: [
          { icon: 'F', link: '#' },  // Facebook
          { icon: 'I', link: '#' },  // Instagram
          { icon: 'T', link: '#' }   // Twitter
        ],
        quickLinks: [
          { text: 'Home', url: '#' },
          { text: 'Modelos', url: '#modelos' },
          { text: 'Personalizar', url: '#personalizar' },
          { text: 'Galeria', url: '#galeria' }
        ],
        supportLinks: [
          { text: 'FAQ', url: '#' },
          { text: 'Política de Envio', url: '#' },
          { text: 'Trocas e Devoluções', url: '#' },
          { text: 'Contato', url: '#' }
        ],
        contactInfo: [
          'contato@contato.com.br',
          '(43) 99999-9999',
          'Av. Principal, 1524 - Jacarezinho, PR'
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  footer {
    color:var(--dark);
    padding: 4rem 0 2rem;
  }
  
  .container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .footer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  .footer-heading {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
  }
  
  .footer-links {
    list-style: none;
  }
  
  .footer-links li {
    margin-bottom: 0.8rem;
  }
  
  .footer-links a {
    color: var(--dark);
    opacity: 0.7;
    text-decoration: none;
    transition: opacity 0.3s ease;
  }
  
  .footer-links a:hover {
    opacity: 1;
  }
  
  .social-links {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .social-link {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color:var(--dark);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: white;
    transition: all 0.3s ease;
    text-decoration: none;
  }
  
  .social-link:hover {
    background-color: var(--primary);
    transform: translateY(-3px);
  }
  
  .copyright {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    opacity: 0.7;
    font-size: 0.9rem;
  }
  </style>