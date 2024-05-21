<template>
  <div class="text-black">
    <div class="bg-gray-100 pt-24 pb-4">
      <div class="mx-6 lg:mx-[48px] text-lg sm:text-lg lg:text-3xl">
        <nav class="w-full rounded-md">
          <ol
            class="list-reset flex text-lg sm:text-lg lg:text-3xl"
            v-if="categorytitle"
          >
            <li>
              <button @click="reloadPage()">
                <p class="text-[#07693A] font-bold">News</p>
              </button>
            </li>
            <li>
              <span class="mx-2 text-neutral-400">/</span>
            </li>
            <li class="text-neutral-400">
              {{ categorytitle }}
            </li>
          </ol>
          <button @click="reloadPage()" v-else>
            <p class="text-neutral-400">News</p>
          </button>
        </nav>
      </div>
    </div>

    <div class="bg-white sm:pt-5 pb-[30px]">
      <div class="mx-6 lg:mx-[48px]">
        <div class="lg:grid lg:grid-cols-3 sm:hidden">
          <div class="lg:col-span-2">
            <ArticleSkeleton v-if="isLoading && paginate.length == 0" />
            <div v-if="!isLoading && paginate.length != 0">
              <div class="" v-for="article in paginate" :key="article._id">
                <router-link
                  :to="
                    '/detailarticle/' +
                    article.id +
                    '/' +
                    replaceSpacesWithDash(article.titre)
                  "
                >
                  <div class="grid lg:grid-cols-3 mt-10">
                    <div class="md:col-span-1 overflow-hidden">
                      <img
                        :src="article.imagesMap.imageportrait.url"
                        class="w-full h-[180px] rounded-lg transition-transform transform-gpu hover:scale-110 object-cover"
                      />
                    </div>
                    <div class="md:col-span-2 lg:ml-6 py-2">
                      <button
                        class="bg-[#07693A] text-white px-2 uppercase font-bold text-xs py-1"
                      >
                        {{ article.categorie.name }}
                      </button>
                      <h6
                        class="truncate mt-2 first-letter:uppercase mr-5 sm:text-lg lg:text-2xl hover:underline hover:decoration-2"
                        :title="article.titre"
                      >
                        <strong>{{ article.titre }}</strong>
                      </h6>
                      <div class="flex space-x-4">
                        <p
                          class="text-md first-letter:uppercase text-gray-400 mt-2"
                        >
                          By {{ article.autheur }} .
                          {{ article.creationDate }}
                        </p>
                        <div class="flex items-center space-x-2 mt-1">
                          <svg
                            class="h-5 w-5 text-green-500"
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
                          <p>{{ article.nb_vue }}</p>
                        </div>
                        <div class="flex items-center space-x-2 mt-1">
                          <svg
                            class="h-5 w-5 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                          <p>{{ article.like_users.length }}</p>
                        </div>
                      </div>
                      <div
                        class="two-row-limit mt-2 first-letter:uppercase mr-5 text-lg text-justify"
                        v-html="article.content"
                      ></div>
                    </div>
                  </div>
                </router-link>
                <hr />
              </div>
              <pagination
                :totalPages="50"
                :perPage="itemsPerPage"
                :currentPage="currentPage"
                @pagechanged="onPageChange"
                class="mt-5"
              />
            </div>
            <div class="text-3xl pr-5" v-else>
              {{ message }}
            </div>
          </div>
          <div class="lg:col-span-1 lg:pl-4">
            <form class="items-center mt-10">
              <div class="relative mb-4 flex w-full flex-wrap items-stretch">
                <input
                  type="search"
                  class="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none focus:z-[3] focus:border-[#07693A] focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-[#07693A]"
                  placeholder="Search"
                  v-model="keyword"
                />

                <!--Search button-->
                <button
                  class="relative z-[2] flex items-center rounded-r bg-[#07693A] px-6 py-2.5 text-xs font-medium hover:bg-[#07693A] focus:bg-[#07693A] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#07693A] active:shadow-lg"
                  type="button"
                  id="button-addon1"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  @click="get_article_keyword()"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="h-5 w-5 text-white"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </form>

            <Pub />

            <div class="mb-[26px]">
              <div class="flex justify-between">
                <div class="text-xl font-bold pb-2">Catégories</div>
                <div class="flex justify-end space-x-4">
                  <button class="scroll-btn-left" @click="scrollLeft2()">
                    &lt;
                  </button>
                  <button class="scroll-btn-right" @click="scrollRight2()">
                    &gt;
                  </button>
                </div>
              </div>
              <hr />
              <div
                class="overflow-auto scroll-none block-chaine"
                ref="scrollableContent2"
              >
                <div class="scrollable-container w-[300%]">
                  <div class="scrollable-content">
                    <div class="grid grid-rows-2 grid-flow-col mt-5">
                      <div
                        class="relative p-1 overflow-hidden"
                        v-for="categorie in listcategories"
                        :key="categorie.id"
                      >
                        <div @click="get_articles_categorie(categorie)">
                          <img
                            :src="categorie.images.url"
                            class="brightness-75 transition-transform transform-gpu hover:scale-110 object-contain w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-[30px]">
              <h1 class="text-xl font-bold pb-2">Tags</h1>
              <hr />
              <div class="max-h-screen overflow-y-scroll snap snap-y">
                <div class="text-gray-600 mt-5">
                  <button
                    v-for="tag in listtags"
                    :key="tag.id"
                    @click="get_articles_tag(tag.id)"
                    class="border-2 hover:bg-[#07693A] hover:text-white focus:bg-[#07693A] focus:text-white m-1.5 px-3 py-1"
                  >
                    {{ tag.name }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="lg:hidden">
          <div class="">
            <ArticleSkeleton v-if="isLoading && paginate.length == 0" />
            <div v-if="!isLoading && paginate.length != 0">
              <form
                v-on:submit.prevent="get_article_keyword()"
                class="items-center mt-5"
              >
                <div class="relative mb-4 flex w-full flex-wrap items-stretch">
                  <input
                    type="search"
                    class="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none focus:z-[3] focus:border-[#07693A] focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-[#07693A]"
                    placeholder="Search"
                    v-model="keyword"
                  />

                  <!--Search button-->
                  <button
                    class="relative z-[2] flex items-center rounded-r bg-[#07693A] px-6 py-2.5 text-xs font-medium hover:bg-[#07693A] focus:bg-[#07693A] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#07693A] active:shadow-lg"
                    type="submit"
                    id="button-addon1"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="h-5 w-5 text-white"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </form>
              <div
                class="items-center"
                v-for="article in paginate"
                :key="article._id"
              >
                <router-link
                  :to="
                    '/detailarticle/' +
                    article.id +
                    '/' +
                    replaceSpacesWithDash(article.titre)
                  "
                >
                  <div class="mt-10">
                    <div class="overflow-hidden">
                      <img
                        :src="article.imagesMap.imageportrait.url"
                        class="w-full h-full rounded-lg transition-transform transform-gpu hover:scale-110 object-cover"
                      />
                    </div>
                    <div class="py-2">
                      <button
                        class="bg-[#07693A] text-white px-2 uppercase font-bold text-xs py-1"
                      >
                        {{ article.categorie.name }}
                      </button>
                      <h6
                        class="truncate mt-2 first-letter:uppercase mr-5 sm:text-lg lg:text-2xl hover:underline hover:decoration-2"
                        :title="article.titre"
                      >
                        <strong>{{ article.titre }}</strong>
                      </h6>
                      <div class="flex space-x-4">
                        <p
                          class="text-md first-letter:uppercase text-gray-400 mt-2"
                        >
                          By {{ article.autheur }} .
                          {{ article.creationDate }}
                        </p>
                        <div class="flex items-center space-x-2 mt-1">
                          <svg
                            class="h-5 w-5 text-green-500"
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
                          <p>{{ article.nb_vue }}</p>
                        </div>
                        <div class="flex items-center space-x-2 mt-1">
                          <svg
                            class="h-5 w-5 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                          <p>{{ article.like_users.length }}</p>
                        </div>
                      </div>
                      <div
                        class="two-row-limit mt-2 first-letter:uppercase mr-5 text-base text-justify"
                        v-html="article.content"
                      ></div>
                    </div>
                  </div>
                </router-link>
                <hr />
              </div>
              <pagination
                :totalPages="50"
                :perPage="itemsPerPage"
                :currentPage="currentPage"
                @pagechanged="onPageChange"
                class="mt-5"
              />
            </div>
            <div class="text-3xl pr-5" v-else>
              {{ message }}
            </div>
          </div>
          <div class="mt-5">
            <Pub />

            <div class="mb-[26px]">
              <div class="flex justify-between">
                <div class="text-xl font-bold pb-2">Catégories</div>
                <div class="flex justify-end space-x-4">
                  <button class="scroll-btn-left" @click="scrollLeft()">
                    &lt;
                  </button>
                  <button class="scroll-btn-right" @click="scrollRight()">
                    &gt;
                  </button>
                </div>
              </div>
              <hr />
              <div
                class="overflow-auto scroll-none block-chaine"
                ref="scrollableContent"
              >
                <div class="scrollable-container w-[300%]">
                  <div class="scrollable-content">
                    <div class="grid grid-rows-2 grid-flow-col mt-5">
                      <div
                        class="relative p-1 overflow-hidden"
                        v-for="categorie in listcategories"
                        :key="categorie.id"
                      >
                        <div @click="get_articles_categorie(categorie)">
                          <img
                            :src="categorie.images.url"
                            class="brightness-75 transition-transform transform-gpu hover:scale-110 object-contain w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-[30px]">
              <h1 class="text-xl font-bold pb-2">Tags</h1>
              <hr />
              <div
                class="max-h-screen overflow-y-scroll snap snap-y border-2 bg-border-black"
              >
                <div class="text-gray-600 mt-5">
                  <button
                    v-for="tag in listtags"
                    :key="tag.id"
                    @click="get_articles_tag(tag.id)"
                    class="border-2 hover:bg-[#07693A] hover:text-white focus:bg-[#07693A] focus:text-white m-1.5 px-3 py-1"
                  >
                    {{ tag.name }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import Pagination from "./Pagination.vue";
import Image from "../Image.vue";
import { Api } from "../../helpers";
import Erreur from "../../services/error";
import ArticleSkeleton from "../../skeletons/ArticleSkeleton.vue";
import Swal from "sweetalert2";
import Pub from "../Pub.vue";

export default {

  components: {
    Pagination,
    ArticleSkeleton,
    Image,
    Pub,
  },

  data() {
    return {
      likeTab: [],
      isLoading: true,
      categorytitle: "",
      message: "",
      disabled: true,
      keyword: "",
      currentPage: 1,
      itemsPerPage: 10,
      resultCount: 0,
      listarticles: [
        {
          like_users: {
            LikeUser: {
              id: "",
              username: "",
            },
          },
          categorie: {
            name: "",
          },
          creationDate: "",
          autheur: "",
          content: "",
          imagesMap: {
            imagepaysage: {
              url: "",
            },
            imageportrait: {
              url: "",
            },
          },
          titre: "",
          nb_vue: "",
          description: "",
        },
      ],
      listtags: [],
      articles: [],
      listcategories: [
        {
          id: "",
          description: "",
          name: "",
          images: {
            id: "",
            url: "",
          },
          articles: {
            type: Array,
          },
        },
      ],
      time: 7000,
    };
  },

  created() {
    // Appeler showImageAlert après 15 secondes du chargement initial
    setTimeout(this.showImageAlert, 15000);

    // Appeler showImageAlert toutes les 2 minutes après le premier déclenchement
    setInterval(this.showImageAlert, 120000);
    // }
  },

  mounted() {
    this.get_articles();
    this.get_categories_actualite();
    this.get_tags_actualite();

    const scrollableContent = this.$refs.scrollableContent;
    scrollableContent.addEventListener("scroll", () => {
      const scrollLeft = scrollableContent.scrollLeft;
      const scrollWidth = scrollableContent.scrollWidth;
      const clientWidth = scrollableContent.clientWidth;

      if (scrollLeft === 0) {
        this.$refs.scrollBtnLeft.disabled = true;
      } else {
        this.$refs.scrollBtnLeft.disabled = false;
      }

      if (scrollLeft + clientWidth === scrollWidth) {
        this.$refs.scrollBtnRight.disabled = true;
      } else {
        this.$refs.scrollBtnRight.disabled = false;
      }
    });

    const scrollableContent2 = this.$refs.scrollableContent2;
    scrollableContent2.addEventListener("scroll", () => {
      const scrollLeft2 = scrollableContent2.scrollLeft;
      const scrollWidth2 = scrollableContent2.scrollWidth;
      const clientWidth2 = scrollableContent2.clientWidth;

      if (scrollLeft2 === 0) {
        this.$refs.scrollLeftBtn = this.disabled;
      } else {
        this.$refs.scrollLeftBtn = !this.disabled;
      }

      if (scrollLeft2 + clientWidth2 === scrollWidth2) {
        this.$refs.scrollRightBtn = this.disabled;
      } else {
        this.$refs.scrollRightBtn = !this.disabled;
      }
    });
  },

  methods: {
    //Méthode qui retourne la liste des articles
    async get_articles() {
      this.listarticles = [];
      await Api.getwithouttoken("/actualite/api/article/all-article")
        .then((response) => {
          this.articles = response.data.content;
          if (this.articles.length != 0) {
            this.articles.forEach((item) => {
              if (item.isPublished == true) {
                const article = {
                  id: "",
                  categorie: {
                    name: "",
                  },
                  creationDate: "",
                  autheur: "",
                  content: "",
                  imagesMap: {
                    imagepaysage: {
                      url: "",
                    },
                    imageportrait: {
                      url: "",
                    },
                  },
                  titre: "",
                  nb_vue: "",
                  description: "",
                  like_users: "",
                };
                (article.id = item.id),
                  (article.categorie = item.categorie),
                  (article.autheur = item.autheur),
                  (article.content = item.content),
                  (article.imagesMap = item.imagesMap),
                  (article.titre = item.titre),
                  (article.nb_vue = item.nb_vue),
                  (article.like_users = item.like_users),
                  (article.description = item.description),
                  (article.creationDate = this.getDateAndTimeFromDate(
                    item.creationDate
                  ));
                this.listarticles.push(article);
              } else {
                this.message = "Aucun article n'est publié pour le moment";
              }
            });
          } else {
            this.message = "Aucun article n'est publié pour le moment";
          }
        })
        .catch(function (err) {
          Erreur.gestionErreur(err.message);
        })
        .then(() => {
          this.isLoading = false;
        });
    },

    redirect(element) {
      Api.putwithouttoken("/publicite/api/publicite/count-click/" + element.id)
        .then((response) => {
          if (response) {
            window.location.href = element.url;
          }
        })
        .catch((error) => {
          Erreur.gestionErreur(error.message);
        });
    },

    replaceSpacesWithDash(phrase) {
      // Utilise la méthode replace avec une expression régulière pour remplacer les espaces par "-"
      var phraseAvecTirets = phrase.replace(/[\s,':;"]+/g, "-");
      return phraseAvecTirets;
    },

    reloadPage() {
      // Reload the page
      window.location.reload();
    },

    //Méthode qui permet de scroller à gauche
    scrollLeft() {
      this.$refs.scrollableContent.scrollBy({
        left: -380,
        behavior: "smooth",
      });
    },

    //Méthode qui permet de scroller à droite
    scrollRight() {
      this.$refs.scrollableContent.scrollBy({
        left: 380,
        behavior: "smooth",
      });
    },

    // //Scroller à gauche
    scrollLeft2() {
      this.$refs.scrollableContent2.scrollBy({
        left: -380,
        behavior: "smooth",
      });
    },

    // //Scroller à droite
    scrollRight2() {
      this.$refs.scrollableContent2.scrollBy({
        left: 380,
        behavior: "smooth",
      });
    },

    showImageAlert() {
      if (this.$route.path == "/browser/news/article") {
        const publist = [];
        Api.getwithouttoken("/publicite/api/publicite/all-ads")
          .then((response) => {
            const pubstab = response.data.content;
            pubstab.forEach((item) => {
              if (item.published == true) {
                const dateActuelle = new Date().toISOString().split("T")[0]; // Obtenez la date actuelle au format "YYYY-MM-DD"
                const dateFin = new Date(item.endDate)
                  .toISOString()
                  .split("T")[0]; // Obtenez la date actuelle au format "YYYY-MM-DD"
                if (
                  !item.fichierPubMap.vid_web_acc &&
                  dateActuelle <= dateFin
                ) {
                  publist.push(item);
                }
              }
            });
            const shuffledPubs = this.shuffleArray(publist);

            if (shuffledPubs.length != 0) {
              shuffledPubs.forEach((item) => {
                Swal.fire({
                  // title: "Alerte avec image personnalisée",
                  html: `<a href=${item.url}'><img src=${item.fichierPubMap.img_web_live.url} alt="Image personnalisée"/></a>`,
                  showCloseButton: true,
                  showConfirmButton: false,
                  customClass: {
                    closeButton: "custom-close-button-class", // Ajoutez une classe CSS personnalisée pour le bouton de fermeture
                  },
                });
              });
            }
          })
          .catch((err) => {
            Erreur.gestionErreur(err.message);
          });
      }
    },

    //Méthode qui permet de trier une liste de données de manière aléatoire
    shuffleArray(array) {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    },

    //Méthode qui retourne la liste des articles d'une catégorie
    get_articles_categorie(categorie) {
      this.isLoading = true;
      this.listarticles = [];
      this.categorytitle = categorie.name;
      Api.getwithouttoken("/actualite/api/article/" + categorie.id + "/article")
        .then((response) => {
          this.articles = response.data.content;
          this.paginate = this.article;
          if (this.articles.length != 0) {
            this.message = "";
            this.articles.forEach((item) => {
              if (item.isPublished == true) {
                const article = {
                  id: "",
                  categorie: {
                    name: "",
                  },
                  creationDate: "",
                  autheur: "",
                  content: "",
                  imagesMap: {
                    imagepaysage: {
                      url: "",
                    },
                    imageportrait: {
                      url: "",
                    },
                  },
                  titre: "",
                  nb_vue: "",
                  like_users: "",
                  description: "",
                };
                (article.id = item.id),
                  (article.categorie = item.categorie),
                  (article.autheur = item.autheur),
                  (article.content = item.content),
                  (article.imagesMap = item.imagesMap),
                  (article.titre = item.titre),
                  (article.nb_vue = item.nb_vue),
                  (article.like_users = item.like_users),
                  (article.description = item.description),
                  (article.creationDate = this.getDateAndTimeFromDate(
                    item.creationDate
                  ));
                this.listarticles.push(article);
              }
            });
            if (this.listarticles.length == 0) {
              this.message = "Aucun article publié pour le moment";
            }
          } else {
            this.message = "Aucun article pour le moment";
          }
        })
        .catch(function (err) {
          Erreur.gestionErreur(err.message);
        })
        .then(() => {
          this.isLoading = false;
        });
    },

    //Méthode qui retourne la liste des articles d'un tag
    get_articles_tag(idtag) {
      this.isLoading = true;
      this.listarticles = [];
      Api.getwithouttoken("/actualite/api/article/contain-tag/" + idtag)
        .then((response) => {
          this.articles = response.data.content;
          if (this.articles.length != 0) {
            this.articles.forEach((item) => {
              if (item.isPublished == true) {
                const article = {
                  id: "",
                  categorie: {
                    name: "",
                  },
                  creationDate: "",
                  autheur: "",
                  content: "",
                  imagesMap: {
                    imagepaysage: {
                      url: "",
                    },
                    imageportrait: {
                      url: "",
                    },
                  },
                  titre: "",
                  nb_vue: "",
                  like_users: "",
                  description: "",
                };
                (article.id = item.id),
                  (article.categorie = item.categorie),
                  (article.autheur = item.autheur),
                  (article.content = item.content),
                  (article.imagesMap = item.imagesMap),
                  (article.titre = item.titre),
                  (article.nb_vue = item.nb_vue),
                  (article.like_users = item.like_users),
                  (article.description = item.description),
                  (article.creationDate = this.getDateAndTimeFromDate(
                    item.creationDate
                  ));
                this.listarticles.push(article);
              }
            });
            if (this.listarticles.length == 0) {
              this.message = "Aucun article publié pour le moment";
            }
          } else {
            this.message = "Aucun article pour le moment";
          }
        })
        .catch(function (err) {
          Erreur.gestionErreur(err.message);
        })
        .then(() => {
          this.isLoading = false;
        });
    },

    //Méthode qui retourne la liste des catégories
    get_categories_actualite() {
      Api.getwithouttoken("/actualite/api/categories/all")
        .then((response) => {
          this.listcategories = response.data.content;
        })
        .catch(function (err) {
          Erreur.gestionErreur(err.message);
        });
    },

    //Méthode qui retourne la liste des tags
    get_tags_actualite() {
      Api.getwithouttoken("/actualite/api/tags/all")
        .then((response) => {
          this.listtags = response.data.content;
        })
        .catch(function (err) {
          Erreur.gestionErreur(err.message);
        });
    },

    // Méthode qui permet de chercher un article
    async get_article_keyword() {
      this.isLoading = true;
      this.message = "";
      this.listarticles = [];
      await Api.getwithouttoken(
        "/actualite/api/article/search-kw?search=" + this.keyword
      )
        .then((response) => {
          this.articles = response.data.content;
          if (this.articles.length != 0) {
            this.articles.forEach((item) => {
              if (item.isPublished == true) {
                const article = {
                  id: "",
                  categorie: {
                    name: "",
                  },
                  creationDate: "",
                  autheur: "",
                  content: "",
                  imagesMap: {
                    imagepaysage: {
                      url: "",
                    },
                    imageportrait: {
                      url: "",
                    },
                  },
                  titre: "",
                  nb_vue: "",
                  like_users: "",
                  description: "",
                };
                (article.id = item.id),
                  (article.categorie = item.categorie),
                  (article.autheur = item.autheur),
                  (article.content = item.content),
                  (article.imagesMap = item.imagesMap),
                  (article.titre = item.titre),
                  (article.nb_vue = item.nb_vue),
                  (article.like_users = item.like_users),
                  (article.description = item.description),
                  (article.creationDate = this.getDateAndTimeFromDate(
                    item.creationDate
                  ));
                this.listarticles.push(article);
              }
            });
            if (this.listarticles.length == 0) {
              this.message = "Aucun article publié pour le moment";
            }
          } else {
            this.message = "Aucun article trouvé";
          }
        })
        .catch(function (err) {
          Erreur.gestionErreur(err.message);
        })
        .then(() => {
          this.isLoading = false;
        });
    },

    //Méthode qui permet de changer le numéro d'une page
    onPageChange(page) {
      this.currentPage = page;
    },

    //Méthode qui permet de formatter la date d'un article
    getDateAndTimeFromDate(inputDate) {
      const monthsInFrench = [
        "janvier",
        "février",
        "mars",
        "avril",
        "mai",
        "juin",
        "juillet",
        "août",
        "septembre",
        "octobre",
        "novembre",
        "décembre",
      ];
      const date = new Date(inputDate);
      let year = date.getFullYear();
      let month = monthsInFrench[date.getMonth()];
      let day = date.getDate();

      return `${day} ${month} ${year}`;
    },
  },

  computed: {
    /* Calcule le no,bre total de pages */
    totalPages() {
      if (this.resultCount == 0) {
        return 1;
      } else {
        return Math.ceil(this.resultCount / this.itemsPerPage);
      }
    },

    /* gère la pagination */
    paginate() {
      if (
        !this.listarticles ||
        this.listarticles.length != this.listarticles.length
      ) {
        return;
      }
      this.resultCount = this.listarticles.length;
      if (this.currentPage >= this.totalPages) {
        this.currentPage = this.totalPages;
      }
      var index = this.currentPage * this.itemsPerPage - this.itemsPerPage;
      return this.listarticles.slice(index, index + this.itemsPerPage);
    },
  },
};
</script>
  
<style>
.left-full {
  left: -100%;
}

.carousel-item {
  float: left;
  position: relative;
  display: block;
  width: 100%;
  margin-right: -100%;
  backface-visibility: hidden;
}

.carousel-item.active {
  left: 0;
}

.custom-close-button-class {
  /* Style CSS pour réduire la taille du bouton de fermeture */
  width: 20px;
  height: 20px;
  font-size: 20px; /* Taille de police personnalisée */
  border: none;
  margin: 2px;
}

.scrollable-container {
  position: relative;
  overflow: hidden;
}

.scrollable-content {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.scroll-btn-left,
.scroll-btn-right {
  @apply bg-gray-400 w-7 h-7 text-white text-sm hover:bg-[#07693A] focus:bg-[#07693A];
}

.block-chaine::-webkit-scrollbar {
  width: 0;
}

.two-row-limit {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* Number of rows to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>



