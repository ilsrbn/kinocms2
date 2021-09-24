<template>
  <article>
    <section class="content">
      <div class="container-fluid">
        <b-row>
          <b-col cols="12">
            <b-img
              fluid
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Sala_de_cine.jpg"
            ></b-img>
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col cols="10">
            <h1 class="text-center">{{ $t("cinemas.h1") }}</h1>
            <b-row>
              <b-col v-for="(cinema, index) in cinemas" :key="index" cols="6">
                <router-link :to="{ name: 'Cinema', params: { id: index } }">
                  <b-card
                    img-top
                    :img-src="
                      cinema[locale].logo != ''
                        ? cinema[locale].logo
                        : 'https://via.placeholder.com/1600x900.png'
                    "
                    bg-variant="dark"
                  >
                    <b-card-title>{{ cinema[locale].title }}</b-card-title>
                    <b-card-body> </b-card-body>
                  </b-card>
                </router-link>
              </b-col>
            </b-row>
          </b-col>
          <b-col
            ><b-img
              fluid
              src="https://via.placeholder.com/200x900.png?text=Контекстная+реклама"
            ></b-img
          ></b-col>
        </b-row>
      </div>
    </section>
  </article>
</template>

<script>
import { fetch } from "@/modules/firebase";
export default {
  data: () => ({
    cinemas: [],
  }),

  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },

  async mounted() {
    this.cinemas = await fetch("/cinemas");
  },
};
</script>

<style>
</style>