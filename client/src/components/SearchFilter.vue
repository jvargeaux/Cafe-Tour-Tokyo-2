<template>
  <div>
    <div class="filterContainer">
      <h3>Filter By</h3>
      <p>Area</p>
      <button v-for="city in Object.keys(cities)" @click="changeCity(city)" :class="cities[city] && 'active'">{{ city }}</button>
      <p>Line</p>
      <button v-for="line in Object.keys(lines)" @click="changeLine(line)" :class="lines[line] && 'active'">{{ line }}</button>
    </div>
    <div class="sortContainer">
      <h3>Sort By</h3>
      <button @click="changeSort('rating')" :class="sortBy === 'rating' && 'active'">Rating</button>
      <button @click="changeSort('walk-time')" :class="sortBy === 'walk-time' && 'active'">Walk Time</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SearchFilter',
    components: {

    },
    props: {
      cities: {},
      lines: {},
      sortBy: String
    },
    methods: {
      changeCity(name) {
        this.$emit('change-city', name)
      },
      changeLine(name) {
        this.$emit('change-line', name)
      },
      changeSort(string) {
        this.$emit('change-sort', string)
      }
    }
  }
</script>

<style scoped>

  button {
    margin: 0;
    padding: 1.5rem 2rem;
    font-family: 'Mulish', 'Avenir', sans-serif;
    font-size: 0.9rem;
  }
  button:hover {
    opacity: 0.8;
  }

  .active {
    background-color: #49bd88;
  }

</style>
