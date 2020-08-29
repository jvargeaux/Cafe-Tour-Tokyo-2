<template>
  <div class="cafe">
    <header class="cafe-header" :style="cafe.imageUrls && cafe.imageUrls.length ? `background-image: linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), url(${assetPath(cafe.imageUrls[0])})`
            : 'background-color: var(--colorPalette3)'"
        v-on:click.capture="$emit('toggle-expand', index)">
      <h2>{{ cafe.name }}</h2>
      <h4>{{ locale(cafe.city) }}</h4>
      <h6>{{ cafe.spot }}</h6>
    </header>
    <ImagePopup v-if="selectedImage !== null"
      :imageUrl="formatImageUrl(cafe.imageUrls[selectedImage])"
      v-on:close-image="closeImage"
      v-on:previous-image="previousImage"
      v-on:next-image="nextImage" />
    <div class="cafe-content">
      <section class="pics-spacer"></section>
      <section class="pics">
        <img class="cafe-pic"
        v-for="(imageUrl, index) in cafe.imageUrls"
        :src=formatImageUrl(imageUrl)
        :key="index"
        @click="enlargeImage(index)" />
      </section>
      <section class="cafe-information-container">
        <p class="description">{{ cafe.description }}</p>
        <div class="information">
          <div class="ratings">
            <span>
              <h5>{{ locale('overall') }}:</h5>
              <StarRating v-if="cafe.ratings.overall" class="stars" v-bind:rating="cafe.ratings.overall" :star_size="20" />
              <h5>{{ cafe.ratings.overall ? cafe.ratings.overall : '-' }}</h5>
            </span>
            <span>
              <p>{{ locale('cleanliness') }}:</p>
              <StarRating v-if="cafe.ratings.cleanliness" class="stars" v-bind:rating="cafe.ratings.cleanliness" :star_size="14" />
              <p>{{ cafe.ratings.cleanliness ? cafe.ratings.cleanliness : '-' }}</p>
            </span>
            <span>
              <p>{{ locale('coffee') }}:</p>
              <StarRating v-if="cafe.ratings.coffee" class="stars" v-bind:rating="cafe.ratings.coffee" :star_size="14" />
              <p>{{ cafe.ratings.coffee ? cafe.ratings.coffee : '-' }}</p>
            </span>
            <span>
              <p>{{ locale('food') }}:</p>
              <StarRating v-if="cafe.ratings.food" class="stars" v-bind:rating="cafe.ratings.food" :star_size="14" />
              <p>{{ cafe.ratings.food ? cafe.ratings.food : '-' }}</p>
            </span>
            <span>
              <p>{{ locale('usability') }}:</p>
              <StarRating v-if="cafe.ratings.usability" class="stars" v-bind:rating="cafe.ratings.usability" :star_size="14" />
              <p>{{ cafe.ratings.usability ? cafe.ratings.usability : '-' }}</p>
            </span>
            <span>
              <p>{{ locale('value') }}:</p>
              <StarRating v-if="cafe.ratings.price" class="stars" v-bind:rating="cafe.ratings.price" :star_size="14" />
              <p>{{ cafe.ratings.price ? cafe.ratings.price : '-' }}</p>
            </span>
          </div>
          <div class="features">
            <p v-if="cafe.features.seats">{{ `${locale('seats')}: ~${cafe.features.seats}` }}</p>
            <p v-if="cafe.features.outlets">{{ `${locale('outlets')}: ~${cafe.features.outlets}` }}</p>
            <span>{{ locale('free wifi') }}:
              <i v-if="cafe.features.wifi" class="fas fa-check-circle fa-lg"></i>
              <i v-else class="fas fa-times-circle fa-lg"></i>
            </span>
            <span>{{ locale('free water') }}:
              <i v-if="cafe.features.water" class="fas fa-check-circle fa-lg"></i>
              <i v-else class="fas fa-times-circle fa-lg"></i>
            </span>
          </div>
          <div class="location">
            <article v-for="location in cafe.locations">
              <h6 v-if="location.station">{{ formatStation(location.station) }}</h6>
              <p v-if="location.minsFromStation">{{ formatMinsFromStation(location.minsFromStation) }}</p>
              <div class="train-line-icons">
                <TrainLineIcon class="train-line-icon" v-for="line in location.lines" v-bind:line="line" />
                <p v-if="location.lines">{{ formatTrainLineText(location.lines) }}</p>
              </div>
            </article>
          </div>
        </div>
        <div class="visits">
          <div class="visit-item"
          v-for="(visit, index) in cafe.visits"
          :key="index">
          <div class="visit-header">
            <h6>{{ formatDate(visit.date) }}</h6>
            <section>
              <StarRating v-if="visit.rating" class="stars" v-bind:rating="visit.rating" :star_size="14" />
              <p class="overall-rating">{{ visit.rating ? visit.rating : '-' }}</p>
            </section>
          </div>
          <div class="visit-order">
            <p>{{ locale('ordered') }}:</p>
            <h6>{{ visit.order }}</h6>
          </div>
          <p class="visit-content">{{ visit.textContent }}</p>
        </div>
      </div>
    </section>
    </div>
  </div>
