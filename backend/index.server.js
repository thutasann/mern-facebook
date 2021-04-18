const express = require('express');
const bodyParser = require('body-parser');
const connect = require('./config/db');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const app = express();

// connect mongodb
connect();

// routes
app.use(bodyParser.json());
app.use("/", userRoutes);


//server running
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log("Your app is running...");
});