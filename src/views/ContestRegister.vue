<template>
  <section class="section">
    <div class="columns is-centered">
      <div class="is-size-3 has-text-black">
               <strong>Contest Registration</strong>
              </div>
      </div>
      <div class="columns is-centered">
      <div class="is-size-4 has-text-dark">
              Do you dare join the gauntlet?
              </div>
      </div>
    <div class="columns is-centered">
      <div class="column is-4">
        <div class="box">
          
         
            
              <div class="columns is-centered">
                <div class="column is-12">
                  <b-field
                    
                    :type="{
                      'is-danger': (errors.display==false),
                    }"
                    :message="{
                        'This field is required!': (errors.display==false),
                  
                    }"
                  >
                    <b-input
                    icon="pencil"
                      placeholder="Display Name"
                      size="is-large"
                      type="text"
                      v-model="display"
                      @blur="displayCheck"
                    >
                    </b-input>
                  </b-field>
                </div>
              </div>
              <div class="columns is-centered">
                <div class="column is-12">
                  <b-field 
                  :type="{
                      'is-danger': ($v.email.email == false)||(errors.email==false),
                    }"
                    :message="{
                      'Please enter a valid email!':
                        ($v.email.email == false) && (email != ''),
                        'This field is required!': (errors.email==false)
                    }">
                    <b-input icon="mail" size="is-large" @blur="emailCheck" placeholder="Email" type="email" v-model="email">
                    </b-input>
                  </b-field>
                </div>
              </div>
              <div class="columns is-centered">
                <div class="column is-12">
                <div class="buttons">
                  <b-button size="is-large" type="is-secondary" @click="submitForm" expanded>
                    <strong>Register</strong>
                  </b-button>
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
             this.$buefy.dialog.alert({
                    title: 'Test Code',
                    message: `Your test code is: ${this.testCode}. Remember this code, as you will need it to take the exam.`,
                    confirmText: 'Got It!'
            })
            router.push(`/contest/${this.testID}`)
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
.box{
  box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02)
}
</style>
