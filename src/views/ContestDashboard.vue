<template>
  <div class="container">
    <section class="section">
      <div class="columns is-centered has-text-centered">
        <div class="is-size-1">
          <strong>{{ contestName }}</strong>
        </div>
      </div>
      <div class="columns is-centered has-text-centered">
        <a class="is-size-5" :href="`/contest/${$route.params.id}`"
          ><strong>Test Dashboard</strong></a
        >
      </div>
      <section class="section">
        <div class="card" id="rounded-cardZ">
          <div class="card-header" id="header-color">
            <div class="card-header-title">
              <div class="is-size-3">
                <strong class="has-text-light">Test Participants:</strong>
              </div>
            </div>
          </div>
          <b-table :data="particData" v-if="particData.length != 0" striped>
            <template slot-scope="props">
              <b-table-column field="displayName" label="Display Name" centered>
                {{ props.row.displayName }}
              </b-table-column>
              <b-table-column field="testCode" label="Test Code" centered>
                {{ props.row.testCode }}
              </b-table-column>
              <b-table-column field="email" label="Email" centered>
                {{ props.row.email }}
              </b-table-column>

              <b-table-column label="Delete" centered>
                <button
                  @click="deleteParticipant(props.row.testCode)"
                  class="button is-primary is-small"
                >
                  Delete
                </button>
              </b-table-column>
            </template>
          </b-table>
          <div class="card-content" v-else>
            <div class="is-size-6">No participants yet!</div>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="card" id="rounded-cardZ">
          <div class="card-header" id="header-color">
            <div class="card-header-title">
              <div class="is-size-3">
                <strong class="has-text-light">Test Results:</strong>
              </div>
            </div>
          </div>

          <b-table
            :data="submissionData"
            v-if="submissionData.length != 0"
            striped
          >
            <template slot-scope="props">
              <b-table-column field="index" label="Place" centered>
                {{ props.index + 1 }}
              </b-table-column>
              <b-table-column field="displayName" label="Display Name" centered>
                {{ props.row.displayName }}
              </b-table-column>
              <b-table-column field="userID" label="Test Code" centered>
                {{ props.row.userID }}
              </b-table-column>
              <b-table-column field="score" label="Score" centered>
                {{ props.row.score }}
              </b-table-column>
              <b-table-column field="date" label="Start Time" centered>
                <span class="tag is-triple">
                  {{ new Date(props.row.startTime).toUTCString() }}
                </span>
              </b-table-column>

              <b-table-column label="Delete" centered>
                <button
                  @click="deleteSubmission(props.row.userID)"
                  class="button is-primary is-small"
                >
                  Delete
                </button>
              </b-table-column>
            </template>
          </b-table>
          <div class="card-content" v-else>
            <div class="is-size-6">No submissions yet!</div>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="card" id="rounded-cardZ">
          <div class="card-header" id="header-color">
            <div class="card-header-title">
              <div class="is-size-3">
                <strong class="has-text-light">Results Distribution:</strong>
              </div>
            </div>
          </div>
          <div class="card-content">
            <Chart
              v-if="loaded"
              :chartdata="chartData"
              :options="chartOptions"
            />
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import { contestService } from "../services/contestService";
import Chart from "../components/Chart";
import router from "../router";
export default {
  components: {
    Chart,
  },
  props: ["user"],
  data() {
    return {
      loaded: false,
      contestName: "",
      particData: [],
      submissionData: [],
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Scores",
            data: [],
            backgroundColor: "#2B4570",
          },
        ],
      },
      chartOptions: {
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Submissions",
              },
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Scores",
              },
            },
          ],
        },
      },
    };
  },
  methods: {
    getOccurence(array, value) {
      return array.filter((v) => v === value).length;
    },
    deleteSubmission(code) {
      console.log(code);
      contestService
        .deleteSubmission(code, this.$route.params.id)
        .then((a) => {
          console.log(a);
          this.refresh();
        })
        .catch(() => router.push("/dashboard"));
    },
    deleteParticipant(code) {
      contestService.deleteParticipant(code, this.$route.params.id).then(() => {
        this.refresh();
      });
    },
    refresh() {
      contestService
        .getParticipants(this.user.username, this.$route.params.id)
        .then((u) => {
          if (u.participants == null) {
            router.push("/dashboard");
          }
          this.particData = u.participants;
          this.contestName = u.contestName;
          contestService.getResults(this.$route.params.id).then((b) => {
            let c = b.sort(function(x, y) {
              return y.score - x.score;
            });
            let scores = c.map((n) => n.score);
            let maxScore = scores[0];
            let arrayOfLabels = Array.from(Array(maxScore + 1).keys());
            let stringArrayOfLabels = arrayOfLabels.map((m) => String(m));
            let realScores = [];
            for (var i = 0; i <= maxScore; i++) {
              realScores.push(this.getOccurence(scores, i));
            }
            this.chartData.labels = stringArrayOfLabels;
            this.chartData.datasets[0].data = realScores;
            console.log({ realScores: realScores });
            console.log(stringArrayOfLabels);
            this.submissionData = c;
            this.loaded = true;
          });
        })
        .catch(() => {
          router.push("/dashboard");
        });
    },
  },
  mounted: function() {
    this.$nextTick(function() {
      if (this.user.username != null) {
        this.refresh();
      } else {
        router.push("/login");
      }
    });
  },
};
</script>

<style>
.box {
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.02);
}
#rounded-cardZ {
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.02);
  border-radius: 6px;
}
#header-color {
  background-color: #2b4570;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
</style>
