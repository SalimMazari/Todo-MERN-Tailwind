const mongoose = require("mongoose");

const Idea  = mongoose.model("Ideas", {
    name: { String },
    brand: { String },
    lien: { String },
    status: { Boolean },
})

module.exports = Idea; 