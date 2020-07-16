const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
    let errors = {};

    //convert empty fields to an empty string so we can use validatator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    //Email Checks
    if(validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }else if (!validator.isEmail(data.email)){
        errors.email = "Email is Invalid";
    }

    //password checks
    if(validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };

}