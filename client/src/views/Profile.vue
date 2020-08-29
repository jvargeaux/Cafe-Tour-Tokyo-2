<template>
  <div class="profile-container">
    <section class="user-info-container">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
      <h6>Favorites:</h6>
    </section>
    <section class="cafe-list">
      <h6 v-if="!favoriteCafes">No favorites saved.</h6>
      <div v-else class="cafe-item"
      v-for="(cafe, index) in favoriteCafes"
      :key="index">
        <Cafe v-if="expanded === index" v-bind:cafe="cafe" v-on:toggle-expand="toggleExpand(index)" :index="index" />
        <div v-else>
          <div @click="toggleExpand(index)">
            <CompactCafe  v-bind:cafe="cafe" v-bind:coverImage="cafe.imageUrls && cafe.imageUrls[0]" />
          </div>
        </div>
        <div class="favorite isFavorite">
          <i v-if="user" class="fas fa-heart fa-lg" @click="toggleFavorite(cafe._id)"></i>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import Cafe from '../components/Cafe.vue';
  import CompactCafe from '../components/CompactCafe.vue';

  export default {
    name: 'Profile',
    components: {
      Cafe,
      CompactCafe
    },
    data() {
      return {
        expanded: null
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      favoriteCafes() {
        if (!this.$store.state.cafes ||
          !this.$store.state.cafes.length ||
          !this.$store.state.user ||
          !this.$store.state.user.favorites ||
          !this.$store.state.user.favorites.length) return;

        return this.$store.state.cafes.filter(cafe => {
          return this.$store.state.user.favorites.some(fav => {
            return fav === cafe._id
          });
        })
      }
    },
    methods: {
      toggleExpand: function (index) {
        if (this.expanded === index) {
          this.expanded = null;
          return;
        }
        this.expanded = index;
      },
      toggleFavorite(cafeID) {
        this.$store.dispatch('toggleFavorite', cafeID);
      }
    },
    created() {
      console.log(this.$store.state.user);
    }
  }
</script>

<style scoped>

  .profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .user-info-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
  }

  .user-info-container * {
    text-align: center;
  }

  .user-info-container h6 {
    display: inline-block;
    margin-top: 2rem;
    padding: 1rem 2rem;
    text-align: center;
    color: #fff;
    background-color: var(--navigationButtonColor);
    border-radius: 0.5rem;
  }

  .cafe-list {
    width: 100%;
    max-width: 900px;
  }

  .cafe-item {
    position: relative;
  }

  .favorite {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0.5rem;
    color: #fff;
    z-index: 9999;
    opacity: 0.5;
    transition: all 0.3s;
  }
  .favorite:hover {
    color: var(--favoriteColor);
    opacity: 1;
    cursor: pointer;
  }

  .isFavorite {
    opacity: 0.9;
    color: var(--favoriteColor);
  }

</style>
