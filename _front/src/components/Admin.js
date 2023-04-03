import { useState, useEffect } from "react";
import HeaderAdmin from "./Header_Admin"
import Idea from "./Idea"
//Axios permet d’envoyer des requêtes HTTP au serveur dorsal Express.js pour stocker des données dans la BDD MongoDB
import axios from 'axios';

const Admin = () => {
    const [ideas, setIdeas] = useState([]);

    //Chargement des données avant affichage
    const [loading, setLoading] = useState(true);

    //Récupérer les données dans la BDD
    const fetchIdeas = async () => {
        const idea = await axios.get("https://idees-cadeaux.vercel.app/ideas");
        setIdeas(idea.data);
        setLoading(false);
        // console.log(idea.data);
    }
    useEffect(() => {
        fetchIdeas();
    }, []);

    return(
        <div className="">

            <HeaderAdmin />

            <div className="flex flex-col items-center px-4 text-gray-700">
                <h1 className="text-center text-5xl font-bold uppercase mb-10">I'm not a kid</h1>
            </div>

            {loading ? (<div className="text-center mt-10 italic">Les idées fusent...</div>) : (


            <div className="flex flex-col items-center">
                <div className="w-1/2">
                    {ideas.map((idea) =>
                        <Idea
                            key={idea.id}
                            ideaName={idea.name}
                            ideaBrand={idea.brand}
                            ideaLink={idea.lien}
                            //onClick={() => console.log(idea.id)}
                            />
                    )}
                </div>
            </div>

            )}

        </div>
    )
}

export default Admin;