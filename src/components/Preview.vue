<template>
<div id="margini">
  <router-link :to="myLink">
  <div  id="rounded-card" class="card is-shadowless">
              <div class="card-content">
                  <p  class="is-size-3">{{title}}</p>
                  <p class="is-size-5">{{'Last edited on: '+String(datee.getUTCMonth()+1)+'/'+String(datee.getUTCDate())+'/'+String(datee.getUTCFullYear())}}</p>
                  <p v-if="priv" class="is-size-6 has-text-danger">Private</p>
                   <p v-else class="is-size-6 has-text-success">Public</p>
              </div>

    </div>
    </router-link>
    </div>
</template>

<script>
export default {
    name: 'Preview',
    props:[
        'title', 'datec','link', 'priv'
    ],
    data(){
        return{
            myLink: '/edit/'+String(this.link),
            datee:new Date(this.datec)
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
</style>
