<template>
  <section class="section">
    <div v-if="mathLoaded">
      <Timer
        :timerStart="timerStart"
        @timesUp="finishTest"
        :duration="duration"
      />
      <DisplayQuestion
        ref="questionModel"
        @answerSend="appendAnswer"
        v-for="question in questions"
        :key="question.id"
        :number="question.id"
        :existingAnswer="existingAnswers[question.id - 1]"
        :statement="question.statement"
      />
    </div>
    <div class="columns is-centered" id="plzmargin">
      <div class="buttons">
        <b-button size="is-medium" @click="submitTest" class="is-triple">
          <strong>Submit</strong>
        </b-button>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import DisplayQuestion from "../components/DisplayQuestion";
import Timer from "../components/Timer";
import { questionService } from "../services/questionService";
import { contestService } from "../services/contestService";
import router from "../router";

export default {
  name: "Exam",
  components: {
    DisplayQuestion,
    Timer,
  },
  props: ["user", "testID"],
  data() {
    return {
      answers: [],
      setId: "",
      duration: 2400,
      questions: [],
      timerStart: Date.now(),
      existingAnswers: [],
      counter: 0,
      submit: false,
      mathLoaded: false,
    };
  },
  methods: {
    loadTheMath() {
      contestService
        .loadMath(this.testID)
        .then((id) => {
          console.log(id.duration);
          console.log("Hello");
          contestService
            .autosave(this.$route.params.userID, this.testID, this.answers)
            .then((obj) => {
              console.log(obj);
              if (
                Date.now() - obj.timerStart >= id.duration * 60000 ||
                obj.finished == true
              ) {
                console.log(obj.finished);
                this.finishTest();
              } else {
                this.timerStart = obj.timerStart;

                console.log(obj);
                this.duration = id.duration * 60;
                questionService.getContestSet(id.setId).then((q) => {
                  console.log(q);
                  this.questions = q.question;
                  for (let i = 0; i < this.questions.length; i++) {
                    this.answers.push("");
                  }
                  if (obj.answers == {}) {
                    for (let z = 0; z < this.questions.length; z++) {
                      this.existingAnswers.push({ field: "" });
                    }
                  } else {
                    this.existingAnswers = obj.answers;
                  }
                  this.mathLoaded = true;
                  setInterval(() => {
                    for (let i = 0; i < this.questions.length; i++) {
                      this.$refs.questionModel[i].sendAnswer();
                      console.log("Hello");
                    }
                  }, 30000);
                });
              }
            });
        })
        .catch((e) => console.log(e));
    },

    appendAnswer(problem) {
      console.log("Yes");
      this.answers[problem.index - 1] = problem;
      this.counter++;
      if (this.counter == this.questions.length) {
        console.log(this.answers);
        this.autosaveQuestion();
        this.counter = 0;
      }
    },
    submitTest() {
      for (let i = 0; i < this.questions.length; i++) {
        this.$refs.questionModel[i].sendAnswer();
      }
      this.submit = true;
    },
    finishTest() {
      contestService.finish(this.$route.params.userID, this.testID).then(() => {
        router.push("/finish");
      });
    },
    autosaveQuestion() {
      contestService
        .autosave(this.$route.params.userID, this.testID, this.answers)
        .then((obj) => {
          this.timerStart = obj.timerStart;
          if (this.submit == true) {
            this.finishTest();
          }
        });
    },
  },
  created() {
    contestService
      .verifyCode(this.$route.params.userID, this.testID)
      .then((obj) => {
        if (obj.success == true) {
          console.log(obj.success);
          this.loadTheMath();
        } else {
          router.push("/signup");
        }
      })
      .catch((e) => {
        console.log(this.$route.params.userID);
        console.log(e);
        console.log("Hello");
        router.push("/signup");
      });
  },
};
</script>
<style>
.box {
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.02);
}
#plzmargin {
  margin-top: 20px;
}
</style>
