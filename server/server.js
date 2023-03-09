const express = require("express");

//Créer un serveur
const app = express();
const Idea = require('./models/Idea.js')
const port = 5000

//Connexion à la base de données locale grâce au package Mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/gifts-ideas");
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("Connection with MongoDB was successful");
});

//CORS (Cross-Origin Resource Sharing) fournit un mécanisme permettant au serveur backend et à un client frontend
//de communiquer et de transmettre des données via les points de terminaison de l’API
const cors = require('cors');
app.use(cors());

//Middleware = plugin ajouté au serveur pour récupérer des paramètres de type Body
app.use(express.json());

// Route de type POST (pour envoyer les données de la nouvelle idée publiée)
app.post("/create", async(request, response) => {
    try {
        const newIdea = new Idea({
            name: request.body.name,
            brand: request.body.brand,
            lien: request.body.lien,
        });
        //On sauvegarde la nouvelle idée dans la BDD
        await newIdea.save();
        response.send({ message: "Idea created !" });
        response.send({ id: newIdea._id });

    } catch(error) {
        response.status(400).json({ error: error.message });
    }
});

// Démarrer le serveur et écouter les requêtes du port 5000
app.listen(port, () => {
  console.log("Server has started at port " + port);
});