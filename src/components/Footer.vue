<template>
  <b-card bg-variant="dark"
    ><b-card-body class="pb-0">
      <b-row class="p-3">
        <b-col cols="3">
          <div class="ccc">
            <b-img
              fluid
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Google_Play_2016_logo.svg/1200px-Google_Play_2016_logo.svg.png"
            ></b-img>
          </div>
          <div class="mt-2 ccc">
            <b-img
              fluid
              src="https://cdn.worldvectorlogo.com/logos/aivalable-on-the-app-store-2.svg"
            ></b-img>
          </div>
        </b-col>
        <b-col cols="7">
          <b-row>
          <b-col>
            <ul>
              <li><router-link :to="{name: 'Movies'}">{{$t('navbar.link.current')}}</router-link></li>
              <li><router-link :to="{name: 'Schedule'}">{{$t('navbar.link.schedule')}}</router-link></li>
              <li><router-link :to="{name: 'Soon'}">{{$t('navbar.link.soon')}}</router-link></li>
              <li><router-link :to="{name: 'Cinemas'}">{{$t('navbar.link.cinemas')}}</router-link></li>
              <li><router-link :to="{name: 'Promos'}">{{$t('navbar.link.promos')}}</router-link></li>
            </ul>
          </b-col>
          <b-col>
            <ul>
              <li><router-link :to="{name: 'About'}">{{$t('navbar.link.about')}}</router-link></li>
              <li><router-link :to="{name: 'News'}">{{$t('navbar.link.news')}}</router-link></li>
              <li><router-link :to="{name: 'Adv'}">{{$t('navbar.link.adb')}}</router-link></li>
              <li><router-link :to="{name: 'Caffee'}">{{$t('navbar.link.caffee')}}</router-link></li>
              <li><router-link :to="{name: 'Contacts'}">{{$t('navbar.link.contacts')}}</router-link></li>
            </ul>
          </b-col>
          </b-row>
        </b-col>
        <b-col cols="1">
          <b-container>
                <b-row>
                  <b-col
                    ><i
                      style="color: #e4405f"
                      class="fab fa-instagram fa-2x"
                    ></i
                  ></b-col>
                  <b-col
                    ><i
                      style="color: #1877f2"
                      class="fab fa-facebook-square fa-2x"
                    ></i
                  ></b-col>
                  <b-col
                    ><i style="color: #ff0000" class="fab fa-youtube fa-2x"></i
                  ></b-col>
                  <b-col
                    ><i style="color: #4680c2" class="fab fa-vk fa-2x"></i
                  ></b-col>
                </b-row>

          </b-container>
        </b-col>
      </b-row>
      <b-row class="mt-4"
        ><b-col class="text-center"
          ><small class="text-center">©KinoCMS 2002, All Rights Reserved</small></b-col
        >
      </b-row></b-card-body
    ></b-card
  >
</template>

<script>
export default {};
</script>

<style>
li {
  list-style: none;
}
.footer a, a:after {
  color: white;
  text-decoration: none;
  opacity: 1;
  transition: opacity 100ms ease-in;
}

.footer a:hover {
  color: white;
  opacity: 0.5;
}
.ccc {
  opacity: 0.4;
  cursor: pointer;
  transition: opacity 100ms ease-in;
}

.ccc:hover {
  opacity: 1;
}
</style>