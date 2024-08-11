const express=require('express');
const connectDb = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require("dotenv").config();




connectDb();
const app = express();

app.use(express.json()); //to provide parser.

//to define contact routes & path of our routes
app.use('/api/contacts', require("./routes/contactRoutes"));
app.use('/api/users', require("./routes/userRoutes"));
//adding middleware in express project.
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server running on port ${port}`);
    
});