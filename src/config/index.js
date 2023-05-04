const dotenv = require('dotenv')
dotenv.config()

module.exports =  {
    PORT,
    DB_URL,
    JWT_SECRET,
    DEBURG_MODE,
    REFRESH_SECRET
} = process.env