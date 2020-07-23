<template>
  <div id="app">
    <NavBar :user="user"/>
    <div class="container">
    <router-view @loginSuccess="loginData" :user="user"/>
    </div>
  </div>
</template>
<script>
import NavBar from './components/NavBar'
import {userService} from './services/userService'
export default {
  components:{
    NavBar
  },
  data(){
    return{
      user:{}
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
       console.log(user.authData.user)
       this.user=user.authData.user
     })
     .catch(e => console.log(e))
 }

}
</script>
<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors

$body-background-color: #e8ead3;
$triple: #fbd46d;
$triple-invert: findColorInvert($triple);
$secondary: #ff9c71;
$secondary-invert: findColorInvert($secondary);
$primary: #654062;
$primary-invert: findColorInvert($primary);
$twitter: #4099FF;
$twitter-invert: findColorInvert($twitter);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "secondary":($secondary, $secondary-invert),
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
