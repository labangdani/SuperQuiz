<template>
  <div v-if="section.videos != ''">
    <h1 class="text-xl sm:text-xl md:text-4xl first-letter:uppercase body mb-6">
      {{ section.titre }}
    </h1>
    <video-carousel :listvideos="section.videos" />
  </div>
</template>

<script>
import VideoCarousel from "./VideoCarousel.vue";

export default {
  props: ["section"],
  components: {
    VideoCarousel,
  },
};
</script>

<style>
</style>