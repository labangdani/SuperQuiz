<template>
  <div class="bl">
    <div class="wrapper1">
      <section class="my-10">
        <div class="imgclass">
          <img class=" w-38 h-20 object-contain" src="/src/assets/images/whitelogo.png" alt="">
        </div>
        <form class="text-black mt-2 mx-7">
          <div class="link text-2xl text-center">
            <p>Votre compte a été activé avec succès. </p> 
            <p> Veuillez-vous <router-link to="/login" class="condition"> Connecter</router-link> </p> 
          </div>     
        </form>
      </section>
    </div>
  </div>
</template>
  
<script>
  
  export default {

      name:'ValidEmail',
   
  }

</script>
  
<style>

  .bl{
    @apply flex items-center justify-center w-full h-screen;
    background-size: cover;
  }
  
  .wrapper2{
    @apply flex rounded-2xl my-10 mt-16 mb-20;
    /* box-shadow: 0 0 128px 0 rgba(0,0,0,0.1), 0 32 64 -48 rgba(0,0,0,0.5); */
  }
  
  .imgclass{
    @apply flex justify-center;
  }
  
  .field{
    @apply flex flex-col mb-2.5 ;
  }
  
  .input{
    @apply outline-none ;
  }
  
  </style>