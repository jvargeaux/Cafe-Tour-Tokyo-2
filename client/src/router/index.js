import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import CafeList from '../views/CafeList.vue'
import Map from '../views/Map.vue'
import API from '../views/API.vue'
import Profile from '../views/Profile.vue'
import Database from '../views/Database.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/cafelist',
    name: 'cafelist',
    component: CafeList
  },
  {
    path: '/map',
    name: 'map',
    component: Map
  },
  {
    path: '/api',
    name: 'api',
    component: API
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/database',
    name: 'database',
    component: Database
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]

const router = new VueRouter({
  routes
})

export default router
