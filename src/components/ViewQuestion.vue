<template>
  <div class="columns is-centered">
    <div class="column is-6">
      <div id="rounded-card" class="card">
        <div class="card-content" @click="solutionOn = !solutionOn">
            <div v-show="solutionOn == false">
              <div class="is-size-4">
                <strong>Question {{ number }}</strong>
              </div>

              <div id="margina">
                <vue-mathjax :formula="question.statement"></vue-mathjax>
              </div>
            </div>
          <div v-show="solutionOn == true">
            <div class="is-size-4">
              <strong>Solution {{ number }}</strong>
            </div>
            <div id="margina">
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
#rounded-card {
  border-radius: 6px;
}
#margina{
  margin-top: 10px;
  margin-bottom: 10px
}


</style>
