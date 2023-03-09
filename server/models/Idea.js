const mongoose = require("mongoose");

const ReactFormDataSchema  = mongoose.Schema({
    name: { type: String },
    brand: { type: String},
    lien: { type: String}
})

const Idea = mongoose.model('Idea', ReactFormDataSchema )
module.exports = Idea; 