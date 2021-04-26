<template>
  <div id="app">
    <div class="app-container">
      <div id="nav" v-if="$route.path !== '/'">
        <router-link to="/home">Home</router-link>
        <router-link to="/sectors">SECTORS</router-link>
        <!--        <router-link to="/building">BUILDING</router-link>-->
        <!--        <router-link to="/mining">MINING</router-link>-->
        <!--        <router-link to="/industrial">INDUSTRIAL</router-link>-->
        <router-link to="/about">ABOUT</router-link>
        <router-link to="/contact">CONTACT</router-link>
        <router-link to="/settings">SETTINGS</router-link>
        <div class="log-out" @click="logOut">
          <span class="material-icons">
            logout
          </span>
          <span>LOG OUT</span>
        </div>
      </div>
      <MainContent class="main-content">
        <router-view />
      </MainContent>
    </div>
  </div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.app-container {
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 6fr;
}
#nav {
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, .3);
  display: grid;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}
#nav a.router-link-exact-active {
  color: #ffcd21;
  font-weight: normal;
  font-size: 1.2rem;
}
#nav a.router-link-exact-active:hover {
  color: #ffcd21 !important;
  font-weight: bold;
  font-size: 1.4rem;
}
a {
  font-weight: normal;
  font-size: 1.2rem;
  display: grid;
  align-items: center;
  list-style-type: none;
  text-decoration: none;
}
a:hover {
  background-color: #2c3e50;
  color: #ffffff !important;
  font-weight: bold;
  font-size: 1.4rem;
}
.log-out {
  display: grid;
  margin: 0 auto;
  grid-template-columns: 4vw 8vw;
  align-items: center;
  cursor: pointer;
  font-weight: normal;
  font-size: 1.2rem;
}
.log-out:hover {
  font-weight: bold;
  font-size: 1.4rem;
}
@media (max-width: 990px) {
  .app-container {
    grid-template-columns: 2fr 6fr;
  }
}
</style>
<script>
import MainContent from "./components/MainContent";
import {fa} from "../firebaseConfig";
export default {
  components: {MainContent},
  methods: {
    logOut () {
      fa.signOut()
          .then(() => {
            this.$router.replace('/')
          })
          .catch((error) => {
            console.log(error);
          });
    }
  }
}
</script>