<template>
  <div
    class="grid flex sm:grid-cols-5 md:grid-cols-2 space-x-5 border-2 border-[#07693A] rounded-xl p-4"
  >
    <div
      class="sm:col-span-2 md:col-span-1 cursor-pointer video-card relative w-full h-[192px] sm:h-[140px] md:h-[150px] 2xl:h-[200px]"
    >
      <Image
        :src="
          candidate.imagesMap.imageportrait != null
            ? candidate.imagesMap.imageportrait.url
            : defaultimage
        "
        :class="{ 'rounded-b-none shadow': isScaled }"
        :alt="candidate.name"
        key=""
      />
    </div>
    <div class="sm:col-span-3 md:col-span-1">
      <p
        class="truncate text-base sm:text-base md:text-lg 2xl:text-xl font-bold"
        :title="candidate.name"
      >
        {{ candidate.name }}
      </p>
      <p
        class="two-row-limit text-gray-400 mt-2 2xl:mt-3 text-sm lg:text-base xl:text-base"
        :title="candidate.description"
      >
        {{ candidate.description }}
      </p>
      <router-link :to="'/detailcandidat/' + candidate.id + '/' + categorieId">
        <div class="mt-2 text-xs sm:text-xs md:text-sm italic flex justify-end">
          En savoir plus >>
        </div>
      </router-link>
      <div
        class="sm:pt-4 md:pt-2 2xl:pt-7 text-base 2xl:text-xl flex justify-end"
      >
        <span class="rounded-full">
          <ButtonSpinner
            @click="checkuserpayment(candidate)"
            v-if="visiblebt == true"
            type="button"
            class="px-2"
            :fetching="fetch"
          >
            Je vote
          </ButtonSpinner>
        </span>

        <span
          v-if="token && candidatvote == candidate.id"
          class="inline-block whitespace-nowrap rounded-full bg-success-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-success-700"
        >
          Mon choix
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { Api } from "../../helpers";
import Image from "../Image.vue";
import ButtonSpinner from "../ButtonSpinner.vue";
import Erreur from "../../services/error";
import Swal from "sweetalert2";

export default {
  name: "candidate",

  props: ["candidate", "categorieId", "visible", "candvote"],

  components: {
    Image,
    ButtonSpinner,
  },

  data() {
    return {
      visiblebt: false,
      showfirstModal: false,
      fetch: false,
      Idcategorie: "",
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
      token: "",
      user: {},
      listvotecandidat: [],
      candidatvote: "",
      ispay: false,
    };
  },

  mounted() {
    this.token = localStorage.getItem("jwtToken");
    this.user = JSON.parse(localStorage.getItem("user"));
    this.visiblebt = this.visible;
    this.candidatvote = this.candvote;
  },

  methods: {
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
        confirmButtonColor: "#07693A",
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

    // Méthode qui retourne un candidat
    get_Candidat(candidatId) {
      this.listcandidats = [];
      Api.get("/voting/rest/candidat/" + candidatId)
        .then((response) => {
          const { content: candidatData } = response.data;
          this.candidat = candidatData;
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
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
      if (this.token) {
        Api.get("/voting/rest/categorie/" + this.categorieId).then(
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
          if (result.value) {
            this.$router.push("/login");
          }
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
          this.categorieId
      )
        .then((response) => {
          this.candidatvote = candidatId;
          this.visiblebt = false;
          Swal.fire({
            title: "Merci",
            text: "Votre vote a été pris en compte",
            confirmButtonText: "Ok",
            confirmButtonColor: "#07693A",
            icon: "success",
          }).then((result) => {
            location.reload();
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
.order-2 {
  @apply flex justify-end;
}

.two-row-limit {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* Number of rows to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>