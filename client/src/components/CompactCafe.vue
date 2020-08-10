<template>
  <div class="compact-cafe"
      :style="this.coverImage ? `background-image: linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), url(${coverImageAssetPath})`
              : 'background-color: var(--colorPalette3)'">
    <div class="header">
      <h3>{{ cafe.name }}</h3>
      <h6>{{ cafe.city }}</h6>
    </div>
    <div class="rating">
      <StarRating v-bind:rating="cafe.ratings.overall" :star_size="18" />
    </div>
    <div class="location">
      <p>{{ formatStationAndWalkTime }}</p>
      <div class="train-line-container">
        <TrainLineIcon class="train-line-icon" v-bind:line="cafe.location.line" />
        <p>{{ formatTrainLineText(cafe.location.line) }}</p>
      </div>
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
      coverImage: String,
      cafe: {
        name: String,
        city: String,
        ratings: {
          overall: Number
        },
        location : {
          station: String,
          line: String
        },
        imageUrls: Array,
        visits: {
          date: String
        }
      },
      index: Number
    },
    computed: {
      coverImageAssetPath() {
        return require('../assets/' + this.coverImage);
      },
      formatStationAndWalkTime() {
        let output = '';
        if (this.cafe.location.minsFromStation) output += `${this.cafe.location.minsFromStation}m`;
        if (this.cafe.location.minsFromStation && this.cafe.location.station) output += ' from ';
        if (this.cafe.location.station) output += `${this.cafe.location.station} Station`;
        return output;
      }
    },
    methods: {
      formatTrainLineText: function(trainLineID) {
        if (!trainLineID) return;

        let lineName = trainLineID.split('_')[1];
        if (!lineName) return;

        let firstLetter = lineName[0];
        let returnString = '';
        if (trainLineID.includes('seibu_')) {
          returnString += 'Seibu ';
        }
        returnString += `${lineName.replace(firstLetter, firstLetter.toUpperCase())} Line`;

        return returnString;
      }
    }
  }
</script>

<style scoped>

  h3 {
    color: #fff;
  }
  h6 {
    color: var(--colorTextAccent1);
  }
  p {
    color: #fff;
    font-size: var(--textSize1);
    font-weight: bold;
    line-height: 2rem;
  }

  .compact-cafe {
    display: grid;
    grid-template-columns: 40% 25% 35%;
    text-align: left;
    align-items: center;
    padding: 2rem 1.5rem;
    margin: 0.25rem 0;
    opacity: 1;
    background-size: cover;
    background-position: center;
    overflow: hidden;
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
  .train-line-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .train-line-icon {
    margin-right: 0.75rem;
  }

</style>
