<template>
  <div class="w-full h-full md:pb-16">
    <div class="mb-2">
      <banner-skeleton v-if="isLoading" />

      <div v-if="!isLoading" class="banner-container relative">
        <div v-if="isVisible == false">
          <div class="relative slide" >
            <div class="carousel-inner relative overflow-hidden w-full">
              <div
                v-for="(element, i) in maptab"
                :id="`slide-${i}`"
                :key="i"
                :class="`${active === i ? 'active' : 'left-full'}`"
                class="carousel-item inset-0 relative h-full transform transition-all duration-500 ease-in-out"
              >
                <img
                  v-if="element.imagepaysage"
                  class="block sm:hidden lg:block object-contain"
                  :src="
                    element.imagepaysage != null
                      ? element.imagepaysage.url
                      : defaultimage
                  "
                  alt="Banner slide"
                />
                <img
                  v-if="element.imageportrait"
                  class="block lg:hidden h-full w-full object-contain"
                  :src="
                    element.imageportrait != null
                      ? element.imageportrait.url
                      : defaultimage
                  "
                  alt="Banner slide"
                />

                <div class="banner__overlay absolute inset-0 flex items-center">
                  <transition
                    appear
                    enter-active-class="animate__animated animate__slideInUp"
                    leave-active-class="animate__animated animate__slideInDown"
                    mode="out-in"
                  >
                    <div
                      class="xs:-mt-24 lg:mt-60 px-[38px] sm:px-[38px] md:px-8 lg:px-14 xl:px-24 w-full"
                    >
                      <div class="space-y-4 xl:items-center lg:w-[400px]">
                        <div
                          class="flex justify-center lg:justify-start buttonbanner sm:mt-[350px] md:mt-[400px] lg:mt-36"
                        >
                          <div>
                            <router-link :to="'/program/' + element.id">
                              <Button
                                v-show="element.nom != ''"
                                class="rounded-full border sm:rounded-full border-white"
                              >
                                <svg
                                  class="h-5 w-5"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                >
                                  <polygon points="5 3 19 12 5 21 5 3" />
                                </svg>
                                <p class="font-bold text">
                                  Voir {{ element.nom }}
                                </p>
                              </Button>
                            </router-link>
                          </div>
                          <div>
                            <a :href="element.url" v-if="element.url !=''">
                              <Button
                                class="rounded-full border sm:rounded-full border-white"
                              >
                                <p class="font-bold text">En savoir plus</p>
                              </Button>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <!-- <div
            class="bg-gray-700 w-full items-center lg:relative pb-[27%] pt-[24%] h-0 mb-4"
            v-if="videomessage"
          >
            <p class="text-white text-center mb-10">
              {{ videomessage }}
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
          <div>
            <video
              class="w-full h-full"
              ref="videoPlayer"
              autoplay
              fullscreen
            ></video>
          </div>
        </div>
      </div>
    </div>

    <div
      class="banner__overlay--down absolute -mt-16 lg:-mt-16 h-20 w-full"
    ></div>
    <div class="mt-10">
      <div class="px-[38px] sm:px-[38px] md:px-8 lg:px-14 xl:px-24">
        <award-skeleton v-if="isLoading" />
        <div v-else>
          <div
            v-if="listsections.length == 0"
            class="mt-1 mr-5 text-base sm:text-base md:text-lg lg:text-xl font-bold mb-16"
          >
            {{ message }}
          </div>
          <div v-for="(section, index) in listsections" :key="index">
            <div :class="{ hidden: section.videos.length == 0 }">
              <h1
                class="xl:text-2xl text-xl sm:text-xl font-sans first-letter:uppercase body mb-6"
              >
                {{ section.titre }}
              </h1>
              <SectionPro :listvideos="section.videos" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import VideoCarouselSkeleton from "../../skeletons/VideoCarouselSkeleton.vue;
import AwardSkeleton from "../../skeletons/AwardSkeleton.vue";
import Banner from "../../components/Banner.vue";
import { Api } from "../../helpers";
import Button from "../../components/Button.vue";
import BannerSkeleton from "../../skeletons/BannerSkeleton.vue";
import SectionPro from "../../components/SectionPro.vue";
import Erreur from "../../services/error";
import { ref } from "vue";

