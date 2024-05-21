<template>
  <skeleton class="space-y-2">

    <div
      class="
        animate-pulse
        grid
        gap-2
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        xl:grid-cols-6
        px-2
         ">
        
      <card-skeleton
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
import CardSkeleton from "./CardSkeleton.vue";

export default {
  components: { Skeleton, CardSkeleton },
  setup() {
    const breakpoint = useBreakpoint();

    return {
      items: breakpoint.value.items,
    };
  },
};
</script>

<style>

.devant{
  height: 250px;
  position: relative;
  z-index: 1000;
}

</style>