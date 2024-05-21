<template>
  <div class="donation-container" style="top: 180px">
    <button class="donation-button lg:text-xl" style="opacity: 1">
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
  </div>
</template>

<script>
export default {
  name: "ButtonFloat",
  props: {
    fetching: {
      type: Boolean,
    },
  },
};
</script>

<style>
.donation-container {
  position: fixed;
  right: 0;
  z-index: 150;
  bottom: auto;
  top: 30px;
  transition: 0.3s;
  text-align: right;
}

.donation-container .donation-button {
  background: #07693a;
  padding: 10px 22px;
  border-radius: 50px 0 0 50px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  border-bottom: 3px solid #ffffff;
  margin: auto;
  text-align: center;
  max-height: 50px;
  display: block;
  position: relative;
}

.donation-container .donation-button.transition {
  transition: 0.3s;
}

.donation-container a:active,
.donation-container a:focus,
.donation-container a:hover {
  text-decoration: none;
}
</style>