<template>
  <b-navbar class="is-primary" spaced>
      <template slot="brand">
          <b-navbar-item tag="router-link" :to="{path: '/'}">
            <img src="https://bulma.io/images/bulma-logo.png"/>
          </b-navbar-item>
      </template>
       <template v-if="user.username!=null" slot="start">
            <b-navbar-item  tag="router-link" v-for="menuItem in menuItems" :key="menuItem.id" :to="menuItem.link">
                
                {{menuItem.name}}

            </b-navbar-item>
        </template>
       <template slot="end">
           <div>
            <b-navbar-item v-if="user.username==null" tag="div">
                <div class="buttons">
                    <a class="button is-secondary">
                        <strong>Sign up</strong>
                    </a>
                    <a class="button is-triple">
                        <strong>
                        Log in
                        </strong>
                    </a>
                </div> 
                
            </b-navbar-item>
            <b-navbar-item v-else tag="div">
            <b-navbar-dropdown :label="user.username">
                <b-navbar-item href="#">
                    Account
                </b-navbar-item>
                <b-navbar-item @click="logout">
                    Logout
                </b-navbar-item>
            </b-navbar-dropdown>
            </b-navbar-item>
            </div>
        </template>
  </b-navbar>
</template>

<script>
import {userService} from '../services/userService'
import router from '../router'
export default {
    name: 'NavBar',
    props:['user'],
    data(){
        return{
            username: 'coolio5000',
            loggedIn: true,
            menuItems:[{
                id:1,
                name: 'About',
                link: '/about'
            },
            {
                id:2,
                name: 'Account',
                link: '/'
            },
            {
                id:3,
                name: 'Browse',
                link: '/about'
            },
            {
                id:4,
                name: 'Dashboard',
                link: '/dashboard'
            }
            ]
        }
    },
    methods:{
        logout(){
            userService.logout()
            .then(()=>{
                router.push('/login')
                this.$router.go()
            }
            )
        }
    }
}
</script>

<style>

</style>