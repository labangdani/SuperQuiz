<template>
  <div class="w-full h-full">
    <div class="mb-2 md:pb-16">
      <div class="banner-container relative">
        <div v-if="isVisible == false">
          <img
            v-if="award.imagesMap.imagepaysage"
            :src="award.imagesMap.imagepaysage.url"
            class="block w-full h-[300px] object-cover"
          />
          <img
            v-if="!award.imagesMap.imagepaysage"
            src="../../assets/images/default_image.jpg"
            class="block w-full h-[300px] object-cover"
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
              <ButtonFloat
                class="animate-bounce"
                @click.prevent="Buy()"
                v-if="token && visible == true"
              >
                Accéder aux votes à {{ award.vote_price }} FCFA
              </ButtonFloat>
            </transition>
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
              class="w-full h-[750px] object-cover"
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
        <h1
          class="xl:text-2xl text-sm sm:text-sm md:text-base lg:text-xl font-sans body mb-6"
        >
          Les catégories
        </h1>

        <video-carousel-skeleton v-if="isLoading" />
        <div v-else>
          <div
            v-if="listcategories.length == 0"
            class="mt-1 mr-5 text-2xl font-bold"
          >
            {{ message }}
          </div>
          <div v-else>
            <div class="grid sm:grid-cols-2 mb-4 md:grid-cols-4 lg:grid-cols-5">
              <div
                v-for="category in listcategories"
                :key="category.id"
                class="px-2 mb-10 hover:text-[#07693A] hover:-translate-all hover:scale-105 duration-150"
              >
                <Categorie :cat="category" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-[#212122] px-10 py-10 items-center space-y-4">
      <div class="flex justify-center text-sm text-center">
        <div v-html="award.reglementation"></div>
      </div>
    </div>
  </div>
</template>

<script>
import VideoCarouselSkeleton from "../../skeletons/VideoCarouselSkeleton.vue";
import Banner from "../../components/Banner.vue";
import { Api } from "../../helpers";
import Button from "../../components/Button.vue";
import ButtonFloat from "../../components/ButtonFloat.vue";
import BannerSkeleton from "../../skeletons/BannerSkeleton.vue";
import Categorie from "../../components/Competition/Categorie.vue";
import Erreur from "../../services/error";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      visible: false,
      videomessage: "",
      connected: false,
      user: "",
      listcategories: [],
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
      award: {
        name: "",
        vote_price: "",
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
      idaward: "",
      isVisible: false,
      isLoading: true,
      message: "",
      token: "",
    };
  },

  components: {
    VideoCarouselSkeleton,
    Banner,
    Button,
    ButtonFloat,
    BannerSkeleton,
    Categorie,
  },

  mounted() {
    this.token = localStorage.getItem("jwtToken");
    this.user = JSON.parse(localStorage.getItem("user"));
    this.idaward = this.$route.query.awards;
    if (this.user) {
      this.isVisible == true;
      this.checkuserpayment();
      this.get_categories_award();
    } else {
      this.get_categories_withouttoken();
    }
  },

  methods: {
    checkuserpayment() {
      Api.get("/voting/rest/payment/is-user-pay/" + this.idaward)
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

    Buy() {
      Swal.fire({
        text:
          "L'accès aux votes vous coûtera " +
          this.award.vote_price +
          " FCFA. Voulez-vous continuer ?",
        showCancelButton: true,
        confirmButtonText: "Continuer",
        cancelButtonText: "Annuler",
        showLoaderOnConfirm: true,
        confirmButtonColor: "#07693A",
        cancelButtonColor: "#f46a6a",
        customClass: {
          confirmButton: "order-2", // Ajoutez une classe CSS pour le bouton de confirmation
          cancelButton: "order-1", // Ajoutez une classe CSS pour le bouton d'annulation
        },
        allowOutsideClick: false,
      }).then((result) => {
        if (result.value) {
          this.initpaiement();
        }
      });
    },

    initpaiement() {
      Api.post("/voting/rest/payment/init-transaction", {
        customer_email: this.user.email,
        customer_phone_number: this.user.telephone,
        amount: this.award.vote_price,
        awards_id: this.idaward,
        customer_lang: "fr",
        devise: "XAF",
        reason: "voter",
      })
        .then((response) => {
          window.location.href = response.data.content.payment_url;
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        });
    },

    //Méthode qui retourne la liste des categories en fonction d'un award
    get_categories_award() {
      this.listcategories = [];
      Api.get("/voting/rest/awards/" + this.idaward)
        .then((response) => {
          this.award = response.data.content;
          Api.get("/voting/rest/categorie/awards-cat?awards=" + this.award.name)
            .then((response) => {
              this.listcategories = response.data.content;
              if (this.listcategories.length == 0) {
                this.message = "Aucune categorie pour le moment";
              }
            })
            .catch((err) => {
              Erreur.gestionErreur(err.message);
            })
            .then(() => {
              this.isLoading = false;
            });
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        });
    },

    get_categories_withouttoken() {
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
      this.listcategories = [];
      Api.getwithouttoken("/voting/api/awards/" + this.idaward)
        .then((response) => {
          this.award = response.data.content;
          Api.getwithouttoken("/voting/api/categorie/awards/" + this.idaward)
            .then((response) => {
              this.listcategories = response.data.content;
              localStorage.setItem(
                "categorieTab",
                JSON.stringify(this.listcategories)
              );
              if (this.listcategories.length == 0) {
                this.message = "Aucune categorie pour le moment";
              }
            })
            .catch((err) => {
              Erreur.gestionErreur(err.message);
            });
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        });
    },

    get_award() {
      Api.getwithouttoken("/voting/api/awards/" + this.idaward).then(
        (response) => {
          this.award = response.data.content;
        }
      );
    },
  },
};
</script>

<style>
.order-2 {
  @apply flex justify-end;
}

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