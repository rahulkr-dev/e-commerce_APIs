class CustomErrorHandler extends Error{
    constructor(statusCode,msg){
        super();
        this.status = statusCode;
        this.message = msg
    };
    static alreadyExists (msg){
        return new CustomErrorHandler(409,msg)
    };
    static wrongCredentials(){
        return new CustomErrorHandler(401,"Invalid email or password")
    }
};

module.exports = CustomErrorHandler