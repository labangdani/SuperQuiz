<template>
  <div
    class="header top-0 fixed z-50 w-full h-16 transition duration-700"
    :class="[!isTop && 'bg-background']"
  >
    <div class="header__overlay absolute inset-0 h-full w-full"></div>
    <div class="navbar" id="accordionExample">
      <div class="flex items-center justify-between">
        <mobile-nav class="md:hidden" />

        <div
          class="relative md:flex w-full justify-between items-center sm:hidden text-md"
        >
          <router-link to="/">
            <img :src="logo" alt="logo" class="h-full w-32 object-cover" />
          </router-link>
          <div
            v-for="route in routes"
            :key="route.path"
            :class="{ menuclass: currentRoute.name === route.name }"
          >
            <router-link
              :to="route.path"
              role="presentation"
              aria-selected="false"
            >
              {{ route.name }}
            </router-link>
          </div>
        </div>
      </div>

      <div class="md:flex justify-end sm:hidden">
        <Search />

        <div>
          <div v-if="!token">
            <button
              @click="login()"
              class="btn-login border border-white rounded-full"
            >
              Se Connecter
            </button>
          </div>

          <div class="flex pr-2 items-center space-x-4 justify-end" v-else>
            <img
              class="dropbtn"
              :class="{ 'float-right': isDropdownVisible_b }"
              @click="toggleDropdown_b()"
              v-if="user.image"
              :src="user.image.url"
              alt="Image de profile"
              ref="btnDropdownRef"
            />
            <button
              class="dropbtn md:w-10 md:h-10 mt-1 bg-[#07693A]"
              :class="{ 'float-right': isDropdownVisible_b }"
              @click="toggleDropdown_b()"
              v-if="!user.image"
              ref="btnDropdownRef"
            >
              {{ user.surname.charAt(0).toUpperCase()
              }}{{ user.name.charAt(0).toUpperCase() }}
            </button>

            <div
              :class="{
                hidden: !isDropdownVisible_b,
                block: isDropdownVisible_b,
              }"
              class="bg-black text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
              style="min-width: 12rem"
              ref="popoverDropdownRef_b"
            >
              <router-link
                to="/user/compte"
                class="flex items-center text-sm py-2 px-4 hover:bg-gray-800 block w-full whitespace-nowrap bg-transparent"
              >
                <svg
                  class="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Mon Compte
              </router-link>
              <div
                class="h-0 my-2 border border-solid border-t-0 border-slate-800 opacity-25"
              ></div>
              <div class="flex">
                <a
                  href=""
                  @click="deconnect()"
                  class="text-sm flex items-center hover:bg-gray-800 py-2 px-4 block w-full whitespace-nowrap bg-transparent"
                >
                  <svg
                    class="h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Déconnexion
                </a>
              </div>
              <!-- <div class="flex">
                <a
                  href=""
                  @click="deconnect()"
                  class="text-sm flex items-center hover:bg-gray-800 py-2 px-4 block w-full whitespace-nowrap bg-transparent"
                >
                  <svg
                    class="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                  Apparence
                </a>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import useHeaderRoute from "../hooks/useHeaderRoute";
import Search from "./Search.vue";
import Image from "./Image.vue";
import logo from "../assets/logo.png";
import MobileNav from "./MobileNav.vue";

import { mapState } from "vuex";
import { createPopper } from "@popperjs/core";
import CircleButton from "./CircleButton.vue";

export default {
  components: {
    Search,
    MobileNav,
    Image,
    CircleButton,
  },

  data() {
    return {
      logo,
      message_error: "",
      input: "",
      connect: false,
      token: "",
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
      menu: "",
      defaultimage: "../assets/images/profile.png",
      isDropdownVisible_a: false,
      isDropdownVisible_b: false,
    };
  },

  computed: {
    ...mapState({
      videos: "videos",
    }),
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("click", this.closeDropdown_a);
    window.addEventListener("click", this.closeDropdown_b);
    this.user = JSON.parse(localStorage.getItem("user"));
    this.token = localStorage.getItem("jwtToken");
  },

  beforeDestroy() {
    window.removeEventListener("click", this.closeDropdown_a);
    window.removeEventListener("click", this.closeDropdown_b);
  },

  methods: {
    //gérer le côté scrollable de l'entête
    handleScroll() {
      this.isTop = window.scrollY === 0;
    },

    //retourne une liste déroulante sous l'action click de l'image de profile
    toggleDropdown_a() {
      this.isDropdownVisible_a = !this.isDropdownVisible_a;
      createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef_a, {
        placement: "bottom",
      });
    },

    //retourne une liste déroulante sous l'action click de l'image de profile
    toggleDropdown_b() {
      this.isDropdownVisible_b = !this.isDropdownVisible_b;
      createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef_b, {
        placement: "bottom-end",
      });
    },

    //ferme la liste déroulante sous l'action click de l'image de profile
    closeDropdown_a(event) {
      if (!event.target.matches(".dropbtnlistho")) {
        this.isDropdownVisible_a = false;
      }
    },

    //ferme la liste déroulante sous l'action click de l'image de profile
    closeDropdown_b(event) {
      if (!event.target.matches(".dropbtn")) {
        this.isDropdownVisible_b = false;
      }
    },

    //affiche la barre de recherche
    input_show() {
      this.input = "ok";
      this.$store.dispatch("get_videos");
    },

    //Masque la barre de recherche
    input_dismiss() {
      this.input = "";
    },

    //Récupérer la liste des menus du header
    get_menu() {
      this.menu = "Programm";
    },

    //Déconnecte l'utilisateur connecté
    login() {
      console.log(this.$route);
      localStorage.setItem("path", this.$route.fullPath);
      this.$router.push("/login");
    },

    //Déconnecte l'utilisateur connecté
    deconnect() {
      this.$store.commit("logout");
      this.$router.push("/");
    },
  },

  setup() {
    const { currentRoute, routes } = useHeaderRoute();
    const isTop = ref(true);
    let user_search_movies = ref("");
    watch(user_search_movies, (newValue) => {
      this.$store.dispatch("get_videos");
    });

    return {
      currentRoute,
      routes,
      isTop,
      user_search_movies,
    };
  },
};
</script>
<style>
/* From Netflix */
.header__overlay {
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(10%, rgba(0, 0, 0, 0.7)),
    color-stop(10%, rgba(0, 0, 0, 0))
  );
  background-image: -webkit-linear-gradient(
    top,
    rgba(0, 0, 0, 0.7) 10%,
    rgba(0, 0, 0, 0)
  );
  background-image: -o-linear-gradient(
    top,
    rgba(0, 0, 0, 0.7) 10%,
    rgba(0, 0, 0, 0)
  );
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7) 10%,
    rgba(0, 0, 0, 0)
  );
}

.btn-login {
  width: 150px;
  height: 40px;
  color: white;
  font-weight: bold;
}

.menuclass {
  @apply inline-block focus:text-gray-300 focus:border-gray-300 border-b-4 font-bold;
}

.navbar {
  @apply relative grid flex items-center;
  @apply sm:px-2.5;
  @apply md:grid-cols-2 md:px-2.5;
  @apply lg:px-10 xl:px-20;
}

.dropdown {
  float: right;
  position: relative;
  display: inline-block;
}

.dropbtnlistho {
  @apply font-bold;
}

.dropbtn {
  @apply h-12 w-12 mt-1 rounded-full cursor-pointer;
}
</style>