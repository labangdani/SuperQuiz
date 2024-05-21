<template>
  <div
  v-show="quizzes.length != 0"
    ref="container"
    class="carousel-container mb-8 relative"
    :class="[childHovering ? 'animate-z-hover' : 'animate-z-unhover']"
  >
    <div v-if="quizzes.length != 0">
      <Swiper
        v-bind="options"
        @swiper="onReady"
        @slideChange="handleToggleButton"
      >
        <SwiperSlide
          v-for="(quiz, index) in quizzes"
          :key="index"
          class="px-2 hover:-translate-all hover:scale-105 duration-150"
        >

          <router-link :to="'/quiz/' + quiz.id">
            <div
              class="rounded-full"
              :class="{
                'shadow-green border-2 border-[#157f4c] ': !quiz.isDone,
              }"
            >
              <div
                class="outline-blue-500 cursor-pointer transition-all border-2 duration-300 rounded-full"
                :class="{
                  'animate-card-hover': isScaled,
                  'animate-card-unhover': !isScaled,
                }"
                @click="handleClick"
              >

              <!-- <div class="">
                <ol class="flex flex-col items-center space-y-2">
                  <li class="rounded-full w-1 h-1 bg-gray-700 cursor-pointer mx-1 py-4"></li>
                  <li class="rounded-full w-1 h-1 bg-gray-700 cursor-pointer mx-1 py-4"></li>
                  <li class="rounded-full w-1 h-1 bg-gray-700 cursor-pointer mx-1 py-4"></li>
                  <li class="r ounded-full w-1 h-1 bg-gray-700 cursor-pointer mx-1 py-4"></li>
                </ol>
              </div>

               -->

                <img
                  class="object-contain rounded-full h-full w-full"
                  :src="quiz.urlImagePortrait"
                  :class="{ 'rounded-b-none shadow': isScaled }"
                />
                <!-- <img
                  class="object-contain rounded-full h-full w-full"
                  src="../../assets/images/imagetest.jpeg"
                  :class="{ 'rounded-b-none shadow': isScaled }"
                /> -->
              </div>
            </div>

            <div class="text-center mt-2">
              <p class="text-white truncate text-md font-bold">
                {{ quiz.name }}
              </p>
            </div>
          </router-link>
        </SwiperSlide>
        <template #container-end>
          <div
            class="swiper-button swiper-button-prev group cursor-pointer flex items-center justify-center mt-16 sm:mt-16 xl:mt-28"
          >
            <IconArrowLeft
              class="w-10 h-10 group-hover:w-12 group-hover:h-12"
            />
          </div>

          <div
            class="swiper-button group cursor-pointer swiper-button-next flex items-center justify-center mt-16 sm:mt-16 xl:mt-28"
          >
            <IconArrowRight
              class="w-10 h-10 group-hover:w-12 group-hover:h-12"
            />
          </div>
        </template>
      </Swiper>
    </div>
 </div>
</template>

<script>
import IconArrowRight from "~icons/ic/outline-arrow-forward-ios";
import IconArrowLeft from "~icons/ic/outline-arrow-back-ios";
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { Pagination } from "swiper";
import Image from "../Image.vue";
// import Erreur from "../../services/error";


export default {
  name: "LiveCard",

  props: ["quizzes"],

  setup() {
    const container = ref(null);
    const childHovering = ref(false);
    const options = {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 5,
      modules: [Pagination],
      pagination: {
        type: "bullets",
      },
      speed: 800,
      watchSlidesProgress: true,
      breakpoints: {
        1024: {
          slidesPerView: 6,
          slidesPerGroup: 6,
        },

        768: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 3,
        },

        640: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 2,
        },
        400: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 2,
        },
      },
    };

    const handleToggleButton = (swiper) => {
      const prevButton = container.value.querySelector(".swiper-button-prev");
      const nextButton = container.value.querySelector(".swiper-button-next");

      if (swiper.isBeginning && !swiper.params.loop) {
        prevButton.classList.add("swiper-button-disabled");
      } else {
        prevButton.classList.remove("swiper-button-disabled");
      }

      if (swiper.isEnd && !swiper.params.loop) {
        nextButton.classList.add("swiper-button-disabled");
      } else {
        nextButton.classList.remove("swiper-button-disabled");
      }

      handleSlideHover();
    };

    const listenCardHovering = () => {
      const config = {
        attributes: true,
        subtree: true,
      };

      const callback = function (mutations) {
        for (let mutation of mutations) {
          const { target } = mutation;

          if (target.classList.contains("animate-card-hover")) {
            childHovering.value = true;
          } else if (target.classList.contains("animate-card-unhover")) {
            childHovering.value = false;
          }
        }
      };

      const observer = new MutationObserver(callback);

      observer.observe(container.value, config);
    };

    const handleSlideHover = () => {
      const slides = [
        ...container.value.querySelectorAll(
          ".swiper-slide.swiper-slide-visible .video-card"
        ),
      ];

      const firstElement = slides[0];
      const lastElement = slides[slides.length - 1];

      // firstElement.style.transformOrigin = "left center";
      // lastElement.style.transformOrigin = "right center";
    };

    const onReady = (swiper) => {
      const prevButton = container.value.querySelector(".swiper-button-prev");
      const nextButton = container.value.querySelector(".swiper-button-next");

      prevButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (swiper.isBeginning && !swiper.params.loop) return;
        swiper.slidePrev();
      });

      nextButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (swiper.isEnd && !swiper.params.loop) return;
        swiper.slideNext();
      });

      handleToggleButton(swiper);
      listenCardHovering();
      handleSlideHover();
    };

    return {
      options,
      container,
      onReady,
      handleToggleButton,
      childHovering,
    };
  },

  components: {
    Swiper,
    SwiperSlide,
    IconArrowRight,
    IconArrowLeft,
    Image,
  },

  data() {
    return {};
  },

  mounted() {
  },

  methods: {

  },
};
</script>


<style>
.shadow-green {
  box-shadow: 0 0 4px 4px #157f4c;
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
  @apply absolute w-14 h-14 rounded-full top-0 bg-black bg-opacity-50;
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

.shadow {
  -webkit-box-shadow: 0px 0px 12px 0px #000000;
  box-shadow: 0px 0px 12px 0px #000000;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>