<template>
  <b-navbar class="n" :class="vis ? 'visib' : ''" :type="vis ? 'dark' : 'light'" sticky>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-container class="flex flex-column mx-0 w-100 px-0">
      <b-navbar-nav class="w-100 flex align-items-center">
        <b-col cols="1"><b-navbar-brand :to="{ name: 'HomePage' }">
      <b>Kino</b><i>CMS</i>
    </b-navbar-brand></b-col>
        <b-col class="text-center">
          <b-nav-form class="justify-content-center">


            <!-- Компонент поиска -->
            <autocomplete
              :search="search"
              :get-result-value="getResult"
              placeholder="Поиск">

              <!-- кастомный рендер выпадающего списка -->
              <template #result="{ result, props }">
                
                <a v-bind="props" class="autocomplete-result search-field" :href="`/movie/${result.id}`">

                    <div class="imageSearch"><b-img fluid :src="result[locale].banner"></b-img></div>
                    <div class="textSearch">{{result[locale].title}}</div>
                 
                </a>
              </template>
            </autocomplete>

          </b-nav-form>
        </b-col>
        <b-col cols="4">
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
        <b-col cols="2" class="text-right">
          <a class="text-right ph" :href="`tel:${info[locale].phone1}`" :style="vis ? 'color:white' : 'color:black'">{{ info[$i18n.locale].phone1 }}</a>
          <br />
          <a class="text-right ph" :href="`tel:${info[locale].phone2}`" :style="vis ? 'color:white' : 'color:black'">{{ info[$i18n.locale].phone2 }}</a>
        </b-col>
      </b-navbar-nav>

      <b-navbar-nav class="w-100 flex  align-items-center">

        <b-nav-item :to="{name: 'Movies'}">{{$t('navbar.link.current')}}</b-nav-item>
        <b-nav-item :to="{name: 'Schedule'}">{{$t('navbar.link.schedule')}}</b-nav-item>
        <b-nav-item :to="{name: 'Soon'}">{{$t('navbar.link.soon')}}</b-nav-item>
        <b-nav-item :to="{name: 'Cinemas'}">{{$t('navbar.link.cinemas')}}</b-nav-item>
        <b-nav-item :to="{name: 'Promos'}">{{$t('navbar.link.promos')}}</b-nav-item>
        <b-nav-item-dropdown :text="$t('navbar.more')">
          <b-dropdown-item :to="{name: 'About'}">{{$t('navbar.link.about')}}</b-dropdown-item>
          <b-dropdown-item :to="{name: 'News'}">{{$t('navbar.link.news')}}</b-dropdown-item>
          <b-dropdown-item :to="{name: 'Adv'}">{{$t('navbar.link.adb')}}</b-dropdown-item>
          <b-dropdown-item :to="{name: 'Caffee'}">{{$t('navbar.link.caffee')}}</b-dropdown-item>
          <b-dropdown-item :to="{name: 'Mobile'}">{{$t('navbar.link.mobile')}}</b-dropdown-item>
          <b-dropdown-item :to="{name: 'Contacts'}">{{$t('navbar.link.contacts')}}</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item variant="info" class="ml-auto">
          <locale-switcher />
        </b-nav-item>
        <b-nav-item v-if="auth">
        <b-nav-item-dropdown right variant="info" :text="username">
          <b-dropdown-item
            v-if="admin"
            @click="$router.push({ name: 'StatsPage' })"
            variant="success"
            
            
          >
            <i class="far fa-chart-bar"></i>
            Админ панель
          </b-dropdown-item>
          <b-dropdown-item
            @click="$router.push({ name: 'User' })"
            variant="info"
            
            
          >
            <i class="fas fa-address-card"></i>
            Мой кабинет
          </b-dropdown-item>
          <b-dropdown-item @click="logout" variant="danger">
            <i class="fas fa-sign-out-alt mr-1"></i>
            Выйти
          </b-dropdown-item>
        </b-nav-item-dropdown>
        </b-nav-item>
        <b-nav-item v-else variant="info" :to="{ name: 'LoginPage' }"
          ><i class="fas fa-sign-in-alt mr-1"></i>Войти</b-nav-item
        ></b-navbar-nav
      >
    </b-container>
  </b-navbar>
</template>

<script>
import LocaleSwitcher from "./LocaleSwitcher.vue";
import { fetch } from "@/modules/firebase";

// импорт компонента поиска и его стили
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'

export default {
  components: {
    LocaleSwitcher,

    // Регистрация компонента поиска
    Autocomplete

  },
  name: "Navbar",
  props: ["auth", "admin", "username"],
  computed: {
    // Возвращает только нужные поля в каждом из фильмов
    moviesSearch() {
      let movies = []
      this.movies.forEach(t => {
        movies.push({
          id: this.movies.indexOf(t),
          type: t.type,
          ru: {
            title: t.ru.title,
            banner: t.ru.banner
          },
          ua: {
            title: t.ua.title,
            banner: t.ua.banner
          }
        })
      })
    return movies
    }
  },
  methods: {
    // Срабатывает при печатании
    search(input) {
      if (input.length < 1) {
        return []
      }
      
      return this.moviesSearch.filter(movie => {
        return movie[this.locale].title.toLowerCase().startsWith(input.toLowerCase())
      })
    },
    // Передает в пропс результат поиска для кастомного рендеринга
    getResult(result) {
        return result
      },

    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push({ name: "LoginPage" });
    },
    handleScroll () {
      if (window.scrollY <= (window.innerHeight * 0.05)) {
        this.vis = false
        console.log(this.vis)
      } else {
        this.vis = true
        console.log(this.vis)

      }
    }
  },
  beforeMount () {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },



  data: () => ({
    info: {},
    vis: false,
    locale: '',

    // Загрузка фильмов для поиска по ним 
    movies: []
  }),

  async mounted() {
    this.info = await fetch("/pages/0");
    this.movies = await fetch('/movies')
    this.locale = this.$i18n.locale
  },
};
</script>

<style>
.search-field{
  color: black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
}
.imageSearch {
  max-width: 40%;
  margin-left: 0;
  border-radius: 5px;

}

.imageSearch img {
  border-radius: 5px;
}

a .textSearch {
  text-transform: uppercase;
  font-style: italic;
  text-decoration: none;
  text-align: center;
}

.n, .navbar-light {
  background: rgba(0, 0, 0, 0) !important;
  box-shadow: 0 2px .3rem .1rem rgba(0, 0, 0, 0);

  transition-property: background box-shadow;
  transition-duration: 100ms;
  transition-timing-function: ease-in;
  
}

.ph {
  color: white;
  text-decoration: none;
  opacity: 1;
  transition: opacity 100ms ease-in;
}

.ph:hover {
  color: white;
  opacity: 0.5;
}

.n.visib, .navbar-light.visib {
  background: #212529 !important;
  box-shadow: 0 2px 0.3rem .005rem rgba(0, 0, 0, 0.8);
  margin: 0 0 !important;
  transition-property: background box-shadow;
  transition-duration: 100ms;
  transition-timing-function: ease-in;
}

.navbar-expand {
  justify-content: center !important;
}

.fab {
  opacity: 1;
  transition: opacity 100ms ease-in;
  cursor: pointer;
}

.fab:hover {
  opacity: 0.4;
}

.active {
  margin-top: 1rem;
  transition: margin-top 100ms ease-in;
}

.dropdown-item.active {
  margin-top: 0 !important;
}
</style>