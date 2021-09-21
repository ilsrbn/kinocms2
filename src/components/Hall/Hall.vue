<template>
  <CardPreloader v-if="!loaded" />
  <div v-else class="table-responsive w-75 mx-auto">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Название</th>
          <th colspan="3" scope="col">Дата создания</th>
        </tr>
      </thead>
      <tbody>
        <tr @click="add" class="successbutton tr-button"><td colspan="4" class="text-center">Добавить зал</td></tr>
        <tr
          v-for="(hall, key) in halls"
          :key="key">
          <th scope="row">{{ hall[$route.params.lang].title }}</th>
          <td>{{ toDate(key) }}</td>
          <td
            @click="remove(key)"
            class="delButton px-1 rounded-0 text-center"
            :colspan="hall.saved ? '1' : '2'"
            >
            <i class="fas fa-times fa-lg"></i>
          </td>
          <td v-if="hall.saved" class="editButton px-1 rounded-0 text-center">
            <router-link
            :to="{name: 'HallPage', params: {lang: 'ru', id: key}}"
            >
              <i class="fas fa-pen fa-lg"></i>
            </router-link>
          </td>
        </tr>
        <tr
          v-if="!uploading"
          @click="save"
          class="tr-button"
          :class="!success ? 'savebutton' : 'successbutton'">
          <td colspan="4" class="text-center">
            <p class="mx-2 my-0" v-if="!success">Сохранить</p>
            <i v-if="success" class="far fa-check-circle mx-2"></i>
          </td>
        </tr>
        <tr v-else class="savebutton">
          <td colspan='4' class="text-center"><i class="fas fa-circle-notch fa-spin mx-2"></i></td></tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import CardPreloader from '@/components/CardPreloader'

export default {

  name: 'Hall',

  data() {
    return {
      loaded: false,
      uploading: false,
      success: false
    }
  },

  computed: {
    halls() {
      
      return this.$store.getters['Hall/getAll']
      
    }
  },

  async mounted() {
    await this.$store.dispatch('Hall/fetchAll', parseInt(this.$route.params.id))
    this.loaded = true
  },

  methods: {
    toDate(ms) {
      let date = new Date(parseInt(ms))
      return `${date.toLocaleDateString('ru', {year: 'numeric', month: 'long', day: 'numeric'})}`
    },



    add() {
      this.$store.commit('Hall/add', parseInt(this.$route.params.id))
    },

    remove(id) {
      this.$store.commit('Hall/remove', id)
    },

    async save() {
      this.uploading = true
      for (var key in this.halls) {
        this.$store.commit('Hall/makeSaved', key)
      }

      await this.$store.dispatch('Hall/saveAll')

      this.uploading = false
      this.success = true
      setTimeout(()=>{this.success = false}, 2000)
    }
  },

  components: {
    CardPreloader
  }


}
</script>

<style lang="css" scoped>
.successbutton {
  background-color: #eee;
  color: #333;
}

.successbutton:hover {
  background-color: #6c757d;
  color: white;
}

.successbutton > *,
.savebutton > * {
  cursor: pointer;
}

.editButton,
.delButton {
  /*width: 15%;*/
}



</style>