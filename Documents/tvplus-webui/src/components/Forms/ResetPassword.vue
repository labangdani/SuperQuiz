<template>
  <div class="bl">
      <div class="wrapper3">
          <section class="my-10 mx-5">
              <div class="imgclass">
                  <img class="w-32 h-20 object-contain" src="/src/assets/images/whitelogo.png" alt="">
              </div>

              <div class="titletext">Nouveau mot de passe</div>

              <div  class="text-sm text-red-600 text-center" v-if="status != '' && status!='loading'" >
                <strong>{{ status }}</strong>
              </div>
              
              <div  class="text-center text-red-600 mb-2" v-if="message != ''" >
                <strong>{{message}}</strong>
              </div>

              <div  >
                <p class="text-sm mb-4 px-5" >Veuillez entrer un mot de passe d’au moins 6 caractères.</p>
              </div>

            <form v-on:submit.prevent="ChangePassword()" class="text-black mx-7">
                  
              <div class="flex flex-col mb-2.5 outline-none">
                <input v-model="newPassword" :type="show === true ? 'text' : 'password' " class="p-1.5 rounded-lg pl-5" placeholder="Mot de passe">
                <span class="eye" @click="maskPassword()" v-if="show == true "><font-awesome-icon icon="fa-solid fa-eye"/></span>
                <span class="eyes" @click="showPassword()" v-if="show == false "><font-awesome-icon icon="fa-solid fa-eye-slash" /></span>
              </div>

              <div class="flex flex-col mb-2.5 outline-none">
                <input v-model="password_verified" :type="show === true ? 'text' : 'password'" class="p-1 rounded-lg pl-5" placeholder="Confirmer votre mot de passe">
                <span class="eye1" @click="maskPassword()" v-if="show ===true "><font-awesome-icon icon="fa-solid fa-eye"/></span>
                <span class="eyes1" @click="showPassword()" v-if="show == false "><font-awesome-icon icon="fa-solid fa-eye-slash" /></span>
              </div>

              <div class="flex mt-4 flex-col text-white my-3 outline-none">
                <ButtonSpinner type="submit" :fetching="fetch">enregistrer</ButtonSpinner>
              </div>

            </form>
          </section>
      </div>
  </div>
</template>
  
<script>
import { mapState} from 'vuex';
import {Api} from '../../helpers';
import Erreur from '../../services/error';
  // import Swal from "sweetalert2";
import ButtonSpinner from '../ButtonSpinner.vue';

  export default {
    name: 'signin',

    data(){
      return{
        message:'',
        message_error:'',
        newPassword:'',
        password_verified:'',
        show:false,
        fetch:false,
        userid:'',
      }
    },

    components:{
      ButtonSpinner
    },
   
    computed:{
      ...mapState(['status'])
    },

    mounted(){
      this.usertoken = this.$route.query.id
      // if(this.usertoken == '' || this.usertoken == null){
      //   this.$router.push('/login');
      // }
    },

    methods:{
      //Méthode qui permet de demasquer le mot de passe
      showPassword(){
        this.show=true;
      },
      
      //Méthode qui permet de masquer le mot de passe
      maskPassword(){
        this.show=false;
      },

      //Mettre à jour le mot de passe d'un utilisateur
      ChangePassword() {
        this.fetch = true
        if(this.password === '' || this.password_verified === ''){
          this.message_error = 'Veuillez remplir tous les champs';
        } else if(this.password_verified !== this.newPassword){
          this.message_error = 'Les mots de passe sont différents';
        }
        else{
          Api.putwithouttoken("/authentication/api/auth/new-password/"+this.usertoken, 
          {newPassword: this.newPassword}
          )
          .then((response) => {
            // mettre à jour le nombre de vues dans l'interface utilisateur
            this.successpwd = true;
              this.$router.push("/login")
          })
          .catch(function (error) {
            Erreur.gestionErreur(error.message)
          })
          .then(()=> this.fetch = false)
        }   
      },

    },

    
  }
</script>
  
 <style>

.bl{
  @apply flex items-center justify-center w-full h-screen ;
  background-size: cover;
}

.wrapper3{
  @apply flex bg-[#121212] rounded-2xl my-10 mt-16 mb-20;
}

.header{
  @apply items-center justify-center h-7
}

.imgclass{
  @apply flex justify-center;
}

.titletext{
  @apply text-white text-2xl font-bold pt-2.5 mb-2.5 text-center;
}

.propsition{
  @apply flex justify-between items-center px-10 text-white;
}

.propsition div{
  @apply text-center w-full h-10 mb-5 ;
}

.layour{
  @apply text-lg rounded-b-md rounded-r-md ;
  border-bottom: #07693A 3px solid;
  }
.propsition button{
  @apply w-full bg-transparent text-white mb-5 ;
  transition:all 0.3s  ease ;
}

.namedetails{
  @apply lg:grid lg:grid-cols-2 lg:gap-2 ;
}

.field{
  @apply flex flex-col mb-2.5 ;
}

.input{
  @apply outline-none ;
}

.eye{
  color: white;
  position: relative;
  bottom: 30px;
  left: 99%;
  width: 10px;
  height: 1px;
}

.eyes{
  color: #acabab;
  position: relative;
  bottom: 30px;
  left: 99%;
  width: 10px;
  height: 1px;
}


.radio{
  @apply inline-block ;
}


.form form .button input{
  margin-right: 13px;
  background-color: #07693A;
  border: none;
  width: 100%;
  height: 40px;
  color: #c0bdbd;
  font-weight: 650;
  border-radius: 17px;
  cursor: pointer;
}

.link{
  @apply text-center text-white font-normal;
}

.link .condition{
  @apply text-[#34A662] no-underline;
}

.link a:hover{
  @apply underline;
}

.mdp_oublie{
  @apply text-center mt-0 mb-5;
}

  </style>