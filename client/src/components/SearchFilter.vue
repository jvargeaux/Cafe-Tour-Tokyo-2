<template>
  <div class="component-wrapper">
    <div class="filterContainer">
      <h6>Filter By</h6>
      <p>Area</p>
      <section>
        <button v-for="city in Object.keys(cities)" @click="changeCity(city)" :class="calcClass(cities[city], 'cities')">{{ city }}</button>
      </section>
      <p>Line</p>
      <section>
        <button v-for="line in Object.keys(lines)" @click="changeLine(line)" :class="calcClass(lines[line], 'lines')">
          <TrainLineIcon class="train-line-icon" v-bind:line="line" />
          {{ locale(line) }}
        </button>
      </section>
    </div>
    <div class="sortContainer">
      <h6>Sort By</h6>
      <section>
        <button @click="changeSort('rating')" :class="sortBy === 'rating' && 'active'">{{ locale('rating') }}</button>
        <button @click="changeSort('walk-time')" :class="sortBy === 'walk-time' && 'active'">{{ locale('walk time') }}</button>
      </section>
    </div>
  </div>
</template>

<script>
  import TrainLineIcon from './TrainLineIcon.vue';

  export default {
    name: 'SearchFilter',
    components: {
      TrainLineIcon
    },
    props: {
      cities: {},
      lines: {},
      currentFilter: String,
      sortBy: String
    },
    methods: {
      calcClass(isSelected, filter) {
        let output = '';
        if (isSelected) output += ' active';
        if (this.currentFilter && this.currentFilter !== filter) {
          output += ' disabled';
        }
        return output;
      },
      changeCity(name) {
        this.$emit('change-city', name)
      },
      changeLine(name) {
        this.$emit('change-line', name)
      },
      changeSort(string) {
        this.$emit('change-sort', string)
      },
      formatTrainLineText: function(line) {
        if (!line) return '';

        let lineName = line.split('_')[1];
        if (!lineName) return;

        let firstLetter = lineName[0];
        let returnString = '';
        if (line.includes('seibu_')) {
          returnString += 'Seibu ';
        }
        returnString += lineName.replace(firstLetter, firstLetter.toUpperCase());

        return returnString;
      },
    }
  }
</script>

<style scoped>

  * {
    text-align: center;
  }

  h6 {
    padding: 0.25rem 0.5rem;
    margin-bottom: 0.5rem;
    border: 1px solid var(--backgroundColorNeutral1);
    border-radius: 0.15rem;
  }

  p {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--textColorNeutral3)
  }

  .component-wrapper {
    padding: 2rem;
    background-color: var(--navigationBG);
    border-radius: 0.5rem;
  }

  .component-wrapper > * {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .filterContainer {
    margin-bottom: 0.5rem;
  }

  section {
    margin-bottom: 0.5rem;
  }

  button {
    margin: 0;
    padding: 1rem 1.25rem;
    font-size: 0.9rem;
    background-color: var(--buttonColor) !important;
    border-radius: 0;
  }
  button:hover {
    opacity: 0.8;
  }

  button > * {
    vertical-align: middle;
  }

  .active {
    background-color: var(--buttonColorHover) !important;
  }

  .disabled {
    color: rgba(255,255,255,.5);
    background-color: var(--buttonColorHover) !important;
    opacity: 0.5;
  }

  .train-line-icon {
    display: inline-block;
    margin-right: 0.25rem;
  }

</style>
