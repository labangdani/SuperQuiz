<template>
  <div
    class="cursor-pointer video-card relative h-[192px] sm:h-[200px] md:h-[190px] lg:h-[210px] xl:h-[222.225px] 2xl:h-[270.212px]"
  >
    <router-link :to="'/categoriecandidat/' + categorie.id">
      <img
        class="rounded-2xl"
        :src="
          categorie.imagesMap.imageportrait != null
            ? categorie.imagesMap.imageportrait.url
            : defaultimage
        "
        :class="{ 'rounded-b-none shadow': isScaled }"
        :alt="categorie.name"
        key=""
      />
    </router-link>
    <div class="flex justify-end" v-if="check == true">
      <!-- <input
                class="relative float-left -ml-[1.5rem] mr-1 mt-1 h-[1.150rem] w-[1.150rem] appearance-none rounded-full border-[0.125rem] border-solid outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] checked:border-[#07693A] checked:bg-[#07693A] checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-[#07693A] dark:checked:bg-[#07693A] dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                type="checkbox"
                value=""
                id="checkboxChecked"
                checked /> -->
      <span
        class="inline-block relative whitespace-nowrap rounded-full bg-success-100 mt-1 mr-1 px-1 2xl:px-2 pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.7em] 2xl:text-sm font-bold leading-none text-success-700"
      >
        Déjà voté
      </span>
    </div>

    <router-link :to="'/categoriecandidat/' + categorie.id">
      <div
        class="shadow-black rounded-b-xl bg-black absolute inset-x-0 bottom-0 px-1 text-center text-sm sm:text-sm xl:text-base 2xl:text-lg font-bold"
        :title="categorie.name"
      >
        {{ categorie.name }}
      </div>
    </router-link>
  </div>
  <!-- <router-link class="sm:hidden md:block" :to="'/categoriecandidat/' + categorie.id"> 
        <div class="truncate px-5 mt-1 text-center text-sm xl:text-base 2xl:text-lg font-bold" :title="categorie.name">{{categorie.name}}</div>
    </router-link> -->
</template>

<script>
import Image from "../Image.vue";
import { Api } from "../../helpers";
import Erreur from "../../services/error";

export default {
  name: "categori",

  props: ["cat"],

  components: {
    Image,
  },

  data() {
    return {
      listvotecandidat: [],
      check: false,
      categorie: {
        name: "",
        description: "",
        imagesMap: {
          imagepaysage: {
            url: "",
          },
          imageportrait: {
            url: "",
          },
        },
        videoCouverture: {
          url: "",
        },
      },
    };
  },

  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.categorie = this.cat;
    if (this.user) {
      this.checkuservotecat(this.categorie.id);
    }
  },

  methods: {
    checkuservotecat(idcat) {
      this.listvotecandidat = [];
      Api.get("/voting/rest/vote/all-vote-categorie/" + idcat)
        .then((response) => {
          this.listvotecandidat = response.data.content;
          if (this.listvotecandidat.length !== 0) {
            this.listvotecandidat.forEach((item) => {
              if (this.user.id == item.userInfos.id) {
                this.check = true;
              }
            });
          } else {
            this.check = false;
          }
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        });
    },
  },
};
</script>

<style>
</style>