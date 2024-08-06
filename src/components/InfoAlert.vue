<template>
    <div :class="['alert', 'br', type]">
        <h3>{{ title }}</h3>
        <slot class="alert-slot"></slot>
    </div>
</template>
  
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class InfoAlert extends Vue {
    @Prop({ default: 'info' }) private type!: 'info' | 'error';
    @Prop() private title!: string;
}
</script>

<style scoped>
    .alert {
        color: #292929;
        padding: 20px;
        text-align: left;
        margin-bottom: 10px;
    }

    h3 {
        margin-top: 0;
    }

    .info {
        background-color: rgb(136, 212, 232);
    }

    .error {
        background-color: rgb(232, 136, 136);
    }
</style>
