<template>
  <div class="edit-visit">
    <span class="edit-label edit-item-left">Date:</span>
    <input class="edit-item-right" type="date" :value="visit.date ? visit.date : null" @input="changeDate" />
    <span class="edit-label edit-item-left">Rating:</span>
    <div class="rating-row">
      <EditStarRating :rating="visit.rating" :star_size="25" v-on:save-rating="saveVisitRating" />
      <span class="edit-item-right">{{ visit.rating }}</span>
    </div>
    <span class="edit-label edit-item-left">Order:</span>
    <input class="edit-item-right" type="text" :value="visit.order" @input="changeOrder" />
    <span class="edit-label edit-item-left">Content:</span>
    <textarea class="edit-item-right" :value="visit.textContent" @input="changeContent" />
    <button class="done-editing" @click="doneEditing">Done</button>
  </div>
</template>

<script>
  import EditStarRating from './EditStarRating.vue';

  export default {
    name: 'EditVisit',
    components: {
      EditStarRating
    },
    props: {
      visit: {
        date: String,
        rating: 0,
        order: String,
        textContent: String
      }
    },
    methods: {
      changeDate() {
        this.visit.date = event.target.value;
      },
      saveVisitRating(rating) {
        this.visit.rating = rating;
      },
      changeOrder() {
        this.visit.order = event.target.value;
      },
      changeContent() {
        this.visit.textContent = event.target.value;
      },
      doneEditing() {
        this.$emit('done-editing-visit');
      }
    }
  }
</script>

<style scoped>

  input[type="text"], input[type="date"], textarea {
    padding: 0.75rem;
    font-size: var(--textSize1);
    box-sizing: border-box;
    border: 1px solid var(--colorTextNeutral1);
    border-radius: 0.5rem;
    transition: color var(--fadeTime1), border var(--fadeTime1);
  }
  input[type="text"]:hover, input[type="date"]:hover, textarea:hover {
    border: 1px solid var(--colorPalette1a);
  }
  input[type="text"]:focus, input[type="date"]:focus, textarea:focus {
    border: 1px solid var(--colorPalette1a);
    color: var(--colorPalette1a);
  }

  .ratings p, .post-header p {
    color: var(--colorTextNeutral1);
  }
  .cafe-header, .ratings, .post-order {
    background-color: var(--bgNeutralLight);
  }

  .ratings p {
    font-size: var(--textSize1);
  }

  .edit-visit {
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: 0.5rem;
    grid-row-gap: 0.5rem;
    align-items: center;
    justify-content: center;
  }

  .done-editing {
    grid-column: 1 / -1;
    text-align: center;
    margin: auto;
  }

  .edit-label {
    font-size: var(--textSize2);
    font-weight: 300;
  }

  .edit-item-left {
    grid-column: 1 2;
    text-align: right;
  }

  .edit-item-right {
    grid-column: 2 3;
    text-align: left;
  }

  .rating-row {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .cafe-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0;
  }
  .cafe-header:hover {
    cursor: text;
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
