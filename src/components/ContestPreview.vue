<template>
<div >
  
  <div  id="rounded-cardC" @mouseover="showDelete=true" @mouseleave="showDelete=false" class="card">
              <div class="card-content">
                <router-link :to="myLink">
                  <p  class="is-size-4 has-text-dark"><strong>{{title}}</strong></p>
                  <p  class="is-size-5 has-text-dark">{{String(numberOfPartic)}} Participants</p>
                  <p class="is-size-7 has-text-primary">{{  new Date(dates[0]).toUTCString() }}
            </p>
            <p class="is-size-7 has-text-primary">{{ new Date(dates[1]).toUTCString() }}</p>
            </router-link>
              </div>
              <footer  class="card-footer is-cool">
              <div class="card-footer-item">
                 <div  class="icon is-small">
                   <transition name="fade">
                   <i @click="removeContest" v-show="showDelete == true" class="mdi mdi-24px mdi-delete"></i>
                   </transition>
                  </div>
              </div>
            </footer>
    </div>
    
    </div>
</template>

<script>
import {contestService} from '../services/contestService'
export default {
    name: 'ContestPreview',
    props:[
        'title', 'dates', 'link', 'numberOfPartic'
    ],
    data(){
        return{
            showDelete:false,
            myLink: '/contestDashboard/'+String(this.link),
        }
    },
    methods:{
      removeContest(){
           this.$buefy.dialog.confirm({
                    message: 'Are you sure you want to delete this contest?',
                    onConfirm: () => contestService.removeContest(this.link)
           .then(
             () => {
               this.$router.go()
             }
           )
                })
           
         }
    }
}
</script>

<style>
#rounded-cardC {
  border-radius: 6px;
  transition: 0.3s;
  height: 100%;
  min-height: 191px
}
#rounded-cardC:hover{
  transform: scale(1.05);
}
.box{
  box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02)
}
.is-cool{
  background-color:#FC766AFF;
  color: white;
  border-color: transparent;
  border-radius: 0px 0px 6px 6px;
  transition: 0.3s;
}
.is-cool:hover{
  background-color: #d11a2a;
  
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
