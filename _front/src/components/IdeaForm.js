import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Confettis from "./Confettis";
//Axios permet d’envoyer des requêtes HTTP au serveur dorsal Express.js pour stocker des données dans la BDD MongoDB
import axios from "axios";

//On définit un "schéma" pour utiliser la librairie yup afin de récupérer les données du formulaire
const schema = yup.object().shape({
  name: yup.string(),
  brand: yup.string(),
  lien: yup.string(),
});

const IdeaForm = () => {
  // UseForm utilise le résolveur Yup pour le traitement du formulaire:
  //    - register => enregistre un élément et applique les règles de validation
  //    - handleSubmit => fonction qui reçoit les infos du formulaire
  //    - formState: {errors} => renvoie les erreurs de remplissage
  //    - reset => clear le formulaire
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [confirm, setConfirm] = useState(false);
  const displayConfirm = () => {
    setConfirm("true");
  };

  const [confettis, setConfettis] = useState(false);
  const displayConfettis = () => {
    setConfettis("true");
  };

  // Recevoir les infos du formulaire
  const onSubmitHandler = (data) => {
    console.log({ data });
    console.log(data.name);
    reset(); //efface le formulaire

    // Requête post à l'API avec axios
    //const url = "https://idees-cadeaux.vercel.app/ideas";
    const url = "http://localhost:5000/ideas";
    const params = {
      name: data.name,
      brand: data.brand,
      lien: data.lien,
      // status : false,
    };
    const headers = {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    };
    axios
      .post(url, params, headers)
      .then((response) => {
        console.log(response.data);
        if (response.data === "Idea created !") {
          // afficher la div de confirmation
          displayConfirm();
          displayConfettis();
        }
      })
      .catch((error) => {
        console.log("Error message : ", error.message);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("Error data : ", error.response.data);
          console.log("Error status : ", error.response.status);
          console.log("Error headers : ", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log("Error request : ", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error message : ", error.message);
        }
        console.log("Error config : ", error.config);
      });
  };

  //AFFICHAGE (render)
  return (
    <div className="flex flex-col bg-violet-100 shadow-md rounded-xl p-6 m-6 max-w-3xl">
      <h3 className="text-xl font-bold tracking-wide mb-2 text-center">
        Ajouter une idée
      </h3>

      <form
        className="flex flex-col"
        onSubmit={handleSubmit(onSubmitHandler)}
        style={{ display: confirm && confettis ? "none" : "flex" }}
      >
        <div className="flex justify-center flex-wrap">
          <input
            type="text"
            className="shadow rounded-full p-1 m-3"
            placeholder=" Le nom"
            name="name"
            {...register("name")}
          ></input>
          <p>{errors.name?.message}</p>

          <input
            type="text"
            className="shadow rounded-full p-1 m-3"
            placeholder=" La marque"
            name="brand"
            {...register("brand")}
          ></input>
          <p>{errors.brand?.message}</p>

          <input
            type="text"
            className="shadow rounded-full p-1 m-3"
            placeholder=" Le lien"
            name="lien"
            {...register("lien")}
          ></input>
          <p>{errors.lien?.message}</p>
        </div>

        <div className="button-wrapper flex justify-center">
          <button
            type="submit"
            id="button"
            className="bg-violet-600 hover:bg-violet-900 text-white w-1/6 mt-2 p-1 px-3 rounded-full"
          >
            Ajouter
          </button>
          {/* <canvas id="confetti-canvas"></canvas> */}
        </div>
      </form>

      {/* Message de confirmation d'ajout de l'idée à la BDD */}
      <div
        className="flex flex-col mt-5"
        style={{ display: confirm ? "flex" : "none" }}
      >
        <div className="text-sm text-violet-900 text-center">
          Ton idée a bien été ajoutée à la base de données !
        </div>
      </div>

      {/* Confettis */}
      <div
        className="flex flex-col mt-5"
        style={{ display: confettis ? "flex" : "none" }}
      >
        <Confettis />
      </div>
    </div>
  );
};

export default IdeaForm;
