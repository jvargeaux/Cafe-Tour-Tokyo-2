<template>
  <section @click="handleClick">
    <span>x</span>
    <i class="fas fa-arrow-left fa-lg left"></i>
    <img :src="imageUrl" />
    <i class="fas fa-arrow-right fa-lg right"></i>
  </section>
</template>

<script>
  export default {
    name: 'ImagePopup',
    props: {
      imageUrl: String
    },
    methods: {
      handleClick(e) {
        if (e.target.tagName !== "IMG" && e.target.tagName !== "I") {
          this.$emit('close-image');
        }
        if (e.target.tagName === "I" && e.target.className.includes('left')) {
          this.$emit('previous-image');
        }
        if (e.target.tagName === "I" && e.target.className.includes('right')) {
          this.$emit('next-image');
        }
      },
      handleKeyDown(e) {
        if (e.key === 'ArrowLeft') {
          this.$emit('previous-image');
        }
        if (e.key === 'ArrowRight') {
          this.$emit('next-image');
        }
      }
    },
    mounted() {
      window.addEventListener('keydown', this.handleKeyDown);
    },
    beforeDestroy() {
      window.removeEventListener('keydown', this.handleKeyDown);
    }
  }
</script>

<style scoped>

  section {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    padding: 4rem;
    background-color: rgba(0,0,0,.5);
    z-index: 999999;
  }

  span {
    position: fixed;
    top: 1rem;
    right: 1rem;
    padding: 2rem;
    color: #fff;
    font-size: 2rem;
    font-weight: 500;
    user-select: none;
  }
  span:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  i {
    position: fixed;
    top: 50%;
    padding: 0.5rem;
    color: #fff;
  }
  i:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  .left {
    left: 1rem;
  }

  .right {
    right: 1rem;
  }

  img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
  }

</style>
