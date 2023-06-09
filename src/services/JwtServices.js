
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config')
// console.log(JWT_SECRET)
class JwtServices{
    static jwtSign(payload,expiry="1w",secret=JWT_SECRET){
        return jwt.sign(payload,secret,{
            expiresIn:expiry
        })
    };

    static verifyToken(token,secret=JWT_SECRET){
        return jwt.verify(token,secret)
    }
};

module.exports = JwtServices