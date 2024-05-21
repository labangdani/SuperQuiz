<template>
  <div class="pt-16 text-black">
    <div class="bg-gray-100 py-16">
      <div class="px-[14px] md:px-14">
        <nav class="w-full rounded-md">
          <ol class="list-reset flex text-lg sm:text-lg lg:text-3xl">
            <li>
              <router-link :to="'/browser/news/article'">
                <p class="text-[#07693A] font-bold">News</p>
              </router-link>
            </li>
            <li>
              <span class="mx-2 text-neutral-400">/</span>
            </li>
            <li class="text-neutral-400" v-if="categorytitle">
              {{ categorytitle }}
            </li>
            <li v-else class="text-neutral-400">
              {{ article.categorie.name }}
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <div class="bg-white sm:pt-5 lg:pt-[60px] pb-[30px]">
      <div class="px-[14px] md:px-14">
        <form class="lg:hidden items-center mt-5">
          <div class="relative mb-4 flex w-full flex-wrap items-stretch">
            <input
              type="search"
              class="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-lg border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none focus:z-[3] focus:border-[#07693A] focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-[#07693A]"
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

        <div class="mb-5" v-if="article">
          <p
            class="truncate mt-2 first-letter:uppercase mr-5 text-sm lg:text-2xl"
          >
            <strong>{{ article.titre }}</strong>
          </p>
          <button
            v-if="article.categorie.name"
            class="bg-[#07693A] mt-8 text-white px-2 uppercase font-bold text-xs py-1"
          >
            {{ article.categorie.name }}
          </button>
          &nbsp; &nbsp;
          <p class="text-md capitalize text-gray-400 mt-2">
            By {{ article.autheur }} .
            {{ article.creationDate }}
          </p>
        </div>
        <div class="grid lg:grid-cols-3 mb-5">
          <div class="lg:col-span-2">
            <ArticleSkeleton v-if="isLoaded"></ArticleSkeleton>
            <div v-if="!isLoaded">
              <div v-if="paginate.length != 0">
                <div class="" v-for="article in paginate" :key="article._id">
                  <router-link
                    :to="
                      '/detailarticle/' +
                      article.id +
                      '/' +
                      replaceSpacesWithDash(article.titre)
                    "
                  >
                    <div class="grid grid-cols-3 mt-10">
                      <div class="overflow-hidden">
                        <img
                          :src="article.imagesMap.imageportrait.url"
                          class="w-[285px] rounded-lg h-[200px] transition-transform transform-gpu hover:scale-110 object-cover"
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
                  v-if="paginate.length != 0"
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

            <div v-if="article">
              <DetailArticleSkeleton v-if="isLoading"></DetailArticleSkeleton>

              <div v-if="!isLoading">
                <div class="">
                  <div class="w-full">
                    <img
                      :src="article.imagesMap.imagepaysage.url"
                      alt=""
                      class="rounded-lg"
                    />
                  </div>
                  <div
                    class="overflow-hidden mt-2 mr-5 text-lg text-gray-600"
                    style="text-align: justify"
                    v-html="article.content"
                  ></div>
                </div>

                <!-- <div
                  class="w-full items-center pt-5 mt-5 pb-5 lg:relative bg-gray-300 mb-4"
                  v-if="token == null"
                >
                  <p class="text-center mb-5">
                    {{ message }}
                  </p>
                  <div class="flex justify-center space-x-4">
                    <button
                      type="submit"
                      class="px-2.5 py-1 sm:px-1 border border-solid sm:py-1 md:py-1.5 md:px-5 bg-gray-500 rounded-full"
                    >
                      <router-link to="/signin" class="text-white font-bold">
                        Créer un compte</router-link
                      >
                    </button>
                    <button
                      type="submit"
                      class="px-2.5 py-1 sm:px-1 sm:py-1 md:py-1.5 md:px-5 bg-[#07693A] rounded-full"
                    >
                      <router-link to="/login" class="text-white font-bold">
                        Se connecter
                      </router-link>
                    </button>
                  </div>
                </div> -->
                <hr />
                <div class="flex justify-between py-2">
                  <div class="flex items-center space-x-2">
                    <svg
                      class="h-8 w-8 text-green-500 cursor-pointer"
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
                    <p>{{ views }}</p>
                  </div>
                  <div
                    class="flex items-center space-x-2"
                    @click="likeArticle()"
                  >
                    <svg
                      class="h-8 w-8 cursor-pointer"
                      :class="{ 'text-green-500': islike === true }"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
                      />
                    </svg>
                    <p>{{ likeTab.length }}</p>
                  </div>
                  <div class="flex items-center space-x-4">
                    <span class="">Partager:</span>
                    <ShareNetwork
                      network="facebook"
                      :url="
                        'https://2play.cm/detailarticle/' +
                        article.id +
                        '/' +
                        replaceSpacesWithDash(article.titre)
                      "
                      :title="article.titre"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="444 48 45 45"
                        width="45"
                        height="45"
                      >
                        <path
                          d="M444 52.5v36a4.481 4.481 0 0 0 4.5 4.5H468V75.6h-5.9v-7.1h5.9v-6a7.81 7.81 0 0 1 7.8-7.8h6.1v6.4h-4.4a2.476 2.476 0 0 0-2.5 2.5v4.9h6.8l-.9 7.1h-5.8V93h9.4a4.481 4.481 0 0 0 4.5-4.5v-36a4.481 4.481 0 0 0-4.5-4.5h-36a4.481 4.481 0 0 0-4.5 4.5zm0-4.5"
                          fill="#3a559f"
                        />
                      </svg>
                    </ShareNetwork>
                    <ShareNetwork
                      network="whatsapp"
                      :url="
                        'https://2play.cm/detailarticle/' +
                        article.id +
                        '/' +
                        replaceSpacesWithDash(article.titre)
                      "
                      :title="article.titre"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="45"
                        height="45"
                        viewBox="624 93 45 45"
                      >
                        <path
                          d="M664.516 138h-36.032a4.457 4.457 0 0 1-3.174-1.31 4.457 4.457 0 0 1-1.31-3.174V97.484a4.457 4.457 0 0 1 1.31-3.174 4.457 4.457 0 0 1 3.174-1.31h36.032a4.457 4.457 0 0 1 3.174 1.31 4.457 4.457 0 0 1 1.31 3.174v36.032a4.457 4.457 0 0 1-1.31 3.174 4.457 4.457 0 0 1-3.174 1.31zm-17.837-38a15.575 15.575 0 0 0-15.552 15.544 15.54 15.54 0 0 0 2.077 7.769l-2.2 8.059 8.247-2.158a15.546 15.546 0 0 0 7.432 1.89h.008a15.576 15.576 0 0 0 15.552-15.545 15.523 15.523 0 0 0-4.557-11A15.461 15.461 0 0 0 646.679 100zm0 28.474a12.92 12.92 0 0 1-6.581-1.8l-.471-.276-4.892 1.284 1.307-4.766-.306-.485a12.9 12.9 0 0 1-1.979-6.88 12.941 12.941 0 0 1 12.93-12.923 12.811 12.811 0 0 1 9.135 3.787 12.846 12.846 0 0 1 3.787 9.143 12.947 12.947 0 0 1-12.93 12.917zm-5.49-20.1a1.425 1.425 0 0 0-1.039.485l-.072.077a4.278 4.278 0 0 0-1.287 3.165 7.432 7.432 0 0 0 1.577 4.011l.006.008.064.091a16.768 16.768 0 0 0 6.577 5.774 21.7 21.7 0 0 0 2.219.822 4.859 4.859 0 0 0 1.5.23 6.564 6.564 0 0 0 .945-.073 3.985 3.985 0 0 0 2.622-1.845 3.212 3.212 0 0 0 .224-1.845 1.32 1.32 0 0 0-.564-.378l-.19-.093c-.465-.233-2.311-1.139-2.651-1.263a1.317 1.317 0 0 0-.418-.1.54.54 0 0 0-.457.293c-.259.386-.986 1.247-1.232 1.524a.531.531 0 0 1-.418.223.974.974 0 0 1-.426-.126c-.064-.032-.15-.069-.258-.116a10.048 10.048 0 0 1-2.864-1.811 11.609 11.609 0 0 1-2.159-2.689c-.227-.393-.015-.605.172-.792.11-.11.241-.269.368-.422.072-.088.146-.177.216-.257a2.2 2.2 0 0 0 .345-.56l.043-.089a.719.719 0 0 0-.03-.68 89.758 89.758 0 0 1-.827-1.988v-.012l-.363-.884c-.257-.614-.518-.666-.743-.666h-.131c-.226-.014-.492-.014-.749-.014z"
                          fill="#25d366"
                        />
                      </svg>
                    </ShareNetwork>
                  </div>
                </div>
                <hr />

                <div>
                  <div class="mb-10 mt-5">
                    <p class="font-bold text-3xl text-gray-400">
                      Laisser un commentaire
                    </p>
                    <textarea
                      class="mt-8 border-2 w-full h-60 px-2"
                      v-model="content_comment"
                      placeholder="Ajouter un commentaire"
                    ></textarea>
                    <div class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <ButtonSpinner
                        type="button"
                        :fetching="fetch"
                        @click="insertComment()"
                        class="inline-flex w-full justify-center rounded-md bg-[#07693A] px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                      >
                        Ajouter
                      </ButtonSpinner>
                    </div>
                  </div>

                  <div
                    v-for="(comment, index) in commentTab.slice().reverse()"
                    :key="index"
                  >
                    <div class="flex space-x-4 mb-7" v-if="comment.user">
                      <!-- <img class="mb-0 h-10 w-10 rounded-full" v-if="comment.user_photo" :src="src=comment.user_photo" /> -->

                      <div>
                        <button
                          class="bg-[#07693A] p-2 rounded-full text-white"
                        >
                          <span
                            >{{ comment.user.username.charAt(0).toUpperCase()
                            }}{{
                              comment.user.fullName.charAt(0).toUpperCase()
                            }}</span
                          >
                        </button>
                      </div>
                      <div>
                        <div class="flex space-x-4">
                          <h1 class="font-bold">
                            @{{ comment.user.username }}
                          </h1>
                          <p class="text-sm mt-1">
                            {{ moment(comment.createdAt).fromNow() }}
                          </p>
                        </div>
                        <p class="text-gray-400">
                          {{ comment.comment_content }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-1 lg:pl-[30px]">
            <form class="sm:hidden lg:block items-center">
              <div class="relative mb-4 flex w-full flex-wrap items-stretch">
                <input
                  type="search"
                  class="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-lg border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none focus:z-[3] focus:border-[#07693A] focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-[#07693A]"
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
        <hr />
        <div class="mb-5 lg:pl-3 mt-5">
          <p class="font-bold text-3xl">Articles similaires</p>
          <div
            class="grid md:grid-cols-3 mt-7"
            v-if="listarticlessimilaires.length != 0"
          >
            <div
              class="lg:px-3 hover:-translate-all hover:scale-105 duration-150 hover:text- focus:text-[#07693A]"
              v-for="article in listarticlessimilaires"
              :key="article.id"
            >
              <router-link
                :to="
                  '/detailarticle/' +
                  article.id +
                  '/' +
                  replaceSpacesWithDash(article.titre)
                "
              >
                <img
                  :src="article.imagesMap.imagepaysage.url"
                  class="rounded-lg object-cover w-full h-[170px]"
                />
                <div class="mt-1">
                  <button
                    class="bg-[#07693A] mt-2 text-white px-2 uppercase font-bold text-xs py-1"
                  >
                    {{ article.categorie.name }}
                  </button>
                  &nbsp; &nbsp;
                  <span class="text-sm text-gray-500 font-bold">
                    {{ article.creationDate }}
                  </span>
                </div>
                <div
                  class="two-row-limit mb-5 text-lg font-bold"
                  v-html="article.content"
                ></div>
              </router-link>
            </div>
          </div>
          <div v-else>{{ messagesi }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Pagination from "./Pagination.vue";
import { Api } from "../../helpers";
import Erreur from "../../services/error";
import ButtonSpinner from "../ButtonSpinner.vue";
import DetailArticleSkeleton from "../../skeletons/DetailArticleSkeleton.vue";
import ArticleSkeleton from "../../skeletons/ArticleSkeleton.vue";
import Swal from "sweetalert2";
import Image from "../Image.vue";
import Pub from "../Pub.vue";
import { useMeta } from "vue-meta";
import { ref } from "vue";
import { useRoute } from 'vue-router';


export default {
  components: {
    Pagination,
    ButtonSpinner,
    DetailArticleSkeleton,
    ArticleSkeleton,
    Image,
    Pub,
  },

  data() {
    return {
      globalVariable: "Valeur globale",
      islike: false,
      istoken: false,
      isLoading: false,
      isLoaded: false,
      token: "",
      moment: moment,
      commentTab: [],
      likeTab: [],
      categorytitle: "",
      message: "",
      messagesi: "",
      keyword: "",
      content_comment: "",
      currentPage: 1,
      itemsPerPage: 10,
      resultCount: 0,
      listarticles: [
        {
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
        },
      ],
      listarticlessimilaires: [
        {
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
      articles: [],
      articlessimilaires: [],
      listtags: [],
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
      fetch: false,
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
    this.token = localStorage.getItem("jwtToken");
    this.incrementViews();
    this.get_article();
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
  },

  setup() {
    const route = useRoute();

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
      };

    // Fonction pour obtenir l'article
    const get_articleDatasetup = () => {
      Api.getwithouttoken("/actualite/api/article/" + route.params.id)
        .then((response) => {
          article.value = response.data.content;
          console.log(response)

        })
        .catch((error) => {
          console.error("Erreur lors de la récupération de l'article:", error);
        });
        console.log(article)

    };
    // console.log(articleDatasetup.value)


    const replaceSpacesWithDash = (phrase) => {
      // Utilise la méthode replace avec une expression régulière pour remplacer les espaces par "-"
      var phraseAvecTirets = phrase.replace(/[\s,':;"]+/g, "-");
      return phraseAvecTirets;
    };

    // console.log(replaceSpacesWithDash(articleDatasetup.value.titre))


    useMeta({
      title: article.titre,
      meta: [
        {
          property: "og:title",
          content: article.titre,
        },
        // {
        //   property: "og:image",
        //   content: this.article.imagesMap.imageportrait.url,
        // },
        {
          property: "og:site_name",
          content: "2PLAY",
        },
        // {
        //   property: "og:url",
        //   content: 'https://2play.cm/detailarticle/' + articleDatasetup.id + '/' + replaceSpacesWithDash(article.titre),
        // },
      ],
    }
    );
  
    return {
      article,
      get_articleDatasetup,
      replaceSpacesWithDash
    };    
  },

  methods: {
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

    showImageAlert() {
      if (this.$route.path.includes("/detailarticle/")) {
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
                  html: `<a href=${item.url}><img src=${item.fichierPubMap.img_web_live.url} alt="Image personnalisée"/></a>`,
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

    showShareAlert(article) {
      const titre = this.replaceSpacesWithDash(article.titre);
      Swal.fire({
        title: "Partager",
        html: `<p class="font-bold text-black">${article.titre}</p></br></br>
        <div class="flex justify-between">
          <ShareNetwork
            network="facebook"
            url="https://2play.cm/detailarticle/469/Un-homme-tué-à-Moundou-lors-de-la-présidentielle-tchadienne"
            title=${article.titre}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="444 48 45 45" width="45" height="45"><path d="M444 52.5v36a4.481 4.481 0 0 0 4.5 4.5H468V75.6h-5.9v-7.1h5.9v-6a7.81 7.81 0 0 1 7.8-7.8h6.1v6.4h-4.4a2.476 2.476 0 0 0-2.5 2.5v4.9h6.8l-.9 7.1h-5.8V93h9.4a4.481 4.481 0 0 0 4.5-4.5v-36a4.481 4.481 0 0 0-4.5-4.5h-36a4.481 4.481 0 0 0-4.5 4.5zm0-4.5" fill="#3a559f"/></svg>        
          </ShareNetwork>
          <ShareNetwork
              network="whatsapp"
              url="https://2play.cm/detailarticle/469/Un-homme-tué-à-Moundou-lors-de-la-présidentielle-tchadienne"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="624 93 45 45"><path d="M664.516 138h-36.032a4.457 4.457 0 0 1-3.174-1.31 4.457 4.457 0 0 1-1.31-3.174V97.484a4.457 4.457 0 0 1 1.31-3.174 4.457 4.457 0 0 1 3.174-1.31h36.032a4.457 4.457 0 0 1 3.174 1.31 4.457 4.457 0 0 1 1.31 3.174v36.032a4.457 4.457 0 0 1-1.31 3.174 4.457 4.457 0 0 1-3.174 1.31zm-17.837-38a15.575 15.575 0 0 0-15.552 15.544 15.54 15.54 0 0 0 2.077 7.769l-2.2 8.059 8.247-2.158a15.546 15.546 0 0 0 7.432 1.89h.008a15.576 15.576 0 0 0 15.552-15.545 15.523 15.523 0 0 0-4.557-11A15.461 15.461 0 0 0 646.679 100zm0 28.474a12.92 12.92 0 0 1-6.581-1.8l-.471-.276-4.892 1.284 1.307-4.766-.306-.485a12.9 12.9 0 0 1-1.979-6.88 12.941 12.941 0 0 1 12.93-12.923 12.811 12.811 0 0 1 9.135 3.787 12.846 12.846 0 0 1 3.787 9.143 12.947 12.947 0 0 1-12.93 12.917zm-5.49-20.1a1.425 1.425 0 0 0-1.039.485l-.072.077a4.278 4.278 0 0 0-1.287 3.165 7.432 7.432 0 0 0 1.577 4.011l.006.008.064.091a16.768 16.768 0 0 0 6.577 5.774 21.7 21.7 0 0 0 2.219.822 4.859 4.859 0 0 0 1.5.23 6.564 6.564 0 0 0 .945-.073 3.985 3.985 0 0 0 2.622-1.845 3.212 3.212 0 0 0 .224-1.845 1.32 1.32 0 0 0-.564-.378l-.19-.093c-.465-.233-2.311-1.139-2.651-1.263a1.317 1.317 0 0 0-.418-.1.54.54 0 0 0-.457.293c-.259.386-.986 1.247-1.232 1.524a.531.531 0 0 1-.418.223.974.974 0 0 1-.426-.126c-.064-.032-.15-.069-.258-.116a10.048 10.048 0 0 1-2.864-1.811 11.609 11.609 0 0 1-2.159-2.689c-.227-.393-.015-.605.172-.792.11-.11.241-.269.368-.422.072-.088.146-.177.216-.257a2.2 2.2 0 0 0 .345-.56l.043-.089a.719.719 0 0 0-.03-.68 89.758 89.758 0 0 1-.827-1.988v-.012l-.363-.884c-.257-.614-.518-.666-.743-.666h-.131c-.226-.014-.492-.014-.749-.014z" fill="#25d366"/></svg>
          </ShareNetwork>
          <a>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45"><path d="M40.517 0H4.484A4.473 4.473 0 0 0 0 4.484v36.033A4.473 4.473 0 0 0 4.484 45h36.033A4.473 4.473 0 0 0 45 40.517V4.484A4.473 4.473 0 0 0 40.517 0z"/><path d="m22.082 23.81-1.091-1.56L12.31 9.832h3.737l7.005 10.021 1.091 1.56 9.107 13.025h-3.737zM33.249 8l-8.916 10.363L17.213 8H9l10.768 15.671L9 36.187h2.433l9.415-10.944 7.52 10.944h8.213L25.414 19.935 35.682 8z" fill="#fff"/></svg>
            </span>
          </a>
          <a>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="534 93 45 45"><path d="M574.516 93h-36.032A4.473 4.473 0 0 0 534 97.484v36.032a4.473 4.473 0 0 0 4.484 4.484h36.032a4.473 4.473 0 0 0 4.484-4.484V97.484A4.473 4.473 0 0 0 574.516 93zm-26.849 38.517h-6.644v-21.392h6.645zm-3.349-24.31a3.836 3.836 0 1 1 3.836-3.836 3.816 3.816 0 0 1-3.836 3.837zm28.2 24.31h-6.591v-10.426c0-2.485-.054-5.672-3.457-5.672-3.457 0-4 2.7-4 5.51v10.588h-6.643v-21.392h6.373v2.917h.108a6.988 6.988 0 0 1 6.267-3.457c6.753 0 8 4.43 8 10.21v11.722z" fill="#007bb6"/></svg>            
            </span>
          </a>
          <a>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="714 93 45 45.001"><path d="M754.516 138h-36.032a4.457 4.457 0 0 1-3.174-1.31 4.457 4.457 0 0 1-1.31-3.173V97.484a4.457 4.457 0 0 1 1.31-3.174 4.457 4.457 0 0 1 3.174-1.31h36.032a4.457 4.457 0 0 1 3.174 1.31 4.457 4.457 0 0 1 1.31 3.174v36.033a4.457 4.457 0 0 1-1.31 3.174 4.457 4.457 0 0 1-3.174 1.309zM735.5 108.008a8.438 8.438 0 0 0-6.006 2.487l-6.006 6.006a8.5 8.5 0 0 0 0 12.011 8.439 8.439 0 0 0 6.005 2.488 8.439 8.439 0 0 0 6.006-2.487l4.551-4.551a11.1 11.1 0 0 1-1.609.118 10.453 10.453 0 0 1-3.809-.707l-2.137 2.138a4.22 4.22 0 0 1-3 1.241 4.22 4.22 0 0 1-3-1.241 4.255 4.255 0 0 1 0-6.007l6.007-6a4.218 4.218 0 0 1 3-1.243 4.216 4.216 0 0 1 3 1.243 4.187 4.187 0 0 1 1.049 1.8l.094-.053A1.536 1.536 0 0 0 740 115l2.791-2.79a8.259 8.259 0 0 0-1.291-1.71 8.435 8.435 0 0 0-6-2.492zm-1.048 6.69-.091.051A1.556 1.556 0 0 0 734 115l-2.791 2.792a8.385 8.385 0 0 0 1.291 1.708 8.434 8.434 0 0 0 6 2.488 8.434 8.434 0 0 0 6-2.488l6.007-6.006a8.5 8.5 0 0 0 0-12.01 8.442 8.442 0 0 0-6-2.484 8.439 8.439 0 0 0-6.006 2.487l-4.55 4.55a11.122 11.122 0 0 1 1.607-.118 10.45 10.45 0 0 1 3.81.707l2.136-2.137a4.22 4.22 0 0 1 3-1.242 4.213 4.213 0 0 1 3 1.242 4.216 4.216 0 0 1 1.243 3 4.219 4.219 0 0 1-1.243 3l-6 6.006a4.217 4.217 0 0 1-3 1.241 4.217 4.217 0 0 1-3-1.241 4.161 4.161 0 0 1-1.054-1.795z" fill="#9a9a9a"/></svg>
            </span>
          </a>
        </div>
          `,
        showCloseButton: true,
        showConfirmButton: false,
        customClass: {
          title: "custom-title-class",
          closeButton: "custom-close-button-class", // Ajoutez une classe CSS personnalisée pour le bouton de fermeture
        },
      });
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

    // Méthode qui retourne un article
    get_article() {
      this.listarticles = [];
      this.isLoading = true;
      Api.getwithouttoken("/actualite/api/article/" + this.$route.params.id)
        .then((response) => {
          const { content: articleData } = response.data;
          this.article = articleData;
          this.article.creationDate = this.getDateAndTimeFromDate(
            articleData.creationDate
          );
          this.commentTab = articleData.comments;
          this.likeTab = articleData.like_users;
          this.like();
          this.get_articles_similaires();
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        })
        .then(() => {
          this.isLoading = false;
        });
    },

    // Méthode qui retoune la liste des articles d'une catégorie
    // async get_articles_categorie(categorie) {
    //   this.isLoading = true;
    //   this.article = "";
    //   try {
    //     this.listarticles = [];
    //     this.categorytitle = categorie.name;
    //     const response = await Api.getwithouttoken(
    //       `/actualite/api/article/${categorie.id}/article`
    //     );
    //     const articles = response.data.content.filter(
    //       (item) => item.isPublished
    //     );

    //     if (articles.length > 0) {
    //       this.message = ""
    //       this.listarticles = articles.map((item) => ({
    //         id: item.id,
    //         categorie: item.categorie,
    //         autheur: item.autheur,
    //         content: item.content,
    //         imagesMap: item.imagesMap,
    //         titre: item.titre,
    //         nb_vue: item.nb_vue,
    //         like_users: item.like_users,
    //         description: item.description,
    //         creationDate: this.getDateAndTimeFromDate(item.creationDate),
    //       }));
    //       this.paginate = this.articles
    //     } else {
    //       this.message = "Aucun article publié pour le moment";
    //     }
    //   } catch (err) {
    //     Erreur.gestionErreur(err.message);
    //   } finally {
    //     this.isLoading = false;
    //   }
    // },

    get_articles_categorie(categorie) {
      this.isLoaded = true;
      this.listarticles = [];
      this.article = "";
      this.categorytitle = categorie.name;
      Api.getwithouttoken(`/actualite/api/article/${categorie.id}/article`)
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
          this.isLoaded = false;
        });
    },

    // Méthode qui retoune la liste des articles d'un tag
    async get_articles_tag(idtag) {
      this.article = "";
      this.isLoaded = true;
      this.listarticles = [];
      try {
        const response = await Api.getwithouttoken(
          `/actualite/api/article/contain-tag/${idtag}`
        );
        const articles = response.data.content.filter(
          (item) => item.isPublished
        );

        if (articles.length > 0) {
          this.listarticles = articles.map((item) => ({
            id: item.id,
            categorie: item.categorie,
            autheur: item.autheur,
            content: item.content,
            imagesMap: item.imagesMap,
            titre: item.titre,
            nb_vue: item.nb_vue,
            like_users: item.like_users,
            description: item.description,
            creationDate: this.getDateAndTimeFromDate(item.creationDate),
          }));
        } else {
          this.message = "Aucun article publié pour le moment";
        }
      } catch (err) {
        Erreur.gestionErreur(err.message);
      } finally {
        this.isLoaded = false;
      }
    },

    // Méthode qui retoune la liste des catégories
    get_categories_actualite() {
      Api.getwithouttoken("/actualite/api/categories/all")
        .then((response) => {
          this.listcategories = response.data.content;
        })
        .catch(function (err) {
          Erreur.gestionErreur(err.message);
        });
    },

    // Méthode qui retoune la liste des tags
    get_tags_actualite() {
      Api.getwithouttoken("/actualite/api/tags/all")
        .then((response) => {
          this.listtags = response.data.content;
        })
        .catch(function (err) {
          Erreur.gestionErreur(err.message);
        });
    },

    // Méthode qui retoune la liste des articles en fonction du mot entré dans la barre de recherche
    async get_article_keyword() {
      try {
        this.listarticles = [];

        const response = await Api.getwithouttoken(
          "/actualite/api/article/search-kw?search=" + this.keyword
        );
        const articles = response.data.content.filter(
          (item) => item.isPublished
        );

        if (articles.length > 0) {
          this.listarticles = articles.map((item) => ({
            id: item.id,
            categorie: item.categorie,
            autheur: item.autheur,
            content: item.content,
            imagesMap: item.imagesMap,
            titre: item.titre,
            nb_vue: item.nb_vue,
            like_users: item.like_users,
            description: item.description,
            creationDate: this.getDateAndTimeFromDate(item.creationDate),
          }));
          if (this.listarticles.length == 0) {
            this.message = "Aucun article publié pour le moment";
          }
        } else {
          this.message = "Aucun article trouvé";
        }
      } catch (err) {
        Erreur.gestionErreur(err.message);
      } finally {
        this.isLoading = false;
      }
    },

    //Méthode qui retourne la liste des articles similaires
    async get_articles_similaires() {
      try {
        this.listarticlessimilaires = [];

        const response = await Api.getwithouttoken(
          "/actualite/api/article/similaire/" + this.$route.params.id
        );
        const articlessimilaires = response.data.content.filter(
          (item) => item.isPublished
        );
        if (articlessimilaires.length != 0) {
          this.listarticlessimilaires = articlessimilaires.map((item) => ({
            id: item.id,
            categorie: item.categorie,
            autheur: item.autheur,
            content: item.content,
            imagesMap: item.imagesMap,
            titre: item.titre,
            nb_vue: item.nb_vue,
            description: item.description,
            creationDate: this.getDateAndTimeFromDate(item.creationDate),
          }));
        } else {
          this.messagesi = "Aucun article similaire";
        }
      } catch (err) {
        Erreur.gestionErreur(err.message);
      } finally {
        this.isLoading = false;
      }
    },

    //Méthode qui permet de formatter la date de publication d'un article
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
      const year = date.getFullYear();
      const month = monthsInFrench[date.getMonth()];
      const day = date.getDate();

      return `${day} ${month} ${year}`;
    },

    // Méthode qui permet d'ajouter un commentaire
    async insertComment() {
      if (this.token) {
        const trimmedContent = this.content_comment.trim();
        if (trimmedContent !== "") {
          try {
            this.fetch = true;

            const response = await Api.post(
              `/actualite/rest/comments/create/${this.$route.params.id}`,
              {
                content: trimmedContent,
              }
            );

            const newComment = response.data.content;
            this.commentTab.push(newComment);
            this.content_comment = "";
          } catch (err) {
            Erreur.gestionErreur(err.message);
          } finally {
            this.fetch = false;
          }
        }
      } else {
        this.content_comment = "";
        this.fetch = false;
        Swal.fire({
          text: "Merci de vous connecter pour commenter cet article.",
          showCancelButton: true,
          confirmButtonText: "Se connecter",
          cancelButtonText: "Annuler",
          showLoaderOnConfirm: true,
          confirmButtonColor: "#07693A",
          cancelButtonColor: "#f46a6a",
          customClass: {
            confirmButton: "order-2", // Ajoutez une classe CSS pour le bouton de confirmation
            cancelButton: "order-1", // Ajoutez une classe CSS pour le bouton d'annulation
          },
          allowOutsideClick: false,
        }).then((result) => {
          if (result.value) {
            this.$router.push("/login");
          }
        });
      }
    },

    //Formater le nombre de vues
    formatNumber(number) {
      if (number >= 1000000000) {
        return (number / 1000000000).toFixed(1) + " Milliards";
      } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + " Millions";
      } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + " K";
      } else {
        return number.toString();
      }
    },

    // Incrementer le nombre de vues d'un article
    incrementViews() {
      // appel à l'API pour incrémenter le nombre de vues
      Api.putwithouttoken(
        "/actualite/api/article/add-vue/" + this.$route.params.id
      )
        .then((response) => {
          // mettre à jour le nombre de vues dans l'interface utilisateur
          this.views = this.formatNumber(response.data.content.nb_vue);
        })
        .catch(function (err) {
          Erreur.gestionErreur(err.message);
        });
    },

    //Méthode qui permet de liker un article
    likeArticle() {
      Api.put(
        "/actualite/rest/article/like-unlike-article/" + this.$route.params.id
      )
        .then((response) => {
          // mettre à jour le nombre de vues dans l'interface utilisateur
          this.likeTab = response.data.content.like_users;
          this.like();
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        });
    },

    //changer la couleur de l'icône like
    like() {
      if (this.likeTab.includes(this.$store.state.user.username)) {
        this.islike = true;
      } else {
        this.islike = false;
      }
    },
  },

  computed: {
    /* calcule le nombre total de pages */
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
.custom-title-class {
  text-transform: uppercase;
  font-weight: 400;
}

.custom-text-class {
  font-weight: 700;
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
  @apply bg-gray-400 hover:bg-[#07693A] w-7 h-7 text-white text-sm;
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