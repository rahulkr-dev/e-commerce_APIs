const express = require('express')
const mongoose = require('mongoose')
const { PORT,DB_URL } = require('./config')
const app = express();

// Database connection
mongoose.connect(DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB connected...');
});

// routes

// middlewares
app.use(express.urlencoded());
app.use(express.json());



app.listen(PORT || 8080 ,()=>{
    console.log('Listening on Port',PORT)
})