<template>
  <v-main>
    <v-card :elevation="0">
      <v-card-title class="text-h2 mb-2"> {{ courseData.title }} </v-card-title>
    </v-card>
    <v-card :elevation="0">
      <v-card-title class="text-h4 mb-2">
        <nuxt-link :to="'/detalle-escuela/' + courseData.school.slug.current">
          {{ courseData.school.title }}
        </nuxt-link>
      </v-card-title>
    </v-card>
    <v-card :elevation="4">
      <v-card-title class="text-h4 mb-10 pa-2">
        {{ $route.params.slug }}
      </v-card-title>
    </v-card>
    <v-card class="mb-10 pa-8">
      <block-content :blocks="courseData.body.es" />
    </v-card>
  </v-main>
</template>

<script>
import BlockContent from 'sanity-blocks-vue-component'
export default {
  components: {
    BlockContent,
  },

  async asyncData({ $axios, params }) {
    const courseSlug = params.slug
    const axiosURL = `https://g9s2t6zf.api.sanity.io/v1/data/query/cursos?query=*%5B_type%20%3D%3D%20'course'%20%26%26%20approved%20%26%26%20slug.current%20%3D%3D%20'${courseSlug}'%5D%7B%0A_id%2C%0Atitle%2C%0A%22slug%22%3Aslug.current%2C%20%20%0Aprice%2C%0Aduration%2C%0Ahighlighted%2C%0Acategories%5B%5D-%3E%7Btitle%2Cslug%7D%2C%0Aschool-%3E%7Btitle%2Cwebsite%2Cslug%7D%2C%0Abody%0A%7D%0A%0A`
    const axiosConfig = {
      headers: {
        Authorization:
          'Bearer skRFEruFoEKvBj9wxa917nlrzN4aCSx8wAap1bEcf1OH9X5Ynh21OzY4k2mZ8195SMDOgWOMZWpwmhWBS6RxpioF25b1TvSCYJGJZkAlFQvC5qCOx7466kJK5z0hMiqZfxbUVtXd9gw0EumrCg7z4ImVtrP0R1phVQpRYHDmK325iMzsDbBA',
      },
    }
    const courseDataResponse = await $axios.$get(axiosURL, axiosConfig)
    return { courseDataResponse }
  },
  data() {
    return {}
  },
  computed: {
    courseData: function () {
      return this.courseDataResponse.result[0] || {}
    },
  },
  methods: {},
}
</script>
<style scoped></style>
