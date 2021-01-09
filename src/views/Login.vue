<template>
  <section class="section">
    <div class="columns is-centered has-text-centered">
      <div id="shadowy" class="is-size-3 has-text-black">
        <strong>Login</strong>
      </div>
    </div>
    <div class="columns is-centered has-text-centered">
      <div class="is-size-4 has-text-dark">
        Greatness awaits.
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-3">
        <div class="box">
          <div class="container">
            <div class="columns is-centered">
              <div class="column is-12">
                <b-field
                  :type="{
                    'is-danger':
                      ($v.username.alphaNum == false)
                      | (errors.username == false)
                      | (match == false),
                  }"
                  :message="{
                    'A username should only have letters and numbers! Right?':
                      ($v.username.alphaNum == false) & (username != ''),
                    'This field is required!': errors.username == false,
                    'The username and password does not match': match == false,
                  }"
                >
                  <b-input
                    placeholder="Username"
                    type="text"
                    size="is-large"
                    icon="account"
                    v-model="username"
                    @blur="usernameCheck"
                  >
                  </b-input>
                </b-field>
              </div>
            </div>
            <div class="columns is-centered">
              <div class="column is-12">
                <b-field
                  :type="{
                    'is-danger': errors.password == false,
                  }"
                  :message="{
                    'This field is required!': errors.password == false,
                  }"
                >
                  <b-input
                    placeholder="Password"
                    icon="lock"
                    type="password"
                    size="is-large"
                    v-model="password"
                    @blur="passwordCheck"
                  >
                  </b-input>
                </b-field>
              </div>
            </div>
            <div class="columns is-centered has-text-centered">
              <div class="column is-12">
                <b-button
                  size="is-large"
                  type="is-secondary"
                  @click="submitForm"
                  expanded
                >
                  <strong>Login</strong>
                </b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="has-text-centered">
        <router-link to="/signup" class="is-size-7"
          >Don't have an account?</router-link
        >
      </div>
    </div>
  </section>
</template>

<script>
import { required, alphaNum } from "vuelidate/lib/validators";
import { userService } from "../services/userService";
import router from "../router";

export default {
  name: "Login",
  props: ["user"],
  data() {
    return {
      cats: "cool",
      match: true,
      username: "",
      password: "",
      errors: {
        username: true,
        password: true,
      },
    };
  },
  validations: {
    username: { required, alphaNum },
    password: { required },
  },
  methods: {
    submitForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("Hello");
      } else {
        const user = {
          username: this.username,
          password: this.password,
        };
        userService
          .login(user)
          .then((d) => {
            if (d.data.correct == true) {
              router.push("/");
              this.$emit("loginSuccess");
            } else {
              this.match = false;
            }
          })
          .catch((e) => {
            console.log(e);
            this.match = false;
          });
      }
    },
    usernameCheck() {
      if (this.$v.username.required == false) {
        this.errors.username = false;
      } else {
        this.errors.username = true;
      }
    },
    passwordCheck() {
      if (this.$v.password.required == false) {
        this.errors.password = false;
      } else {
        this.errors.password = true;
      }
    },
  },
  created() {
    this.cats = this.user.username;
    if (this.user.username != null) {
      this.cats = "notcool";
      router.push("/dashboard");
    }
  },
};
</script>

<style>
#rounded-card {
  border-radius: 4px;
}
.padd {
  padding: 12px;
}
.box {
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.02);
}
</style>
