<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
      <div class="card-header">
        <h2 class="card-title">
          На главной верх
        </h2>
      </div>
      <div v-if="!loaded" class="card-body d-flex flex-row justify-content-start">
        <CardPreloader class="card w-100 mh-100" />
      </div>
        
      <div v-else class="card-body">
        <div class="row">
          <div class="col-lg-3 col-md-4 col-sm">
            <div class="card addbutton" @click="addCard">
              <div class="card-body d-flex flex-column text-center justify-content-center align-items-center"><i class="fas fa-plus-circle fa-2x"></i>
              </div>
            </div>
          </div>

          <CardMain
            v-for="card in cards"
            :key="card.id"
            v-bind:card="card"
            @uploadPic="updatePicture" />
        </div>

      </div>
      <div v-if="loaded" class="card-footer text-center">
        <p class="mb-1">Скорость вращения</p>
        <b-form-select v-model="selected" :options="options" class="mb-4"></b-form-select>
        <SaveButton
          :uploading="uploading"
          :success="success"
          @saveCards="saveCards" />
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import CardMain from '@/components/banners/CardMain'
import CardPreloader from '@/components/CardPreloader'
import SaveButton from '@/components/SaveButton'
import {fetch, save} from '@/modules/firebase'

export default {

  computed: {

    cards: {
      get() {
        return this.$store.getters['Banner_MainCard/getCards']
      },

      set() {
        return this.$store.getters['Banner_MainCard/getCards']
      }
    }
  },

  async mounted() {
      await this.$store.dispatch('Banner_MainCard/fetchCards')
      if (await fetch('/banners/mainSpeed') != '') {
        this.selected = await fetch('/banners/mainSpeed')
      }
      
      this.loaded = true
    },

  name: 'MainCardsContainer',

  components: {
    CardMain,
    CardPreloader,
    SaveButton
  },

  data() {
    return {
      loaded: false,
      uploading: false,
      success: false,

      selected: null,

      options: [
        {value: null, text: 'Скорость вращения'},
        {value: 1, text: '1 секунда'},
        {value: 2, text: '2 секунды'},
        {value: 3, text: '3 секунды'},
        {value: 5, text: '5 секунд'},
        {value: 7, text: '7 секунд'},
        {value: 10, text: '10 секунд'}
      ]
    }
  },

  methods: {  
    addCard() {
      this.$store.commit('Banner_MainCard/addCard')
    },

    updatePicture(id, picture) {
      console.log('Before:', this.$store.state.cards.filter(t => t.id === id))
      this.$store.state.Banner_MainCard.cards.filter(t => t.id === id).picture = picture
      console.log('After:', this.$store.state.Banner_MainCard.cards.filter(t => t.id === id))
    },

    async saveCards() {
      this.uploading = true
      await this.$store.dispatch('Banner_MainCard/saveCards')
      console.log(this.selected)
      await save('/banners/mainSpeed', this.selected)
      this.uploading = false
      this.success = true
      setTimeout(() => {this.success = false}, 2000)
    }

    
  }
}
</script>