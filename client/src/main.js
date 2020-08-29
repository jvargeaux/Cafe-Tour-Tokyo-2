import Vue from 'vue'
import { store } from './store/store'
import App from './App.vue'
import router from './router'
import { locale } from './locale';

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.prototype.$locale = locale;

Vue.mixin({
  methods: {
    locale: function(string) {
      let localeString = this.$locale[string];
      if (!localeString) {
        console.log('(Locale Error: Not Found)', string);
        return string;
      }

      let returnString = localeString[this.$store.getters.language];
      if (!localeString) {
        console.log('(Locale Error: Missing Language)', string);
        return string;
      }
      else return returnString;
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
