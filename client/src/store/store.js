import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    cafes: [],
    editingCafe: null,
    posts: [],
    user: null,
    currentLanguage: 'en',
    darkMode: false
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
    updateUser(state, user) {
      state.user = user;
    },
    updateUserFavorites(state, favorites) {
      state.user.favorites = favorites;
    },
    changeLanguage(state, lang) {
      state.currentLanguage = lang;
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    }
  },
  actions: {

    async fetchCafesFromDB({ commit, state }) {

      const API_CAFES_URL = window.location.hostname === 'localhost' ?
        'http://' + window.location.hostname + ':5000/api/cafes' :
        'https://' + window.location.host + '/api/cafes';

      let response = await fetch(API_CAFES_URL, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      let data = await response.json();

      commit('loadCafes', data);
    },

    async toggleFavorite({ commit, state }, cafeID) {

      let favorites = state.user.favorites;
      if (!favorites || !favorites.length) favorites = [cafeID];
      else {
        let alreadyFavorite = favorites.some(favID => {
          return favID === cafeID.toString()
        });
        if (alreadyFavorite) {
          favorites = favorites.filter(favID => {
            return favID !== cafeID.toString()
          });
        }
        else {
          favorites.push(cafeID);
        }
      }

      // Change in store first for faster UI experience
      commit('updateUserFavorites', favorites);

      const API_USERS_URL = window.location.hostname === 'localhost' ?
        'http://' + window.location.hostname + ':5000/api/users' :
        'https://' + window.location.host + '/api/users';

      let response = await fetch(API_USERS_URL + `/${state.user._id}`, {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ favorites: favorites })
      });
      // if (response.status === 200) console.log("200 All good.");
      let data = await response.json();
    },

    async postComment({ commit, state }, commentData) {

      let comment = {
        userID: commentData.userID,
        content: commentData.content,
        date: commentData.date
      }

      const API_CAFES_URL = window.location.hostname === 'localhost' ?
        'http://' + window.location.hostname + ':5000/api/cafes' :
        'https://' + window.location.host + '/api/cafes';

      let COMMENT_URL = API_CAFES_URL + `/${commentData.cafeID}/comment`;

      let response = await fetch(COMMENT_URL, {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment: comment })
      });
      // if (response.status === 200) console.log("200 All good.");
      let data = await response.json();
      console.log(data);
    }
  }
})
