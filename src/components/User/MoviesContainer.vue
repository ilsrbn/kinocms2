<template> <b-card bg-variant="dark">
            <h1 class="text-center">{{ $t("home.current") }}</h1>
            <b-card-body>
              <b-row class="mb-5">
                <b-col v-for="movie in curMovies" :key="movie.id" cols="4">
                  <b-card
                    bg-variant="dark"
                    img-top
                    :img-src="
                      movie[$i18n.locale].banner == ''
                        ? 'https://via.placeholder.com/1600x900.png'
                        : movie[$i18n.locale].banner
                    "
                  >
                    <b-card-text>
                      <p>{{ movie[$i18n.locale].title }}</p>
                    </b-card-text>
                  </b-card>
                </b-col>
              </b-row>
              <h1 class="text-center">{{ $t("home.soon") }}</h1>
              <b-row>
                <b-col v-for="movie in soonMovies" :key="movie.id" cols="4">
                  <b-card
                    bg-variant="dark"
                    img-top
                    :img-src="
                      movie[$i18n.locale].banner == ''
                        ? 'https://via.placeholder.com/1600x900.png'
                        : movie[$i18n.locale].banner
                    "
                  >
                    <b-card-text>
                      <p>{{ movie[$i18n.locale].title }}</p>
                    </b-card-text>
                  </b-card>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card></template>

<script>
import { fetch } from "@/modules/firebase";

export default {
  async mounted() {
    this.movies = await fetch("/movies");
  },
  computed: {
    curMovies() {
      return this.movies.filter((t) => t.type == "current");
    },
    soonMovies() {
      return this.movies.filter((t) => t.type == "soon");
    },
  },
  data: () => {
    return {
      movies: [],
    };
  },
};
</script>

<style>
</style>