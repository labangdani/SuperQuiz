import Swal from "sweetalert2"

const Erreur = {
  gestionErreur(message){
    if(message == "Request failed with status code 500"){
      Swal.fire({
        text:"Veuillez rafraichir la page !",
        confirmButtonText: "Ok",
        confirmButtonColor: "#07693A",
      })
      .then((result) => {
        location.reload()
      });
    }
    // if(message == "Request failed with status code 401"){
    //   Swal.fire({
    //     text:"Votre session a expiré",
    //     confirmButtonText: "Ok",
    //     confirmButtonColor: "#07693A", 
    //   })
    //   .then((result) => {
    //     localStorage.removeItem('user')
    //     localStorage.removeItem('jwtToken')
    //     this.$router.push ('/')
    //     location.reload()
    //   });
    // }

    // if(message == "Request failed with status code 400"){
    //   Swal.fire({
    //     text:"Mauvaise requête",
    //     confirmButtonText: "Ok",
    //     confirmButtonColor: "#07693A",
    //   })
    //   .then((result) => {
    //     location.reload()
    //   });
    // }

    if(message == "Request failed with status code 404"){
      this.$router.push('/pagenotfound')
    }

    if(message == "Network Error"){
      Swal.fire({
        text:"Vous êtes hors connexion",
        confirmButtonText: "Ok",
        confirmButtonColor: "#07693A",
      })
      .then((result) => {
        location.reload()
      });
    }

    if(message == "ERR_CONNECTION_REFUSED"){
      Swal.fire({
        text:"Vous êtes hors connexion",
        confirmButtonText: "Ok",
        confirmButtonColor: "#07693A",
      })
      .then((result) => {
        location.reload()
      });
    }
  }
};

export default Erreur; 