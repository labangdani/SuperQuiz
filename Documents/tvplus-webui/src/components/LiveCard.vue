<template>
  <div
    ref="container"
    class="carousel-container mb-8 relative"
    :class="[childHovering ? 'animate-z-hover' : 'animate-z-unhover']"
  >
    <div v-if="listplanifications.length != 0">
      <Swiper
        v-bind="options"
        @swiper="onReady"
        @slideChange="handleToggleButton"
      >
        <SwiperSlide
          v-for="(planification, index) in listplanifications"
          :key="index"
          class="px-2 hover:text-[#07693A] hover:-translate-all hover:scale-105 duration-150"
        >
          <router-link :to="'/direct/' + planification.id" class="sm:mr-10">
            <div class="progressclass">
              <div
                class="cursor-pointer video-card relative transition-all duration-300 livecardclass"
                :class="{
                  'animate-card-hover': isScaled,
                  'animate-card-unhover': !isScaled,
                }"
                @click="handleClick"
              >
                <Image
                  :src="
                    planification.programme.imageportrait != null
                      ? planification.programme.imageportrait.url
                      : defaultimage
                  "
                  :class="{ 'rounded-b-none shadow': isScaled }"
                  :alt="planification.programme.nom"
                />
              </div>

              <div class="relative bg-neutral-200 dark:bg-neutral-600">
                <div
                  class="h-1 absolute -mt-1 bg-red-600 rounded-b-lg"
                  :style="{ width: planification.progress * 100 + '%' }"
                ></div>
              </div>
            </div>

            <div
              v-for="(channel, index) in planification.channels"
              :key="index"
              class=""
            >
              <div class="flex justify-center mt-4">
                <img
                  class="w-20 h-20 object-contain"
                  v-if="channel.channel_logo"
                  :src="channel.channel_logo.url"
                  alt=""
                />
                <img
                  class="w-20 h-20 object-contain"
                  v-if="!channel.channel_logo"
                  src="../assets/images/default_image.jpg"
                  alt=""
                />
              </div>
              <div class="text-center">
                <p class="text-white truncate px-5 text-md font-bold">
                  {{ planification.programme.nom }}
                </p>
                <p class="text-gray-400 text-sm">
                  {{ planification.startDate }} - {{ planification.endDate }}
                </p>
              </div>
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

    <!-- <div v-else>
      <Swiper
        v-bind="options"
        @swiper="onReady"
        @slideChange="handleToggleButton"
      >
        <SwiperSlide
          v-for="(channel, index) in channels"
          :key="index"
          class="px-2"
        >
          <div >
            <router-link :to="'/direct/' + channel.id" class="sm:mr-10">
              <div
                class="cursor-pointer video-card relative transition-all duration-300 livecardclass"
                :class="{
                  'animate-card-hover': isScaled,
                  'animate-card-unhover': !isScaled,
                }"
                @click="handleClick"
              >
                <Image
                :src="channel.image_live != null? channel.image_live.url : defaultimage"
                :class="{'rounded-b-none shadow': isScaled }"
                :alt="channel.channel_name"
              />

                <img
                  class="object-contain"
                  src="../assets/images/direct.jpeg"
                  :class="{ 'rounded-b-none shadow': isScaled }"
                />
              </div>

              <div class="flex justify-center mt-2">
                <img
                  class="h-20 w-20 object-contain"
                  v-if="channel.channel_logo"
                  :src="channel.channel_logo.url"
                  alt=""
                />
                <img
                  class="h-20 w-20 object-contain"
                  v-if="!channel.channel_logo"
                  src="../assets/images/default_image.jpg"
                  alt=""
                />
              </div>

              <div class="text-center">
                <p class="truncate px-5 text-md font-bold">
                  {{ channel.channel_name }}
                </p>
              </div>
            </router-link>
          </div>
        </SwiperSlide>
        <template #container-end>
          <div
            class="swiper-button swiper-button-prev group cursor-pointer flex items-center justify-center mt-16 sm:mt-16 xl:mt-28"
          >
            <IconArrowLeft
              class="w-10 h-10 md:w-5 md:h-5 group-hover:w-12 group-hover:h-12"
            />
          </div>

          <div
            class="swiper-button group cursor-pointer swiper-button-next flex items-center justify-center mt-16 sm:mt-16 xl:mt-28"
          >
            <IconArrowRight
              class="w-10 h-10 sm:w-5 sm:h-5 group-hover:w-12 group-hover:h-12"
            />
          </div>
        </template>
      </Swiper>
    </div> -->
  </div>
</template>

<script>
import IconArrowRight from "~icons/ic/outline-arrow-forward-ios";
import IconArrowLeft from "~icons/ic/outline-arrow-back-ios";
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper";
import Image from "./Image.vue";
import { Api } from "../helpers";
import Erreur from "../services/error";

export default {
  name: "LiveCard",

  props: ["listplanifications"],

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
        // 1538: {
        //   slidesPerView: 6,
        //   slidesPerGroup: 6,
        // },

        1280: {
          slidesPerView: 6,
          slidesPerGroup: 6,
        },

        1024: {
          slidesPerView: 5,
          slidesPerGroup: 5,
        },

        768: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 3,
        },

        640: {
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
    return {
      defaultimage: "/src/assets/images/direct.jpeg",
      connected: false,
      user: "",
      message: " ",
      channels: [],
      isLoading: true,
    };
  },

  mounted() {
    // Mettre à jour la barre de progression toutes les secondes
    this.getAllPlanifications();
  },

  methods: {
    //Retourne la liste de toutes les chaines
    getAllChannels() {
      Api.getwithouttoken("/streamvod/api/channel/channel-all")
        .then((response) => {
          this.channels = response.data.content;
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        })
        .then(() => {
          this.isLoading = false;
        });
    },
    //Retourne la liste de tous les directs
    getAllPlanifications() {
      if (this.listplanifications.length !== 0) {
        const now = new Date();
        this.listplanifications.forEach((item) => {
          const difference = now.getTime() - item.startTime;
          const minutesDifference = Math.floor(difference / 60000);
          const duree = item.endTime - item.startTime;
          const minutesProgramDuration = Math.floor(duree / 60000);
          const percentage = Math.min(
            minutesDifference / minutesProgramDuration,
            1
          );
          item.progress = percentage;
        });
        this.isLoading = false;
      } else {
        this.getAllChannels();
      }
    },
  },
};
</script>

<style>
.image img {
  height: 100%;
  width: 100%;
  border-radius: 15px;
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

.video-card img {
  @apply object-cover space-x-4 rounded-lg absolute top-0 left-0 w-full h-full;
}

.livecardclass {
  @apply h-[184px] sm:h-[184px] md:h-40 2xl:h-[213.725px]  lg:h-44 xl:h-[170.663px];
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
