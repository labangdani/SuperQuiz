<template>
  <video-live-skeleton v-if="isLoading" />

  <div v-if="!isLoading" class="lg:px-14 pb-6 sm:pt-16 xl:px-20 py-6">
    <div class="lg:grid lg:grid-cols-3 flex space-x-10 mt-20" v-if="message">
      <div class="lg:col-span-2 w-full">
        <div class="col-md-7">
          <div
            class="bg-gray-700 w-full lg:relative pb-[27%] pt-[24%] h-0 mb-4"
          >
            <p class="text-white text-center mb-5">
              {{ message }}
            </p>
            <div class="flex justify-center">
              <svg
                class="h-8 w-8 text-white"
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
                <path d="M9 4.55a8 8 0 0 1 6 14.9m0 -4.45v5h5" />
                <path
                  d="M11 19.95a8 8 0 0 1 -5.3 -12.8"
                  stroke-dasharray=".001 4.13"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div
        class="justify-center lg:col-span-1 lg:block sm:hidden xl:py-20 lg:py-10"
      >
        <div class="col-md-5 h-full"></div>
      </div>
    </div>

    <div class="lg:grid lg:grid-cols-3 flex space-x-10 lg:mt-10" v-else>
      <div class="lg:col-span-2 w-full">
        <div class="col-md-7">
          <div
            class="embed-responsive embed-responsive-16by9 sm:mt-5 lg:mt-0 relative overflow-hidden"
            itemscope
            itemtype="https://schema.org/VideoObject"
            style="padding-top: 56.25%"
          >
            <meta itemprop="name" content="Canal 2" /><meta
              itemprop="description"
              content="Canal 2"
            /><meta
              itemprop="uploadDate"
              content="2024-02-20T08:32:50.000Z"
            /><meta
              itemprop="thumbnailUrl"
              content="https://s1.dmcdn.net/l/Vl6X21bz0h509d6c2/x240"
            /><meta
              itemprop="embedUrl"
              content="https://geo.dailymotion.com/player/xpnus.html?video=x8t0282"
            /><iframe
              src="https://geo.dailymotion.com/player/xpnus.html?video=x8t0282"
              allow="autoplay; fullscreen; picture-in-picture"
              title="Dailymotion video player – Canal 2"
              frameborder="0"
              class="embed-responsive-item lg:rounded-xl absolute bottom-0 left-0 right-0 top-0 h-full w-full"
            ></iframe>
          </div>
          <!-- <div v-show="showpub" class="inset-0 relative">
            <video id="myLiveVideo" controls autoplay>
              <source src="../assets/videos/videotest.mp4" type="video/mp4" />
            </video>
            <div class="flex justify-end">
              <button
                class="rounded-lg bg-black -mt-16 px-3 py-1 mr-1 absolute"
                @click="closeAd()"
              >
                Passer l'annonce
              </button>
          </div> -->
          <!-- <div
            class="bg-gray-700 w-full items-center lg:relative pb-[27%] pt-[24%] h-0 mb-4"
            v-else
          >
            <p class="text-white text-center mb-10">
              {{ livemessage }}
            </p>
            <div class="flex justify-center space-x-4">
              <button
                type="submit"
                class="px-2.5 py-1 sm:px-1 border border-solid sm:py-1 md:py-1.5 md:px-5 bg-transparent rounded-full"
              >
                <router-link to="/signin" class="text-white font-bold">
                  Créer un compte</router-link
                >
              </button>
              <button
                type="submit"
                class="px-2.5 py-1 sm:px-1 sm:py-1 md:py-1.5 md:px-5 bg-[#07693A] rounded-full"
              >
                <router-link to="/login" class="text-white font-bold">
                  Se connecter
                </router-link>
              </button>
            </div>
          </div> -->
        </div>
      </div>

      <div class="lg:col-span-1 lg:block sm:hidden">
        <div class="items-center">
          <Pub />

          <div class="col-md-5 items-center h-full">
            <div v-if="video">
              <div>
                <img
                  class="object-contain"
                  :src="
                    channel.channel_logo != null
                      ? channel.channel_logo.url
                      : defaultimage
                  "
                />
                <h1 class="lg:text-base xl:text-lg text-white">
                  {{ channel.channel_name }} en Direct
                </h1>
                <h1 class="py-2.5 lg:text-xl xl:text-2xl font-bold text-white">
                  {{ video.programme.nom }}
                </h1>
                <div
                  class="truncate text-sm capitalize"
                  :title="video.programme.description"
                >
                  {{ video.programme.description }}
                </div>

                <div class="mt-5">
                  <router-link :to="'/direct/' + video.id">
                    <div class="flex space-x-4">
                      <img
                        :src="
                          video.programme.imageportrait != null
                            ? video.programme.imageportrait.url
                            : defaultimage
                        "
                        class="object-contain lg:w-16 lg:h-20 xl:w-20 xl:h-24 rounded-xl"
                        alt=""
                      />
                      <p
                        class="text-white py-6 text-md mt-2 font-bold text-center"
                      >
                        {{ video.programme.nom }}
                      </p>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>

            <div v-else>
              <div class="object-contain flex justify-center">
                <img
                  :src="
                    channel.channel_logo != null
                      ? channel.channel_logo.url
                      : defaultimage
                  "
                />
              </div>
              <h1
                class="lg:text-base xl:text-lg flex justify-center text-white"
              >
                {{ channel.channel_name }} en Direct
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="mt-4 px-4">
            <img :src=" defaultimage " class="object-cover w-full h-40 rounded-xl" alt="" />
        </div> -->

    <div class="px-5">
      <div class="lg:hidden py-5">
        <div
          class="h-0 mb-2.5 border border-solid border-t-0 border-slate-800 opacity-25"
        ></div>

        <div class="flex justify-between mb-2.5 px-2.5">
          <div class="flex justify-center items-center space-x-5">
            <button class="rounded-full bg-white">
              <img
                class="w-16 h-16 rounded-full object-contain"
                :src="
                  channel.channel_logo != null
                    ? channel.channel_logo.url
                    : defaultimage
                "
                alt=""
              />
            </button>
            <p class="items-center text-md text-white text-base">
              {{ channel.channel_name }}
            </p>
          </div>
        </div>

        <div
          class="h-0 m:b-4 border border-solid border-t-0 border-slate-800 opacity-25 mb-5"
        ></div>

        <div class="items-center">
          <Pub />
        </div>
      </div>
      <!-- <ul class="flex space-x-4 mt-4 text-md text-gray-400">
        <li
          :class="{ liveclass: connect === 'direct' }"
          @click="get_live()"
          class="cursor-pointer"
        >
          En direct
        </li>
        <li
          :class="{ liveclass: connect === 'suivre' }"
          @click="get_next()"
          class="cursor-pointer"
        >
          A suivre
        </li>
      </ul> -->
    </div>

    <div class="video pt-5">
      <LiveCardVue :listplanifications="planificationslist"></LiveCardVue>
    </div>
  </div>
