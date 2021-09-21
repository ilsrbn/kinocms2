<template>
  <article>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <h1 class="mx-auto my-0">Расписание</h1>
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
                <b-container class="text-center w-100 mb-3 mt-0">
                  <b-button @click="add" variant="light">ДОБАВИТЬ</b-button>
                </b-container>
                <b-card bg-variant="light" v-for="(item, index) in schedule" :key="index">

                  <b-card-body>
                    <b-form-row class="mb-2">
                      <b-col cols="4">
                        <b-form-select
                          :options="movies"
                          placeholder="фильм"
                          v-model="item.movie"
                        >
                          <template #first>
                            <b-form-select-option value="" disabled
                              >Выберите кинцо
                            </b-form-select-option>
                          </template></b-form-select
                        >
                      </b-col>
                      <b-col cols="5">
                        <b-form-datepicker
                          placeholder="Дата"
                          v-model="item.date"
                        ></b-form-datepicker>
                      </b-col>
                      <b-col cols="2">
                        <b-form-timepicker
                          placeholder="время"
                          v-model="item.time"
                          locale="ru"
                        ></b-form-timepicker>
                      </b-col>
                      <b-col cols="1" >
                        <b-button @click="remove(index)" class="w-100" variant="danger"
                      ><i class="fas fa-times"></i
                    ></b-button>
                      </b-col>
                    </b-form-row>
                    <b-form-row>
                      <b-col cols="4">
                        <b-form-select :options="cinemas" v-model="item.cinema">
                          <template #first>
                            <b-form-select-option value="" disabled
                              >Выберите кинотеатр
                            </b-form-select-option>
                          </template>
                        </b-form-select>
                      </b-col>
                      <b-col cols="4">
                        <b-form-select
                          :options="halls[item.cinema]"
                          v-model="item.hall"
                        >
                          <template #first>
                            <b-form-select-option value="" disabled
                              >Выберите зал
                            </b-form-select-option>
                          </template>
                        </b-form-select>
                      </b-col>
                      <b-col cols="4">
                        <b-form-input
                          type="number"
                          placeholder="Цена"
                          v-model="item.price"
                          @keypress="isNumber($event)"
                        ></b-form-input>
                      </b-col>
                    </b-form-row>
                  </b-card-body>
                </b-card>
                <b-container class="text-center w-100 mb-0 mt-3">
                  <SaveButton
                    :uploading="uploading"
                    :success="success"
                    @saveCards="save"
                  />
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
import SaveButton from "@/components/SaveButton";
import { fetch, save } from "@/modules/firebase";
export default {
  name: "All",
  components: {
    CardPreloader,
    SaveButton,
  },

  beforeRouteLeave(to, from, next) {
    if (this.saved) {
      next();
    } else {
      const answer = window.confirm(
        "Вы хотите уйти? У вас есть несохранённые изменения!"
      );
      if (answer) {
        next();
      } else {
        next(false);
      }
    }
  },

  async mounted() {
    if ((await fetch("/schedule")) != null) {
      this.schedule = await fetch("/schedule");
    }
    let movies = await fetch("/movies");
    for (let element in movies) {
      this.movies.push(movies[element].ru.title);
    }

    let cinemas = await fetch("/cinemas");
    for (let i in cinemas) {
      this.cinemas.push(cinemas[i].ru.title);
      this.$set(this.halls, cinemas[i].ru.title, []);
    }

    let halls = await fetch("/halls");
    for (let el in halls) {
      this.halls[this.cinemas[halls[el].cinema]].push(halls[el].ru.title);
    }
    this.loaded = true;
  },

  methods: {
    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    add() {
      this.schedule.push({
        id: `${Date.now()}_${Math.floor(Math.random() * 90000) + 10000}`,
        date: "",
        time: "",
        movie: "",
        cinema: "",
        hall: "",
        price: "",
      });
    },

    remove(index) {
      if (window.confirm("Вы уверены, что хотите удалить эту запись?")) {
        this.schedule = this.schedule.filter(
          (t) => this.schedule.indexOf(t) != index
        );
      }
    },
    async save() {
      this.uploading = true;
      await save("/schedule", this.schedule);
      this.saved = true;
      this.uploading = false;
      this.success = true;
      setTimeout(() => {
        this.success = false;
      }, 2000);
    },
  },

  data: () => ({
    loaded: false,
    uploading: false,
    success: false,
    schedule: [],
    movies: [],
    cinemas: [],
    halls: {},
    saved: false,
  }),
};
</script>

<style>
</style>