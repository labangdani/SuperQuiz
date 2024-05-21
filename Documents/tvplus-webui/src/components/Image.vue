<template>
  <img :src="source"  class="object-contain rounded-xl "/>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    src: {
      type: String,
    },
    
  },

  setup(props) {
    const { src } = props;

    return {
      source: `${src}`,
    };
  },
};
</script>

<style>
/* img[lazy="loaded"] {
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-name: fadeIn;
} */
</style>