<template>
  <div class="w-full flex justify-between items-center text-md font-bold">
    <router-link to="/">
      <img :src="logo" alt="logo" class="w-20 h-20 object-contain" />
    </router-link>
    <router-link to="/replay">
      <svg
        class="h-5 w-5 text-white mx-5"
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
        <circle cx="10" cy="10" r="7" />
        <line x1="21" y1="21" x2="15" y2="15" />
      </svg>
      <p class="text-xs text-center">Programmes</p>
    </router-link>

    <router-link to="/direct/:id">
      <svg
        class="h-5 w-5 text-white mx-1"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="2" />
        <path
          d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"
        />
      </svg>
      <p class="text-xs text-center">Direct</p>
    </router-link>

    <router-link to="/browser/stream">
      <svg
        class="h-5 w-5 text-white mx-2"
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
        <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -5v5h5" />
        <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 5v-5h-5" />
      </svg>
      <p class="text-xs text-center">Stream</p>
    </router-link>

    <router-link to="/browser/news/article">
      <svg
        class="h-5 w-5 text-white"
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
        <path
          d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11"
        />
        <line x1="8" y1="8" x2="12" y2="8" />
        <line x1="8" y1="12" x2="12" y2="12" />
        <line x1="8" y1="16" x2="12" y2="16" />
      </svg>
      <p class="text-xs text-center">News</p>
    </router-link>

    <router-link to="/user/compte" v-if="this.token">
      <img
        class="h-8 w-8 rounded-full cursor-pointer"
        v-if="user.image"
        :src="user.image.url"
        alt="Image de profile"
      />
      <button
        class="h-8 w-8 rounded-full cursor-pointer bg-[#07693A]"
        v-if="!user.image"
        ref="btnDropdownRef"
      >
        <span class="text-xs"
          >{{ user.surname.charAt(0).toUpperCase()
          }}{{ user.name.charAt(0).toUpperCase() }}</span
        >
      </button>
    </router-link>

    <button @click="login()" v-else>
      <img
        class="h-8 w-8 rounded-full cursor-pointer border border-solid"
        src="../assets/images/profile.png"
        alt="Image de profile"
      />
    </button>
  </div>
</template>

<script>
import useHeaderRoute from "../hooks/useHeaderRoute";
import { createPopper } from "@popperjs/core";
import { ref } from "vue";
import logo from "../assets/logo.png";

export default {
  data() {
    return {
      logo,
      token: "",
      isDropdownVisible_a: false,
      isDropdownVisible_b: false,
    };
  },

  setup() {
    const { currentRoute, routes } = useHeaderRoute();
    return {
      currentRoute,
      routes,
    };
  },

  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.token = localStorage.getItem("jwtToken");
    window.addEventListener("click", this.closeDropdown_a);
  },

  beforeDestroy() {
    window.removeEventListener("click", this.closeDropdown_a);
  },

  methods: {
    login() {
      localStorage.setItem("path", this.$route.path);
      this.$router.push("/login");
    },

    //retourne une liste déroulante sous l'action click de l'image de profile
    toggleDropdown_a() {
      this.isDropdownVisible_a = !this.isDropdownVisible_a;
      createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef_a, {
        placement: "bottom",
      });
    },

    //ferme la liste déroulante sous l'action click de l'image de profile
    closeDropdown_a(event) {
      if (!event.target.matches(".dropbtnlistho")) {
        this.isDropdownVisible_a = false;
      }
    },
  },
};
</script>

<style>
.dropbtnlistho {
  @apply font-bold;
}
</style>
