<template>
  <div class="bl">
    <div class="wrapper1">
      <section class="my-10">
        <div class="mx-5">
          <p class="text-3xl font-semibold text-center">404</p>
          <h1 class="mt-4 text-3xl text-center font-bold tracking-tight">
            Page not found
          </h1>
          <p class="mt-6 text-sm leading-7">
            Désolé, nous n'avons pas trouvé la page que vous recherchez.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <router-link
              :to="'/'"
              class="rounded-md bg-[#07693A] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >Retour à l'accueil</router-link
            >
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "ValidEmail",
};
</script>
  
<style>
.bl {
  @apply flex items-center justify-center w-full h-screen;
  background-size: cover;
}
</style>
  