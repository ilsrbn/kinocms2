<template>
  <article>
    <section class="content">
      <div class="container-fluid">
        <b-row>
          <b-col cols="12">
            <b-img
              fluid
              :src="
                cinema[locale].banner != ''
                  ? cinema[locale].banner
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
                <b-card class="mt-1" bg-variant="dark" :header="'Зал'" no-body>
                  <b-list-group flush>
                    <b-list-group-item
                      style="
                        color: white;
                        background: #202428;
                        border: 1px dotted #383f45;
                      "
                      v-for="(hall, index) in halls"
                      :key="index"
                      :to="{
                        name: 'Hall',
                        params: { id: allHalls.indexOf(hall) },
                      }"
                      >{{ hall[locale].title }}</b-list-group-item
                    >
                  </b-list-group>
                </b-card>
              </b-col>
              <b-col>
                <b-row>
                  <b-col cols="8">
                    <h1>{{ cinema[locale].title }}</h1>
                  </b-col>
                  <b-col cols="4"
                    ><b-img fluid :src="cinema[locale].logo"></b-img
                  ></b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col>
                    <h4>{{ $t("cinema.description") }}</h4>
                    <p>{{ cinema[locale].description }}</p>
                  </b-col>
                </b-row>
                <b-row class="mt-2">
                  <b-col>
                    <h4>{{ $t("cinema.terms") }}</h4>
                    <p>{{ cinema[locale].terms }}</p>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col>
                    <b-carousel
                      v-if="gallery.length > 0"
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
    cinema: {},
    allHalls: [],
  }),

  computed: {
    halls() {
      return this.allHalls.filter((el) => el.cinema == this.$route.params.id);
    },
    locale() {
      return this.$i18n.locale;
    },

    gallery() {
      return this.cinema[this.locale].gallery.filter((el) => el != "");
    },
  },

  async mounted() {
    this.cinema = await fetch(`/cinemas/${this.$route.params.id}`);
    this.allHalls = await fetch("/halls");
  },
};
</script>

<style>
</style>