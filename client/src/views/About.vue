<template>
  <div class="about">
    <h1>What is this place?</h1>
    <p>Cafe Tour Tokyo is for people with particular tastes in coffee, public working spaces, or places to relax and enjoy a meal.<br><br>We aim to be a place where the data has been gathered for you. You can get a bird's eye view of the cafe scene in Tokyo, exploring all the many kinds of environments and beverages these cafes have to offer, and building up your own list of hand-picked favorites to come back to.</p>
  </div>
</template>

<script>
  export default {
    name: 'About'
  }
</script>

<style scoped>
  .about {
    padding: 5vh 10vw;
    padding-bottom: 12vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  p {
    line-height: 1.5em;
  }
</style>
