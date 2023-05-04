const bycrypt = require('bcrypt')
const Joi = require('joi')
const {User, RefreshToken} = require('../../models');
const CustomErrorHandler = require('../../services/customErrorHandler');
const JwtServices = require('../../services/JwtServices');
const {REFRESH_SECRET} = require('../../config')
const loginController = {
    async login(req,res,next){
        // Logic
        // Create Schema and Validate email and password
        const loginSchema = Joi.object({
            email:Joi.string().email().required(),
            password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
        });
        const {error} = loginSchema.validate(req.body);
        if(error){
            return next(error)
        }

        try{
            // Check email exits or not
            let user = await User.findOne({email:req.body.email});
            if(!user){
                return next(CustomErrorHandler.wrongCredentials())
            };
            let matchPassword = await bycrypt.compare(req.body.password,user.password)

            if(!matchPassword){
                return next(CustomErrorHandler.wrongCredentials())
            };

            // Generate Token
            let access_token = JwtServices.jwtSign({_id:user._id,role:user.role})
            let refresh_token = JwtServices.jwtSign({_id:user._id,role:user.role},"1y",REFRESH_SECRET);

            // database whitelist of token
            await RefreshToken.create({token:refresh_token})

            res.send({access_token,refresh_token})
        }catch(err){
            return next(err)
        }

    }
};

module.exports = loginController