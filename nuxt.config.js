const pkg = require('./package');
const webpack = require("webpack");
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'BunnyFap - Porn Made Simple',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "Bunnyfap is a powerful community driven platform powered by cutting edge artificial intelligence to provide you with content that makes you happy." }
    ],
    link: [
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', sizes: '24x24', href: '/favicon-24x24.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '64x64', href: '/favicon-64x64.png' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Material+Icons'
      },
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  // loading: { color: '#B29126' },
  loading: false,

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl',
    // 'swiper/dist/css/swiper.css'
    "~/assets/style/vue-multiselect.css"
  ],


  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify',
    {src: '@/plugins/vuex-persist', ssr:false},
    {src: '@/plugins/mdi_icons', ssr:false},
    // { src: '~/plugins/nuxt-swiper-plugin.js', ssr: false },
    // { src: '~/plugins/vue-typer.js', ssr: false },
    { src: '~/plugins/vue-touch.js', ssr: false},
    // { src: '~/plugins/vue-slider.js', ssr: false},
    {src: '~/plugins/vue-multiselect', ssr:false},
    {src: '~/plugins/vue-shortkey', ssr:false},
    {src: '~/plugins/vue-bus', ssr:false},
    {src: '~/plugins/vue-line-clamp', ssr:false},
    {src: '~/plugins/vue-wordcloud', ssr:false},
    {src: '~/plugins/vue-plotly', ssr:false},
    {src: '~/plugins/vue-readmore', ssr:false},
    {src: '~/plugins/vue-tour', ssr:false},


  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    ['@nuxtjs/google-analytics', {
      id: 'UA-143843306-1'
    }],
    [
      'nuxt-seo'
    ],
    ['@nuxtjs/axios'],

  ],

  axios:{
    baseURL:'https://api.bunnyfap.com'
    // baseURL:'http://localhost:8000'
  },

  seo: {
    // Module options
    name: 'BunnyFap - Porn Made Simple',
    title:'BunnyFap - Porn Made Simple',
    description: 'BunnyFap learns your tastes and delivers the porn you love. Just sit back, relax and keep hopping!',
    keywords:['porn','nsfw', 'bunnyfap', 'sex', 'autofap', 'bunnyporn', 'betterfap', 'aifap', 'mlporn', 'smart porn',
    'porn recommendations', 'machine learning porn', 'artificial intelligence porn', 'automatic porn recommendations',
    'bunny fap', 'bunny porn', 'aif alternative', 'betterfap alternative']
    //...
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
    // vendor:['lightgallery', 'lg-video', 'jquery']
  }
};
