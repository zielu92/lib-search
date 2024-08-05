<template>
  <div id="app">
    <router-view/>
    <wishlist-btn></wishlist-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import WishlistBtn from './components/WishlistBtn.vue';


@Component({
  components: {
    WishlistBtn
  },
})

export default class App extends Vue {}
</script>

<style>
  @import './assets/style.css';
</style>
