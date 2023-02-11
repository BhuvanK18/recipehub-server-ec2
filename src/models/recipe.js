const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");
const recipeSchema = new mongoose.Schema({
    // data-type BSON
    email: {
        type: String,
        required: true

    },
    rname: {
        type: String,
        require: true
    },
    para: {
        type: String,
        required: true
    }

})
const Recipe = new mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;