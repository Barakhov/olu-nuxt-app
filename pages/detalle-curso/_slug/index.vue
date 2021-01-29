<template>
  <v-main>
    <v-card :elevation="0">
      <v-card-title class="text-h2 mb-2"> Página detalle curso </v-card-title>
    </v-card>
    <v-card :elevation="4">
      <v-card-title class="text-h4 mb-2">
        {{ $route.params.slug }}
      </v-card-title>
    </v-card>
  </v-main>
</template>

<script>
export default {
  components: {},

  data() {
    return {}
  },
  computed: {},
}
</script>
<style scoped></style>
