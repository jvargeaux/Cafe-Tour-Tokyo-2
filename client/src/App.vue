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
@import 'https://fonts.googleapis.com/css?family=Julius+Sans+One&display=swap';

:root {
  --bgGradientLight: linear-gradient(45deg, #d5d5d5, #fff);
  --bgGradientDark: linear-gradient(45deg, #24252b, #181a21);
  --bgNeutralLight: #f0f0f0;

  --colorTextNeutral1: #9a9a9a;
  --colorTextAccent1: #15c36b;

  --textSize1: 0.9rem;
  --textSize2: 1rem;
  --textSize3: 1.1rem;
  --textSize4: 1.75rem;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  background: var(--bgGradientDark);
  background-repeat: no-repeat;
  min-height: 100vh;
}
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #474747;
}

h1 {
  font-family: 'Julius Sans One', sans-serif;
  text-align: center;
  margin-bottom: 6vh;
}
h2 {
  font-size: var(--textSize4);
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

.router {
  background: #fff;
}
</style>
