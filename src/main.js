import Vue from 'vue'
import Vuelidate from 'vuelidate'
import firebase from 'firebase/app'
import 'firebase/auth'

import App from './App.vue'
import router from '@/router'
import store from './store'
import './plugins/bootstrap-vue'
import './modules/firebase'

import 'mutationobserver-shim'
import '@/../public/plugins/fontawesome-free/css/all.min.css'




Vue.use(Vuelidate)




Vue.config.productionTip = false

let app
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('.wrapper')
  }
})

