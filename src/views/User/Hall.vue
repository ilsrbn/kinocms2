<template>
  <article>
    <section class="content">
      <div class="container-fluid">
        <b-row>
          <b-col cols="12">
            <b-img
              fluid
              :src="
                hall[locale].banner != ''
                  ? hall[locale].banner
                  : 'https://via.placeholder.com/1600x900.png'
              "
            ></b-img>
          </b-col>
          <b-col class="mt-5">
            <b-row>
              <b-col cols="2">
                <b-img
                  fluid
                  src="https://via.placeholder.com/200x400.png?text=Контекстная+реклама"
                ></b-img>
              </b-col>
              <b-col>
                <b-row>
                  <b-col cols="8">
                    <h1>{{ hall[locale].title }}</h1>
                  </b-col>
                  <b-col cols="4"
                    ><b-img fluid :src="hall[locale].logo"></b-img
                  ></b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col>
                    <h4>{{ $t("cinema.description") }}</h4>
                    <p>{{ hall[locale].description }}</p>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-carousel
                      v-if="gallery > 0"
                      controls
                      indicators
                      img-height="300"
                    >
                      <b-carousel-slide
                        :img-src="image"
                        v-for="(image, index) in gallery"
                        :key="index"
                      ></b-carousel-slide>
                    </b-carousel>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </section>
  </article>
</template>

<script>
import { fetch } from "@/modules/firebase";
export default {
  data: () => ({
    hall: {},
  }),

  computed: {
    locale() {
      return this.$i18n.locale;
    },

    gallery() {
      return this.hall[this.locale].gallery.filter((el) => el != "");
    },
  },

  async mounted() {
    this.hall = await fetch(`/halls/${this.$route.params.id}`);
  },
};
</script>

<style>
</style>