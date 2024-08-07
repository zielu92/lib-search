<template>
  <div v-if="book">
    <button @click="back" class="bg-primary btn-pr btn-back">&lt; Back</button>

    <div class="clearfix"></div>
    <div class="book-container blue-container">
      <div class="book-cover">
        <img :src="coverImageUrl" alt="Book Cover" />
      </div>
      <div class="book-details">
        <h1>{{ book.title }}</h1>
        <div class="tj">
          <p v-if="book.author_name">Author: {{ book.author_name.join(', ') }}</p>
          <p v-if="book.author_alternative_name && book.author_alternative_name.length">
            Author alternative names: {{ book.author_alternative_name.join(', ') }}</p>
          <p v-if="book.first_publish_year">First Published: {{ book.first_publish_year }}</p>
          <p v-if="book.isbn && book.isbn.length">ISBN: {{ book.isbn.join(', ') }}</p>
        </div>
      </div>
    </div>
    <chat v-if="isChatEnabled()" :book="book"></chat>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Book } from '@/types/Book';
import { coverURL } from '@/helpers/helper';
import Chat from '@/components/Chat.vue';
@Component({
  components: { Chat },
})
export default class BookDetails extends Vue {
  @Prop() book!: Book;
  get coverImageUrl(): string {
    return coverURL(this.book.cover_i, this.book.title);
  }
  isChatEnabled(): boolean {
    return process.env.VUE_APP_ENABLE_CHAT || false;
  }
  back() {
    this.$emit('show-details', null);
  }
}
</script>

<style scoped>
.tj {
  text-align: justify;
}

.book-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.book-cover img {
  border-radius: 20px;
  max-width: 200px;
  max-height: 300px;
  padding: 10px;
}

.book-details {
  padding: 20px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .book-container {
    flex-direction: column;
    align-items: center;
  }

}
</style>