<template>
<section class="section">
  <div  class="columns is-centered has-text-centered">
                  <div class="is-size-2"><strong>Problem Set Search</strong></div>
                </div>
  <div class="columns is-centered">
    
                <div class="column is-4">
                  <b-field>
                    <b-input  placeholder="Search..." v-model="param" style="margin-left: 7px; margin-right:7px">
                    </b-input>
                  </b-field>
                </div>
              </div>
              
              <div class="columns is-centered has-text-centered">
                  <b-button icon-right="arrow-right" type="is-secondary" @click="search">
                    Search
                  </b-button>
              </div>
              <div class="container">
                <div v-if="sets.length==0 & searched==true" class="columns is-centered">
                  <div id="high" class="is-size-5">Uh oh! No problem sets match your search!</div>
                </div>
              <div v-else class="columns is-multiline is-flex">
              <div
            class="column is-4 is-12-mobile"
            v-for="set in sets"
            :key="set.index"
          >
           <SearchPreview
        
        :priv="set.private"
        :creator="set.creator"
        :title="set.set"
        :datec="set.datee"
        :link="set._id"
        :numOfPartic="set.question.length"
      />
          </div>
              </div>
              </div>
              </section>
</template>

<script>
import { questionService } from '../services/questionService'
import SearchPreview from "../components/SearchPreview"
export default {
    name: "Search",
    props: ['user'],
    data(){
        return {
            sets: [],
            param: '',
            searched: false
        }
    },
    components:{
        SearchPreview
    },
    methods:{
        search(){
            questionService.searchProblems(this.param)
            .then(
                problems => {
                    this.sets = problems
                    this.searched = true
                }
            )
        }
    }
}
</script>

<style>
#high{
  margin-top: 20px
}
.box{
  box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02)
}
</style>