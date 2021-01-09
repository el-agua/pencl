<template>
  <div>
    <div
      id="rounded-cardD"
      @mouseover="showChev = true"
      @mouseleave="showChev = false"
      class="card"
    >
      <div class="card-content">
        <router-link :to="myLink">
          <p class="is-size-4 has-text-dark">
            <strong>{{ title }}</strong>
          </p>
          <p class="is-size-6 has-text-dark">{{ `Created by: ${creator}` }}</p>
          <p class="is-size-7 has-text-primary">
            {{ new Date(dates[0]).toUTCString() }}
          </p>
          <p class="is-size-7 has-text-primary">
            {{ new Date(dates[1]).toUTCString() }}
          </p>
        </router-link>
      </div>
      <footer class="card-footer is-coolA">
        <div class="card-footer-item">
          <div class="icon is-small">
            <transition name="fade">
              <i
                v-show="showChev == true"
                class="mdi mdi-24px mdi-chevron-down"
              ></i>
            </transition>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchContest",
  props: ["title", "dates", "link", "creator"],
  data() {
    return {
      myLink: "/contest/" + String(this.link),
      showChev: false,
    };
  },
  methods: {},
};
</script>

<style>
#rounded-cardD {
  border-radius: 6px;
  transition: 0.3s;
  height: 100%;
}
#rounded-cardD:hover {
  transform: scale(1.05);
}
#rounded-card {
  border-radius: 6px;
}
#margini {
  margin-bottom: 20px;
}
.is-coolA {
  background-color: #adefd1ff;
  color: white;
  border-color: transparent;
  border-radius: 0px 0px 6px 6px;
  transition: 0.3s;
}
.is-coolA:hover {
  background-color: #2b4570;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
