// Requisites for intializing and assigning our data to the mongodb database and retrieving it.
const mongoose = require("mongoose");
// Creating the schema

const userSchema = new mongoose.Schema({
    // data-type BSON
    txt: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    pswd: {
        type: String,
        required: true

    }

})
// Creating Collections
const Register = new mongoose.model("Register", userSchema);
module.exports = Register;