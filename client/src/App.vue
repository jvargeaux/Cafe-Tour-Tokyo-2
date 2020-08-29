<template>
  <div id="app">
    <div :class="`appContainer ${this.$store.state.darkMode ? 'darkMode' : 'lightMode'}`">
    <Navigation />
    <div class="router">
      <router-view/>
    </div>
    <Footer />
    </div>
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
          console.log(e);
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
          console.log(e);
        })

      }
    },
    created() {
      // console.log("app created. gonna fetch data.");
      // this.$store.dispatch('fetchCafesFromDB').then(() => {
      //   console.log("fetched data:", this.$store.state.cafes);
      // })
      // this.apiGetCafes();
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

    --colorTextNeutral1: #9a9a9a;
    --colorTextAccent1: #15c36b;

    /* TEXT */
    --textSize1: 0.95rem;
    --textSize2: 1rem;
    --textSize3: 1.25rem;
    --textSize4: 1.75rem;

    /* SIZES */
    --navigationHeight: 320px;

    /* TRANSITIONS */
    --fadeTime1: 0.15s;
    --fadeTime2: 0.3s;

    --starFill: #f4c54f;

    --favoriteColor: #e184e9;
  }

  .lightMode {
    --appBG: #ececf0;
    --navigationBG: #bed7d6;
    --navigationButtonColor: #089472;
    --navigationButtonColorHover: #0fa27e;

    --buttonColor: #616161;
    --buttonColorHover: #49bd88;

    --textColorNeutral1: #000;
    --textColorNeutral2: #000;
    --textColorNeutral3: #5d5d5d;
    --textColorNeutral4: #9a9a9a;

    --textColorAccent: #15c36b;

    --backgroundColorNeutral1: rgba(0,0,0,.15);
    --backgroundColorNeutral2: #fff;

    --starEmpty: rgba(0,0,0,.12);
  }

  .darkMode {
    --appBG: #272727;
    --navigationBG: #373c44;
    --navigationButtonColor: #1b7760;
    --navigationButtonColorHover: #10886b;

    --buttonColor: #616161;
    --buttonColorHover: #2b8e67;

    --textColorNeutral1: #fff;
    --textColorNeutral2: #fff;
    --textColorNeutral3: #bababa;
    --textColorNeutral4: #9a9a9a;

    --textColorAccent: #15c36b;

    --backgroundColorNeutral1: rgba(255,255,255,.15);
    --backgroundColorNeutral2: #161616;

    --starEmpty: rgba(255,255,255,.2);
  }

  /* ==================== */

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
    line-height: 1.5em;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-width: 320px !important;
  }

  h1 {
    color: var(--textColorNeutral1);
    font-family: 'Julius Sans One', sans-serif;
    text-transform: uppercase;
    text-align: center;
    line-height: 1.5em;
    margin-bottom: 1em;
  }
  h2 {
    color: var(--textColorNeutral1);
    font-size: var(--textSize4);
    margin-bottom: 0.5rem;
  }
  h3 {
    color: var(--textColorNeutral1);
    font-size: var(--textSize3);
  }
  h4 {
    color: var(--colorTextAccent1);
    font-size: var(--textSize2);
  }
  h5 {
    color: var(--textColorNeutral2);
    font-size: var(--textSize3);
    font-weight: 500;
  }
  h6 {
    color: var(--textColorNeutral2);
    font-size: var(--textSize1);
  }
  p {
    color: var(--textColorNeutral1);
    font-size: var(--textSize2);
  }
  span {
    color: var(--textColorNeutral1);
  }
  a {
    text-decoration: none;
  }
  a.router-link-exact-active {
    /* color: #42b983; */
  }

  button {
    margin: 1rem;
    padding: 1rem 1.5rem;
    outline: none;
    background-color: var(--buttonColor);
    color: #fff;
    border: none;
    font-family: 'Mulish', 'Avenir', sans-serif;
    font-size: 0.75rem;
    line-height: 100%;
    border-radius: 4px;
  }
  button:hover {
    cursor: pointer;
    background-color: var(--buttonColorHover);
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
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: calc(100vh - var(--navigationHeight));
    padding: 6rem;
    background: var(--appBG);
    transition: padding 0.3s;
  }


  @media screen and (max-width: 900px) {
    .router {
      padding: 6rem 4rem;
    }
  }

  @media screen and (max-width: 720px) {
    .router {
      padding: 6rem 2rem;
    }
  }

  @media screen and (max-width: 580px) {
    :root {
      --navigationHeight: 240px;
    }
  }

</style>
