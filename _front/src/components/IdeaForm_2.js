//Axios est un client HTTP qui permet d’envoyer des requêtes HTTP au serveur dorsal Express.js pour stocker des données dans la BDD MongoDB
import axios from 'axios';
import { useState, useEffect } from "react";

//const baseURL = "https://jsonplaceholder.typicode.com/posts";

export default function IdeaForm({handleAdd}){
    //STATE 
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [lien, setLink] = useState("");

    //COMPORTEMENTS
    
    useEffect(() => {
        axios.get("http://localhost:5000/ideas").then((response) => {
            setName(response.data.name);
            setBrand(response.data.brand);
            setLink(response.data.lien);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault(); //empêche le rechargement de la page
        const id = new Date().getTime();
        const ideaToAdd = {
            id: id,
            name: name,
            brand: brand,
            lien: lien
        }
        handleAdd(ideaToAdd)

        //Envoyer les données dans la BDD
        axios
            .post('http://localhost:5000/ideas', {
                name: name,
                brand: brand,
                lien: lien
            })
            .then((response) => {
                setName(response.data.name);
                setBrand(response.data.brand);
                setLink(response.data.lien);
            })
            .catch((error) => {
                console.log(error);
            });
            
            //Vider les inputs
            setName("") 
            setBrand("")
            setLink("")
    }

    const handleNameChange = (event) => {
        setName(event.target.value)
    }
    const handleBrandChange = (event) => {
        setBrand(event.target.value)
    }
    const handleLinkChange = (event) => {
        setLink(event.target.value)
    }

    //AFFICHAGE (render)
    return(
        <div className="flex flex-col bg-violet-100 shadow-md rounded-xl p-6 m-6 max-w-3xl">

            <h3 className="text-xl font-bold tracking-wide mb-2 text-center">Ajouter une idée</h3>

            <form className="flex flex-col" action="submit" onSubmit={handleSubmit}>
                <div className="flex justify-center flex-wrap" >
                    <input
                        id="name"
                        className="shadow rounded-full p-1 m-3"
                        value={name}
                        type="text"
                        placeholder=" Le nom"
                        onChange={handleNameChange}
                        >
                    </input>
                    <input
                        id="brand"
                        className="shadow rounded-full p-1 m-3"
                        value={brand}
                        type="text"
                        placeholder=" La marque"
                        onChange={handleBrandChange}
                        >
                    </input>
                    <input
                        id="link"
                        className="shadow rounded-full p-1 m-3"
                        value={lien}
                        type="text"
                        placeholder=" Le lien"
                        onChange={handleLinkChange}
                        >
                    </input>
                </div>

                <div className="flex justify-center" >
                    <button className="bg-violet-600 hover:bg-violet-900 text-white w-1/6 mt-2 p-1 px-3 rounded-full">Ajouter</button>
                </div>

            </form>

        </div>
    )
}