<template>
  <article>
    <section class="content">
      <div class="container-fluid p-4">
        <b-row>
          <b-col cols="6" v-for="(movie, index) in filtered" :key="index">

              <router-link :to="{name: 'Movie', params: {id: parseInt(findId(index, 'filtered'))}}">
              <b-card img-top :img-src="movie[locale].banner != '' ? movie[locale].banner : 'https://via.placeholder.com/1600x900.png'" bg-variant="dark">
                <b-card-title>{{movie[locale].title}}</b-card-title>
                <b-card-body>
                </b-card-body>
              </b-card>
            </router-link>
            </b-col>

          
        </b-row>
      </div>
    </section>
  </article>
</template>

<script>
import {fetch} from '@/modules/firebase'
export default {
  data: () => ({
    movies: []
  }),

  methods: {
    findId(index, type) {
      return this.movies.indexOf(this[type][index])
    }
  },

  computed: {
    filtered() {
      return this.movies.filter(t => t.type == 'current')
    },

    locale() {
      return this.$i18n.locale
    }
  },
  async mounted() {
    this.movies = await fetch('/movies')
  }
}
</script>

<style>

</style>