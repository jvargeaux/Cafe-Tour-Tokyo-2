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
      if (!localeString) return '(Locale Error: Not Found)';

      let returnString = localeString[this.$store.getters.language];
      if (!returnString) return '(Locale Error: Missing Language)';
      else return returnString;
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
