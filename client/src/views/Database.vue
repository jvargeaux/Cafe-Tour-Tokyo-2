<template>
  <div class="apiContainer">
    <div class="buttonContainer">
      <button v-on:click="showCafes">Edit Cafes</button>
      <button v-on:click="showPosts">Edit Posts</button>
      <button v-on:click="showNewCafe">New Cafe</button>
      <button v-on:click="showNewVisit">New Visit</button>
    </div>
    <p id="output"></p>
    <div class="databaseContainer">
      <div v-if="currentView === 'cafes'">
        <li v-for="(cafe, index) in storeCafes" v-bind:key="cafe.id">
          <button class="edit-cafe-button" @click="editCafe(index)">Edit</button>
          <Cafe v-bind:cafe="cafe" />
        </li>
      </div>
      <div v-if="currentView === 'posts'">
        <li v-for="post in storePosts" v-bind:key="post.id">
          <Post v-bind:post="post" />
        </li>
      </div>
      <div v-if="currentView === 'newCafe'">
        <EditCafe v-bind:cafe="storeEditingCafe"
          v-on:save-cafe="saveCafe"
          v-on:delete-cafe="deleteCafe" />
      </div>
      <div v-if="currentView === 'newVisit'">
        <span class="edit-label">Cafe:</span>
        <select id="newVisitCafe" name="newVisitCafe" @change="changeNewVisitCafe">
          <option v-for="cafe in storeCafes" v-bind:key="cafe.id" v-bind:value="cafe.id">{{ cafe.name }}</option>
        </select>
        <EditVisit v-bind:visit="newVisit" v-on:done-editing-visit="saveNewVisit" />
      </div>
    </div>
  </div>
</template>

<script>
  import Post from '../components/Post.vue';
  import Cafe from '../components/Cafe.vue';
  import EditCafe from '../components/EditCafe.vue';
  import EditVisit from '../components/EditVisit.vue';

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
      EditCafe,
      EditVisit
    },
    computed: {
      storeCafes() {
        return this.$store.state.cafes;
      },
      storePosts() {
        return this.$store.state.posts;
      },
      storeEditingCafe() {
        return this.$store.state.editingCafe;
      }
    },
    data() {
      return {
        currentView: 'cafes',
        newVisitCafe: null,
        newCafe: {
          _id: null,
          name: null,
          city: null,
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
            station: null,
            line: null,
            minsFromStation: 0
          },
          visits: [{
            date: '',
            rating: 0,
            order: '',
            textContent: ''
          }],
          imageUrls: []
          // last visit
        },
        newVisit: {
          date: null,
          rating: 0,
          order: null,
          textContent: null
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

      saveCafe: function(cafe) {
        console.log("cafe stringify", JSON.stringify(cafe));

        fetch(API_CAFES_URL, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cafe)
        }).then(res => {
          if (res.status === 204 || res.status === 201) {
            res.json().then(data => {
              let output = '';
              if (res.status === 204) {
                output = 'Cafe updated: ';
              }
              else if (res.status === 201) {
                output = 'Cafe added: ';
              }
              if (data.name) {
                output += data.name;
              }
              else {
                output += '(no name)';
              }
              document.getElementById("output").innerHTML = output;

              // Successfully saved data, so clear store and local storage object
              localStorage.removeItem('editingCafe');
              this.loadCafes();
              this.resetNewCafe();
              this.currentView = 'cafes';
            });
          }
          else {
            console.log("Oops, database error...");
            // Couldn't save data to database, so write cafe object to local storage
            localStorage.setItem('editingCafe', JSON.stringify(this.$store.state.editingCafe));
            document.getElementById("output").innerHTML = 'Hmm... something went wrong.';
          }
        })
        .catch(err => {
          // Couldn't save data to database, so write cafe object to local storage
          localStorage.setItem('editingCafe', JSON.stringify(this.$store.state.editingCafe));
          document.getElementById("output").innerHTML = 'Oops, no internet maybe...? Saved progress to local storage.';
          console.log(err);
        });
      },

      deleteCafe: function(cafe) {
        console.log("cafe stringify", JSON.stringify(cafe));

        let cafeData = { _id: cafe._id }

        fetch(API_CAFES_URL, {
          method: "DELETE",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cafeData)
        }).then(res => {
          if (res.status === 202) {
            res.json().then(id => {
              let output = 'Cafe deleted, ID: ' + id;
              document.getElementById("output").innerHTML = output;

              this.loadCafes();
              this.resetNewCafe();
              this.currentView = 'cafes';
            });
          }
          else {
            document.getElementById("output").innerHTML = 'Hmm... something went wrong.';
          }
        })
        .catch(err => {
          console.log(err);
          document.getElementById("output").innerHTML = 'Oops, no internet maybe...? Couldn\'t delete.';
        });

      },

      showCafes: function() {
        this.currentView = 'cafes';
      },
      showPosts: function() {
        this.currentView = 'posts';
      },
      showNewCafe: function() {
        if (!this.storeEditingCafe) this.resetNewCafe();
        this.currentView = 'newCafe';
      },
      showNewVisit: function() {
        this.currentView = 'newVisit';
      },
      changeNewVisitCafe: function() {
        let selectedCafeIndex = document.getElementById('newVisitCafe').selectedIndex;
        this.newVisitCafe = selectedCafeIndex;
      },
      saveNewVisit: function() {
        let selectedCafeIndex = document.getElementById('newVisitCafe').selectedIndex;
        console.log(selectedCafeIndex);
        // commit change to state at cafes[selectedCafeIndex]
        // save to DB
        // show finished text
      },
      editCafe: function(index) {
        this.$store.commit('updateEditingCafe', this.$store.state.cafes[index]);
        this.currentView = 'newCafe';
      },

      resetNewCafe: function() {
        console.log("Resetting new cafe...");
        let blankCafe = {
          _id: null,
          name: null,
          city: null,
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
            station: null,
            line: null,
            minsFromStation: 0
          },
          visits: [{
            date: '2020-08-02',
            rating: 4.5,
            order: 'Latte',
            textContent: 'This was a great visit. I really enjoyed it...'
          }],
          imageUrls: []
          // last visit
        }

        this.$store.commit('updateEditingCafe', blankCafe);
      }
    },
    created() {
      this.loadCafes();
      this.loadPosts();

      // Check if local storage object exists, and
      // use that first since it probably contains unsaved data
      let localStorageCafe = JSON.parse(localStorage.getItem('editingCafe'));
      console.log("localStorage?", localStorageCafe);
      if (localStorageCafe) {
        console.log("It exists!");
        this.$store.commit('updateEditingCafe', localStorageCafe);
      }
      else { // no local storage exists
        console.log("store editingCafe", this.$store.state.editingCafe);
        if (!this.$store.state.editingCafe) this.resetNewCafe();
      }
    }
  }
</script>

<style scoped>
  .databaseContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .buttonContainer {
    display: flex;
    justify-content: center;
    margin-bottom: 4rem;
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
    position: relative;
    list-style: none;
  }
  .edit-cafe-button {
    position: absolute;
    top: 1rem;
    right: 0;
    z-index: 99;
  }
</style>
