//Rappeler express
const express = require("express");

//Creer des route avec express
const router = express.Router();

//Récupérer le modèle IDEA
const Idea = require("../models/Idea.js");

//Route de type POST pour ENVOYER les données de la nouvelle idée dans la BDD
router.post("/ideas", async(request, response) => {
    try {
        //option destructuring: const { name, brand, lien } = req.body;
        const newIdea = new Idea({
            name: request.body.name,
            brand: request.body.brand,
            lien: request.body.lien,
            status: request.body.status,
        });
        //On sauvegarde la nouvelle idée dans la BDD
        await newIdea.save();
        response.status(201);
        response.json({
            //ce que le serveur renvoie
            _id: newIdea._id,
            name: newIdea.name,
            brand: newIdea.brand,
            lien: newIdea.lien,
            status: newIdea.status,
          });
        response.send("Idea created !");
        response.end();
    } catch (error) {
        //si ça ne fonctionne pas, afficher l'erreur:
        response.status(400);
        response.json("Could not add idea : ", error.response);
        response.end();
    }
});

//Route de type DELETE pour SUPPRIMER une idée de la BDD
router.delete("/ideas/:id", async(request, response) => {
    try {
        //si l'id de l'idée a bien été transmis:
        if (request.body.id) {
          //on cherche l'idée à partir de son id dans la BDD et on la supprime:
          await Idea.findByIdAndDelete(request.body.id);
          response.status(201);
          response.json("Idea deleted !");
          response.end();
        //sinon, si aucun id n'a été transmis:
        } else {
          response.status(400);
          response.json("Missing id");
          response.end();
        }
      } catch (error) {
        response.status(400);
        response.json("Could not delete idea : ", error.response);
        response.end();
      }
});

//Route de type PATCH pour MODIFIER une idée de la BDD
router.patch("/ideas/:id", async(request, response) => {
    try {
        //on récupère les modifications dans le body
        const updateRequest = {
          name: request.body.name,
          brand: request.body.brand,
          lien: request.body.lien,
          status: request.body.status,
        }
        //on cherche l'idée à partir de son id dans la BDD:
        const ideaToUpdate = await Idea.findOne({ _id : request.params.id });
        //on remplace les données initiales par les nouvelles si elles sont dans l'objet updateRequest
        //sinon, on garde les données ititiales (ideaToUpdate)
        ideaToUpdate.name = updateRequest.name ?? ideaToUpdate.name;
        ideaToUpdate.brand = updateRequest.brand ?? ideaToUpdate.brand;
        ideaToUpdate.lien = updateRequest.lien ?? ideaToUpdate.lien;
        ideaToUpdate.status = updateRequest.status ?? ideaToUpdate.status;
        //on remplace l'objet intiial dans la BDD par le nouvel objet modifié productToUpdate:
        await Idea.updateOne({_id  : request.params.id }, {$set: ideaToUpdate});
        response.status(201);
        response.json("Idea updated !");
        response.json(ideaToUpdate);
        response.end();
      } catch (error) {
        response.status(400);
        response.json("Could not patch idea : ", error.response);
        response.end();
      }
});

//Route de type GET pour AFFICHER TOUTES les idées
router.get("/ideas", async(request, response) => {
    try {
        let idea = await Idea.find().lean();
        response.status(200);
        response.json(idea);
        response.end();
      } catch (error) {
        response.status(400);
        response.json("Failed to load the ideas : ", error.response);
        response.end();
      }
});

//Route de type GET pour AFFICHER UNE idée
router.get("/ideas/:id", async(request, response) => {
    try {
        let idea = await Idea.findOne({ _id: request.params.id }).lean();
        response.status(200);
        response.json(idea);
        response.end();
      } catch (error) {
        response.status(400);
        response.json("Failed to load the idea : ", error.response);
        response.end();
      }
});

module.exports = router;