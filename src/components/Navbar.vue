<template>
  <header class="main-header navbar  navbar-expand navbar-dark navbar-black">
    

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      

      <li class="nav-item">
        <b-dropdown right :text="username">
          <b-dropdown-item @click="$router.push({name: 'HomePage'})" variant="default">
            <i class="fas fa-spinner fa-spin mr-1"></i>
            Клиентский сайт
          </b-dropdown-item>
          <b-dropdown-item @click="logout" variant="danger">
            <i class="fas fa-sign-out-alt mr-1"></i>
            Выйти
          </b-dropdown-item>
        </b-dropdown>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    username() {
      return this.$store.getters.info.username
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push({name: 'LoginPage'})
    }
  }
}
</script>

<style>
</style>
