<template>
  <div class="w-full h-full bg-gray-200">
    <div class="mb-2 md:pb-16">
      <div class="banner-container relative">
        <QuizSkeleton class="w-full h-[200px] rounded-none" v-if="isLoading" />

        <div v-else>
          <img
            v-if="quiz.urlImagePaysage"
            :src="quiz.urlImagePaysage"
            class="block sm:hidden md:block object-contain"
          />
          <img
            v-if="quiz.urlImagePortrait"
            :src="quiz.urlImagePortrait"
            class="block md:hidden object-contain"
          />
        </div>
      </div>
    </div>

    <div>
      <div class="px-5 bg-gray-200 sm:px-4 md:px-8 xl:px-20">
        <QuizSkeleton v-if="isLoading" />
        <div v-else>
          <div
            v-if="listquestions.length == 0"
            class="mt-1 mr-5 text-black text-2xl font-bold"
          >
            {{ message }}
          </div>
          <div v-else class="grid">
            <div v-if="quiz.isDone == false && quiz.resultPublished == false">
              <div class="lg:px-16">
                <Quiz :Quiz="quiz" />
              </div>
            </div>
            <div v-if="quiz.isDone == false && quiz.resultPublished == true">
              <div class="lg:px-16">
                <Quiz :Quiz="quiz" />
              </div>
            </div>
            <div v-if="quiz.isDone == true && quiz.resultPublished == false">
              <div
                v-for="question in listquestions"
                :key="question.id"
                class="px-2 sm:px-2 lg:px-16"
              >
                <Quiz :Quiz="quiz" :ques="question" />
              </div>
            </div>
            <div v-if="quiz.isDone == true && quiz.resultPublished == true ">
              <div
                class="text-green-500  mb-5 rounded-full bg-black p-5 mx-[350px]"
                :class="{
                  'text-green-400': !participant.haveCorret,
                  'text-red-500': participant.haveCorret,
                }"
              >
                <p class="text-center font-bold text-lg">
                  Score:
                  <span class="ml-2"
                    >{{ participant.score }} / {{ listquestions.length }}</span
                  >
                </p>
                <p  class="text-center">
                  {{ usermessage }}
                  <span v-if="participant.haveCorrect" style="font-size: 30px">&#127881;</span>
                  <span v-if="!participant.haveCorrect" style='font-size:30px;'>&#128528;</span>
                </p>
                
                <p></p>
              </div>
              <div
                v-for="question in listquestions"
                :key="question.id"
                class="px-2 sm:px-2 lg:px-16"
              >
                <Quiz :Quiz="quiz" :ques="question" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-[#212122] px-10 py-10 items-center space-y-4">
      <div class="flex justify-center text-sm text-center">
        <!-- <div v-html="categorie.award.reglementation"></div>  -->
      </div>
    </div>
  </div>
</template>
  
  <script>
import QuizSkeleton from "../../skeletons/QuestionSkeleton.vue";
import Banner from "../../components/Banner.vue";
import { Api } from "../../helpers";
import Button from "../../components/Button.vue";
import BannerSkeleton from "../../skeletons/BannerSkeleton.vue";
import Erreur from "../../services/error";
import Image from "../../components/Image.vue";
import Quiz from "../../components/Jeux/Quiz.vue";
// import ButtonFloat from "../../components/ButtonFloat.vue";

export default {
  data() {
    return {
      videomessage: "",
      connected: false,
      token: "",
      user: "",
      quiz: {
        id: "",
        name: "",
        urlImagePortrait: "",
        urlImagePaysage: "",
        questions: [],
      },
      idquizz: "",
      isVisible: false,
      visible: true,
      visiblebtn: true,
      isLoading: true,
      message: "",
      usermessage: "",
      participant: {},
      user: {},
      listquestions: [],
      i: 0,
      fetch: false,
      listquiz: [],
    };
  },

  components: {
    Banner,
    Button,
    BannerSkeleton,
    Image,
    Quiz,
    QuizSkeleton,
    // ButtonFloat,
  },

  mounted() {
    this.token = localStorage.getItem("jwtToken");
    this.user = JSON.parse(localStorage.getItem("user"));
    this.idquizz = this.$route.params.id;
    this.addimpression(this.idquizz);
    if (this.token) {    
      this.get_score(this.idquizz);
      this.get_AllUserQuiz();
    } else {
      this.get_AllQuiz();
    }
  },

  methods: {
    get_score(idquizz) {
      console.log(idquizz);
      Api.get("/games/rest/participation/all-users/" + idquizz)
        .then((response) => {
          console.log(response);
          const listparticipants = response.data;
          listparticipants.forEach((item) => {
            if (this.user.id == item.id) {
              this.participant = item;
              if (this.participant.haveCorrect == true) {
                this.usermessage = "Félicitations, vous avez réussi le quiz!";
              } else {
                this.usermessage =
                  "Désolé, vous n'avez pas eu le nombre de points minimum pour réussir le quiz";
              }
            }
          });
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        });
    },

    addimpression(idquizz) {
      Api.postwithouttoken("/games/api/quizz/add-impression/" + idquizz)
        .then(() => {})
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        });
    },

    //Méthode qui retourne la liste des awards
    async get_AllUserQuiz() {
      this.listquiz = [];
      await Api.get("/games/rest/quizz/user/all")
        .then((response) => {
          this.listquiz = response.data;
          this.listquiz.forEach((quizz) => {
            if (this.idquizz == quizz.id) {
              this.quiz = quizz;
            }
          });
          this.listquestions = this.quiz.questions;
          if (this.listquestions.length == 0) {
            this.message = "Aucune question pour le moment";
          }
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        })
        .then(() => {
          this.isLoading = false;
        });
    },

    async get_AllQuiz() {
      this.listquiz = [];
      await Api.getwithouttoken("/games/api/quizz/all")
        .then((response) => {
          this.listquiz = response.data;
          console.log(this.listquiz);
          this.listquiz.forEach((quizz) => {
            if (this.idquizz == quizz.id) {
              this.quiz = quizz;
            }
          });
          this.listquestions = this.quiz.questions;
          if (this.listquestions.length == 0) {
            this.message = "Aucune question pour le moment";
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

.slidebutton {
  @apply bg-white;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>