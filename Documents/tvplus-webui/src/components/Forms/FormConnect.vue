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

        <div class="titletext">Se Connecter</div>

        <div
          v-if="status != '' && status != 'loading'"
          class="bg-red-100 border mb-4 mx-3 border-red-400 text-red-700 px-2 py-2 rounded relative"
          role="alert"
        >
          <strong class="font-bold text-sm"> {{ status }}</strong>
          <span class="absolute top-0 bottom-0 right-0 px-4 py-2">
            <svg
              class="fill-current h-6 w-6 text-red-500"
              @click="close()"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path
                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
              />
            </svg>
          </span>
        </div>

        <div class="propsition space-x-7">
          <div :class="{ layour: connect === 'Email' || connect === '' }">
            <button @click="setConnectionType('Email')">
              <strong>Email</strong>
            </button>
          </div>
          <div :class="{ layour: connect === 'Numero' }">
            <button id="recaptcha-button" @click="setConnectionType('Numero')">
              <strong>Telephone</strong>
            </button>
          </div>
          <div :class="{ layour: connect === 'Username' }">
            <button @click="setConnectionType('Username')">
              <strong>Username</strong>
            </button>
          </div>
        </div>

        <div class="text-center text-red-600 mb-2" v-if="message != ''">
          <strong>{{ message }}</strong>
        </div>

        <form v-on:submit.prevent="login()" class="text-black mx-7">
          <div>
            <div
              class="flex flex-col mb-2.5 outline-none"
              v-if="connect === 'Email'"
            >
              <input
                v-model="email"
                type="email"
                class="p-1.5 rounded-lg pl-5"
                placeholder="Email"
              />
            </div>

            <div
              class="flex flex-col mb-2.5 outline-none"
              v-if="connect === 'Numero'"
            >
              <vue-tel-input
                v-model="phoneNumber"
                mode="international"
                :default-country="'CM'"
                :input-options="{ placeholder: 'Numero de tel' }"
                class="p-1 rounded-lg pl-5 text-black"
              ></vue-tel-input>
            </div>

            <div
              class="flex flex-col mb-2.5 outline-none"
              v-if="connect === 'Username'"
            >
              <input
                v-model="username"
                type="text"
                class="p-1.5 rounded-lg pl-5"
                placeholder="Nom d'utilisateur"
              />
            </div>
          </div>

          <div class="flex flex-col mb-2.5 outline-none">
            <input
              v-model="password"
              class="p-1.5 rounded-lg pl-5"
              placeholder="Mot de passe"
              type="password"
            />
          </div>

          <div class="flex flex-col my-3 outline-none text-white">
            <ButtonSpinner type="submit" :fetching="fetch"
              >Connectez-vous maintenant</ButtonSpinner
            >
          </div>
        </form>
        <div
          class="mdp_oublie text-[#34A662] first-letter:uppercase hover:underline"
        >
          <router-link to="/forgetpassword">mot de passe oublié ?</router-link>
        </div>
        <div class="link">
          Vous n'avez pas de compte ?
          <router-link to="/signin" class="condition ">S'inscrire</router-link>
        </div>
      </section>
    </div>
  </div>
</template>
  
  <script>
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import { RecaptchaVerifier } from "firebase/auth";
import { mapState } from "vuex";
import { Api } from "../../helpers";
import Swal from "sweetalert2";
import ButtonSpinner from "../ButtonSpinner.vue";
import Erreur from "../../services/error";

