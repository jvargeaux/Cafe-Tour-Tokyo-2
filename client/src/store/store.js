import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    cafes: [],
    posts: []
  },
  getters: {

  },
  mutations: {
    loadCafes(state, cafes) {
      state.cafes = cafes;
    },
    loadPosts(state, posts) {
      state.posts = posts;
    }
  }
})
