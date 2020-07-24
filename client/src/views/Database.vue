<template>
  <div class="apiContainer">
    <div class="buttonContainer">
      <button v-on:click="showCafes">Cafes</button>
      <button v-on:click="showPosts">Posts</button>
      <button v-on:click="showNewCafe">New Cafe</button>
    </div>
    <div class="databaseContainer">
      <div v-if="currentView === 'cafes'">
        <li v-for="cafe in this.$store.state.cafes" v-bind:key="cafe.id">
          <Cafe v-bind:cafe="cafe" />
        </li>
      </div>
      <div v-if="currentView === 'posts'">
        <li v-for="post in this.$store.state.posts" v-bind:key="post.id">
          <Post v-bind:post="post" />
        </li>
      </div>
      <div v-if="currentView === 'newCafe'">
        <EditCafe v-bind:cafe="newCafe" />
      </div>
    </div>
  </div>
</template>

<script>
  import Post from '../components/Post.vue';
  import Cafe from '../components/Cafe.vue';
  import EditCafe from '../components/EditCafe.vue';

  const API_CAFES_URL = window.location.hostname === 'localhost' ?
    'http://' + window.location.hostname + ':5000/api/cafes' :
    'https://' + window.location.host + '/api/cafes';
  const API_POSTS_URL = window.location.hostname === 'localhost' ?
    'http://' + window.location.hostname + ':5000/api/posts' :
    'https://' + window.location.host + '/api/posts';

  export default {
    name: 'Database',
    components: {
      Post,
      Cafe,
      EditCafe
    },
    data() {
      return {
        currentView: 'cafes',
        newCafe: {
          name: 'Hello',
          city: 'asdf',
          ratings: {
            overall: 0,
            cleanliness: 0,
            coffee: 0,
            food: 0,
            usability: 0,
            price: 0
          },
          features: {
            wifi: false,
            seats: 0,
            water: false
          },
          location: {
            station: 'asdf',
            line: 'asdf',
            minsFromStation: 0
          },
          posts: {
            date: 'asfda',
            visitRating: 0,
            order: 'asfd',
            textContent: 'asfda'
          },
          imageUrls: ['asfs.jpg']
          // last visit
        }
      }
    },
    methods: {
      loadCafes: function() {
        fetch(API_CAFES_URL, {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(res => {
          return res.json()
        })
        .then(data => {
          this.$store.commit('loadCafes', data);
        })
        .catch(e => {
          document.getElementById("output").innerHTML = e
        })

      },
      loadPosts: function() {
        fetch(API_POSTS_URL, {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(res => {
          return res.json()
        })
        .then(data => {
          this.$store.commit('loadPosts', data);
        })
        .catch(e => {
          document.getElementById("output").innerHTML = e
        })

      },
      showCafes: function() {
        this.currentView = 'cafes';
      },
      showPosts: function() {
        this.currentView = 'posts';
      },
      showNewCafe: function() {
        this.currentView = 'newCafe';
      }
    },
    created() {
      this.loadCafes();
      this.loadPosts();
    }
  }
</script>

<style scoped>
  .databaseContainer {
    padding: 5vh 5vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .buttonContainer {
    display: flex;
    justify-content: center;
    margin-bottom: 4vh;
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
  li {
    list-style: none;
  }
</style>
