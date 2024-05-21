<template>
  <div class="w-full">
    <div class="grid lg:grid-cols-3 lg:space-x-6">
      <div class="sm:hidden lg:block grid grid-rows-2 h-[300px] shadow">
        <img
          v-if="profileImageURL"
          :src="profileImageURL.url"
          class="rounded-t-lg w-full h-[300px] object-contain"
          alt="Image de profil"
        />
        <img
          v-if="!profileImageURL"
          src="../../assets/images/profile.png"
          class="rounded-t-lg w-full h-[300px] object-contain"
          alt="Image de profil"
        />
        <div class="bg-white rounded-b-lg">
          <div class="flex justify-center -mt-4">
            <img
              v-if="profileImageURL"
              :src="profileImageURL.url"
              class="w-28 border-4 max-h-28 mb-4 -mt-14 rounded-full object-contain"
              alt="Image de profil"
            />
            <img
              v-if="!profileImageURL"
              src="../../assets/images/profile.png"
              class="w-28 border-4 -mt-14 max-h-28 mb-4 rounded-full"
              alt="Image de profil"
            />
            <div>
              <input
                ref="imageprofile"
                class="hidden"
                type="file"
                accept=".jpeg,.png,.jfif,.jpg,.jpe"
                @change="onImageSelect"
              />
              <svg
                class="h-6 w-6 text-black mt-20"
                type="file"
                @click="callref"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
          </div>
          <p
            class="text-black body flex justify-center font-bold capitalize text-xl"
          >
            {{ username }}
          </p>
          <p
            class="text-gray-300 body flex justify-center pb-4 capitalize text-sm"
          >
            @{{ username }}
          </p>
        </div>
      </div>

      <div
        class="max-h-[96%] lg:col-span-2 bg-white items-center shadow rounded-lg"
      >
        <div class="lg:hidden">
          <img
            v-if="profileImageURL"
            :src="profileImageURL.url"
            class="rounded-t-lg w-full h-[300px]"
            alt="Image de profil"
          />
          <img
            v-if="!profileImageURL"
            src="../../assets/images/profile.png"
            class="rounded-t-lg"
            alt="Image de profil"
          />
          <div class="max-h-[60%] bg-white rounded-b-lg">
            <div class="flex justify-center -mt-14">
              <img
                v-if="profileImageURL"
                :src="profileImageURL.url"
                class="w-28 border-4 h-28 mb-4 rounded-full"
                alt="Image de profil"
              />
              <img
                v-if="!profileImageURL"
                src="../../assets/images/profile.png"
                class="w-28 border-4 h-28 mb-4 rounded-full"
                alt="Image de profil"
              />
              <form>
                <input
                  ref="imageprofile"
                  class="hidden"
                  type="file"
                  accept="image/jpeg, image/png"
                  @change="onImageSelect"
                />
                <svg
                  class="h-6 w-6 text-black mt-20"
                  type="file"
                  @click="callref"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </form>
            </div>
            <p
              class="text-black body flex justify-center font-bold mt-2 capitalize text-xl"
            >
              {{ username }}
            </p>
            <p
              class="text-gray-300 body flex justify-center capitalize text-sm"
            >
              @{{ username }}
            </p>
          </div>
        </div>

        <h1
          class="lg:text-3xl pt-2.5 text-black text-2xl font-light text-center mt-0 mb-6"
        >
          Mes informations personnelles
        </h1>
        <div class="lg:mt-4 px-10 mb-20">
          <div class="flex justify-end">
            <button
              id="recaptcha-button"
              type="button"
              class="bg-[#07693A] hover:bg-[#07693A] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              @click="showModal()" >

              Modifier
            </button>
          </div>

          <div
            class="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="false"
            v-if="showfirstModal">

            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
            </div>

            <div class="fixed inset-0 z-10 overflow-y-auto">
              <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" >
                <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" >
                  <div
                    novalidate
                    class="rounded px-8 pt-6 pb-8 mb-5"
                  >
                    <div class="propsition space-x-7">
                      <div :class="{ layour1: connect === 'Email' || connect === '' }">
                        <div class="cursor-pointer" @click="setConnectionType('Email')">
                          <strong class="text-black">Email</strong>
                        </div>
                      </div>
                      <div :class="{ layour1: connect === 'Phone' }">
                        <div class="cursor-pointer"  @click="setConnectionType('Phone')">
                          <strong class="text-black">Téléphone</strong>
                        </div>
                      </div>
                      <div :class="{ layour1: connect === 'User' }">
                        <div class="cursor-pointer"  @click="setConnectionType('User')">
                          <strong class="text-black">Utilisateur</strong>
                        </div>
                      </div>
                    </div>

                    <div class="mb-4" v-if="connect === 'Email' || connect === ''">
                      <label
                        for="inputEmail4"
                        class="block text-gray-700 text-sm font-bold mb-2"
                        >Email</label
                      >
                      <input
                        v-model="email"
                        id="inputEmail4"
                        type="email"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Email"
                      />
                    </div>
                    <div class="mb-4" v-if="connect === 'Phone'">
                      <label
                        for="inputEmail4"
                        class="block text-gray-700 text-sm font-bold mb-2"
                        >Phone</label
                      >
                      <vue-tel-input
                        id="inputPhone4"
                        mode="international"
                        :default-country="'CM'"
                        v-model="phoneNumber"
                        :value="phoneNumber"
                        :input-options="{ placeholder: 'Numero de tel' }"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div v-if="connect === 'User'">
                      <div class="mb-4" >
                      <label
                        for="inputAddress"
                        class="block text-gray-700 text-sm font-bold mb-2"
                        >Nom utilisateur</label
                      >
                      <input
                        v-model="username"
                        id="inputUsername"
                        type="text"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder=" Nom utilisateur"
                      />
                      </div>
                      <div class="flex flex-wrap -mx-3 mb-4">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label
                            for="inputName"
                            class="block text-gray-700 text-sm font-bold mb-2"
                            >Nom</label
                          >
                          <input
                            v-model="name"
                            id="inputName"
                            type="text"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                          <label
                            for="inputprenom"
                            class="block text-gray-700 text-sm font-bold mb-2"
                            >Prénom</label
                          >
                          <input
                            v-model="surname"
                            id="inputprenom"
                            type="text"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        </div>
                      </div>
                    </div>

                    <div class=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <ButtonSpinner
                          type="button"
                          :fetching="fetch"
                          @click="updateUser()"
                          class="inline-flex w-full justify-center rounded-md bg-[#07693A] px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                      >
                        Envoyer
                      </ButtonSpinner>
                      <button
                      @click="showfirstModal = false"
                        type="button"
                        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="grid md:grid-cols-2 md:space-x-4">
            <div class="space-y-2 text-lg">
              <label class="mb-0 text-gray-500">Nom utilisateur</label>
              <div>
                <input
                  class="text-black bg-gray-300 p-2.5 rounded-lg mb-0 w-full"
                  v-model="username"
                  readonly
                />
              </div>
            </div>
            <div class="space-y-2 text-lg">
              <label class="mb-0 text-gray-500">Phone</label>
              <div>
                <vue-tel-input
                  class="text-black bg-gray-300 p-2.5 rounded-lg mb-0 w-full"
                  mode="international"
                  :default-country="'CM'"
                  v-model="phoneNumber"
                  :value="phoneNumber"
                  :input-options="{ placeholder: 'Numero de tel' }"
                  :disabled="true"
                />
              </div>
            </div>
          </div>

          <div class="grid md:grid-cols-2 md:space-x-4">
            <div class="mt-8 space-y-2 text-lg">
              <label class="mb-0 text-gray-500"> Nom</label>
              <div>
                <input
                  class="text-black bg-gray-300 p-2.5 rounded-lg mb-0 w-full"
                  v-model="name"
                  readonly
                />
              </div>
            </div>
            <div class="mt-8 space-y-2 text-lg">
              <label class="mb-0 text-gray-500">Prenom</label>
              <div>
                <input
                  class="text-black bg-gray-300 p-2.5 rounded-lg mb-0 w-full"
                  v-model="surname"
                  readonly
                />
              </div>
            </div>
          </div>

          <div class="mb-4 mt-8 space-y-2 text-lg">
            <label class="mb-0 text-gray-500">Email</label>
            <div>
              <input
                class="text-black bg-gray-300 p-2.5 rounded-lg mb-0 w-full"
                type="email"
                v-model="email"
                readonly
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-span-2 bg-white p-10 shadow rounded-lg">
      <h1
        class="lg:text-3xl lg:mb-8 text-black text-xl font-light text-center mt-0 mb-6"
      >
        Modifier mon mot de passe
      </h1>
      <form class="mt-8" v-on:submit.prevent="updatePassword()">
        <div class="mb-4 mt-8 hidden space-y-2 text-lg">
          <label class="mb-0 text-gray-500">username</label>
          <div>
            <input
              class="text-black bg-gray-300 p-2.5 rounded-lg mb-0 w-full"
              type="password"
              v-model="username"
            />
          </div>
        </div>
        <div class="mb-4 mt-8 space-y-2 text-lg">
          <label class="mb-0 text-gray-500">Ancien mot de passe</label>
          <div>
            <input
              class="text-black bg-gray-300 p-2.5 rounded-lg mb-0 w-full"
              type="password"
              v-model="oldPassword"
            />
          </div>
        </div>
        <div class="mb-4 mt-8 space-y-2 text-lg">
          <label class="mb-0 text-gray-500">Nouveau mot de passe</label>
          <div>
            <input
              class="text-black bg-gray-300 p-2.5 rounded-lg mb-0 w-full"
              type="password"
              v-model="newPassword"
            />
          </div>
        </div>

        <div class="flex items-center mt-10 justify-center text-lg">
          <ButtonSpinner
            type="submit"
            class="bg-[#07693A] hover:bg-[#07693A] text-white cursor-pointer font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            :fetching="fetch"
          >
            Envoyer
          </ButtonSpinner>
        </div>
      </form>
      <p class="flex text-black justify-center" v-if="successpwd">
        Password updated successfully!
      </p>
    </div>
  </div>
