<template>
    <skeleton class="space-y-2">
  
      <div
        class="
          grid
          gap-2
          grid-cols-2
          sm:grid-cols-2
          md:grid-cols-4
          lg:grid-cols-6
          w-full
        "
      >
        <ProgrammeCardSkeleton
          v-for="index in items"
          :key="index"
          class="col-span-1"
        />
      </div>
    </skeleton>
  </template>
  
  <script>
  import useBreakpoint from "../hooks/useBreakpoint";
  import Skeleton from "../components/Skeleton/index.vue";
  import ProgrammeCardSkeleton from "./ProgrammeCardSkeleton.vue";
  
  export default {
    components: { Skeleton, ProgrammeCardSkeleton },
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