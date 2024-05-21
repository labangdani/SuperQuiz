<template>
    <div class="grid mb-4 md:grid-cols-2 lg:grid-cols-3">
        <div
            class="px-2 mb-10 hover:-translate-all hover:scale-105 duration-150"
            v-for="index in items"
            :key="index"
            >
            <div class="animate-pulse grid flex sm:grid-cols-5 md:grid-cols-2 space-x-5 border-2 border-[#07693A] rounded-xl p-4">
                <div
                    class="
                    bg-gray-400
                    sm:col-span-2
                    md:col-span-1
                    cursor-pointer
                    video-card
                    relative
                    w-full
                    2xl:h-[270.212px]
                    h-[192px]
                    sm:h-[164px]
                    md:h-[155px]
                    2xl:h-[200px]
                    ">
                
                </div>
                <div class="
                    sm:col-span-3
                    md:col-span-1
                    h-full  
                ">
                    <div class=" bg-gray-400 h-4 w-full"></div>
                    <div class="bg-gray-400 mt-4 h-14 w-full"></div>
                    <div class="bg-gray-400 mt-4 sm:pt-4 md:pt-2 2xl:pt-7 h-6 w-20"></div>  
                </div>
            </div>
        </div>
    </div>
</template>
      
<script>
  import useBreakpoint from "../hooks/useBreakpoint";
  import Skeleton from "../components/Skeleton/index.vue";
  
  export default {
    components: {
      Skeleton,
    },
  
    setup() {
      const breakpoint = useBreakpoint();
  
      return {
        items: breakpoint.value.items,
      };
    },
  };
  </script>