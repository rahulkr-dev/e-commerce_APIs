
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config')
class JwtServices{
    static jwtSign(payload,expiry="1w",secret=JWT_SECRET){
        return jwt.sign(payload,secret,{
            expiresIn:expiry
        })
    }
};

module.exports = JwtServices