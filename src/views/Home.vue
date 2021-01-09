<template>
  <div>
    <section class="hero is-medium is-white">
      <div class="hero-body">
        <div class="container coolest">
          <h1 class="big-text has-text-weight-bold" id="margini">
            Be greater than <span class="has-text-primary">average.</span>
          </h1>
          <img class="right-img" src="../assets/greater.png" />

          <h1 class="is-size-5" id="margini">
            Create engaging online tests and problem sets with
            <strong class="has-text-secondary">Pencl.</strong>
          </h1>

          <div class="buttons" id="learning">
            <router-link to="/signup">
              <b-button
                icon-right="chevron-right"
                size="is-large"
                class="is-primary"
              >
                <strong> Sign Up Now</strong>
              </b-button>
            </router-link>
          </div>
        </div>
      </div>
    </section>
    <section class="hero is-medium is-light">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column">
              <div id="rounded-cardA" class="box">
                <div class="columns is-centered">
                  <div class="column is-five-sixths">
                    <div class="is-size-6 has-text-white doublespace">
                      <strong class="is-size-4 has-text-white">Create</strong>
                      Pencl users can create educational and engaging problem
                      sets. For math educators, typesetting tool LATEX is
                      supported!
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="column">
              <div id="rounded-cardB" class="box">
                <div class="columns is-centered">
                  <div class="column is-five-sixths">
                    <div class="is-size-6 has-text-white doublespace">
                      <strong class="is-size-4 has-text-white">Host</strong>
                      Pencl users can host contests based on their problem sets.
                      Some features include leaderboards, registration, timers,
                      and various contest managing features.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="column">
              <div id="rounded-cardA" class="box">
                <div class="columns is-centered">
                  <div class="column is-five-sixths">
                    <div class="is-size-6 has-text-white doublespace">
                      <strong class="is-size-4 has-text-white">Share</strong>
                      Pencl users can share their problem sets with other users!
                      Need practice problems? Search through a collection of
                      problems made by Kite users.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="hero is-medium is-white">
      <div class="hero-body">
        <div class="container coolest">
          <div class="columns is-centered">
            <img src="../assets/parachutefun.png" />
          </div>

          <div class="columns is-centered has-text-centered" id="learning">
            <router-link to="/signup">
              <b-button
                icon-right="chevron-right"
                size="is-medium"
                class="is-secondary is-centered"
              >
                <strong> Sign Up Now</strong>
              </b-button>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {};
  },
};
</script>
<style>
.big-text {
  font-size: 4rem;
}
.right-img {
  float: right;
}
#learning {
  margin-top: 30px;
}
#rounded-cardA {
  background-color: #ff8585;
  min-height: 224px;
}
#rounded-cardB {
  background-color: #583d72;
  min-height: 224px;
}

.doublespace {
  line-height: 2;
}
.box {
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.02);
}
</style>