</template>

<script>
import LiveCardVue from "../components/LiveCard.vue";
import VideoLiveSkeleton from "../skeletons/VideoLiveSkeleton.vue";
import IconThumbUp from "~icons/fluent/thumb-like-20-regular";
import IconThumbDown from "~icons/fluent/thumb-dislike-24-regular";
import CircleButton from "./CircleButton.vue";
import { Api } from "../helpers";
import Erreur from "../services/error";
import Image from "./Image.vue";
import Pub from "./Pub.vue";

export default {
  name: "VideoLive",

  data() {
    return {
      videoDuration: 0,
      showpub: true,
      videoSource: "/src/assets/videos/videotest.mp4",
      pubs: [],
      pub: {
        fichierPubMap: {
          img_web_acc: {
            url: "",
          },
          img_web_live: {
            url: "",
          },
          gif_web_acc: {
            url: "",
          },
          gif_web_live: {
            url: "",
          },
          vid_web_acc: {
            url: "",
          },
          vid_web_live: {
            url: "",
          },
        },
      },
      datedeb: [],
      datefin: [],
      isLoading: true,
      message: "",
      livemessage: "",
      video: {
        id: "",
        endDate: "",
        startDate: "",
        programme: {
          id: "",
          nom: "",
          description: "",
        },
        channels: [
          {
            id: "",
            channel_logo: {
              id: "",
              url: "",
            },
          },
        ],
      },
      planif: "",
      channel: {
        id: "",
        channel_url: "",
        channel_logo: {
          id: "",
          url: "",
        },
      },
      connect: "direct",
      planificationslist: [],
      planifs: [],
      defaultimage: "/src/assets/images/direct.jpeg",
      time: 7000,
    };
  },

  components: {
    LiveCardVue,
    VideoLiveSkeleton,
    IconThumbUp,
    IconThumbDown,
    CircleButton,
    Image,
    Pub,
  },

  mounted() {
    this.token = localStorage.getItem("jwtToken");
    this.planif_id = this.$route.params.id;
    // this.get_live();
    if (this.planif_id !== ":id") {
      this.message = "";
      this.watchvideo(this.planif_id);
    } else {
      this.watchvideo("15");
    }

    
  },

  // beforeDestroy() {
  //   const video = document.getElementById("myLiveVideo");
  //   video.removeEventListener("ended", this.closeAd);
  // },

  methods: {
    getVideoDuration() {
      const videoElement = this.$refs.videoElement;
      this.videoDuration = videoElement.duration;
    },

    async watchvideo(planif_id) {
      const response = await Api.getwithouttoken(
        "/streamvod/api/planification/" + planif_id
      );
      this.video = response.data.content;
      if (this.video != null) {
        this.message = "";
        this.video.channels.forEach((item) => {
          this.channel = item;
          if (this.token) {
          }
        });
        this.isLoading = false;
      } else {
        const response = await Api.getwithouttoken(
          "/streamvod/api/channel/channel-all"
        );
        const channeltab = response.data.content;
        this.channel = channeltab[0];
        this.isLoading = false;
      }
    },

    //Méthode qui retourne la liste des directs en cours en fonction des chaînes
    get_live() {
      this.isLoading = true;
      this.planificationslist = [];
      this.connect = "direct";
      let now = new Date();
      Api.getwithouttoken("/streamvod/api/planification/all")
        .then((response) => {
          this.planif = response.data.content;
          if (this.planif != null) {
            this.planif.forEach((item) => {
              const planification = {
                channels: [],
                description: "",
                startDate: "",
                endDate: "",
                id: "",
                programme: {},
                startTime: "",
                endTime: "",
                progress: null,
              };
              const startDateWithoutTime = new Date(
                new Date(item.startDate).getFullYear(),
                new Date(item.startDate).getMonth(),
                new Date(item.startDate).getDate()
              );
              const endDateWithoutTime = new Date(
                new Date(item.endDate).getFullYear(),
                new Date(item.endDate).getMonth(),
                new Date(item.endDate).getDate()
              );
              const nowWithoutTime = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate()
              );
              if (
                startDateWithoutTime <= nowWithoutTime &&
                nowWithoutTime <= endDateWithoutTime
              ) {
                if (
                  new Date(item.startDate) <= now &&
                  now <= new Date(item.endDate)
                ) {
                  // Obtenir l'heure et les minutes sous forme de chaîne de caractères

                  planification.channels = item.channels;
                  planification.description = item.description;
                  planification.id = item.id;
                  planification.programme = item.programme;
                  planification.startTime = item.startDate;
                  planification.endTime = item.endDate;
                  const starthours = new Date(item.startDate)
                    .getHours()
                    .toString()
                    .padStart(2, "0");
                  const startminutes = new Date(item.startDate)
                    .getMinutes()
                    .toString()
                    .padStart(2, "0");
                  planification.startDate = `${starthours}:${startminutes}`;
                  const endhours = new Date(item.endDate)
                    .getHours()
                    .toString()
                    .padStart(2, "0");
                  const endminutes = new Date(item.endDate)
                    .getMinutes()
                    .toString()
                    .padStart(2, "0");
                  planification.endDate = `${endhours}:${endminutes}`;
                  this.planificationslist.push(planification);
                }
              }
            });
          } else {
            this.message = "Aucun direct n'est disponible pour le moment";
          }
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        })
        .then(() => {
          this.isLoading = false;
        });
    },

    //Méthode qui retourne la liste des directs suivants en fonction des chaînes
    get_next() {
      this.isLoading = true;
      this.planificationslist = [];
      this.connect = "suivre";
      let now = new Date();
      Api.getwithouttoken("/streamvod/api/planification/all")
        .then((response) => {
          this.planif = response.data.content;
          if (this.planif.length != 0) {
            this.planif.forEach((item) => {
              // console.log(item)
              const startDateWithoutTime = new Date(
                new Date(item.startDate).getFullYear(),
                new Date(item.startDate).getMonth(),
                new Date(item.startDate).getDate()
              );
              const endDateWithoutTime = new Date(
                new Date(item.endDate).getFullYear(),
                new Date(item.endDate).getMonth(),
                new Date(item.endDate).getDate()
              );
              const nowWithoutTime = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate()
              );
              if (
                startDateWithoutTime <= nowWithoutTime &&
                nowWithoutTime <= endDateWithoutTime
              ) {
                if (new Date(item.startDate) > now) {
                  // Obtenir l'heure et les minutes sous forme de chaîne de caractères

                  const starthours = new Date(item.startDate)
                    .getHours()
                    .toString()
                    .padStart(2, "0");
                  const startminutes = new Date(item.startDate)
                    .getMinutes()
                    .toString()
                    .padStart(2, "0");
                  item.startDate = `${starthours}:${startminutes}`;
                  const endhours = new Date(item.endDate)
                    .getHours()
                    .toString()
                    .padStart(2, "0");
                  const endminutes = new Date(item.endDate)
                    .getMinutes()
                    .toString()
                    .padStart(2, "0");
                  item.endDate = `${endhours}:${endminutes}`;
                  this.planificationslist.push(item);
                }
              }
            });
          } else {
            this.message = "Aucun direct n'est disponible pour le moment";
          }
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        })
        .then(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style>
.liveclass {
  @apply inline-block border-green-500 border-b-4 text-white transition duration-300 font-bold;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.left-full {
  left: -100%;
}

.carousel-item {
  float: left;
  position: relative;
  display: block;
  width: 100%;
  margin-right: -100%;
  backface-visibility: hidden;
}

.carousel-item.active {
  left: 0;
}
</style>