</template>

<script>
import { Api } from "../../helpers";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import { RecaptchaVerifier } from "firebase/auth";
import VueModal from "@kouts/vue-modal";
import "@kouts/vue-modal/dist/vue-modal.css";
import ButtonSpinner from '../ButtonSpinner.vue';
import Erreur from '../../services/error';
import Swal from "sweetalert2";


export default {

  components:{
    VueModal,
    ButtonSpinner,
  },

  data() {
    return {
      message_error: "",
      connect: "Email",
      user: {},
      ok: "",
      profileImageURL: "",
      username: "",
      name: "",
      phoneNumber: "",
      surname: "",
      email: "",
      success: false,
      successpwd: false,
      newPassword: "",
      oldPassword: "",
      showfirstModal: false,
      fetch:false,
    };
  },

  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    // this.user = user;
    if(this.user){
        this.username = this.user.username
        this.surname = this.user.surname
        this.name = this.user.name
        this.email = this.user.email
        this.profileImageURL = this.user.image
        if (this.user.telephone == null) {
        this.phoneNumber = "";
        this.telephone = "";
        } else {
        this.phoneNumber = this.user.telephone;
        this.telephone = this.user.telephone;
        }
    }
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-button",
      {
        size: "invisible",
        callback: (response) => {
        },
      },
      auth
    );
  },

  methods: {
    showModal() {
      this.showfirstModal = true;
    },

    //Méthode qui permet de choisir le type connexion
    setConnectionType(type) {
      this.connect = type;
      this.message = '';
    },

    async updateUser() {
      try {
        const self = this;
        if (this.connect === "User") {
          this.fetch = true;
          await Api.put("/authentication/api/auth/update-user/" + this.user.id, {
            name: this.name,
            surname: this.surname,
            username: this.username,
          });
          this.$store.commit("logout");
          window.location.assign('/');
          this.fetch = false;
        }
         else if (this.connect === "Phone" && this.user.telephone !== this.phoneNumber) {
          this.fetch = true;
          const phone_split = this.phoneNumber.match(/(\+\d+) (.+)/);
          const country_code = phone_split[1];
          const tel = phone_split[2].replace(/\s+/g, "");
          const appVerifier = window.recaptchaVerifier;
          const auth = getAuth();
          const confirmationResult = await signInWithPhoneNumber(auth, country_code + tel, appVerifier);
          window.confirmationResult = confirmationResult;
          localStorage.removeItem('forgetpwd')
          self.$router.push("/formotp");
          this.fetch = false;
        } else if (this.connect === "Email" && this.user.email !== this.email) {
          this.fetch = true;
          await Api.put("/authentication/api/auth/update-email", {
            usermail: this.email,
            username: this.username,
          });
          this.showfirstModal = false;
          this.$store.commit("logout");
          this.$router.push("/");
          this.fetch = false;
        }
      } 
      catch (error) {
        if (error.response) {
          console.error('Réponse du serveur :', error.response.data.message);
          Erreur.gestionErreur(error.response.data.message);
        } else {
          console.error('Erreur de la requête :', error.message);
          Erreur.gestionErreur(error.message);
        }
      }
    },

    //Mettre à jour le mot de passe d'un utilisateur
    updatePassword() {
      this.fetch = true
      Api.put("/authentication/api/auth/change-password", {
        newPassword: this.newPassword,
        oldPassword: this.oldPassword,
        username: this.username,
      })
        .then(() => {
          // mettre à jour le nombre de vues dans l'interface utilisateur
          // this.successpwd = true;
          Swal.fire({
            text: "Mot de passe modifié avec succès", 
            confirmButtonText: "ok",
            confirmButtonColor: "#07693A",
          })
          .then(() =>{
            localStorage.removeItem('user')
            localStorage.removeItem('jwtToken')
            this.$router.push("/login")

          })
        })
        .catch(function (error) {
          Erreur.gestionErreur(error.message)
        })
        .then(()=> this.fetch = false)
       
    },

    //Mettre à jour l'image de profile de l'utilisateur
    async onImageSelect(event) {
      try {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        await Api.put("/authentication/api/auth/update-photo-user/" + this.user.id + "?username=" +
          this.username,
          formData
        );

        location.reload();
        this.$store.commit("logout");
        this.$router.push("/");
      } catch (error) {
        Erreur.gestionErreur(error.message);
      }
    },


    //Charger l'image de profile de l'utilisateur
    callref() {
      this.$refs.imageprofile.click();
    },
  },
};
</script>


<style>
.propsition {
  @apply flex justify-between items-center;
}

.propsition div {
  @apply text-center w-full h-10 mb-5;
}

.layour1 {
  @apply text-xl rounded-b-md rounded-r-md;
  border-bottom: #07693a 3px solid;
}

.propsition button {
  @apply w-full bg-transparent text-white mb-5;
  transition: all 0.3s ease;
}

.modal-footer {
  padding: 15px 0px 0px 0px;
  border-top: 1px solid #e5e5e5;
  margin-left: -14px;
  margin-right: -14px;
}
</style>
 