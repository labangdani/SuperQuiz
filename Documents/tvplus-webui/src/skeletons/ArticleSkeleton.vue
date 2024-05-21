<template>
  <div class="animate-pulse flex-1 gap-2 grid grid-cols-3 mt-10" v-for="index in items"
    :key="index">
    <div class="bg-gray-400 w-full h-[230px] rounded-lg"></div>
    <div class="col-span-2 space-y-4 py-2">
      <div class="px-2 h-4 w-20 py-1 bg-gray-400"></div>
      <div class="mt-2 h-4 w-28 mr-5 bg-gray-400" ></div>
      <div class="mt-2 h-4 w-28 bg-gray-400"></div>
      <div class="mt-2 h-10 mr-5 bg-gray-400" ></div>
    </div>
  </div>
</template>
    
<script>
import useBreakpoint from "../hooks/useBreakpoint";
import Skeleton from "../components/Skeleton/index.vue";

export default {
  components: {
    Skeleton,
  },

  setup() {
    const breakpoint = useBreakpoint();

    return {
      items: breakpoint.value.items,
    };
  },
};
</script>