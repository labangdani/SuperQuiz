<template>
  <section class="sm:pt-20 px-[38px] sm:px-[38px] md:px-8 lg:px-14 xl:px-24">
    <p class="text-xl sm:text-xl md:text-4xl first-letter:uppercase body mb-2">
      programmes
    </p>

    <!-- <form class="items-center"> 
      <div class="relative w-full">
        <input type="search" @input="handleSearchChange" id="simple-search" class="mr-24 rounded border border-solid border-neutral-300 flex md:hidden sm:block focus:text-white placeholder-gray-100 bg-transparent text-md w-full p-1.5 mt-3 focus:border-green-600 focus:outline-none" placeholder="Rechercher un programme, une vidéo..." required>
      </div>
    </form> -->

    <!-- <div class="grid sm:grid-cols-3 md:grid-cols-6 pt-2.5 w-full">
      <div class="md:col-span-5 sm:col-span-2"> 
        <div class="overflow-auto py-2 flex block-chaine scroll-none space-x-4">
          <div class="flex flex-col my-1.5 outline-none" >
            <input :class="{buttonclass: connect === 'tous' || connect === ''}" class="px-4 py-1 text-base bg-gray-700 font-bold uppercase rounded-full text-white" v-on:click="search('',tagname)" value="Toutes les catégories" type="submit" >
          </div> 
          <div class="flex flex-col my-1.5 outline-none" v-for="categorie in listcategories" :key="categorie.id">
            <input :class="{buttonclass: connect === categorie.name}" :value=categorie.name class="px-4 py-1 text-base bg-gray-700 uppercase font-bold rounded-full text-white" type="submit" v-on:click="search(categorie.name, tagname)" v-if="categorie.name != 'BanniereContainer'" >
          </div> 
        </div>
      </div>
        
      <div class="col-span-1 flex py-2 justify-end">
        <button @click="toggleDropdown()" class="dropbtnlist" ref="btnDropdownRef">{{ selectedOption }}
          <svg class="h-6 w-6 pl-1 text-white" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="6 9 12 15 18 9" /></svg>            
        </button>

        <ul :class="{'hidden': !isDropdownVisible, 'block': isDropdownVisible}" class="bg-black z-50 float-left py-2 list-none text-left rounded shadow-lg " style="min-width:12rem" ref="popoverDropdownRef">
          <button v-for="channel in channels" class="text-base font-bold py-2 capitalize px-4 hover:bg-gray-800 block w-full whitespace-nowrap bg-transparent text-white" :key="channel.id" @click="selectOption(channel.channel_name, channel.id)">
            {{ channel.channel_name }}
          </button>
          <button class="text-base font-bold py-2 px-4 hover:bg-gray-800 block w-full whitespace-nowrap bg-transparent text-white"  @click="selectOption('Chaînes', 0)">
            Chaînes
          </button>
        </ul>
      </div>
    
    </div> -->

    <div
      class="h-0 mb-4 border border-solid border-t-0 border-slate-800 opacity-25"
    ></div>

    <ProgrammeCarouselSkeleton v-if="isLoading" />

    <div class="" v-else>
      <p class="pt-6 text-white text-5xl">{{ message }}</p>

      <div class="grid sm:grid-cols-2 mb-4 md:grid-cols-4 lg:grid-cols-6">
        <div
          v-for="programme in programmes"
          :key="programme.id"
          class="px-2 mb-10 hover:text-[#07693A] hover:-translate-all hover:scale-105 duration-150"
        >
          <div
            class="cursor-pointer video-card relative 2xl:h-[270.212px] h-[192px] sm:h-[245.325px] md:h-[210.663px] lg:h-[186.663px] xl:h-[222.225px]"
          >
            <router-link :to="'/program/' + programme.id">
              <Image
                :src="
                  programme.imageportrait != null
                    ? programme.imageportrait.url
                    : defaultimage
                "
                :class="{ 'rounded-b-none shadow': isScaled }"
                :alt="programme.nom"
                key=""
              />
            </router-link>
          </div>
          <router-link :to="'/program/' + programme.id">
            <div
              class="truncate px-5 mt-1 text-center text-xs lg:text-base font-bold"
              :title="programme.nom"
            >
              {{ programme.nom }}
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VideoCard from "../../components/VideoCard.vue";
import ProgrammeCarouselSkeleton from "../../skeletons/ProgrammeCarouselSkeleton.vue";
import IconArrowRight from "~icons/ic/outline-arrow-forward-ios";
import IconArrowLeft from "~icons/ic/outline-arrow-back-ios";
import { mapState } from "vuex";
import { createPopper } from "@popperjs/core";
import { Api } from "../../helpers";
import Image from "../../components/Image.vue";
import { ref } from "vue";
import useDevice from "../../hooks/useDevice";
import { useRouter } from "vue-router";
import Erreur from "../../services/error";

export default {
  components: {
    VideoCard,
    ProgrammeCarouselSkeleton,
    IconArrowRight,
    IconArrowLeft,
    Image,
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
      categorytitle: "Programmes TV",
      tagname: "",
      showDropdown: false,
      selectedOption: "Chaînes",
      isDropdownVisible: false,
      isLoading: false,
      message: "",
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
    // this.$store.dispatch('get_categories');
    // this.$store.dispatch('get_tags');
    this.get_programmes();
    // this.getAllChannels();
  },

  beforeDestroy() {
    window.removeEventListener("click", this.closeDropdown);
  },

  methods: {
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
        this.get_programmes();
      }
    },

    get_programmes() {
      this.isLoading = true;
      Api.getwithouttoken("/streamvod/api/programme/all")
        .then((response) => {
          this.programmes = response.data.content;
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        })
        .then(() => {
          this.isLoading = false;
        });
    },

    getAllChannels() {
      Api.getwithouttoken("/streamvod/api/channel/channel-all").then(
        (response) => {
          this.channels = response.data.content;
        }
      );
    },

    async search(category, tag) {
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
          uri = "/streamvod/api/programme/all";
      }

      this.isLoading = true;
      Api.getwithouttoken(uri)
        .then((response) => {
          this.programmes = response.data.content;
          // console.log(this.videos)
          if (this.programmes.length == 0) {
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

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.block-chaine::-webkit-scrollbar {
  width: 0;
}

.buttonclass {
  @apply hover:bg-[#07693A];
  background-color: #07693a;
}
</style>