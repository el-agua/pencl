<template>
  <b-navbar wrapper-class="container" spaced>
    <template slot="brand">
      <b-navbar-item id="bingbong" tag="router-link" :to="{ path: '/' }">
      </b-navbar-item>
    </template>
    <template v-if="user.username != null" slot="start">
      <b-navbar-item
        id="splititup"
        tag="router-link"
        class="has-text-black has-text-centered"
        v-for="menuItem in menuItems"
        :key="menuItem.id"
        :to="menuItem.link"
      >
        <span></span>
        {{ menuItem.name }}
      </b-navbar-item>
    </template>
    <template v-else slot="start">
      <b-navbar-item
        id="splititup"
        tag="router-link"
        class="has-text-black has-text-centered"
        v-for="defaultItem in defaultItems"
        :key="defaultItem.id"
        :to="defaultItem.link"
      >
        <span></span>
        {{ defaultItem.name }}
      </b-navbar-item>
    </template>
    <template slot="end">
      <div>
        <b-navbar-item v-if="user.username == null" tag="div">
          <div class="buttons" id="centerplz">
            <a href="/signup" class="button is-secondary is-outlined">
              Sign up
            </a>
            <a href="/login" class="button is-primary is-outlined"> Log in </a>
          </div>
        </b-navbar-item>
        <b-navbar-item
          v-show="user.username != null && windowWidth >= 1023"
          tag="div"
          class="has-text-centered"
        >
          <b-navbar-dropdown class="has-text-black" :label="user.username">
            <b-navbar-item href="/account"> Account </b-navbar-item>
            <b-navbar-item @click="logout"> Logout </b-navbar-item>
          </b-navbar-dropdown>
        </b-navbar-item>
        <b-navbar-item
          v-show="user.username != null && windowWidth < 1023"
          tag="div"
          class="has-text-centered"
        >
          <b-navbar-item href="/account"> Account </b-navbar-item>
          <b-navbar-item @click="logout"> Logout </b-navbar-item>
        </b-navbar-item>
      </div>
    </template>
  </b-navbar>
</template>

<script>
import { userService } from "../services/userService";
import router from "../router";
export default {
  name: "NavBar",
  props: ["user"],
  data() {
    return {
      windowWidth: window.innerWidth,
      username: "coolio5000",
      loggedIn: true,
      menuItems: [
        {
          id: 1,
          name: "Contests",
          link: "/findcontest",
          icon: "lead-pencil",
          color: "is-secondary",
        },
        {
          id: 2,
          name: "Browse",
          link: "/search",
          icon: "magnify",
          color: "is-secondary",
        },
        {
          id: 3,
          name: "Dashboard",
          link: "/dashboard",
          icon: "view-dashboard",
          color: "is-secondary",
        },
      ],
      defaultItems: [
        {
          id: 1,
          name: "Browse",
          link: "/search",
          icon: "magnify",
          color: "is-secondary",
        },
        {
          id: 2,
          name: "Contests",
          link: "/findcontest",
          icon: "lead-pencil",
          color: "is-secondary",
        },
      ],
    };
  },
  methods: {
    logout() {
      userService.logout().then(() => {
        router.push("/login");
        this.$router.go();
      });
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>

<style>
#bingbong {
  background: url("../assets/parachutefunpurple.png") no-repeat center center;
  background-size: 42px;
  width: 42px;
  padding: 10px;
  margin-left: 5px;
}
#bingbang {
  background: url("../assets/parachutefunblue.png") no-repeat center center;
  background-size: cover;
  width: 56px;
  margin-right: 10px;
}
#splititup {
  margin-left: 30px;
}
#centerplz {
  justify-content: center;
}
@media (max-width: 1023px) {
  #splititup {
    margin-left: 0px;
  }
}
</style>
