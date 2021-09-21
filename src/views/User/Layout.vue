<template>
  <div class="wrapper" :style="backgroundBanner">
    <div class="w-100 h-100 p">
      <Navbar :auth="auth" :admin="admin" :username="username" />
      <router-view class="content-wrapper ml-0" />

    </div>
  </div>
</template>

<script>
import Navbar from "@/components/ClientNavbar";

import {fetch} from '@/modules/firebase'
export default {
  components: {
    Navbar,
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
      return this.$store.getters.info.username;
    }
  },
};
</script>

<style scoped>
.p {
  padding: 3rem 10%;
}

* {
  color: white;
}

h1, h2, h3, h4, h5, h6 {
  text-transform: uppercase;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 400;
}

.content-wrapper {
  background: rgba(0, 0, 0, 0.8);
}
</style>