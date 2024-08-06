<template>
    <div v-if="book">
      <button @click="back" class="bg-primary btn-pr btn-back">&lt; Back</button>
      <div class="clearfix"></div>
      <div class="book-container">
        <div class="book-cover">
            <img :src="coverImageUrl" alt="Book Cover"/>
        </div>
        <div class="book-details">
            <h1>{{ book.title }}</h1>
            <p v-if="book.author_name">Author: {{ book.author_name.join(', ') }}</p>
            <p v-if="book.author_alternative_name && book.author_alternative_name.length">
                Alternative Names: {{ book.author_alternative_name.join(', ') }}</p>
            <p v-if="book.first_publish_year">First Published: {{ book.first_publish_year }}</p>
            <p v-if="book.isbn && book.isbn.length">ISBN: {{ book.isbn.join(', ') }}</p>
        </div>
        </div>
    </div>
</template>
  
  <script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Prop } from 'vue-property-decorator';
    import { Book } from '@/types/Book';
    import { coverURL } from '@/helpers/helper';

    @Component
    export default class BookDetails extends Vue { 
        @Prop() book!: Book;
        get coverImageUrl(): string {
            return coverURL(this.book.cover_i, this.book.title);
        }
        back() {
            this.$emit('show-details', null);
        }
    }
  </script>
  
  <style scoped>
  .book-container {
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin-top: 70px;
  }
  
  .book-cover img {
    max-width: 200px;
    max-height: 300px;
  }
  
  .book-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  @media (max-width: 768px) {
    .book-container {
      flex-direction: column;
      align-items: center;
    }
  
    .book-cover img {
      margin-bottom: 20px;
    }
  }
  </style>
  