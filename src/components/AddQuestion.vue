<template>
  <div class="columns is-centered">
    <div class="column is-three-fifths">
      <div id="rounded-card" class="card is-shadowless">
        <div class="card-content">
          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <p class="is-size-1">Question {{question.index}}</p>
              </div>
            </div>
            <div class="level-left">
              <div class="level-item">
                <div class="buttons">
                  <b-button @click="deleteQuestion" class="is-danger">
                    Delete
                  </b-button>
                </div>
              </div>
            </div>

          </div>
          <div id="littlefield">
          <div class="is-size-4"><strong>Question:</strong></div>
           <b-field>
               
                    <b-input
                      placeholder="Question"
                      type="textarea"
                      size="is-medium"
                      v-model="question.statement"
                      required
                    >
                    </b-input>
            </b-field>
            <div v-if="question.statement!=''">
                <div class="is-size-6"><strong>Preview:</strong></div>
                <vue-mathjax :formula="question.statement"></vue-mathjax>
            </div>
            </div>
            <div id="littlefield">
          <div class="is-size-4"><strong>Answer:</strong></div>
           <b-field>
               
                    <b-input
                      placeholder="Answer"
                      type="text"
                      size="is-medium"
                      v-model="question.answers"
                      required
                    >
                    </b-input>
            </b-field>
            </div>
            <div id="littlefield">
          <div class="is-size-4"><strong>Solution:</strong></div>
           <b-field>
               
                    <b-input
                      placeholder="Solution"
                      type="textarea"
                      size="is-medium"
                      v-model="question.solution"
                    >
                    </b-input>
            </b-field>
            <div v-if="question.solution!=''">
                <div class="is-size-6"><strong>Preview:</strong></div>
                <vue-mathjax :formula="question.solution"></vue-mathjax>
            </div>
            </div>
            <div id="littlefield">
          <div class="is-size-4"><strong>Source:</strong></div>
           <b-field>
               
                    <b-input
                      placeholder="Source"
                      type="text"
                      size="is-medium"
                      v-model="question.author"
                    >
                    </b-input>
            </b-field>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {VueMathjax} from  "vue-mathjax"

export default {
  name: "AddQuestion",
  components:{
        "vue-mathjax": VueMathjax
},
props:[
        'number'
    ],

  data() {
    return {
      question:{
            index: this.number,
            statement: '',
            answers: '',
            solution: '',
            author: ''
            
            }
    };
  },
  methods: {
    sendQuestion(){
            this.$emit("questionSend", this.question)
        },
        deleteQuestion(){
            this.$emit("questionDelete", this.question.index)
        }
  },
};
</script>

<style>
#rounded-card {
  border-radius: 20px;
}
#littlefield{
  margin-bottom: 25px;
}
</style>
