<template>
  <div v-if="cafe" class="cafe">
    <div class="cafe-header">
      <h2 class="name">{{ cafe.name }}</h2>
      <h4 class="city">{{ cafe.city }}</h4>
    </div>
    <div class="pics">
      <img class="cafe-pic"
      v-for="(imageUrl, index) in cafe.imageUrls"
      :src=formatImageUrl(imageUrl)
      :key="index" />
    </div>
    <div class="information">
      <div class="ratings">
        <h6 class="overall-rating">Overall: {{ cafe.ratings.overall }}</h6>
        <p>Cleanliness: {{ cafe.ratings.cleanliness }}</p>
        <p>Coffee: {{ cafe.ratings.coffee }}</p>
        <p>Food: {{ cafe.ratings.food }}</p>
        <p>Usability: {{ cafe.ratings.usability }}</p>
        <p>Price: {{ cafe.ratings.price }}</p>
      </div>
      <div class="features">
        <p>Wifi: {{ cafe.features.wifi ? "yes" : "no" }}</p>
        <p>Seats: {{ cafe.features.seats }}</p>
        <p>Free Water: {{ cafe.features.water ? "yes" : "no" }}</p>
      </div>
      <div class="location">
        <p>{{ cafe.location.station }} Station</p>
        <p>{{ cafe.location.line }}</p>
        <p>{{ cafe.location.minsFromStation }} min walk</p>
      </div>
    </div>
    <div class="posts">
      <div class="post-header">
        <h6>{{ cafe.posts.date }}</h6>
        <p>Rating this visit: {{ cafe.posts.visitRating }}</p>
      </div>
      <div class="post-order">
        <p>Ordered:</p>
        <h6>{{ cafe.posts.order }}</h6>
      </div>
      <p class="post-content">{{ cafe.posts.textContent }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EditCafe',
    props: {
      cafe: {
        name: '',
        city: '',
        ratings: {
          overall: 0,
          cleanliness: 0,
          coffee: 0,
          food: 0,
          usability: 0,
          price: 0
        },
        features: {
          wifi: false,
          seats: 0,
          water: false
        },
        location: {
          station: '',
          line: '',
          minsFromStation: 0
        },
        posts: {
          date: '',
          visitRating: 0,
          order: '',
          textContent: ''
        },
        imageUrls: ['']
        // last visit
      }
    },
    methods: {
      formatImageUrl(imgUrl) {
        console.log(imgUrl);
        return require('../assets/' + imgUrl);
      }
    }
  }
</script>

<style scoped>

  /* COLORS */
  .city {
    color: #51a26f;
  }
  .ratings p, .post-header p {
    color: #959595;
  }
  .cafe-header, .ratings, .post-order {
    background-color: #e0e0e0;
  }

  /* FONT SIZES */
  h4 {
    font-size: 1.25rem;
  }
  h6 {
    font-size: 1.25rem;
  }
  p {
    font-size: 1rem;
  }
  .cafe-header h2 {
    font-size: 2rem;
  }
  .cafe-header h4 {
    font-size: 1rem;
  }
  .ratings p {
    font-size: 0.85rem;
  }


  .cafe {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: auto;
  }

  .cafe-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0;
  }

  .pics {
    display: flex;
    flex-direction: row;
  }
  .cafe-pic {
    width: 200px;
    height: 200px;
    /* border: 1px solid #c8c8c8; */
    /* margin: 20px 0;
    margin-right: 10px; */
  }
  .cafe-pic:hover {
    opacity: 0.9;
  }

  .information {
    display: flex;
    flex-direction: row;
    margin: 1rem 0;
  }

  .ratings, .features, .location {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 1rem 2rem;
  }

  .posts {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 2rem 1rem;
  }
  .post-header {
    flex: 3;
  }
  .post-order {
    flex: 1 1 1;
    padding: 1rem 2rem;
  }
  .post-content {
    flex: 1 1 100vw;
  }

</style>
