<template>
  <div class="card" @click="toggleInfo">
    <img v-lazy="coverImageUrl" :alt="book.title" class="card-image">
    <div class="card-info" :class="{ show: showInfo }">
      <div class="card-info-content">
        <p class="title"><strong>{{ getTitle() }}</strong></p>
        <div v-if="book.author_name" class="author">
          <span class="more-info">{{ book.author_name[0] }}</span>
        </div>
        <span class="more-info" v-if="book.first_publish_year">
          <strong>Year:</strong> {{ book.first_publish_year }}
        </span>
        <span class="more-info" v-if="book.isbn">
          <strong>ISBM:</strong> {{ book.isbn[0] }}
        </span>
        <button @click="showDetails" class="bg-primary btn-pr">Details</button>
        <button @click.stop="addToWishlist" :class="{ 'isAdded': isInWishlist }" class="toWishList br">♥</button>
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
export default class BookCard extends Vue {
  @Prop() book!: Book;
  loading = true;
  showInfo = false;

  toggleInfo(): void {
    this.showInfo = !this.showInfo;
  }

  hideInfo(): void {
    if (this.showInfo) {
      this.showInfo = false;
    }
  }

  getTitle(): string {
    return this.book.title.length >= 60
      ? this.book.title.substring(0, 60) + "..."
      : this.book.title;
  }

  addToWishlist(): void {
    this.$store.dispatch('wishlist/toggleWishlistItem', this.book);
  }

  get isInWishlist(): boolean {
    return this.$store.getters['wishlist/isInWishlist'](this.book.key);
  }

  showDetails(): any {
    this.$emit('show-details', this.book);
  }

  get coverImageUrl(): string {
    return coverURL(this.book.cover_i, this.getTitle());
  }

}
</script>

<style scoped>
.card {
  flex: 1 0 32%;
  margin: 5px;
  max-height: 450px;
  min-height: 250px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  cursor: pointer;
}

.card:hover {
  transform: scale(1.05);
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(180deg,
      hsla(0, 0%, 0%, 0) 0%,
      hsla(0, 0%, 0%, 0.2) 10%,
      hsl(0, 0%, 0%) 100%);
  color: white;
  box-sizing: border-box;
  text-align: center;
  transition: height 0.3s ease-in-out;
  height: 30%;
}

.card:hover .card-info,
.card-info.show {
  height: 100%;
}

.card-info-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.card-info .title {
  margin: 10px 0;
  position: relative;
}

.card-info .more-info,
.card-info button,
.card-info a {
  display: none;
  transition: opacity .6s ease-out;
}

.more-info {
  margin-bottom: 10px;
}

.card:hover .card-info .more-info,
.card:hover .card-info button,
.card-info.show .more-info,
.card-info.show button {
  display: block;
}

.toWishList {
  float: right;
  position: absolute;
  right: 5px;
  top: 5px;
  padding: 6px;
  background-color: #64afd0;
  color: #fff;
  border: none;
}

.isAdded {
  color: #ea2b2b;
}
</style>