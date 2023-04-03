import { useState, useEffect } from "react";
import Header from "./Header"
import Idea from "./Idea"
import IdeaForm from "./IdeaForm";
//Axios permet d’envoyer des requêtes HTTP au serveur dorsal Express.js pour stocker des données dans la BDD MongoDB
import axios from 'axios';

const Home = () => {
    //STATE (état, données)
        //On définit un state avec le hook useState
        //On l'initialise
        //On le récupère dans une variable 
        //Qu'on pourra modifier avec setVariable
    
    const [ideas, setIdeas] = useState([
        //{id: [], name: '', brand: '', lien: ''}
    ]);

    //Chargement des données avant affichage
    const [loading, setLoading] = useState(true);

    //COMPORTEMENTS (événements)

    //Supprimer une idée [OLD]
    const handleDelete = (id) => {
        //1. Copier le state
        const ideasCopy = [...ideas]; //tableau éclaté (...) et rangé dans un nouveau tableau
        //2. Manipuler le state, agir dessus
        const ideasCopyUpdated = ideasCopy.filter(idea => idea.id !== id);
        console.log(id)
            //pour chaque IDEE, je ne conserve dans ideasCopyUpdated
            //que celles dont l'id est différent de l'handleDeleteid donné en paramètre
        //3. Actualiser le state avec le setter
        setIdeas(ideasCopyUpdated);
            //prend en paramètre la nouvelle valeur du state
    }

    //Supprimer une idée de la BDD
    const deleteIdea = (id) => {
        axios.delete(`https://idees-cadeaux.vercel.app/ideas/${id}`)
        setIdeas(ideas.filter(idea => idea.id !== id));
    };

    /*Ajouter une idée dans la BDD [OLD]
    const handleAdd = (ideaToAdd) => {
        //1. Copier le state
        const ideasCopy = [...ideas]; //tableau éclaté (...) et rangé dans un nouveau tableau
        //2. Manipuler le state, agir dessus
        ideasCopy.push(ideaToAdd);
        //3. Actualiser le state avec le setter
        setIdeas(ideasCopy);
    }*/

    //Récupérer les données dans la BDD
    const fetchIdeas = async () => {
        const idea = await axios.get("https://idees-cadeaux.vercel.app/ideas")
        setIdeas(idea.data);
        setLoading(false);
        // console.log(idea.data);
    }
    useEffect(() => {
        fetchIdeas();
    }, []);

    //AFFICHAGE (render)
    return (
        <div className="">

        <Header />

        <div className="flex flex-col items-center px-4 text-gray-700">

            <h1 className="text-center text-5xl font-bold uppercase mb-10">Idées cadeaux</h1>

            <IdeaForm />
            {/* <IdeaForm handleAdd={handleAdd} /> */}

            {loading ? (<div className="text-center mt-4 italic">Les idées fusent...</div>) : (

            <div className="">
                {ideas.map((idea) =>
                    <Idea
                        key={idea.id}
                        ideaName={idea.name}
                        ideaBrand={idea.brand}
                        ideaLink={idea.lien}
                        //onClick={() => handleDelete(idea.id)}
                        onClick={() => deleteIdea(idea.id)}
                        //onClick={() => console.log(idea.id)}
                        />
                )}
            </div>

            )}
        
        </div>

        </div>
    );
}

export default Home;


//PROPS
//1. Donner des props du composant parent au composant enfant
//2. Récupérer les props dans le composant enfant (props en paramètre de la fonction du composant enfant)
//3. Consommer les props