export default {
  name: "signin",

  data() {
    return {
      message: "",
      username: "",
      email: "",
      phoneNumber: "",
      phoneNumberAsString: "",
      password: "",
      connect: "Email",
      fetch: false,
      status: "",
      phoneSplit:[],
      tel:"",
    };
  },

  components: {
    ButtonSpinner,
  },

  computed: {
    ...mapState(["status"]),
  },

  mounted() {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-button",
      {
        size: "invisible",
        callback: (response) => {},
      },
      auth
    );
  },

  methods: {
    close() {
      this.status = "";
    },

    //Méthode qui permet de choisir le type connexion
    setConnectionType(type) {
      this.connect = type;
      this.status = "";
      this.message = "";
    },

    //Méthode qui permet de vérifier que tous les champs sont remplis
    shouldFillAllFields() {
      return (
        (this.connect === "Email" &&
          (this.email === "" || this.password === "")) ||
        (this.connect === "Numero" &&
          (this.phoneNumber === "" || this.password === "")) ||
        (this.connect === "Username" &&
          (this.username === "" || this.password === ""))
      );
    },

    //Méthode qui permet de se connecter avec l'email
    async loginWithEmail() {
      return await Api.postwithouttoken(
        "/authentication/api/auth/signin-email",
        {
          email: this.email,
          password: this.password,
        }
      );
    },

    //Méthode qui permet de se connecter avec le numéro de téléphone
    async loginWithPhone() {
      this.phoneSplit = this.phoneNumber.match(/(\+\d+) (.+)/);
      this.tel = this.phoneSplit[2].replace(/\s+/g, "");

      return await Api.postwithouttoken(
        "/authentication/api/auth/signin-phone",
        {
          telephone: this.tel,
          password: this.password,
        }
      );
    },

    //Méthode qui permet de se connecter avec le username
    async loginWithUsername() {
      return await Api.postwithouttoken(
        "/authentication/api/auth/signin-username",
        {
          username: this.username,
          password: this.password,
        }
      );
    },

    //Méthode de connexion
    async login() {
      const self = this;
      this.message = "";
      this.fetch = true;

      if (this.shouldFillAllFields()) {
        this.message = "Veuillez remplir tous les champs";
        return;
      }
      try {
        let response;

        if (this.connect === "Email") {
          response = await this.loginWithEmail();
          this.email = null;
          this.password = null;
        } else if (this.connect === "Numero") {
          response = await this.loginWithPhone();
          this.phoneNumber = null;
          this.password = null;
        } else if (this.connect === "Username") {
          response = await this.loginWithUsername();
          this.username = null;
          this.password = null;
        }

        if (response.data.isEnable === false) {
          this.status = "";
          Swal.fire({
            text: "Votre compte n'est pas activé",
            confirmButtonText: "Activer maintenant",
            confirmButtonColor: "#07693A",
          }).then((result) => {
            // this.fetch = true;
            if (response.data.email != null) {
              Api.putwithouttoken("/authentication/api/auth/resend-email", {
                usermail: response.data.email,
              }).then(() => {
                Swal.fire({
                  text: "Un lien de confirmation de la création de votre compte vous a été envoyé par mail.",
                  confirmButtonText: "Ok",
                  confirmButtonColor: "#07693A",
                })
                  .then(() => {
                    location.reload();
                  })
                  .catch((error) => {
                    Erreur.gestionErreur(error.message);
                  });
                this.fetch = false;
              });
            } else {
              const countryCode = this.phoneSplit[1];
              const appVerifier = window.recaptchaVerifier;
              const auth = getAuth();
              signInWithPhoneNumber(auth, countryCode + this.tel, appVerifier)
                .then((confirmationResult) => {
                  window.confirmationResult = confirmationResult;
                  // localStorage.removeItem("forgetpwd");
                  self.$router.push("/formotp");
                  location.reload()
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
                    Erreur.gestionErreur(error.message);
                  }
                })
                .then(() => {
                  this.fetch = false;
                });
            }
          });
        } else {
          this.status = "";
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("jwtToken", response.data.token);
          const url = localStorage.getItem("path");
          if (url != null) {
            self.$router.push(url);
          } else {
            self.$router.push("/");
          }
        }
      } catch (error) {
        if ((error.message = "Request failed with status code 401")) {
          this.status = this.connect + " ou mot de passe incorrect";
        }
      } finally {
        this.fetch = false;
      }
    },
  },
};
</script>
  
 <style>
.bl {
  @apply flex items-center justify-center w-full h-screen;
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
  @apply flex justify-between items-center px-10 text-white;
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

.field {
  @apply flex flex-col mb-2.5;
}

.input {
  @apply outline-none;
}

.eye {
  color: white;
  position: relative;
  bottom: 30px;
  left: 99%;
  width: 10px;
  height: 1px;
}

.eyes {
  color: #acabab;
  position: relative;
  bottom: 30px;
  left: 99%;
  width: 10px;
  height: 1px;
}

.radio {
  @apply inline-block;
}

.form form .button input {
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

.link {
  @apply text-center text-white font-normal;
}

.link .condition {
  @apply text-[#34A662] no-underline;
}

.link a:hover {
  @apply underline;
}

.mdp_oublie {
  @apply text-center mt-0 mb-5;
}
</style>