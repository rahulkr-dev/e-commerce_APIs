const {ValidationError} = require('joi');
const {DEBURG_MODE} = require('../config');
const CustomErrorHandler = require('../services/customErrorHandler');

const errorHandler = async (err,req,res,next)=>{
    let statusCode = 500;
    let data = {
        message:"Internal Server Error",
        ...(DEBURG_MODE=="true" && {originalError:err.message})
    };
    if(err instanceof ValidationError){
        statusCode = 422;
        data = {
            message:err.message
        }
    };

    if (err instanceof CustomErrorHandler) {
        statusCode = err.status;
        data = {
            message: err.message
        }
    }


    res.status(statusCode).json(data);
};

module.exports = errorHandler