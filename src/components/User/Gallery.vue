<template>
  <swiper class="ob" ref="mySwiper" :options="swiperOptions">
    <swiper-slide v-for="banner in banners" :key="banner.id">
      <a :href="banner.URL">
        <b-card bg-variant="dark" overlay :img-src="banner.picture"
          ><b-card-body
            class="d-flex h-100 justify-content-center align-items-center"
            ><h2 class="d">{{ banner.text }}</h2></b-card-body
          ></b-card
        >
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import {fetch } from '@/modules/firebase'
import "swiper/css/swiper.css";
export default {
  name: 'Gallery',
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  data: () => ({
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
    banners: []
  }),
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive,
  },
  async mounted() {
    this.swiper.slideTo(3, 1000, false);
    this.banners = await fetch("/banners/main");
    this.swiperOptions.speed = await fetch("/banners/mainSpeed");
  }
}
</script>