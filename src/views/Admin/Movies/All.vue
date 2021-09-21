<template>
  <article>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <h1 class="mx-auto my-0">Фильмы</h1>
        </div>
      </div>
    </div>
    <section class="content">
      <div class="container-fluid">
        <b-row>
          <b-col>
            <b-card class="pb-0">
              <h4>Текущие</h4>
              <div
                v-if="!loaded"
                class="card-body d-flex justify-content-start"
              >
                <CardPreloader class="w-100 mh-100" />
              </div>
              <b-card-body class="pb-0" v-else>
                <b-row>
                  <b-col
                    v-for="(movie, index) in curMovies"
                    :key="index"
                    lg="3"
                    md="4"
                    sm="6"
                    cols="12"
                  >
                    <b-card
                    bg-variant="light"
                      :title="movie.ru.title"
                      :img-src="
                        movie.ru.banner == ''
                          ? 'https://via.placeholder.com/1600x900.png'
                          : movie.ru.banner
                      "
                    >
                      <b-card-body class="px-0">
                        <b-button
                          class="mt-3"
                          variant="warning"
                          block
                          pill
                          :to="{ name: 'EditMovie', params: { id: findId(index, 'curMovies') } }"
                        >
                          Редактировать
                        </b-button>
                        <b-button
                          block
                          pill
                          class="mx-auto"
                          @click="remove(movie.id)"
                          variant="danger"
                          >Удалить</b-button
                        >
                      </b-card-body>
                    </b-card>
                  </b-col>
                </b-row>

                <b-container class="text-center w-100 mb-0 mt-3">
                  <b-button @click="add('current')" variant="light"
                    >ДОБАВИТЬ</b-button
                  >
                </b-container>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-card class="pb-0">
              <h4>Покажут скоро</h4>
              <div
                v-if="!loaded"
                class="card-body d-flex justify-content-start"
              >
                <CardPreloader class="w-100 mh-100" />
              </div>
              <b-card-body class="pb-0" v-else>
                <b-row>
                  <b-col
                    v-for="(movie, index) in soonMovies"
                    :key="index"
                    lg="3"
                    md="4"
                    sm="6"
                    cols="12"
                  >
                    <b-card
                    bg-variant="light"
                      :title="movie.ru.title"
                      :img-src="
                        movie.ru.banner == ''
                          ? 'https://via.placeholder.com/1600x900.png'
                          : movie.ru.banner
                      "
                    >
                      <b-card-body class="px-0">
                        <b-button
                          class="mt-3"
                          variant="warning"
                          block
                          pill
                          :to="{ name: 'EditMovie', params: { id: findId(index, 'soonMovies') } }"
                        >
                          Редактировать
                        </b-button>
                        <b-button
                          block
                          pill
                          class="mx-auto"
                          @click="remove(movie.id)"
                          variant="danger"
                          >Удалить</b-button
                        >
                      </b-card-body>
                    </b-card>
                  </b-col>
                </b-row>
                <b-container class="text-center w-100 mb-0 mt-3">
                  <b-button @click="add('soon')" variant="light"
                    >ДОБАВИТЬ</b-button
                  >
                </b-container>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </section>
  </article>
</template>

