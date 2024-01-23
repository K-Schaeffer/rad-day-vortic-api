const express = require('express');
const cors = require('cors');

// App
const app = express();
  
// Middlewares
app.use(express.json()); // Using JSON parser
app.use(cors()); // Enabling CORS globally
app.use(express.urlencoded({ extended: false })); // To get formData

// Routes
const api = require('./routes/api');
app.use('/api', api);

// Starting App
const port = 8080;
app.listen(port, () => console.log(`Listening on Port: ${port}`));
