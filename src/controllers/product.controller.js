const multer = require('multer');
const path = require('path');
const CustomErrorHandler = require('../services/customErrorHandler');

// multer storage function
const storage = multer.diskStorage({
    destination: (req,file,cb) => cb(null,'uploads/'),
    filename: (req,file,cb) =>{
        const uniqueName = `${Date.now()}_${Math.round(Math.random()*1e9)}${path.extname(file.originalname)}`;
        cb(null,uniqueName)
    }
});

const handleMultipartData = multer({
    storage,
    limits:{fileSize:1000000 *5}
}).single('image')

const productController = {

    async store (req,res,next){
        // Handle multpart data
        handleMultipartData(req,res,async(err)=>{
            if(err) {
                return next(CustomErrorHandler.serverError())
            };

            const filePath = req.file.path;
        })
    }
};

module.exports = productController;