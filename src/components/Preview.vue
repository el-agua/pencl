<template>
<div>
  
  <div  id="rounded-cardC" @mouseover="showDelete=true" @mouseleave="showDelete=false" class="card">
              
              <div class="card-content">
                <router-link :to="myLink">
                  <p  class="is-size-4 has-text-dark"><strong>{{title}}</strong></p>
                  <p class="is-size-5 has-text-dark">{{'Last edited on: '+String(datee.getUTCMonth()+1)+'/'+String(datee.getUTCDate())+'/'+String(datee.getUTCFullYear())}}</p>
                  <p class="is-size-7 has-text-dark">Privacy Setting:</p>
                  <p v-if="priv" class="is-size-7 has-text-danger">Private</p>
                   <p v-else class="is-size-7 has-text-success">Public</p>
                   </router-link>
              </div>
              
              <footer  class="card-footer is-coolN">
              <div @click="removeSet" class="card-footer-item">
                 <div  class="icon is-small">
                   <transition name="fade">
                   <i v-show="showDelete == true" class="mdi mdi-24px mdi-delete"></i>
                   </transition>
                  </div>
              </div>
            </footer>

    </div>
    
    </div>
</template>

<script>
import {questionService} from "../services/questionService"
export default {
    name: 'Preview',
    props:[
        'title', 'datec','link', 'priv'
    ],
    data(){
        return{
            myLink: '/edit/'+String(this.link),
            datee:new Date(this.datec),
            showDelete: false
        }
    },
    methods:{
      removeSet(){
           this.$buefy.dialog.confirm({
                    message: 'Are you sure you want to delete this set?',
                    onConfirm: () => questionService.removeProblem(this.link)
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
#rounded-card {
  border-radius: 20px;
}
#margini{
  margin-bottom: 20px;
}
.is-coolN{
  background-color:#5B84B1FF;
  color: white;
  border-color: transparent;
  border-radius: 0px 0px 6px 6px;
  transition: 0.3s;
}
.is-coolN:hover{
  background-color: #d11a2a;
  
}
.box{
  box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02)
}
</style>
