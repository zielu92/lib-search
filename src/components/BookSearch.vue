<template>
  <div class="book-search">
    <div class="inline">
      <form @submit.prevent="searchBooks">
        <input v-model="title" :class="{ invalid: !isTitleValid && !checkInputs }" type="text" placeholder="Book title" />
        <input v-model="author" :class="{ invalid: !isAuthorValid && !checkInputs }" type="text" placeholder="Author name" />
        <input v-model="isbn" :class="{ invalid: !isIsbnValid && !checkInputs }" type="text" placeholder="ISBN" />
        <button type="submit" class="bg-primary btn-pr br">Search</button>
      </form>
      <router-link to="/wishlist" class="bg-primary btn-pr btn-wishlist btn-link br">
        Wishlist
      </router-link>
    </div>
    <info-alert title="No Results Found" v-if="isEmpty">
      Sorry, we couldn't find any books matching your search. Please try using different keywords or check your spelling.
    </info-alert>
    <info-alert title="Error" type="error" v-if="error">
      Failed to fetch books. Please try again.
    </info-alert>
    <span class="loader" v-if="isLoading"></span>
    <books-container v-if="books.length" :books="books"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import axios from 'axios';
import BookCard from '@/components/BookCard.vue';
import { Book } from '@/types/Book';
import InfoAlert from './InfoAlert.vue';
import BookDetails from '@/views/Details.vue';
import { Validatable } from '@/types/Validatable';
import { validate } from '@/helpers/validator';
import BooksContainer from '@/components/BooksContainer.vue';

@Component({
  components: { BookCard, InfoAlert, BookDetails, BooksContainer },
})
export default class BookSearch extends Vue {
  title: string = '';
  author: string = '';
  isbn: string = '';
  isLoading: boolean = false;
  isEmpty: boolean = false;
  books: Book[] = [];
  wishlist: Book[] = [];
  error: boolean = false;

  isTitleValid: boolean = true;
  isAuthorValid: boolean = true;
  isIsbnValid: boolean = true;

  async searchBooks(): Promise<void> { 
    // Set up for validation
    const titleValidatable: Validatable = {
      value: this.title,
      minLength: 2
    };
    const authorValidatable: Validatable = {
      value: this.author,
      minLength: 2
    };
    const isbnValidatable: Validatable = {
      value: this.isbn,
      minLength: 8,
      maxLength: 13
    };
    
    // Validate
    this.isTitleValid = validate(titleValidatable);
    this.isAuthorValid = validate(authorValidatable);
    this.isIsbnValid = validate(isbnValidatable);

    this.isEmpty = false;
    this.error = false;
    const query = [];

    // Create a query
    if (this.isTitleValid) query.push(`title=${this.title}`);
    if (this.isAuthorValid) query.push(`author=${this.author}`);
    if (this.isIsbnValid) query.push(`isbn=${this.isbn}`);
    
    if(query.length > 0) {
      this.isLoading = true;
      const queryString = query.join('&');

      // Emit event to clear show in BooksContainer
      this.$root.$emit('clear-show');

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
        if(this.books.length === 0) {
          this.isEmpty = true;
        }
        this.isLoading = false;
        this.cleanInputs();
        // Cache
        this.$store.dispatch("cacheBooks", { query: queryString, books: this.books });
      } catch (err) {
        this.isLoading = false;
        this.error = true;
      }
    }
  }

  checkInputs(): boolean {
    return this.isbn.trim().length !== 0 && this.author.trim().length !== 0 && this.title.trim().length !== 0;
  }

  cleanInputs(): void {
    this.title = '';
    this.author = '';
    this.isbn = '';
    this.isTitleValid = true;
    this.isAuthorValid = true;
    this.isIsbnValid = true;
  }
}
</script>

<style scoped>

.invalid {
  border-color: red;
}

.inline {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.inline form {
  display: flex;
  gap: 5px;
  width: 90%;
  transition: width 0.3s ease;
}

.inline form:hover {
  width: 100%;
}

.inline form:hover + .btn-wishlist {
  display: none;
  transition: width 0.3s ease-in-out;
}

.book-search input {
  padding: 15px;
  width: 100%;
}

.book-search button {
  padding: 10px;
  width: 80%;
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
    padding: 17px 0 10px 0;
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
