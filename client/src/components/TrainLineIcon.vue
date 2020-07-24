<template>
  <div class="train-icon-container">
    <img class="train-icon" :src="formatIconUrl(line)" />
  </div>
</template>

<script>
  export default {
    name: 'TrainLineIcon',
    props: {
      line: String
    },
    methods: {
      formatIconUrl: function(iconUrl) {
        return require('../assets/train_line_icons/' + iconUrl + '.svg');
      }
    }
  }
</script>

<style>
  .train-icon-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .train-icon {
    width: 28px;
  }
</style>
