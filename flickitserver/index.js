require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const moviegameRoute = require('./src/routes/moviegame');
const foodgameRoute = require('./src/routes/foodgame');
const flaggameRoute = require('./src/routes/flaggame');

const authRoutes = require('./src/routes/authRoutes');

const app = express();
const PORT = process.env.PORT ;
const DB_URL = process.env.DB_URL;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", authRoutes); 
app.use(moviegameRoute);  
app.use(foodgameRoute)   
app.use(flaggameRoute)
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on Port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });
