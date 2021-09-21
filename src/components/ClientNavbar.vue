<template>
  <b-navbar class="n" type="dark" sticky>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-navbar-brand :to="{ name: 'HomePage' }">
      <b>Kino</b><i>CMS</i>
    </b-navbar-brand>
    <b-navbar-nav v-if="auth" class="ml-auto">
      <b-nav-item variant="dark" right>
        <locale-switcher/>
      </b-nav-item>
      <b-dropdown variant="light" right :text="username">
        <b-dropdown-item
          v-if="admin"
          @click="$router.push({ name: 'StatsPage' })"
          variant="info"
        >
          <i class="far fa-chart-bar"></i>
          Админ панель
        </b-dropdown-item>
        <b-dropdown-item @click="logout" variant="danger">
          <i class="fas fa-sign-out-alt mr-1"></i>
          Выйти
        </b-dropdown-item>
      </b-dropdown>
    </b-navbar-nav>
    <b-navbar-nav v-else class="ml-auto">
      <b-nav-item right>
        <locale-switcher/>
      </b-nav-item>
      <b-nav-item variant="info" :to="{ name: 'LoginPage' }"
        ><i class="fas fa-sign-in-alt mr-1"></i>Войти</b-nav-item
      >
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import LocaleSwitcher from './LocaleSwitcher.vue'
export default {
  components: {
    LocaleSwitcher
  },
  name: 'Navbar',
  props: ['auth', 'admin', 'username'],
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push({ name: "LoginPage" });
    },
  },
};
</script>

<style>
.n {
  background: rgba(0, 0, 0, 0.7) !important;
}


.navbar-light {
  background: rgba(0, 0, 0, 0.7) !important;
}
</style>