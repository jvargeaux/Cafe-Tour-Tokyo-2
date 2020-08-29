<template>
  <section>
    <h1>Articles</h1>
    <Post v-for="(post, index) in this.$store.state.posts"
      v-bind:post="post"
      :key="index" />
  </section>
</template>

<script>
  import Post from './Post.vue';

  export default {
    name: 'Blog',
    components: {
      Post
    }
  }
</script>

<style scoped>

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 900px;
  }

</style>
