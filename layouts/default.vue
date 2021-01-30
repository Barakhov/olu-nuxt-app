<template>
  <v-app class="myFont">
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      :height="100"
      flat
      :color="'#FFF'"
      ><nuxt-link to="/">
        <svg class="logo-svg">
          <use class="icon__use" :xlink:href="'#icon-olu-logo-desktop'"></use>
        </svg>
      </nuxt-link>
      <v-app-bar-title class="logo-claim"
        >Café y cigarro -> figura de barro al
        <strong>99%</strong>
      </v-app-bar-title>

      <v-spacer />
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'One Level Up',
    }
  },
}
</script>

<style scoped>
/* temp styles of course jaja */
.logo-svg {
  -webkit-animation: filter-animation 12s infinite;
  animation: filter-animation 12s infinite;
}

@keyframes filter-animation {
  0% {
    filter: hue-rotate(0deg);
  }

  50% {
    filter: hue-rotate(360deg);
  }

  100% {
    filter: hue-rotate(0deg);
  }
}

.logo-claim {
  font-size: 16px;
  font-weight: 400;
  margin-top: 56px;
  margin-left: -56px;
}
</style>
