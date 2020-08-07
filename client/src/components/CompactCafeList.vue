<template>
  <div>
    <p id="output"></p>
    <div class="cafeItem"
    v-for="(cafe, index) in this.$store.state.cafes"
    :key="index">
      <Cafe v-if="expanded === index" v-bind:cafe="cafe" v-on:toggle-expand="toggleExpand(index)" />
      <div v-else v-on:click.capture="toggleExpand(index)">
        <CompactCafe v-bind:cafe="cafe" />
      </div>
    </div>
  </div>
</template>

<script>
  import Cafe from './Cafe.vue';
  import CompactCafe from './CompactCafe.vue';

  export default {
    name: 'CompactCafeList',
    components: {
      Cafe,
      CompactCafe
    },
    data() {
      return {
        expanded: null
      }
    },
    methods: {
      toggleExpand: function (index) {
        if (this.expanded === index) {
          this.expanded = null;
          return;
        }
        this.expanded = index;
      }
    },
    created() {

    }
  }
</script>

<style scoped>

</style>
