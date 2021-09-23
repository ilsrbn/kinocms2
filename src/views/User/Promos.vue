<template>
  <article>
    <section class="content">
      <div class="container-fluid">
        <b-row>
          <b-col cols="12">
            <b-img fluid src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Sala_de_cine.jpg"></b-img>
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col cols="10">
            <h1 class="text-center">{{$t('promotions.h1')}}</h1>
            <b-row>
            <b-col v-for="(promotion, index) in promotions" :key="index" cols="6">
              <router-link :to="{name: 'Promo', params: {id: index}}">
              <b-card img-top :img-src="promotion[locale].banner != '' ? promotion[locale].banner : 'https://via.placeholder.com/1600x900.png'" bg-variant="dark">
                <b-card-title>{{promotion[locale].title}}</b-card-title>
                <b-card-text>
                  <p>{{promotion.date}}</p>
                </b-card-text>
              </b-card>
            </router-link>
            </b-col>
            </b-row>
          </b-col>
          <b-col><b-img fluid src="https://via.placeholder.com/200x900.png?text=Контекстная+реклама"></b-img></b-col>
        </b-row>
      </div>
    </section>
  </article>
</template>

<script>
import {fetch} from '@/modules/firebase'
export default {
  data: () => ({
    promotions: []
  }),

  computed: {
    locale() {
      return this.$i18n.locale
    }
  },

  async mounted() {
    this.promotions = await fetch('/promotions')
  }
};
</script>

<style>
</style>