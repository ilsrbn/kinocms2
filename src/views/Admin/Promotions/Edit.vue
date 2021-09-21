<template>
  <div v-if="!loaded">
    <CardPreloader />
  </div>
  <article v-else>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <h1 class="mx-auto my-0">Редактирование акции</h1>
        </div>
      </div>
    </div>
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <b-col cols="6">
            <b-form-checkbox v-model="promotionsFull.status" name="check-button" switch>
              Акция {{ promotionsFull.status ? '' : 'не ' }}активна
            </b-form-checkbox>
          </b-col>
          <b-col cols="6">
            <b-form-datepicker selected-variant="success" nav-button-variant="success" id="example-datepicker" v-model="promotionsFull.date" class="mb-2 aaa"></b-form-datepicker>
          </b-col>
          <div class="col-12">
            <b-card no-body>
              <b-tabs card>
                <b-tab
                  v-for="(item, key) in promotions"
                  :key="key"
                  :title="whichLang(key)"
                  >
                  <b-card-text>

                    <b-form-group
                      label="Название акции"
                      :label-for="'title-' + key">
                      <b-form-input
                        :id="'title-' + key"
                        v-model="item.title"
                        placeholder="Введите название акции"
                        class="col-lg-4 col-md-6 col-12" />
                    </b-form-group>

                    <b-form-group
                      label="Описание акции"
                      :label-for="'description-' + key">
                      <b-form-textarea
                        :id="'description-' + key"
                        v-model="item.description"
                        placeholder="Введите описание акции"
                        class="col-lg-6 col-md-8 col-12" />      
                    </b-form-group>

                    <b-form-group
                      label="Главная картинка"
                      :label-for="'banner-' + key">
                      <b-form-file
                        class="col-lg-6 col-md-8 col-12"
                        accept="image/*"
                        browse-text="Выбрать файл"
                        @change="bannerPreview(key, $event)"
                        :id="'banner-' + key" />
                      <b-button
                        v-if="item.banner != ''"
                        class="ml-2"
                        pill
                        @click="bannerClear(key)"
                        variant="danger">Удалить</b-button>
                      <br />
                      <b-container class="col-lg-6 col-md-8 col-12 ml-0 mt-1">
                        <b-img
                          fluid
                          :src="item.banner ? item.banner : 'https://via.placeholder.com/1600x900.png'" />             
                      </b-container>
                    </b-form-group>

                    <b-container>
                      <b-row>
                        <b-col>
                          <b-card
                          title="Галерея картинок">
                          <b-card-text>
                            <b-container class="pt-2">
                            <b-row>
                              <b-col
                               v-for="(galleryItem, index) in item.gallery"
                              :key="index"
                              lg="3"
                              md="6"
                              col>
                              <b-card
                                img-top
                                :img-src="galleryItem ? galleryItem : 'https://via.placeholder.com/1600x900.png'">
                                <b-card-text>
                                  <b-form-file
                                    placeholder=""
                                    browse-text="Выбрать файл"
                                    accept="image/*"
                                    @change="galleryPreview(index, key, $event)" />
                                  <b-button v-if="galleryItem"
                                    class="mx-auto mt-2"
                                    pill
                                    block
                                    variant="danger"
                                    @click="galleryClear(index, key)">Удалить</b-button>
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
                      :label-for="'hyperlink-' + key">
                      <b-form-input
                        :id="'hyperlink-' + key"
                        v-model="item.hyperlink"
                        placeholder="Введите ссылку на видео в Youtube"
                        class="col-lg-6 col-md-8 col" />
                    </b-form-group>

                    <b-form-group
                      label="SEO">
                      <b-container class="ml-3">
                      <b-form-group
                        label="URL"
                        :label-for="'seo-url-' + key">
                        <b-form-input
                          :id="'seo-url-' + key"
                          v-model="item.seo.url"
                          placeholder="URL"
                          class="col-lg-6 col-md-8 col" />
                      </b-form-group>
                      <b-form-group
                        label="Title"
                        :label-for="'seo-title-' + key">
                        <b-form-input
                          :id="'seo-title-' + key"
                          v-model="item.seo.title"
                          placeholder="Title"
                          class="col-lg-6 col-md-8 col" />
                      </b-form-group>
                      <b-form-group
                        label="Description"
                        :label-for="'seo-description-' + key">
                        <b-form-textarea
                          :id="'seo-description-' + key"
                          v-model="item.seo.description"
                          placeholder="Description"
                          class="col-lg-6 col-md-8 col" />
                      </b-form-group>
                      <b-form-group
                        label="Keywords"
                        :label-for="'seo-keywords-' + key">
                        <b-form-input
                          :id="'seo-keywords-' + key"
                          v-model="item.seo.keywords"
                          placeholder="Keywords"
                          class="col-lg-6 col-md-8 col" />
                      </b-form-group>
                      </b-container>
                    </b-form-group>
                    <b-container class="text-center">
                      <SaveButton
                      v-if="loadingState == ''"
                      :uploading="uploading"
                      :success="success"
                      @saveCards="save" />
                      <p class="mt-5 mb-1" v-if="loadingState != ''">{{loadingState}}</p>
                      <b-progress
                        v-if="loadingAll != 0"
                        class="mt-0"
                        :value="loadingLeft"
                        :max="loadingAll"
                        height="2px">
                      </b-progress>
                      <b-progress
                        v-if="removingAll != 0"
                        class="mt-0"
                        :value="removingLeft"
                        :max="removingAll"
                        variant="danger"
                        height="2px">
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
import { fetch, save, removeFromStorage, addToStorage } from '@/modules/firebase'
import CardPreloader from '@/components/CardPreloader'
import SaveButton from '@/components/SaveButton'


