<template>
  <div class="lg:px-14 xl:px-24 pb-6 sm:pt-16">
    <div class="lg:grid lg:grid-cols-5 flex space-x-10 lg:mt-10">
      <div class="lg:col-span-3 w-full">
        <div
          class="embed-responsive embed-responsive-16by9 relative inset-0 sm:mt-5 lg:mt-0 w-full overflow-hidden"
          style="padding-top: 56.25%"
          id="my-dailymotion-player"
        ></div>

        <!-- Lecteur vidéo -->
        <div
          :style="`display:${showAd ? 'block' : 'none'}`"
          class="inset-0 relative"
        >
        <div class="relative">
          <video
            id="my-pub-player"
            v-if="pubvid?.fichierPubMap?.vid_web_acc"
            class="h-full w-full object-contain rounded-xl"
            autoplay
            controls
          >
            <source :src="pubvid?.fichierPubMap?.vid_web_acc?.url" />
          </video>
          <div class="absolute "></div>
        </div>
          
          <div class="flex justify-end">
            <button
              v-if="showButton"
              class="rounded-full bg-opacity-60 bg-black -mt-16 px-5 py-1 mr-1 absolute text-sm font-bold"
              @click="closeAd()"
            >
              Passer l'annonce
            </button>
          </div>
        </div>
       

        <!-- <div
          class="bg-gray-700 w-full items-center lg:relative pb-[27%] pt-[24%] h-0 mb-4"
          v-if="videomessage"
        >
          <p class="text-white text-center mb-10">
            {{ videomessage }}
          </p>
          <div class="flex justify-center space-x-4">
            <button
              type="submit"
              class="px-2.5 py-1 sm:px-2.5 border border-solid sm:py-1 md:py-1.5 md:px-5 bg-transparent rounded-full"
            >
              <router-link to="/signin" class="text-white font-bold">
                Créer un compte</router-link
              >
            </button>
            <button
              type="submit"
              class="px-2.5 py-1 sm:px-2.5 sm:py-1 md:py-1.5 md:px-5 bg-[#07693A] rounded-full"
            >
              <router-link to="/login" class="text-white font-bold">
                Se connecter
              </router-link>
            </button>
          </div>
        </div> -->
        <div class="px-[38px] sm:px-[38px] md:px-8 lg:px-0">
          <h1
            class="pb-2.5 ml-2 mt-2 first-letter:uppercase sm:text-sm md:text-2xl text-white"
          >
            {{ title }}
          </h1>

          <div
            class="h-0 mb-2.5 border border-solid border-t-0 border-slate-800 opacity-25"
          ></div>

          <div class="flex justify-between mb-2.5 px-2.5">
            <div class="flex">
              <img
                class="w-10 h-10 rounded-full object-contain"
                :src="logochannel"
                alt=""
              />
              <p
                class="text-md sm:hidden md:block sm:text-sm md:text-lg pl-2 py-2"
              >
                {{ namechannel }}
              </p>
            </div>
            <div
              class="flex items-center space-x-1 text-sm"
              @click="likeVideo()"
            >
              <svg
                class="h-5 w-5"
                :class="{ colorGreen: islike === true }"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
                />
              </svg>
              <span>{{ likeTab.length }}</span>
            </div>
            <div class="flex items-center space-x-1 text-sm">
              <svg
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                />
              </svg>
              <span>{{ commentTab.length }}</span>
            </div>
            <div class="flex items-center space-x-1 text-sm">
              <svg
                class="h-5 w-5"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx="12" cy="12" r="2" />
                <path d="M2 12l1.5 2a11 11 0 0 0 17 0l1.5 -2" />
                <path d="M2 12l1.5 -2a11 11 0 0 1 17 0l1.5 2" />
              </svg>
              <span>{{ views }}</span>
            </div>
            <!-- <div class="flex items-center space-x-2"><svg class="h-6 w-6 text-white"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="18" cy="5" r="3" />  <circle cx="6" cy="12" r="3" />  <circle cx="18" cy="19" r="3" />  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg></div> -->
            <div class="flex items-center space-x-2" @click="favVideo()">
              <svg
                class="h-5 w-5"
                :class="{ colorGreen: isfav === true }"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </div>
          </div>

          <div
            class="h-0 m:b-4 border border-solid border-t-0 border-slate-800 opacity-25 mb-5"
          ></div>

          <div
            v-if="description"
            class="first-letter:uppercase bg-gray-700 rounded-lg p-2.5"
          >
            <p class="text-sm font-bold">Il y a {{ periode }}</p>
            <p
              class="text-md contrast-75"
              :class="{ truncatetwo: !showDescription }"
            >
              {{ description }}
            </p>
            <button v-if="!showDescription" @click="showalldescription()">
              <span class="font-bold">voir plus</span>
            </button>
            <button v-if="showDescription" @click="showalldescription()">
              <span class="font-bold">moins</span>
            </button>
          </div>

          <div class="lg:hidden my-5 h-full">
            <Pub />
          </div>

          <form class="mt-8">
            <div class="flex space-x-3 mb-4">
              <div v-if="user">
                <img
                  class="mb-0 h-10 w-10 rounded-full"
                  v-if="image"
                  :src="image.url"
                />
                <button
                  class="dropbtn md:w-10 md:h-10 mt-1 bg-[#07693A]"
                  v-if="!image"
                >
                  <span
                    >{{ user.surname.charAt(0).toUpperCase()
                    }}{{ user.name.charAt(0).toUpperCase() }}</span
                  >
                </button>
              </div>
              <div v-if="!user">
                <img
                  class="mb-0 h-10 w-10 rounded-full border-2"
                  src="../assets/images/profile.png"
                />
              </div>
              <input
                type="text"
                class="text-white outline-none border-b-2 bg-transparent text-md block w-full py-1.5"
                placeholder="Ajouter un commentaire"
                v-model="content_comment"
                @input="checkForm"
              />
            </div>
            <div class="flex justify-end sm:text-sm mb-4 space-x-4">
              <button @click.prevent="cancelComment()" class="border-b-2">
                Annuler
              </button>
              <div class="">
                <ButtonSpinner
                  class="px-2.5 py-1 sm:px-1 text-center rounded-full cursor-pointer sm:py-1 md:py-1.5 md:px-5 disabled:border-white disabled:border-2 disabled:bg-transparent disabled:cursor-not-allowed"
                  :disabled="formIncomplete"
                  :fetching="fetch"
                  @click.prevent="insertComment()"
                >
                  Ajouter un commentaire
                </ButtonSpinner>
              </div>
            </div>
          </form>

          <div
            class="h-0 mb-7 border border-solid border-t-0 border-slate-800 opacity-25"
          ></div>

          <div v-for="(comment, index) in commentTab" :key="index">
            <div class="flex space-x-4 mb-7" v-if="user">
              <img
                class="mb-0 h-10 w-10 rounded-full"
                v-if="comment.user_photo"
                :src="comment.user_photo"
              />
              <button
                class="dropbtn md:w-10 md:h-10 mt-1 bg-[#07693A]"
                v-if="!comment.user_photo"
              >
                <span
                  >{{ user.surname.charAt(0).toUpperCase()
                  }}{{ user.name.charAt(0).toUpperCase() }}</span
                >
              </button>

              <div>
                <div class="flex space-x-4">
                  <h1 class="font-bold">@{{ comment.user }}</h1>
                  <p class="text-sm mt-1">
                    {{ moment(comment.createdAt).fromNow() }}
                  </p>
                </div>
                <p class="text-gray-400">{{ comment.content }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="px-[38px] sm:px-[38px] md:px-8">
          <div class="lg:hidden sm:block">
            <VideoSimilaire />
          </div>
        </div>
      </div>

      <div class="lg:col-span-2 lg:block sm:hidden">
        <Pub />
        <VideoSimilaire />
      </div>
    </div>
  </div>
</template>

<script>
import { Api } from "../helpers";
import Swal from "sweetalert2";
import ButtonSpinner from "../components/ButtonSpinner.vue";
import Image from "./Image.vue";
import Erreur from "../services/error";
import moment from "moment";
import VideoSimilaire from "./VideoSimilaire.vue";
import Pub from "./Pub.vue";

export default {
  name: "ReadVideo",
  components: {
    Image,
    VideoSimilaire,
    Pub,
    ButtonSpinner,
  },

  data() {
    return {
      listepubsvid: [],
      periode: "",
      showButton: false,
      showAd: false,
      showDescription: false,
      pubvid: {},
      isLoading: true,
      message: "",
      disabled: true,
      videomessage: "",
      video: {},
      description: "",
      content_comment: "",
      commentTab: [],
      moment: moment,
      likeTab: [],
      favVideoTab: [],
      views: "",
      title: "",
      logochannel: "",
      namechannel: "",
      islike: false,
      isfav: false,
      user: {
        name: "",
        image: {
          url: "",
        },
        username: "",
        surname: "",
        telephone: "",
        email: "",
      },
      image: {
        id: "",
        name: "",
        size: "",
        url: "",
      },
      fetch: false,
      time: 7000,
      playerComposant: {},
    };
  },

  computed: {
    formIncomplete() {
      return !this.content_comment;
    },
  },

  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user) {
      this.image = this.user.image;
    }
    this.image = "";
    this.incrementViews();
    this.watchVideo();
    this.like();
    this.fav();
    // this.getVidAds();
  },

  beforeDestroy() {
    // Supprimer les écouteurs d'événements lors de la destruction du composant
    this.playerComposant.off(dailymotion.events.VIDEO_TIMECHANGE);

    pubPlayer.removeEventListener("ended", () => {
      this.closeAd();
    });
    // this.playerComposant.removeEventListener("timeupdate", this.handleTimeUpdate);
    // this.playerComposant.removeEventListener("ended", this.handleVideoEnded);
  },

  watch: {
    showAd(newValue) {
      if (this.playerComposant) {
        this.playerComposant.getRootNode().style.display = newValue
          ? "none"
          : "block";
      }
    },

    // showButton() {
    //   const pubPlayer = document.getElementById(" ");
    //   if (pubPlayer.currentTime >= 5000) {
    //     this.showButton = true;
    //   }
    // },
  },

  methods: {
    getDuration(dateAnterieure) {
      // Convertir la date antérieure en objet Date
      const dateAnterieureObj = new Date(dateAnterieure);
      // Obtenir la date d'aujourd'hui
      const aujourdHui = new Date();
      // Calculer la différence en millisecondes entre les deux dates
      const differenceMillisec = aujourdHui - dateAnterieureObj;

      // Constantes pour les durées en millisecondes
      const secondes = 1000;
      const minutes = secondes * 60;
      const heures = minutes * 60;
      const jours = heures * 24;
      const semaines = jours * 7;
      const mois = jours * 30;
      const annees = jours * 365;

      // Tableau des unités de temps et leurs durées en millisecondes
      const unitesTemps = [
        { unite: "an", duree: annees },
        { unite: "mois", duree: mois },
        { unite: "semaine", duree: semaines },
        { unite: "jour", duree: jours },
        { unite: "heure", duree: heures },
        { unite: "minute", duree: minutes },
        { unite: "seconde", duree: secondes },
      ];

      // Parcourir le tableau des unités de temps
      for (const { unite, duree } of unitesTemps) {
        if (differenceMillisec >= duree) {
          const quantite = Math.floor(differenceMillisec / duree);
          return `${quantite} ${unite}${quantite !== 1 ? "s" : ""}`;
        }
      }

      // Si la différence est inférieure à une seconde
      return "moins d'une seconde";
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

    showalldescription() {
      if (this.showDescription == true) {
        this.showDescription = false;
      } else {
        this.showDescription = true;
      }
    },

    handlePub() {
      // Afficher la publicité de pré-roll avant de commencer la vidéo principale
      const pubPlayer = document.getElementById("my-pub-player");
      pubPlayer.addEventListener("timeupdate", () => {
        if (pubPlayer.currentTime >= 5) {
          this.showButton = true;
        }
      });
      pubPlayer.addEventListener("ended", () => {
        this.closeAd();
      });
    },

    closeAd() {
      // Fermer la publicité et reprendre la lecture de la vidéo
      const pubPlayer = document.getElementById("my-pub-player");
      pubPlayer.pause();
      this.showAd = false;
      this.playerComposant.play();
    },

    async getVidAds() {
      await Api.getwithouttoken("/publicite/api/publicite/all-ads")
        .then((response) => {
          const pubstab = response.data.content;
          pubstab.forEach((item) => {
            if (item.fichierPubMap.vid_web_acc && item.published == true) {
              const dateActuelle = new Date().toISOString().split("T")[0]; // Obtenez la date actuelle au format "YYYY-MM-DD"
              const dateFin = new Date(item.endDate)
                .toISOString()
                .split("T")[0]; // Obtenez la date actuelle au format "YYYY-MM-DD"
              if (dateActuelle <= dateFin) {
                this.listepubsvid.push(item);
              }
            }
          });
          const shuffledProgrammes = this.shuffleArray(this.listepubsvid);
          shuffledProgrammes.forEach((item) => {
            this.pubvid = item;
          });
          this.showAd = true;
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        });
    },
    async getVidAds2() {
      console.log(this.listepubsvid)
      const shuffledProgrammes = this.shuffleArray(this.listepubsvid);
      shuffledProgrammes.forEach((item) => {
        this.pubvid = item;
      });
      console.log(shuffledProgrammes)
      console.log(this.pubvid)
      this.showAd2 = true;
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

    capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },

    //Recharger une page
    reload() {
      location.reload();
    },

    // Méthode qui permet d'ajouter un commentaire
    insertComment() {
      this.fetch = true;
      if (this.token) {
        if (this.content_comment.trim() !== "") {
          Api.post("/streamvod/rest/comments/create/" + this.$route.params.id, {
            content: this.content_comment,
          })
            .then((response) => {
              this.commentTab.push(response.data.content);
              this.commentTab = this.commentTab.slice().reverse();
              this.content_comment = "";
            })
            .catch(function (err) {
              Erreur.gestionErreur(err.message);
            })
            .then(() => {
              this.fetch = false;
            });
        }
      } else {
        this.content_comment = "";
        this.fetch = false;
        Swal.fire({
          text: "Merci de vous connecter pour commenter cette vidéo.",
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
      }
    },

    //Méthode qui permet de liker une vidéo
    likeVideo() {
      Api.put("/streamvod/rest/likes/" + this.$route.params.id)
        .then((response) => {
          // mettre à jour le nombre de vues dans l'interface utilisateur
          this.likeTab = response.data.content.likedUsers;
          this.like();
        })
        .catch(function (err) {
          Erreur.gestionErreur(err.message);
        });
    },

    // Méthode qui permet de mettre une vidéo en favoris
    favVideo() {
      Api.put("/streamvod/rest/fav/" + this.$route.params.id)
        .then((response) => {
          // mettre à jour le nombre de vues dans l'interface utilisateur
          this.favVideoTab = response.data.content.favUsers;
          this.fav();
        })
        .catch(function (err) {
          Erreur.gestionErreur(err.message);
        });
    },

    //changer la couleur de l'icône like
    like() {
      if (this.likeTab.includes(this.$store.state.user.username)) {
        this.islike = true;
      } else {
        this.islike = false;
      }
    },

    //Changer la couleur de l'icône favoris
    fav() {
      if (this.favVideoTab.includes(this.$store.state.user.username)) {
        this.isfav = true;
      } else {
        this.isfav = false;
      }
    },

    //Formater le nombre de vues
    formatNumber(number) {
      if (number >= 1000000000) {
        return (number / 1000000000).toFixed(1) + " Milliards";
      } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + " Millions";
      } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + " Milliers";
      } else {
        return number;
      }
    },

    // Incrementer le nombre de vues d'une vidéo
    incrementViews() {
      // appel à l'API pour incrémenter le nombre de vues
      Api.putwithouttoken(
        "/streamvod/api/videos/add-vue/" + this.$route.params.id
      )
        .then((response) => {
          // mettre à jour le nombre de vues dans l'interface utilisateur
          this.views = this.formatNumber(response.data.content.nbVues);
        })
        .catch(function (err) {
          Erreur.gestionErreur(err.message);
        });
    },

    //Vérifier que l'input des commentaires est actif
    checkForm() {
      this.$nextTick(() => {
        this.formIncomplete = !this.content_comment;
      });
    },

    //Annuler un commentaire
    cancelComment() {
      this.content_comment = "";
    },

    //*********** VIDEOS EN LECTURE ***************
    async watchVideo() {
      const result = await Api.getwithouttoken(
        "/streamvod/api/videos/" + this.$route.params.id
      );
      this.video = result.data.content;
      this.description = this.video.description;
      this.title = this.video.title;
      this.views = this.video.nbVues;
      this.logochannel = this.video.channel.channel_logo.url;
      this.namechannel = this.video.channel.channel_name;
      this.likeTab = this.video.likedUsers;
      this.commentTab = this.video.comments.slice().reverse();
      this.favVideoTab = this.video.favUsers;
      this.periode = this.getDuration(this.video.dateSortie);
      // if (this.token == null) {
      //   this.videomessage = "Vous devez être connecté pour lire cette vidéo";
      // } else {
      // this.$refs.videoPlayer.src =
      //   "https://geo.dailymotion.com/player/xpnus.html?video=" +
      //   this.video.privateId;
      dailymotion
        .createPlayer("my-dailymotion-player", { video: this.video.privateId })
        .then((player) => {
          this.playerComposant = player;

          this.playerComposant.on(dailymotion.events.VIDEO_PLAYING, () => {
            this.getVidAds();
            this.playerComposant.off(dailymotion.events.VIDEO_PLAYING);
          });

          // this.playerComposant.on(dailymotion.events.VIDEO_TIMECHANGE, (state) => {
          //   if (state.videoTime >= state.videoDuration / 2) {
          //     this.getVidAds();
          //     this.playerComposant.off(dailymotion.events.VIDEO_TIMECHANGE);
          //   }
          // });

          this.playerComposant.on(dailymotion.events.VIDEO_TIMECHANGE, () => {
            this.handlePub();
            this.playerComposant.pause();
            this.playerComposant.off(dailymotion.events.VIDEO_TIMECHANGE);
          });

          this.playerComposant.on(dailymotion.events.PLAYER_END, () => {
            this.getVidAds2();
            this.playerComposant.off(dailymotion.events.PLAYER_END);
          });

          // this.playerComposant.addEventListener("timeupdate", this.handleTimeUpdate);
          // this.playerComposant.addEventListener("ended", this.handleVideoEnded);
        })
        .catch((err) => console.error(err));
      //
    },
  },
};
</script>

