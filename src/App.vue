<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <router-view />
    <div class="footer"><a href="https://github.com/zielu92/lib-search.git">github</a> <a
        href="https://mzielinski.pl">mzielinski.pl</a></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
@Component
export default class App extends Vue { }
</script>

<style>
@import './assets/style.css';
</style>
