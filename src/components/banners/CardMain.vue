<template>
  <div class="col-lg-3 col-md-4 col-sm">
    <div class="card">
      <div v-on:click="$store.dispatch('Banner_MainCard/removeCard', card)" class="close text-center closebutton" style="cursor: pointer;">&times;</div>
      <div class="card-header shapka">

        <input @change="picturePreview" type="file" accept="image/*" :id="card.id" style="display: none;" />

        <label class="w-100 label" :for="card.id">
          <img v-if="card.picture == ''" class="w-100 mh-100" src="@/assets/placeholder-1024x512.png" alt="placeholder">
          <img v-else class="w-100" :src="card.picture" alt="placeholder">
        </label>
      </div>
      <form class="mt-auto">
        <div class="card-body">
          <input
            placeholder="Гиперссылка"
            class="w-100 mb-1 form-control form-control-border"
            type="text"
            id="URL"
            v-model="card.URL" />
          
          
          <input
            class="w-100 form-control form-control-border"
            type="text"
            id="TEXT"
            placeholder="Текст"
            v-model="card.text" />
          
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {

  props: {
    card: {
      type: Object,
      required: true
    }
  },

  methods: {
    picturePreview(event) {
      const file = {
        picture: event.target.files[0],
        id: this.card.id,
        URL: this.card.URL,
        text: this.card.text
      }
      console.log(file)
      this.card.picture = URL.createObjectURL(file.picture)
      this.$store.commit('Banner_MainCard/addPreviewPicture', file)
    }
  },

  name: 'CardMain'
}
</script>

<style lang="css" scoped>
.shapka {
  max-height: 10vw;
}
.label {
  max-height: 10vw;
}

label, input {
  font-size: 1.5rem;
}

img {
  max-height: 10vw;
  object-fit: cover;
}
</style>