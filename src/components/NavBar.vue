<template>

  <b-navbar wrapper-class="container" spaced>
      <template slot="brand">
          <b-navbar-item id="bingbong" tag="router-link" :to="{path: '/'}" >
          </b-navbar-item>
      </template>
       <template v-if="user.username!=null" slot="start">
            <b-navbar-item tag="router-link" v-for="menuItem in menuItems" :key="menuItem.id" :to="menuItem.link">
                <b-icon size="is-small" :type="menuItem.color" :icon="menuItem.icon"></b-icon>
		<span></span>
                {{menuItem.name}}

            </b-navbar-item>
        </template>
        <template v-else slot="start">
            <b-navbar-item tag="router-link" v-for="defaultItem in defaultItems" :key="defaultItem.id" :to="defaultItem.link">
                <b-icon size="is-small" :type="defaultItem.color" :icon="defaultItem.icon"></b-icon>
		<span></span>
                {{defaultItem.name}}

            </b-navbar-item>
        </template>
       <template slot="end">
           <div>
            <b-navbar-item v-if="user.username==null" tag="div">
                <div class="buttons">
                    <a href="/signup" class="button is-secondary">
                        <strong>Sign up</strong>
                    </a>
                    <a href="/login" class="button is-primary">
                        <strong>
                        Log in
                        </strong>
                    </a>
                </div> 
                
            </b-navbar-item>
            <b-navbar-item v-else tag="div">
                 
            <b-navbar-dropdown :label="user.username"  >
                <b-navbar-item href="/account">
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
                name: 'ABOUT',
                link: '/about',
                icon: 'heart',
                color: 'is-secondary'
            },
            {
                id:2,
                name: 'CONTESTS',
                link: '/findcontest',
                 icon: 'lead-pencil',
                 color: 'is-secondary'
            },
            {
                id:3,
                name: 'BROWSE',
                link: '/search',
                 icon: 'magnify',
                 color: 'is-secondary'
            },
            {
                id:4,
                name: 'DASHBOARD',
                link: '/dashboard',
                 icon: 'view-dashboard',
                 color: 'is-secondary'
            }
            ],
            defaultItems:[
            {
                id:1,
                name: 'BROWSE',
                link: '/search',
                 icon: 'magnify',
                 color: 'is-secondary'
            },
            {
                id:2,
                name: 'CONTESTS',
                link: '/findcontest',
                 icon: 'lead-pencil',
                 color: 'is-secondary'
            },
            
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
    },
    mounted(){

    }
}
</script>

<style>
#bingbong {
  background: url("../assets/parachutefunblue.png") no-repeat center center;
  background-size: 52px;
  width: 52px;
  margin-right: 10px;
  margin-left: 5px
}
#bingbang {
  background: url("../assets/parachutefunblue.png") no-repeat center center;
  background-size: cover;
  width: 56px;
  margin-right: 10px
}
</style>