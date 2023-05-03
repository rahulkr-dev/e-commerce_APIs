const Joi = require("joi")
const { User } = require('../../models')
const CustomErrorHandler = require('../../services/customErrorHandler')
const bycrypt = require('bcrypt');
const JwtServices = require("../../services/JwtServices");


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
    async register(req, res, next) {

        // Validation
        // Create Schema
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(20).required(),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: Joi.string().pattern(new RegExp(('^[a-zA-Z0-9]{3,30}$'))).required(),
            confirm_password: Joi.ref("password")
        });

        const { error } = registerSchema.validate(req.body);
        if (error) {
            // Error handling
            return next(error)
        };

        // Check User Exists or not
        try {
            const user = await User.findOne({ email: req.body.email })
            if (user) {
                return next(CustomErrorHandler.alreadyExists("This Email is already taken"))
            }
        } catch (err) {
            return next(err)
        };

        const { email, name, password } = req.body

        // Hash passord
        const hash = await bycrypt.hash(password, 10);

        // Create model which store in database

        const model = {
            name, email, password: hash
        };
        let access_token;

        try {
            const userDetails = new User(model);
            userDetails.save();

            // Generate token
            access_token = JwtServices.jwtSign({ _id: userDetails._id, role: userDetails.role });
            // console.log(access_token)

        } catch (err) {
            return next(err)
        }

        res.status(201).json({access_token})
    }
};

module.exports = registerController