const Joi = require("joi")


    // CHECKLIST
    // [ ] validate the request
    // [ ] authorise the request
    // [ ] check if user is in the database already
    // [ ] prepare model
    // [ ] store in database
    // [ ] generate jwt token
    // [ ] send response
const registerController = {
// for signup user
    async register(req,res,next){
  
    // Validation
    // Create Schema
        const registerSchema = Joi.object({
            name:Joi.string().alphanum().min(3).max(20).required(),
            email:Joi.string.email().required(),
            password:Joi.string().pattern(new RegExp(('^[a-zA-Z0-9]{3,30}$'))).required(),
            confirm_password:Joi.ref("password")
        });

        const {error} = registerSchema.validate(req.body);
        if(error){
            // Error handling
            next(error)
        }

    }
};

module.exports = registerController