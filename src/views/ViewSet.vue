<template>
  <section class="section">
    <div class="columns is-centered">
      <div class="is-size-2">
        <strong>{{ name }}</strong>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="is-size-4">By: {{ creator }}</div>
    </div>
    <ViewQuestion
      v-for="question in questions"
      :key="question.id"
      :source="question.author"
      :answer="question.answers"
      :solution="question.solution"
      :number="question.id"
      :statement="question.statement"
    />
    <div class="columns is-centered"></div>
  </section>
</template>

<script>
import { questionService } from "../services/questionService";
import ViewQuestion from "../components/ViewQuestion";
export default {
  components: {
    ViewQuestion,
  },
  props: ["user"],
  data() {
    return {
      questions: [],
      name: "",
      creator: "",
    };
  },
  created() {
    questionService.getContestSet(this.$route.params.id).then((q) => {
      console.log(q);
      this.questions = q.question;
      this.name = q.set;
      this.creator = q.creator;
    });
  },
};
</script>

<style>
.box {
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.02);
}
</style>
