const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./config/db');

const app = express();

// Establish connection with our mLab database
connectToDatabase();

app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ extended: false }));

const recipeRouter = require('./routes/recipe.js');
app.use('/', recipeRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server listening on Port: ${port}`));
