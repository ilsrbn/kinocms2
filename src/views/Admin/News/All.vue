<template>
  <article>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <h1 class="mx-auto my-0">НОВОСТИ</h1>
        </div>
      </div>
    </div>
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">


              <div v-if="!loaded" class="card-body d-flex justify-content-start">
                <CardPreloader class="w-100 mh-100" />
              </div>

              <div v-else class="card-body">
                <div class="row">

                  <table class="table table-bordered">

                    <thead>
                      <tr>
                        <th>Название</th>
                        <th>Дата создания</th>
                        <th>Статус</th>
                        <th colspan="2"></th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr v-for="(item, key) in news" :key="key">
                        <td>{{ item.ru.title }}</td>
                        <td>{{ formatDate(item.id) }}</td>
                        <td>{{ item.status ? 'ВКЛ' : 'ВЫКЛ' }}</td>
                        <td style="width: 15px;">
                          <div @click="remove(key)" class="btn btn-danger btn-flat">Удалить</div>
                        </td>
                        <td style="width: 15px;">
                          <router-link class="btn btn-flat btn-warning" :to="{name: 'EditNews', params:{id: key}}">
                            Редактировать
                          </router-link>
                        </td>
                      </tr>
                    </tbody>

                  </table>

                </div>
              </div>
              <div class="card-footer text-center">
                <b-button
                  @click="add"
                  variant="light">
                  <p class="pb-2 pt-2 mb-0">ДОБАВИТЬ НОВОСТЬ</p>
                </b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
import CardPreloader from '@/components/CardPreloader'
import { fetch, save, removeFromStorage } from '@/modules/firebase'
export default {

  name: 'All',
  components: { CardPreloader },

  data () {
    return {
      loaded: false,

      path: `/news`,
      news: [],
      removingState: '',
    }
  },

  async mounted() {
    if( await fetch(this.path) != null) {
      this.news = await fetch(this.path)
    }
    this.loaded = true
  },

  methods: {

    async add() {
      this.news.push({
        id: Date.now(),
        status: false,
        date: '',
        ru: {
          title: '',
          description: '',
          banner: '',
          gallery: ['', '', '', ''],
          hyperlink: '',
          seo: {
            url: '',
            title: '',
            keywords: '',
            description: ''
          }
        },
        ua: {
          title: '',
          description: '',
          banner: '',
          gallery: ['', '', '', ''],
          hyperlink: '',
          seo: {
            url: '',
            title: '',
            keywords: '',
            description: ''
          }
        }
      })

      console.log(this.news)
      await save(this.path, this.news)
      this.$router.push({name: 'EditNews', params: {id: `${this.news.length - 1}`}})

    },

    makeToast() {
      this.$bvToast.toast(this.removingState, {
        title: 'Успех',
        autoHideDelay: 1000,
        variant: 'success',
        solid: true
      })
    },

    async remove(key) {
      console.log('Removing banners')
      this.removingState = 'Баннеры удалены'
      await this.removeBannersFromStorage(key)
      this.makeToast()

      console.log('Removing galleries')
      this.removingState = 'Галереи удалены'
      await this.removeGalleriesFromStorage(key)
      this.makeToast()
      
      console.log('Filtering news array locally')
      console.log('###\nBefore', this.news)
      this.news = this.news.filter(t => this.news.indexOf(t) != key)
      console.log('###\nAfter', this.news)
      
      console.log('Writing to db')
      this.removingState = 'Записи в базе данных удалены'
      await save(this.path, this.news)
      this.makeToast()
      this.removingState = ''
    },


    formatDate(key) {
      let date = new Date(parseInt(key))
      return `${date.toLocaleDateString('ru', {year: 'numeric', month: 'long', day: 'numeric'})}`
    },

    async removeBannersFromStorage(key) {

      //Remove russian Banner from storage
      if (this.news[key].ru.banner != '') {
        try {
          await removeFromStorage(this.news[key].ru.banner)
          console.log('[SUCCESS]\n', this.news[key].ru.banner, 'removed from storage')
        } catch(e) {
          console.log("Error", e)
        }
      }

      //Remove ukrainian Banner from storage
      if (this.news[key].ua.banner != '') {
        try {
          await removeFromStorage(this.news[key].ua.banner)
          console.log('[SUCCESS]\n', this.news[key].ua.banner, 'removed from storage')
        } catch(e) {
          console.log("Error", e)
        }
      }
    },

    async removeGalleriesFromStorage(key) {

      //Remove russian Gallery
      for (var i = 0; i < this.news[key].ru.gallery.length; i++) {
        if (this.news[key].ru.gallery[i] != '') {
          try {
            await removeFromStorage(this.news[key].ru.gallery[i])
            console.log('[SUCCESS]\n', this.news[key].ru.gallery[i], 'removed from storage')
          } catch(e) {
            console.log('Error:', e)
          }
        }
      }

      //Remove ukrainian Gallery
      for (var q = 0; q < this.news[key].ua.gallery.length; q++) {
        if (this.news[key].ua.gallery[q] != '') {
          try {
            await removeFromStorage(this.news[key].ua.gallery[q])
            console.log('[SUCCESS]\n', this.news[key].ua.gallery[i], 'removed from storage')
          } catch(e) {
            console.log('Error:', e)
          }
        }
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>