<template>
  <div class="w-full">
    <div class="grid grid-cols-2 pb-5 pt-2">
        <ul class="flex sm:space-x-10 md:space-x-8 " >
          <li >
            <a :class="{buttonclass: connect === 'programmes' || connect === ''}"  v-on:click="getProgrammesUser()" class="bg-black px-4 py-1 rounded-full text-sm text-white uppercase font-bold" > <button class="">Mes Programmes</button> </a>
          </li>
          <li >
            <a :class="{buttonclass: connect === 'videos'}" v-on:click="getVideosUser()" class="bg-black px-4 py-1 rounded-full text-sm text-white uppercase font-bold" > <button class="">Mes Videos</button> </a>
          </li>
        </ul>
    </div>
    <div class="h-0 mb-4 border border-solid border-t-0 border-slate-800 opacity-25"></div>
    
    <video-carousel-skeleton v-show="isLoading" />

    <div v-show="!isLoading">
      <p class=" pt-6 text-white text-4xl">{{ message }}</p>

      <div class="grid sm:grid-cols-2 mb-4 md:grid-cols-4 lg:grid-cols-6 " >
        <div v-for="video in listvideos" :key="video.id" class="px-2 mb-10">
          <video-card :video="video" :id="video.id" />
          <router-link :to="'/readvideo/' + video.id"> 
            <div class="truncate capitalize px-5 mt-1 text-left text-xs lg:text-base font-bold" :title="video.shortDescription">{{video.shortDescription}}</div>
          </router-link>
        </div>
      </div>
    </div>

      <!-- <div
        ref="container"
        class="carousel-container mb-14 pt-6 relative"
        :class="[childHovering ? 'animate-z-hover' : 'animate-z-unhover']"> 
        <div class="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div class="mb-10" v-for="video in listvideos" :key="video.id">
            <video-card :video="video" :id="video.id" />
            <div class="truncate px-4 mt-1 mr-5 text-center text-md font-bold" :title="video.title">{{video.title}}</div>
          </div>
        </div>
      </div> -->

  </div>
</template>

<script>
import VideoCard from "../../components/VideoCard.vue";
import VideoCarouselSkeleton from "../../skeletons/VideoCarouselSkeleton.vue";
import IconArrowRight from "~icons/ic/outline-arrow-forward-ios";
import IconArrowLeft from "~icons/ic/outline-arrow-back-ios";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import useDevice from "../../hooks/useDevice";
import {Api} from '../../helpers';
import Image from "../Image.vue";
import Erreur from '../../services/error';

export default {

  components: {
    VideoCard,
    VideoCarouselSkeleton,
    Swiper,
    SwiperSlide,
    IconArrowRight,
    IconArrowLeft,
    Image,
  },

  setup() {
    const { isDesktop } = useDevice();
    return {
      isDesktop,
    };
  },

  data(){
    return {
      listvideos:"",
      connect:"",
      message:"",
      isLoading: false
    }
  },

  mounted(){
    this.getProgrammesUser()
  }, 

  methods:{

    //Retourne la liste de tous les programmes favories d'un utilisateur
    getProgrammesUser(){

      this.connect = 'programmes'
      this.message = "Aucun programme en favori"
      this.listvideos = ""
      
    },

    //Retourne la liste de toutes les vidéos favories d'un utilisateur
    async getVideosUser() {
      try {
        this.isLoading = true
        this.connect = 'videos';
        const response = await Api.getwithouttoken('/streamvod/api/fav/videos/all');
        this.listvideos = response.data.content;
        console.log(this.listvideos)

        if (this.listvideos.length === 0) {
          this.message = "Aucune vidéo en favori";
        } else {
          this.message = "";
        }
      } 
      catch (error) {
        Erreur.gestionErreur(error.message);
      }
      finally{
        this.isLoading = false
      }
    }

  }

};
</script>
<style>

.shadow {
  -webkit-box-shadow: 0px 0px 12px 0px #000000;
  box-shadow: 0px 0px 12px 0px #000000;
}

.video-card img {
  @apply object-cover rounded-lg absolute top-0 left-0;
}

.active{
  background-color: #07693A;
}

.buttonclass{
  @apply rounded-full font-bold px-4 py-1 hover:bg-[#07693A];
  background-color: #07693A;
}

.swiper {
  overflow: visible;
}

.swiper-button-disabled {
  display: none;
}

.swiper:hover .swiper-button svg,
.swiper:hover .swiper-pagination {
  visibility: visible;
}

.swiper-button svg {
  visibility: hidden;
}

.swiper-button-next,
.swiper-button-prev {
  @apply absolute h-full w-6 md:w-12 mt-0 top-0 bg-black bg-opacity-50;
  z-index: 2;
}

.swiper-button-prev {
  @apply -left-6 md:-left-12;
}

.swiper-button-next {
  @apply -right-6 md:-right-12;
}

.swiper-pagination {
  @apply space-x-1 w-24 h-0.5 absolute right-0 -top-4 flex invisible;
}

.swiper-pagination-bullet {
  @apply h-full bg-secondary hidden md:block;
  flex: 1 1 0%;
}

.swiper-pagination-bullet-active {
  @apply bg-white;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>