<template>
    <div class="wishlist">
      <h1>Wishlist</h1>
      <div v-if="wishlist.length"
      class="card-grid">
        <BookCard
          v-for="book in wishlist"
          :key="book.key"
          :book="book"
        />
      </div>
      <span class="scroll-direction" v-if="wishlist.length > 2"></span>
    </div>
  </template>
  
  <script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Book } from '@/types/Book';
import BookCard from '@/components/BookCard.vue';

  @Component({
    components: { BookCard }
  })
  export default class Wishlist extends Vue {

    get wishlist(): Book[] {
      return this.$store.getters['wishlist/wishlist'];
    }

  }
  </script>
  
  <style scoped>
  .wishlist {
    padding: 20px;
  }
  </style>
  