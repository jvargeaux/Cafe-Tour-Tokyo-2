<template>
  <div class="cafe">
    <div class="cafe-header" v-on:click.capture="$emit('toggle-expand', index)">
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
        <h5 class="overall-rating">Overall: {{ cafe.ratings.overall }}</h5>
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
        <p>{{ formatTrainLineText(cafe.location.line) }} Line</p>
        <p>{{ cafe.location.minsFromStation }} min walk</p>
      </div>
    </div>
    <div class="visits">
      <div class="visit-item"
      v-for="(visit, index) in cafe.visits"
      :key="index">
        <div class="visit-header">
          <h5>{{ visit.date }}</h5>
          <p>Rating this visit: {{ visit.rating }}</p>
        </div>
        <div class="visit-order">
          <p>Ordered:</p>
          <h5>{{ visit.order }}</h5>
        </div>
        <p class="visit-content">{{ visit.textContent }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Cafe',
    props: {
      index: Number,
      cafe: {
        name: String,
        city: String,
        ratings: {
          overall: Number,
          cleanliness: Number,
          coffee: Number,
          food: Number,
          usability: Number,
          price: Number
        },
        features: {
          wifi: Boolean,
          seats: Number,
          water: Boolean
        },
        location: {
          station: String,
          line: String,
          minsFromStation: Number
        },
        posts: {
          date: String,
          visitRating: Number,
          order: String,
          textContent: String
        },
        imageUrls: Array
      }
    },
    methods: {
      formatImageUrl(imgUrl) {
        return require('../assets/' + imgUrl);
      },
      formatTrainLineText: function(trainLineID) {
        if (!trainLineID) return;

        let lineName = trainLineID.split('_')[1];
        if (!lineName) return;

        let firstLetter = lineName[0];
        let returnString = '';
        if (trainLineID.includes('seibu_')) {
          returnString += 'Seibu ';
        }
        returnString += lineName.replace(firstLetter, firstLetter.toUpperCase());

        return returnString;
      }
    }
  }
</script>

<style scoped>

  .ratings p, .post-header p {
    color: var(--colorTextNeutral1);
  }
  .cafe-header, .ratings, .post-order {
    background-color: var(--colorNeutralLight);
  }

  .ratings p {
    font-size: var(--textSize1);
  }

  .cafe {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 0.25rem 0;
  }

  .cafe-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0;
    opacity: 1;
  }
  .cafe-header:hover {
    cursor: pointer;
    opacity: 0.8;
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

  .visits {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 2rem 1rem;
  }
  .visit-header {
    flex: 3;
  }
  .visit-order {
    flex: 1 1 1;
    padding: 1rem 2rem;
  }
  .visit-content {
    flex: 1 1 100vw;
  }

</style>
