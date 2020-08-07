<template>
  <div class="edit-cafe">
    <h1 v-if="cafe._id">Edit Cafe</h1>
    <h1 v-else>New Cafe</h1>
    <div class="edit-section">
      <span class="edit-label edit-item-left">Cafe Name:</span>
      <input class="edit-item-right" type="text" :value="cafe.name" @input="changeName" />
      <span class="edit-label edit-item-left">City:</span>
      <input class="edit-item-right" type="text" :value="cafe.city" @input="changeCity" />
    </div>
    <div class="edit-section">
      <h5 class="edit-section-title">Ratings</h5>
      <span class="edit-label edit-item-left">Overall:</span>
      <div class="edit-item-right rating-row">
        <EditStarRating :rating="cafe.ratings.overall" :star_size="25" v-on:save-rating="saveOverallRating" />
        <span class="edit-label">{{ cafe.ratings.overall }}</span>
      </div>
      <span class="edit-label edit-item-left">Cleanliness:</span>
      <div class="edit-item-right rating-row">
        <EditStarRating :rating="cafe.ratings.cleanliness" :star_size="25" v-on:save-rating="saveCleanlinessRating" />
        <span class="edit-label">{{ cafe.ratings.cleanliness }}</span>
      </div>
      <span class="edit-label edit-item-left">Coffee:</span>
      <div class="edit-item-right rating-row">
        <EditStarRating :rating="cafe.ratings.coffee" :star_size="25" v-on:save-rating="saveCoffeeRating" />
        <span class="edit-label">{{ cafe.ratings.coffee }}</span>
      </div>
      <span class="edit-label edit-item-left">Food:</span>
      <div class="edit-item-right rating-row">
        <EditStarRating :rating="cafe.ratings.food" :star_size="25" v-on:save-rating="saveFoodRating" />
        <span class="edit-label">{{ cafe.ratings.food }}</span>
      </div>
      <span class="edit-label edit-item-left">Usability:</span>
      <div class="edit-item-right rating-row">
        <EditStarRating :rating="cafe.ratings.usability" :star_size="25" v-on:save-rating="saveUsabilityRating" />
        <span class="edit-label">{{ cafe.ratings.usability }}</span>
      </div>
      <span class="edit-label edit-item-left">Price:</span>
      <div class="edit-item-right rating-row">
        <EditStarRating :rating="cafe.ratings.price" :star_size="25" v-on:save-rating="savePriceRating" />
        <span class="edit-label">{{ cafe.ratings.price }}</span>
      </div>
    </div>
    <div class="edit-section">
      <h5 class="edit-section-title">Features</h5>
      <span class="edit-label edit-item-left">Seats:</span>
      <input class="edit-item-right" type="number" min="0" :value="cafe.features.seats" @input="changeSeats" />
      <span class="edit-label edit-item-left">Free Wifi:</span>
      <input class="edit-item-right" type="checkbox" @click="toggleWifi" />
      <span class="edit-label edit-item-left">Free Water:</span>
      <input class="edit-item-right" type="checkbox" @click="toggleWater" />
    </div>
    <div class="edit-section">
      <h5 class="edit-section-title">Location</h5>
        <span class="edit-label edit-item-left">Station:</span>
        <input class="edit-item-right" type="text" :value="cafe.location.station" @input="changeStation" />
        <span class="edit-label edit-item-left">Line:</span>
        <select class="edit-item-right" id="trainLine" name="trainLine" @change="changeLine">
          <option value=""></option>
          <option value="jr_yamanote">JR Yamanote</option>
          <option value="jr_chuo">JR Chuo</option>
          <option value="seibu_shinjuku">Seibu Shinjuku</option>
        </select>
        <span class="edit-label edit-item-left">Mins From Station:</span>
        <input class="edit-item-right" type="number" min="0" :value="cafe.location.minsFromStation" @input="changeMinsFromStation" />
    </div>
    <div class="edit-section">
      <span class="edit-label edit-item-left">Image URLs:</span>
      <input class="edit-item-right" type="text" :value="cafe.imageUrls" @input="changeImageUrls" />
    </div>
    <div class="visits">
      <h5 class="edit-section-title">Visits</h5>
      <div class="visit-item"
      v-for="(visit, index) in cafe.visits"
      :key="index">
        <EditVisit v-if="currentlyEditingVisit === index" v-bind:visit="visit" v-on:done-editing-visit="doneEditingVisit" />
        <div v-else @click="selectVisitToEdit(index)">
          <h5>{{ visit.date }}</h5>
          <p>Rating this visit: {{ visit.rating }}</p>
          <h5>{{ visit.order }}</h5>
          <p class="visit-content">{{ visit.textContent }}</p>
        </div>
      </div>
      <button @click="addVisit">Add Visit</button>
    </div>
    <div class="finish-buttons-container">
      <button @click="saveCafe">Save Cafe</button>
      <button @click="deleteConfirm">Delete Cafe</button>
    </div>
    <div class="confirm-delete finish-buttons-container" v-if="askingDeleteConfirmation">
      <p>Are you sure?</p>
      <button @click="deleteCafe">Yes</button>
      <button @click="cancelDelete">No</button>
    </div>
  </div>
