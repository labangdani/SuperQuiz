<template>
  <skeleton class="space-y-2">

    <div
      class="
        grid
        gap-2
        sm:grid-cols-2 
        lg:grid-cols-5
        w-full
      "
    >
      <video-card-skeleton
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
import VideoCardSkeleton from "./VideoCardSkeleton.vue";

export default {
  components: { Skeleton, VideoCardSkeleton },
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