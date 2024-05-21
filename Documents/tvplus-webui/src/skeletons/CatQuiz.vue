<template>
  <skeleton class="space-y-2">
    <div
      class="animate-pulse grid gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 px-2"
    >
      <CircleCardSkeleton v-for="index in items" :key="index" class="col-span-1" />
    </div>
  </skeleton>
</template>

<script>
import useBreakpoint from "../hooks/useBreakpoint";
import Skeleton from "../components/Skeleton/index.vue";
import CircleCardSkeleton from "./CircleCardSkeleton.vue";


export default {
  components: { Skeleton, CircleCardSkeleton },
  setup() {
    const breakpoint = useBreakpoint();

    return {
      items: breakpoint.value.items,
    };
  },
};
</script>

<style>
.devant {
  height: 250px;
  position: relative;
  z-index: 1000;
}
</style>