</template>

<script>
  import StarRating from './StarRating.vue';
  import TrainLineIcon from './TrainLineIcon.vue';
  import ImagePopup from './ImagePopup.vue';

  export default {
    name: 'Cafe',
    components: {
      StarRating,
      TrainLineIcon,
      ImagePopup
    },
    props: {
      index: Number,
      cafe: {
        type: Object
      }
    },
    data() {
      return {
        selectedImage: null
      }
    },
    methods: {
      assetPath(url) {
        return require('../assets/' + url);
      },
      formatImageUrl(imgUrl) {
        return require('../assets/' + imgUrl);
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
          return `${mins} minute walk`;
        }
      },
      formatDate(dateString) {
        if (!dateString) return '-';

        let date = new Date(dateString);

        if (this.$store.state.currentLanguage == 'jp') {
          return date.toLocaleString('ja-JP', {
            dateStyle: 'full'
          });
        }
        else {
          return date.toLocaleString('en-US', {
            weekday: 'long',
            month: 'long',
            day: '2-digit',
            year: 'numeric'
          });
        }
      },
      enlargeImage(index) {
        this.selectedImage = index;
      },
      previousImage(index) {
        if (this.selectedImage > 0) {
          this.selectedImage--;
        }
      },
      nextImage(index) {
        if (this.selectedImage < this.cafe.imageUrls.length - 1) {
          this.selectedImage++;
        }
      },
      closeImage(index) {
        this.selectedImage = null;
      }
    }
  }
</script>

<style scoped>

  h2 {
    color: #fff;
  }

  h5 {
    line-height: 1.5em;
  }

  .ratings p, .post-header p {
    color: var(--textColorNeutral4);
  }

  .ratings p {
    font-size: var(--textSize1);
  }

  .cafe {
    display: flex;
    flex-direction: column;
    overflow-x: auto;
    margin-bottom: 0.5rem;
  }

  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    opacity: 1;
    background-size: cover;
    background-position: center;
    overflow: hidden;
  }
  header:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  header h6 {
    color: rgba(255,255,255,.75);
  }

  .cafe-content {
    position: relative;
    background-color: var(--backgroundColorNeutral2);
  }

  .cafe-information-container {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }

  .pics {
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    top: 0;
    width: 100%;
    padding-top: 1rem;
    overflow-x: scroll;
  }

  .pics-spacer {
    position: relative;
    width: 100%;
    height: 200px;
    padding-top: 1rem;
  }

  .cafe-pic {
    width: 200px;
    height: 200px;
    padding: 1px;
  }
  .cafe-pic:hover {
    cursor: zoom-in;
    opacity: 0.8;
  }

  .description {
    text-align: center;
    padding: 2rem;
  }

  .information {
    display: grid;
    grid-template-columns: auto auto auto;
    margin: 1rem 0;
  }

  .ratings, .features, .location {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 1rem 2rem;
  }

  .ratings span {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 0.25rem;
  }
  .ratings span > * {
    margin-right: 0.5rem;
  }

  .location article {
    margin-bottom: 1rem;
  }

  .train-line-icons {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .train-line-icon {
    margin-right: 0.25rem;
  }

  .visits {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }

  .visit-item {
    display: grid;
    grid-template-columns: auto auto;
    padding: 1rem;
    padding-bottom: 2rem;
  }

  .visit-header {
    display: flex;
    flex-direction: column;
    grid-column: 1 / 2;
  }

  .visit-header section {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .visit-header section > * {
    color: var(--textColorNeutral4);
    margin-right: 0.5rem;
  }

  .visit-order {
    grid-column: 2 / 3;
    text-align: right;
  }

  .visit-content {
    grid-column: 1 / 3;
    padding-top: 1rem;
  }

  @media screen and (max-width: 860px) {
    .information {
      grid-template-columns: auto auto;
    }
    .ratings {
      justify-content: center;
      grid-column: 1 / 3;
    }
    .ratings span {
      justify-content: center;
    }
    .features {
      justify-content: flex-start;
    }
    .location article,
    .train-line-icons {
      justify-content: flex-end;
      text-align: right;
    }
  }

  @media screen and (max-width: 580px) {
    .information {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .features {
      align-items: center;
    }
    .location article,
    .train-line-icons {
      justify-content: center;
      text-align: center;
    }
  }

</style>
