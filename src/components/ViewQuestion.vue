<template>
  <div class="columns is-centered">
    <div class="column is-5">
      <div id="rounded-cardVQ" class="card">
            
              <div id="blue-bar" class="card-header">
                  <div class="card-header-title">
                    <div v-show="solutionOn == false">
              <div class="is-size-4">
                
                <strong class="has-text-light">Question {{ number }}</strong>
              </div>
              </div>
               <div v-show="solutionOn == true">
            <div class="is-size-4">
              <strong class="has-text-light">Solution {{ number }}</strong>
            </div>
              </div>
              </div>
              </div>
          <div class="card-content" @click="solutionOn = !solutionOn">
            <div v-show="solutionOn == false">
              <div>
                <vue-mathjax :formula="question.statement"></vue-mathjax>
              </div>
            </div>
            <div v-show="solutionOn == true">
            <div >
              <div><strong>Answer:</strong> {{ question.answer }}</div>
            </div>
            <div id="margina">
              
              <vue-mathjax :formula="question.solution"></vue-mathjax>
    
            </div>
            </div>
            <div class="is-size-7">
                Source: ({{(source==' ')?'me':source}})
              </div>
            </div>
         
            
          </div>
          
      
      </div>
  </div>
</template>

<script>
import { VueMathjax } from "vue-mathjax";
export default {
  props: ["statement", "number", "solution", "answer","source"],
  components: {
    "vue-mathjax": VueMathjax,
  },
  data() {
    return {
      question: {
        statement: this.statement,
        answer: this.answer,
        solution: this.solution,
      },
      solutionOn: false,
    };
  },
};
</script>

<style>
#rounded-cardVQ {
  border-radius: 6px;
}
#margina{
  margin-top: 10px;
  margin-bottom: 10px;
  
}
#blue-bar{
  background-color: #2B4570;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}


</style>
