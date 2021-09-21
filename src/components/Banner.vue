<template>
  <b-form-group
    :label="label"
    :label-for="'banner-' + key">
    <b-form-file
      class="col-lg-6 col-md-8 col-12"
      accept="image/*"
      browse-text="Выбрать файл"
      @change="bannerPreview(key, $event)"
      :id="'banner-' + key" />
      <br />
      <b-container class="col-lg-6 col-md-8 col-12 ml-0 mt-1">
        <b-img
          fluid
          :src="banner ? banner : 'https://via.placeholder.com/1600x900.png'" />             
      </b-container>
  </b-form-group>
</template>

<script>
export default {
  props: ['label', 'banner'],

  name: 'Banner',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>