<template>
  <div id="app">
     <div id="page-container">
    <NavBar :user="user"/>
     <div id="content-wrap">
    <router-view v-if="isFetched" @loginSuccess="loginData" :user="user"/>
    </div>
    <Footer :user="user"/>
</div>
  </div>
</template>
<script>
import Footer from "./components/Footer"
import NavBar from './components/NavBar'
import {userService} from './services/userService'
export default {
  components:{
    NavBar, Footer
  },
  data(){
    return{
      user:{},
      isFetched: false
    }
  },
  methods:{
    loginData(){
     console.log('yes')
     userService.session().then(user => {
       console.log(user.authData.user)
       this.user=user.authData.user
       this.$buefy.toast.open('Logged In!')
     })
     .catch(e => console.log(e))
   }
  },
 created(){
   userService.session().then(user => {
  
       this.user=user.authData.user
       this.isFetched = true
     })
     .catch(() =>  this.isFetched = true)
 }

}
</script>
<style lang="scss">
@import "./mastersetup.css";
// Import Bulma's core
@import "~bulma/sass/utilities/_all";
$footer-background-color: #FFFFFF;
// Set your colors
$card-background-color: #f4f4f4;
$box-background-color: #f4f4f4;
$family-primary: 'Roboto', 'sans-serif';
$triple: #ef4f4f;
$triple-invert: findColorInvert($triple);
$tangerine: #ffcc00;
$tangerine-invert: findColorInvert($tangerine);
$secondary: #ff8585;
$secondary-invert: findColorInvert($secondary);
$primary: #583d72;
$primary-invert: findColorInvert($primary);
$danger: #d11a2a;
$danger-invert: findColorInvert($danger);
$twitter: #436EB1;
$twitter-invert: findColorInvert($twitter);
// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "secondary":($secondary, $secondary-invert),
    "tangerine":($tangerine, $tangerine-invert),
    "triple":($triple, $triple-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
    "twitter": ($twitter, $twitter-invert)
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
