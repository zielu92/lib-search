import { Module } from 'vuex';
import CryptoJS from 'crypto-js';
import { Book } from '@/types/Book';
import { RootState } from '@/types/RootState'
import { WishlistState } from '@/types/WishlistState'

const ENCRYPTION_KEY = process.env.KEY_HASH || 'default';

const encryptData = (data: any): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
};

const decryptData = (data: string): any => {
  const bytes = CryptoJS.AES.decrypt(data, ENCRYPTION_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const loadWishlistFromStorage = (): Book[] => {
  const encryptedData = localStorage.getItem('wishlist');
  if (encryptedData) {
    try {
      return decryptData(encryptedData);
    } catch (error) {
      console.error('Failed to decrypt wishlist data:', error);
    }
  }
  return [];
};

const saveWishlistToStorage = (wishlist: Book[]) => {
  const encryptedData = encryptData(wishlist);
  localStorage.setItem('wishlist', encryptedData);
};

const wishlist: Module<WishlistState, RootState> = {
  namespaced: true,
  state: {
    wishlist: loadWishlistFromStorage(),
  },
  mutations: {
    TOGGLE_WISHLIST_ITEM(state, book: Book) {
        //check if key exists
      const index = state.wishlist.findIndex((item) => item.key === book.key);
        //if not then push item
      if (index === -1) {
        state.wishlist.push(book);
        //if exists then remove from list
      } else {
        state.wishlist.splice(index, 1);
      }
      saveWishlistToStorage(state.wishlist);
    },
  },
  actions: {
    toggleWishlistItem({ commit }, book: Book) {
      commit('TOGGLE_WISHLIST_ITEM', book);
    },
  },
  getters: {
    wishlist: (state) => state.wishlist,
    isInWishlist: (state) => (key: string) => {
      return state.wishlist.some((item) => item.key === key);
    },
  },
};

export default wishlist;
