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
                    <b-form-group
                      label="Телефон"
                      :label-for="'phone1-' + key">
                      <b-form-input
                        :id="'phone1-' + key"
                        v-model="item.phone1"
                        placeholder="+38-(xxx)-xxx-xx-xx"
                        class="col-lg-6 col-md-8 col" />
                    </b-form-group>

                    <b-form-group
                      :label-for="'phone2-' + key">
                      <b-form-input
                        :id="'phone2-' + key"
                        v-model="item.phone2"
                        placeholder="+38-(xxx)-xxx-xx-xx"
                        class="col-lg-6 col-md-8 col" />
                    </b-form-group>


                    <b-form-group
                      label="Seo Текст:"
                      :label-for="'description-' + key">
                      <b-form-textarea
                        :id="'text-' + key"
                        v-model="item.text"
                        placeholder="Введите Seo текст"
                        class="col-lg-6 col-md-8 col-12" />      
                    </b-form-group>


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
                      
                      :uploading="uploading"
                      :success="success"
                      @saveCards="save" />
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
import { fetch, save } from '@/modules/firebase'
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


      pagesFull: {}
    }
  },
  computed: {
    pages() {
      return {ru: this.pagesFull.ru, ua: this.pagesFull.ua}
    }
  },

  async mounted() {
    this.loaded = false
    if ( await fetch(this.path) != null ) {
      this.pagesFull = await fetch('/pages/0')
    } else {
      this.$router.push({name: 'AllPages'})
    }
    this.loaded = true    
  },

  methods: {

    whichLang(key) {
      if (key == 'ua') {
        return 'Українська'
      } else {
        return 'Русский'
      }
    },

    async save() {
      this.uploading = true


      await save('/pages/0', this.pagesFull)
      this.saved = true

      this.uploading = false
      this.success = true
      setTimeout(() => {this.success = false}, 2000)
      setTimeout(() => {this.$router.push({name: 'AllPages'})}, 2000)
    }
  }
}
</script>