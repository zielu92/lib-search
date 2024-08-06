<template>
    <div class="BooksContainer">
      <div v-if="!show" class="card-grid">
        <BookCard
          v-for="book in books"
          :key="book.key"
          :book="book"
          @show-details="showDetails"
        />
      </div>
      <book-details v-else :book="show" @show-details="showDetails"/>
      <span class="scroll-direction" v-if="books.length > 2"></span>
    </div>
  </template>
  
  <script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Book } from '@/types/Book';
  import { Prop } from 'vue-property-decorator';
  import BookDetails from '@/views/Details.vue';
  import BookCard from './BookCard.vue';
  
  @Component({
    components: { BookCard, BookDetails }
  })
  export default class BooksContainer extends Vue {
    @Prop() books!: Book[];
  
    show: Book | null = null;
  
    showDetails(book: Book): void {
      this.show = book;
    }
  
    mounted() {
      this.$on('clear-show', this.clearShow);
    }
  
    clearShow(): void {
      this.show = null;
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
  