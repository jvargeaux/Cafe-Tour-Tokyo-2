<template>
  <div class="component-wrapper">
    <div class="bgOverlay"></div>
    <div class="bg"></div>
    <section class="headerBar">
      <div>
        <button @click="toggleLanguage">{{ this.$store.state.currentLanguage === 'en' ? '日本語' : 'English' }}</button>
        <button @click="toggleDarkMode">{{ this.$store.state.darkMode ? 'Light Mode' : 'Dark Mode' }}</button>
      </div>
      <div class="accountStatus" v-if="user">
        <h6>Welcome, {{ user.name }}</h6>
        <button v-on:click="logout">Logout</button>
      </div>
      <div class="accountStatus" v-else>
        <h6><a class="textLink" href=".#/login">Login</a> or <a class="textLink" href=".#/register">Create An Account</a></h6>
      </div>
    </section>
    <a href="./"><h1>Cafe Tour Tokyo</h1></a>
    <div class="nav-wrapper">
      <section class="nav-container">
        <nav>
          <router-link to="/" exact>Home</router-link>
          <router-link to="/about">About</router-link>
          <router-link to="/cafelist">Cafe List</router-link>
          <router-link v-if="user && user.email === 'fakeAdmin@gmail.com'" to="/api">API</router-link>
          <router-link v-if="user" to="/profile">Profile</router-link>
          <router-link v-if="user && user.email === 'jvargeaux@gmail.com'" to="/database">Database</router-link>
        </nav>
      </section>
    </div>
  </div>
</template>

<script>
  const DASHBOARD_URL = window.location.hostname === 'localhost' ?
    'http://' + window.location.hostname + ':5000/dashboard' :
    'https://' + window.location.host + '/dashboard';

  export default {
    name: 'Navigation',
    props: {

    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      checkLoginStatus: function() {
        fetch(DASHBOARD_URL, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': document.cookie
          }
        })
         .then(res => res.json())
         .then(data => {
           this.$store.commit('updateUser', data);
         })
         .catch(err => console.log(err));
      },
      logout: function() {
        document.cookie = null;
        location.reload();
      },
      toggleLanguage: function() {
        let newLanguage = this.$store.state.currentLanguage === 'en' ? 'jp' : 'en';
        this.$store.commit('changeLanguage', newLanguage);
      },
      toggleDarkMode: function() {
        this.$store.commit('toggleDarkMode');
      }
    },
    mounted() {
      if (!this.$store.state.user) {
        this.checkLoginStatus();
      }
    }
  }
</script>

<style scoped>

  .router-link-active {
    background-color: var(--colorPalette3);
  }


  .component-wrapper {
    position: relative;
    width: 100vw;
    min-width: 320px;
    height: var(--navigationHeight);
    transition: height 0.3s;
  }

  .bg {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    min-width: 300px;
    background-image: url("../assets/cafe1.jpg");
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -99;
  }

  .bgOverlay {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    min-width: 300px;
    /* background-color: rgba(12,121,61,.6); */
    background: linear-gradient(0deg, rgba(108,255,157,.5), rgba(0,61,20,.9));
    z-index: -80;
  }

  .headerBar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    /* max-width: 100vw; */
  }

  .accountStatus {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }

  .textLink {
    color: rgba(179,249,236,.75);
  }
  .textLink:hover {
    color: rgba(255,255,255,1);
  }

  h1 {
    margin: 0;
    padding: 3rem 0.5rem;
    color: #355353;
    font-family: 'Catamaran', sans-serif;
    font-size: 6rem;
    font-weight: 800;
    text-align: center;
    line-height: 1em;
    mix-blend-mode: color-dodge;
    transition: all 0.3s;
  }
  h1:hover {
    opacity: 0.7;
  }

  h6 {
    text-align: center;
    margin-right: 1rem;
    font-size: 1.15rem;
    font-weight: 500;
    color: rgba(255,255,255,.75);
    text-shadow: 0px 0px 15px rgba(0,0,0,1);
    cursor: default;
  }

  button {
    outline: none;
    border: none;
    box-sizing: border-box;
    border: 1px solid #9f9f9f;
    border-radius: 6px;
    font-size: 0.9rem;
    color: #b8b8b8;
    border: 1px solid #9f9f9f;
    background-color: rgba(0,0,0,.25);
    transition: all 0.3s;
  }
  button:hover {
    cursor: pointer;
    color: #e8e8e8;
    border: 1px solid #e8e8e8;
    background-color: rgba(0,0,0,.5);
  }

  a {
    color: inherit;
  }

  .nav-wrapper {
    position: absolute;
    top: var(--navigationHeight);
    width: 100vw;
    min-width: 320px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: top 0.3s;
  }

  .nav-container {
    position: absolute;
    transform: translate(0 -50%);
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1.5rem 2rem;
    background-color: var(--navigationBG);
    box-shadow: 0 0 1rem var(--navigationShadowColor);
    border-radius: 6px;
  }

  nav {
    background-color: var(--navigationButtonColor);
  }

  nav a {
    position: relative;
    display: inline-block;
    padding: 1rem 2rem;
    color: #fff;
    font-size: var(--textSize2);
    font-weight: 500;

    /* I like this color */
    /* background-color: #2a6e5c; */
    /* background-color: #35335e; */
    transition: all 0.25s;
  }

  nav a:hover {
    /* color: #3d736c; */
    color: #fff;
    background-color: var(--navigationButtonColorHover);
    box-shadow: 0 0 10px rgba(0,0,0,.25);
    border-radius: 0.5rem;
    cursor: pointer;
  }


  @media screen and (max-width: 900px) {
    h1 {
      font-size: 4rem;
    }
  }

  @media screen and (max-width: 720px) {
    .nav-container {
      padding: 1rem;
    }
    nav a {
      padding: 1rem 1.5rem;
    }
    .accountStatus h6 {
      margin: 0;
    }
  }

  @media screen and (max-width: 620px) {
    .accountStatus h6 {
      display: none;
    }
  }

  @media screen and (max-width: 580px) {
    h1 {
      font-size: 3rem;
    }
    .nav-container {
      padding: 0;
      background: 0;
    }
    nav {
      border-radius: 0.5rem;
    }
    nav a {
      padding: 0.65rem;
      font-size: 0.75rem;
    }
  }

  @media screen and (max-width: 450px) {
    button {
      margin: 0.5rem;
      padding: 0.75rem 1rem;
    }
  }

</style>
