<template>
  <v-main>
    <v-card :elevation="0">
      <v-card-title class="text-h2 mb-2"> {{ schoolData.title }} </v-card-title>
    </v-card>
    <v-card :elevation="0"> </v-card>
    <v-card :elevation="4">
      <v-card-title class="text-h4 mb-10 pa-2">
        {{ $route.params.slug }}
      </v-card-title>
    </v-card>
  </v-main>
</template>

<script>
export default {
  components: {},

  async asyncData({ $axios, params }) {
    const schoolSlug = params.slug

    const axiosURL = `https://g9s2t6zf.api.sanity.io/v1/data/query/cursos?query=*%5B_type%20%3D%3D%20'school'%20%26%26%20slug.current%20%3D%3D%20'${schoolSlug}'%5D%7B%0A_id%2C%0A%22slug%22%3Aslug.current%2C%0Atitle%2C%0Awebsite%0A%7D%0A%0A`
    const axiosConfig = {
      headers: {
        Authorization:
          'Bearer skRFEruFoEKvBj9wxa917nlrzN4aCSx8wAap1bEcf1OH9X5Ynh21OzY4k2mZ8195SMDOgWOMZWpwmhWBS6RxpioF25b1TvSCYJGJZkAlFQvC5qCOx7466kJK5z0hMiqZfxbUVtXd9gw0EumrCg7z4ImVtrP0R1phVQpRYHDmK325iMzsDbBA',
      },
    }
    const schoolDataResponse = await $axios.$get(axiosURL, axiosConfig)
    return { schoolDataResponse }
  },
  data() {
    return {}
  },
  computed: {
    schoolData: function () {
      return this.schoolDataResponse.result[0] || {}
    },
  },
  methods: {
    blocksToText: function (blocks) {
      return blocks.map((block) =>
        block.children.map((child) => child.text).join('')
      )
    },
  },
}
</script>
<style scoped></style>
