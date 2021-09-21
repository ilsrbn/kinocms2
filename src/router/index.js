import Vue from 'vue'
import firebase from 'firebase/app'

import VueRouter from 'vue-router'
import StatsPage from '@/views/Admin/Stats'
import store from '../store/index' // eslint-disable-line

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    component: () => import('@/views/User/Layout.vue'),
    children: [
      {
        path: '',
        name: 'HomePage',
        component: () => import('@/views/User/Home.vue')
      }
    ]
  },

  {
    path: '/signup',
    name: 'SignupPage',

    component: () => import('@/views/Login/Register.vue')
  },

  {
    path: '/login',
    name: 'LoginPage',

    component: () => import('@/views/Login/Login.vue')
  },

  {
    path: '/admin',
    component: () => import('@/views/Admin/Layout.vue'),
    meta: {auth: true},
    children: [
      {
        path: '',
        name: 'StatsPage',
        component: StatsPage
      },

      {
        path: 'banners',
        name: 'BannersPage',
        component: () => import(/* webpackChunkName: "adminBanners" */'@/views/Admin/Banners')
      },

      {
        path: 'movies',
        name: 'AllMovies',
        component: () => import(/* webpackChunkName: "adminMovies" */'@/views/Admin/Movies/All.vue')
      },
      {
        path: 'movies/:id',
        name: 'EditMovie',
        component: () => import(/* webpackChunkName: "adminMoviesEdit" */'@/views/Admin/Movies/Edit.vue')
      },
    
      {
        path: 'cinemas',
        name: 'CinemasPage',
        component: () => import(/* webpackChunkName: "adminCinema" */ '@/views/Admin/Cinemas/All.vue')
      },
      {
        path: 'cinemas/:id',
        name: 'EditCinema',
        component: () => import(/* webpackChunkName: "adminCinemaEdit" */'@/views/Admin/Cinemas/Edit.vue')
      },
    
      {
        path: 'halls/:id',
        name: 'HallPage',
        component: () => import(/* webpackChunkName: "adminHall" */'@/views/Admin/Halls')
      },

      {
        path: 'schedule',
        name: 'SchedulePage',
        component: () => import(/* webpackChunkName: "adminSchedule" */'../views/Admin/Schedule/All.vue')
      },
    
      {
        path: 'news',
        name: 'AllNews',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "adminNews" */ '../views/Admin/News/All.vue')
      },
      {
        path: 'news/:id',
        name: 'EditNews',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "adminNewsEdit" */ '../views/Admin/News/Edit.vue')
      },
    
      {
        path: 'promotions',
        name: 'AllPromotions',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "adminPromotions" */ '../views/Admin/Promotions/All.vue')
      },
      {
        path: 'promotions/:id',
        name: 'EditPromotions',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "adminPromotionsEdit" */ '../views/Admin/Promotions/Edit.vue')
      },
    
      {
        path: 'pages',
        name: 'AllPages',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "adminPages" */ '../views/Admin/Pages/All.vue')
      },
      {
        path: 'pages/0',
        name: 'EditMainPage',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "adminPagesEdit" */ '../views/Admin/Pages/default/Main.vue')
      },
      {
        path: 'pages/6',
        name: 'EditContactPage',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "adminPagesEdit" */ '../views/Admin/Pages/default/Contact.vue')
      },
      {
        path: 'pages/:id',
        name: 'EditPages',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "adminPagesEdit" */ '../views/Admin/Pages/Edit.vue')
      },

      {
        path: 'users',
        name: 'UsersPage',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "adminUsers" */ '../views/Admin/Users/All.vue')
      },
      {
        path: 'users/:id',
        name: 'EditUser',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "adminUsersEdit" */ '../views/Admin/Users/Edit.vue')
      },

      {
        path: 'mails',
        name: 'MailsPage',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "adminMail" */ '../views/Admin/Mail/')
      }
    ]
  }
  

  /* Movies */
  
]

const router = new VueRouter({
  routes,
  linkExactActiveClass: "exact-active",
  linkActiveClass: "active",
  mode: 'history',
})

router.beforeEach((to, from, next)=> {
  
  const requireAuth = to.matched.some(record => record.meta.auth)
  const currentUser = firebase.auth().currentUser
  
  if(requireAuth && !currentUser) {
    next({name: 'LoginPage'})
  } else {
    next()
  }
})

export default router
