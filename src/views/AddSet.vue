<template>
  <section class="section">
    
    <div class="container">
        <div class="columns is-centered">
        <div class="column is-6">
        <div class="box">
           
                <p class="is-size-1"><strong>Title:</strong></p>
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
        <AddQuestion @questionDelete="deleteProblem" @questionSend="appendProblems" ref="questionModel" v-for="question in questions" :questionShell="question" :key="question.id" :number='questions.indexOf(question)+1' :length='questions.length'/>
        <div class="columns is-centered">
        <div id="margini" class=buttons>
          <b-button icon-left="plus" @click="addToArray" class="is-secondary is-medium">
            Add Question
          </b-button>
        </div>
        </div>
         <div class="columns is-centered">
        <div id="margini" class=buttons>
          <b-button icon-left="content-save" @click="pressButton" class="is-triple is-medium">
            <strong>Save</strong>
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
      deleteCounter: 0,
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
            this.questions.push({id: (this.questions.length)+1})
            this.set.questions.push({})
        },
        pressButton(){
        if (this.set.set == ''){
            this.$buefy.toast.open('You need a name for your set buddy!')
        }else{
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
        }
        },
         appendProblems(problem){
             //adds problems and sends them to the database
             console.log(this.questions)
             
           this.set.questions[problem.id-1]=problem
          this.counter++
            
            if(this.counter == (this.questions.length)){
                this.sendToDatabase()
           }
            
         },
         sendToDatabase(){
             questionService.addProblem(this.set)
             .then(()=>{
                 router.push('/dashboard')
             })
             .catch(e => console.log(e))
         },
         deleteProblem(question){
            this.deleteCounter=this.deleteCounter+1
             this.questions.splice(this.questions.indexOf(question),1)
             this.set.questions.splice(this.questions.indexOf(question),1)
         //   for (let i=index-1; i<(this.questions.length); i++){
         ///   this.questions[i].index = this.questions[i].index-1

      //  }}
         }
  },
  created(){
    if (this.user.username == null){
      router.push('/login')
    }
  }
};
</script>

<style>
#rounded-card {
  border-radius: 20px;
}
#margini {
  margin-top: 15px;
  margin-bottom: 15px;
}
.box{
  box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02)
}
</style>
