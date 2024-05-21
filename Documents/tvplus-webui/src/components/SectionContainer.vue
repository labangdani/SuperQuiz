<template>
  <div class="space-y-10 px-[38px] sm:px-[38px] md:px-8 lg:px-14 xl:px-24">
    <award-skeleton v-if="isLoading" />
    <div v-else>
      <div class="mt-10" >
        <h1 v-if="listawards.length != 0"
          class="text-xl sm:text-xl md:text-4xl first-letter:uppercase body mb-6"
        >
          Voting en cours
        </h1>
        <competition :awards="listawards"></competition>
      </div>
      
    </div>

    <CategorieQuizSkeleton v-if="isLoading" />
    <div v-else>
      <div v-if="listquiz.length != 0">
        <h1
          class="text-xl sm:text-xl md:text-4xl first-letter:uppercase body mb-6"
        >
          Jeux/Quiz 
        </h1>
        <CategorieVue :quizzes="listquiz"></CategorieVue>
      </div>
      <div v-else>
        <CategorieVue :quizzes="listquiz"></CategorieVue>
      </div>
    </div>

    <LiveCardSkeleton v-if="isLoading"></LiveCardSkeleton>
    <div v-else>
      <div v-if="planificationslist.length != 0">
        <h1
          class="body text-sm sm:text-sm md:text-4xl space-x-2 flex justify-left"
        >
          <span class="first-letter:uppercase">
            en direct sur nos chaines
          </span>
          <button
            class="bg-red-700 ml-1 space-x-2 flex items-center px-2 py-1 font-bold body rounded-lg text-xs sm:text:xs md:text-lg"
          >
            <svg
              class="h-2 w-2 text-white rounded-full"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <circle cx="12" cy="12" r="9" />
            </svg>
            <p class="uppercase text-white">Direct</p>
          </button>
        </h1>
        <LiveCardVue :listplanifications="planificationslist"></LiveCardVue>
      </div>
    </div>

    <!-- <div>
      <h1
        class="text-xl sm:text-xl md:text-4xl first-letter:uppercase body mb-6"
      >
        {{ section.titre }}
      </h1>
      <ProgrammeVue :programmes="list"></ProgrammeVue>
    </div> -->

    <ProgrammeCarouselSkeleton v-if="isLoadingprosect" />
    <div v-else>
      <ProgrammeSect
        v-for="(sectionprogramme, index) in listsectionsprogrammes"
        :key="index"
        :sectionprogramme="sectionprogramme"
      ></ProgrammeSect>
    </div>

    <VideoCarouselSkeleton v-if="isLoading" />
    <div v-else>
      <Section
      class="mt-10"
        v-for="(sect, index) in sections"
        :key="index"
        :section="sect"
      ></Section>
    </div>
  </div>
</template>

<script>
import VideoCarouselSkeleton from "../skeletons/VideoCarouselSkeleton.vue";
import ProgrammeCarouselSkeleton from "../skeletons/ProgrammeCarouselSkeleton.vue";
import competition from "./Competition/competition.vue";
import Section from "./Section.vue";
import ProgrammeSect from "./ProgrammeSect.vue";
import Button from "./Button.vue";
import LiveCardVue from "./LiveCard.vue";
import CategorieVue from "./Jeux/Categorie.vue";
import ProgrammeVue from "./Programme.vue";
import { Api } from "../helpers";
import Erreur from "../services/error";
import moment from "moment";
import AwardSkeleton from "../skeletons/AwardSkeleton.vue";
import CategorieQuizSkeleton from "../skeletons/CatQuiz.vue";
import LiveCardSkeleton from "../skeletons/LiveCardSkeleton.vue";

