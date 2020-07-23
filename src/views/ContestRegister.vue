<template>
  <section class="section">
    <div class="columns is-centered">
      <div class="column is-half">
        <div id="rounded-card" class="card is-shadowless">
          <div class="container">
            <header class="card-content">
              <p class="card-header-title is-centered is-size-3">
                Register
              </p>
            </header>
            <div class="card-content">
              <div class="columns is-centered">
                <div class="column is-four-fifths">
                  <b-field
                    label="Display Name"
                    :type="{
                      'is-danger': (errors.display==false),
                    }"
                    :message="{
                        'This field is required!': (errors.display==false),
                  
                    }"
                  >
                    <b-input
                      placeholder="Display Name"
                      type="text"
                      v-model="display"
                      @blur="displayCheck"
                    >
                    </b-input>
                  </b-field>
                </div>
              </div>
              <div class="columns is-centered">
                <div class="column is-four-fifths">
                  <b-field label="Email"
                  :type="{
                      'is-danger': ($v.email.email == false)||(errors.email==false),
                    }"
                    :message="{
                      'Please enter a valid email!':
                        ($v.email.email == false) && (email != ''),
                        'This field is required!': (errors.email==false)
                    }">
                    <b-input @blur="emailCheck" placeholder="Email" type="email" v-model="email">
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
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { required, email} from "vuelidate/lib/validators";
import { contestService } from "../services/contestService";
import router from "../router"
export default {
  name: "Login",
  props:['testID'],
  data() {
    return {
      display: "",
      email: "",
      errors: {
          display: true,
          email: true

      },
      testCode: (Math.floor(Date.now()*Math.random())).toString(17)
    };
  },
  validations: {
    display: { required},
    email: { required, email },
  },
  methods: {
    submitForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("Hello");
      } else {
        const participant = {
          displayName: this.display,
          email: this.email,
          testCode: this.testCode
        }
        console.log('hello')
        contestService.newParticipant(participant, this.testID)
        .then(
          () => {
            router.push('/')
            console.log('Hello')
          }
        )
        .catch(e => {
          this.$router.go()
          console.log(e)
        }
        )
        

      }
    },
    displayCheck(){
        if (this.$v.display.required == false){
            this.errors.display=false
        }else{
            this.errors.display=true
        }
    },
    emailCheck(){
        if (this.$v.email.required == false){
            this.errors.email=false
        }else{
            this.errors.email=true
        }
    }
  },
  created(){
    contestService.publicContest(this.testID).then((contest) => {
        if (contest.contestName == null) {
          router.push('/yikes');
        } else {

          if (
        (Date.now() <= Date.parse(contest.dates[0])) ||
        (Date.now() >= Date.parse(contest.dates[1]))
      ){
          router.push('/yikes');
      }
        }
    }
    )
  }
};
</script>

<style>
#rounded-card {
  border-radius: 20px;
}
</style>
