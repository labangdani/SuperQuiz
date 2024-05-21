<template>
  <div
    class="cursor-pointer transition-all duration-300"
    :class="{
      'animate-card-hover': isScaled,
      'animate-card-unhover': !isScaled,
    }"
    @click="handleClick"
  >
    <router-link :to="'/readvideo/' + video.id + '/' + replaceSpacesWithDash(video.shortDescription)">
      <div class="relative">
        <Image
        :src="video.thumbnail != null ? video.thumbnail : defaultimage"
        :class="{ 'animate-card-hover': isScaled }"
        :alt="video.title"
      />
        <div
        class="absolute inset-0 flex justify-center items-center"
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
      <div class="h-full w-full absolute inset-0 flex justify-end items-end">
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
</template>

<script>
import Image from "./Image.vue";

export default {
  props: ["video"],
  
  components: {
    Image,
  },

  data() {
    return {
      connected: false,
      user: "",
      defaultimage: "../../assets/images/default_image.jpg",
    };
  },

  mounted() {},

  methods: {
    replaceSpacesWithDash(phrase) {
      // Utilise la méthode replace avec une expression régulière pour remplacer les espaces par "-"
      var phraseAvecTirets = phrase.replace(/[\s,':;"]+/g, "-");
      return phraseAvecTirets;
    },
    // appel à l'API pour incrémenter le nombre de vues
    incrementViews(video_id) {
      Api.put("/streamvod/rest/videos/update-vue/", +video_id)
        .then((response) => {
          // mettre à jour le nombre de vues dans l'interface utilisateur
          this.views = response.data.views;
        })
        .catch((error) => {});
    },
  },
};
</script>

<style scoped>
.shadow {
  -webkit-box-shadow: 0px 0px 12px 0px #000000;
  box-shadow: 0px 0px 12px 0px #000000;
}

.video-card img {
  @apply object-contain space-x-4 absolute top-0 left-0 w-full h-full;
}
</style>