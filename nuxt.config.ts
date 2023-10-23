import { Head } from ".nuxt/components";


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  css : ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css', "~/assets/scss/main.scss"],

  build : {
    transpile: ['vuetify']
  },

  modules: [ 
    '@pinia/nuxt',
    ['@nuxtjs/google-fonts', {
      families: {
        'Mitr': true,
        download: true,
        inject: true
      }
    }]
  ],
  pinia: {
    autoImports: [
      'defineStore', 'acceptHMRUpdate'
    ],
  },
  imports: {
    dirs: ['stores']
  },
  nitro: {
    preset: "firebase"
  }

})
