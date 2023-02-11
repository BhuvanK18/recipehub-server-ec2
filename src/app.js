// including the requirements
const express = require("express");
const res = require("express/lib/response");
const path = require("path");
const app = express();
const hbs = require("hbs");
// Use of bcryt with highly secure authentication process
const bcrypt = require("bcryptjs");

const Register = require("./models/registers");
const Recipe = require("./models/recipe");

const async = require("hbs/lib/async");

const port = process.env.PORT || 3000;

// Adding directory path to attach the hbs and css files together

const static_path = path.join(__dirname, "../public");

// connecting with the database server with conn.js
require("./db/conn");



// adding the static path
app.use(express.static(static_path));

// Requisites for using hbs
app.set("view engine", "hbs");


// to properly render the webpages on the host without inducing empty({}) bracket error.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// GET CALLS
app.get("/", (req, res) => {
    res.render("index");
});
app.get("/home", (req, res) => {
    res.render("home");
});


app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/login", (req, res) => {
    res.render("login");
})
app.get("/recipe", (req, res) => {
    res.render("recipe");
})

// Registering new user using POST Request to the MongoDB Database
// Use of bcryt for highly secure authentication process
app.post("/register", async (req, res) => {
    const passwordHash = await bcrypt.hash(req.body.pswd, 4);
    try {
        const registerUser = new Register({
            txt: req.body.txt,
            email: req.body.email,
            pswd: passwordHash,

        })
        const registered = await registerUser.save();
        res.status(201).render("home");



    } catch (error) {
        res.status(400).send(error);
    }

})
// Login Check
// Use of bcryt for highly secure authentication process

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.pswd;



        const userEmail = await Register.findOne({ email: email });

        const isMatch = await bcrypt.compare(password, userEmail.pswd);

        if (isMatch) {
            res.status(201).render("home");
        }
        else {
            res.send("invalid login details");
        }

    } catch (error) {
        res.status(400).send("invalid login details");

    }
})

// Adding your own recipe to the MongoDB Database using POST Request 

app.post("/recipe", async (req, res) => {

    try {


        const recipeUser = new Recipe({
            rname: req.body.rname,
            para: req.body.para,
            email: req.body.email,

        })
        const recipe = await recipeUser.save();
        res.status(201).render("home");



    } catch (error) {
        res.status(400).send(error);
    }

})

// Listening to the request on the given port number
app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})