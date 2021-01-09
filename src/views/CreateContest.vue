<template>
  <section class="section">
    <div class="columns is-centered has-text-centered">
      <div class="is-size-3 has-text-black">
               <strong>Create Contest</strong>
              </div>
      </div>
      <div class="columns is-centered has-text-centered">
      <div class="is-size-4 has-text-dark">
              Making memories.
              </div>
      </div>
    <div class="columns is-centered">
      <div class="column is-4">
        <div class="box">
          <div class="container">
            
              
            
           
                <div class="columns is-centered has-text-centered">
            
            <div class="is-size-4"><strong>Planning & Setup</strong></div>
            </div>
              <div class="columns is-centered">
                <div class="column is-12">
                     
                  <b-field label="Contest Name"
                  :type="{
                      'is-danger': (errors.contestName==false),
                    }"
                    :message="{
                        'This field is required!': (errors.contestName==false)
                    }">
                    <b-input size="is-large" @blur="contestNameCheck" v-model="contestName" placeholder="Contest Name" type="text">
                    </b-input>
                  </b-field>
                </div>
              </div>
              
              <div class="columns is-centered">
                <div class="column is-12">
                  <b-field label="Start of Testing Window"
                  :type="{
                      'is-danger': (errors.dates==false),
                    }"
                    :message="{
                        'This field is required!': (errors.dates==false)
                    }">
          <b-datetimepicker
          size="is-large"
            placeholder="Click to select..."
            :min-datetime="minDate"
            :max-datetime="dates[1]"
            v-model="dates[0]"
            @blur="datesCheck">
        </b-datetimepicker>
    </b-field>
     </div>
            </div>
             <div class="columns is-centered">
                <div class="column is-12">
     <b-field label="End of Testing Window"
                  :type="{
                      'is-danger': (errors.dates==false),
                    }"
                    :message="{
                        'This field is required!': (errors.dates==false)
                    }">
          <b-datetimepicker
          size="is-large"
            placeholder="Click to select..."
            :min-datetime="dates[0]"
            v-model="dates[1]"
            @blur="datesCheck">
        </b-datetimepicker>
    </b-field>
                </div>
            </div>
             <div class="columns is-centered">
                <div class="column is-12">
                     
                  <b-field label="Duration (in minutes)"
                  :type="{
                      'is-danger': ($v.duration.integer == false)||(errors.duration==false),
                    }"
                    :message="{
                      'Please enter an integer!':
                        ($v.duration.integer == false) && (duration != ''),
                        'This field is required!': (errors.duration==false)
                    }">
                    <b-input size="is-large" @blur="durationCheck" v-model="duration" placeholder="Duration" type="text">
                    </b-input>
                  </b-field>
                </div>
              </div>
            <div class="columns is-centered">
                <div class="column is-12">
                  <b-field label="Description">
                    <b-input size="is-large" v-model="desc" placeholder="Description" type="textarea">
                    </b-input>
                  </b-field>
                </div>
              </div>
               <div class="columns is-centered">
                <div class="column is-12">
                  <b-field label="Rules">
                    <b-input size="is-large" v-model="rules" placeholder="Rules" type="textarea">
                    </b-input>
                  </b-field>
                </div>
              </div>
            <div class="columns is-centered has-text-centered">
            
            <div class="is-size-4"><strong>Awarding Points</strong></div>
            </div>
            <div class="columns is-centered">
                <div class="column is-12">
                  <b-field label="Points Per Correct Answer"
                  :type="{
                      'is-danger': ($v.score0.decimal == false)||(errors.score0==false),
                    }"
                    :message="{
                      'Please enter a number...':
                        ($v.score0.decimal == false) && (score0 != ''),
                        'This field is required!': (errors.score0==false)
                    }">
                    <b-input size="is-large" @blur="score0Check" v-model="score0" placeholder="Points Per Correct Answer" type="text">
                    </b-input>
                  </b-field>
                </div>
              </div>
              <div class="columns is-centered">
                <div class="column is-12">
                  <b-field label="Points Per Blank Answer"
                  :type="{
                      'is-danger': ($v.score1.decimal == false)||(errors.score1==false),
                    }"
                    :message="{
                      'Please enter a number...':
                        ($v.score1.decimal == false) && (score1 != ''),
                        'This field is required!': (errors.score1==false)
                    }">
                    <b-input size="is-large" @blur="score1Check" v-model="score1" placeholder="Points Per Blank Answer" type="text">
                    </b-input>
                  </b-field>
                </div>
              </div>
              <div class="columns is-centered">
                <div class="column is-12">
                  <b-field label="Penalty Per Incorrect Answer"
                  :type="{
                      'is-danger': ($v.score2.decimal == false)||(errors.score2==false),
                    }"
                    :message="{
                      'Please enter a number...':
                        ($v.score2.decimal == false) && (score2 != ''),
                        'This field is required!': (errors.score2==false)
                    }">
                    <b-input size="is-large" @blur="score2Check" v-model="score2" placeholder="Penalty Per Incorrect Answer" type="text">
                    </b-input>
                  </b-field>
                </div>
              </div>
              
                <div class="columns is-centered has-text-centered">
            
            <div class="is-size-4"><strong>Problem Sets</strong></div>
            </div>
              <div class="columns is-centered">
                <div class="column is-12">
                 <b-field label="Contest Problem Set"
                 :type="{
                      'is-danger': (errors.testSet==false),
                    }"
                    :message="{
                        'This field is required!': (errors.testSet==false)
                    }">
               <b-select size="is-large" @blur="testSetCheck" v-model="testSet" placeholder="Problem Set" expanded>
                <option v-for="sets in objectSet" :key="sets.set">
                    {{sets.set}}
                </option>

                
            </b-select>
            </b-field>
            </div>

              </div>
              <div  class="columns is-centered has-text-centered">
                  <div class="is-size-6">Warning: Using public sets may decrease the quality of your test.</div>
                </div>
              <section class="section">
               <div class="columns is-centered has-text-centered">
            <b-field >
              <b-checkbox size="is-medium" v-model="linkOnly">Contest is only accessible by link.</b-checkbox>
              </b-field>
              </div>
              </section>
              <div class="columns is-centered">
                <div class="column is-12">
                <div class="buttons">
                  <b-button type="is-secondary" size="is-large" @click="submitForm" expanded>
                   <strong> Create</strong>
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
import {questionService} from "../services/questionService"
import {contestService} from "../services/contestService"
import { required, decimal, integer } from "vuelidate/lib/validators";
import router from '../router'
export default {
  name: "CreateContest",
  props: [
    'user'
  ],
  data() {
    const today = new Date()
    return {
      score0: '1',
      score1: '0',
      score2: '0',

      linkOnly: false,
      contestName: "",
      duration: "",
      setId: "",
      desc: "",
      rules:"",
      listOfSets: [],
      objectSet: [],
      creator: "",
      scoring: [1,0,0],
      score:['1','0','0'],
      testSet: "",
      minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      dates: [null, null],
      errors: {
        contestName: true,
        dates: true,
        duration: true,
        score0: true,
        score1: true,
        score2: true,
        testSet: true
      },
      
    };
  },
  validations: {
    contestName: {required},
    duration: {required, integer},
    dates: {required},
    score0: {required, decimal},
    score1: {required, decimal},
    score2: {required, decimal},
    testSet: {required}

  },
  methods: {
    submitForm() {
    this.$v.$touch();
     if (this.$v.$invalid) {
       console.log("Hello");
      } else {
        var date0 = new Date(this.dates[0])
        var date1 = new Date(this.dates[1])
        var secs0 = date0.getTime()
        var secs1 = date1.getTime()
      if (secs0 <= secs1 & this.dates[0]!=null & this.dates[1]!=null){
      this.score[0]=this.score0
      this.score[1]=this.score1
      this.score[2]=this.score2
      this.setId = this.coolFunction(this.testSet)
      this.scoring = this.score.map(this.nFunction)
      this.creator = this.user.username
      const contest ={
        linkOnly: this.linkOnly,
        contestName: this.contestName,
        dates: this.dates,
        duration: this.duration,
        scoring: this.scoring,
        setId: this.setId,
        creator: this.creator,
        desc: this.desc,
        rules: this.rules
      }
      console.log(contest)
  contestService.addContest(contest)
  .then(()=>{
    router.push('dashboard')
  })
     }
      }
    },
    yes(){
            this.setId = this.coolFunction(this.testSet)

        console.log(this.setId)
    },
    myFunction(value) {
            return value.set;
},
  nFunction(value) {
            return Number(value);
},
coolFunction(value) {
  for (let item in this.objectSet){
    console.log(this.objectSet[item])
    if (this.objectSet[item].set == value){
      
      return this.objectSet[item]._id;
    }
  }
            
},
contestNameCheck(){
        if (this.$v.contestName.required == false){
            this.errors.contestName=false
        }else{
            this.errors.contestName=true
        }
    },
    datesCheck(){
        var date0 = new Date(this.dates[0])
        var date1 = new Date(this.dates[1])
        var secs0 = date0.getTime()
        var secs1 = date1.getTime()
        if (this.$v.dates.required == false || secs0 > secs1 || this.dates[0]==null || this.dates[1]==null){
            this.errors.dates=false
        }else{
            this.errors.dates=true
        }
    },
    durationCheck(){
        if (this.$v.duration.required == false){
            this.errors.duration=false
        }else{
            this.errors.duration=true
        }
    },
    score0Check(){
        if (this.$v.score0.required == false){
            this.errors.score0=false
        }else{
            this.errors.score0=true
        }
    },
    score1Check(){
        if (this.$v.score1.required == false){
            this.errors.score1=false
        }else{
            this.errors.score1=true
        }
    },
    score2Check(){
        if (this.$v.score2.required == false){
            this.errors.score2=false
        }else{
            this.errors.score2=true
        }
    },
    testSetCheck(){
        if (this.$v.testSet.required == false){
            this.errors.testSet=false
        }else{
            this.errors.testSet=true
        }
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      if (this.user.username != null){
        questionService.getAllSets(this.user.username)
            .then(u =>{
                this.objectSet = u
                console.log(u)
            })
            .catch(e =>{
                console.log(e)
            })
    }else{
        router.push('/login')
    }
     
     
  })
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
