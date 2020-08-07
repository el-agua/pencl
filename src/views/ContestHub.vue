<template>
  <router-view :testID="id" :user="user"/>
</template>

<script>
export default {
    name: 'Hub',
    props:['user'],
    data(){
        return{
            id : this.$route.params.id
        }
    }
}
</script>

<style>
.box{
  box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02)
}
</style>