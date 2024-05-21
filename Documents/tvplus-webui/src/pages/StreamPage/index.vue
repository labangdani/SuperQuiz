<template>
  <section class="sm:pt-20 px-[38px] sm:px-[38px] md:px-8 lg:px-14 xl:px-24">
    <p class="text-2xl sm:text-2xl lg:text-4xl mb-10 mt-5">Vidéos</p>

    <form class="items-center">
      <div class="relative w-full">
        <input
          type="search"
          @input="handleSearchChange"
          id="simple-search"
          class="mr-24 rounded border border-solid border-neutral-300 flex md:hidden sm:block focus:text-white placeholder-gray-100 bg-transparent text-md w-full p-1.5 mt-3 focus:border-green-600 focus:outline-none"
          placeholder="Rechercher un programme, une vidéo..."
          required
        />
      </div>
    </form>

    <!-- <div class="scrollable-container h-12">
      <div class="scrollable-content" ref="scrollableContent2">
        <div class="tag-list ml-14 mr-14">
          <div
            class="grid grid-flow-col overflow-auto block-chaine scroll-none space-x-4"
          >
            <div class="flex flex-col my-1 outline-none">
              <input
                :class="{ buttonclass: connect === 'tous' || connect === '' }"
                class="px-4 py-1 text-sm bg-gray-700 first-letter:uppercase rounded-full text-white"
                v-on:click="search('', tagname)"
                value="Toutes les catégories"
                type="submit"
              />
            </div>
            <div
              class="flex flex-col my-1 outline-none"
              v-for="categorie in listcategories"
              :key="categorie.id"
            >
              <input
                :class="{ buttonclass: connect === categorie.name }"
                :value="categorie.name"
                class="px-4 py-1 text-sm bg-gray-700 first-letter:uppercase rounded-full text-white"
                type="submit"
                v-on:click="search(categorie.name, tagname)"
                v-if="categorie.name != 'BanniereContainer'"
              />
            </div>
          </div>
        </div>
      </div>
      <button class="scroll-left-btn mt-1" @click="scrollLeft2()">&lt;</button>
      <button class="scroll-right-btn mt-1" @click="scrollRight2()">
        &gt;
      </button>
    </div>

    <div class="scrollable-container h-12 mt-2">
      <div class="scrollable-content" ref="scrollableContent">
        <div class="tag-list ml-14 mr-14">
          <div
            class="grid grid-flow-col overflow-auto block-chaine scroll-none space-x-4"
          >
            <div class="flex flex-col my-1 outline-none">
              <input
                :class="{
                  buttonclass: choicetag === 'tous' || choicetag === '',
                }"
                class="px-4 py-1 bg-gray-700 rounded-full text-sm text-white"
                value="Tous les tags"
                type="submit"
                v-on:click="search(categoryname, '')"
              />
            </div>
            <div
              class="flex flex-col my-1 outline-none"
              v-for="tag in listtags"
              :key="tag.id"
            >
              <input
                :class="{ buttonclass: choicetag === tag.name }"
                :value="tag.name"
                class="px-4 py-1 bg-gray-700 rounded-full text-sm text-white"
                type="submit"
                v-on:click="search(categoryname, tag.name)"
              />
            </div>
          </div>
        </div>
      </div>
      <button class="scroll-left-btn" @click="scrollLeft()">&lt;</button>
      <button class="scroll-right-btn" @click="scrollRight()">&gt;</button>
    </div> -->

    <div
      class="h-0 mb-4 border border-solid border-t-0 border-slate-800 opacity-25"
    ></div>

    <video-carousel-skeleton v-if="isLoading" />

    <div v-else>
      <p class="pt-6 text-white text-5xl">{{ message }}</p>

      <div class="grid xscol sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 mb-4">
        <div
          v-for="video in videos"
          :key="video.id"
          class="px-2 mb-10 hover:-translate-all hover:scale-105 duration-150"
        >
          <div
            class="cursor-pointer video-card relative h-[180px] sm:h-[180px] md:h-[180px] lg:h-[120px] 2xl:h-[135.106px]"
          >
          <router-link :to="'/readvideo/' + video.id + '/' + replaceSpacesWithDash(video.shortDescription)">
              <div>
                <img
                  :src="
                    video.thumbnail != null ? video.thumbnail : defaultimage
                  "
                  :class="{ ' shadow': isScaled }"
                  :alt="video.title"
                  key=""
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
                      {{ video.duration }}
                    </button>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
          <router-link :to="'/readvideo/' + video.id + '/' + replaceSpacesWithDash(video.shortDescription)">
            <div
              class="mt-2 flex space-x-3 text-left text-sm contrast-0"
              style="line-height: 1rem; font-size: 0.75rem"
            >
              <div class="flex space-x-1">
                <svg
                  class="h-4 w-4"
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
                <span>{{ video.dateSortie }}</span>
              </div>
              <div class="flex space-x-1">
                <svg
                  class="h-4 w-4"
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
                <span>{{ video.nbVues }}</span>
              </div>
            </div>
            <div
              class="truncatetwo hover:text-[#07693A] mt-1 text-xs lg:text-sm"
              :title="video.shortDescription"
            >
              {{ video.shortDescription }}
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>
  
