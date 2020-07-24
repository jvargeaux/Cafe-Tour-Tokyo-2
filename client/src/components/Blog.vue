<template>
  <div class="blog">
    <p id="output"></p>
    <h1>Blog</h1>
    <div class="postContainer"
    v-for="(post, index) in this.$store.state.posts"
    :key="index">
      <Post v-bind:post="post" />
    </div>
  </div>
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
  .blog {
    padding: 5vh 8vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .postContainer {
    max-width: 1000px;
  }
</style>
