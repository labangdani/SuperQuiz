<template>
  <div class="w-full h-full">
    <div class="mb-2 md:pb-16">
      <div class="banner-container relative">
        <div v-if="isVisible == false">
          <img
            v-if="categorie.imagesMap.imagepaysage"
            :src="categorie.imagesMap.imagepaysage.url"
            class="block sm:hidden md:block w-full h-[400px] object-cover"
          />
          <img
            v-if="categorie.imagesMap.imageportrait"
            :src="categorie.imagesMap.imageportrait.url"
            class="block md:hidden w-full h-[400px] object-cover"
          />

          <img
            v-if="!categorie.imagesMap.imagepaysage"
            src="../../assets/images/default_image.jpg"
            class="block w-full h-[400px] object-cover"
          />
          <div
            class="banner__overlay h-full w-full absolute inset-0 flex items-center sm:text-center"
          >
            <transition
              appear
              enter-active-class="animate__animated animate__slideInDown"
              leave-active-class="animate__animated animate__slideInUp"
              mode="out-in"
            >
              <router-link :to="'/awardcategorie?awards=' + categorie.award.id">
                <ButtonFloat v-if="token && visible == false">
                  Voter dans une autre catégorie
                </ButtonFloat>
                <ButtonFloat v-if="visible == true">
                  Retour aux catégories
                </ButtonFloat>
              </router-link>
            </transition>

            <!-- <transition
              appear
              enter-active-class="animate__animated animate__slideInUp"
              leave-active-class="animate__animated animate__slideInDown"
              mode="out-in"
            >
              <div class="mt-5 xl:px-20 w-full">
                <div class="space-y-4 xl:items-center xl:w-[400px]">
                  <div class="flex justify-center">
                    <div class="flex justify-center">
                      <Button class="rounded-full sm:rounded-full bg-[#07693A] text-white" @click="getVisibility()">
                        <svg class="h-5 w-5"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <polygon points="5 3 19 12 5 21 5 3" /></svg>
                        <p class="text-bold">Play</p>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </transition> -->
          </div>
        </div>

        <div v-else>
          <div
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
          </div>
          <div v-else>
            <video
              class="w-full h-[450px] object-cover"
              ref="videoPlayer"
              autoplay
              loop
              controls
            >
              <!-- <source :src="programme.videocouverture.url" type="video/mp4"> -->
            </video>
          </div>
        </div>

        <div class="banner__overlay--down absolute bottom-0 h-32 w-full"></div>
      </div>
    </div>

    <div>
      <div class="px-5 sm:px-5 md:px-8 xl:px-20">
        <CandidatSkeleton v-if="isLoading" />
        <div v-else>
          <div>
            <h1 class="xl:text-2xl text-xl sm:text-xl font-sans body mb-6">
              Les nommés
            </h1>
            <div
              v-if="listcandidats.length == 0"
              class="mt-1 mr-5 text-2xl font-bold"
            >
              {{ message }}
            </div>
            <div v-else class="grid mb-4 md:grid-cols-2 lg:grid-cols-3">
              <div
                class="px-2 mb-10 hover:-translate-all hover:scale-105 duration-150"
                v-for="candidats in listcandidats"
                :key="candidats.id"
              >
                <Candidat
                  :candidate="candidats"
                  :categorieId="categorie.id"
                  :visible="visiblebtn"
                  :candvote="candidatvote"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-[#212122] px-10 py-10 items-center space-y-4">
      <div class="flex justify-center text-sm text-center">
        <div v-html="categorie.award.reglementation"></div>
      </div>
    </div>
  </div>
</template>

<script>
import CandidatSkeleton from "../../skeletons/CandidatSkeleton.vue";
import Banner from "../../components/Banner.vue";
import { Api } from "../../helpers";
import Button from "../../components/Button.vue";
import BannerSkeleton from "../../skeletons/BannerSkeleton.vue";
import Erreur from "../../services/error";
import Image from "../../components/Image.vue";
import Candidat from "../../components/Competition/Candidat.vue";
import ButtonFloat from "../../components/ButtonFloat.vue";

export default {
  data() {
    return {
      videomessage: "",
      connected: false,
      token: "",
      user: "",
      listcandidats: [],
      categoriesTab: [],
      candidat: {
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
      categorie: {
        award: {
          id: "",
          name: "",
          reglementation: "",
        },
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
      idcategorie: "",
      isVisible: false,
      visible: true,
      visiblebtn: true,
      isLoading: true,
      message: "",
      user: {},
      listvotecandidat: [],
      candidatvote: "",
      i: 0,
      fetch: false,
    };
  },

  components: {
    Banner,
    Button,
    BannerSkeleton,
    Image,
    Candidat,
    CandidatSkeleton,
    ButtonFloat,
  },

  mounted() {
    this.token = localStorage.getItem("jwtToken");
    this.user = JSON.parse(localStorage.getItem("user"));
    this.idcategorie = this.$route.params.id;
    this.get_categorie(this.idcategorie);
    this.get_candidats(this.idcategorie);
    if (this.user) {
      this.checkuservote(this.idcategorie);
    }
  },

  methods: {
    checkuserpayment(categorie) {
      Api.get("/voting/rest/payment/is-user-pay/" + categorie.award.id)
        .then((response) => {
          if (response.data.content == false) {
            this.visible = true;
          } else {
            this.visible = false;
          }
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        });
    },

    async checkuservote(idcat) {
      this.listvotecandidat = [];
      await Api.get(
        "/voting/rest/candidat/all-candidat/vote-categorie/" + idcat
      )
        .then((response) => {
          this.listvotecandidat = response.data.content;
          if (this.listvotecandidat.length !== 0) {
            this.listvotecandidat.forEach((item) => {
              this.visiblebtn = false;
              this.candidatvote = item.id;
            });
          } else {
            this.visiblebtn = true;
            this.candidatvote = "";
          }
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        });
    },

    get_categorie(idcat) {
      Api.getwithouttoken("/voting/api/categorie/" + idcat)
        .then((response) => {
          this.categorie = response.data.content;
          this.checkuserpayment(this.categorie);
        })
        .catch((error) => {
          Erreur.gestionErreur(error.message);
        });
    },

    //Méthode qui retourne la liste des categories en fonction d'un award
    get_candidats(idcat) {
      this.listcandidats = [];
      Api.getwithouttoken("/voting/api/candidat/categorie/" + idcat)
        .then((response) => {
          this.listcandidats = response.data.content;
          if (this.listcandidats == 0) {
            this.message = "Aucun candidat pour le moment";
          }
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        })
        .then(() => {
          this.isLoading = false;
        });
    },

    async getVisibility() {
      this.isVisible = true;
      if (this.token) {
        Api.get("/voting/rest/categorie/" + this.idcategorie)
          .then((response) => {
            this.categorie = response.data.content;
            this.videomessage = "";
            this.$refs.videoPlayer.src = this.categorie.videoCouverture.url;
          })
          .catch(function (err) {
            Erreur.gestionErreur(err.message);
          });
      } else {
        this.videomessage = "Vous devez être connecté pour lire cette vidéo";
      }
    },
  },
};
</script>

<style>
.video-card img {
  @apply object-cover rounded-lg absolute top-0 left-0;
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
</style>