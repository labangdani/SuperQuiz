<template>
  <button
    :disabled="fetching"
    class="p-1 text-center rounded-lg bg-[#07693A] first-letter:uppercase cursor-pointer"
  >
    <div
      v-if="fetching"
      class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span
        class="!absolute flex justify-center !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span
      >
    </div>
    <slot v-if="!fetching"> </slot>
  </button>
</template>

<script>
export default {
  name: "ButtonSpinner",
  props: {
    fetching: {
      type: Boolean,
    },
  },
};
</script>

<style>
</style>