export default {

  name: 'Edit',

  components: { CardPreloader, SaveButton },

  data () {
    return {
      saved: false,
      loaded: false,
      uploading: false,
      success: false,
      path: `/promotions/${this.$route.params.id}`,

      loadingState: '',
      loadingAll: 0,
      loadingLeft: 0,
      removingAll: 0,
      removingLeft: 0,

      promotionsFull: {},
      galleryRemove: {ru: ['', '', '', ''], ua:['', '', '', '']},
      galleryWrite: {ru: ['', '', '', ''], ua:['', '', '', '']},

      bannerRemove: {ru: '', ua: ''},
      bannerWrite: {ru: '', ua: ''}
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.saved) {
      next()
    } else {
      const answer = window.confirm('Вы хотите уйти? У вас есть несохранённые изменения!')
      if (answer) {
        next()
      } else {
        next(false)
      }
    }
  },
  computed: {
    promotions() {
      return {ru: this.promotionsFull.ru, ua: this.promotionsFull.ua}
    },

    uploadingCounter() {
      let all = 0
      for (const lang in this.galleryWrite) {
        for (let i = 0; i < this.galleryWrite[lang].length; i++) {
          let el = this.galleryWrite[lang][i]
          if (el != '') {
            all += 1
          }
        }
      }

      for (const language in this.bannerWrite) {
        if (this.bannerWrite[language] != '') {
          all += 1
        }
      }

      return all
    },

    removingCounter() {
      let all = 0
      for (const lang in this.galleryRemove) {
        for (let i = 0; i < this.galleryRemove[lang].length; i++) {
          let el = this.galleryRemove[lang][i]
          if (el != '') {
            all += 1
          }
        }
      }

      for (const language in this.bannerRemove) {
        if (this.bannerRemove[language] != '') {
          all += 1
        }
      }

      return all
    }
      
  },

  async mounted() {
    this.loaded = false
    if ( await fetch(this.path) != null ) {
      this.promotionsFull = await fetch(this.path)
    } else {
      this.$router.push({name: 'AllPromotions'})
    }
    this.loaded = true    
  },

  methods: {
    bannerPreview(lang, event) {
      const file = event.target.files[0]
      if (this.promotionsFull[lang].banner != '' && this.promotionsFull[lang].banner[0] != 'b') {
        this.bannerRemove[lang] = this.promotionsFull[lang].banner
      }

      this.$set(this.promotionsFull[lang], 'banner', URL.createObjectURL(file))
      this.bannerWrite[lang] = file
    },

    bannerClear(lang) {
      if (this.promotionsFull[lang].banner[0] != 'b') {
        this.bannerRemove[lang] = this.promotionsFull[lang].banner
      }
      this.$set(this.promotionsFull[lang], 'banner', '')
    },

    galleryPreview(index, lang, event) {
      const file = event.target.files[0]
      if (this.promotionsFull[lang].gallery[index] != '' && this.promotionsFull[lang].gallery[index][0] != 'b') {
        this.galleryRemove[lang][index] = this.promotionsFull[lang].gallery[index]
      }
      this.$set(this.promotionsFull[lang].gallery, index, URL.createObjectURL(file))
      this.galleryWrite[lang][index] = file
    },

    galleryClear(index, lang) {
      if (this.promotionsFull[lang].gallery[index][0] != 'b') {
        this.galleryRemove[lang][index] = this.promotionsFull[lang].gallery[index]
      }
      this.$set(this.promotionsFull[lang].gallery, index, '')
    },

    whichLang(key) {
      if (key == 'ua') {
        return 'Українська'
      } else {
        return 'Русский'
      }
    },

    async save() {
      this.uploading = true


      this.loadingState = 'Удаление изображений...'
      this.removingAll = this.removingCounter
      
      await this.removeGalleryFromStorage()
      await this.removeBannerFromStorage()

      this.removingAll = 0
      this.removingLeft = 0


      this.loadingState = 'Загрузка изображений...'
      this.loadingAll = this.uploadingCounter

      await this.writeGalleryToStorage()
      await this.writeBannerToStorage()

      this.loadingAll = 0
      this.loadingLeft = 0
      

      await save(`/promotions/${this.$route.params.id}`, this.promotionsFull)
      this.saved = true
      this.loadingState = ''
      this.uploading = false
      this.success = true
      setTimeout(() => {this.success = false}, 2000)
      setTimeout(() => {this.$router.push({name: 'AllPromotions'})}, 2000)
    },

    async removeBannerFromStorage() {
      for (const lang in this.bannerRemove) {
        let el = this.bannerRemove[lang]
        if (el != '') {
          try {
            await removeFromStorage(el)
            this.removingLeft += 1
            console.log('[SUCCESS]\n', el, 'removed from storage')
          } catch(e) {
            console.log('Error while removing picture', el, 'from storage.', e)
          }
        }
      }
      this.bannerRemove = {ru: '', ua: ''}
    },

    async writeBannerToStorage() {
      for (const lang in this.bannerWrite) {
        let el = this.bannerWrite[lang]
        if (el != '') {
          try {
            this.promotionsFull[lang].banner = await addToStorage(el, 'promotions', this.$route.params.id)
            this.loadingLeft += 1
            console.log('[SUCCESS]\n', el, 'writen to storage')
          } catch(e) {
            console.log('Error while writing picture', el, 'into storage.', e)
          }
        }
      }

      this.bannerWrite = {ru: '', ua: ''}
    },

    async removeGalleryFromStorage() {
      for (const lang in this.galleryRemove) {
        for (let index = this.galleryRemove[lang].length - 1; index >= 0; index--){
          let el = this.galleryRemove[lang][index]
          if (el != '') {
            try {
              await removeFromStorage(el)
              this.removingLeft += 1
              console.log('[SUCCESS]\n', el, 'removed from storage')
            }
            catch(e) {
              console.log('Error while removing picture', el, 'from storage.', e)
            }
          }
        }
      }

      this.galleryRemove = {ru: ['', '', '', ''], ua:['', '', '', '']}
    },

    async writeGalleryToStorage() {
      for (const language in this.galleryWrite) {
        for (let i = this.galleryWrite[language].length - 1; i >= 0; i--){
          let el = this.galleryWrite[language][i]
          if(el != '') {
            try {
              this.promotionsFull[language].gallery[i] = await addToStorage(el, 'promotions', this.$route.params.id)
              this.loadingLeft += 1
              console.log('[SUCCESS]\n', el, 'writen to storage')
            } catch(e) {
              console.log('Error while writing picture', el, 'into storage.', e)
            }
          }
        }
      }

      this.galleryWrite = {ru: ['', '', '', ''], ua:['', '', '', '']}
    }
  }
}
</script>