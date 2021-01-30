<template>
  <v-main>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" v-show="false">
        <div class="text-center">
          <v-btn outlined class="rounded-0"> lolo y lolito</v-btn>
          <!-- <v-card>{{ coursesArray }}</v-card> -->
        </div>
      </v-col>
    </v-row>
    <v-card :elevation="0">
      <v-card-title class="text-h5 mb-2">
        <strong>Cursos</strong>
      </v-card-title>
      <v-data-table
        :elevation="0"
        :headers="tableHeaders"
        :items="coursesArray"
        :items-per-page="5"
      >
        <template v-slot:[`item.title`]="{ item }">
          <nuxt-link :to="`/detalle-curso/${item.slug}/`" class="course-title">
            {{ item.title }}
          </nuxt-link>
        </template>
      </v-data-table>
    </v-card>
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

  // GROQ query at sanity studio to get the below rest API url

  // *[_type == 'course']{
  // _id,
  // title,
  // "slug":slug[current],
  // price,
  // duration,
  // highlighted,
  // categories[]->{title,slug},
  // school->{title,website,slug}
  // }

  data() {
    return {
      coursesData: [],

      tableHeaders: [
        {
          text: 'Nombre',
          align: 'start',
          sortable: false,
          value: 'title',
        },
        { text: 'Temas', value: 'categories', sortable: false },
        { text: 'Escuela', value: 'school', sortable: false },
        { text: 'Duración', value: 'duration' },
        { text: 'Precio', value: 'price' },
        { text: ' ', value: 'highlighted', width: '2' },
      ],
    }
  },

  mounted() {
    const axiosAPIpath = `https://g9s2t6zf.api.sanity.io/v1/data/query/cursos?query=*%5B_type%20%3D%3D%20'course'%20%26%26%20approved%5D%7B%0A_id%2C%0Atitle%2C%0A%22slug%22%3Aslug.current%2C%20%20%0Aprice%2C%0Aduration%2C%0Ahighlighted%2C%0Acategories%5B%5D-%3E%7Btitle%2Cslug%7D%2C%0Aschool-%3E%7Btitle%2Cwebsite%2Cslug%7D%0A%7D%0A%0A`

    const axiosConfig = {
      headers: {
        Authorization:
          'Bearer skRFEruFoEKvBj9wxa917nlrzN4aCSx8wAap1bEcf1OH9X5Ynh21OzY4k2mZ8195SMDOgWOMZWpwmhWBS6RxpioF25b1TvSCYJGJZkAlFQvC5qCOx7466kJK5z0hMiqZfxbUVtXd9gw0EumrCg7z4ImVtrP0R1phVQpRYHDmK325iMzsDbBA',
      },
    }
    axios
      .get(axiosAPIpath, axiosConfig)
      .then((response) => (this.coursesData = response.data))
  },

  computed: {
    coursesArray: function () {
      let res = []
      if (this.coursesData.result) {
        const courses = this.coursesData.result
        courses.forEach((elem) => {
          let resObj = {}
          resObj.title = elem.title
          resObj.slug = elem.slug
          resObj.categories = elem.categories
            .map((item) => item.title)
            .join(', ')
          resObj.school = elem.school.title
          resObj.duration = elem.duration + ' horas'
          resObj.price = elem.price === 0 ? 'Gratis' : elem.price + '€'
          resObj.highlighted = elem.highlighted ? '🔥' : ''
          res.push(resObj)
        })
      }
      return res
    },
  },
}
</script>
<style scoped>
.course-title {
  color: #372fff;
  font-weight: 600;
  text-decoration: none;
}
</style>
