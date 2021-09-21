<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
      <div class="card-header">
        <h2 class="card-title">
          На главной Новости и Акции
        </h2>
      </div>
      <div v-if="!loaded" class="card-body d-flex flex-row justify-content-start">
        <CardPreloader class="card w-100 mh-100" />
      </div>
        
      <div v-else class="card-body">
        <div class="row">
        <div class="col-lg-3 col-md-4 col-sm">
          <div class="card addbutton" @click="addCard">
            <div class="card-body d-flex flex-column text-center justify-content-center align-items-center"><i class="fas fa-plus-circle fa-2x"></i></div>
          </div>
        </div>

        <CardNews
          v-for="card in cards"
          :key="card.id"
          v-bind:card="card"
          @uploadPic="updatePicture" />
        </div>

      </div>
      <div v-if="loaded" class="card-footer d-flex justify-content-center align-items-center">
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
import CardNews from '@/components/banners/CardNews'
import CardPreloader from '@/components/CardPreloader'
import SaveButton from '@/components/SaveButton'

export default {

  computed: {

    cards: {
      get() {
        return this.$store.getters['Banner_NewsCard/getCards']
      },

      set() {
        return this.$store.getters['Banner_NewsCard/getCards']
      }
    }
  },

  async mounted() {
      await this.$store.dispatch('Banner_NewsCard/fetchCards')
      this.loaded = true
    },

  name: 'NewsCardsContainer',

  components: {
    CardNews,
    CardPreloader,
    SaveButton
  },

  data() {
    return {
      loaded: false,
      uploading: false,
      success: false
    }
  },

  methods: {  
    addCard() {
      this.$store.commit('Banner_NewsCard/addCard')
    },

    updatePicture(id, picture) {
      console.log('Before:', this.$store.state.cards.filter(t => t.id === id))
      this.$store.state.Banner_NewsCard.cards.filter(t => t.id === id).picture = picture
      console.log('After:', this.$store.state.Banner_NewsCard.cards.filter(t => t.id === id))
    },

    async saveCards() {
      this.uploading = true
      await this.$store.dispatch('Banner_NewsCard/saveCards')
      this.uploading = false
      this.success = true
      setTimeout(() => {this.success = false}, 2000)
    }

    
  }
}
</script>