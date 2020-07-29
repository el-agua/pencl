<template>
  <section class="section">
    <div class="columns is-centered">
      <div class="column is-4">
        <div id="rounded-card" class="card">
          <div class="container">
            <header class="card-content">
              <p class="card-header-title is-centered is-size-3">
                Sign Up
              </p>
            </header>
            <div class="card-content">
              <div class="columns is-centered">
                <div class="column is-four-fifths">
                  <b-field label="Email"
                  :type="{
                      'is-danger': ($v.email.email == false)||(errors.email==false),
                    }"
                    :message="{
                      'Please enter a valid email!':
                        ($v.email.email == false) &&(email != ''),
                        'This field is required!': (errors.email==false)
                    }">
                    <b-input @blur="emailCheck" placeholder="Email" type="email" v-model="email">
                    </b-input>
                  </b-field>
                </div>
              </div>
              <div class="columns is-centered">
                <div class="column is-four-fifths">
                  <b-field
                    label="Username"
                    :type="{
                      'is-danger': ($v.username.alphaNum == false)|(errors.username==false)|(isunique==false),
                    }"
                    :message="{
                      'Only letters and numbers are to be used in a username.':
                        ($v.username.alphaNum == false) & (username != ''),
                        'This field is required!': (errors.username==false),
                        'This username has been taken!': (isunique==false)
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
                <div class="column is-two-fifths">
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
                <div class="column is-two-fifths">
                  <b-field
                    label="Confirm Password"
                    :type="{
                      'is-danger': $v.passConfirm.sameAsPassword == false,
                    }"
                    :message="{
                      'Passwords must match!':
                        $v.passConfirm.sameAsPassword == false,
                    }"
                  >
                    <b-input
                      placeholder="Confirm Password"
                      type="password"
                      v-model="passConfirm"
                    >
                    </b-input>
                  </b-field>
                </div>
              </div>
              <div class="columns is-centered">
                <div class="buttons">
                  <b-button type="is-secondary" @click="submitForm">
                    Register
                  </b-button>
                </div>
              </div>
              <div class="has-text-centered">
                <router-link to="/login" class="is-size-7"
                  >Already have an account?</router-link
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
import { required, email, alphaNum, sameAs } from "vuelidate/lib/validators";
import { userService } from "../services/userService";
import router from '../router'
export default {
  name: "SignUp",
  props: ['user'],
  data() {
    return {
        isunique: true,
      email: "",
      username: "",
      password: "",
      passConfirm: "",
      errors: {
          email: true,
          username: true,
          password: true

      },
    };
  },
  validations: {
    email: { required, email },
    username: { required, alphaNum },
    password: { required },
    passConfirm: { required, sameAsPassword: sameAs("password") },
  },
  methods: {
    submitForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("Hello");
      } else {
        this.unique()
      }
    },
    usernameCheck(){
        if (this.$v.username.required == false){
            this.errors.username=false
        }else{
            this.errors.username=true
        }
    },
    emailCheck(){
        if (this.$v.email.required == false){
            this.errors.email=false
        }else{
            this.errors.email=true
        }
    },
    passwordCheck(){
        if (this.$v.password.required == false){
            this.errors.password=false
        }else{
            this.errors.password=true
        }
    },
    unique() {
      userService.getUsernames(this.username).then((val) => {
        this.isunique = val;
      });
      this.submit();
    },
    submit() {
    const user = {
        email: this.email,
        username: this.username,
        password: this.password
    }
    userService.register(user);
      
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
