<template>
  <swiper class="ob" ref="mySwiper" :options="swiperOptions">
    <swiper-slide v-for="item in all" :key="item.id">

        <b-card bg-variant="dark" overlay :img-src="item[$i18n.locale].banner"
          ><b-card-body
            class="d-flex h-100 justify-content-center align-items-center"
            ><h2 class="d">{{ item[$i18n.locale].title }}</h2></b-card-body
          ></b-card
        >

    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import "swiper/css/swiper.css";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import {fetch} from '@/modules/firebase'
export default {
  data: () => ({
    promos: [],
    news: [],
    swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
        },
        loop: true,
        autoplay: true,
        spaceBetween: 50,
        speed: 500,
        // Some Swiper option/callback...
      },
  }),

  computed: {
    all() {

      let all = this.news
      this.promos.forEach(el => {
        all.push(el)
      })

      return all
    },
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
    
  },
   components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive,
  },

  async mounted() {
    this.promos = await fetch('/promotions')
    this.news = await fetch('/news')
    console.log(this.promos, this.news)
  }
}
</script>
<style>

</style>