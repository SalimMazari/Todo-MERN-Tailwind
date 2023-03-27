import { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

//Axios permet d’envoyer des requêtes HTTP au serveur dorsal Express.js pour stocker des données dans la BDD MongoDB
import axios from 'axios';

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
    const { register, handleSubmit, formState: { errors }, reset } = useForm ({
        resolver: yupResolver(schema),
    });

    const [confirm, setConfirm] = useState(false);
    const displayConfirm = () => {
        setConfirm('true');
    };

    //Recevoir les infos du formulaire
    const onSubmitHandler = (data) => {
        console.log({ data });
        reset(); //efface le formulaire

        // Requête post à l'API avec axios
        axios.post("https://idees-cadeaux.vercel.app/ideas", {
            name : data.name,
            brand : data.brand,
            lien : data.lien,
        })
        .then((response) => {
            console.log(response.data)
            if(response.data === 'Idea created !') { 
                // afficher la div de confirmation
                displayConfirm();
            }
        })
        .catch((error) => {
            console.log(error)
        });
    };

    //AFFICHAGE (render)
    return(
        <div className="flex flex-col bg-violet-100 shadow-md rounded-xl p-6 m-6 max-w-3xl">

            <h3 className="text-xl font-bold tracking-wide mb-2 text-center">Ajouter une idée</h3>

            <form
                className="flex flex-col"
                onSubmit={ handleSubmit(onSubmitHandler) }
                style={{ display: confirm ? 'none' : 'flex' }}
            >

                <div className="flex justify-center flex-wrap" >

                    <input
                        id="name"
                        className="shadow rounded-full p-1 m-3"
                        type="text"
                        placeholder=" Le nom"
                        {...register('name')}
                        >
                    </input>
                    <p>{errors.name?.message}</p>

                    <input
                        id="brand"
                        className="shadow rounded-full p-1 m-3"
                        type="text"
                        placeholder=" La marque"
                        {...register('brand')}
                        >
                    </input>
                    <p>{errors.brand?.message}</p>

                    <input
                        id="lien"
                        className="shadow rounded-full p-1 m-3"
                        type="text"
                        placeholder=" Le lien"
                        {...register('lien')}
                        >
                    </input>
                    <p>{errors.lien?.message}</p>

                </div>

                <div className="flex justify-center" >
                    <button type="submit" className="bg-violet-600 hover:bg-violet-900 text-white w-1/6 mt-2 p-1 px-3 rounded-full">Ajouter</button>
                </div>

            </form>

            {/* Message de confirmation d'ajout de l'idée à la BDD */}
            <div className="flex flex-col m-5" style={{ display: confirm ? 'flex' : 'none' }}>
                <div className="text-xl text-green-700 m-5">Votre idée a bien été ajouté à la base de données !</div>
            </div>

        </div>
    )
}

export default IdeaForm;