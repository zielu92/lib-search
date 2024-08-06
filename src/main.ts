import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import VueLazyload from 'vue-lazyload';

Vue.use(VueLazyload,  {
  preLoad: 2.1,
  error: 'https://placehold.co/350x500?text=Cannot load',
  loading: 'https://placehold.co/350x500?text=Loading...',
  attempt: 3
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')