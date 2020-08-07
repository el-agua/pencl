<template>
<div class="container">
  <section class="section">
    <div class="columns is-centered">
      <div class="is-size-1">
        <strong>{{ contestData.contestName }}</strong>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="is-size-5">Organizer: {{ contestData.creator }}</div>
    </div>
     <div class="columns is-centered">
      <div v-if="contestData.desc!=null" class="is-size-3"><strong>Description:</strong></div>
    </div>
    <div class="container">
      <div id="predata" class="is-size-5">
        <strong>{{contestData.desc}}</strong>
      </div>
    </div>
    <div class="columns is-centered">
      <div v-if="contestData.rules!=null" class="is-size-3"><strong>Rules:</strong></div>
    </div>
  
      <div class="container">
      <div id="predata" class="is-size-5">
        <strong>{{contestData.rules}}</strong>
   
      </div>
    </div>

    <section class="section">
      <div id="margini">
        <div class="columns is-centered">
          <div class="is-size-3"><strong>Testing Window:</strong></div>
        </div>
        <div class="columns is-centered">
          <div class="is-size-5" v-if="contestData.dates">
            {{ new Date(contestData.dates[0]).toUTCString() }} to
            {{ new Date(contestData.dates[1]).toUTCString() }}
          </div>
        </div>
      </div>
      <div v-if="(done == false) & (start == true)">
        <div id="margini">
          <div class="columns is-centered">
            <div class="buttons">
              <b-button @click="prompt" class="is-triple is-large"
                ><strong>Start Contest</strong></b-button
              >
            </div>
          </div>
        </div>
        <div id="margini">
          <div class="columns is-centered">
            <div class="is-size-6">
              Not registered yet?
            </div>
          </div>
        </div>
      </div>
        <div v-if="done == false">
          <div class="columns is-centered">
            <div class="buttons" id="margini">
              <router-link :to="{ name: 'register' }">
                <b-button class="is-secondary is-medium">
                  <strong>Register</strong>
                </b-button>
              </router-link>
            </div>
          </div>
          </div>
      <div class="columns is-centered">
        <div class="is-size-3"><strong>Leaderboard:</strong></div>
      </div>
      <b-table
        :data="submissionData"
        v-if="submissionData.length != 0"
        striped
        hoverable
      >
        <template slot-scope="props">
          <b-table-column field="index" label="Place" centered>
            {{ props.index + 1 }}
          </b-table-column>
          <b-table-column field="displayName" label="Display Name" centered>
            {{ props.row.displayName }}
          </b-table-column>
          <b-table-column field="score" label="Score" centered>
            {{ props.row.score }}
          </b-table-column>
        </template>
      </b-table>
      <div class="columns is-centered" v-else>
        <div class="is-size-6">No submissions yet!</div>
      </div>
    </section>
  </section>
  </div>
</template>

<script>
import { contestService } from "../services/contestService";
import router from "../router";
export default {
  props: ["user", "testID"],
  data() {
    return {
      contestData: {},
      submissionData: [],
      done: false,
      start: false,
    };
  },
  methods: {
    prompt() {
      this.$buefy.dialog.confirm({
        title: "Rules",
        message: 'I Confirm that I agree to the rules of this contest.',
        trapFocus: false,
        confirmText: "Agree",
        onConfirm: () => {
          this.$buefy.dialog.prompt({
        message: `What's your test code?`,
        inputAttrs: {
          placeholder: "e.g. abc123",
          maxlength: 12,
        },
        trapFocus: false,
        onConfirm: (value) => {
          router.push(`/contest/${this.testID}/exam/${value}`);
        },
      });
        },
      })
      
    },
    refresh() {
      contestService.publicContest(this.testID).then((u) => {
        if (u.contestName == null) {
          router.push("/yikes");
        } else {
          this.contestData = u;

          if (Date.now() >= Date.parse(this.contestData.dates[1])) {
            this.done = true;
          }
          if (Date.now() >= Date.parse(this.contestData.dates[0])) {
            this.start = true;
          }
          contestService
            .publicResults(this.testID)
            .then((b) => {
              let c = b.sort(function(x, y) {
                return y.score - x.score;
              });
              console.log(b);
              this.submissionData = c;
            })

            .catch(() => {
              router.push("/");
            });
        }
      });
    },
  },
  mounted: function() {
    this.$nextTick(function() {
      this.refresh();
    });
  },
};
</script>

<style scoped>
#margini {
  margin-bottom: 40px;
}
.box{
  box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02)
}
#predata{
    white-space: pre-wrap;
}
</style>
