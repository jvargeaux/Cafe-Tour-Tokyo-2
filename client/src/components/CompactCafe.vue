<template>
  <div class="compact-cafe">
    <div class="header">
      <h3>{{ cafe.name }}</h3>
      <h6>{{ cafe.city }}</h6>
    </div>
    <div class="rating">
      <p>Rating: {{ cafe.ratings.overall }}</p>
      <StarRating v-bind:rating="cafe.ratings.overall" :star_size="18" />
      <p>{{ cafe.posts.date }}</p>
    </div>
    <div class="location">
      <p>{{ cafe.location.station }} Station</p>
      <p>{{ cafe.location.line }}</p>
      <TrainLineIcon v-bind:line="cafe.location.line" />
    </div>
  </div>
</template>

<script>
  import StarRating from './StarRating.vue';
  import TrainLineIcon from './TrainLineIcon.vue';

  export default {
    name: 'CompactCafe',
    components: {
      StarRating,
      TrainLineIcon
    },
    props: {
      cafe: {
        name: String,
        city: String,
        ratings: {
          overall: 0
        },
        location : {
          station: String,
          line: String
        },
        posts: {
          date: String
        }
      },
      index: Number
    },
    data() {
      return {

      }
    }
  }
</script>

<style scoped>

  p { font-size: var(--textSize1);}

  .compact-cafe {
    display: flex;
    flex-direction: row;
    padding: 2rem 1.5rem;
    margin: 0.25rem 0;
    background-color: var(--bgNeutralLight);
    opacity: 1;
  }
  .compact-cafe:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  .header, .rating, .location {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 1rem;
  }
  .header {
    flex: 1;
  }
  .rating, .location {
    flex: 1;
  }
</style>
