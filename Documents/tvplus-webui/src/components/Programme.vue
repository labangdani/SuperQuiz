<template>
  <div
    ref="container"
    class="carousel-container mb-10 relative"
    :class="[childHovering ? 'animate-z-hover' : 'animate-z-unhover']"
  >
    <div>
      <Swiper
        v-bind="options"
        @swiper="onReady"
        @slideChange="handleToggleButton"
      >
        <SwiperSlide
          v-for="(programme, index) in programmes"
          :key="index"
          class="px-2 hover:-translate-all hover:scale-105 duration-150"
        >
          <div
            class="cursor-pointer video-card relative transition-all duration-300 h-36 sm:h-36 xl:h-[288px]"
            :class="{
              'animate-card-hover': isScaled,
              'animate-card-unhover': !isScaled,
            }"
            @click="handleClick"
          >
            <router-link :to="'/program/' + programme.id">
              <Image
                :src="
                  programme.imageportrait != null
                    ? programme.imageportrait.url
                    : defaultimage
                "
                :class="{ 'rounded-b-none shadow': isScaled }"
                :alt="programme.nom"
              />
              <span
                class="flex absolute -left-2 -bottom-6 font-bold sm:text-6xl lg:text-9xl"
              >
                <div class="opacity-80 text-[#07693A]">
                  {{ index + 1 }}
                </div>
              </span>
            </router-link>
          </div>
        </SwiperSlide>
        <template #container-end>
          <div
            class="swiper-button swiper-button-prev group cursor-pointer flex items-center justify-center mt-16 sm:mt-12 xl:mt-28"
          >
            <IconArrowLeft
              class="w-10 h-10 group-hover:w-12 group-hover:h-12"
            />
          </div>

          <div
            class="swiper-button group cursor-pointer swiper-button-next flex items-center justify-center mt-16 sm:mt-12 xl:mt-28"
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
import Image from "./Image.vue";

export default {
  props: {
    programmes: {
      type: Array,
    },
  },

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
        1538: {
          slidesPerView: 4.5,
          slidesPerGroup: 4.5,
        },

        1280: {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },

        1024: {
          slidesPerView: 6,
          slidesPerGroup: 6,
        },

        768: {
          slidesPerView: 4.3,
          slidesPerGroup: 4.3,
          spaceBetween: 3,
        },

        640: {
          slidesPerView: 3.7,
          slidesPerGroup: 3.7,
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
    Image,
    Swiper,
    SwiperSlide,
    IconArrowRight,
    IconArrowLeft,
  },

  data() {
    return {
      connected: false,
      user: "",
      isLoading: true,
    };
  },

  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  },
};
</script>

<style>
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
  @apply absolute md:w-14 md:h-14 sm:w-10 sm:h-10 rounded-full top-0 bg-black bg-opacity-50;
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

.video-card img {
  @apply object-cover space-x-4 rounded-lg absolute top-0 left-0 w-full h-full;
}
</style>
