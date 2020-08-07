<template>
  <div class="cafeList">
    <CompactCafeList />
  </div>
</template>

<script>
  import CompactCafeList from '../components/CompactCafeList.vue'

  export default {
    name: 'List',
    components: {
      CompactCafeList
    },
    data() {
      return {

      }
    }
  }
</script>

<style scoped>
  .cafeList {
    max-width: 800px;
    margin: auto;
  }
</style>
