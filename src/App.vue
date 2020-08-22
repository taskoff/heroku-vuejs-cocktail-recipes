<template>
  <div id="app">
    <app-header :isAuth = isAuth @changeIsAuth="isAuth = $event"></app-header>
    <router-view @isAuth="isAuth = $event" ></router-view>
    <app-footer></app-footer>
  
  </div>
</template>

<script>
// import AppHome from './components/Home.vue';
import AppHeader from './components/shared/Header.vue';
import AppFooter from './components/shared/Footer.vue';

export default {
  name: 'App',
  // mixins: [service],
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      isAuth: false,
    }
  },
  
  
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=IM+Fell+French+Canon+SC&display=swap');
  * {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }
  html {
    
  }
  body {
    box-sizing: border-box;
    font-family: 'IM Fell French Canon SC', serif;
    font-size: 16px;
    background-image: url('../public/img/background_300.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
     background-attachment: fixed;
  }

  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .site-content {
    flex-grow: 1;
  }
  .site-footer {
    margin-top: auto;
  }
</style>
