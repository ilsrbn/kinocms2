<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
      <div class="card-header">
        <h2 class="card-title">
          Сквозной банер на заднем фоне
        </h2>
      </div>
      <div v-if="!loaded" class="card-body d-flex justify-content-center align-items-center">
        <CardPreloader class="card w-100 mh-100" />
      </div>
      <div v-else class="card-body d-flex justify-content-between">
        <div class="grp">
          <select v-model="card">
            <option disabled>Выберите один из вариантов:</option>
            <option :value="false">Без фона</option>
            <option :value="true">Фото на фоне</option>
          </select>
        </div>

        <div class="grp mx-2">
          <input @change="picturePreview" type="file" accept="image/*" id="backgroundCard" style="display: none;" />

          <label class="label" for="backgroundCard">
            <img v-if="card.picture != ''" class="mw-100" :src="card.picture" alt="placeholder">
            <img v-else class="mw-100" src="@/assets/placeholder-1024x512.png" alt="placeholder">
          </label>
        </div>
      </div>
      <div v-if="loaded" class="card-footer d-flex justify-content-center align-items-center">
        <SaveButton
          :uploading="uploading"
          :success="success"
          @saveCards="savePicture" />
      </div>
    </div>
      
    </div>
    
  </div>
</template>

<script>
import CardPreloader from '@/components/CardPreloader'
import SaveButton from '@/components/SaveButton'
export default {
  components: {
    CardPreloader,
    SaveButton
  },

  data(){
    return {
      loaded: false,
      uploading: false,
      success: false
    }
  },

  name: 'CardBackground',

  async mounted() {
      await this.$store.dispatch('Banner_BackgroundCard/fetchCard')
      this.loaded = true
  },

  computed: {
    card: {
      get() {
        return this.$store.getters['Banner_BackgroundCard/getCard']
      },

      set(value) {
        return this.$store.commit('Banner_BackgroundCard/setType', value)
      }
    }
  },

  methods: {
      picturePreview(event) {
        const file = event.target.files[0]
        this.$store.commit('Banner_BackgroundCard/setPicture', file)
      },

      async savePicture() {
        this.uploading = true
        await this.$store.dispatch('Banner_BackgroundCard/saveCard')
        this.uploading = false
        this.success = true
        setTimeout(() => {this.success = false}, 2000)
      }
    }
}
</script>

<style lang="css" scoped>

.cardWrapper > * {
  color: #333;
}

.label {
  max-height: 30vw;
  width: inherit;
  cursor: pointer;
  opacity: 1;
  transition: opacity 150ms ease-in;
}

.label:hover {
  opacity: 0.8;
}

.label img {
  max-height: 30vw;
  max-width: 100%;
  object-fit: contain;
}

.savebutton {
  font-size: 1.6rem;
  border: none;
  border-radius: 5px;
  background-color: #2d358a;
  color: white;
  padding: 0.2rem 0.6rem;

  opacity: 1;
  transition-property: opacity background-color;
  transition-duration: 150ms;
  transition-timing-function: ease-in;
}

.savebutton:hover {
  opacity: 0.8;
}

.successbutton {
  font-size: 1.6rem;
  border: none;
  border-radius: 5px;
  background-color: #42b983;
  color: white;
  padding: 0.2rem 0.6rem;

  opacity: 1;
  transition-property: opacity background-color;
  transition-duration: 150ms;
  transition-timing-function: ease-in;
}

.successbutton:hover {
  opacity: 0.8;
}
</style>