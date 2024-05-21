// import { createApp, h } from "vue";
import { createPinia } from "pinia";
import { createSSRApp } from "vue";
import App from "./App.vue";
import router from "./pages";
// import Erreur from './services/error';
import store from './store.js';
import VueLazyload from '@jambonn/vue-lazyload'
// import VueTelInput from 'vue3-tel-input';
import VueTelInput from 'vue-tel-input';
import 'vue3-tel-input/dist/vue3-tel-input.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import * as te from 'tw-elements';
import "./index.css";
import error from "./assets/error.png";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import firebaseConfig from "./key/firebaseConfig.json";
import JwPagination from 'jw-vue-pagination';
import VueModal from '@kouts/vue-modal';
import '@kouts/vue-modal/dist/vue-modal.css';
import VueSocialSharing from 'vue-social-sharing'
import { createMetaManager } from 'vue-meta'


export function createApp() {

  // Initialize Firebase
  const appid = initializeApp(firebaseConfig);
  const analytics = getAnalytics(appid);
  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth(appid);
  library.add(fas);

  const app = createSSRApp(App);
  const pinia = createPinia();
  app.use(pinia);
  app.component('fa', FontAwesomeIcon)
  app.component('jw-pagination', JwPagination)
  app.component('modal', VueModal)
  app.use(router)
  app.use(store)
  // .use(Erreur)
  app.use(te)
  app.use(VueTelInput)
  app.use(VueLazyload, {
    observer: true,
    preLoad: 1.3,
    error,
    attempt: 1,
  })
  app.use(VueSocialSharing)
  app.use(createMetaManager())

  return { app, router };

}  
