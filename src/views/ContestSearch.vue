<template>
<div class="container">
    <section class="section">
        <div  class="columns is-centered has-text-centered">
                  <div class="is-size-1"><strong>Open Contests</strong></div>
                </div>
  <div class="columns is-multiline is-flex">
              <div
            class="column is-4 is-12-mobile"
            v-for="contest in contests"
            :key="contest.index"
          >
           <SearchContest
        
        :creator="contest.creator"
        :title="contest.contestName"
        :dates="contest.dates"
        :link="contest._id"
      />
          </div>
    </div>
    </section>
    </div>
</template>

<script>
import {contestService} from "../services/contestService"
import SearchContest from "../components/SearchContest"
export default {
    props: ['user'],
    data(){
        return{
            contests:[]
        }
    },
    components:{
        SearchContest
    },
    created(){
            contestService.searchContests()
            .then(
                contests => {
                    this.contests = contests
                }
            )
        }
}
</script>

<style>
.box{
  box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02)
}
.card{
  box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02)
}
</style>