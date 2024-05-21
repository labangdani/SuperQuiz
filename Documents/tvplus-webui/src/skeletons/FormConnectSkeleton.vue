<template>
    <Skeleton>
        <div >
        <div class="wrapper1">
            <section class="form signup">
                <header><div></div></header>
                <form >               
                <div  class="propsition">
                    <button-skeleton />
                    <button-skeleton />
                    <button-skeleton />
                </div> 
                <div  lass="">
                </div>
                        <div class="field input" v-if="connect === 'Email' || connect === ''">
                        <input v-model="email" type="email" name="" id="" placeholder="Email" >
                        </div>
                        <div class="field input" v-if="connect === 'Username'">
                        <input v-model="username" type="text" name="" id="" placeholder="Nom d'utilisateur" >
                        </div>
                        <div class="field input" v-if="connect === 'Phone'">
                        <!-- <input v-model="username" type="text" name="" id="" placeholder="Numero de tel..." > -->
                        <vue-tel-input v-model="phone" class="tel-input" ></vue-tel-input>
                        </div>
                    
                    <div class="field input">
                        <input v-model="password" :type="show === true ? 'text' : 'password' " name="" id="" placeholder="Mot de passe">
                        <span class="eye" @click="maskPassword" v-if="show ===true "><font-awesome-icon icon="fa-solid fa-eye"/></span>
                        <span class="eyes" @click="showPassword" v-if="show == false "><font-awesome-icon icon="fa-solid fa-eye-slash" /></span>
                    </div>
                    
                    <div class="mdp_oublie"><router-link to="/FormForgetPassword">Mot de passe oublié ?</router-link></div>
                    <div class="field button">
                    <!-- <button  >
                        <span v-if="status == 'loading'">Connexion en cours ...</span>
                        <span v-else></span>
                    </button> -->
                    <input @click="login()" type="submit" value="Connectez-vous maintenant" >
                    </div>
                </form>
                <div class="link">Vous n'avez pas de compte ? <router-link to="/signin" class="condition">S'inscrire</router-link></div>
            </section>
        </div>
    </div>
    </Skeleton>
    
</template>


<script>
import Skeleton from "../components/Skeleton/index.vue";
import ButtonSkeleton from "./ButtonSkeleton.vue";

export default {
  components: { Skeleton, ButtonSkeleton },
};
</script>

<style>
</style>