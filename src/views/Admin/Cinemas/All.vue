<template>
  <article>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <h1 class="mx-auto my-0">Кинотеатры</h1>
        </div>
      </div>
    </div>
    <section class="content">
      <div class="container-fluid">
        <b-row>
          <b-col>
            <b-card class="pb-0">
              <div
                v-if="!loaded"
                class="card-body d-flex justify-content-start"
              >
                <CardPreloader class="w-100 mh-100" />
              </div>
              <b-card-body class="pb-0" v-else>
                <b-row>
                  <b-col
                    v-for="(movie, index) in cinemas"
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
                        movie.ru.logo == ''
                          ? 'https://via.placeholder.com/1600x900.png'
                          : movie.ru.logo
                      "
                    >
                      <b-card-body class="px-0">
                        <b-button
                          class="mt-3"
                          variant="warning"
                          block
                          pill
                          :to="{ name: 'EditCinema', params: { id: index } }"
                        >
                          Редактировать
                        </b-button>
                        <b-button
                          block
                          pill
                          class="mx-auto"
                          @click="remove(index)"
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
    if ((await fetch("/cinemas")) != null) {
      this.cinemas = await fetch("/cinemas");
    }
    this.loaded = true;
  },
  data: () => ({
    loaded: false,
    cinemas: [],
  }),


  methods: {
    async add(type) {
      this.cinemas.push({
        id: `${Date.now()}_${Math.floor(Math.random() * 90000) + 10000}`,
        type,
        halls: [],
        ru: {
          title: "",
          description: "",
          terms: "",
          banner: "",
          logo: "",
          gallery: ["", "", "", ""],
          hyperlink: "",
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
          terms: "",
          banner: "",
          logo: "",
          gallery: ["", "", "", ""],
          hyperlink: "",
          seo: {
            url: "",
            title: "",
            keywords: "",
            description: "",
          },
        },
      });
      await save("/cinemas", this.cinemas);
      this.$router.push({
        name: "EditCinema",
        params: { id: `${this.cinemas.length - 1}` },
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

    async remove(key) {
      console.log("removing", key);
      const answer = window.confirm("Вы хотите удалить фильм?");
      if (!answer) {
        return;
      }

      console.log("Removing banners");
      this.removingState = "Баннеры удалены";
      await this.removeBannersFromStorage(key);
      this.makeToast();

      console.log("Removing logos");
      this.removingState = "Логотипы удалены";
      await this.removeLogosFromStorage(key);
      this.makeToast();

      console.log("Removing galleries");
      this.removingState = "Галереи удалены";
      await this.removeGalleriesFromStorage(key);
      this.makeToast();

      console.log("Filtering cinemas array locally");
      console.log("###\nBefore", this.cinemas);
      this.cinemas[key].halls.forEach(async element => {
        await save(`/halls/${element}`, null)
      })
      this.cinemas = this.cinemas.filter((t) => this.cinemas.indexOf(t) != key);
      console.log("###\nAfter", this.cinemas);

      console.log("Writing to db");
      this.removingState = "Записи в базе данных удалены";
      await save("/cinemas", this.cinemas);
      this.makeToast();
      this.removingState = "";
    },
    async removeBannersFromStorage(key) {
      //Remove russian Banner from storage
      if (this.cinemas[key].ru.banner != "") {
        try {
          await removeFromStorage(this.cinemas[key].ru.banner);
          console.log(
            "[SUCCESS]\n",
            this.cinemas[key].ru.banner,
            "removed from storage"
          );
        } catch (e) {
          console.log("Error", e);
        }
      }

      //Remove ukrainian Banner from storage
      if (this.cinemas[key].ua.banner != "") {
        try {
          await removeFromStorage(this.cinemas[key].ua.banner);
          console.log(
            "[SUCCESS]\n",
            this.cinemas[key].ua.banner,
            "removed from storage"
          );
        } catch (e) {
          console.log("Error", e);
        }
      }
    },
    async removeLogosFromStorage(key) {
      //Remove russian Banner from storage
      if (this.cinemas[key].ru.logo != "") {
        try {
          await removeFromStorage(this.cinemas[key].ru.logo);
          console.log(
            "[SUCCESS]\n",
            this.cinemas[key].ru.logo,
            "removed from storage"
          );
        } catch (e) {
          console.log("Error", e);
        }
      }

      //Remove ukrainian Banner from storage
      if (this.cinemas[key].ua.logo != "") {
        try {
          await removeFromStorage(this.cinemas[key].ua.logo);
          console.log(
            "[SUCCESS]\n",
            this.cinemas[key].ua.logo,
            "removed from storage"
          );
        } catch (e) {
          console.log("Error", e);
        }
      }
    },
    async removeGalleriesFromStorage(key) {
      //Remove russian Gallery
      for (var i = 0; i < this.cinemas[key].ru.gallery.length; i++) {
        if (this.cinemas[key].ru.gallery[i] != "") {
          try {
            await removeFromStorage(this.cinemas[key].ru.gallery[i]);
            console.log(
              "[SUCCESS]\n",
              this.cinemas[key].ru.gallery[i],
              "removed from storage"
            );
          } catch (e) {
            console.log("Error:", e);
          }
        }
      }

      //Remove ukrainian Gallery
      for (var q = 0; q < this.cinemas[key].ua.gallery.length; q++) {
        if (this.cinemas[key].ua.gallery[q] != "") {
          try {
            await removeFromStorage(this.cinemas[key].ua.gallery[q]);
            console.log(
              "[SUCCESS]\n",
              this.cinemas[key].ua.gallery[i],
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