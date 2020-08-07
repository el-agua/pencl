<template>
  <section class="section">
     <div class="columns is-centered">
      <div class="is-size-3 has-text-black has-text-centered">
               <strong>Sign Up</strong>
              </div>
      </div>
      <div class="columns is-centered has-text-centered">
      <div class="is-size-4 has-text-dark">
              To infinity and beyond.
              </div>
      </div>
    <div class="columns is-centered">
      <div class="column is-4">
        <div class="box">
          <div class="container">
              <div class="columns is-centered">
                <div class="column is-12">
                  <b-field 
                  :type="{
                      'is-danger': ($v.email.email == false)||(errors.email==false),
                    }"
                    :message="{
                      'Please enter a valid email!':
                        ($v.email.email == false) &&(email != ''),
                        'This field is required!': (errors.email==false)
                    }">
                    <b-input icon="mail" size="is-large" @blur="emailCheck" placeholder="Email" type="email" v-model="email">
                    </b-input>
                  </b-field>
                </div>
              </div>
              <div class="columns is-centered">
                <div class="column is-12">
                  <b-field
                  
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
                    icon="account"
                      placeholder="Username"
                      type="text"
                      v-model="username"
                      @blur="usernameCheck"
                      size="is-large"
                    >
                    </b-input>
                  </b-field>
                </div>
              </div>
              <div class="columns is-centered">
                <div class="column is-6">
                  <b-field 
                  :type="{
                      'is-danger': (errors.password==false),
                    }"
                    :message="{
                        'This field is required!': (errors.password==false)
                    }">
                    <b-input
                    icon="lock"
                      placeholder="Password"
                      type="password"
                      v-model="password"
                      @blur="passwordCheck"
                      size="is-large"
                    >
                    </b-input>
                  </b-field>
                </div>
                <div class="column is-6">
                  <b-field
                    
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
                      icon="lock"
                      size="is-large"
                    >
                    </b-input>
                  </b-field>
                </div>
              </div>
              <div class="columns is-centered has-text-centered">
                <div class="column is-12">
                  <b-button type="is-secondary" size="is-large" @click="submitForm" expanded>
                    <strong>Register</strong>
                  </b-button>
                  </div>
              </div>
                
            </div>
          </div>
      </div>
    </div>
    <div class="columns is-centered">
              <div class="has-text-centered">
                <router-link to="/login" class="is-size-7"
                  >Already have an account?</router-link
                >
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
.box{
  box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02)
}
</style>
