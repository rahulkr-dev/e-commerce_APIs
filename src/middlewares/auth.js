const JwtServices = require("../services/JwtServices");
const { unauthorize } = require("../services/customErrorHandler");

const auth = async(req,res,next)=>{
    const headerToken = req.headers.authorization;
    // Check weather token exits or not
    if(!headerToken){
        return next(unauthorize())
    };
    // "bearer token"
    const token = headerToken.split(' ')[1];

    try{
        const {role,_id} = JwtServices.verifyToken(token);
        const user = {
            _id,role
        };
        req.user = user;
        next()
    }catch(err){
        next(unauthorize())
    }

};

module.exports = auth;