<template>
  <div class="header">
    <div class="icon"></div>
    <h1 class="text">Chicken Music</h1>
    <router-link tag='div' class="mine" to='/user'>
        <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MHeader extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>