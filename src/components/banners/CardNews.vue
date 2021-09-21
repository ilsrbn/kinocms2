<template>
  <div class="col-lg-3 col-md-4 col-sm">
    <div class="card">
    <div v-on:click="$store.dispatch('Banner_NewsCard/removeCard', card)" class="close text-center closebutton" style="cursor: pointer;">&times;</div>
    <div class="card-header shapka">

      <input @change="picturePreview" type="file" accept="image/*" :id="card.id" style="display: none;" />

      <label class="w-100 label h-inherit" :for="card.id">
        <img v-if="card.picture == ''" class="w-100 mh-100" src="@/assets/placeholder-1024x512.png" alt="placeholder">
        <img v-else class="w-100 mh-100" :src="card.picture" alt="placeholder">
      </label>
    </div>
    <form>
    <div class="card-body">
      <div class="row justify-content-between w-100 flex-nowrap mb-2">
        <input class="w-100 form-control form-control-border" type="text" id="URL" v-model="card.URL" />
      </div>
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
      }
      console.log(file)
      this.card.picture = URL.createObjectURL(file.picture)
      this.$store.commit('Banner_NewsCard/addPreviewPicture', file)
    }
  },

  name: 'CardNews'
}
</script>

<style lang="css" scoped>
label, input {
  font-size: 1.5rem;
}

img {
  object-fit: cover;
}
</style>