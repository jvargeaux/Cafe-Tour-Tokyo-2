<template>
  <div>
    <p id="output"></p>
    <SearchFilter v-bind:cities="cities" v-bind:lines="lines" v-on:change-city="changeCity" v-on:change-line="changeLine" v-bind:sortBy="sortBy" v-on:change-sort="changeSort" />
    <div class="cafeItem"
    v-for="(cafe, index) in filteredCafes"
    :key="index">
      <Cafe v-if="expanded === index" v-bind:cafe="cafe" v-on:toggle-expand="toggleExpand(index)" :index="index" />
      <div v-else v-on:click.capture="toggleExpand(index)">
        <CompactCafe v-bind:cafe="cafe" v-bind:coverImage="cafe.imageUrls && cafe.imageUrls[0]" />
      </div>
    </div>
  </div>
</template>

<script>
  import Cafe from './Cafe.vue';
  import CompactCafe from './CompactCafe.vue';
  import SearchFilter from './SearchFilter.vue';

  export default {
    name: 'CompactCafeList',
    components: {
      Cafe,
      CompactCafe,
      SearchFilter
    },
    data() {
      return {
        expanded: null,
        cities: {},
        lines: {},
        filteredCafes: [],
        sortBy: 'rating'
      }
    },
    methods: {

      populateFilterCities() {
        let knownCities = {};
        this.$store.state.cafes.forEach(cafe => {
          if (cafe.city) knownCities[cafe.city] = true;
        });
        if (!knownCities) return;

        this.cities = knownCities;
      },

      populateFilterLines() {
        let knownLines = {};
        this.$store.state.cafes.forEach(cafe => {
          if (cafe.location.line) knownLines[cafe.location.line] = true;
        });
        if (!knownLines) return;

        this.lines = knownLines;
      },

      reCalcFilter() {
        let cafesToFilter = this.$store.state.cafes;
        cafesToFilter = cafesToFilter.filter(cafe => {
          // console.log("cafe:", cafe.name);
          let doesCityMatch = false;
          let doesLineMatch = false;

          // 1. filter by city
          for (let cityName in this.cities) {
            if (!this.cities[cityName]) continue;
            if (cafe.city === cityName) doesCityMatch = true;
            // console.log(cafe.city, "equals", cityName, "?:", cafe.city === cityName);
          }
          // console.log("doesCityMatch:", doesCityMatch);

          // 2. filter by line
          for (let lineName in this.lines) {
            if (!this.lines[lineName]) continue;
            if (cafe.location.line === lineName) doesLineMatch = true;
            // console.log(cafe.location.line, "equals", lineName, "?:", cafe.location.line === lineName);
          }

          // console.log("doesLineMatch:", doesLineMatch);
          return doesCityMatch && doesLineMatch;
        });
        // console.log("---------------------");
        this.filteredCafes = cafesToFilter;
      },
      toggleExpand: function (index) {
        if (this.expanded === index) {
          this.expanded = null;
          return;
        }
        this.expanded = index;
      },

      changeCity(name) {
        // If all filters active, make only selected filter active
        let allFiltersOn = true;
        for (let cityName in this.cities) {
          if (!this.cities[cityName]) allFiltersOn = false;
        }
        if (allFiltersOn) {
          for (let cityName in this.cities) {
            this.cities[cityName] = false;
          }
        }

        this.$set(this.cities, name, !this.cities[name]);

        // If no filters active, make all filters active
        let noFiltersOn = true;
        for (let cityName in this.cities) {
          if (this.cities[cityName]) noFiltersOn = false;
        }
        if (noFiltersOn) {
          this.populateFilterCities();
        }

        this.reCalcFilter();
      },

      changeLine(name) {
        // If all filters active, make only selected filter active
        let allFiltersOn = true;
        for (let lineName in this.lines) {
          if (!this.lines[lineName]) allFiltersOn = false;
        }
        if (allFiltersOn) {
          for (let lineName in this.lines) {
            this.lines[lineName] = false;
          }
        }

        this.$set(this.lines, name, !this.lines[name]);

        // If no filters active, make all filters active
        let noFiltersOn = true;
        for (let lineName in this.lines) {
          if (this.lines[lineName]) noFiltersOn = false;
        }
        if (noFiltersOn) {
          this.populateFilterLines();
        }

        this.reCalcFilter();
      },

      sortFilteredCafes() {
        switch (this.sortBy) {
          case 'rating':
            this.filteredCafes.sort((a, b) => {
              if (a.ratings.overall === b.ratings.overall) return 0;
              if (!a.ratings.overall) return 1;
              else if (!b.ratings.overall) return -1;
              return b.ratings.overall - a.ratings.overall;
            });
            break;
          case 'walk-time':
            this.filteredCafes.sort((a, b) => {
              if (a.location.minsFromStation === b.location.minsFromStation) return 0;
              if (!a.location.minsFromStation) return 1;
              else if (!b.location.minsFromStation) return -1;
              return a.location.minsFromStation - b.location.minsFromStation;
            });
            break;
          case 'seats':
            break;
        }
      },

      changeSort(string) {
        this.sortBy = string;
        this.sortFilteredCafes();
      }

    },
    mounted() {
      this.populateFilterCities();
      this.populateFilterLines();
      this.reCalcFilter();
    }
  }
</script>

<style scoped>

</style>
