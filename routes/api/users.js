const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

//Load input validation
const validateRegisterInput = require("../../validaton/register");
const validateLoginInput = require("../../validaton/login");

//Load User Model
const User = require("../../models/User");


//@route POST api/users/register
//@desc Register User
// @access Public 

router.post("/register", (req, res) => {
    //Form Validation
    const { errors, isValid } = validateRegisterInput(req.body);
    //Check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    //if valid find the user from mongo db findOne function
    User.findOne({email: req.body.email}).then(user => {
        if(user){
            return res.status(400).json({email: "Email already exists"});
        }else{
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            //hash password using bcrypt before saving
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err,hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                })
            })
        }
    })
})

//sign our jwt, including our payload, keys.secretOrKey from keys.js and setting a expires in time 
//if successful, append a token to  a bearer string as we have sertup ExtractJwt.fromAuthHeaderAsBearerToken
// in passport.js

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    //Form validation 
    const {errors, isValid} = validateLoginInput(req.body);

    //check validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    //Find user by email
    User.findOne({email}).then(user => {
        //Check if user exists
        if(!user){
            return res.status(404).json({emailnotfound:"Email not found"});
        }
    
        //check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch){
                //User matched
                //Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };

                //sign tokem
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 //1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer" + token
                        });
                    }
                )
            }else{
                return res
                    .status(400)
                    .json({passwordIncorrect: "Password Incorrect"});
            }
        });
    });
});

module.exports = router;