</template>

<script>
  import EditStarRating from './EditStarRating.vue';
  import EditVisit from './EditVisit.vue';

  export default {
    name: 'EditCafe',
    components: {
      EditStarRating,
      EditVisit
    },
    data() {
      return {
        currentlyEditingVisit: null,
        askingDeleteConfirmation: false
      }
    },
    props: {
      cafe: {
        _id: Number,
        name: String,
        city: String,
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
          station: String,
          line: String,
          minsFromStation: 0
        },
        visits: [],
        imageUrls: [String]
        // last visit
      }
    },
    methods: {
      changeName() {
        this.cafe.name = event.target.value;
      },
      changeCity() {
        this.cafe.city = event.target.value;
      },
      formatImageUrl(imgUrl) {
        return require('../assets/' + imgUrl);
      },
      saveOverallRating(rating) {
        this.cafe.ratings.overall = rating;
      },
      saveCleanlinessRating(rating) {
        this.cafe.ratings.cleanliness = rating;
      },
      saveCoffeeRating(rating) {
        this.cafe.ratings.coffee = rating;
      },
      saveFoodRating(rating) {
        this.cafe.ratings.food = rating;
      },
      saveUsabilityRating(rating) {
        this.cafe.ratings.usability = rating;
      },
      savePriceRating(rating) {
        this.cafe.ratings.price = rating;
      },
      toggleWifi() {
        this.cafe.features.wifi = !this.cafe.features.wifi;
      },
      toggleWater() {
        this.cafe.features.water = !this.cafe.features.water;
      },
      changeSeats() {
        this.cafe.features.seats = event.target.value;
      },
      changeStation() {
        this.cafe.location.station = event.target.value;
      },
      changeLine() {
        this.cafe.location.line = event.target.value;
      },
      changeMinsFromStation() {
        this.cafe.location.minsFromStation = event.target.value;
      },
      changeImageUrls() {
        let input = event.target.value;
        console.log(input);
        if (!input) this.cafe.imageUrls = null;
        else {
          let imageUrlArray = input.split(',');
          console.log("imageUrlArray", imageUrlArray);
          this.cafe.imageUrls = imageUrlArray;
        }
      },

      selectVisitToEdit(index) {
        this.currentlyEditingVisit = index;
      },
      doneEditingVisit() {
        this.currentlyEditingVisit = null;
      },
      addVisit() {
        let newVisit = {
          date: null,
          rating: 0,
          order: null,
          textContent: null
        }
        this.cafe.visits.push(newVisit);
      },
      saveCafe() {
        console.log("saving...");

        // Remove spaces from image urls
        if (this.cafe.imageUrls) {
          this.cafe.imageUrls.forEach((url, i) => {
            this.cafe.imageUrls[i] = url.trim();
          });
        }

        this.$emit('save-cafe', this.cafe);
      },
      deleteConfirm() {
        this.askingDeleteConfirmation = true;
      },
      cancelDelete() {
        this.askingDeleteConfirmation = false;
      },
      deleteCafe() {
        console.log("deleting...");
        this.$emit('delete-cafe', this.cafe);
      }
    },
    beforeDestroy() {
      this.$store.commit('updateEditingCafe', this.cafe);
    }
  }
</script>

<style scoped>

  input[type="text"], input[type="number"] {
    padding: 0.75rem;
    font-size: var(--textSize1);
    box-sizing: border-box;
    border: 1px solid var(--colorTextNeutral1);
    border-radius: 0.5rem;
    transition: color var(--fadeTime1), border var(--fadeTime1);
  }
  input[type="text"]:hover, input[type="number"]:hover {
    border: 1px solid var(--colorPalette1a);
  }
  input[type="text"]:focus, input[type="number"]:focus {
    border: 1px solid var(--colorPalette1a);
    color: var(--colorPalette1a);
  }
  select {
    padding: 0.75rem;
    border-radius: 0.5rem;
  }
  input[type="checkbox"] {
    width: 1.25rem;
    height: 1.25rem;
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

  .edit-cafe {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 0.25rem 0;
  }

  .edit-section {
    width: 100%;
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: 35% 65%;
    grid-column-gap: 0.5rem;
    grid-row-gap: 0.5rem;
    align-items: center;
  }

  .edit-section-title {
    grid-column: 1 / -1;
    text-align: center;
    margin: 0.5rem 0;
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

  .visits {
    width: 100%;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .visit-item {
    width: 100%;
    padding: 1rem;
    margin-bottom: 1rem;
  }
  .visit-item:hover {
    cursor: pointer;
    background-color: rgba(0,0,0,.05);
  }

  .finish-buttons-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
  }

</style>
