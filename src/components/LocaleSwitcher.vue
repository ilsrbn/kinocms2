<template>
  <b-nav-item-dropdown style="text-transform:uppercase" :text="locale">
    <b-dropdown-item style="text-transform:capitalize" @click="switchLocale('ru')">Русский</b-dropdown-item>
    <b-dropdown-item style="text-transform:capitalize" @click="switchLocale('ua')">Украинский</b-dropdown-item>
  </b-nav-item-dropdown>
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
  },

  methods: {
    switchLocale(lang) {
      if (this.$i18n.locale != lang) {
        this.$i18n.locale = lang
      }
    }
  }

  
}
</script>