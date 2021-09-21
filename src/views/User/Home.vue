<template>
  <article>
    <section class="content">
      <div class="container-fluid p-4">
        <b-row>
          <swiper class="ob" ref="mySwiper" :options="swiperOptions">
          <swiper-slide v-for="banner in banners" :key="banner.id">
            <a :href="banner.URL">
              <b-card
              bg-variant="dark"
              overlay
              :img-src="banner.picture"
              ><b-card-body class="d-flex h-100 justify-content-center align-items-center"><h2 class="d">{{banner.text}}</h2></b-card-body></b-card>
            </a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        </b-row>
        <b-row class="mt-5">
          <h1 class="text-center">Смотрите сегодня</h1>
          <b-card bg-variant="dark">
            <b-card-body>
              <b-row>
                <b-col v-for="movie in curMovies" :key="movie.id" cols="4">
                  <b-card bg-variant="dark" img-top :img-src="movie.ru.banner">
                    <b-card-text>
                      <p>{{movie}}</p>
                    </b-card-text>
                  </b-card>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
        </b-row>
      </div>
    </section>
  </article>
</template>

<script>
import { fetch } from "@/modules/firebase";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
    curMovies() {
      return this.movies.filter(t => t.type == 'current')
    },
    soonMovies() {
      return this.movies.filter(t => t.type == 'soon')
    }
  },

  data: () => {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
        },
        loop: true,
        autoplay: true,
        spaceBetween: 50
        // Some Swiper option/callback...
      },
      banners: [],
      movies: [],
      interval: 5000,
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  directives: {
    swiper: directive,
  },

  async mounted() {
    console.log("Current Swiper instance object", this.swiper);
    this.swiper.slideTo(3, 1000, false);
    this.banners = await fetch("/banners/main");
    this.movies = await fetch("/movies")
    console.log(this.banners);
    this.interval = await fetch("/banners/mainSpeed");
  },
  name: "Home",
};
</script>

<style>

.d  {
  text-decoration: none;
  color: white;
  text-shadow: 0 0 0.2rem rgba(0,0,0,0.8);
}

</style>