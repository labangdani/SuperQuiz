<template>
  <div class="">
    <banner-skeleton v-if="isLoading" />

    <div v-else class="banner-container h-full relative">
      <div>
        <div class="relative slide" ref="scrollableContent">
          <div
            class="carousel-indicators absolute flex h-24 w-full lg:justify-end sm:mt-[500px] md:mt-[590px] xl:mt-[672px] 2xl:mt-[730px] sm:justify-center px-10"
          >
            <ol class="z-50 flex mr-2">
              <li
                v-for="(element, i) in maptab"
                :key="i"
                :class="{ slidebutton: active === i }"
                class="w-1 h-1 bg-gray-700 cursor-pointer mx-1 px-4"
              ></li>
            </ol>
          </div>

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
                          <Button
                            v-if="element.url != ''"
                            class="rounded-full border sm:rounded-full border-white"
                            @click="redirect(element)"
                          >
                            <p class="font-bold text">En savoir plus</p>
                          </Button>
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
    </div>
  </div>
  <div
    class="banner__overlay--down absolute -mt-16 lg:-mt-18 h-20 w-full"
  ></div>
</template>

<script>
import IconPlayFill from "~icons/ph/play-fill";
import Button from "./Button.vue";
import { Api } from "../helpers";
import BannerSkeleton from "../skeletons/BannerSkeleton.vue";
import Erreur from "../services/error";

export default {
  components: {
    Button,
    IconPlayFill,
    BannerSkeleton,
  },

  data() {
    return {
      user: "",
      isVisible: false,
      maptab: [6],
      programmes: [],
      active: 0,
      isLoading: true,
      defaultimage: "../assets/images/default_image.jpg",
      pubs: [],
      element: {
        id: "",
        imagepaysage: { url: "" },
        imageportrait: { url: "" },
        nom: "",
        url: "",
      },
    };
  },

  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.mapToElement();
    let i = 0;
    setInterval(() => {
      if (i > this.maptab.length - 1) {
        i = 0;
      }
      this.active = i;
      i++;
    }, 7000);
  },

  methods: {
    redirect(element) {
      Api.putwithouttoken("/publicite/api/publicite/count-click/" + element.id)
        .then((response) => {
          if (response) {
            window.location.href = element.url;
          }
        })
        .catch((error) => {
          Erreur.gestionErreur(error.message);
        });
    },

    async mapToElement() {
      const listeManioc = [];

      await Api.getwithouttoken("/publicite/api/publicite/all-ads").then(
        async (response) => {
          const pubstab = response.data.content;
          pubstab.forEach((item) => {
            if (!item.fichierPubMap.vid_web_acc && item.published == true) {
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
            const pub = {
              id: item.id,
              imagepaysage: item.fichierPubMap.img_web_acc,
              imageportrait: item.fichierPubMap.img_web_live,
              nom: "",
              url: item.url,
              // Ajoutez d'autres propriétés spécifiques à la transformation de patate en manioc si nécessaire
            };
            listeManioc.push(pub);
          });

          try {
            const response = await Api.getwithouttoken(
              "/streamvod/api/programme/all"
            );
            this.programmes = response.data.content;
            this.programmes.forEach((item) => {
              const prog = {
                id: item.id,
                imagepaysage: item.imagepaysage,
                imageportrait: item.imageportrait,
                nom: item.nom,
                url: "",
                // Ajoutez d'autres propriétés spécifiques à la transformation de patate en manioc si nécessaire
              };
              listeManioc.push(prog);
            });
          } catch (error) {
            Erreur.gestionErreur(error.message);
          } finally {
            this.isLoading = false;
          }
        }
      );
      const shuffledProgrammes = this.shuffleArray(listeManioc);
      this.maptab = shuffledProgrammes.slice(0, 6);
    },

    //Méthode qui permet de trier une liste de données de manière aléatoire
    shuffleArray(array) {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    },
  },
};
</script>

<style>
@media (min-width: 200px) and (max-width: 639px) {
  .carousel-indicators {
    margin-top: 320px;
  }
  .text {
    font-size: 12px;
  }

  .buttonbanner {
    margin-top: 270px;
  }
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

.slidebutton {
  @apply bg-white;
}
</style>