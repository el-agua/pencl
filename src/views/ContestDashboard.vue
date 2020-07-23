<template>
<section class='section'>
    <div class="columns is-centered">
    <div class="is-size-1">{{contestName}}</div>
    </div>
    <section class='section'>
    <div class="is-size-3"> Test Participants:</div>
     <b-table :data="particData" v-if="particData.length!=0">
          
    <template slot-scope="props">
        <b-table-column field="displayName" label="Display Name" centered>
          {{ props.row.displayName}}
      </b-table-column>
      <b-table-column field="testCode" label="Test Code" centered>
          {{ props.row.testCode }}
      </b-table-column>
        <b-table-column field="email" label="Email" centered>
          {{ props.row.email }}
      </b-table-column>

      <b-table-column  label="Delete" centered>
          <button @click="deleteParticipant(props.row.testCode)" class="button is-primary is-small">
            Delete
          </button>
      </b-table-column>
    </template>
     </b-table>
     <div class="is-size-6" v-else>No participants yet! </div>
     </section>
     <section class='section'>
         <div class="is-size-3"> Test Results:</div>
         
     <b-table :data="submissionData" v-if="submissionData.length!=0">
          <template slot-scope="props">
              <b-table-column field="index" label="Place" centered>
          {{ props.index + 1}}
      </b-table-column>
              <b-table-column field="displayName" label="Display Name" centered>
          {{ props.row.displayName }}
      </b-table-column>
      <b-table-column field="userID" label="Test Code" centered>
          {{ props.row.userID }}
      </b-table-column>
        <b-table-column field="score" label="Score" centered>
          {{ props.row.score }}
      </b-table-column>
      <b-table-column field="date" label="Start Time" centered>
          <span class="tag is-triple">
            {{ new Date(props.row.startTime).toUTCString()}}
          </span>
      </b-table-column>


      <b-table-column label="Delete" centered>
          <button @click="deleteSubmission(props.row.userID)" class="button is-primary is-small">
            Delete
          </button>
      </b-table-column>
    </template>
     </b-table>
     <div class="is-size-6" v-else>No submissions yet! </div>
     
     </section>
     
     </section>
</template>

<script>
import { contestService } from "../services/contestService";
import router from "../router"
export default {
    props:['user'],
    data(){
        return {
            contestName: '',
            particData: [],
            submissionData: [],
        }
    },
    methods:{
        deleteSubmission(code){
            console.log(code)
            contestService.deleteSubmission(code, this.$route.params.id)
            .then(
                a => {console.log(a)
                this.refresh()
                }
            )
            .catch(() => router.push('/dashboard'))
        },
        deleteParticipant(code){
            contestService.deleteParticipant(code, this.$route.params.id)
            .then(()=>{
                this.refresh()
            }
            )
        },
        refresh(){
            contestService.getParticipants(this.user.username,this.$route.params.id)
            .then(u =>{
                if (u.participants == null){
                    router.push('/dashboard')
                }
                this.particData = u.participants
                this.contestName = u.contestName
                contestService.getResults(this.$route.params.id)
                .then(
                    b =>{
                        let c = b.sort(function(x, y){return y.score-x.score})
                        this.submissionData = c
                    }
                )
            })
            .catch(() =>{
                router.push('/dashboard')
            })
        }
    },
    mounted: function () {
    this.$nextTick(function () {
    if (this.user.username != null){
        this.refresh()
    }else{
        router.push('/login')
    }
     
  })

  },

}
</script>

<style scoped>

</style>