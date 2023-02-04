// Required import for server file
const express = require('express');
const bodyParser = require('body-parser');
const taskRoute = require('./routes/task.router.js');
const app = express();

// Setup body parser - to translating request body into JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve back static files by default
app.use(express.static('server/public'));

// connect app with the router
app.use('/task', taskRoute);

// Start listening for requests on a specific port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('listening on port', PORT);

});
