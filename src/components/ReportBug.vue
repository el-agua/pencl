<template>
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Report Bug</p>
                    </header>
                    <section class="modal-card-body">
                        <b-field label="Report Bug">
                            <b-input
                                type="textarea"
                                v-model="desc"
                                placeholder="Description of Bug"
                                required>
                            </b-input>
                        </b-field>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="$parent.close()">Close</button>
                        <button class="button is-primary" type="button" @click="report">Go</button>
                    </footer>
                </div>
            
</template>

<script>
import {bugService} from '../services/bugService'
    export default{
        name: 'ReportBug',
        props:['user'],
        data(){
            return{
                desc: ''
            }
        },
        methods:{
            report(){
                bugService.newBug(this.desc, this.$route.name, this.user)
                .then(() => {
                    this.$parent.close()
                    this.$buefy.toast.open({
                    message: 'Bug Reported!',
                    type: 'is-success' 
                })
                }

                )
                .catch(() => {
                    this.$buefy.toast.open({
                    message: 'Oops! Our bug system seems to have a bug!',
                    type: 'is-danger'
                }
                )}
                )
            }
        }

    }

</script>


<style>

</style>
