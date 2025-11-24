require('dotenv').config();
const express = require('express');
const app  = express();

// Db Import and Connection
const connectDB = require('./Config/MongoDBConfig');

// Import Routers
const AuthRoutes = require('./Routers/AuthRoutes');
// Admin Delete Router
const AdminRouter = require('./Routers/AdminRouter');
// Course Router
const CourseRouter = require('./Routers/courseRoutes');
// Modules Router
const ModulesRouter = require('./Routers/moduleRoutes');
// KnowledgeMatrials
const KnowledgeMaterial = require('./Routers/knowledgeMaterialRoutes')
// Attendence Import
const Attendence = require('./Routers/attendanceRoutes');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Connect to MongoDB
connectDB();

// AuthRouter
app.use('/api/auth', AuthRoutes);
// Admin Router for delete operation
app.use('/api', AdminRouter);
// Course Router
app.use('/api/course',CourseRouter)
// Modules
app.use('/api/moudles',ModulesRouter)
// Knowledge
app.use('/api/knowlege',KnowledgeMaterial)
// Attendence 
app.use('/api/attedence',Attendence)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});