<template>
  <section class="section" id="pandini">
    <div class="container">
      <div class="is-size-1">
        <strong>Dashboard:</strong>
        <b-tabs expanded @change="choose" class="block" size="is-large">
          <b-tab-item label="Tests" icon="file"></b-tab-item>
          <b-tab-item label="Problem Sets" icon="android-studio"></b-tab-item>
        </b-tabs>
      </div>
      <transition name="fade">
        <div class="contests" v-show="whichToShow == 'contests'">
          <div class="columns is-multiline is-flex">
            <div class="column is-4 is-12-mobile">
              <router-link to="/createContest">
                <div id="rounded-cardC" class="card is-vertical-center">
                  <div
                    class="card-content fat has-text-centered"
                    style="align-items: center"
                  >
                    <i class="mdi mdi-plus" style="font-size: 80px" />
                  </div>
                </div>
              </router-link>
            </div>
            <div
              class="column is-4 is-12-mobile "
              v-for="contest in contests"
              :key="contest._id"
            >
              <ContestPreview
                :numberOfPartic="contest.participants.length"
                :title="contest.contestName"
                :dates="contest.dates"
                :link="contest._id"
              />
            </div>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div class="problems" v-show="whichToShow == 'problems'">
          <div class="columns is-multiline is-flex">
            <div class="column is-4 is-12-mobile">
              <router-link to="/upload">
                <div id="rounded-cardC" class="card is-vertical-center">
                  <div
                    class="card-content fat has-text-centered"
                    style="align-items: center"
                  >
                    <i class="mdi mdi-plus" style="font-size: 80px" />
                  </div>
                </div>
              </router-link>
            </div>
            <div
              class="column is-4 is-12-mobile"
              v-for="set in sets"
              :key="set.index"
            >
              <Preview
                :priv="set.private"
                :title="set.set"
                :datec="set.datee"
                :link="set._id"
              />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import Preview from "../components/Preview";
import ContestPreview from "../components/ContestPreview";
import { questionService } from "../services/questionService";
import router from "../router";
import { contestService } from "../services/contestService";

export default {
  name: "Dashboard",
  components: {
    Preview,
    ContestPreview,
  },
  props: ["user"],
  data() {
    return {
      sets: [],
      contests: [],
      whichToShow: "contests",
    };
  },
  methods: {
    choose() {
      if (this.whichToShow == "contests") {
        this.whichToShow = "problems";
      } else {
        this.whichToShow = "contests";
      }
    },
  },

  mounted: function() {
    this.$nextTick(function() {
      if (this.user.username != null) {
        questionService
          .getAllSets(this.user.username)
          .then((u) => {
            this.sets = u.sort(function(x, y) {
              return Date.parse(y.datee) - Date.parse(x.datee);
            });
            console.log(u);
            contestService
              .getAllContests(this.user.username)
              .then((contests) => {
                console.log(contests);
                this.contests = contests.sort(function(x, y) {
                  return Date.parse(y.dates[0]) - Date.parse(x.dates[0]);
                });
              });
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        console.log("oop");
        router.push("/login");
      }
    });
  },
};
</script>

<style>
#margini {
  margin-bottom: 20px;
}
.is-vertical-center {
  display: flex;
  align-items: center;
}
.fat {
  width: 100%;
}
.cool {
  background-color: white;
}
.card {
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.02);
}
</style>
