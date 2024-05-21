<template>
    <Skeleton>
      <div class="my-5 items-center">
        <div class="w-full sm:h-36 md:h-32 lg:h-48 bg-white bg-opacity-20 rounded-full"></div>
        <div class=" flex justify-center">
          <div class="h-5 w-40 sm:w-28 mt-2"></div>
        </div>  

      </div>  
    </Skeleton>
  </template>
  
  <script>
  import Skeleton from "../components/Skeleton/index.vue";
  export default {
    components: { Skeleton },
  };
  </script>
  
  <style>
  </style>