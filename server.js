//pull in our dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");

//initialise app using express
const app = express();

//apply middleware function for bodyparser
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

//BD cnfig
const db = require("./config/keys").mongoURI;

//connect to mongoDB
mongoose
    .connect(
        db,
        { useNewUrlParser: true,
        useUnifiedTopology: true}
    ).then(() => console.log("Mongo DB successfully connected"))
    .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

//Routes
app.use("/api/users", users);




//usually port are defined on process.env.someName 
//we can achieve this by creating a process.env file and accessing it through "dotenv" package as well    
const port = 5000;

module.exports  = app.listen(port, () => console.log(`Server up and running on port ${port} !`));

