const mongoose = require("mongoose")
const User = require('../models/user.model');
const CustomErrorHandler = require("../services/customErrorHandler");

async function admin(req,res,next){
    try{
        // before apply this middleware we previously check for auth middleware
        // we have an object in req req.user._id and role
        let user = User.findById(req.user._id);
        if(!user){
            return next(CustomErrorHandle.notFound("User not found"))
        };

        if(user.role === "admin"){
            next()
        }else{
            next(CustomErrorHandler.unauthorize())
        }
    }catch(err){
        return next(new Error("Something went wrong"))
    }
}