<template>
  <div v-if="!loaded">
    <CardPreloader />
  </div>
  <article v-else>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <h1 class="mx-auto my-0">Редактирование кинотеатра</h1>
        </div>
      </div>
    </div>
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <b-card no-body>
              <b-tabs card>
                <b-tab
                  v-for="(item, key) in cinemas"
                  :key="key"
                  :title="whichLang(key)"
                >
                  <b-overlay :show="show">
                  <b-card-text :aria-hidden="show ? 'true' : null">
                    
                    <b-form-group
                      label="Название кинотеатра"
                      :label-for="'title-' + key"
                    >
                      <b-form-input
                        :id="'title-' + key"
                        v-model="item.title"
                        placeholder="Введите название кинотеатра"
                        class="col-lg-4 col-md-6 col-12"
                      />
                    </b-form-group>

                    <b-form-group
                      label="Описание кинотеатра"
                      :label-for="'description-' + key"
                    >
                      <b-form-textarea
                        :id="'description-' + key"
                        v-model="item.description"
                        placeholder="Введите описание кинотеатра"
                        class="col-lg-6 col-md-8 col-12"
                      />
                    </b-form-group>

                    <b-form-group
                      label="Условия"
                      :label-for="'terms-' + key"
                    >
                      <b-form-textarea
                        :id="'terms-' + key"
                        v-model="item.terms"
                        placeholder="Введите условия кинотеатра"
                        class="col-lg-6 col-md-8 col-12"
                      />
                    </b-form-group>

                    <b-form-group
                      label="Логотип"
                      :label-for="'logo-' + key"
                    >
                      <b-form-file
                        class="col-lg-6 col-md-8 col-12"
                        accept="image/*"
                        browse-text="Выбрать файл"
                        @change="logoPreview(key, $event)"
                        :id="'logo-' + key"
                      />
                      <b-button
                        v-if="item.logo != ''"
                        class="ml-2"
                        pill
                        @click="logoClear(key)"
                        variant="danger"
                        >Удалить</b-button
                      >
                      <br />
                      <b-container class="col-lg-6 col-md-8 col-12 ml-0 mt-1">
                        <b-img
                          fluid
                          :src="
                            item.logo
                              ? item.logo
                              : 'https://via.placeholder.com/1600x900.png'
                          "
                        />
                      </b-container>
                    </b-form-group>

                    <b-form-group
                      label="Фото верхнего банера"
                      :label-for="'banner-' + key"
                    >
                      <b-form-file
                        class="col-lg-6 col-md-8 col-12"
                        accept="image/*"
                        browse-text="Выбрать файл"
                        @change="bannerPreview(key, $event)"
                        :id="'banner-' + key"
                      />
                      <b-button
                        v-if="item.banner != ''"
                        class="ml-2"
                        pill
                        @click="bannerClear(key)"
                        variant="danger"
                        >Удалить</b-button
                      >
                      <br />
                      <b-container class="col-lg-6 col-md-8 col-12 ml-0 mt-1">
                        <b-img
                          fluid
                          :src="
                            item.banner
                              ? item.banner
                              : 'https://via.placeholder.com/1600x900.png'
                          "
                        />
                      </b-container>
                    </b-form-group>

                    <b-container>
                      <b-row>
                        <b-col>
                          <b-card title="Галерея картинок">
                            <b-card-text>
                              <b-container class="pt-2">
                                <b-row>
                                  <b-col
                                    v-for="(galleryItem, index) in item.gallery"
                                    :key="index"
                                    lg="3"
                                    md="6"
                                    col
                                  >
                                    <b-card
                                      img-top
                                      :img-src="
                                        galleryItem
                                          ? galleryItem
                                          : 'https://via.placeholder.com/1600x900.png'
                                      "
                                    >
                                      <b-card-text>
                                        <b-form-file
                                          placeholder=""
                                          browse-text="Выбрать файл"
                                          accept="image/*"
                                          @change="
                                            galleryPreview(index, key, $event)
                                          "
                                        />
                                        <b-button
                                          v-if="galleryItem"
                                          class="mx-auto mt-2"
                                          pill
                                          block
                                          variant="danger"
                                          @click="galleryClear(index, key)"
                                          >Удалить</b-button
                                        >
                                      </b-card-text>
                                    </b-card>
                                  </b-col>
                                </b-row>
                              </b-container>
                            </b-card-text>
                          </b-card>
                        </b-col>
                      </b-row>
                    </b-container>

                    <b-form-group
                      label="Ссылка на видео"
                      :label-for="'hyperlink-' + key"
                    >
                      <b-form-input
                        :id="'hyperlink-' + key"
                        v-model="item.hyperlink"
                        placeholder="Введите ссылку на видео в Youtube"
                        class="col-lg-6 col-md-8 col"
                      />
                    </b-form-group>

                    <b-table
                      head-variant="light"
                      hover

                      id="halls"
                      outlined
                      responsive
                      :per-page="perPage"
                      :current-page="currentPage"

                      :fields="keys"
                      :items="items"
                    >
                    <template #cell(edit)="data">
                      <router-link :disabled="show" class="btn btn-warning" :to="{name: 'HallPage', params: {id: data.value}}"><i class="fas fa-pen"></i></router-link>
                    </template>
                    <template #cell(remove)="data">
                      <b-button :disabled="show" @click="remove(data.value)" variant="danger"><i class="fas fa-times"></i></b-button>
                    </template>
                    </b-table>
                    <b-pagination
                    aria-controls="halls"
                    :total-rows="rows"
                    :per-page="perPage"
                    align="center"
                    v-model="currentPage"
                    pills
                    ></b-pagination>

                    <b-container class="w-100 text-center">
                      <b-button :disabled="show" variant="light" @click="add">ДОБАВИТЬ ЗАЛ</b-button>
                    </b-container>

                    <b-form-group label="SEO">
                      <b-container class="ml-3">
                        <b-form-group label="URL" :label-for="'seo-url-' + key">
                          <b-form-input
                            :id="'seo-url-' + key"
                            v-model="item.seo.url"
                            placeholder="URL"
                            class="col-lg-6 col-md-8 col"
                          />
                        </b-form-group>
                        <b-form-group
                          label="Title"
                          :label-for="'seo-title-' + key"
                        >
                          <b-form-input
                            :id="'seo-title-' + key"
                            v-model="item.seo.title"
                            placeholder="Title"
                            class="col-lg-6 col-md-8 col"
                          />
                        </b-form-group>
                        <b-form-group
                          label="Description"
                          :label-for="'seo-description-' + key"
                        >
                          <b-form-textarea
                            :id="'seo-description-' + key"
                            v-model="item.seo.description"
                            placeholder="Description"
                            class="col-lg-6 col-md-8 col"
                          />
                        </b-form-group>
                        <b-form-group
                          label="Keywords"
                          :label-for="'seo-keywords-' + key"
                        >
                          <b-form-input
                            :id="'seo-keywords-' + key"
                            v-model="item.seo.keywords"
                            placeholder="Keywords"
                            class="col-lg-6 col-md-8 col"
                          />
                        </b-form-group>
                      </b-container>
                    </b-form-group>
                    <b-container class="text-center">
                      <SaveButton
                        :uploading="uploading"
                        :success="success"
                        @saveCards="save"
                      />
                      <p class="mt-5 mb-1" v-if="loadingState != ''">
                        {{ loadingState }}
                      </p>
                      <b-progress
                        v-if="loadingAll != 0"
                        class="mt-0"
                        :value="loadingLeft"
                        :max="loadingAll"
                        height="2px"
                      >
                      </b-progress>
                      <b-progress
                        v-if="removingAll != 0"
                        class="mt-0"
                        :value="removingLeft"
                        :max="removingAll"
                        variant="danger"
                        height="2px"
                      >
                      </b-progress>
                    </b-container>
                  </b-card-text>
                  </b-overlay>
                </b-tab>
              </b-tabs>
            </b-card>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
