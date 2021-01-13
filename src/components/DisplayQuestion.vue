<template>
  <div class="columns is-centered">
    <div class="column is-three-fifths">
      <div class="box">
        <div class="is-size-4">
          <strong>Question {{ answer.index }}</strong>
        </div>

        <div id="margina">
          <vue-mathjax :formula="question.statement"></vue-mathjax>
        </div>
        <div class="columns is-centered">
          <div class="column is-two-fifths">
            <b-field>
              <b-input placeholder="Answer" type="text" v-model="answer.field">
              </b-input>
            </b-field>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueMathjax } from "vue-mathjax";
//import { questionService } from "../services/questionService";
export default {
  name: "DisplayQuestion",
  props: ["number", "statement", "existingAnswer"],
  components: {
    "vue-mathjax": VueMathjax,
  },
  data() {
    return {
      answer: {
        index: this.number,
        field: this.existingAnswer.field,
      },
      question: {
        statement: this.statement,
      },
    };
  },
  methods: {
    sendAnswer() {
      this.$emit("answerSend", this.answer);
    },
  },
};
</script>

<style>
#rounded-card {
  border-radius: 20px;
}
#margina {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
