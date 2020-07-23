<template>
  <section class="section">
    
    <div class="container">
        <div class="columns is-centered">
        <div class="column is-three-fifths">
        <div id="rounded-card" class="card is-shadowless">
            <div class="card-content">
                <p class="is-size-1">Title:</p>
                <b-field>
                 <b-input v-model="set.set" placeholder="Title" type="text">
                </b-input>
                </b-field>
                 <b-field>
                <b-switch v-model="set.private">Private</b-switch>
                </b-field>
            </div>
        </div>
        </div>
        </div>
        <AddQuestion @questionDelete="deleteProblem" @questionSend="appendProblems" ref="questionModel" v-for="question in questions" :key="question.index" :number='question.index'/>
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
import AddQuestion from "../components/AddQuestion"
import { questionService } from "../services/questionService";
import router from "../router"

export default {
  name: "AddSet",
  
    components:{
        AddQuestion
    },
    props:['user'],

  data() {
    return {
      isunique: true,
      questions:[],
      counter: 0,
      set:{
          set:'',
          private: false,
          creator: this.user.username,
          questions:[]


      }
    };
  },
  methods: {
    submitForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("Hello");
      } else {
        console.log("Yes");
      }
    },
    addToArray(){
            this.questions.push({index: (this.questions.length)+1})
            this.set.questions.push({})
        },
        pressButton(){
        //checks set name for uniqueness
        questionService.getSet(this.set.creator, this.set.set)
        .then(u => {
            if (u == true){
                //tells questions to send up questions
                this.isunique = true
                for (let i=0; i<(this.questions.length); i++){
                this.$refs.questionModel[i].sendQuestion()
        }
            }else{
                this.isunique = false
                this.$buefy.toast.open('You already have a set with this name!')
            }
        })
        
        },
         appendProblems(problem){
             //adds problems and sends them to the database
            this.set.questions[problem.index-1]=problem
            this.counter++
            if (this.counter == this.questions.length){
                this.sendToDatabase()
                this.counter = 0
            }
         },
         sendToDatabase(){
             questionService.addProblem(this.set)
             .then(()=>{
                 router.push('/dashboard')
             })
             .catch(e => console.log(e))
         },
         deleteProblem(index){
             this.questions.splice(index-1)
             for (let i=0; i<(this.questions.length); i++){
            this.questions[i].index = i+1

         }}
  },
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
