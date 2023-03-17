const express = require("express");

//Créer un serveur
const app = express();
//const Idea = require('./models/Idea.js')
const port = 5000

//Connexion à la base de données locale grâce au package Mongoose
const mongoose = require("mongoose");
mongoose
  .set("strictQuery", false)
  .connect(
    "mongodb://127.0.0.1:27017/gifts-ideas"
  )
  .then(() => {
    //si connecté
    console.log("Connection with MongoDB was successful");
  });

//CORS (Cross-Origin Resource Sharing) fournit un mécanisme permettant au serveur backend et à un client frontend
//de communiquer et de transmettre des données via les points de terminaison de l’API
const cors = require('cors');
app.use(cors());

//Middleware = plugin ajouté au serveur pour récupérer des paramètres de type Body
app.use(express.json());

//Appeler les routes
const routes = require("./routes/idea.js");
app.use(routes);
//Si la route n'existe pas :
app.all("*", (request, response) => {
  response.json("Page not found");
});

//Démarrer le serveur et écouter les requêtes du port 5000
app.listen(port, () => {
  try {
    console.log("Server has started at port " + port);
  } catch (error) {
    console.log("Server has not started : ", error);
  }
});