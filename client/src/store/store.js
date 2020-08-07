import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    cafes: [],
    editingCafe: null,
    posts: [],
    currentLanguage: 'en'
  },
  getters: {
    language: state => {
      return state.currentLanguage;
    }
  },
  mutations: {
    loadCafes(state, cafes) {
      state.cafes = cafes;
    },
    updateCafe(state, index, cafe) {
      if (index === undefined || index === null || index >= state.cafes.length) return;
      state.cafes[index] = cafe;
    },
    updateEditingCafe(state, editingCafe) {
      state.editingCafe = editingCafe;
    },
    loadPosts(state, posts) {
      state.posts = posts;
    },
    changeLanguage(state, lang) {
      state.currentLanguage = lang;
    }
  }
})
