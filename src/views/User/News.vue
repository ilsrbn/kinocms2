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
            <h1 class="text-center">{{$t('news.h1')}}</h1>
            <b-row>
            <b-col v-for="(newsItem, index) in filtered" :key="index" cols="6">
              
              <b-card img-top :img-src="newsItem[locale].banner != '' ? newsItem[locale].banner : 'https://via.placeholder.com/1600x900.png'" bg-variant="dark">
                <b-card-title>{{newsItem[locale].title}}</b-card-title>
                <b-card-text>
                  <p>{{newsItem.date}}</p>
                  <p>{{newsItem[locale].description}}</p>
                </b-card-text>
              </b-card>
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
    news: []
  }),

  computed: {
    locale() {
      return this.$i18n.locale
    },
    filtered() {
      return this.news.filter(t=> t.status == true)
    }
  },

  async mounted() {
    this.news = await fetch('/news')
  }
};
</script>

<style>
</style>