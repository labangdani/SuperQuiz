<template>
  <DetailCandidatSkeleton v-if="isLoading"></DetailCandidatSkeleton>
  <div v-else>
    <div
      class="relative px-5 mt-20 mx-5 items-center border-2 border-[#07693A] rounded-xl sm:mx-5 lg:mx-64 2xl:mx-96 mb-10"
    >
      <br />
      <br />
      <div class="flex justify-center">
        <div
          v-if="fetching"
          class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span
            class="!absolute flex justify-center !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >
            Loading...
          </span>
        </div>
        <img
          :src="candidat.imagesMap.imagepaysage.url"
          alt=""
          class="w-[300px] object-fill h-[200px]"
        />
      </div>
      <div class="mb-10">
        <p class="text-center mt-4 text-2xl lg:text-4xl font-bold">
          {{ candidat.name }}
        </p>
        <div class="text-lg text-center mt-8">
          {{ candidat.description }}
        </div>
        <div class="flex mt-5 justify-center">
          <ButtonSpinner
            v-if="visiblebtn == true"
            @click="checkuserpayment(candidat)"
            class="px-5 py-2 text-xl"
            :fetching="fetch"
          >
            Je vote
          </ButtonSpinner>
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
import ButtonSpinner from "../ButtonSpinner.vue";
import Erreur from "../../services/error";
import { Api } from "../../helpers";
import DetailCandidatSkeleton from "../../skeletons/DetailCandidatSkeleton.vue";
import Swal from "sweetalert2";

export default {
  components: {
    ButtonSpinner,
    DetailCandidatSkeleton,
  },

  data() {
    return {
      fetching: false,
      fetch: false,
      visiblebtn: true,
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
      candidat: {
        id: "",
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
      isLoading: true,
      lien: "", // Variable pour stocker l'URL
      idcategorie: "",
      listvotecandidat: [],
    };
  },

  mounted() {
    this.idcategorie = this.$route.params.idcat;
    this.user = JSON.parse(localStorage.getItem("user"));
    this.get_Candidat();
    if (this.user) {
      this.checkuservote();
    }
  },

  methods: {
    checkuservote() {
      this.listvotecandidat = [];
      Api.get("/voting/rest/vote/all-vote-categorie/" + this.idcategorie)
        .then((response) => {
          this.listvotecandidat = response.data.content;
          if (this.listvotecandidat.length !== 0) {
            this.listvotecandidat.forEach((item) => {
              if (this.user.id == item.userInfos.id) {
                this.visiblebtn = false;
              }
            });
          } else {
            this.visiblebtn = true;
          }
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        });
    },

    // Méthode qui retourne un candidat
    async get_Candidat() {
      this.listcandidats = [];
      await Api.getwithouttoken(
        "/voting/api/candidat/" + this.$route.params.idcand
      )
        .then((response) => {
          const { content: candidatData } = response.data;
          this.candidat = candidatData;
          Api.get("/voting/rest/categorie/" + this.idcategorie).then(
            (response) => {
              this.categorie = response.data.content;
            }
          );
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        })
        .then(() => {
          this.isLoading = false;
        });
    },

    confirm(cand, cat) {
      Swal.fire({
        html:
          "Vous êtes sur le point de voter <span style='font-weight: bold;'>" +
          cand.name +
          "</span> dans la catégorie <span style='font-weight: bold;'>" +
          cat.name +
          ".</span>",
        showCancelButton: true,
        cancelButtonColor: "#f46a6a",
        confirmButtonColor: "#34c38f",
        confirmButtonText: "Voter",
        cancelButtonText: "Annuler",
        customClass: {
          confirmButton: "order-2", // Ajoutez une classe CSS pour le bouton de confirmation
          cancelButton: "order-1", // Ajoutez une classe CSS pour le bouton d'annulation
        },
      }).then((result) => {
        if (result.value) {
          this.make_voting(cand.id);
        }
      });
    },

    Buy(cat) {
      Swal.fire({
        text:
          "L'accès aux votes vous coûtera " +
          cat.award.vote_price +
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
          this.initpaiement(cat);
        }
      });
    },

    initpaiement(categorie) {
      Api.post("/voting/rest/payment/init-transaction", {
        customer_email: this.user.email,
        customer_phone_number: this.user.telephone,
        amount: categorie.award.vote_price,
        awards_id: categorie.award.id,
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

    checkuserpayment(nomme) {
      this.fetch = true;
      if (this.user) {
        Api.get("/voting/rest/categorie/" + this.idcategorie).then(
          (response) => {
            this.categorie = response.data.content;
            Api.get(
              "/voting/rest/payment/is-user-pay/" + this.categorie.award.id
            )
              .then((response) => {
                this.ispay = response.data.content;
                if (this.ispay == false) {
                  this.Buy(this.categorie);
                } else {
                  this.confirm(nomme, this.categorie);
                }
              })
              .catch((err) => {
                Erreur.gestionErreur(err.message);
              })
              .then(() => {
                this.fetch = false;
              });
          }
        );
      } else {
        Swal.fire({
          text: "Merci de vous connecter pour continuer le vote.",
          showCancelButton: true,
          confirmButtonText: "Se connecter",
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
          this.$router.push("/login");
        });
        this.fetch = false;
      }
    },

    // méthde qui permet d'enregistrer le vote d'un utilisateur
    make_voting(candidatId) {
      this.listcandidats = [];
      Api.post(
        "/voting/rest/vote/add-vote/" +
          candidatId +
          "?categorie=" +
          this.idcategorie
      )
        .then((response) => {
          this.candidatvote = candidatId;
          this.visiblebtn = false;
          Swal.fire({
            title: "Merci",
            text: "Votre vote a été pri en compte",
            icon: "success",
          });
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