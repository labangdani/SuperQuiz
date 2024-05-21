<template>
  <div class="bl">
    <div class="wrapper1">
      <section class="my-10">
        <div class="imgclass">
          <img
            class="w-32 h-20 object-contain"
            src="/src/assets/images/whitelogo.png"
            alt=""
          />
        </div>

        <div class="titletext">Recupérer mon mot de passe</div>
        <div class="text1 text-red-500" v-if="message_error != ''">
          <strong>{{ message_error }} </strong>
        </div>
        <div
          class="text1 text-red-500"
          v-if="status != '' && status != 'loading'"
        >
          <strong>{{ status }}</strong>
        </div>

        <div class="propsition mt-5 text-white space-x-7">
          <div :class="{ layour: connect === 'Email' || connect === '' }">
            <button @click="setSignupType('Email')">
              <strong>Email</strong>
            </button>
          </div>
          <div :class="{ layour: connect === 'Phone' }">
            <button id="recaptcha-button" @click="setSignupType('Phone')">
              <strong>Téléphone</strong>
            </button>
          </div>
        </div>

        <form v-on:submit.prevent="reset()" class="mx-7 text-black w-80">
          <div mode="out-in" name="fade">
            <div
              class="flex flex-col mb-2.5 outline-none"
              v-if="connect === 'Email' || connect === ''"
            >
              <input
                v-model="email"
                type="email"
                class="p-1 rounded-lg pl-5"
                @input="capitalizeFirstLetter"
                name=""
                id=""
                placeholder="Email"
              />
            </div>
            <div
              class="flex flex-col mb-2.5 outline-none"
              v-if="connect === 'Phone'"
            >
              <vue-tel-input
                v-model="tel"
                mode="international"
                :default-country="'CM'"
                :input-options="{ placeholder: 'Numero de tel' }"
                class="p-1 rounded-lg"
              ></vue-tel-input>
            </div>
          </div>

          <div class="flex flex-col my-2.5 mt-5 outline-none text-white">
            <ButtonSpinner type="submit" :fetching="fetch"
              >Envoyer</ButtonSpinner
            >
          </div>
        </form>
      </section>
    </div>
  </div>
</template>
  
  <script>
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import { RecaptchaVerifier } from "firebase/auth";
import Swal from "sweetalert2";
import { mapState } from "vuex";
import { Api } from "../../helpers";
import Erreur from "../../services/error";
import ButtonSpinner from "../ButtonSpinner.vue";

