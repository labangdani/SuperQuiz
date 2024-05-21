<template>
  <div class="lg:px-14 xl:px-24 pb-6 sm:pt-16">
    <div class="lg:grid lg:grid-cols-5 flex space-x-10 lg:mt-10">
      <div class="lg:col-span-3 w-full">
        <div
          class="embed-responsive embed-responsive-16by9 relative sm:mt-5 lg:mt-0 w-full overflow-hidden"
          style="padding-top: 56.25%"
        >
          <iframe
            class="embed-responsive-item lg:rounded-xl absolute bottom-0 left-0 right-0 top-0 h-full w-full"
            ref="videoPlayer"
            allow="autoplay; fullscreen; picture-in-picture; web-share"
          ></iframe>
        </div>
        <!-- <div v-show="showpub" class="inset-0 relative">
          <video id="myVideo" controls autoplay>
            <source src="../assets/videos/videotest.mp4" type="video/mp4" />
          </video>
          <div class="flex justify-end">
            <button
              class="rounded-full bg-black -mt-16 px-3 py-1 mr-1 absolute"
              @click="closeAd()"
            >
              Passer l'annonce
            </button>
          </div>
        </div> -->

        <!-- <div
          class="bg-gray-700 w-full items-center lg:relative pb-[27%] pt-[24%] h-0 mb-4"
          v-if="videomessage"
        >
          <p class="text-white text-center mb-10">
            {{ videomessage }}
          </p>
          <div class="flex justify-center space-x-4">
            <button
              type="submit"
              class="px-2.5 py-1 sm:px-2.5 border border-solid sm:py-1 md:py-1.5 md:px-5 bg-transparent rounded-full"
            >
              <router-link to="/signin" class="text-white font-bold">
                Créer un compte</router-link
              >
            </button>
            <button
              type="submit"
              class="px-2.5 py-1 sm:px-2.5 sm:py-1 md:py-1.5 md:px-5 bg-[#07693A] rounded-full"
            >
              <router-link to="/login" class="text-white font-bold">
                Se connecter
              </router-link>
            </button>
          </div>
        </div> -->
        <div class="px-[38px] sm:px-[38px] md:px-8 lg:px-0">
          <h1
            class="pb-2.5 ml-2 mt-2 first-letter:uppercase sm:text-sm md:text-2xl text-white"
          >
            {{ title }}
          </h1>

          <div
            class="h-0 mb-2.5 border border-solid border-t-0 border-slate-800 opacity-25"
          ></div>

          <div class="flex justify-between mb-2.5 px-2.5">
            <div class="flex">
              <img
                class="w-10 h-10 rounded-full object-contain"
                :src="logochannel"
                alt=""
              />
              <p
                class="text-md sm:hidden md:block sm:text-sm md:text-lg pl-2 py-2"
              >
                {{ namechannel }}
              </p>
            </div>
            <div
              class="flex items-center space-x-1 text-sm"
              @click="likeVideo()"
            >
              <svg
                class="h-5 w-5"
                :class="{ colorGreen: islike === true }"
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
              <span>{{ likeTab.length }}</span>
            </div>
            <div class="flex items-center space-x-1 text-sm">
              <svg
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                />
              </svg>
              <span>{{ commentTab.length }}</span>
            </div>
            <div class="flex items-center space-x-1 text-sm">
              <svg
                class="h-5 w-5"
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
              <span>{{ views }}</span>
            </div>
            <!-- <div class="flex items-center space-x-2"><svg class="h-6 w-6 text-white"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="18" cy="5" r="3" />  <circle cx="6" cy="12" r="3" />  <circle cx="18" cy="19" r="3" />  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg></div> -->
            <div class="flex items-center space-x-2" @click="favVideo()">
              <svg
                class="h-5 w-5"
                :class="{ colorGreen: isfav === true }"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </div>
          </div>

          <div
            class="h-0 m:b-4 border border-solid border-t-0 border-slate-800 opacity-25 mb-5"
          ></div>

          <div
            v-if="description"
            class="first-letter:uppercase bg-gray-700 rounded-lg p-2.5"
          >
            <p
              class="text-md contrast-75"
              :class="{ truncatetwo: !showDescription }"
            >
              {{ description }}
            </p>
            <button v-if="!showDescription" @click="showalldescription()">
              <span class="font-bold">voir plus</span>
            </button>
            <button v-if="showDescription" @click="showalldescription()">
              <span class="font-bold">moins</span>
            </button>
          </div>

          <div class="lg:hidden my-5 h-full">
            <div class="relative slide h-full mb-2">
              <div
                class="carousel-inner relative overflow-hidden h-full w-full rounded-xl"
              >
                <div
                  v-for="(pub, i) in pubs"
                  :id="`slide-${i}`"
                  :key="i"
                  :class="`${active === i ? 'active' : 'left-full'}`"
                  class="carousel-item inset-0 relative rounded-xl transform transition-all duration-500 ease-in-out"
                >
                  <a :href="pub.url">
                    <video
                      class="h-full w-full object-contain rounded-xl"
                      v-if="pub.fichierPubMap.vid_web_acc"
                      :src="pub.fichierPubMap.vid_web_acc.url"
                      autoplay
                      muted
                    ></video>
                    <Image
                      v-if="pub.fichierPubMap.img_web_acc"
                      :src="pub.fichierPubMap.img_web_acc.url"
                      alt="First slide" />
                    <Image
                      v-if="pub.fichierPubMap.gif_web_acc"
                      :src="pub.fichierPubMap.gif_web_acc.url"
                      alt="First slide" />
                    <Image
                      v-if="
                        !pub.fichierPubMap.gif_web_acc &&
                        !pub.fichierPubMap.img_web_acc &&
                        !pub.fichierPubMap.vid_web_acc
                      "
                      ref="video"
                      src="../../assets/images/direct.jpeg"
                      alt="First slide"
                  /></a>
                </div>
              </div>
            </div>
          </div>

          <form class="mt-8">
            <div class="flex space-x-3 mb-4">
              <div v-if="user">
                <img
                  class="mb-0 h-10 w-10 rounded-full"
                  v-if="image"
                  :src="image.url"
                />
                <button
                  class="dropbtn md:w-10 md:h-10 mt-1 bg-[#07693A]"
                  v-if="!image"
                >
                  <span
                    >{{ user.surname.charAt(0).toUpperCase()
                    }}{{ user.name.charAt(0).toUpperCase() }}</span
                  >
                </button>
              </div>
              <div v-if="!user">
                <img
                  class="mb-0 h-10 w-10 rounded-full border-2"
                  src="../assets/images/profile.png"
                />
              </div>
              <input
                type="text"
                class="text-white outline-none border-b-2 bg-transparent text-md block w-full py-1.5"
                placeholder="Ajouter un commentaire"
                v-model="content_comment"
                @input="checkForm"
              />
            </div>
            <div class="flex justify-end sm:text-sm mb-4 space-x-4">
              <button @click.prevent="cancelComment()" class="border-b-2">
                Annuler
              </button>
              <div class="">
                <ButtonSpinner
                  class="px-2.5 py-1 sm:px-1 text-center rounded-full cursor-pointer sm:py-1 md:py-1.5 md:px-5 disabled:border-white disabled:border-2 disabled:bg-transparent disabled:cursor-not-allowed"
                  :disabled="formIncomplete"
                  :fetching="fetch"
                  @click.prevent="insertComment()"
                >
                  Ajouter un commentaire
                </ButtonSpinner>
              </div>
            </div>
          </form>

          <div
            class="h-0 mb-7 border border-solid border-t-0 border-slate-800 opacity-25"
          ></div>

          <div v-for="(comment, index) in commentTab" :key="index">
            <div class="flex space-x-4 mb-7" v-if="user">
              <img
                class="mb-0 h-10 w-10 rounded-full"
                v-if="comment.user_photo"
                :src="comment.user_photo"
              />
              <button
                class="dropbtn md:w-10 md:h-10 mt-1 bg-[#07693A]"
                v-if="!comment.user_photo"
              >
                <span
                  >{{ user.surname.charAt(0).toUpperCase()
                  }}{{ user.name.charAt(0).toUpperCase() }}</span
                >
              </button>

              <div>
                <div class="flex space-x-4">
                  <h1 class="font-bold">@{{ comment.user }}</h1>
                  <p class="text-sm mt-1">
                    {{ moment(comment.createdAt).fromNow() }}
                  </p>
                </div>
                <p class="text-gray-400">{{ comment.content }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="px-[38px] sm:px-[38px] md:px-8">
          <div class="lg:hidden">
            <div class="scrollable-container h-12">
              <div class="scrollable-content" ref="scrollableContent2">
                <div class="tag-list ml-14 mr-14">
                  <div class="flex flex-col outline-none text-black">
                    <input
                      :class="{
                        tagclass:
                          texttag == 'videos_similaires' || texttag == '',
                      }"
                      class="px-4 rounded-lg py-1 text-base"
                      value="Vidéos Similaires"
                      type="submit"
                      v-on:click="search('')"
                    />
                  </div>
                  <div
                    class="flex flex-col outline-none text-black"
                    v-for="tag in listtags"
                    :key="tag.id"
                  >
                    <input
                      :class="{ tagclass: texttag == tag.name }"
                      class="px-4 rounded-lg py-0.5 text-base"
                      :value="tag.name"
                      type="submit"
                      v-on:click="search(tag.name)"
                    />
                  </div>
                </div>
              </div>
              <button class="scroll-left-btn" @click="scrollLeft2()">
                &lt;
              </button>
              <button class="scroll-right-btn" @click="scrollRight2()">
                &gt;
              </button>
            </div>

            <div v-show="isLoading">
              <div class="mt-5" v-for="index in items" :key="index">
                <div class="grid grid-cols-3 flex space-x-4">
                  <div class="col-span-1">
                    <div
                      class="animate-pulse bg-white bg-opacity-20 rounded-xl w-full h-[150px]"
                    ></div>
                  </div>
                  <div class="col-span-2 py-4">
                    <div
                      class="animate-pulse bg-white bg-opacity-20 mt-1 mr-5 w-full h-4"
                    ></div>
                    <div
                      class="animate-pulse bg-white bg-opacity-20 mt-2 w-full h-10"
                    ></div>
                    <div
                      class="animate-pulse bg-white bg-opacity-20 mt-2 w-10 h-3"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="max-h-screen overflow-y-scroll snap snap-y"
              v-show="!isLoading"
            >
              <div
                v-if="videoSimilaires.length == 0"
                class="mt-5 mr-5 text-md font-bold"
              >
                {{ message }}
              </div>
              <div
                class="mt-5"
                @click="reload"
                v-for="(videoSimilaire, index) in videoSimilaires"
                :key="index"
              >
                <router-link
                  class="router-link"
                  :to="
                    '/ReadVideo/' +
                    videoSimilaire.id +
                    '/' +
                    replaceSpacesWithDash(videoSimilaire.shortDescription)
                  "
                >
                  <div class="grid grid-cols-5 space-x-4">
                    <div class="col-span-2 relative">
                      <Image
                        :src="
                          videoSimilaire.thumbnail != null
                            ? videoSimilaire.thumbnail
                            : defaultimage
                        "
                        class="rounded-xl"
                      />
                      <div
                        class="h-full w-full absolute inset-0 flex justify-center items-center"
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
                      <div
                        class="h-full w-full absolute inset-0 flex justify-end items-end"
                      >
                        <div>
                          <button
                            class="text-xs px-1 mr-1 rounded-md bg-opacity-60 bg-black text-right"
                          >
                            {{ videoSimilaire.duration }}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="col-span-3 flex items-center">
                      <div>
                        <p
                          class="text-base truncatetwo"
                          :title="videoSimilaire.shortDescription"
                        >
                          {{ videoSimilaire.shortDescription }}
                        </p>
                        <div
                          class="mt-1 flex space-x-4 text-sm"
                          style="line-height: 1rem; font-size: 0.75rem"
                        >
                          <div class="flex space-x-1">
                            <svg
                              class="h-5 w-5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <rect
                                x="3"
                                y="4"
                                width="18"
                                height="18"
                                rx="2"
                                ry="2"
                              />
                              <line x1="16" y1="2" x2="16" y2="6" />
                              <line x1="8" y1="2" x2="8" y2="6" />
                              <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            <span>{{ videoSimilaire.dateSortie }}</span>
                          </div>
                          <div class="flex space-x-1">
                            <svg
                              class="h-5 w-5"
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
                            <span>{{ videoSimilaire.nbVues }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-2 lg:block sm:hidden">
        <div class="relative slide h-full mb-2">
          <div
            class="carousel-inner relative overflow-hidden h-full w-full rounded-xl"
          >
            <div
              v-for="(pub, i) in pubs"
              :id="`slide-${i}`"
              :key="i"
              :class="`${active === i ? 'active' : 'left-full'}`"
              class="carousel-item inset-0 relative rounded-xl transform transition-all duration-500 ease-in-out"
            >
              <a :href="pub.url">
                <video
                  class="h-full w-full object-contain rounded-xl"
                  v-if="pub.fichierPubMap.vid_web_acc"
                  :src="pub.fichierPubMap.vid_web_acc.url"
                  autoplay
                  muted
                ></video>
                <Image
                  v-if="pub.fichierPubMap.img_web_acc"
                  :src="pub.fichierPubMap.img_web_acc.url"
                  alt="First slide" />
                <Image
                  v-if="pub.fichierPubMap.gif_web_acc"
                  :src="pub.fichierPubMap.gif_web_acc.url"
                  alt="First slide" />
                <Image
                  v-if="
                    !pub.fichierPubMap.gif_web_acc &&
                    !pub.fichierPubMap.img_web_acc &&
                    !pub.fichierPubMap.vid_web_acc
                  "
                  ref="video"
                  src="../../assets/images/direct.jpeg"
                  alt="First slide"
              /></a>
            </div>
           
          </div>
        </div>
        <div class="scrollable-container h-12">
          <div class="scrollable-content" ref="scrollableContent">
            <div class="tag-list ml-14 mr-14">
              <div class="flex flex-col outline-none text-black">
                <input
                  :class="{
                    tagclass: texttag == 'videos_similaires' || texttag == '',
                  }"
                  class="px-4 rounded-lg py-1 text-base"
                  value="Vidéos Similaires"
                  type="submit"
                  v-on:click="search('')"
                />
              </div>
              <div
                class="flex flex-col outline-none text-black"
                v-for="tag in listtags"
                :key="tag.id"
              >
                <input
                  :class="{ tagclass: texttag == tag.name }"
                  class="px-4 rounded-lg py-0.5 text-base"
                  :value="tag.name"
                  type="submit"
                  v-on:click="search(tag.name)"
                />
              </div>
            </div>
          </div>
          <button class="scroll-left-btn" @click="scrollLeft()">&lt;</button>
          <button class="scroll-right-btn" @click="scrollRight()">&gt;</button>
        </div>

        <div v-show="isLoading">
          <div class="mt-5" v-for="index in items" :key="index">
            <div class="grid grid-cols-3 space-x-2">
              <!-- <div class="col-span-1"> -->
              <div
                class="animate-pulse bg-white bg-opacity-20 rounded-xl w-full h-[120px]"
              ></div>
              <!-- </div> -->
              <div class="col-span-2 py-2">
                <div
                  class="animate-pulse bg-white bg-opacity-20 mt-1 mr-5 w-full h-4"
                ></div>
                <div
                  class="animate-pulse bg-white bg-opacity-20 mt-2 w-full h-10"
                ></div>
                <div
                  class="animate-pulse bg-white bg-opacity-20 mt-2 w-10 h-3"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="max-h-screen overflow-y-scroll snap snap-y"
          v-show="!isLoading"
        >
          <div
            v-if="videoSimilaires.length == 0"
            class="mt-5 mr-5 text-md font-bold"
          >
            {{ message }}
          </div>

          <div
            class="mt-5"
            @click="reload"
            v-for="(videoSimilaire, index) in videoSimilaires"
            :key="index"
          >
            <router-link
              :to="
                '/readvideo/' +
                videoSimilaire.id +
                '/' +
                replaceSpacesWithDash(videoSimilaire.shortDescription)
              "
            >
              <div class="grid grid-cols-5 space-x-2">
                <div class="relative col-span-2">
                  <img
                    :src="
                      videoSimilaire.thumbnail != null
                        ? videoSimilaire.thumbnail
                        : defaultimage
                    "
                    class="rounded-xl w-[200px] h-[100px]"
                  />
                  <div
                    class="h-full w-full absolute inset-0 flex justify-center items-center"
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
                  <div
                    class="h-full w-full absolute inset-0 flex justify-end items-end"
                  >
                    <div class="mr-2 mb-2">
                      <button
                        class="text-xs px-1 rounded-md bg-opacity-60 bg-black text-right"
                      >
                        {{ videoSimilaire.duration }}
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-span-3 flex items-center">
                  <div>
                    <div
                      class="text-xs truncatetwo lg:text-sm xl:text-base"
                      :title="videoSimilaire.shortDescription"
                    >
                      {{ videoSimilaire.shortDescription }}
                    </div>
                    <div class="mt-1 flex space-x-4 text-sm contrast-0">
                      <div class="flex space-x-1">
                        <svg
                          class="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span>{{ videoSimilaire.dateSortie }}</span>
                      </div>
                      <div class="flex space-x-1">
                        <svg
                          class="h-5 w-5"
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
                        <span>{{ videoSimilaire.nbVues }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Api } from "../helpers";
