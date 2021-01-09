<template>
  <div class="columns is-centered">
    <div class="column is-6">
      <div class="box">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="is-size-2">Question {{ number }}</p>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <div class="buttons">
                <b-button
                  @click="deleteQuestion"
                  class="is-danger is-icon-circle"
                  icon-left="delete"
                >
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
              v-model="question.statement"
              required
            >
            </b-input>
          </b-field>
          <div v-if="question.statement != ''">
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
              v-model="question.solution"
            >
            </b-input>
          </b-field>
          <div v-if="question.solution != ''">
            <div class="is-size-6"><strong>Preview:</strong></div>
            <vue-mathjax :formula="question.solution"></vue-mathjax>
          </div>
        </div>
        <div id="littlefield">
          <div class="is-size-4"><strong>Source:</strong></div>
          <b-field>
            <b-input placeholder="Source" type="text" v-model="question.author">
            </b-input>
          </b-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueMathjax } from "vue-mathjax";

export default {
  name: "AddQuestion",
  components: {
    "vue-mathjax": VueMathjax,
  },
  props: ["number", "length", "questionShell"],

  data() {
    return {
      question: {
        id: this.number,
        statement: "",
        answers: "",
        solution: "",
        author: "",
      },
    };
  },
  methods: {
    sendQuestion() {
      if (this.question.statement == "") {
        this.question.statement = " ";
      }
      if (this.question.answers == "") {
        this.question.answers = " ";
      }
      if (this.question.solution == "") {
        this.question.solution = " ";
      }
      if (this.question.author == "") {
        this.question.author = " ";
      }
      this.question.id = this.number;
      this.$emit("questionSend", this.question);
    },
    deleteQuestion() {
      this.$emit("questionDelete", this.questionShell);
    },
  },
  created() {
    console.log([this.number, this.length]);
  },
};
</script>

<style>
#rounded-card {
  border-radius: 20px;
}
.is-icon-circle {
  border-radius: 9999px;
}
#littlefield {
  margin-bottom: 25px;
}
</style>
