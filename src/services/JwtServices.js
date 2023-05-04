
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config')
// console.log(JWT_SECRET)
class JwtServices{
    static jwtSign(payload,expiry="1w",secret=JWT_SECRET){
        return jwt.sign(payload,secret,{
            expiresIn:expiry
        })
    };

    static verifyToken(token){
        return jwt.verify(token,JWT_SECRET)
    }
};

module.exports = JwtServices