<template>
  <div class="animate-pulse w-full mt-10" >
    <div class="bg-gray-400 h-[500px]"></div>
    <div class="mt-2 h-1 w-full mr-5 bg-gray-400" ></div>
    <div class="mt-2 h-1 w-full mr-5 bg-gray-400" ></div>
    <div class="mt-2 h-1 w-full mr-5 bg-gray-400" ></div>
    <div class="mt-2 h-1 w-full mr-5 bg-gray-400" ></div>
    <div class="mt-2 h-1 w-full mr-5 bg-gray-400" ></div>
    <div class="mt-2 h-1 w-full mr-5 bg-gray-400" ></div>
  </div>
</template>
      
<script>
  import Skeleton from "../components/Skeleton/index.vue";
  
  export default {
    components: {
      Skeleton,
    },
  };
</script>