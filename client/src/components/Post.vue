<template>
  <article>
    <div class="post-header">
      <h3>{{post.title}}</h3>
      <h5>{{post.location}}</h5>
    </div>
    <h6>{{post.date}}</h6>
    <p>{{post.content}}</p>
  </article>
</template>

<script>
  export default {
    name: 'Post',
    props: {
      post: {
        title: String,
        location: String,
        date: String,
        content: String
      }
    }
  }
</script>

<style scoped>

  article {
    display: flex;
    flex-direction: column;
    padding-bottom: 3rem;
  }

  .post-header {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    padding-bottom: 1.5rem;
  }

  p {
    color: var(--textColorNeutral3);
  }

</style>