<script>
import CardPreloader from "@/components/CardPreloader";
import { fetch, save, removeFromStorage } from "@/modules/firebase";
export default {
  name: "All",
  async mounted() {
    if ((await fetch("/movies")) != null) {
      this.movies = await fetch("/movies");
    }
    this.loaded = true;
  },
  data: () => ({
    loaded: false,
    movies: [],
  }),

  computed: {
    curMovies() {
      return this.movies.filter((t) => t.type == "current");
    },

    soonMovies() {
      return this.movies.filter((t) => t.type == "soon");
    },
  },

  methods: {

    findId(index, type) {
      return this.movies.indexOf(this[type][index])
    },


    async add(type) {
      this.movies.push({
        id: `${Date.now()}_${Math.floor(Math.random() * 90000) + 10000}`,
        type,
        ru: {
          title: "",
          description: "",
          banner: "",
          gallery: ["", "", "", ""],
          hyperlink: "",
          type: {
            d2: true,
            d3: false,
            imax: false,
          },
          seo: {
            url: "",
            title: "",
            keywords: "",
            description: "",
          },
        },
        ua: {
          title: "",
          description: "",
          banner: "",
          gallery: ["", "", "", ""],
          hyperlink: "",
          type: {
            d2: true,
            d3: false,
            imax: false,
          },
          seo: {
            url: "",
            title: "",
            keywords: "",
            description: "",
          },
        },
      });
      await save("/movies", this.movies);
      this.$router.push({
        name: "EditMovie",
        params: { id: `${this.movies.length - 1}` },
      });
    },
    makeToast() {
      this.$bvToast.toast(this.removingState, {
        title: "Успех",
        autoHideDelay: 1000,
        variant: "success",
        solid: true,
      });
    },

    getKey(index) {
      let key;
      for (let idx = 0; idx < this.movies.length; idx++) {
        const element = this.movies[idx];
        if (element.id == index) {
          key = idx;
        }
      }
      return key;
    },

    async remove(index) {
      console.log("removing");
      const answer = window.confirm("Вы хотите удалить фильм?");
      if (!answer) {
        return;
      }

      let key = this.getKey(index);

      console.log("Removing banners");
      this.removingState = "Баннеры удалены";
      await this.removeBannersFromStorage(key);
      this.makeToast();

      console.log("Removing galleries");
      this.removingState = "Галереи удалены";
      await this.removeGalleriesFromStorage(key);
      this.makeToast();

      console.log("Filtering movies array locally");
      console.log("###\nBefore", this.movies);
      this.movies = this.movies.filter((t) => this.movies.indexOf(t) != key);
      console.log("###\nAfter", this.movies);

      console.log("Writing to db");
      this.removingState = "Записи в базе данных удалены";
      await save("/movies", this.movies);
      this.makeToast();
      this.removingState = "";
    },
    async removeBannersFromStorage(key) {
      //Remove russian Banner from storage
      if (this.movies[key].ru.banner != "") {
        try {
          await removeFromStorage(this.movies[key].ru.banner);
          console.log(
            "[SUCCESS]\n",
            this.movies[key].ru.banner,
            "removed from storage"
          );
        } catch (e) {
          console.log("Error", e);
        }
      }

      //Remove ukrainian Banner from storage
      if (this.movies[key].ua.banner != "") {
        try {
          await removeFromStorage(this.movies[key].ua.banner);
          console.log(
            "[SUCCESS]\n",
            this.movies[key].ua.banner,
            "removed from storage"
          );
        } catch (e) {
          console.log("Error", e);
        }
      }
    },
    async removeGalleriesFromStorage(key) {
      //Remove russian Gallery
      for (var i = 0; i < this.movies[key].ru.gallery.length; i++) {
        if (this.movies[key].ru.gallery[i] != "") {
          try {
            await removeFromStorage(this.movies[key].ru.gallery[i]);
            console.log(
              "[SUCCESS]\n",
              this.movies[key].ru.gallery[i],
              "removed from storage"
            );
          } catch (e) {
            console.log("Error:", e);
          }
        }
      }

      //Remove ukrainian Gallery
      for (var q = 0; q < this.movies[key].ua.gallery.length; q++) {
        if (this.movies[key].ua.gallery[q] != "") {
          try {
            await removeFromStorage(this.movies[key].ua.gallery[q]);
            console.log(
              "[SUCCESS]\n",
              this.movies[key].ua.gallery[i],
              "removed from storage"
            );
          } catch (e) {
            console.log("Error:", e);
          }
        }
      }
    },
  },
  components: {
    CardPreloader,
  },
};
</script>
<style>
.card > .card-body {
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>