<template>
  <div>
    <div
      class="pt-24 pb-12 relative z-1 bg-gradient-to-b from-[#07693A] to-black wrapper px-5 sm:px-5 md:px-8 xl:px-20 xl:pt-48"
    >
      <h1 class="text-white font-bold pb-4 xl:pb-16 text-3xl xl:text-4xl">
        Mon compte
      </h1>
      <div
        class="relative flex items-center xl:hidden sm:pl-5 space-x-4 sm:mb-5 text-md font-bold"
      >
        <button
          :class="{ usermenuclass: connect === 'infos' || connect === '' }"
          @click="getInfos()"
        >
          Mes infos
        </button>
        <button
          :class="{ usermenuclass: connect === 'favoris' }"
          @click="getFavoris()"
        >
          Mes favoris
        </button>
      </div>
      <div class="flex">
        <div
          class="xl:w-52 sm:hidden xl:block xl:shrink-0 xl:pl-0 xl:mb-0 md:pl-8 pl-5 mb-4"
        >
          <ul class="space-y-5">
            <li class="pl-6 text-lg">
              <button
                :class="{
                  usermenuclass: connect === 'infos' || connect === '',
                }"
                @click="getInfos()"
              >
                Mes infos
              </button>
            </li>
            <li class="pl-6 text-lg">
              <button
                :class="{ usermenuclass: connect === 'favoris' }"
                @click="getFavoris()"
              >
                Mes favoris
              </button>
            </li>
          </ul>
        </div>
        <UserProfileForm
          v-if="isprofile == true"
          @redirect="redirect"
        ></UserProfileForm>
        <UserFavoris v-else></UserFavoris>
      </div>
    </div>
    <div
      class="h-0 mb-2.5 border border-solid border-t-0 border-slate-800 opacity-25"
    ></div>
    <div class="flex justify-center mb-2.5 px-2.5">
      <a
        href=""
        @click="disconnect()"
        class="text-sm text-center py-2 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-white"
      >
        Se Déconnecter
      </a>
    </div>
    <div
      class="h-0 border border-solid border-t-0 border-slate-800 opacity-25"
    ></div>
  </div>
</template>

<script>
import UserProfileForm from "../../components/Forms/UserProfileForm.vue";
import UserFavoris from "../../components/Forms/UserFavoris.vue";

export default {
  data() {
    return {
      isprofile: true,
      connect: "",
    };
  },

  components: {
    UserProfileForm,
    UserFavoris,
  },

  mounted() {},

  methods: {
    getInfos() {
      this.isprofile = true;
      this.connect = "infos";
    },

    getFavoris() {
      this.isprofile = false;
      this.connect = "favoris";
    },

    disconnect() {
      this.$store.commit("logout");
      // window.location.assign('/')
      this.$router.push("/");
    },
  },
};
</script>

<style>
.usermenuclass {
  @apply xl:text-xl font-bold border-b-4 transition duration-300;
}
</style>