<script>
import VideoCard from "../../components/VideoCard.vue";
import VideoCarouselSkeleton from "../../skeletons/VideoCarouselSkeleton.vue";
import IconArrowRight from "~icons/ic/outline-arrow-forward-ios";
import IconArrowLeft from "~icons/ic/outline-arrow-back-ios";
import { mapState } from "vuex";
import { createPopper } from "@popperjs/core";
import { Api } from "../../helpers";
import { ref } from "vue";
import useDevice from "../../hooks/useDevice";
import { useRouter } from "vue-router";
import Erreur from "../../services/error";
import moment from "moment";

export default {
  components: {
    VideoCard,
    VideoCarouselSkeleton,
    IconArrowRight,
    IconArrowLeft,
  },

  data() {
    return {
      programmes: [],
      videos: [],
      channels: "",
      onglet: "",
      connect: "",
      choicetag: "",
      categoryname: "",
      categorytitle: "Videos",
      tagname: "",
      showDropdown: false,
      selectedOption: "Chaînes",
      isDropdownVisible: false,
      isLoading: true,
      message: "",
      defaultimage: "",
    };
  },

  setup() {
    const { isMobile } = useDevice();

    const debounceTimeout = ref(null);
    const router = useRouter();

    const handleSearchChange = (e) => {
      const keyword = e.target.value;

      if (debounceTimeout.value) {
        clearTimeout(debounceTimeout.value);
      }

      debounceTimeout.value = setTimeout(() => {
        router.push({ path: "/search", query: { q: keyword } });
      }, 500);
    };

    return {
      handleSearchChange,
      isMobile,
    };
  },

  computed: {
    ...mapState({
      listcategories: "categories",
      listtags: "tags",
    }),
  },

  mounted() {
    window.addEventListener("click", this.closeDropdown);
    this.$store.dispatch("get_categories");
    this.$store.dispatch("get_tags");
    this.getAllVideos();
    this.getAllChannels();
  },

  beforeDestroy() {
    window.removeEventListener("click", this.closeDropdown);
  },

  methods: {
    replaceSpacesWithDash(phrase) {
      // Utilise la méthode replace avec une expression régulière pour remplacer les espaces par "-"
      var phraseAvecTirets = phrase.replace(/[\s,':;"]+/g, "-");
      return phraseAvecTirets;
    }, 

    capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },

    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
      createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
        placement: "bottom-end",
      });
    },

    closeDropdown(event) {
      if (!event.target.matches(".dropbtnlist")) {
        this.isDropdownVisible = false;
      }
    },

    scrollLeft() {
      this.$refs.scrollableContent.scrollBy({
        left: -150,
        behavior: "smooth",
      });
    },

    scrollRight() {
      this.$refs.scrollableContent.scrollBy({
        left: 150,
        behavior: "smooth",
      });
    },
    scrollLeft2() {
      this.$refs.scrollableContent2.scrollBy({
        left: -150,
        behavior: "smooth",
      });
    },

    scrollRight2() {
      this.$refs.scrollableContent2.scrollBy({
        left: 150,
        behavior: "smooth",
      });
    },

    selectOption(channel, channel_id) {
      this.selectedOption = channel;
      this.dropdownPopoverShow = false;
      if (channel_id != 0) {
        Api.getwithouttoken("/streamvod/api/channel/" + channel_id).then(
          (response) => {
            this.programmes = response.data.content;
          }
        );
      } else {
        this.getAllVideos();
      }
    },

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

    getAllVideos() {
      Api.getwithouttoken("/streamvod/api/videos/all")
        .then((response) => {
          const videostab = response.data.content;
          videostab.forEach((video) => {
            const formatDeSortie = "DD/MM/YYYY";
            video.dateSortie = moment(video.dateSortie).format(formatDeSortie);
            video.duration = this.formatDuration(video.duration);
            this.videos.push(video);
          });
          console.log(this.videos);
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        })
        .then(() => {
          this.isLoading = false;
        });
    },

    getAllChannels() {
      Api.getwithouttoken("/streamvod/api/channel/channel-all")
        .then((response) => {
          this.channels = response.data.content;
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        });
    },

    async search(category, tag) {
      this.isLoading = true;
      let uri;
      this.categoryname = category;
      this.tagname = tag;

      switch (true) {
        // case this.tagname !== '' && this.categoryname !== '' && keyword !== '':
        //   uri = Uri.https(host, searchUrlTagCategoryKeyword, queryParameterskeyWordTagAndCategory);
        //   queryParameters = { headers };
        //   devtools.log('0');
        //   break;
        // case this.categoryname !== '' && keyword !== '':
        //   uri = Uri.https(host, searchUrlCategoryKeyword, queryParametersKeywordAndCategory);
        //   queryParameters = { headers };
        //   devtools.log('1');
        //   break;
        // case this.tagname !== '' && keyword !== '':
        //   uri = Uri.https(host, searchUrlTagKeyword, queryParametersKeywordAndTag);
        //   queryParameters = { headers };
        //   devtools.log('2');
        //   break;
        // case keyword !== '':
        //   console.log
        //   uri = '/streamvod/rest/videos/search-kw?search=' + keyword;
        //   break;

        case this.categoryname !== "" && this.tagname !== "":
          this.categorytitle = this.categoryname;
          this.connect = this.categoryname;
          this.choicetag = this.tagname;
          uri =
            "/streamvod/api/videos/search-tags-cat?categories=" +
            this.categoryname +
            "&tags=" +
            this.tagname;
          break;

        case this.categoryname !== "" && this.tagname == "":
          this.categorytitle = this.categoryname;
          this.connect = this.categoryname;
          this.choicetag = "tous";
          uri =
            "/streamvod/api/videos/search-cat?categories=" + this.categoryname;
          break;

        case this.categoryname == "" && this.tagname !== "":
          this.categorytitle = "Programmes TV";
          this.choicetag = this.tagname;
          this.connect = "tous";
          uri = "/streamvod/api/videos/tags?tags=" + this.tagname;
          break;

        default:
          this.connect = "tous";
          this.choicetag = "tous";
          this.categorytitle = "Programmes TV";
          uri = "/streamvod/api/videos/all";
      }

      Api.getwithouttoken(uri)
        .then((response) => {
          this.videos = response.data.content.reverse();
          if (this.videos.length == 0) {
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
  },
};
</script>

<style>
@media (min-width: 400px) and (max-width: 639px) {
  .xscol {
    @apply grid grid-cols-1;
  }
}

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

.scroll-left-btn,
.scroll-right-btn {
  @apply bg-[#141414] hover:bg-gray-700;
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

.shadow {
  -webkit-box-shadow: 0px 0px 12px 0px #000000;
  box-shadow: 0px 0px 12px 0px #000000;
}

.video-card img {
  @apply object-cover rounded-lg absolute top-0 left-0 w-full h-full;
}

.dropbtnlist {
  @apply flex text-base font-bold text-white;
}

.truncatetwo {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.block-chaine::-webkit-scrollbar {
  width: 0;
}

.buttonclass {
  @apply hover:bg-[#07693A];
  background-color: #07693a;
}
</style>