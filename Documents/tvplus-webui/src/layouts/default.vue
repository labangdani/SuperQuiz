<template>
  <app-header
    v-if="
      $route.path != '/login' &&
      $route.path != '/signin' &&
      $route.path != '/user/profile' &&
      $route.path != '/forgetpassword' &&
      $route.path != '/validemail' &&
      $route.path != '/pagenotfound' &&
      $route.path != '/formotp' &&
      $route.path != '/newpassword'
    "
  />
  <div
    class="min-h-screen"
    :style="[isModalActive && `margin-top: -${scrollTop}px`]"
  >
    <router-view v-slot="{ Component, route }">
      <transition
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
        mode="out-in"
      >
        <component
          :is="Component"
          :class="[isModalActive && 'fixed']"
          :key="route.fullPath"
        />
      </transition>
    </router-view>
  </div>

  <Footer> </Footer>
</template>
  
<script setup lang="js">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQueryProvider } from "vue-query";
import "animate.css";
import mainStore, { state } from "./../store";
import Swal from "sweetalert2";
import { Buffer } from "buffer";
import { useMeta } from "vue-meta";


const router = useRouter()
const $route = useRoute()

const { } = mainStore()

onMounted(()=> {

    if (localStorage.getItem("jwtToken")) {
        const jwtPayload = parseJwt(localStorage.getItem("jwtToken"));
        if (jwtPayload.exp < Date.now() / 1000) {
          // token expired
          Swal.fire({
            text: "Votre session a expiré",
            confirmButtonText: "Ok",
            confirmButtonColor: "#07693A",
          }).then(() => {
            localStorage.removeItem("user");
            localStorage.removeItem("jwtToken");
            router.push("/login");
          });
        }
      }
    
})

 
  
const parseJwt = (token) => {

var base64Url = token.split(".")[1];
var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
var jsonPayload = decodeURIComponent(
    Buffer.from(base64, "base64")
    .toString("ascii")
    .split("")
    .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    })
    .join("")
);

return JSON.parse(jsonPayload);
}


useQueryProvider({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

watch(
  () => state.isModalActive,
  () => {
    setTimeout(function () {
      window.scrollTo({
        left: 0,
        top: state.scrollTop,
      });
    }, 0);
  }
);
    return {
      ...toRefs(state),
    };

</script>
  