import {
  fetch,
  save,
  removeFromStorage,
  addToStorage,
} from "@/modules/firebase";
import CardPreloader from "@/components/CardPreloader";
import SaveButton from "@/components/SaveButton";

export default {
  name: "Edit",
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

  components: { CardPreloader, SaveButton },

  data() {
    return {
      perPage: 5,
      currentPage: 1,

      show: false,
      saved: false,
      loaded: false,
      uploading: false,
      success: false,
      path: `/cinemas/${this.$route.params.id}`,

      keys: [
        {key: 'title', label: "Номер"},
        {key: 'date', label: "Дата создания"},
        { key: 'edit', label: ''},
        { key: 'remove', label: ''},
      ],
      allHalls: [],

      loadingState: "",
      loadingAll: 0,
      loadingLeft: 0,
      removingAll: 0,
      removingLeft: 0,

      cinemasFull: {},
      galleryRemove: { ru: ["", "", "", ""], ua: ["", "", "", ""] },
      galleryWrite: { ru: ["", "", "", ""], ua: ["", "", "", ""] },

      bannerRemove: { ru: "", ua: "" },
      bannerWrite: { ru: "", ua: "" },

      logoRemove: { ru: "", ua: "" },
      logoWrite: { ru: "", ua: "" },
    };
  },
  computed: {
    cinemas() {
      return { ru: this.cinemasFull.ru, ua: this.cinemasFull.ua };
    },

    rows() {
      return this.items.length
    },

    halls() {
      let halls = this.allHalls.filter(el => el.cinema == this.$route.params.id)

      return halls
    },

    items() {
      let items = []

      this.halls.forEach(hall => {

        items.push({
          title: hall.ru.title,
          date: this.formatDate(hall.id.slice(0, 13)),
          edit: this.allHalls.indexOf(hall),
          remove: this.allHalls.indexOf(hall)
        })
      })

    return items

    },

    uploadingCounter() {
      let all = 0;
      for (const lang in this.galleryWrite) {
        for (let i = 0; i < this.galleryWrite[lang].length; i++) {
          let el = this.galleryWrite[lang][i];
          if (el != "") {
            all += 1;
          }
        }
      }

      for (const language in this.bannerWrite) {
        if (this.bannerWrite[language] != "") {
          all += 1;
        }
      }

      for (const language in this.logoWrite) {
        if (this.logoWrite[language] != "") {
          all += 1;
        }
      }

      return all;
    },

    removingCounter() {
      let all = 0;
      for (const lang in this.galleryRemove) {
        for (let i = 0; i < this.galleryRemove[lang].length; i++) {
          let el = this.galleryRemove[lang][i];
          if (el != "") {
            all += 1;
          }
        }
      }

      for (const language in this.bannerRemove) {
        if (this.bannerRemove[language] != "") {
          all += 1;
        }
      }

      for (const language in this.logoRemove) {
        if (this.logoRemove[language] != "") {
          all += 1;
        }
      }

      return all;
    },
  },

  async mounted() {
    this.loaded = false;
    if (await fetch(this.path) != null) {
      this.cinemasFull = await fetch(this.path);
    } else {
      this.$router.push({ name: "AllCinemas" });
    }

    if (!this.cinemasFull.halls) {
      this.cinemasFull.halls = []
      this.loaded = true
      return
    }

    this.allHalls = await fetch(`/halls`)

    this.loaded = true;
  },

  methods: {
    async add() {
      this.show = true
      let id = `${Date.now()}_${Math.floor(Math.random() * 90000) + 10000}`
      this.allHalls.push({
        id,
        cinema: this.$route.params.id,
        ru: {
          title: "",
          description: "",
          banner: "",
          logo: "",
          gallery: ["", "", "", ""],
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
          logo: "",
          gallery: ["", "", "", ""],
          seo: {
            url: "",
            title: "",
            keywords: "",
            description: "",
          },
        },
      })
      this.cinemasFull.halls.push(this.allHalls.length - 1)
      await save("/halls", this.allHalls)
      this.uploading = true;

      this.loadingState = "Удаление изображений...";
      this.removingAll = this.removingCounter;

      await this.removeGalleryFromStorage();
      await this.removeBannerFromStorage();
      await this.removeLogoFromStorage();

      this.removingAll = 0;
      this.removingLeft = 0;

      this.loadingState = "Загрузка изображений...";
      this.loadingAll = this.uploadingCounter;

      await this.writeGalleryToStorage();
      await this.writeBannerToStorage();
      await this.writeLogoToStorage();

      this.loadingAll = 0;
      this.loadingLeft = 0;

      await save(`/cinemas/${this.$route.params.id}`, this.cinemasFull);
      this.saved = true;
      this.loadingState = "";
      this.uploading = false;
      this.success = true;
      setTimeout(() => {
        this.success = false;
      }, 2000);
      this.show= false
      this.$router.push({name: 'HallPage', params: {id: `${this.allHalls.length -1}`}})
    },

    async remove(id) {
      this.$set(this.cinemasFull.halls, id, null)
      this.$set(this.halls, id, null)
      delete this.cinemasFull.halls[id]
      delete this.halls[id]

      await save(`/halls/${id}`, null)
      await save(`/cinemas/${this.$route.params.id}/halls/${id}`, null)
    },

    formatDate(key) {
      let date = new Date(parseInt(key))
      return `${date.toLocaleDateString('ru', {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'})}`
    },

    bannerPreview(lang, event) {
      const file = event.target.files[0];
      if (
        this.cinemasFull[lang].banner != "" &&
        this.cinemasFull[lang].banner[0] != "b"
      ) {
        this.bannerRemove[lang] = this.cinemasFull[lang].banner;
      }

      this.$set(this.cinemasFull[lang], "banner", URL.createObjectURL(file));
      this.bannerWrite[lang] = file;
    },

    logoPreview(lang, event) {
      const file = event.target.files[0];
      if (
        this.cinemasFull[lang].logo != "" &&
        this.cinemasFull[lang].logo[0] != "b"
      ) {
        this.logoRemove[lang] = this.cinemasFull[lang].logo;
      }

      this.$set(this.cinemasFull[lang], "logo", URL.createObjectURL(file));
      this.logoWrite[lang] = file;
    },

    bannerClear(lang) {
      if (this.cinemasFull[lang].banner[0] != "b") {
        this.bannerRemove[lang] = this.cinemasFull[lang].banner;
      }
      this.$set(this.cinemasFull[lang], "banner", "");
    },

    logoClear(lang) {
      if (this.cinemasFull[lang].logo[0] != "b") {
        this.logoRemove[lang] = this.cinemasFull[lang].logo;
      }
      this.$set(this.cinemasFull[lang], "logo", "");
    },

    galleryPreview(index, lang, event) {
      const file = event.target.files[0];
      if (
        this.cinemasFull[lang].gallery[index] != "" &&
        this.cinemasFull[lang].gallery[index][0] != "b"
      ) {
        this.galleryRemove[lang][index] = this.cinemasFull[lang].gallery[index];
      }
      this.$set(
        this.cinemasFull[lang].gallery,
        index,
        URL.createObjectURL(file)
      );
      this.galleryWrite[lang][index] = file;
    },

    galleryClear(index, lang) {
      if (this.cinemasFull[lang].gallery[index][0] != "b") {
        this.galleryRemove[lang][index] = this.cinemasFull[lang].gallery[index];
      }
      this.$set(this.cinemasFull[lang].gallery, index, "");
    },

    whichLang(key) {
      if (key == "ua") {
        return "Українська";
      } else {
        return "Русский";
      }
    },

    async save() {
      this.uploading = true;

      this.loadingState = "Удаление изображений...";
      this.removingAll = this.removingCounter;

      await this.removeGalleryFromStorage();
      await this.removeBannerFromStorage();
      await this.removeLogoFromStorage();

      this.removingAll = 0;
      this.removingLeft = 0;

      this.loadingState = "Загрузка изображений...";
      this.loadingAll = this.uploadingCounter;

      await this.writeGalleryToStorage();
      await this.writeBannerToStorage();
      await this.writeLogoToStorage();

      this.loadingAll = 0;
      this.loadingLeft = 0;

      await save(`/cinemas/${this.$route.params.id}`, this.cinemasFull);
      this.saved = true;
      this.loadingState = "";
      this.uploading = false;
      this.success = true;
      setTimeout(() => {
        this.success = false;
      }, 2000);
      setTimeout(() => {
        this.$router.push({ name: "CinemasPage" });
      }, 2000);
    },

    async removeBannerFromStorage() {
      for (const lang in this.bannerRemove) {
        let el = this.bannerRemove[lang];
        if (el != "") {
          try {
            await removeFromStorage(el);
            this.removingLeft += 1;
            console.log("[SUCCESS]\n", el, "removed from storage");
          } catch (e) {
            console.log("Error while removing picture", el, "from storage.", e);
          }
        }
      }
      this.bannerRemove = { ru: "", ua: "" };
    },

    async removeLogoFromStorage() {
      for (const lang in this.logoRemove) {
        let el = this.logoRemove[lang];
        if (el != "") {
          try {
            await removeFromStorage(el);
            this.removingLeft += 1;
            console.log("[SUCCESS]\n", el, "removed from storage");
          } catch (e) {
            console.log("Error while removing picture", el, "from storage.", e);
          }
        }
      }
      this.logoRemove = { ru: "", ua: "" };
    },

    async writeBannerToStorage() {
      for (const lang in this.bannerWrite) {
        let el = this.bannerWrite[lang];
        if (el != "") {
          try {
            this.cinemasFull[lang].banner = await addToStorage(
              el,
              "cinemas",
              this.$route.params.id
            );
            this.loadingLeft += 1;
            console.log("[SUCCESS]\n", el, "writen to storage");
          } catch (e) {
            console.log("Error while writing picture", el, "into storage.", e);
          }
        }
      }

      this.bannerWrite = { ru: "", ua: "" };
    },

    async writeLogoToStorage() {
      for (const lang in this.logoWrite) {
        let el = this.logoWrite[lang];
        if (el != "") {
          try {
            this.cinemasFull[lang].logo = await addToStorage(
              el,
              "cinemas",
              this.$route.params.id
            );
            this.loadingLeft += 1;
            console.log("[SUCCESS]\n", el, "writen to storage");
          } catch (e) {
            console.log("Error while writing picture", el, "into storage.", e);
          }
        }
      }

      this.logoWrite = { ru: "", ua: "" };
    },

    async removeGalleryFromStorage() {
      for (const lang in this.galleryRemove) {
        for (
          let index = this.galleryRemove[lang].length - 1;
          index >= 0;
          index--
        ) {
          let el = this.galleryRemove[lang][index];
          if (el != "") {
            try {
              await removeFromStorage(el);
              this.removingLeft += 1;
              console.log("[SUCCESS]\n", el, "removed from storage");
            } catch (e) {
              console.log(
                "Error while removing picture",
                el,
                "from storage.",
                e
              );
            }
          }
        }
      }

      this.galleryRemove = { ru: ["", "", "", ""], ua: ["", "", "", ""] };
    },

    async writeGalleryToStorage() {
      for (const language in this.galleryWrite) {
        for (let i = this.galleryWrite[language].length - 1; i >= 0; i--) {
          let el = this.galleryWrite[language][i];
          if (el != "") {
            try {
              this.cinemasFull[language].gallery[i] = await addToStorage(
                el,
                "cinemas",
                this.$route.params.id
              );
              this.loadingLeft += 1;
              console.log("[SUCCESS]\n", el, "writen to storage");
            } catch (e) {
              console.log(
                "Error while writing picture",
                el,
                "into storage.",
                e
              );
            }
          }
        }
      }

      this.galleryWrite = { ru: ["", "", "", ""], ua: ["", "", "", ""] };
    },
  },
};
</script>

<style>
.page-item.active .page-link {
  background-color: rgba(170, 20, 22, 0.8) !important;
  border-color: rgba(170, 20, 22, 0.8) !important; 
  color: white !important;
  outline-color: rgba(170, 20, 22, 0.8) !important;
}

.page-item .page-link {
  color: rgba(170, 20, 22, 0.8) !important;
}

.page-link:focus {
  box-shadow: 0 0 0.2rem rgba(170, 20, 22, 0.8) !important;
}

.page-item.disabled .page-link {
  color: gray !important;
}
</style>