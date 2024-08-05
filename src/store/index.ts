import Vue from 'vue';
import Vuex from 'vuex';
import { cache } from '@/store/modules/cache';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cache
  }
});
