<template>
  <div class="compact-cafe"
      :style="cafe.imageUrls && cafe.imageUrls.length ?
              `background-image: linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), url(${assetPath(this.cafe.imageUrls[0])})`
              : 'background-color: var(--colorPalette3)'">
    <section class="header">
      <h3>{{ cafe.name }}</h3>
      <h4>{{ locale(cafe.city) }}</h4>
      <h6>{{ cafe.spot }}</h6>
    </section>
    <section class="rating">
      <StarRating v-bind:rating="cafe.ratings ? cafe.ratings.overall : 0" :star_size="18" />
    </section>
    <section class="locations-container">
      <div class="location" v-for="location in cafe.locations">
        <p>{{ formatStation(location.station) }}</p>
        <h6>{{ formatMinsFromStation(location.minsFromStation) }}</h6>
        <div class="train-lines">
          <TrainLineIcon class="train-line-icon" v-for="line in location.lines" v-bind:line="line" />
          <p>{{ formatTrainLineText(location.lines) }}</p>
        </div>
      </div>
    </section>
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
        type: Object
      },
      index: Number
    },
    methods: {
      assetPath(url) {
        return require('../assets/' + url);
      },
      formatTrainLineText: function(lines) {
        if (!lines || !lines.length) return;
        if (lines.length > 1) return '';

        if (this.$store.state.currentLanguage === 'jp') {
          return `${this.locale(lines[0])}線`;
        }
        else {
          return `${this.locale(lines[0])} Line`;
        }

      },
      formatStation(station) {
        if (!station) return '';

        if (this.$store.state.currentLanguage === 'jp') {
          return `${this.locale(station)}駅`;
        }
        else {
          return `${this.locale(station)} Station`;
        }
      },
      formatMinsFromStation(mins) {
        if (!mins) return '';

        if (this.$store.state.currentLanguage === 'jp') {
          return `歩${mins}分`;
        }
        else {
          return `${mins}m`;
        }
      }

    }
  }
</script>

<style scoped>

  h3 {
    color: #fff;
  }

  h4 {
    color: var(--textColorAccent);
  }

  h6 {
    color: rgba(255,255,255,.75);
  }

  p {
    color: #fff;
    font-size: var(--textSize1);
    font-weight: bold;
    line-height: 2rem;
  }

  .compact-cafe {
    position: relative;
    display: grid;
    grid-template-columns: 40% auto 40%;
    align-items: center;
    width: 100%;
    padding: 2rem 1.5rem;
    margin-bottom: 0.5rem;
    opacity: 1;
    background-size: cover;
    background-position: center;
    overflow: hidden;
  }
  .compact-cafe:hover {
    opacity: 0.8;
    cursor: pointer;
  }

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 1rem;
  }

  .rating {
    justify-self: center;
  }

  .locations-container {
    text-align: right;
  }

  .location {
    margin-bottom: 0.75rem;
  }

  .location h6 {
    display: inline;
    margin-left: 0.5rem;
    color: var(--textColorAccent);
  }

  .location p {
    display: inline;
  }

  .train-lines {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .train-lines p {
    font-weight: 300;
    margin-left: 0.5rem;
  }

  .train-line-icon {
    margin-left: 0.5rem;
  }

  @media screen and (max-width: 580px) {
    .compact-cafe {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.5rem 0.5rem;
    }
    .header, .rating {
      align-items: center;
      margin-bottom: 1.5rem;
    }
    .rating {
      height: 100%;
      justify-content: flex-start;
    }
    .locations-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      margin: 0;
    }
    .locations-container > * {
      margin: 0 1rem;
    }
    .train-lines {
      justify-content: center;
    }
  }

</style>
