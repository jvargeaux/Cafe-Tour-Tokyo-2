<template>
  <div class="loader">
    <div class="loader-image">
      <div class="loader-circle"></div>
      <i class="fas fa-coffee fa-2x"></i>
    </div>
    <p>Loading...</p>
  </div>
</template>

<script>
  export default {
    name: 'Loader'
  }
</script>

<style scoped>

  p {
    font-size: 1rem;
  }

  i {
    color: #93dfbc;
  }

  .loader {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 4rem;
  }

  .loader p {
    color: #71b897;
  }

  .loader-image {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px;
    width: 120px;
    margin: 1rem;
  }

  .loader-image i {
    animation-name: fadeCoffee;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }

  .loader-circle {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: 100%;
    border: 2px solid #93dfbc;
    border-left: none;
    border-top: none;
    animation-name: rotateCircle;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes rotateCircle {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes fadeCoffee {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.25;
    }
    100% {
      opacity: 1;;
    }
  }

</style>