export default {
  data() {
    return {
      element: {
        id: "",
        imagepaysage: { url: "" },
        imageportrait: { url: "" },
        nom: "",
        url: "",
      },
      pubs: [],
      maptab: [],
      active: 0,
      videomessage: "",
      connected: false,
      user: "",
      listsections: [],
      listvideos: [],
      programme: {},
      idprogramme: "",
      isVisible: false,
      isLoading: true,
      message: "Aucune vidéo pour le moment",
    };
  },

  components: {
    AwardSkeleton,
    Banner,
    Button,
    BannerSkeleton,
    SectionPro,
  },

  mounted() {
    this.token = localStorage.getItem("jwtToken");
    this.idprogramme = this.$route.params.id;
    this.mapToElement();
    let i = 0;
    setInterval(() => {
      if (i > this.maptab.length - 1) {
        i = 0;
      }
      this.active = i;
      i++;
    }, 5000);
  },

  methods: {
    async mapToElement() {
      console.log("hello");
      this.maptab = [];
      try {
        const response = await Api.getwithouttoken(
          "/streamvod/api/programme/" + this.idprogramme
        );
        this.programme = response.data.content;
        this.listsections = this.programme.sections.reverse();
        const prog = {
          id: this.programme.id,
          imagepaysage: this.programme.imagepaysage,
          imageportrait: this.programme.imageportrait,
          nom: this.programme.nom,
          url: "",
          // Ajoutez d'autres propriétés spécifiques à la transformation de patate en manioc si nécessaire
        };
        this.maptab.push(prog);
        await Api.getwithouttoken("/publicite/api/publicite/all-ads").then(
          (response) => {
            const pubstab = response.data.content;
            pubstab.forEach((item) => {
              if (item.published == true) {
                const dateActuelle = new Date().toISOString().split("T")[0]; // Obtenez la date actuelle au format "YYYY-MM-DD"
                const dateFin = new Date(item.endDate)
                  .toISOString()
                  .split("T")[0]; // Obtenez la date actuelle au format "YYYY-MM-DD"
                if (dateActuelle <= dateFin) {
                  this.pubs.push(item);
                }
              }
            });
            this.pubs.forEach((item) => {
              if (!item.fichierPubMap.vid_web_acc) {
              const pub = {
                id: item.id,
                imagepaysage: item.fichierPubMap.img_web_acc,
                imageportrait: item.fichierPubMap.img_web_live,
                nom: "",
                url: item.url,
                // Ajoutez d'autres propriétés spécifiques à la transformation de patate en manioc si nécessaire
              };
              console.log(pub);
              this.maptab.push(pub);
            }
            });
          }
        );
      } catch (error) {
        Erreur.gestionErreur(error.message);
      } finally {
        this.isLoading = false;
      }
    },

    async getVisibility() {
      this.isVisible = true;
      // if (this.token) {
      Api.getwithouttoken("/streamvod/api/programme/" + this.idprogramme)
        .then((response) => {
          this.programme = response.data.content;
          this.videomessage = "";
          this.$refs.videoPlayer.src = this.programme.videocouverture.url;
        })
        .catch(function (err) {});
      // } else {
      //   this.videomessage = "Vous devez être connecté pour lire cette vidéo";
      // }
    },
  },
};
</script>

<style>
@media (min-width: 200px) and (max-width: 639px) {
  .text {
    font-size: 12px;
  }

  .buttonbanner {
    margin-top: 150px;
  }
}

.video-card img {
  @apply object-cover rounded-lg absolute top-0 left-0;
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

.banner__overlay--down {
  background-image: linear-gradient(
    to bottom,
    transparent 10%,
    rgba(var(--background-color-rgb), 0.8),
    rgba(var(--background-color-rgb), 1)
  );
}

.banner__overlay {
  background-image: linear-gradient(
    77deg,
    rgba(0, 0, 0, 0.6) 25%,
    transparent 85%
  );
}
</style>