const dotenv = require('dotenv')
dotenv.config()

module.exports =  {
    PORT,
    DB_URL,
    SECRET
} = process.env