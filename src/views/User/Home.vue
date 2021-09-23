<template>
  <article>
    <section class="content">
      <div class="container-fluid p-4">
        <b-row>
          <Gallery />
        </b-row>
        <b-row class="mt-5">
          <MoviesContainer />
        </b-row>
        <b-row class="mt-5"
          ><h1 class="text-center">{{ $t("home.promos") }}</h1>
          <Promos
        /></b-row>
        <b-row class="mt-5">
          <b-col cols="3"></b-col>
          <b-col cols="6">
            <b-img fluid src="https://via.placeholder.com/1600x900.png?text=Контекстная+реклама"></b-img>
          </b-col>
          <b-col cols="3"></b-col>
        </b-row>
        <b-row class="mt-2"><p>{{seo[locale].text}}</p></b-row>

      </div>
    </section>
  </article>
</template>

<script>
import Gallery from "@/components/User/Gallery";
import MoviesContainer from "@/components/User/MoviesContainer";
import Promos from "@/components/User/Promos";

import {fetch} from '@/modules/firebase'
export default {
  components: {
    Gallery,
    MoviesContainer,
    Promos,
  },

  computed: {
    locale() {
      return this.$i18n.locale
    }
  },

  data: () => ({
    seo: {}
  }),

  async mounted() {
    this.seo = await fetch('/pages/0')
  },

  name: "Home",
};
</script>

<style>
.d {
  text-decoration: none;
  color: white;
  text-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.8);
}

.swiper-pagination-bullet {
  background: #aa1416;
}
</style>