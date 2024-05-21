<template>
  <div class="relative slide mb-2">
    <div
      class="carousel-inner relative overflow-hidden w-full h-full rounded-xl"
    >
      <div
        v-for="(pub, i) in pubs"
        :id="`slide-${i}`"
        :key="i"
        :class="`${active === i ? 'active' : 'left-full'}`"
        class="carousel-item inset-0 relative rounded-xl transform transition-all duration-500 ease-in-out"
      >
        <div @click="redirect(pub)" class="cursor-pointer">
          <Image
            v-if="pub.fichierPubMap.img_web_acc"
            :src="pub.fichierPubMap.img_web_acc.url"
            alt="First slide"
          />
          <Image
            v-if="pub.fichierPubMap.gif_web_acc"
            :src="pub.fichierPubMap.gif_web_acc.url"
            alt="First slide"
          />
        </div>
        <!-- <div class="absolute inset-0 flex justify-end items-end">
                <div class="mr-2 mb-2">
                  <a href="https://wa.me/message/F7D3KTXM67X5G1">
                    <button
                      class="bg-[#07693A] text-white rounded-full px-2.5 py-1.5 text-xs"
                    >
                      En savoir plus
                    </button>
                  </a>
                </div>
              </div> -->
      </div>

      <!-- <div class="flex justify-end pr-2 mt-2">
                <button
                  class="absolute rounded-full bg-gray-300 p-1.5"
                  title="Mes préférences publicitaires"
                >
                  <svg
                    class="h-6 w-6 text-black"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                </button>
              </div> -->
    </div>
  </div>
</template>

<script>
import { Api } from "../helpers";
import Erreur from "../services/error";
import Image from "./Image.vue";

export default {
  name: "Pub",

  components: {
    Image,
  },

  data() {
    return {
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
      time: 7000,
      active: 0,
    };
  },

  mounted() {
    this.getAllAds();
  },

  methods: {
    getAllAds() {
      Api.getwithouttoken("/publicite/api/publicite/all-ads")
        .then((response) => {
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
          const nextAds = () => {
            this.active = (this.active + 1) % this.pubs.length;
            setTimeout(nextAds, this.time);
          };
          nextAds();
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        });
    },

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
  },
};
</script>

<style>
</style>