<style>
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

.block-chaine::-webkit-scrollbar {
  width: 0;
}

.pd-10 {
  padding: 20px;
}

.mb-3 {
  transition: all 0.5s ease;
}

.mb-3:hover {
  transform: scale(1.1);
  z-index: 99;
}

.input-comment {
  width: 100%;
}

.annuler {
  background-color: transparent;
  border: none;
  width: 140px;
  height: 50px;
  border-bottom: 2px white solid;
  color: white;
  font-weight: bold;
  transition: all 0.5s ease;
  margin-right: 20px;
}

.annuler:hover {
  transform: scale(1.1);
}

.comment-button {
  margin-top: 20px;
  float: right;
}

.colorGreen {
  color: #07693a;
}

.text-white .router-link {
  color: white;
  text-decoration: none;
}

.title-video {
  font-weight: bold;
  color: white;
}

.description-video {
  color: white;
  padding-right: 10px;
}

.shadow {
  -webkit-box-shadow: 0px 0px 12px 0px #000000;
  box-shadow: 0px 0px 12px 0px #000000;
}

.video-card img {
  @apply object-cover rounded-md absolute top-0 left-0 w-full h-full;
}

.submit-button:disabled {
  cursor: not-allowed;
  background-color: #d1d5db;
  color: #111827;
}

.submit-button:disabled:hover {
  background-color: #9ca3af;
}

.active {
  background-color: #07693a;
}

.truncatetwo {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
