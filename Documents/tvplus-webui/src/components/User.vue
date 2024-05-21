<template>

    <!-- <div class="pt-24 pb-12 relative z-1 bg-gradient-to-b from-[#07693A] to-black wrapper px-5 sm:px-5 md:px-8 xl:px-20 xl:pt-48">
        <h1 class="text-white font-bold pb-4 xl:pb-16 text-3xl xl:text-4xl">Mon compte</h1>
        <div class="relative flex items-center xl:hidden sm:pl-5 space-x-4 sm:mb-5 text-md font-bold">
            <button :class="{usermenuclass: connect === 'infos' || connect === ''}" @click="getInfos()">Mes infos</button>
            <button :class="{usermenuclass: connect === 'favoris'}" @click="getFavoris()">Mes favoris</button>
        </div>
        <div class="flex">
            <div class="xl:w-52 sm:hidden xl:block xl:shrink-0 xl:pl-0 xl:mb-0 md:pl-8 pl-5 mb-4">
                <ul class="space-y-5">
                    <li class="pl-6 text-lg "><button :class="{usermenuclass: connect === 'infos' || connect === ''}" @click="getInfos()">Mes infos</button></li>
                    <li class="pl-6 text-lg "><button :class="{usermenuclass: connect === 'favoris'}" @click="getFavoris()">Mes favoris</button></li>
                </ul>
            </div>
        </div>
    </div> -->

    <!-- <div class="h-0 mb-2.5 border border-solid border-t-0 border-slate-800 opacity-25"></div> -->
    
    <div class="flex justify-center mb-2.5 px-2.5">
        <a href="" v-on:click="logout()" class="text-sm text-center py-2 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-white">
            Se Déconnecter
        </a>
    </div>
    <button
        class="bg-[#07693A] hover:bg-[#07693A] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
        @click="redirect()">
        Envoyer
    </button>

    <!-- <div class="h-0 border border-solid border-t-0 border-slate-800 opacity-25"></div> -->

</template>

<script>

export default {

    mounted(){
        console.log(this.$router.hasRoute('formotp'))
    },

    methods:{
      
        logout(){
            this.$store.commit('logout')
        },

        redirect(){
            console.log("hello world")
            // this.$router.push('/formotp')
            window.location.assign('/formotp')

        }

    }


}

</script>

<style>

</style>