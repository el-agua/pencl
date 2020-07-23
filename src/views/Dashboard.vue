<template>
  <section class="section">
    <div class="container">
        <div class="is-size-1">
            Dashboard:
        </div>
        <div class="buttons">
        <b-button class="is-secondary">
          <router-link class="is-light" to="/upload">Create New Set</router-link>        
        </b-button>
        </div>
        <Preview  v-for="set in sets" :priv="set.private" :key="set.index" :title="set.set" :datec="set.datee" :link="set._id"/>
    </div>
  </section>
</template>

<script>
import Preview from "../components/Preview"
import {questionService} from '../services/questionService'

export default {
  name: "Dashboard",
  components: {
        Preview
    },
  props:['user'],
  data() {
    return {
      sets:[]
    };
  },
    mounted: function () {
    this.$nextTick(function () {
     questionService.getAllSets(this.user.username)
            .then(u =>{
                
                this.sets = u
                console.log(u)
            })
            .catch(e =>{
                console.log(e)
            })
     
  })

  },
};
</script>

<style>
#margini{
  margin-bottom: 20px;
}
</style>
