<template>
  <article>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <h1 class="mx-auto my-0">Страницы</h1>
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
                      <tr v-for="(item, key) in pages" :key="key">
                        <td>{{ item.ru.title }}</td>

                        <td>{{ formatDate(item.id) }}</td>
                        <td>{{ item.status ? 'ВКЛ' : 'ВЫКЛ' }}</td>
                        <td v-if="key >= 7" style="width: 15px;">
                          <div @click="remove(key)" class="btn btn-danger btn-flat">Удалить</div>
                        </td>
                        <td :colspan="key < 7 ? 2 : 1" style="width: 15px;">
                          <router-link class="btn btn-flat btn-warning w-100" :to="whichRoute(key)">
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
                  <p class="pb-2 pt-2 mb-0">ДОБАВИТЬ СТРАНИЦУ</p>
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

      path: `/pages`,
      pages: [],
      removingState: '',
    }
  },

  async mounted() {
    if( await fetch(this.path) != null) {
      this.pages = await fetch(this.path)
    }
    this.loaded = true
  },

  methods: {

    whichRoute(key) {
      if (key == 0) {
        return {name: 'EditMainPage'}
      }

      if (key == 6) {
        return {name: 'EditContactPage'}
      }

      return {name: 'EditPages', params: {id: key}}
    },

    async add() {
      this.pages.push({
        id: Date.now(),
        status: false,
        ru: {
          title: '',
          description: '',
          banner: '',
          gallery: ['', '', '', ''],
          
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
          
          seo: {
            url: '',
            title: '',
            keywords: '',
            description: ''
          }
        }
      })

      await save(this.path, this.pages)
      this.$router.push({name: 'EditPages', params: {id: `${this.pages.length - 1}`}})

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
      this.removingState = 'Баннеры удалены'
      await this.removeBannersFromStorage(key)
      this.makeToast()

      this.removingState = 'Галереи удалены'
      await this.removeGalleriesFromStorage(key)
      this.makeToast()
      
      this.pages = this.pages.filter(t => this.pages.indexOf(t) != key)

      this.removingState = 'Записи в базе данных удалены'
      await save(this.path, this.pages)
      this.makeToast()
      this.removingState = ''
    },


    formatDate(key) {
      let date = new Date(parseInt(key))
      return `${date.toLocaleDateString('ru', {year: 'numeric', month: 'long', day: 'numeric'})}`
    },

    async removeBannersFromStorage(key) {

      //Remove russian Banner from storage
      if (this.pages[key].ru.banner != '') {
        try {
          await removeFromStorage(this.pages[key].ru.banner)
          console.log('[SUCCESS]\n', this.pages[key].ru.banner, 'removed from storage')
        } catch(e) {
          console.log("Error", e)
        }
      }

      //Remove ukrainian Banner from storage
      if (this.pages[key].ua.banner != '') {
        try {
          await removeFromStorage(this.pages[key].ua.banner)
          console.log('[SUCCESS]\n', this.pages[key].ua.banner, 'removed from storage')
        } catch(e) {
          console.log("Error", e)
        }
      }
    },

    async removeGalleriesFromStorage(key) {

      //Remove russian Gallery
      for (var i = 0; i < this.pages[key].ru.gallery.length; i++) {
        if (this.pages[key].ru.gallery[i] != '') {
          try {
            await removeFromStorage(this.pages[key].ru.gallery[i])
            console.log('[SUCCESS]\n', this.pages[key].ru.gallery[i], 'removed from storage')
          } catch(e) {
            console.log('Error:', e)
          }
        }
      }

      //Remove ukrainian Gallery
      for (var q = 0; q < this.pages[key].ua.gallery.length; q++) {
        if (this.pages[key].ua.gallery[q] != '') {
          try {
            await removeFromStorage(this.pages[key].ua.gallery[q])
            console.log('[SUCCESS]\n', this.pages[key].ua.gallery[i], 'removed from storage')
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