export default {
  name: "FormSignUp",

  components: {
    ButtonSpinner,
  },

  data() {
    return {
      message_error: "",
      email: "",
      tel: "",
      show: false,
      connect: "Email",
      errorCode: "",
      errorMessage: "",
      status: "",
      fetch: false,
    };
  },

  computed: {
    ...mapState(["status"]),
  },

  mounted() {
    //   this.$store.commit('logout')
    this.status = "";
    const auth = getAuth();
    console.log(auth);
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log(response);
        },
      },
      auth
    );
  },

  methods: {
    //Méthode qui permet de choisir le type connexion
    setSignupType(type) {
      this.connect = type;
      this.$store.commit("setStatus", "");
      this.message = "";
      this.fetch = false;
    },

    //Méthode qu permet de vérifier que les champs sont vides
    isEmptyField(...values) {
      return values.some((value) => value === "");
    },

    //Méthode qui permet de créer un utilisateur avec son Email
    async reset_email() {
      this.fetch = true;
      if (this.isEmptyField(this.email)) {
        this.message_error = "Veuillez remplir tous les champs";
        this.fetch = false;
      } else {
        try {
          this.message_error = "";
          await Api.putwithouttoken(
            "/authentication/api/auth/new-password/email?email=" + this.email
          );
          Swal.fire({
            text: "Un lien de réinitialisation de votre nom de passe vous a été envoyé par mail.",
            confirmButtonText: "Ok",
            confirmButtonColor: "#07693A",
          }).then((result) => {
            if (result.value) {
              this.$router.push("/");
            }
          });
        } catch (error) {
          let errorMessage = "Une erreur s'est produite";
          if (error.response) {
            console.error("Réponse du serveur :", error.response.data.message);
            errorMessage = error.response.data.message;
          } else if (error.message) {
            console.error("Erreur de la requête :", error.message);
            errorMessage = error.message;
          }
          Swal.fire({
            text: errorMessage,
            confirmButtonText: "Ok",
            confirmButtonColor: "#07693A",
          });
        } finally {
          this.fetch = false;
        }
      }
    },

    //Méthode qui permet de créer un utilisateur avec son numéro de téléphone
    async reset_phone() {
      if (this.isEmptyField(this.tel)) {
        this.message_error = "Veuillez remplir tous les champs";
        this.fetch = false;
      } else {
        try {
          this.message_error = "";
          const phone_split = this.tel.match(/(\+\d+) (.+)/);
          const country_code = phone_split[1];
          const phone_number = phone_split[2].replace(/\s+/g, "");
          const appVerifier = window.recaptchaVerifier;
          const auth = getAuth();

          await signInWithPhoneNumber(
            auth,
            country_code + phone_number,
            appVerifier
          )
            .then((confirmationResult) => {
              window.confirmationResult = confirmationResult;
              localStorage.setItem("forgetpwd", true);
              this.$router.push("/formotp");
            })
            .catch((error) => {
              // Gérer l'erreur ici
              if (error.response) {
                console.error(
                  "Réponse du serveur :",
                  error.response.data.message
                );
                Swal.fire({
                  text: error.response.data.message,
                  confirmButtonText: "Ok",
                  confirmButtonColor: "#07693A",
                });
              } else {
                console.error("Erreur de la requête :", error.message);
                Swal.fire({
                  text: error.message,
                  confirmButtonText: "Ok",
                  confirmButtonColor: "#07693A",
                });
              }
            });
        } catch (error) {
          Erreur.gestionErreur(error.message);
        } finally {
          this.fetch = false;
        }
      }
    },

    //Méthode qui permet de définir un nouveau mot de passe
    reset() {
      if (this.connect == "Email") {
        this.reset_email();
        this.email = null;
      }
      if (this.connect == "Phone") {
        this.fetch = true;
        this.reset_phone();
        // this.tel = null
      }
    },
  },
};
</script>
  
  <style>
.bl {
  @apply flex items-center justify-center w-full bg-cover;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("/src/assets/images/bg.jpeg") right top no-repeat;
  background-size: cover;
}

.wrapper1 {
  @apply flex bg-[#121212] rounded-2xl my-10 mt-16 mb-20;
}

.header {
  @apply items-center justify-center h-7;
}

.imgclass {
  @apply flex justify-center;
}

.titletext {
  @apply text-white text-3xl font-bold pt-2.5 mb-2.5 text-center;
}

.propsition {
  @apply flex justify-between items-center;
}

.propsition div {
  @apply text-center w-full h-10 mb-5;
}

.layour {
  @apply text-lg rounded-b-md rounded-r-md;
  border-bottom: #07693a 3px solid;
}

.propsition button {
  @apply w-full bg-transparent text-white mb-5;
  transition: all 0.3s ease;
}

.namedetails {
  @apply lg:grid lg:grid-cols-2 lg:gap-2;
}

/* .field{
    @apply flex flex-col mb-2.5;
  } */

.input {
  @apply outline-none;
}

.text1 {
  @apply text-white pt-1.5 mb-2.5 text-center;
}

.eye1 {
  color: white;
  position: relative;
  bottom: 30px;
  left: 85%;
  width: 10px;
  height: 1px;
}

.eyes1 {
  color: #acabab;
  position: relative;
  bottom: 30px;
  left: 85%;
  width: 10px;
  height: 1px;
}

.form form .radio {
  display: inline-block;
}

.checkbox {
  @apply h-4 w-4 bg-black;
}

.button {
  margin-right: 13px;
  background-color: #07693a;
  border: none;
  width: 100%;
  height: 40px;
  color: #c0bdbd;
  font-weight: 650;
  border-radius: 17px;
  cursor: pointer;
}

.link .condition {
  color: #34a662;
  text-decoration: none;
}

.link a:hover {
  text-decoration: underline;
}
</style>
  