<template>
<div class="columns is-centered">
  <p class="is-size-5" @click="setTimer" >Remaining time: {{Math.floor(timeSecs/3600)}} hours {{Math.floor((timeSecs%3600)/60)}} minutes {{Math.floor(timeSecs%60)}} seconds</p>
</div>
</template>

<script>
export default {
    name: 'Timer',
    props:['duration','timerStart'],
    data(){
        return{
            initialDate: this.timerStart,
            timeSecs: 0
        }
    },
    methods:{
        setTimer(){
           
            setInterval(() => {
                if (this.timeSecs >= 0){
                this.timeSecs = (this.duration-((Date.now()-this.timerStart)/1000))
            }else{
                this.$emit('timesUp')
            }}, 1000)
            
        }
    },
    mounted: function () {
    this.$nextTick(function () {
        
     this.setTimer()
     
  })
}

}
</script>

<style>

</style>