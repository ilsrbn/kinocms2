<template>
  <article>
    <section class="content">
      <div class="container-fluid">
        <b-row>
          <b-col cols="12">
            <b-img
              fluid
              :src="
                about[locale].banner != ''
                  ? about[locale].banner
                  : 'https://via.placeholder.com/1600x900.png'
              "
            ></b-img>
          </b-col>
          <b-row class="my-5">
            <b-col cols="10">
              <h1>{{about[locale].title}}</h1>
              <p>{{about[locale].description}}</p>
              <b-col v-if="gallery.length > 0">
                <b-carousel img-height="400" controls indicators>
                  <b-carousel-slide v-for="(slide, index) in gallery" :key="index" :img-src="slide"></b-carousel-slide>
                </b-carousel>
              </b-col>
            </b-col>
            <b-col>
               <b-img
                  fluid
                  src="https://via.placeholder.com/200x1000.png?text=Контекстная+реклама"
                ></b-img>
            </b-col>
          </b-row>
        </b-row>
      </div>
    </section>
  </article>
</template>

<script>
import { fetch } from "@/modules/firebase";
export default {
  data: () => ({
    about: {},
  }),

  computed: {
    locale() {
      return this.$i18n.locale;
    },
    gallery() {
      return this.about[this.locale].gallery.filter(t=> t!= '')
    }
  },

  async mounted() {
    this.about = await fetch("/pages/1");
  },
};
</script>

<style>
</style>