require('express-async-errors');
const express = require('express');
const cors = require('cors');
const connectDb = require('./db/connect');
const app = express();
const auth = require('./middleware/auth');
const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');
const authRoutes = require('./routes/auth');
const posts = require("./routes/post");
const user = require("./routes/user");
require('dotenv').config();

// Configure CORS options
const corsOptions = {
    origin: process.env.NEXT_ORIGN_URL, // Allow requests from this origin
    credentials: true,               // Allow credentials (cookies, authorization headers)
    optionSuccessStatus: 200         // For older browsers support
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Middleware for serving static files
app.use(express.static('./public'));

// Parse incoming request bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes without token
app.use(authRoutes);

// Example route
app.get('/', (req, res) => {
    console.log("Hello world");
    return res.status(200).json({ success: true });
});

// Authentication middleware
app.use(auth);

// Routes that require authentication
app.use(posts);
app.use(user);

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

// Start the server
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

start();
