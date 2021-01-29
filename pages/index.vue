<template>
  <v-main>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <div class="text-center">
          <v-btn outlined class="rounded-0"> lolo y lolito</v-btn>
          <v-card>{{ coursesArray }}</v-card>
        </div>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      class="elevation-1 mt-8"
    ></v-data-table>
  </v-main>
</template>

<script>
import axios from 'axios'
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo,
  },

  async asyncData({ $axios }) {
    const config = {
      headers: {
        Authorization:
          'Bearer skRFEruFoEKvBj9wxa917nlrzN4aCSx8wAap1bEcf1OH9X5Ynh21OzY4k2mZ8195SMDOgWOMZWpwmhWBS6RxpioF25b1TvSCYJGJZkAlFQvC5qCOx7466kJK5z0hMiqZfxbUVtXd9gw0EumrCg7z4ImVtrP0R1phVQpRYHDmK325iMzsDbBA',
      },
    }
    const coursesData = await $axios.$get(
      `https://g9s2t6zf.api.sanity.io/v1/data/query/cursos?query=*%5B_type%20%3D%3D%20'course'%5D%7B%0Atitle%2C%0Aprice%2C%0Acategories%2C%0Aschool-%3E%7Btitle%2Cwebsite%2Cslug%7D%0A%7D%0A`,
      config
    )
    return { coursesData }
  },

  data() {
    return {
      headers: [
        {
          text: 'Título',
          align: 'start',
          sortable: false,
          value: 'title',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
      ],
      desserts: [
        {
          title: 'Masajes Mallorquines',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          title: 'A pulso course',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
      ],
    }
  },
  computed: {
    coursesArray: function () {
      return this.coursesData.result
    },
  },
}
</script>
