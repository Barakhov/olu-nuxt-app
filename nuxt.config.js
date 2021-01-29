import colors from 'vuetify/es5/util/colors'

import axios from 'axios'
const axiosconfig = {
  headers: {
    Authorization:
      'Bearer skRFEruFoEKvBj9wxa917nlrzN4aCSx8wAap1bEcf1OH9X5Ynh21OzY4k2mZ8195SMDOgWOMZWpwmhWBS6RxpioF25b1TvSCYJGJZkAlFQvC5qCOx7466kJK5z0hMiqZfxbUVtXd9gw0EumrCg7z4ImVtrP0R1phVQpRYHDmK325iMzsDbBA',
  },
}

let dynamicRoutes = () => {
  return axios
    .get(
      `https://g9s2t6zf.api.sanity.io/v1/data/query/cursos?query=*%5B_type%20%3D%3D%20'course'%5D%7B%0A_id%2C%0A%22slug%22%3Aslug.current%0A%7D%0A%0A`,
      axiosconfig
    )
    .then((res) => {
      console.log(res.data)

      return res.data.result.map((el) => `/detalle-curso/${el.slug}/`)
    })
}

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - olu-nuxt-app',
    title: 'olu-nuxt-app',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;600;700&display=swap',
      },
    ],
  },

  generate: {
    // routes: ['/'],
    routes: dynamicRoutes,
  },

  router: {
    base: process.env.NODE_ENV === 'development' ? '/' : '/',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [{ src: '~assets/css/main.css', lang: 'css' }],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxtjs/axios',
    '@nuxt/content',
    [
      'nuxt-svg-sprite-module',
      {
        directory: '~/assets/images/svgsprite',
        // Optional template location: defaults to __dirname + /app.html
        //     templateLocation: "src/app.html",
        options: {
          // Configuration options:
          // https://github.com/jkphl/svg-sprite#configuration-basics
        },
      },
    ],
  ],

  axios: {
    baseURL: 'http://localhost:3000',
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
  },
}
