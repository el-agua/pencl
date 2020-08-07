<template>
<section class="section">
  <div class="container">
        <div class="columns is-centered">
        <div class="column is-4">
        <div class="box">
            
                <div class="columns is-centered">
                    <div class="is-size-4">My Account</div>
                    </div>
                    <div class="columns is-centered">
                    <div class="is-size-3"><strong>{{user.username}}</strong></div>
                    </div>
            
                    <div id="mar" class="columns is-centered">
                         <div class="column is-12">
                    <div class="buttons">
                        <b-button size="is-large" expanded  @click="changeEmail" class="is-primary">Change Email</b-button>
                    </div>
                    </div>
                    </div>
                    
                    
                    <div id="mar" class="columns is-centered">
                    <div class="column is-12">
                    <div class="buttons">
                        <b-button size="is-large" expanded  @click="changePassword" class="is-primary">Change Password</b-button>
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
import ChangePassword from '../components/ChangePassword'
import ChangeEmail from '../components/ChangeEmail'
import router from '../router'
export default {
    props:['user'],
    data(){
        return{
            
        }
    },
    methods:{
        changePassword(){
            this.$buefy.modal.open({ parent: this, component: ChangePassword, hasModalCard: true, props: {"user": this.user}})
        },
        changeEmail(){
            this.$buefy.modal.open({ parent: this, component: ChangeEmail, hasModalCard: true, props: {"user": this.user}})
        }
    },
    created(){
        if (this.user.username == null){
        router.push('/login')
    }
    }
}
</script>

<style>
    #same{
        width: 160px
    }
    #rounded-card {
  border-radius: 20px;
  padding-bottom: 20px;
}
.box{
  box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02)
}
</style>