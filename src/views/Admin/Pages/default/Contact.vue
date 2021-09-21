<template>
  <div v-if="!loaded">
    <CardPreloader />
  </div>
  <article v-else>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <h1 class="mx-auto my-0">Редактирование страницы</h1>
        </div>
      </div>
    </div>
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <b-col cols="6">
            <b-form-checkbox v-model="pagesFull.status" name="check-button" switch>
              Страница {{ pagesFull.status ? '' : 'не ' }}активна
            </b-form-checkbox>
          </b-col>
          <div class="col-12">
            <b-card no-body>
              <b-tabs card>
                <b-tab
                  v-for="(item, key) in pages"
                  :key="key"
                  :title="whichLang(key)"
                  >
                  <b-card-text>

                    <b-row>
                      <b-col
                        cols="12"
                        v-for="(card, index) in item.cinemas"
                        :key="index">
                        <b-card
                          bg-variant="light">

                          <b-button
                            v-if="index > 0"
                            class="ml-auto mr-0 mb-4"
                            variant="danger"
                            @click="removeCinema(index, key)">
                            <p class="pb-2 pt-2 mb-0">УДАЛИТЬ КИНОТЕАТР</p>
                          </b-button>
                          <b-form-group
                            label="Название кинотеатра"
                            :label-for="'title-' + index">
                            <b-form-input
                              :id="'title-' + index"
                              v-model="card.title"
                              placeholder="Введите название кинотеатра"
                              class="col-lg-6 col-md-8 col-12" />
                          </b-form-group>

                          <b-form-group
                            label="Адрес"
                            :label-for="'adress-' + index">
                            <b-form-textarea
                              :id="'adress-' + index"
                              v-model="card.adress"
                              placeholder="Введите адрес кинотеатра"
                              class="col-lg-8 col-12" />      
                          </b-form-group>

                          <b-form-group
                            label="Координаты для карты"
                            :label-for="'map-' + index">
                            <b-form-input
                              :id="'map-' + index"
                              v-model="card.map"
                              placeholder="Координаты для карты"
                              class="col-lg-8 col-12" />
                          </b-form-group>

                          <b-form-group
                            label="Лого"
                            :label-for="'banner-' + index">
                            <b-form-file
                              class="col-lg-8 col-12"
                              accept="image/*"
                              browse-text="Выбрать файл"
                              @change="bannerPreview(index, key, $event)"
                              :id="'banner-' + index" />
                            <b-button
                              v-if="card.banner != ''"
                              class="ml-2"
                              pill
                              @click="bannerClear(index, key)"
                              variant="danger">Удалить</b-button>
                            <br />
                            <b-container class="col-lg-8 col-12 ml-0 mt-1">
                              <b-img
                                fluid
                                :src="card.banner ? card.banner : 'https://via.placeholder.com/1600x900.png'" />             
                            </b-container>
                          </b-form-group>

                        </b-card>
                      </b-col>
                      <b-col class="text-center">
                        <b-button
                          variant="light"
                          @click="addCinema(key)">
                          <p class="pb-2 pt-2 mb-0">ДОБАВИТЬ КИНОТЕАТР</p>
                        </b-button>
                      </b-col>
                    </b-row>

                    


                    <b-form-group
                      label="SEO"
                      label-cols="1"
                      content-cols="11">
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

  components: { CardPreloader, SaveButton },

  data () {
    return {
      saved: false,
      loaded: false,
      uploading: false,
      success: false,
      path: '/pages/6',

      loadingState: '',
      loadingAll: 0,
      loadingLeft: 0,
      removingAll: 0,
      removingLeft: 0,

      pagesFull: {},

      bannerRemove: {ru: '', ua: ''},
      bannerWrite: {ru: '', ua: ''}
    }
  },
  computed: {
    pages() {
      return {ru: this.pagesFull.ru, ua: this.pagesFull.ua}
    },

    uploadingCounter() {
      let all = 0

      for (const language in this.bannerWrite) {
        for (let i = 0; i < this.bannerWrite[language].length; i++) {
          if (this.bannerWrite[language][i] != '') {
           all += 1
          }
        }
      }

      return all
    },

    removingCounter() {
      let all = 0

      for (const language in this.bannerRemove) {
        for (let i = 0; i < this.bannerRemove[language].length; i++) {
          if (this.bannerRemove[language][i] != '') {
            all += 1
          }
        }
        
      }

      return all
    }
      
  },

  async mounted() {
    this.loaded = false
    if ( await fetch(this.path) != null ) {
      this.pagesFull = await fetch(this.path)
    } else {
      this.$router.push({name: 'AllPages'})
    }
    this.bannerRemove = {ru: Array(this.pagesFull.ru.cinemas.length).fill(''), ua: Array(this.pagesFull.ua.cinemas.length).fill('')}
    this.bannerWrite = {ru: Array(this.pagesFull.ru.cinemas.length).fill(''), ua: Array(this.pagesFull.ua.cinemas.length).fill('')}
    this.loaded = true    
  },

  methods: {
    bannerPreview(index, lang, event) {
      const file = event.target.files[0]
      if (this.pagesFull[lang].cinemas[index].banner != '' && this.pagesFull[lang].cinemas[index].banner[0] != 'b') {
        this.bannerRemove[lang][index] = this.pagesFull[lang].cinemas[index].banner
      }

      this.$set(this.pagesFull[lang].cinemas[index], 'banner', URL.createObjectURL(file))
      console.log(this.pagesFull[lang].cinemas[index])
      this.bannerWrite[lang][index] = file
    },

    bannerClear(index, lang) {
      if (this.pagesFull[lang].cinemas[index].banner[0] != 'b') {
        this.bannerRemove[lang] = this.pagesFull[lang].cinemas[index].banner
      }
      this.$set(this.pagesFull[lang].cinemas[index], 'banner', '')
    },

    removeCinema(index, lang) {
      this.pagesFull[lang].cinemas = this.pagesFull[lang].cinemas.filter(t => this.pagesFull[lang].cinemas.indexOf(t) != index)
      this.bannerRemove[lang] = this.bannerRemove[lang].filter(t => this.bannerRemove[lang].indexOf(t) != index)
      this.bannerWrite[lang] = this.bannerWrite[lang].filter(t => this.bannerWrite[lang].indexOf(t) != index)
    },

    addCinema(lang) {
      this.pagesFull[lang].cinemas.push({
        adress: '',
        banner: '',
        id: Date.now(),
        map: '',
        title: ''
      })
      this.bannerRemove[lang].push('')
      this.bannerWrite[lang].push('')
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
      

      await this.removeBannerFromStorage()

      this.removingAll = 0
      this.removingLeft = 0


      this.loadingState = 'Загрузка изображений...'
      this.loadingAll = this.uploadingCounter

      await this.writeBannerToStorage()

      this.loadingAll = 0
      this.loadingLeft = 0
      

      await save('/pages/6', this.pagesFull)
      this.saved = true
      this.loadingState = ''
      this.uploading = false
      this.success = true
      setTimeout(() => {this.success = false}, 2000)
      setTimeout(() => {this.$router.push({name: 'AllPages'})}, 2000)
    },

    async removeBannerFromStorage() {
      for (const lang in this.bannerRemove) {
        for (let i = 0; i < this.bannerRemove[lang].length; i++) {
          let el = this.bannerRemove[lang][i]
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
        
      }

      this.bannerRemove = {ru: Array(this.pagesFull.ru.cinemas.length).fill(''), ua: Array(this.pagesFull.ua.cinemas.length).fill('')}
    },

    async writeBannerToStorage() {
      for (const lang in this.bannerWrite) {
        for (let i = 0; i < this.bannerWrite[lang].length; i++) {
          let el = this.bannerWrite[lang][i]
          if (el != '') {
            try {
              this.pagesFull[lang].cinemas[i].banner = await addToStorage(el, 'pages', `6/cinemas/${i}`)
              this.loadingLeft += 1
              console.log('[SUCCESS]\n', el, 'writen to storage')
            } catch(e) {
              console.log('Error while writing picture', el, 'into storage.', e)
            }
          }
        }
      }

      this.bannerWrite = {ru: Array(this.pagesFull.ru.cinemas.length).fill(''), ua: Array(this.pagesFull.ua.cinemas.length).fill('')}
    }
  }
}
</script>