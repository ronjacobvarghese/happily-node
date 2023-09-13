require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn')
const cookieParser = require('cookie-parser')

const app = express();
const PORT = process.env.PORT || 5000;

//Connect to MongoDB
connectDB();

//built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));


//built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser()); 


//Listen through PORT only if mongoDB connection is `open`
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});