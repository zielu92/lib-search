<template>
    <div class="card" @click="toggleInfo">
      <img :src="coverUrl()" :alt="book.title" class="card-image">
      <div class="card-info" :class="{ show: showInfo }">
        <div class="card-info-content">
          <p class="title">{{ getTitle() }}</p>
          <div v-if="book.author_name" class="author">
            <p class="more-info" v-for="(author, index) in book.author_name" :key="index">{{ author }}</p>
          </div>
          <p class="more-info">Year: {{ book.first_publish_year }}</p>
          <button @click="showDetails">Details</button>
          <button @click="addToWishlist" class="toWishList">♥</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import { Book } from '@/types/Book';
  
  @Component
  export default class BookCard extends Vue {
    @Prop() book!: Book;
  
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
      return this.book.title.length>=60 
      ? this.book.title.substring(0,60)+"..." 
      : this.book.title;
    }

    addToWishlist(): void {
      this.$emit('add-to-wishlist', this.book);
    }
  
    showDetails(): void {
      alert(`Details:
        Title: ${this.book.title}
        Author: ${this.book.author_name}
        Year: ${this.book.first_publish_year}`);
    }
     
    coverUrl(): string {
      return this.book.cover_i
        ? `https://covers.openlibrary.org/b/id/${this.book.cover_i}-M.jpg`
        : `https://placehold.co/350?text=${this.getTitle()}`;
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
  background-color: rgba(0, 0, 0, 0.8);
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
}

.card-info .more-info, .card-info button {
  display: none;
  transition: opacity .3s ease-out;
}

.author > .more-info {
  margin:0;
}

.card:hover .card-info .more-info,
.card:hover .card-info button,
.card-info.show .more-info,
.card-info.show button {
  display: block;
}

.card-info button {
  margin: 10px 5px;
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.card-info button:hover {
  background-color: #0056b3;
}

.toWishList{
  float: right;
  position: absolute;
  right: 0;
  bottom: 0;
}
  </style>
  