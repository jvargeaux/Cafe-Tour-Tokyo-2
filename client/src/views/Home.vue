<template>
  <div class="home">
    <Blog />
  </div>
</template>

<script>
  import Blog from '../components/Blog.vue'

  export default {
    name: 'Home',
    components: {
      Blog
    }
  }
</script>

<style>

  .home {
    padding-bottom: 120px;
  }

</style>
