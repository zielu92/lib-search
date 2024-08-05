import Vue from 'vue';
import Vuex from 'vuex';
import { cache } from '@/store/modules/cache';
import wishlist from '@/store/modules/wishlist';
import { RootState } from '@/types/RootState'
Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  modules: {
    wishlist,
    cache,
  },
});
