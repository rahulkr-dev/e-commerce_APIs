const Joi = require('joi');
const CustomErrorHandler = require('../../services/customErrorHandler');
const JwtServices = require('../../services/JwtServices');
const { RefreshToken, User } = require('../../models');
const {REFRESH_SECRET} = require('../../config')

const refreshTokenController = {
    async refreshToken(req, res, next) {
        // Validation
        // Create schema - JOI
        const tokenSchema = Joi.object({
            refresh_token: Joi.string().required()
        });

        const { error } = tokenSchema.validate(req.body);

        if (error) {
            return next(error)
        };

        // Verify Token
        try {
            // Database query check token is present or not
            let refreshToken = await RefreshToken.findOne({ token: req.body.refresh_token });
            if (!refreshToken) {
                return next(CustomErrorHandler.unauthorize("Token not found in database"))
            }
            // Verify token with JWT

            let user = JwtServices.verifyToken(req.body.refresh_token,REFRESH_SECRET)
            if(!user){
                return next(CustomErrorHandler.unauthorize("Invalid Token"))
            };

            const {_id,role} = user;
            // check weather user present in database or not
            const userDetails = await User.findOne({_id});
            if(!userDetails){
                return next(CustomErrorHandler.notFound("User not found"))
            };

            // Generate Token
            
            const access_token = JwtServices.jwtSign({_id,role})
            const refresh_token = JwtServices.jwtSign({_id,role},"1y",REFRESH_SECRET);

            // database whitelist
            await RefreshToken.create({token:refresh_token})

            res.json({access_token,refresh_token})
        } catch (err) {
            return next(err)
        }

    }
};

module.exports = refreshTokenController