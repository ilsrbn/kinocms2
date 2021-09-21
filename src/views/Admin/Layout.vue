<template>
    <div class="wrapper d-flex justify-content-center align-items-center min-vh-100" v-if="!admin">
      <b-spinner variant="primary" label="Spinning"></b-spinner>
    </div>
    <div v-else class="wrapper">
        <Navbar />
        <Sidebar />
        <router-view class="content-wrapper" />
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
    name: 'Layout',
    components: {
        Navbar,
        Sidebar
    },

    data: () => {
      return {
        admin: false
      }
    },
    async mounted() {
      if (!Object.keys(this.$store.getters.info).length) {
        await this.$store.dispatch('fetchUser')
      }
      let admin = this.$store.getters.info.admin
      if (admin == true) {
        this.admin = true
      } else if(admin == false) {
        this.$router.push({name: 'HomePage'})
      } else {
        this.$router.push({name: 'LoginPage'})
      }
    }
}
</script>

<style>

.card-header .nav-item a {
  color: #aa1416;
}

.btn-light {
  border: none;
}

.btn-light:hover, .btn-light:active, .btn-light:focus  {
  background-color: rgba(170, 20, 22, 0.2) !important;
  border: none;
  outline: 0;
  box-shadow: none;
}

button,
.tr-button,
a {
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 300;
}

.closebutton {
  font-size: 3rem;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;  

  background-color: opacity;
  color: black;

  transition-property: background-color color;
  transition-duration: 150ms;
  transition-timing-function: ease-in; 
}

.closebutton:hover {
  background-color: red;
  color: white;
}

.preloaded {
  height: 25vw;
  background: #eee;
}

.preloaded > * {
  color: #555;
}

.addbutton {
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-size: 2rem;
  min-height: 20vw;

  background-color: #eee;
  color: #555;
  transition-property: background-color color;
  transition-duration: 150ms;
  transition-timing-function: ease-in;
}

.addbutton:hover {
  background-color: #6c757d;
  color: white;
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

.label {
  cursor: pointer;
  opacity: 1;
  transition: opacity 150ms ease-in;
}

.label:hover {
  opacity: 0.8;
}

.delButton {
  cursor: pointer;
  padding: 1rem 0;

  background: opacity;
  color: #dc3545;

  transition-property: background color;
  transition-timing-function: ease-in;
  transition-duration: 150ms;
}

.delButton:hover {
  background: #dc3545;
  color: white;
}

.editButton,
.editButton a {
  cursor: pointer;

  background-color: opacity;
  color: #ffc107;

  transition-property: background color;
  transition-timing-function: ease-in;
  transition-duration: 150ms;
}

.editButton:hover,
.editButton:hover a {
  background-color: #ffc107;
  color: white;
}

.hypeLink {
  color: #222;
  background-color: #fefefe;

  transition-property: color background-color;
  transition-duration: 150ms;
  transition-timing-function: ease-in;
}

.hypeLink:hover {
  color: white;
  background-color: #6c757d;
}

.fadeIn {
  animation: fadeIn 250ms;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

</style>