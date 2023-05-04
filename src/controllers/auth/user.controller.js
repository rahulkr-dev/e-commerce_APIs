const { User } = require("../../models");
const CustomErrorHandler = require("../../services/customErrorHandler");

const userController = {

    async me(req,res,next){
        // Logic
        const {_id,role} = req.user;
        // console.log(_id,role)
        try{
            // Get user by database -> projection
            const user = await User.findById(_id,{name:1,email:1,role:1})
            if(!user){
                next(CustomErrorHandler.notFound())
            }
            res.json(user)
            // console.log(user)
        }catch(err){
            next(err)
        }
    }
};

module.exports = userController;