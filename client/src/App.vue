<template>
  <div id="app">
    <Navigation />
    <div class="router">
      <router-view/>
    </div>
    <Footer />
  </div>
</template>

<script>
  import Navigation from './components/Navigation.vue';
  import Footer from './components/Footer.vue';

  const API_CAFE_URL = window.location.hostname === 'localhost' ?
    'http://' + window.location.hostname + ':5000/api/cafes' :
    'https://' + window.location.host + '/api/cafes';
  const API_POST_URL = window.location.hostname === 'localhost' ?
    'http://' + window.location.hostname + ':5000/api/posts' :
    'https://' + window.location.host + '/api/posts';

  export default {
    name: 'app',
    components: {
      Navigation,
      Footer
    },
    computed: {
      cafes() {
        return this.$store.state.cafes
      },
      posts() {
        return this.$store.state.posts
      }
    },
    methods: {
      apiGetCafes: function() {
        fetch(API_CAFE_URL, {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(res => {
          return res.json()
        })
        .then(data => {
          this.$store.commit('loadCafes', data)
        })
        .catch(e => {
          document.getElementById("output").innerHTML = e
        })

      },
      apiGetPosts: function() {
        fetch(API_POST_URL, {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(res => {
          return res.json()
        })
        .then(data => {
          this.$store.commit('loadPosts', data)
        })
        .catch(e => {
          document.getElementById("output").innerHTML = e
        })

      }
    },
    created() {
      this.apiGetCafes();
      this.apiGetPosts();
    }
  }

  document.title = 'Cafe Tour Tokyo';
</script>

<style>

  /* 003D14 - Forest Green Traditional */

  :root {

    /* COLORS */
    --colorPalette1: #6cff9d;  /* Spring Green */
    --colorPalette1Dark: #003d14;  /* Forest Green Traditional */
    --colorPalette1a: #00b83d;  /* Dark Pastel Green */
    --colorPalette2: #f2f7ff;  /* Alice Blue (White) */
    --colorPalette3: #393b6d;  /* Dark Slate Blue */

    --colorNeutralLight: #f0f0f0;

    --appBG: #202020;

    --colorTextNeutral1: #9a9a9a;
    --colorTextAccent1: #15c36b;

    /* TEXT */
    --textSize1: 0.95rem;
    --textSize2: 1rem;
    --textSize3: 1.25rem;
    --textSize4: 1.75rem;

    /* TRANSITIONS */
    --fadeTime1: 0.15s;
    --fadeTime2: 0.3s;

  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none !important;
  }
  html {
    background: var(--appBG);
    min-height: 100vh;
    font-size: 16px;
  }
  body {
    font-family: 'Mulish', 'Avenir', sans-serif;
    font-weight: 300;
    /* 200, 300. 400. 600 */
    line-height: 1.5rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1 {
    font-family: 'Julius Sans One', sans-serif;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 6vh;
  }
  h2 {
    font-size: var(--textSize4);
    margin-bottom: 0.5rem;
  }
  h3 {
    font-size: var(--textSize3);
  }
  h4 {
    font-size: var(--textSize2);
    color: var(--colorTextAccent1);
  }
  h5 {
    font-size: var(--textSize3);
    font-weight: 500;
  }
  h6 {
    font-size: var(--textSize1);
  }
  p {
    font-size: var(--textSize2);
  }
  a {
    text-decoration: none;
  }
  a.router-link-exact-active {
    /* color: #42b983; */
  }

  button {
    height: 3rem;
    width: 6rem;
    margin: 0 2vw;
    outline: none;
    background-color: #616161;
    color: #fff;
    border: none;
    font-size: 0.75rem;
  }
  button:hover {
    cursor: pointer;
    background-color: #49bd88;
  }

  input[type="text"], input[type="number"], input[type="date"],
  textarea, select, span {
    font-family: 'Mulish', 'Avenir', sans-serif;
  }

  input[type="text"] {
    min-width: 240px;
  }

  input[type="number"] {
    max-width: 80px;
  }

  textarea {
    min-width: 240px;
    min-height: 80px;
  }

  .router {
    background: #fff;
    padding-top: 60px;
    padding-bottom: 120px;
    padding-left: 10vw;
    padding-right: 10vw;
  }

</style>
