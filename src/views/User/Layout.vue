<template>
  <div class="wrapper" :style="backgroundBanner">
    
    <div class="w-100 h-100 p">
      <Navbar :auth="auth" :admin="admin" :username="username" />
      <router-view class="content-wrapper ml-0" />
      <Footer class="footer" />

    </div>
  </div>
</template>

<script>
import Navbar from "@/components/ClientNavbar";
import Footer from "@/components/Footer";

import {fetch} from '@/modules/firebase'
export default {
  components: {
    Navbar,
    Footer
  },
  name: "Layout",
  data: () => {
    return {
      admin: false,
      auth: false,
      backgroundBanner: {
        'background-size': 'cover',
        'background-attachment': 'fixed',
        'background-position': 'center'
      }
    };
  },
  methods: {
    async userRole() {
      if (!Object.keys(this.$store.getters.info).length) {
        try {
          await this.$store.dispatch("fetchUser");
        } catch(e) {
          console.log(e)
        }
      }

      if (this.$store.getters.info == null) {
        this.auth = false
        return
      }

      let admin = this.$store.getters.info.admin;
      if (admin == true) {
        this.admin = true;
        this.auth = true;
      } else if (admin == null) {
        this.auth = false;
      } else if (admin == false) {
        this.auth = true;
      }
    }
  },
  async mounted() {
        this.$set(this.backgroundBanner, 'background-image', ('url("' + await fetch('/banners/background/picture') + '")'))
    await this.userRole()
  },
  computed: {
    username() {
      if (this.$store.getters.info != null) {
        return this.$store.getters.info.username;
      }
      else return ''
    }
  },
};
</script>

<style scoped>
.p {
  padding: 0 10% 3rem;
}

* {
  color: white;

  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 400;
}

.wrapper {
  min-height: 100vh;
}

.wrapper .content-wrapper {
  background: rgba(0, 0, 0, 0.8);
  height: auto;
  min-height: unset;
}

</style>