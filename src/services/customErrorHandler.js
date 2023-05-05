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
    };

    static unauthorize(msg="Unauthorize"){
        return new CustomErrorHandler(401,msg)
    };

    static notFound(msg="404 Not found"){
        return new CustomErrorHandler(404,msg)
    };

    static serverError(msg="Internal server error"){
        return new CustomErrorHandler(500,msg)
    }
    
};

module.exports = CustomErrorHandler