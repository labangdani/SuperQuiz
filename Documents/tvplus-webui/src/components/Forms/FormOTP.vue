<template>
  <div class="bl">
    <div class="wrapper1">
      <section class="my-10">
        <header><div class="imgclass"></div></header>
        <form v-on:submit.prevent="getcode()" class="text-black mx-7">
          <div class="text1">Entrez le code reçu par message</div>

          <div class="flex flex-col mb-2.5 mt-5 outline-none">
            <input
              v-model="code"
              class="p-1.5 rounded-lg pl-5"
              minlength="6"
              maxlength="6"
            />
          </div>

          <div class="flex flex-col mt-5 text-white outline-none">
            <ButtonSpinner type="submit" :fetching="fetch">
              Confirmer
            </ButtonSpinner>
          </div>

          <!-- <div class="hidden flex justify-end space-x-4 text-sm text-white mt-5">
              <button>Annuler</button>
              <button>Renvoyer</button>
            </div> -->
        </form>
      </section>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import ButtonSpinner from "../ButtonSpinner.vue";

export default {
  name: "FormOTP",

  components: {
    ButtonSpinner,
  },

  data() {
    return {
      code: "",
      newpassword: false,
      fetch: false,
      user: {
        username: "",
      },
      codepays: "",
      telephone: "",
    };
  },

  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.newpassword = localStorage.getItem("forgetpwd");
  },

  methods: {
    //Méthode qui permet d'activer le numéro de téléphone de l'utilisateur
    async getcodenewphone() {
      try {
        this.fetch = true;
        const confirmationResult = window.confirmationResult;
        const isUserExists = this.user;

        const result = await confirmationResult.confirm(this.code);
        const userverif = result.user;
        const self = this;

        let dispatchAction;

        if (isUserExists) {
          dispatchAction = this.$store.dispatch("confirmUpdatePhone", {
            registrationToken: userverif.accessToken,
            username: this.user.username,
          });

          Swal.fire({
            text: "Mise à jour réussie",
            confirmButtonText: "Ok",
            confirmButtonColor: "#07693A",
          }).then((result) => {
            self.$router.push("/login");
          });
        } else {
          dispatchAction = this.$store.dispatch("confirmRegister", {
            registrationToken: userverif.accessToken,
          });
          Swal.fire({
            text: "Votre compte a été activé avec succès",
            confirmButtonText: "Ok",
            confirmButtonColor: "#07693A",
          }).then((result) => {
            self.$router.push("/login");
          });
        }
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
        }).then((result) => {
          location.reload();
        });
      } finally {
        this.fetch = false;
      }
    },

    async getcodenewpassword() {
      try {
        this.fetch = true;
        const confirmationResult = window.confirmationResult;
        const result = await confirmationResult.confirm(this.code);
        const userverif = result.user;
        const self = this;

        let dispatchAction;

        dispatchAction = this.$store.dispatch("confirmPasswordPhone", {
          registrationToken: userverif.accessToken,
        });

        const response = await dispatchAction;
        // Swal.fire('Success', isUserExists ? 'Mise à jour réussie' : 'Vous avez réussi', 'success');
        self.$router.push("/newpassword?id=" + response.data.message);
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
          showCancelButton: true,
          cancelButtonColor: "#f46a6a",
          confirmButtonColor: "#07693A",
          confirmButtonText: "S'inscrire",
          cancelButtonText: "Annuler",
          customClass: {
            confirmButton: "order-2", // Ajoutez une classe CSS pour le bouton de confirmation
            cancelButton: "order-1", // Ajoutez une classe CSS pour le bouton d'annulation
          },
        }).then((result) => {
          if (result.value) {
            this.$router.push("/signin");
          } else {
            this.$router.push("/login");
          }
        });
      } finally {
        this.fetch = false;
      }
    },

    getcode() {
      console.log(this.newpassword);
      if (this.newpassword) {
        this.getcodenewpassword();
      } else {
        this.getcodenewphone();
      }
    },
  },
};
</script>

<style>
.order-2 {
  @apply flex justify-end;
}

.bl {
  @apply flex items-center justify-center w-full h-screen;
  /* background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/src/assets/images/bg.jpeg')right top no-repeat; */
  background-size: cover;
}

.wrapper2 {
  @apply flex bg-[#121212] rounded-2xl my-10 mt-16 mb-20;
  box-shadow: 0 0 128px 0 rgba(0, 0, 0, 0.1), 0 32 64 -48 rgba(0, 0, 0, 0.5);
}

.imgclass {
  @apply flex justify-center;
}

.field {
  @apply flex flex-col mb-2.5;
}

.input {
  @apply outline-none;
}
</style>