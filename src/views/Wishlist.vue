<template>
  <div class="wishlist">
    <h1>Wishlist</h1>
    <router-link to="/" class="bg-primary btn-pr btn-back btn-link">
      &lt; Search
    </router-link>
    <button @click="exportCSV" class="bg-primary btn-pr btn-export">Export to CSV</button>
    <div class="clearfix"></div>
    <books-container v-if="wishlist.length" :books="wishlist" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Book } from '@/types/Book';
import BookCard from '@/components/BookCard.vue';
import BooksContainer from '@/components/BooksContainer.vue';
import { convertToCSV } from '@/helpers/convertCSV'
@Component({
  components: { BookCard, BooksContainer }
})
export default class Wishlist extends Vue {
  get wishlist(): Book[] {
    return this.$store.getters['wishlist/wishlist'];
  };

  exportCSV(): void {
    const csvData = convertToCSV(this.wishlist);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'wishlist.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

}
</script>

<style scoped>
.btn-export {
  padding: 15px
}
</style>