<template>
  <div class="bgc">
    <VideoLiveVue></VideoLiveVue>
  </div>
</template>

<script>
import VideoLiveVue from "../../components/VideoLive.vue";
export default {
  name: "DirectLive",
  components: {
    VideoLiveVue,
  },
};
</script>
<style>
.bgc {
  background-color: #121212;
}
</style>