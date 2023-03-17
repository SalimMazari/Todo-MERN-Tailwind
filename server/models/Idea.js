const mongoose = require("mongoose");

const Idea  = mongoose.model("Ideas", {
    name: { type: String },
    brand: { type: String},
    lien: { type: String}
})

module.exports = Idea; 