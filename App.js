require('dotenv').config();
const express = require('express');
const app  = express();

// Db Import and Connection
const connectDB = require('./Config/MongoDBConfig');

// Import Routers
const AuthRoutes = require('./Routers/AuthRoutes');
// Admin Delete Router
const AdminRouter = require('./Routers/AdminRouter');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Connect to MongoDB
connectDB();

// AuthRouter
app.use('/api/auth', AuthRoutes);
// Admin Router for delete operation
app.use('/api', AdminRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});