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
            v-for="video in videos"
            :key="video.id"
            class="hover:-translate-all hover:scale-105 duration-150"
          >
            <div>
              <video-card :video="video" :id="video.id" />
            </div>
            <div class="mt-2 hover:text-[#07693A] ">
              <router-link :to="'/program/' + video.id">
                <div
                  class="flex space-x-3 text-left text-sm contrast-0"
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
                  class="text-xs truncatetwo mt-1 lg:text-sm xl:text-base "
                  :title="video.shortDescription"
                >
                  {{ capitalizeFirstLetter(video.shortDescription) }}
                </div>
              </router-link>
            </div>
          </SwiperSlide>
    
          <template #container-end>
            <div
              class="swiper-button swiper-button-prev group cursor-pointer flex items-center justify-center mt-20 sm:mt-20 xl:mt-28"
            >
              <IconArrowLeft
                class="w-10 h-10 group-hover:w-12 group-hover:h-12"
              />
            </div>
    
            <div
              class="swiper-button group cursor-pointer swiper-button-next flex items-center justify-center mt-20 sm:mt-20 xl:mt-28"
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
    import { Pagination } from "swiper";
    import { Swiper, SwiperSlide } from "swiper/vue";
    import "swiper/css";
    import moment from "moment";
    import VideoCard from "./VideoCard.vue";
    
    
    export default {
      props: {
        listvideos: {
          type: Array,
        },
      },
    
      components: {
        VideoCard,
        Swiper,
        SwiperSlide,
        IconArrowRight,
        IconArrowLeft,
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
            1024: {
              slidesPerView: 4.5,
              slidesPerGroup: 4.5,
              spaceBetween: 15,
            },
    
            768: {
              slidesPerView: 2.2,
              slidesPerGroup: 2.2,
              spaceBetween: 15,
            },
    
            640: {
              slidesPerView: 1.5,
              slidesPerGroup: 1.5,
              spaceBetween: 15,
            },
    
            240: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 15,
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
          handleToggleButton,
          childHovering,
          onReady,
        };
      },
    
      data() {
        return {
          connected: false,
          user: "",
          videos: [],
        };
      },
    
      mounted() {
        this.getvideos();
      },
    
      methods: {
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
    
        getvideos() {
          this.listvideos.forEach((video) => {
            const formatDeSortie = "DD/MM/YYYY";
            video.dateSortie = moment(video.dateSortie).format(formatDeSortie);
            video.duration = this.formatDuration(video.duration);
            this.videos.push(video);
          });
        },
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
    
    .truncate {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    </style>
    