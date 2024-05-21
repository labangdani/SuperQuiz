import { createRouter, createWebHistory } from "vue-router";
import FormSignUp from '/src/components/Forms/FormSignUp.vue';
import FormForgetPassword from '/src/components/Forms/FormForgetPassword.vue';
import FormConnect from '/src/components/Forms/FormConnect.vue';
import FormOTP from '/src/components/Forms/FormOTP.vue';
import ResetPassword from '/src/components/Forms/ResetPassword.vue';
import ReadVideo from '/src/components/ReadVideo.vue';
import PolitiquePage from '/src/components/Politique.vue';
import ConditionPage from '/src/components/Condition.vue';
import ErrorPage from '/src/components/error404.vue';
import DetailarticlePage from '../components/Articles/Detailarticle.vue';
import ValidEmail from '../components/Forms/ValidEmail.vue';
import NewsPage from '../components/Articles/new.vue';
import DetailCandidatPage from '../components/Competition/DetailCandidat.vue';

const BrowsePage = () => import("./BrowsePage/index.vue");
const SearchPage = () => import("./SearchPage/index.vue");
const ReplayPage = () => import("./ReplayPage/index.vue");
const DirectPage = () => import("./DirectPage/index.vue");
const UserProfilePage = () => import("./UserProfilePage/index.vue");
const ProgrammePage = () => import("./ProgrammePage/index.vue");
const StreamPage = () => import("./StreamPage/index.vue");
const CategoriePage = () => import("./VotingPage/categorie.vue");
const CandidatePage = () => import("./VotingPage/candidate.vue");
const QuizPage = () => import("./JeuxPage/quiz.vue");


const routes = [
  {
    path: "/login",
    component: FormConnect,
    props: { isHeader: false },
  },

  {
    path: "/signin",
    component: FormSignUp,
    props: { isHeader: false },
  },

  {
    path: "/forgetpassword",
    component: FormForgetPassword,
    props: { isHeader: false },
  }, 

  {
    path: "/newpassword",
    component: ResetPassword,
    props: { isHeader: false },
  },

  {
    path: "/formotp",
    component: FormOTP,
    props: { isHeader: false },
  },

  {
    path: "/validemail",
    component: ValidEmail,
    props: { isHeader: false },
  },

  {
    path: "/politique",
    component: PolitiquePage,
    props: { isHeader: false },
  },

  {
    path: "/pagenotfound",
    component: ErrorPage,
    props: { isHeader: false },
  },

  {
    path: "/condition",
    component: ConditionPage,
    props: { isHeader: false },
  },

  {
    path: "/detailarticle/:id/:titre",
    component: DetailarticlePage,
    props: { isHeader: false },
  },
  
  {
    path: "/detailcandidat/:idcand/:idcat",
    component: DetailCandidatPage,
    props: { isHeader: false },
  },

  {
    path: "/awardcategorie",
    component: CategoriePage,
    props: { isHeader: false },
  },

  {
    path: "/categoriecandidat/:id",
    component: CandidatePage,
    props: { isHeader: false },
  },

  {
    path: "/quiz/:id",
    component: QuizPage,
    props: { isHeader: false },
  },
  
  {
    path: "/readvideo/:id/:shortDescription",
    component: ReadVideo,
    props: { isHeader: false },
    
  },


  {
    path: "/",
    component: BrowsePage,
    name: "Home",
    props: { isHeader: false },
  },

  {
    path: "/replay",
    component: ReplayPage,
    name: "Programmes",
    props: { isHeader: true },
  },

  {
    path: '/direct/:id',
    component: DirectPage,
    name: "Direct",
    props: { isHeader: true },
    // alias: '/browser/direct'
    
  },
  
  {
    path: "/browser/stream",
    component: StreamPage,
    name: "Stream",
    props: { isHeader: true },

  },

  {
    path: "/browser/news/article",
    component: NewsPage,
    name: "News",
    props: { isHeader: true },

  },

  {
    path: "/user/compte",
    component: UserProfilePage,
    name: "UserProfile",
    props: { isHeader: false },
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/search",
    component: SearchPage,
    name: "Search",
    props: { isHeader: false },
  },

  {
    path: "/program/:id",
    component: ProgrammePage,
  },

  { path: "/:pathMatch(.*)*", redirect: "/" },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, __, savedPosition) {
    if (to.query.scrollTop) {
      return { left: 0, top: to.query.scrollTop };
    }

    if (savedPosition) {
      return savedPosition;
    }

    return { left: 0, top: 0 };
  },
});

export default router;

