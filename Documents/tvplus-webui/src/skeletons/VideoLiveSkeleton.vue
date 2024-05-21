<template>
    <div class="px-20 py-6 ">
        <div class="grid grid-cols-3 mt-20 space-x-10">
            <div class="col-span-2">
                <div class="col-md-7">
                    <div class="relative pb-[58.25%] overflow-hidden" itemscope itemtype="https://schema.org/VideoObject">
                        <!-- Loading skeleton for the video player -->
                        <div class=" w-full h-full absolute left-0 top-0 animate-pulse bg-white bg-opacity-20"></div>
                    </div>
                </div>
            </div>
            
                <div class="col-md-5 py-20">
                    <div class="h-24 w-24 "> 
                        <!-- Loading skeleton for the channel logo -->
                        <div class=" w-full h-full animate-pulse bg-white bg-opacity-20"></div>
                    </div>
                   
                    <h1 class="py-2.5">
                        <!-- Loading skeleton for the program name -->
                        <div class=" w-24 h-6 animate-pulse bg-white bg-opacity-20"></div>
                    </h1>
                    <div class="text-sm capitalize animate-pulse">
                        <!-- Loading skeleton for the program description -->
                        <div class=" w-full h-6 bg-white bg-opacity-20 "></div>
                    </div>
                    <div class="mt-5">
                        <!-- Loading skeleton for the next video thumbnail and title -->
                        <div class="flex space-x-4">
                            <div class=" w-20 h-24 rounded-xl animate-pulse bg-white bg-opacity-20"></div>
                            <div class="py-6 mt-2">
                                <div class="w-28 h-6 animate-pulse bg-white bg-opacity-20"></div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>

        <div>
            <ul class="flex space-x-4 mt-4 text-md text-gray-400">
                <li>
                    <!-- Loading skeleton for the "En direct" button -->
                    <div> En direct</div>
                </li>
                <li>
                    <!-- Loading skeleton for the "A suivre" button -->
                    <div> A suivre</div>
                </li>
            </ul> 
        </div>

        <div class="pt-5">
            <!-- Loading skeleton for the LiveCardVue component -->
            <!-- <card-skeleton></card-skeleton> -->
            <div
      class="
        grid
        gap-2
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        xl:grid-cols-6
        w-full ">
        
      <card-skeleton
        v-for="index in items"
        :key="index"
        class="col-span-1"
      />

    </div>

        </div>
    </div>
</template>
  <script>
    import Skeleton from "../components/Skeleton/index.vue";
    import useBreakpoint from "../hooks/useBreakpoint";
    import CardSkeleton from './CardSkeleton.vue';
    import LiveCardSkeleton from "./VideoCardSkeleton.vue";
  
    export default {
        components: { Skeleton, LiveCardSkeleton, CardSkeleton },

    setup() {
    const breakpoint = useBreakpoint();

    return {
      items: breakpoint.value.items,
    };
  },

  };
  </script>
  
  <style>
  </style>