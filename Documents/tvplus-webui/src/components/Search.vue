<template>
  <div class="flex">
    <form class="flex items-center mr-4">
      <div class="relative w-full">
        <input
          type="search"
          @input="handleSearchChange"
          id="simple-search"
          class="outline-none mr-24 flex sm:hidden lg:block text-white placeholder-white bg-transparent lg:text-sm xl:text-base focus:border-b-2 w-full mt-1 p-1.5"
          placeholder="Rechercher un programme, une vidéo..."
          required
        />
      </div>
      <button @click="redirect()" class="pl-2">
        <svg
          class="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button>
    </form>
  </div>
</template>

 
<script>
import { ref } from "vue";
import useDevice from "../hooks/useDevice";
import { useRouter } from "vue-router";
import VideoCard from "../components/VideoCard.vue";
import IconArrowRight from "~icons/ic/outline-arrow-forward-ios";
import IconArrowLeft from "~icons/ic/outline-arrow-back-ios";
import { Swiper, SwiperSlide } from "swiper/vue";

export default {
  setup() {
    const { isMobile } = useDevice();

    const debounceTimeout = ref(null);
    const router = useRouter();

    const handleSearchChange = (e) => {
      const keyword = e.target.value;

      if (debounceTimeout.value) {
        clearTimeout(debounceTimeout.value);
      }

      debounceTimeout.value = setTimeout(() => {
        router.push({ path: "/search", query: { q: keyword } });
      }, 500);
    };

    return {
      handleSearchChange,
      isMobile,
    };
  },

  components: {
    VideoCard,
    IconArrowLeft,
    IconArrowRight,
    Swiper,
    SwiperSlide,
  },

  methods: {
    //Rediriger vers la page qui retourne le résultat de la recherche
    redirect() {
      this.$router.push("/search");
    },
  },
};
</script>

<style>
</style>