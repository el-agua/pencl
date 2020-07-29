<template>
 <footer id="foots" class="footer">
  <div class="content has-text-centered">
    <p class="has-text-dark">
     "Sometimes the questions are complicated and the answers are simple." - Dr. Suess
    </p>
    
  </div>
  <div class="columns is-centered">
      <div class="column is-1 has-text-centered">
          <span class="is-size-7 has-text-grey" >
     © 2020 Parachute
    </span>
    </div>
      <div class="column is-1 has-text-centered">
          <a class="is-size-7 has-text-dark" >
     Privacy Policy
    </a>
    </div>
    <div class="column is-1 has-text-centered">
        <a href="/">
         <img id="smalllogo"  src="../assets/parachutefungrey.png" />
         </a>
    </div>
    <div class="column is-1 has-text-centered">
          <a class="is-size-7 has-text-dark">
     Terms of Service
    </a>
    </div>
    <div class="column is-1 has-text-centered">
          <a class="is-size-7 has-text-dark" >
     About
    </a>
    </div>
  </div>
</footer>
</template>
    

<script>

export default{
        name: "Footer"
    }
</script>



<style>


#foots {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 125px;            /* Footer height */
  }
#smalllogo{
    height: 24px;
}
</style>