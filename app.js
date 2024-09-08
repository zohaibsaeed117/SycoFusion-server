require('express-async-errors');
const express = require('express');
const cors = require('cors');
const connectDb = require('./db/connect');
const auth = require('./middleware/auth');
const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');
const authRoutes = require('./routes/auth');
const posts = require("./routes/post");
const user = require("./routes/user");
require('dotenv').config();

const app = express();

// Configure CORS options
const corsOptions = {
    origin: process.env.NEXT_ORIGN_URL, 
    credentials: true,               
    optionSuccessStatus: 200         
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(authRoutes);

app.get('/', (req, res) => {
    console.log("Hello world");
    return res.status(200).json({ success: true });
});

app.use(auth);
app.use(posts);
app.use(user);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8080;

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(port, () => { 
            console.log(`Listening on port ${port}`); 
        });
    } catch (err) {
        console.log(err);
    }
};

// Export the app for Vercel
module.exports = app; 

// Optional: Start the server locally if needed
if (require.main === module) {
    start();
}
