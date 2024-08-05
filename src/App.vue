<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  components: {

  },
})

export default class App extends Vue {}
</script>

<style>
  @import './assets/style.css';
</style>