import Swal from "sweetalert2";
import ButtonSpinner from "../components/ButtonSpinner.vue";
import { mapState } from "vuex";
import Image from "./Image.vue";
import Erreur from "../services/error";
import useBreakpoint from "../hooks/useBreakpoint";
import moment from "moment";

export default {
  name: "ReadVideo",
  components: {
    Image,
    ButtonSpinner,
  },

  data() {
    return {
      showpub: true,
      showDescription: false,
      pubs: [],
      pub: {
        fichierPubMap: {
          img_web_acc: {
            url: "",
          },
          img_web_live: {
            url: "",
          },
          gif_web_acc: {
            url: "",
          },
          gif_web_live: {
            url: "",
          },
          vid_web_acc: {
            url: "",
          },
          vid_web_live: {
            url: "",
          },
        },
      },
      active: 0,
      isLoading: true,
      message: "",
      disabled: true,
      videomessage: "",
      video: {},
      videoSimilaires: [],
      description: "",
      content_comment: "",
      commentTab: [],
      moment: moment,
      likeTab: [],
      favVideoTab: [],
      views: "",
      title: "",
      logochannel: "",
      namechannel: "",
      islike: false,
      isfav: false,
      texttag: "videos_similaires",
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
      image: {
        id: "",
        name: "",
        size: "",
        url: "",
      },
      fetch: false,
    };
  },

  computed: {
    formIncomplete() {
      return !this.content_comment;
    },

    ...mapState({
      listtags: "tags",
    }),
  },

  setup() {
    const breakpoint = useBreakpoint();

    return {
      items: breakpoint.value.items,
    };
  },

  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.token = localStorage.getItem("jwtToken");
    if (this.user) {
      this.image = this.user.image;
    }
    this.image = "";
    this.incrementViews();
    const scrollableContent = this.$refs.scrollableContent;
    scrollableContent.addEventListener("scroll", () => {
      const scrollLeft = scrollableContent.scrollLeft;
      const scrollWidth = scrollableContent.scrollWidth;
      const clientWidth = scrollableContent.clientWidth;

      if (scrollLeft === 0) {
        this.$refs.scrollLeftBtn = this.disabled;
      } else {
        this.$refs.scrollLeftBtn = !this.disabled;
      }

      if (scrollLeft + clientWidth === scrollWidth) {
        this.$refs.scrollRightBtn = this.disabled;
      } else {
        this.$refs.scrollRightBtn = !this.disabled;
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

    this.$store.dispatch("get_tags");
    this.watchVideo();
    this.like();
    this.fav();
    this.videoSimilaire();
    this.getAllAds();
  },

  methods: {
    // getVideoDuration() {
    //   // Accédez à l'élément vidéo à l'aide de $refs
    //   const videoElement = this.$refs.video;

    //   // Attendez que la vidéo soit chargée pour obtenir la durée
    //   videoElement.addEventListener("loadedmetadata", () => {
    //     this.videoDuration = videoElement.duration; // La durée sera en secondes
    //   });
    //   console.log(this.videoDuration);
    // },

    replaceSpacesWithDash(phrase) {
      // Utilise la méthode replace avec une expression régulière pour remplacer les espaces par "-"
      var phraseAvecTirets = phrase.replace(/[\s,':;"]+/g, "-");
      return phraseAvecTirets;
    },

    showalldescription() {
      if (this.showDescription == true) {
        this.showDescription = false;
      } else {
        this.showDescription = true;
      }
    },
    // handleVideoLoaded() {
    //   // Afficher la publicité de pré-roll avant de commencer la vidéo principale
    //   this.showAd1 = true;
    // },
    // handleTimeUpdate() {
    //   this.showAd1 = false;
    //   const videoComposant= document.getElementById('videoPlayer')
    //   // Afficher la publicité de mid-roll à mi-chemin de la vidéo principale
    //   const midpoint = videoComposant.duration / 2;
    //   if (videoComposant.currentTime >= midpoint) {
    //     this.showAd2 = true;
    //     videoComposant.pause();
    //   }
    // },

    closeAd() {
      //  Fermer la publicité et reprendre la lecture de la vidéo
      this.showpub = false;
    },

    // handleVideoEnded() {
    //   // Afficher la publicité de post-roll à la fin de la vidéo principale
    //   this.showAd2 = false;
    //   this.showAd3 = true;
    // },

    getAllAds() {
      Api.getwithouttoken("/publicite/api/publicite/all-ads")
        .then((response) => {
          const pubstab = response.data.content;
          pubstab.forEach((item) => {
            if (item.published == true) {
              const dateActuelle = new Date().toISOString().split("T")[0]; // Obtenez la date actuelle au format "YYYY-MM-DD"
              const dateFin = new Date(item.endDate)
                .toISOString()
                .split("T")[0]; // Obtenez la date actuelle au format "YYYY-MM-DD"
              if (dateActuelle <= dateFin) {
                this.pubs.push(item);
              }
            }
          });

          const nextAds = () => {
            this.active = (this.active + 1) % this.pubs.length;
            if (this.pubs[this.active].fichierPubMap.vid_web_acc) {
              this.$refs.video.src =
                this.pubs[this.active].fichierPubMap.vid_web_acc.url;
              const duration = 33000;
              setTimeout(nextAds, duration);
            } else {
              setTimeout(nextAds, this.time);
            }
          };
          nextAds();
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        });
    },

    capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },

    //Retourne la liste des vidéos en fonction d'un tag
    async search(tag) {
      this.isLoading = true;
      let uri;
      this.tagname = tag;

      switch (true) {
        case this.tagname !== "":
          this.texttag = this.tagname;
          uri = "/streamvod/api/videos/tags?tags=" + this.tagname;
          break;

        default:
          this.texttag = "videos_similaires";
          uri =
            "/streamvod/api/videos/" +
            this.$route.params.id +
            "/videos-similaire";
      }

      Api.getwithouttoken(uri)
        .then((response) => {
          const videostab = response.data.content;
          videostab.forEach((video) => {
            const formatDeSortie = "DD/MM/YYYY";
            video.dateSortie = moment(video.dateSortie).format(formatDeSortie);
            video.duration = this.formatDuration(video.duration);
            this.videoSimilaires.push(video);
          });
          if (this.videoSimilaires.length == 0) {
            this.message = "Aucune vidéo";
          } else {
            this.message = "";
          }
        })
        .catch(function (err) {
          Erreur.gestionErreur(err.message);
        })
        .then(() => {
          this.isLoading = false;
        });
    },

    //Scroller à gauche
    scrollLeft() {
      this.$refs.scrollableContent.scrollBy({
        left: -150,
        behavior: "smooth",
      });
    },

    //Scroller à droite
    scrollRight() {
      this.$refs.scrollableContent.scrollBy({
        left: 150,
        behavior: "smooth",
      });
    },

    //Scroller à gauche
    scrollLeft2() {
      this.$refs.scrollableContent2.scrollBy({
        left: -150,
        behavior: "smooth",
      });
    },

    //Scroller à droite
    scrollRight2() {
      this.$refs.scrollableContent2.scrollBy({
        left: 150,
        behavior: "smooth",
      });
    },

    //Recharger une page
    reload() {
      location.reload();
    },

    // Méthode qui permet d'ajouter un commentaire
    insertComment() {
      this.fetch = true;
      if (this.token) {
        if (this.content_comment.trim() !== "") {
          Api.post("/streamvod/rest/comments/create/" + this.$route.params.id, {
            content: this.content_comment,
          })
            .then((response) => {
              this.commentTab.push(response.data.content);
              this.commentTab = this.commentTab.slice().reverse();
              this.content_comment = "";
            })
            .catch(function (err) {
              Erreur.gestionErreur(err.message);
            })
            .then(() => {
              this.fetch = false;
            });
        }
      } else {
        this.content_comment = "";
        this.fetch = false;
        Swal.fire({
          text: "Merci de vous connecter pour commenter cette vidéo.",
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

    //Méthode qui permet de liker une vidéo
    likeVideo() {
      Api.put("/streamvod/rest/likes/" + this.$route.params.id)
        .then((response) => {
          // mettre à jour le nombre de vues dans l'interface utilisateur
          console.log("test");
          this.likeTab = response.data.content.likedUsers;
          this.like();
        })
        .catch(function (err) {
          Erreur.gestionErreur(err.message);
        });
    },

    // Méthode qui permet de mettre une vidéo en favoris
    favVideo() {
      Api.put("/streamvod/rest/fav/" + this.$route.params.id)
        .then((response) => {
          // mettre à jour le nombre de vues dans l'interface utilisateur
          this.favVideoTab = response.data.content.favUsers;
          this.fav();
        })
        .catch(function (err) {
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

    //Changer la couleur de l'icône favoris
    fav() {
      if (this.favVideoTab.includes(this.$store.state.user.username)) {
        this.isfav = true;
      } else {
        this.isfav = false;
      }
    },

    //Formater le nombre de vues
    formatNumber(number) {
      if (number >= 1000000000) {
        return (number / 1000000000).toFixed(1) + " Milliards";
      } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + " Millions";
      } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + " Milliers";
      } else {
        return number;
      }
    },

    // Incrementer le nombre de vues d'une vidéo
    incrementViews() {
      // appel à l'API pour incrémenter le nombre de vues
      Api.putwithouttoken(
        "/streamvod/api/videos/add-vue/" + this.$route.params.id
      )
        .then((response) => {
          // mettre à jour le nombre de vues dans l'interface utilisateur
          this.views = this.formatNumber(response.data.content.nbVues);
        })
        .catch(function (err) {
          Erreur.gestionErreur(err.message);
        });
    },

    //Vérifier que l'input des commentaires est actif
    checkForm() {
      this.$nextTick(() => {
        this.formIncomplete = !this.content_comment;
      });
    },

    //Annuler un commentaire
    cancelComment() {
      this.content_comment = "";
    },

    //*********** VIDEOS EN LECTURE ***************
    async watchVideo() {
      const result = await Api.getwithouttoken(
        "/streamvod/api/videos/" + this.$route.params.id
      );
      this.video = result.data.content;
      this.description = this.video.description;
      this.title = this.video.title;
      this.views = this.video.nbVues;
      this.logochannel = this.video.channel.channel_logo.url;
      this.namechannel = this.video.channel.channel_name;
      this.likeTab = this.video.likedUsers;
      this.commentTab = this.video.comments.slice().reverse();
      this.favVideoTab = this.video.favUsers;
      // if (this.token == null) {
      //   this.videomessage = "Vous devez être connecté pour lire cette vidéo";
      // } else {
      this.$refs.videoPlayer.src =
        "https://geo.dailymotion.com/player/xpnus.html?video=" +
        this.video.privateId;
      // }
    },

    formatDuration(seconds) {
      let hours = Math.floor(seconds / 3600);
      let minutes = Math.floor((seconds % 3600) / 60);
      let remainingSeconds = seconds % 60;

      // Ajoute un zéro devant si les chiffres sont inférieurs à 10
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      remainingSeconds =
        remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
      if (hours < 1) {
        return minutes + ":" + remainingSeconds + "s";
      } else {
        return hours + ":" + minutes + ":" + remainingSeconds + "s";
      }
    },

    //*********** VIDEOS SIMILAIRES ***************
    async videoSimilaire() {
      await Api.getwithouttoken(
        "/streamvod/api/videos/" + this.$route.params.id + "/videos-similaire"
      )
        .then((response) => {
          const videostab = response.data.content;
          videostab.forEach((video) => {
            const formatDeSortie = "DD/MM/YYYY";
            video.dateSortie = moment(video.dateSortie).format(formatDeSortie);
            video.duration = this.formatDuration(video.duration);
            this.videoSimilaires.push(video);
          });
        })
        .catch((err) => {
          Erreur.gestionErreur(err.message);
        })
        .then(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style>
/* .advertisement {
  display: none;
} */

.scrollable-container {
  position: relative;
  /* width: 300px; */
  overflow: hidden;
}

.scrollable-content {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.tag-list {
  @apply space-x-4 my-2;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}

.scroll-left-btn,
.scroll-right-btn {
  @apply bg-[#141414] hover:bg-[#141414];
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  /* border-radius: 50%; */
  border: none;
  color: #333;
  font-size: 16px;
  cursor: pointer;
}

.scroll-left-btn {
  @apply left-0 text-white;
}

.scroll-right-btn {
  @apply right-0 text-white;
}

.block-chaine::-webkit-scrollbar {
  width: 0;
}

.pd-10 {
  padding: 20px;
}

.mb-3 {
  transition: all 0.5s ease;
}

.mb-3:hover {
  transform: scale(1.1);
  z-index: 99;
}

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

.input-comment {
  width: 100%;
}

.annuler {
  background-color: transparent;
  border: none;
  width: 140px;
  height: 50px;
  border-bottom: 2px white solid;
  color: white;
  font-weight: bold;
  transition: all 0.5s ease;
  margin-right: 20px;
}

.annuler:hover {
  transform: scale(1.1);
}

.comment-button {
  margin-top: 20px;
  float: right;
}

.colorGreen {
  color: #07693a;
}

.text-white .router-link {
  color: white;
  text-decoration: none;
}

.title-video {
  font-weight: bold;
  color: white;
}

.description-video {
  color: white;
  padding-right: 10px;
}

.shadow {
  -webkit-box-shadow: 0px 0px 12px 0px #000000;
  box-shadow: 0px 0px 12px 0px #000000;
}

.video-card img {
  @apply object-cover rounded-md absolute top-0 left-0 w-full h-full;
}

.submit-button:disabled {
  cursor: not-allowed;
  background-color: #d1d5db;
  color: #111827;
}

.submit-button:disabled:hover {
  background-color: #9ca3af;
}

.tagclass {
  @apply bg-[#07693A] text-white;
}

.active {
  background-color: #07693a;
}

.truncatetwo {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>