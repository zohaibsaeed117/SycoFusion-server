require('express-async-errors');
const express = require('express');
const cors = require('cors');
const connectDb = require('./db/connect');
const app = express();
const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}


app.use(cors(corsOptions)) // Use this after the variable declaration

//midddleware
app.use(express.static('./public'));

app.use(express.urlencoded({ extended: false }))

app.use(express.json());

//Routes without token
app.use(authRoutes);

//Routes with authentication token

app.use(notFound);

app.use(errorHandler);




const port = process.env.PORT || 8080;
const start = async () => {
    try {
        connectDb(process.env.MONGO_URI)
        app.listen(port, () => { console.log(`Listening on port ${port}`); })
    } catch (err) {
        console.log(err)
    }
}


start();