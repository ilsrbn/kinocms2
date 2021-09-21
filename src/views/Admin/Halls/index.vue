<template>
  <div v-if="!loaded">
    <CardPreloader />
  </div>
  <article v-else>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <h1 class="mx-auto my-0">Редактирование зала</h1>
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
                  v-for="(item, key) in halls"
                  :key="key"
                  :title="whichLang(key)"
                >
                  <b-card-text>
                    
                    <b-form-group
                      label="Номер зала"
                      :label-for="'title-' + key"
                    >
                      <b-form-input
                        :id="'title-' + key"
                        v-model="item.title"
                        placeholder="Введите номер зала"
                        type="number"
                        @keypress="isNumber($event)"
                        class="col-lg-4 col-md-6 col-12"
                      />
                    </b-form-group>

                    <b-form-group
                      label="Описание зала"
                      :label-for="'description-' + key"
                    >
                      <b-form-textarea
                        :id="'description-' + key"
                        v-model="item.description"
                        placeholder="Введите описание зала"
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
      saved: false,
      loaded: false,
      uploading: false,
      success: false,
      path: `/halls/${this.$route.params.id}`,

      loadingState: "",
      loadingAll: 0,
      loadingLeft: 0,
      removingAll: 0,
      removingLeft: 0,

      hallsFull: {},
      galleryRemove: { ru: ["", "", "", ""], ua: ["", "", "", ""] },
      galleryWrite: { ru: ["", "", "", ""], ua: ["", "", "", ""] },

      bannerRemove: { ru: "", ua: "" },
      bannerWrite: { ru: "", ua: "" },

      logoRemove: { ru: "", ua: "" },
      logoWrite: { ru: "", ua: "" },
    };
  },
  computed: {
    halls() {
      return { ru: this.hallsFull.ru, ua: this.hallsFull.ua };
    },

    items() {
      let items = []

      for (let key in this.halls) {
        let hall = this.halls.key
        items.push({
          title: hall.title,
          date: hall.id,
          edit: key,
          remove: key
        })
      }

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
      this.hallsFull = await fetch(this.path);
    } else {
      this.$router.push({ name: "CinemasPage" });
    }
    this.loaded = true;
  },

  methods: {
    isNumber(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    bannerPreview(lang, event) {
      const file = event.target.files[0];
      if (
        this.hallsFull[lang].banner != "" &&
        this.hallsFull[lang].banner[0] != "b"
      ) {
        this.bannerRemove[lang] = this.hallsFull[lang].banner;
      }

      this.$set(this.hallsFull[lang], "banner", URL.createObjectURL(file));
      this.bannerWrite[lang] = file;
    },

    logoPreview(lang, event) {
      const file = event.target.files[0];
      if (
        this.hallsFull[lang].logo != "" &&
        this.hallsFull[lang].logo[0] != "b"
      ) {
        this.logoRemove[lang] = this.hallsFull[lang].logo;
      }

      this.$set(this.hallsFull[lang], "logo", URL.createObjectURL(file));
      this.logoWrite[lang] = file;
    },

    bannerClear(lang) {
      if (this.hallsFull[lang].banner[0] != "b") {
        this.bannerRemove[lang] = this.hallsFull[lang].banner;
      }
      this.$set(this.hallsFull[lang], "banner", "");
    },

    logoClear(lang) {
      if (this.hallsFull[lang].logo[0] != "b") {
        this.logoRemove[lang] = this.hallsFull[lang].logo;
      }
      this.$set(this.hallsFull[lang], "logo", "");
    },

    galleryPreview(index, lang, event) {
      const file = event.target.files[0];
      if (
        this.hallsFull[lang].gallery[index] != "" &&
        this.hallsFull[lang].gallery[index][0] != "b"
      ) {
        this.galleryRemove[lang][index] = this.hallsFull[lang].gallery[index];
      }
      this.$set(
        this.hallsFull[lang].gallery,
        index,
        URL.createObjectURL(file)
      );
      this.galleryWrite[lang][index] = file;
    },

    galleryClear(index, lang) {
      if (this.hallsFull[lang].gallery[index][0] != "b") {
        this.galleryRemove[lang][index] = this.hallsFull[lang].gallery[index];
      }
      this.$set(this.hallsFull[lang].gallery, index, "");
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

      await save(`/halls/${this.$route.params.id}`, this.hallsFull);
      this.saved = true;
      this.loadingState = "";
      this.uploading = false;
      this.success = true;
      setTimeout(() => {
        this.success = false;
      }, 2000);
      setTimeout(() => {
        this.$router.push({ name: "EditCinema", params: {id: this.hallsFull.cinema} });
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
            this.hallsFull[lang].banner = await addToStorage(
              el,
              "halls",
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
            this.hallsFull[lang].logo = await addToStorage(
              el,
              "halls",
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
              this.hallsFull[language].gallery[i] = await addToStorage(
                el,
                "halls",
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