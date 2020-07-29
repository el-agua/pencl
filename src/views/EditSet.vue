<template>
  <section class="section">
    
    <div class="container">
        <div class="columns is-centered">
        <div class="column is-three-fifths">
        <div id="rounded-card" class="card">
            <div class="card-content">
                <p class="is-size-1">{{set.set}}</p>
                 <b-field>
                <b-switch v-model="set.private">Private</b-switch>
                </b-field>
            </div>
        </div>
        </div>
        </div>
        
        <EditQuestion @questionDelete="deleteProblem" @editSend="appendProblems" ref="questionModel" 
        v-for="question in questions" :key="question.id" :number='questions.indexOf(question)+1' :statement="question.statement" :answer="question.answers" :length="questions.length" :questionShell="question" :solution="question.solution" :author="question.author"/>
        <div class="columns is-centered">
        <div id="margini" class=buttons>
          <b-button @click="addToArray" class="is-secondary is-medium">
            Add Question
          </b-button>
        </div>
        </div>
         <div class="columns is-centered">
        <div id="margini" class=buttons>
          <b-button @click="pressButton" class="is-triple is-medium">
            Save
          </b-button>
        </div>
        </div>
    </div>
  </section>
</template>

<script>
import EditQuestion from '../components/EditQuestion'
import { questionService } from "../services/questionService";
import router from '../router'
export default {
  name: "AddSet",
  
    components:{
        EditQuestion
    },
    props:['user'],

  data() {
    return {
      id: '',
            questions:[],
            counter: 0,
            set:{
                set:'',
                private: false,
                creator: this.user.username,
                questions:[]


            }

      }
  },
  methods: {
   addToArray(){
            this.questions.push({id: (this.questions.length)+1})
        },
        pressButton(){

    
                //tells questions to send up questions
                this.isunique = true
                for (let i=0; i<(this.questions.length); i++){
                this.$refs.questionModel[i].sendQuestion()
        }},
        
        
         appendProblems(problem){
             //adds problems and sends them to the database
            this.set.questions[problem.id-1]=problem
            this.counter++
            console.log(this.set)
            if (this.counter == this.questions.length){
                this.editToDatabase()
                this.counter = 0
            }
         },
         editToDatabase(){
             questionService.editProblem(this.id ,this.set)
             .then(()=>{
                 this.$router.go()
             })
             .catch(e => console.log(e))
         },
         deleteProblem(question){
             this.questions.splice(this.questions.indexOf(question),1)
             this.set.questions.splice(this.questions.indexOf(question),1)

         },

  },
  mounted: function () {
  this.$nextTick(function () {
    if (this.user.username != null){
        questionService.getEditSet(this.user.username, this.$route.params.id).then(q => {
       this.questions = q.question
       console.log(q)
       this.set.set = q.set
       this.id = q._id
       this.set.private = q.private
       
        console.log(this.questions)
     })
     .catch(() => router.push('/login'))
    }else{
        router.push('/login')
    }
  
     // const urlParams = new URLSearchParams(window.location.search);
    //const myParam = urlParams.get('link');
     
  })
  }
};
</script>

<style>
#rounded-card {
  border-radius: 20px;
}
#margini {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
