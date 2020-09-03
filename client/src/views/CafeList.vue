<template>
  <Loader v-if="this.loading" />
  <section v-else>
    <SearchFilter class="search-filter"
      v-bind:currentFilter="currentFilter"
      v-bind:cities="cities"
      v-bind:lines="lines"
      v-bind:sortBy="sortBy"
      v-on:change-city="changeCity"
      v-on:change-line="changeLine"
      v-on:change-sort="changeSort"
      v-on:clear-filters="clearFilters" />
    <div class="cafe-list">
      <h3 v-if="!filteredCafes || !filteredCafes.length">No cafes with this filter.</h3>
      <div v-else class="cafe-item"
      v-for="(cafe, index) in filteredCafes"
      :key="index">
        <Cafe v-if="expanded === index" v-bind:cafe="cafe" v-on:toggle-expand="toggleExpand(index)" :index="index" />
        <div v-else>
          <div @click="toggleExpand(index)">
            <CompactCafe  v-bind:cafe="cafe" v-bind:coverImage="cafe.imageUrls && cafe.imageUrls[0]" />
          </div>
        </div>
        <div :class="`favorite ${isFavorite(cafe._id) && 'isFavorite'}`">
          <i v-if="user" :class="`${isFavorite(cafe._id) ? 'fas' : 'far'} fa-heart fa-lg`" @click="toggleFavorite(cafe._id)"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Cafe from '../components/Cafe.vue';
  import CompactCafe from '../components/CompactCafe.vue';
  import SearchFilter from '../components/SearchFilter.vue';
  import Loader from '../components/Loader.vue';

  export default {
    name: 'CafeList',
    components: {
      Cafe,
      CompactCafe,
      SearchFilter,
      Loader
    },
    data() {
      return {
        loading: false,
        expanded: null,
        cities: {},
        lines: {},
        currentFilter: null,
        filteredCafes: [],
        sortBy: 'rating'
      }
    },
    computed: {
      cafes() {
        return this.$store.state.cafes
      },
      user() {
        return this.$store.state.user
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

      resetCitiesFilter() {
        let knownCities = {};
        this.$store.state.cafes.forEach(cafe => {
          if (cafe.city) knownCities[cafe.city] = true;
        });
        if (!knownCities) return;

        this.cities = knownCities;
      },

      resetLinesFilter() {
        let knownLines = {};
        this.$store.state.cafes.forEach(cafe => {
          if (cafe.locations) {
            cafe.locations.forEach(location => {
              if (location.lines && location.lines.length) {
                location.lines.forEach(line => {
                  knownLines[line] = true;
                });
              }
            });
          }
        });
        if (!knownLines) return;

        this.lines = knownLines;
      },

      reCalcFilter() {
        let cafesToFilter = this.$store.state.cafes;
        cafesToFilter = cafesToFilter.filter(cafe => {

          switch (this.currentFilter) {

            case 'cities':
              let doesCityMatch = false;
              for (let cityName in this.cities) {
                if (!this.cities[cityName]) continue;
                if (cafe.city === cityName) doesCityMatch = true;
              }
              return doesCityMatch;

            case 'lines':
              let doesLineMatch = false;
              for (let lineName in this.lines) {
                if (!this.lines[lineName]) continue;
                if (cafe.locations) {
                  cafe.locations.forEach(location => {
                    if (location.lines && location.lines.length) {
                      location.lines.forEach(line => {
                        if (line === lineName) doesLineMatch = true;
                      });
                    }
                  });
                }
              }
              return doesLineMatch;

            case null:
              // No filter, return all cafes
              return true;
          }

        });

        this.filteredCafes = cafesToFilter;
      },

      changeCity(name) {
        this.expanded = null;
        this.currentFilter = 'cities';

        // If all filters active, make only selected filter active
        let allCitiesActive = true;
        for (let cityName in this.cities) {
          if (!this.cities[cityName]) allCitiesActive = false;
        }
        if (allCitiesActive) {
          for (let cityName in this.cities) {
            this.cities[cityName] = false;
          }
        }

        this.$set(this.cities, name, !this.cities[name]);

        // If no filters active, make all filters active
        let noCitiesActive = true;
        for (let cityName in this.cities) {
          if (this.cities[cityName]) noCitiesActive = false;
        }
        if (noCitiesActive) {
          this.currentFilter = null;
          this.resetCitiesFilter();
        }

        this.resetLinesFilter();

        this.reCalcFilter();
      },

      changeLine(name) {
        this.expanded = null;
        this.currentFilter = 'lines';

        // If all filters active, make only selected filter active
        let allLinesActive = true;
        for (let lineName in this.lines) {
          if (!this.lines[lineName]) allLinesActive = false;
        }
        if (allLinesActive) {
          for (let lineName in this.lines) {
            this.lines[lineName] = false;
          }
        }

        this.$set(this.lines, name, !this.lines[name]);

        // If no filters active, make all filters active
        let noLinesActive = true;
        for (let lineName in this.lines) {
          if (this.lines[lineName]) noLinesActive = false;
        }
        if (noLinesActive) {
          this.currentFilter = null;
          this.resetLinesFilter();
        }

        this.resetCitiesFilter();

        this.reCalcFilter();
      },

      sortFilteredCafes() {
        switch (this.sortBy) {
          case 'rating':
            this.filteredCafes.sort((a, b) => {
              if (!a.ratings || !b.ratings) return 0;
              if (a.ratings.overall === b.ratings.overall) return 0;
              if (!a.ratings.overall) return 1;
              else if (!b.ratings.overall) return -1;
              return b.ratings.overall - a.ratings.overall;
            });
            break;
          case 'walk-time':
            this.filteredCafes.sort((a, b) => {
              let result = 0;

              // If both a and b have no locations, return 0 (ignore)
              // If a === b, return 0 (ignore)

              // No a, b goes first
              if (!a.locations || !a.locations.length) return 1;
              // No b, a goes first
              if (!b.locations || !b.locations.length) return -1;

              let a_smallest = Infinity;
              a.locations.forEach(location => {
                if (!location.minsFromStation) return;
                if (location.minsFromStation < a_smallest) {
                  a_smallest = location.minsFromStation;
                }
              });
              let b_smallest = Infinity;
              b.locations.forEach(location => {
                if (!location.minsFromStation) return;
                if (location.minsFromStation < b_smallest) {
                  b_smallest = location.minsFromStation;
                }
              });

              return a_smallest - b_smallest;
            });
            break;
          case 'seats':
            break;
        }
      },

      changeSort(string) {
        this.expanded = null;
        this.sortBy = string;
        this.sortFilteredCafes();
      },

      clearFilters() {
        this.resetCitiesFilter();
        this.resetLinesFilter();
        this.reCalcFilter();
        this.sortFilteredCafes();
        this.expanded = null;
        this.currentFilter = null;
      },

      isFavorite(cafeID) {
        if (!this.$store.state.user) return false;
        let favorites = this.$store.state.user.favorites;
        if (favorites && favorites.length) {
          let isFavorite = favorites.some(fav => {
            return fav === cafeID
          });
          return isFavorite;
        }
        return false;
      },

      toggleFavorite(cafeID) {
        this.$store.dispatch('toggleFavorite', cafeID);
      }

    },
    created() {
      if (this.$store.state.cafes && this.$store.state.cafes.length) {
        this.loading = false;

        this.resetCitiesFilter();
        this.resetLinesFilter();
        this.reCalcFilter();
      }
      else {
        this.loading = true;

        this.$store.dispatch('fetchCafesFromDB').then(() => {
          this.resetCitiesFilter();
          this.resetLinesFilter();
          this.reCalcFilter();
          this.sortFilteredCafes();
          setTimeout(() => {
            this.loading = false;
          }, 500);
        })
      }
    }
  }
</script>

<style scoped>

  h3 {
    text-align: center;
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  section > * {
    flex-grow: 1;
    max-width: 900px;
  }

  .search-filter {
    width: 100%;
    margin-bottom: 1rem;
  }

  .cafe-list {
    width: 100%;
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

  @media screen and (min-width: 1280px) {
    section {
      flex-direction: row;
      justify-content: center;
      align-items: flex-start;
      width: 100%;
    }
    .search-filter {
      max-width: 480px;
      min-width: 480px;
      margin-bottom: 0;
      margin-right: 2rem;
    }
  }

</style>
