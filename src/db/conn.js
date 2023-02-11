// Simply connecting the mongodb server to our project using Mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/recipeHub", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`connection successful`);

}).catch((e) => {
    console.log(e);
})

