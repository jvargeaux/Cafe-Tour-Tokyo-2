<template>
  <div class="star-rating-wrapper" v-bind:style="{ width: star_size*5 + 'px', height: star_size + 'px' }">
    <div class="star-rating-container">
      <div class="rating-fill" v-bind:style="{ 'clip-path': `polygon(0 0, ${ratingPercent()} 0, ${ratingPercent()} 100%, 0 100%)` }">
        <svg :width=star_size height="100%" class="star" viewBox="-0.5 0 21.5 22">
          <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;"/>
        </svg>
        <svg :width=star_size height="100%" class="star" viewBox="-0.5 0 21.5 22">
          <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;"/>
        </svg>
        <svg :width=star_size height="100%" class="star" viewBox="-0.5 0 21.5 22">
          <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;"/>
        </svg>
        <svg :width=star_size height="100%" class="star" viewBox="-0.5 0 21.5 22">
          <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;"/>
        </svg>
        <svg :width=star_size height="100%" class="star" viewBox="-0.5 0 21.5 22">
          <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;"/>
        </svg>
      </div>
      <div class="rating-empty">
        <svg :width=star_size height="100%" class="star-empty" viewBox="-0.5 0 21.5 22">
          <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;"/>
        </svg>
        <svg :width=star_size height="100%" class="star-empty" viewBox="-0.5 0 21.5 22">
          <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;"/>
        </svg>
        <svg :width=star_size height="100%" class="star-empty" viewBox="-0.5 0 21.5 22">
          <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;"/>
        </svg>
        <svg :width=star_size height="100%" class="star-empty" viewBox="-0.5 0 21.5 22">
          <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;"/>
        </svg>
        <svg :width=star_size height="100%" class="star-empty" viewBox="-0.5 0 21.5 22">
          <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'StarRating',
    props: {
      rating: Number,
      star_size: Number
    },
    methods: {
      ratingPercent: function() {
        return (this.rating/5)*100 + '%';
      }
    }
  }
</script>

<style>
  .star-rating-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .star-rating-container {
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    line-height: 100%;
  }
  .rating-fill {
    position: absolute;
    height: 100%;
    width: 100%;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    z-index: 99;
  }
  .rating-empty {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 9;
  }
  .star {
    fill: var(--starFill);
  }
  .star-empty {
    fill: var(--starEmpty);
  }
</style>
