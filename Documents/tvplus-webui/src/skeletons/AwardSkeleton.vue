<template>  
  <div
    class="
      animate-pulse 
      grid
      gap-2
      grid-cols-2
      sm:grid-cols-2
      md:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
      w-full
      mb-5
    "
  >

    <div
      class="col-span-1"
      v-for="index in items"
      :key="index"
    >
      <div class="w-100 h-48 bg-white bg-opacity-20 rounded-lg"></div>
    </div>
  </div>
</template>
  
  <script>
  import useBreakpoint from "../hooks/useBreakpoint";
  
  export default {
    setup() {
      const breakpoint = useBreakpoint();
  
      return {
        items: breakpoint.value.items,
      };
    },
  };
  </script>
  
  <style>
  </style>