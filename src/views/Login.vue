<template>
  <section class="section">
    <div class="columns is-centered">
      <div class="column is-4">
        <div id="rounded-card" class="card">
          <div class="container">
            <header class="card-content">
              <p class="card-header-title is-centered is-size-3">
                Login
              </p>
            </header>
            <div class="card-content">
              <div class="columns is-centered">
                <div class="column is-four-fifths">
                  <b-field
                    label="Username"
                    :type="{
                      'is-danger': ($v.username.alphaNum == false)|(errors.username==false)|(match==false),
                    }"
                    :message="{
                      'A username should only have letters and numbers! Right?':
                        ($v.username.alphaNum == false) & (username != ''),
                        'This field is required!': (errors.username==false),
                        'The username and password does not match': (match==false)
                    }"
                  >
                    <b-input
                      placeholder="Username"
                      type="text"
                      v-model="username"
                      @blur="usernameCheck"
                    >
                    </b-input>
                  </b-field>
                </div>
              </div>
              <div class="columns is-centered">
                <div class="column is-four-fifths">
                  <b-field label="Password"
                  :type="{
                      'is-danger': (errors.password==false),
                    }"
                    :message="{
                        'This field is required!': (errors.password==false)
                    }">
                    <b-input
                      placeholder="Password"
                      type="password"
                      v-model="password"
                      @blur="passwordCheck"
                    >
                    </b-input>
                  </b-field>
                </div>
              </div>
              <div class="columns is-centered">
                <div class="buttons">
                  <b-button type="is-secondary" @click="submitForm">
                    Login
                  </b-button>
                </div>
              </div>
              <div class="has-text-centered">
                <router-link to="/signup" class="is-size-7"
                  >Don't have an account?</router-link
                >
              </div>
            </div>
          </div>
        </div>
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
  data() {
    return {
      match: true,
      username: "",
      password: "",
      errors: {
          username: true,
          password: true

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
          password: this.password
        }
        userService
          .login(user)
          .then((d) => {
            if (d.data.correct == true) {
              router.push("/");
              this.$emit('loginSuccess')
            } else {
              this.match = false;
            }
          })
          .catch((e) => {
            console.log(e)
            this.match = false;
          });
      }
    },
    usernameCheck(){
        if (this.$v.username.required == false){
            this.errors.username=false
        }else{
            this.errors.username=true
        }
    },
    passwordCheck(){
        if (this.$v.password.required == false){
            this.errors.password=false
        }else{
            this.errors.password=true
        }
    }
  },
  created(){
     if (this.user.username != null){
      router.push('/dashboard')
    }
  }
};
</script>

<style>
#rounded-card {
  border-radius: 20px;
}
</style>
