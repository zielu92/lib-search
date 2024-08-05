<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <book-search></book-search>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BookSearch from '@/components/BookSearch.vue';

@Component({
  components: {
    BookSearch, 
  },
})
export default class Home extends Vue {}
</script>
