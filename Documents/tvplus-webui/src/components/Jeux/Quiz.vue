<template>
  <div v-if="!Quiz.isDone" class="flex justify-center overflow -mb-4">
    <button class="bg-white rounded-full text-gray-700 px-6 py-2">
      Question {{ i + 1 }}/{{ Quiz.questions.length }}
    </button>
  </div>

  <div
    class="grid items-center bg-black space-x-5 rounded-xl sm:p-5 lg:p-10 mb-6"
    style="box-shadow: 0 8px 2px 2px #c3c2c1"
  >
    <h1
      class="lg:text-xl lg:mb-8 text-white text-lg font-bold text-center mt-4 first-letter:uppercase"
    >
      {{ question.content }}
      <p v-if="question.isMultiChoice" class="text-base">
        (Sélectionner les réponses correctes)
      </p>
    </h1>

    <div v-if="question.indication != ''" class="flex justify-between mb-2">
      <div class=" ">Indice</div>
      <div @click="showindice(question.indication)">
        <svg
          class="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>

    <div
      class="h-0 border border-solid border-t-0 border-slate-800 mb-4 opacity-50"
    ></div>

    <div
      class="text-center text-red-600 mb-2 first-letter:uppercase"
      v-if="message != ''"
    >
      <strong>{{ message }}</strong>
    </div>

    <form class="mt-2">
      <div v-if="listoptions.length <= 2">
        <div v-for="option in listoptions" :key="option.id">
          <div class="mb-4 mt-8 space-y-2 text-lg">
            <div
              :class="{
                'bg-yellow-400': choice.includes(option.answer.id),
                'hover:bg-gray-400': question.isDone == false,
                'bg-yellow-500':
                  listansweruser.includes(option.answer.id) &&
                  Quiz.resultPublished === false,
                'bg-green-500':
                  option.answer.isCorrect == true &&
                  Quiz.resultPublished === true &&
                  Quiz.isDone == true,
                'bg-red-400':
                  option.answer.isCorrect == false &&
                  Quiz.resultPublished === true &&
                  Quiz.isDone == true,
              }"
              class="text-black flex space-x-2 bg-gray-300 p-2.5 rounded-full mb-0"
              @click="choose(option.answer.id)"
            >
              <div
                :class="{
                  'bg-white':
                    (listansweruser.includes(option.answer.id) &&
                      Quiz.resultPublished) ||
                    (option.answer.isCorrect == true && Quiz.resultPublished),
                }"
                class="w-8 h-8 text-white text-center rounded-full bg-black"
              >
                <div v-if="Quiz.resultPublished">
                  <div v-if="option.answer.isCorrect == true">
                    <svg
                      class="h-8 w-8 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div
                    v-if="
                      option.answer.isCorrect == false &&
                      listansweruser.includes(option.answer.id)
                    "
                  >
                    <svg
                      class="h-8 w-8 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <div
                    v-if="
                      option.answer.isCorrect == false &&
                      !listansweruser.includes(option.answer.id)
                    "
                  >
                    {{ option.index }}
                  </div>
                </div>
                <div v-else>
                  {{ option.index }}
                </div>
              </div>
              <p class="first-letter:uppercase">{{ option.answer.content }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid gap-4 md:grid-cols-2" v-else>
        <div v-for="option in listoptions" :key="option.id">
          <div class="my-4 space-y-2 text-lg">
            <div
              :class="{
                'bg-yellow-400': choice.includes(option.answer.id),
                'hover:bg-gray-500': question.isDone == false,
                'bg-yellow-500':
                  listansweruser.includes(option.answer.id) &&
                  Quiz.resultPublished === false,
                'bg-green-500':
                  option.answer.isCorrect == true &&
                  Quiz.resultPublished === true &&
                  Quiz.isDone == true,
                'bg-red-400':
                  option.answer.isCorrect == false &&
                  listansweruser.includes(option.answer.id) == true &&
                  Quiz.resultPublished === true &&
                  Quiz.isDone == true,
              }"
              class="text-gray-700 flex space-x-4 bg-gray-300 p-2.5 rounded-full mb-0"
              v-on:click="choose(option.answer.id)"
            >
              <div
                :class="{
                  'bg-white':
                    listansweruser.includes(option.answer.id) &&
                    Quiz.resultPublished,
                }"
                class="w-8 h-8 text-white text-center rounded-full bg-gray-700"
              >
                <div v-if="Quiz.resultPublished === true">
                  <div
                    v-if="
                      option.answer.isCorrect == true &&
                      listansweruser.includes(option.answer.id)
                    "
                  >
                    <svg
                      class="h-8 w-8 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  <div
                    v-if="
                      option.answer.isCorrect == false &&
                      listansweruser.includes(option.answer.id)
                    "
                  >
                    <svg
                      class="h-8 w-8 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <div
                    v-if="
                      option.answer.isCorrect == true &&
                      !listansweruser.includes(option.answer.id)
                    "
                  >
                    {{ option.index }}
                  </div>
                  <div
                    v-if="
                      option.answer.isCorrect == false &&
                      !listansweruser.includes(option.answer.id)
                    "
                  >
                    {{ option.index }}
                  </div>
                </div>

                <div v-else>
                  {{ option.index }}
                </div>
              </div>
              <p class="first-letter:uppercase">{{ option.answer.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>

  <div class="flex items-center justify-center text-lg mb-10">
    <ButtonSpinner
      v-if="question.isDone == false"
      @click="confirm_choose()"
      type="submit"
      class="text-white cursor-pointer bg-yellow-600 font-bold py-2 px-10 focus:outline-none focus:shadow-outline"
      :fetching="fetch"
    >
      Envoyer
    </ButtonSpinner>
    <!-- <ButtonSpinner
      v-else
      @click="get_next()"
      type="submit"
      class="text-white cursor-pointer bg-yellow-600 font-bold py-2 px-10 focus:outline-none focus:shadow-outline"
      :fetching="fetch"
    >
      {{btntext}}
    </ButtonSpinner> -->
  </div>
</template>
  
  <script>
import { Api } from "../../helpers";
import Image from "../Image.vue";
import ButtonSpinner from "../ButtonSpinner.vue";
import Erreur from "../../services/error";
import Swal from "sweetalert2";

export default {
  name: "Quiz",

  props: ["Quiz", "ques"],

  components: {
    Image,
    ButtonSpinner,
  },

  data() {
    return {
      visiblebt: false,
      message: "",
      showfirstModal: false,
      fetch: false,
      choice: [],
      token: "",
      user: {},
      question: {},
      ispay: false,
      isboolean: false,
      listoptions: [],
      i: 0,
      btntext: "Suivant",
      listansweruser: [],
    };
  },

  mounted() {
    this.token = localStorage.getItem("jwtToken");
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.token) {
      this.user_choice();
    }

    if (this.Quiz.isDone == false) {
      this.visiblebt = true;
      this.get_question();
    } else {
      this.get_ques();
    }
  },

  methods: {
    get_ques() {
      this.question = this.ques;
      this.get_options(this.question.id);
    },

    // get_next() {
    //   this.i = this.i + 1;
    //   this.get_question();
    // },

    showindice(indice) {
      Swal.fire({
        // title: "Merci",
        text: indice,
        confirmButtonText: "Fermer",
        confirmButtonColor: "#07693A",
        icon: "info",
      });
    },

    // get_question() {
    //   if (this.i < this.Quiz.questions.length) {
    //     this.question = this.Quiz.questions[this.i];
    //     console.log(this.question);
    //     this.get_options(this.question.id);
    //   }
    // },

    get_question() {
      if (this.i < this.Quiz.questions.length) {
        this.question = this.Quiz.questions[this.i];
        console.log(this.question);
        if (this.question.isDone == true) {
          this.i = this.i + 1;
          this.get_question();
        } else {
          this.get_options(this.question.id);
        }
      }
    },

    get_options(idquestion) {
      this.listoptions = [];
      let currentIndex = "A"; // Initialize the index variable
      Api.getwithouttoken("/games/api/answer/" + idquestion + "/question")
        .then((response) => {
          const options = response.data;
          console.log(this.listoptions);
          if (options.length == 0) {
            this.message = "Aucune option";
          }
          options.forEach((opt) => {
            this.listoptions.push({ index: currentIndex, answer: opt });
            // Increment the index for the next iteration
            currentIndex = String.fromCharCode(currentIndex.charCodeAt(0) + 1);
          });
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        });
    },

    choose(a) {
      this.message = "";
      if (this.token) {
        if (this.question.isDone == false) {
          if (this.question.isMultiChoice == false) {
            if (this.choice.length != 0) {
              this.choice = [];
            }
            this.choice.push(a);
          } else {
            let index = this.choice.indexOf(a);
            if (index !== -1) {
              this.choice.splice(index, 1);
            } else {
              this.choice.push(a);
            }
          }
          console.log(this.choice);
        }
      } else {
        Swal.fire({
          text: "Merci de vous connecter pour participer au quiz.",
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

    // méthode qui permet de valider un choix
    confirm_choose() {
      this.message = "";
      this.fetch = true;

      if (this.choice.length == 0) {
        this.message = "Merci de sélectionner une réponse";
        this.fetch = false;
      }
      Api.post(
        `/games/rest/participation/create/${this.question.id}/${this.choice}`
      )
        .then(() => {
          if (this.i == this.Quiz.questions.length - 1) {
            this.btntext = "Terminer";
          }
          this.choice.length == 0;
          this.i = this.i + 1;
          if (this.i < this.Quiz.questions.length) {
            this.get_question();
          } else {
            this.$router.push("/");
          }
          console.log("Bye");
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        })
        .then(() => {
          this.fetch = false;
        });
    },

    // méthode qui retourne les reponses sélectionner par un user dans un quiz
    user_choice() {
      this.listansweruser = [];
      Api.get(`/games/rest/answer/history/${this.Quiz.id}`).then((response) => {
        const questions = response.data.questions;
        questions.forEach((question) => {
          const answers = question.answers;
          answers.forEach((answer) => {
            this.listansweruser.push(answer.id);
            console.log(answer);
          });
        });
        console.log(this.listansweruser);
      });
    },

    Buy() {
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
          this.initpaiement();
        }
      });
    },

    initpaiement() {
      Api.post("/voting/rest/payment/init-transaction", {
        customer_email: this.user.email,
        customer_phone_number: this.user.telephone,
        amount: Quiz.vote_price,
        awards_id: Quiz.id,
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
  },
};
</script>
  
  <style>
.order-2 {
  @apply flex justify-end;
}
</style>





