const express = require('express')
const mongoose = require('mongoose')
const { PORT,DB_URL } = require('./config');
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const router = require('./routes')

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
// app.use(express.urlencoded());
app.use(express.json());

app.use("/api",router)

// Error handler
app.use(errorHandler)
app.listen(PORT || 8080 ,()=>{
    console.log('Listening on Port',PORT)
})