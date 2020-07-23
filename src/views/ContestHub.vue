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

</style>