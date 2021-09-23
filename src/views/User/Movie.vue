<template>
  <article>
    <section class="content">
      <div class="container-fluid">
        <b-row
          ><b-col>
            <b-card bg-variant="dark">
              <b-card-body>
                <b-embed type="iframe" aspect="16by9"
                :src="movie[locale].hyperlink"></b-embed>
                <b-container class="my-3">
                  <b-row>
                    <b-col cols="12" class="mb-2">
                      <b-form-group label-cols="2" :label="$t('movie.cinema')">
                      <b-form-select v-model="chosenCinema" :options="scheduleOptions">
                        <template #first>
                        <b-form-select-option value="" disabled>{{$t('movie.cinemaChoice')}}</b-form-select-option>
                        </template>
                      </b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col cols="3" v-for="(item,index) in scheduleList" :key="index">
                      <b-card no-body bg-variant="light">
                          <b-list-group flush>
                            <b-list-item>
                              {{$t('movie.hall')}}{{item.hall}}
                            </b-list-item>
                            <b-list-item>
                              {{$t('movie.time')}}{{item.time.slice(0, -3)}}
                            </b-list-item>
                            <b-list-item>
                              {{$t('movie.date')}}{{item.date}}
                            </b-list-item>
                          </b-list-group>
                      </b-card>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col><b-img fluid :src="movie[locale].banner"></b-img></b-col>
                    <b-col><h1>{{movie[locale].title}}</h1>
                    <h4>{{movie[locale].type.d3 ? '3d': ''}} {{movie[locale].type.imax ? 'imax': ''}}</h4>
                    <p style="opacity: 0.8">{{movie[locale].description}}</p></b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="2"></b-col>
                    <b-col cols="8">
                    <b-carousel controls img-height="300" v-if="gallery.length > 0">
                      <b-carousel-slide v-for="(photo, index) in gallery" :key="index" :img-src="photo"></b-carousel-slide>
                    </b-carousel>
                    </b-col>
                  </b-row>
                </b-container>
              </b-card-body>
            </b-card>
          </b-col
        ></b-row>
      </div>
    </section>
  </article>
</template>

<script>
import { fetch } from "@/modules/firebase";
export default {
  data: () => ({
    movie: {},
    schedule: [],
    chosenCinema: ''
  }),


  computed: {
    gallery() {
      return this.movie[this.locale].gallery.filter(t=> t != '')
    },
    locale() {
      return this.$i18n.locale;
    },

    scheduleList() {
      return this.schedule.filter(t => t.cinema == this.chosenCinema && t.movie == this.movie.ru.title)
    },

    scheduleOptions() {
      let schedule = []
      this.schedule.forEach(el => {
        if (!schedule.includes(el.cinema)) {
          schedule.push(el.cinema)
        }
      })

      return schedule
    }
  },

  async mounted() {
    this.movie = await fetch(`/movies/${this.$route.params.id}`)
    this.schedule = await fetch('/schedule')
  },
};
</script>

<style>
</style>