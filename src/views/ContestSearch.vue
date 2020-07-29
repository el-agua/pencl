<template>
<div class="container">
    <section class="section">
        <div  class="columns is-centered">
                  <div class="is-size-1"><strong>Open Contests</strong></div>
                </div>
  <div class="columns is-multiline is-flex">
              <div
            class="column is-4 "
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

</style>