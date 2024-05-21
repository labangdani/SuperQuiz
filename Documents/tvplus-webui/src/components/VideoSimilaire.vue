<template>
  <div class="scrollable-container h-12">
    <div class="scrollable-content" ref="scrollableContent">
      <div class="tag-list ml-14 mr-14">
        <div class="flex flex-col outline-none text-black">
          <input
            :class="{
              tagclass: texttag == 'videos_similaires' || texttag == '',
            }"
            class="px-4 rounded-lg py-1 text-base"
            value="Vidéos Similaires"
            type="submit"
            v-on:click="search('')"
          />
        </div>
        <div
          class="flex flex-col outline-none text-black"
          v-for="tag in listtags"
          :key="tag.id"
        >
          <input
            :class="{ tagclass: texttag == tag.name }"
            class="px-4 rounded-lg py-0.5 text-base"
            :value="tag.name"
            type="submit"
            v-on:click="search(tag.name)"
          />
        </div>
      </div>
    </div>
    <button class="scroll-left-btn" @click="scrollLeft()">&lt;</button>
    <button class="scroll-right-btn" @click="scrollRight()">&gt;</button>
  </div>

  <div v-show="isLoading">
    <div class="mt-5" v-for="index in items" :key="index">
      <div class="grid grid-cols-3 space-x-2">
        <!-- <div class="col-span-1"> -->
        <div
          class="animate-pulse bg-white bg-opacity-20 rounded-xl w-full h-[120px]"
        ></div>
        <!-- </div> -->
        <div class="col-span-2 py-2">
          <div
            class="animate-pulse bg-white bg-opacity-20 mt-1 mr-5 w-full h-4"
          ></div>
          <div
            class="animate-pulse bg-white bg-opacity-20 mt-2 w-full h-10"
          ></div>
          <div class="animate-pulse bg-white bg-opacity-20 mt-2 w-10 h-3"></div>
        </div>
      </div>
    </div>
  </div>

  <div class="max-h-screen overflow-y-scroll snap snap-y" v-show="!isLoading">
    <div v-if="videoSimilaires.length == 0" class="mt-5 mr-5 text-md font-bold">
      {{ message }}
    </div>

    <div
      class="mt-5"
      @click="reload"
      v-for="(videoSimilaire, index) in videoSimilaires"
      :key="index"
    >
      <router-link
        :to="
          '/readvideo/' +
          videoSimilaire.id +
          '/' +
          replaceSpacesWithDash(videoSimilaire.shortDescription)
        "
      >
        <div class="grid grid-cols-5 space-x-2">
          <div class="relative col-span-2">
            <img
              :src="
                videoSimilaire.thumbnail != null
                  ? videoSimilaire.thumbnail
                  : defaultimage
              "
              class="rounded-xl w-[200px] h-[100px]"
            />
            <div
              class="h-full w-full absolute inset-0 flex justify-center items-center"
            >
              <button class="rounded-full bg-opacity-60 bg-black">
                <svg
                  class="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
            <div
              class="h-full w-full absolute inset-0 flex justify-end items-end"
            >
              <div class="mr-2 mb-2">
                <button
                  class="text-xs px-1 rounded-md bg-opacity-60 bg-black text-right"
                >
                  {{ videoSimilaire.duration }}
                </button>
              </div>
            </div>
          </div>
          <div class="col-span-3 flex items-center">
            <div>
              <div
                class="text-xs truncatetwo lg:text-sm xl:text-base"
                :title="videoSimilaire.shortDescription"
              >
                {{ videoSimilaire.shortDescription }}
              </div>
              <div class="mt-1 flex space-x-4 text-sm contrast-0">
                <div class="flex space-x-1">
                  <svg
                    class="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>{{ videoSimilaire.dateSortie }}</span>
                </div>
                <div class="flex space-x-1">
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
                  <span>{{ videoSimilaire.nbVues }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import useBreakpoint from "../hooks/useBreakpoint";
import { Api } from "../helpers";
import { mapState } from "vuex";
import Erreur from "../services/error";
import moment from "moment";


export default {
  data() {
    return {
      isLoading: true,
      videoSimilaires: [],
      texttag: "videos_similaires",
      message: "",

    };
  },

  computed: {
    ...mapState({
      listtags: "tags",
    }),
  },

  setup() {
    const breakpoint = useBreakpoint();

    return {
      items: breakpoint.value.items,
    };
  },

  mounted() {
    this.$store.dispatch("get_tags");
    this.videoSimilaire();
    const scrollableContent = this.$refs.scrollableContent;
    scrollableContent.addEventListener("scroll", () => {
      const scrollLeft = scrollableContent.scrollLeft;
      const scrollWidth = scrollableContent.scrollWidth;
      const clientWidth = scrollableContent.clientWidth;

      if (scrollLeft === 0) {
        this.$refs.scrollLeftBtn = this.disabled;
      } else {
        this.$refs.scrollLeftBtn = !this.disabled;
      }

      if (scrollLeft + clientWidth === scrollWidth) {
        this.$refs.scrollRightBtn = this.disabled;
      } else {
        this.$refs.scrollRightBtn = !this.disabled;
      }
    });
  },

  methods: {
    formatDuration(seconds) {
      let hours = Math.floor(seconds / 3600);
      let minutes = Math.floor((seconds % 3600) / 60);
      let remainingSeconds = seconds % 60;

      // Ajoute un zéro devant si les chiffres sont inférieurs à 10
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      remainingSeconds =
        remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
      if (hours < 1) {
        return minutes + ":" + remainingSeconds + "s";
      } else {
        return hours + ":" + minutes + ":" + remainingSeconds + "s";
      }
    }, 
    
    replaceSpacesWithDash(phrase) {
      // Utilise la méthode replace avec une expression régulière pour remplacer les espaces par "-"
      var phraseAvecTirets = phrase.replace(/[\s,':;"]+/g, "-");
      return phraseAvecTirets;
    },

    //Scroller à gauche
    scrollLeft() {
      this.$refs.scrollableContent.scrollBy({
        left: -150,
        behavior: "smooth",
      });
    },

    //Scroller à droite
    scrollRight() {
      this.$refs.scrollableContent.scrollBy({
        left: 150,
        behavior: "smooth",
      });
    },

    //Retourne la liste des vidéos en fonction d'un tag
    async search(tag) {
      this.isLoading = true;
      let uri;
      this.tagname = tag;

      switch (true) {
        case this.tagname !== "":
          this.texttag = this.tagname;
          uri = "/streamvod/api/videos/tags?tags=" + this.tagname;
          break;

        default:
          this.texttag = "videos_similaires";
          uri =
            "/streamvod/api/videos/" +
            this.$route.params.id +
            "/videos-similaire";
      }

      Api.getwithouttoken(uri)
        .then((response) => {
          const videostab = response.data.content;
          videostab.forEach((video) => {
            const formatDeSortie = "DD/MM/YYYY";
            video.dateSortie = moment(video.dateSortie).format(formatDeSortie);
            video.duration = this.formatDuration(video.duration);
            this.videoSimilaires.push(video);
          });
          if (this.videoSimilaires.length == 0) {
            this.message = "Aucune vidéo";
          } else {
            this.message = "";
          }
        })
        .catch(function (err) {
          Erreur.gestionErreur(err.message);
        })
        .then(() => {
          this.isLoading = false;
        });
    },

    //*********** VIDEOS SIMILAIRES ***************
    async videoSimilaire() {
      await Api.getwithouttoken(
        "/streamvod/api/videos/" + this.$route.params.id + "/videos-similaire"
      )
        .then((response) => {
          const videostab = response.data.content;
          videostab.forEach((video) => {
            const formatDeSortie = "DD/MM/YYYY";
            video.dateSortie = moment(video.dateSortie).format(formatDeSortie);
            video.duration = this.formatDuration(video.duration);
            this.videoSimilaires.push(video);
          });
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        })
        .then(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
<style>
.scrollable-container {
  position: relative;
  /* width: 300px; */
  overflow: hidden;
}

.scrollable-content {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.tag-list {
  @apply space-x-4 my-2;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}

.tagclass {
  @apply bg-[#07693A] text-white;
}

.scroll-left-btn,
.scroll-right-btn {
  @apply bg-[#141414] hover:bg-[#141414];
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  /* border-radius: 50%; */
  border: none;
  color: #333;
  font-size: 16px;
  cursor: pointer;
}

.scroll-left-btn {
  @apply left-0 text-white;
}

.scroll-right-btn {
  @apply right-0 text-white;
}

.block-chaine::-webkit-scrollbar {
  width: 0;
}
</style>