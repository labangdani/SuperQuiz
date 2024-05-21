<template>
  <div class="bg-[#212122] px-10 py-10 items-center space-y-4">
    <div class="flex justify-center font-bold text-lg text-center">
      Retrouvez-nous en téléchargeant l'application 2PLAY
    </div>
    <div class="flex justify-center">
      <a
        href="https://play.google.com/store/apps/details?id=com.canal2.two_play"
      >
        <button class="w-36 h-10 hover:-translate-all hover:scale-105 duration-150">
          <img src="../assets/images/googleplay.png" alt="" />
        </button>
      </a>
    </div>
    <div class="flex justify-center text-center text-sm pt-7 font-bold">
      2PLAY Copyright © {{ year }}
    </div>
    <div class="flex text-xs md:text-sm sm:text-xs justify-center">
      <router-link to="/" class="px-2 border-r-2 cursor-not-allowed"
        >Conditions générales d'utilisation</router-link
      >
      <router-link to="/" class="px-2 cursor-not-allowed"
        >Politiques de protection des données</router-link
      >
    </div>
    <div class="pt-5 flex justify-center space-x-4">
      <a href="https://www.facebook.com/profile.php?id=100095114273864">
        <button class="w-9 h-9 flex justify-center rounded-full bg-blue-800 hover:-translate-all hover:scale-105 duration-150">
          <svg
            class="h-5 w-5 mt-2 text-white"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <path
              d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"
            />
          </svg>
        </button>
      </a>

      <!-- <button class="w-9 h-9 flex justify-center rounded-full bg-blue-500"> 
        <svg class="h-4 w-4 mt-2.5 text-white"  viewBox="0 0 24 24"  fill="white"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>
      </button>
      <button class="w-9 h-9 flex justify-center rounded-full bg-pink-600">
        <svg class="h-6 w-6 mt-1.5 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="4" y="4" width="16" height="16" rx="4" />  <circle cx="12" cy="12" r="3" />  <line x1="16.5" y1="7.5" x2="16.5" y2="7.501" /></svg>
      </button> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      year: "",
    };
  },

  mounted() {
    let dateActuelle = new Date();
    this.year = dateActuelle.getFullYear();
  },
};
</script>

<style>
</style>