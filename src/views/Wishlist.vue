<template>
    <div class="wishlist">
      <h1>Wishlist</h1>
      <router-link to="/" class="bg-primary btn-pr btn-back btn-link br">
        &lt; Back
      </router-link>
      <button  class="bg-primary btn-pr btn-back">Export to CSV</button>
      <div class="clearfix"></div>
      <books-container v-if="wishlist.length" :books="wishlist"/>
    </div>
  </template>
  
  <script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Book } from '@/types/Book';
  import BookCard from '@/components/BookCard.vue';
  import BooksContainer from '@/components/BooksContainer.vue';
  @Component({
    components: { BookCard, BooksContainer }
  })
  export default class Wishlist extends Vue {
    get wishlist(): Book[] {
      return this.$store.getters['wishlist/wishlist'];
    }

    export(): void {
        console.log("ok");
    }

  }
  </script>
  
  <style scoped>
  .card-grid {
    margin-top: 70px;
  }
  .wishlist {
    padding: 20px;
  }
  </style>
  