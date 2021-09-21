<template>
  <button
    v-if="!uploading"
    @click="$emit('saveCards')"
    :class="!success ? 'btn btn-flat btn-primary' : 'btn btn-flat btn-success'"
    >
    <p class="mx-2 my-0" v-if="!success">Сохранить</p>
    <i v-if="success" class="far fa-check-circle mx-2"></i>
  </button>
  <button v-else class="btn btn-flat btn-primary disabled">
    <i class="fas fa-circle-notch fa-spin mx-2"></i>
  </button>
</template>

<script>
export default {
  props: ['uploading', 'success'],

  name: 'SaveButton',
}
</script>

<style>
</style>