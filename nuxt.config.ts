export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  modules: ['@nuxt/content', '@nuxt/eslint', '@nuxt/fonts', '@pinia/nuxt'],
  imports: {
    dirs: ['stores', 'composables'],
  },
  plugins: [
    '~/shoppingCart/plugins/cart.js'
  ],
})