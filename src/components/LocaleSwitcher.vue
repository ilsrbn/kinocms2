<template>
  <b-form-select :options="locales" v-model="$i18n.locale"></b-form-select>
</template>

<script>
export default {
  name: 'LocaleSwitcher',
  data: () => ({
    locales: ['ru', 'ua'],
  }),
  computed: {
    locale() {
      return this.$i18n.locale
    }
  }

  
}
</script>