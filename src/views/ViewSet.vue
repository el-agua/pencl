<template>
  <section class="section">
      <div class="columns is-centered">
      <div class="is-size-2"><strong>{{name}}</strong></div>
      </div>
      <div class="columns is-centered">
      <div class="is-size-4">By: {{creator}}</div>
      </div>
 <ViewQuestion v-for="question in questions"  :key="question.id" :source="question.author" :answer="question.answers" :solution="question.solution" :number="question.id" :statement="question.statement"/>
  <div class="columns is-centered">
  </div>
 </section>
</template>

<script>
import {questionService} from '../services/questionService'
import ViewQuestion from '../components/ViewQuestion'
export default {
    components:{
        ViewQuestion
    },
    data(){
        return{
        questions: [],
        name: '',
        creator:''
    }
    },
    created(){
        questionService.getContestSet(this.$route.params.id).then(q => {
            console.log(q)
            this.questions = q.question
            this.name = q.set
            this.creator=q.creator
        })
    }
}
</script>

<style>

</style>