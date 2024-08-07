<template>
  <div class="BooksContainer">
    <div v-if="!show" class="card-grid">
      <BookCard v-for="book in books" :key="book.key" :book="book" @show-details="showDetails" />
    </div>
    <book-details v-else :book="show" @show-details="showDetails" />
    <span class="scroll-direction" v-if="books.length > 2 && !show"></span>
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
  savedScrollPosition: number = 0;
  show: Book | null = null;

  showDetails(book: Book): void {
    if (!this.show) {
      this.savedScrollPosition = window.scrollY;
      window.scrollTo(0, 0);
    } else {
      this.$nextTick(() => {
        window.scrollTo(0, this.savedScrollPosition);
      });
    }
    this.show = book;
    this.$emit('show', this.show);
  }

  mounted() {
    this.$on('clear-show', this.clearShow);
  }

  clearShow(): void {
    this.show = null;
    this.$nextTick(() => {
      window.scrollTo(0, this.savedScrollPosition);
    });
  }
}
</script>

<style scoped>
.BooksContainer {
  margin-top: 20px;
}

.wishlist {
  padding: 20px;
}
</style>