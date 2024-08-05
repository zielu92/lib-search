import { Module, Commit } from 'vuex';
import { RootState } from '@/types/RootState'
import { Book } from '@/types/Book';
import { CacheState } from '@/types/Cache';

const state: CacheState = {
    cache: {}
  };
  
  const getters = {
    getCachedBooks: (state: CacheState) => (query: string): Book[] | null => {
      return state.cache[query] || null;
    }
  };
  
  const mutations = {
    setCache(state: CacheState, { query, books }: { query: string; books: Book[] }): void {
      state.cache[query] = books;
    }
  };
  
  const actions = {
    cacheBooks({ commit }: { commit: Commit }, { query, books }: { query: string; books: Book[] }): void {
      commit('setCache', { query, books });
    }
  };
  
  export const cache: Module<CacheState, RootState> = {
    state,
    getters,
    mutations,
    actions
  };