export default {
  props: ["getstreams"],
  components: {
    Section,
    Button,
    LiveCardVue,
    CategorieVue,
    ProgrammeVue,
    competition,
    ProgrammeSect,
    AwardSkeleton,
    CategorieQuizSkeleton,
    VideoCarouselSkeleton,
    ProgrammeCarouselSkeleton,
    LiveCardSkeleton,
  },

  data() {
    return {
      isLoading: true,
      isLoadingprosect: true,
      connected: false,
      user: "",
      planif: [],
      planificationslist: [],
      // categorieslist:[],
      datedeb: "",
      datefin: "",
      list: [],
      sections: [],
      listawards: [],
      listquiz: [],
      listsectionpro: {},
      section: {},
      listsectionsprogrammes: [],
    };
  },

  mounted() {
    this.token = localStorage.getItem("jwtToken");
    this.user = JSON.parse(localStorage.getItem("user"));
    this.get_AllAwards();
    this.get_planning();
    this.get_programmes();
    this.get_sections_programme();
    this.get_sections();
    if (this.token) {
      this.get_AllUserQuiz();
    } else {
      this.get_AllQuiz();
    }
  },

  methods: {
    //Méthode qui retourne la liste des awards
    async get_AllAwards() {
      this.listawards = [];
      await Api.getwithouttoken("/voting/api/awards/all-awards")
        .then((response) => {
          const awardstab = response.data.content;
          awardstab.forEach((award) => {
            if (award.isPublished == true) {
              const formatDeSortie = "DD MMM. Y [à] HH[h]mm";
              const dateActuelle = new Date().toISOString().split("T")[0]; // Obtenez la date actuelle au format "YYYY-MM-DD"
              const dateFin = new Date(award.endDate)
                .toISOString()
                .split("T")[0]; // Obtenez la date fin au format "YYYY-MM-DD"
              award.endDate = moment(award.endDate).format(formatDeSortie);
              if (dateActuelle <= dateFin) {
                this.listawards.push(award);
              }
            }
          });
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        })
        .then(() => {
          this.isLoading = false;
        });
    },

    //Méthode qui retourne la liste des awards
    async get_AllUserQuiz() {
      this.listquiz = [];
      await Api.get("/games/rest/quizz/user/all")
        .then((response) => {
          const quiztab = response.data;
          quiztab.forEach((quiz) => {
            if (quiz.published == true) {
              const formatDeSortie = "DD MMM. Y [à] HH[h]mm";
              const dateActuelle = new Date().toLocaleString(); // Obtenez la date actuelle au format "YYYY-MM-DD"
              const dateDebut = new Date(quiz.startDate).toLocaleString();
              const dateFin = new Date(quiz.endDate).toLocaleString(); // Obtenez la date de fin au format "YYYY-MM-DD"
              quiz.endDate = moment(quiz.endDate).format(formatDeSortie);
              if (dateDebut <= dateActuelle && dateActuelle < dateFin) {
                this.listquiz.push(quiz);
              }
            }
          });
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        })
        .then(() => {
          this.isLoading = false;
        });
    },

    //Méthode qui retourne la liste des quiz
    async get_AllQuiz() {
      this.listquiz = [];
      await Api.getwithouttoken("/games/api/quizz/all")
        .then((response) => {
          const quiztab = response.data;
          console.log(quiztab)
          quiztab.forEach((quiz) => {
            if (quiz.published == true) {
              const formatDeSortie = "DD MMM. Y [à] HH[h]mm";
              const dateActuelle = new Date().toLocaleString(); // Obtenez la date actuelle au format "YYYY-MM-DD"
              const dateDebut = new Date(quiz.startDate).toLocaleString();
              const dateFin = new Date(quiz.endDate).toLocaleString(); // Obtenez la date de fin au format "YYYY-MM-DD"
              quiz.endDate = moment(quiz.endDate).format(formatDeSortie);
              if (dateDebut <= dateActuelle && dateActuelle < dateFin) {
                this.listquiz.push(quiz);
              }
            }
          });
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        })
        .then(() => {
          this.isLoading = false;
        });
    },

    //Retourne la liste des directs
    async get_planning() {
      const now = new Date();
      const response = await Api.getwithouttoken(
        "/streamvod/api/planification/all"
      );

      this.planif = response.data.content;

      this.planif.forEach((item) => {
        const planification = {
          channels: item.channels,
          description: item.description,
          id: item.id,
          programme: item.programme,
          startTime: item.startDate,
          endTime: item.endDate,
          startDate: "",
          endDate: "",
          progress: null,
        };

        const startDateWithoutTime = new Date(item.startDate).setHours(
          0,
          0,
          0,
          0
        );
        const endDateWithoutTime = new Date(item.endDate).setHours(0, 0, 0, 0);
        const nowWithoutTime = new Date(now).setHours(0, 0, 0, 0);

        if (
          startDateWithoutTime <= nowWithoutTime &&
          nowWithoutTime < endDateWithoutTime
        ) {
          if (item.startDate <= now && now <= item.endDate) {
            planification.startDate = new Date(
              item.startDate
            ).toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            });
            planification.endDate = new Date(item.endDate).toLocaleTimeString(
              "fr-FR",
              { hour: "2-digit", minute: "2-digit" }
            );
            this.planificationslist.push(planification);
          }
        }
      });
    },

    //Retourne les sections d'un programme
    async get_sections_programme() {
      await Api.getwithouttoken("/streamvod/api/sectionprogramme/all")
        .then((response) => {
          this.listsectionsprogrammes = response.data.content;
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        })
        .then(() => {
          this.isLoadingprosect = false;
        });
    },

    //Retourne des sections
    async get_sections() {
      await Api.getwithouttoken("/streamvod/api/section/all-test")
        .then((response) => {
          this.sections = response.data.content;
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        })
        .then(() => {
          this.isLoading = false;
        });
    },

    //Retourne les sections d'un programme
    // async get_quiz_categorie(){
    //   await Api.getwithouttoken('/jeux/api/categoriejeux/all')
    //   .then((response) => {
    //       this.categorieslist = response.data.content;
    //   })
    // },

    //Retourner la liste des programmes
    async get_programmes() {
      await Api.getwithouttoken("/streamvod/api/sectionprogramme/all").then(
        (response) => {
          this.listsectionpro = response.data.content;
          this.listsectionpro.forEach((item) => {
            this.section = item;
            this.list = item.programmes;
          });
        }
      );
    },
  },
};
</script>

<style>
</style>
