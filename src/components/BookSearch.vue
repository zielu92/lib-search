<template>
  <div class="book-search">
    <div class="inline">
      <form @submit.prevent="searchBooks" >
        <input v-model="title" type="text" placeholder="Book title" class="col-12" />
        <input v-model="author" type="text" placeholder="Author name" class="col-12" />
        <input v-model="isbn" type="text" placeholder="ISBN" class="col-12" />
        <button type="submit" class="bg-primary btn-rounded">Search</button>
      </form>
      <router-link to="/wishlist" class="bg-primary btn-wishlist btn-rounded">
      Wishlist
      </router-link>
    </div>
    <span class="loader" v-if="isLoading"></span>
    <div v-if="books.length" class="card-grid">
      <BookCard
        v-for="book in books"
        :key="book.key"
        :book="book"
      />
    </div>
    <span class="scroll-direction" v-if="books.length > 2"></span>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import axios from 'axios';
  import BookCard from '@/components/BookCard.vue';
  import { Book } from '@/types/Book';

  @Component({
    components: { BookCard },
  })
  export default class BookSearch extends Vue {
    title = '';
    author = '';
    isbn = '';
    isLoading = false;
    books: Book[] = [];
    wishlist: Book[] = [];
    error: string | null = null;

    async searchBooks(): Promise<void> {
      this.error = null;
      const query = [];
      this.isLoading = true;
      if (this.title) query.push(`title=${this.title}`);
      if (this.author) query.push(`author=${this.author}`);
      if (this.isbn) query.push(`isbn=${this.isbn}`);
      const queryString = query.join('&');

      // Check if cache
      const cachedBooks = this.$store.getters.getCachedBooks(queryString);
      if (cachedBooks) {
        this.books = cachedBooks;
        this.isLoading = false;
        this.cleanInputs();
        return;
      }

      try {
        const response = await axios.get(`https://openlibrary.org/search.json?${queryString}`);
        this.books = response.data.docs;
        this.isLoading = false;
        this.cleanInputs();
        //Cache
        this.$store.dispatch("cacheBooks",{ query: queryString, books: this.books });
      } catch (err) {
        this.isLoading = false;
        this.error = 'Failed to fetch books. Please try again.';
      }
    }

    cleanInputs(): void {
      this.title = '';
      this.author = '';
      this.isbn = '';
    }

    addToWishlist(book: Book): void {
      if (!this.wishlist.find(b => b.key === book.key)) {
        this.wishlist.push(book);
        alert('Book added to wishlist!');
      }
    }
  }
</script>  
<style scoped>
  .book-search {
    margin: auto;
    max-width: 1000px;
  }

  .inline {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .inline form {
    display: flex;
    gap: 5px;
    width: 70%;
    transition: width 0.3s ease;
  }

  .inline form:hover {
    width: 100%;
  }

  .inline form:hover + .btn-wishlist {
    display: none;
    transition: width 0.3s ease-out;
  }

  .book-search input {
    padding: 15px;
  }

  .book-search button {
    padding: 10px;
    width: 80%;
  }

  .btn-wishlist {
    padding: 17px 10px 10px 10px;
    text-decoration: none;
  }

  .book-search .book-card {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  @media only screen and (max-width: 768px) {
    .inline {
      display: block;
    }
    .inline form {
      width: 100%;
    }
    
    .btn-wishlist, .book-search button {
      margin-bottom: 10px;
      display: block !important;
      width: 100%; 
    }
    
    .book-search form {
      display: block;
      margin-top: 20px;
    }
    
    .book-search input {
      width: 90%;
      margin-bottom: 10px;
    }
  }
</style>  