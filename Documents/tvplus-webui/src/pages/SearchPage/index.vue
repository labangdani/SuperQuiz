<template>
  <section class="sm:pt-20 px-[38px] sm:px-[38px] md:px-8 lg:px-14 xl:px-24">
    <form class="items-center">
      <div class="relative w-full">
        <input
          type="search"
          @input="handleSearchChange"
          id="simple-search"
          class="mr-24 rounded border border-solid border-neutral-300 flex lg:hidden sm:block focus:text-white placeholder-gray-100 bg-transparent text-md w-full p-1.5 mb-4 focus:border-green-600 focus:outline-none"
          placeholder="Rechercher un programme, une vidéo..."
          required
        />
      </div>
    </form>

    <h1 class="text-2xl sm:text-2xl lg:text-4xl mb-10 mt-5">
      Résultats de la recherche
    </h1>
    <div
      class="h-0 mb-4 border border-solid border-t-0 border-slate-800 opacity-25"
    ></div>
    <video-carousel-skeleton v-if="isLoading" />
    <div v-else>
      <p class="pt-6 text-white text-3xl">{{ message }}</p>

      <div class="grid xscol sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 mb-4">
        <div
          v-for="video in listvideos"
          :key="video.id"
          class="px-2 mb-10 hover:-translate-all hover:scale-105 duration-150"
        >
          <div
            class="cursor-pointer video-card relative h-[180px] sm:h-[180px] md:h-[180px] lg:h-[120px] 2xl:h-[135.106px]"
          >
            <router-link
              :to="
                '/readvideo/' +
                video.id +
                '/' +
                replaceSpacesWithDash(video.shortDescription)
              "
            >
              <div>
                <img
                  :src="
                    video.thumbnail != null ? video.thumbnail : defaultimage
                  "
                  :class="{ ' shadow': isScaled }"
                  :alt="video.title"
                  key=""
                />
                <div
                  class="h-full w-full absolute inset-0 flex justify-center items-center"
                >
                  <button class="rounded-full bg-opacity-60 bg-black">
                    <svg
                      class="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
                <div
                  class="h-full w-full absolute inset-0 flex justify-end items-end"
                >
                  <div class="mr-2 mb-2">
                    <button
                      class="text-xs px-1 rounded-md bg-opacity-60 bg-black text-right"
                    >
                      {{ video.duration }}
                    </button>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
          <router-link
            :to="
              '/readvideo/' +
              video.id +
              '/' +
              replaceSpacesWithDash(video.shortDescription)
            "
          >
            <div
              class="mt-2 flex space-x-3 text-left text-sm contrast-0"
              style="line-height: 1rem; font-size: 0.75rem"
            >
              <div class="flex space-x-1">
                <svg
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>{{ video.dateSortie }}</span>
              </div>
              <div class="flex space-x-1">
                <svg
                  class="h-4 w-4"
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
                  <circle cx="12" cy="12" r="2" />
                  <path d="M2 12l1.5 2a11 11 0 0 0 17 0l1.5 -2" />
                  <path d="M2 12l1.5 -2a11 11 0 0 1 17 0l1.5 2" />
                </svg>
                <span>{{ video.nbVues }}</span>
              </div>
            </div>
            <div
              class="truncatetwo hover:text-[#07693A] mt-1 text-xs lg:text-sm"
              :title="video.shortDescription"
            >
              {{ video.shortDescription }}
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Image from "../../components/Image.vue";
import { useRoute } from "vue-router";
import VideoCarouselSkeleton from "../../skeletons/VideoCarouselSkeleton.vue";
import { Api } from "../../helpers";
import IconArrowRight from "~icons/ic/outline-arrow-forward-ios";
import IconArrowLeft from "~icons/ic/outline-arrow-back-ios";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import useDevice from "../../hooks/useDevice";
import { ref } from "vue";
import { useRouter } from "vue-router";
import moment from "moment";

export default {
  data() {
    return {
      listvideos: [],
      message: "",
      isLoading: true,
    };
  },

  components: {
    Image,
    VideoCarouselSkeleton,
    Swiper,
    SwiperSlide,
    IconArrowRight,
    IconArrowLeft,
  },

  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
    const route = useRoute();
    this.getVideoKeyWord(route);
  },

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

  methods: {
    replaceSpacesWithDash(phrase) {
      // Utilise la méthode replace avec une expression régulière pour remplacer les espaces par "-"
      var phraseAvecTirets = phrase.replace(/[\s,':;"]+/g, "-");
      return phraseAvecTirets;
    },

    capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },

    formatDuration(seconds) {
      let hours = Math.floor(seconds / 3600);
      let minutes = Math.floor((seconds % 3600) / 60);
      let remainingSeconds = seconds % 60;

      // Ajoute un zéro devant si les chiffres sont inférieurs à 10
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      remainingSeconds =
        remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
      if (hours < 1) {
        return minutes + ":" + remainingSeconds + "s";
      } else {
        return hours + ":" + minutes + ":" + remainingSeconds + "s";
      }
    },

    getVideoKeyWord(route) {
      Api.getwithouttoken(
        "/streamvod/api/videos/search-kw?search=" + route.query.q
      ).then((response) => {
        const videostab = response.data.content;
        videostab.forEach((video) => {
          const formatDeSortie = "DD/MM/YYYY";
          video.dateSortie = moment(video.dateSortie).format(formatDeSortie);
          video.duration = this.formatDuration(video.duration);
          this.listvideos.push(video);
        });
        console.log(response);
        console.log(this.listvideos);
        if (this.listvideos.length == 0) {
          this.message = "Aucun résultat";
        } else {
          this.message = "";
        }
      });
    },
  },
};
</script>
<style>
.active {
  background-color: #07693a;
}

.block-chaine {
  display: grid;
  grid-auto-flow: column;
  /* grid-auto-columns: 10%;  */
  gap: var(--size-3);
  overflow: auto;
  scroll-behavior: none;
  width: 100%;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.block-chaine::-webkit-scrollbar {
  width: 0;
}

.swiper {
  overflow: visible;
}

.swiper-button-disabled {
  display: none;
}

.swiper:hover .swiper-button svg,
.swiper:hover .swiper-pagination {
  visibility: visible;
}

.swiper-button svg {
  visibility: hidden;
}

.swiper-button-next,
.swiper-button-prev {
  @apply absolute h-full w-6 md:w-12 mt-0 top-0 bg-black bg-opacity-50;
  z-index: 2;
}

.swiper-button-prev {
  @apply -left-6 md:-left-12;
}

.swiper-button-next {
  @apply -right-6 md:-right-12;
}

.swiper-pagination {
  @apply space-x-1 w-24 h-0.5 absolute right-0 -top-4 flex invisible;
}

.swiper-pagination-bullet {
  @apply h-full bg-secondary hidden md:block;
  flex: 1 1 0%;
}

.swiper-pagination-bullet-active {
  @apply bg-white;
}
</style>