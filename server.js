// src/server.js
require('dotenv').config({ path: __dirname + '/.env' });        // load variables from .env file
const createApp = require('./app');  // load the app configured in app.js

const app = createApp();             // initialize the Express app

const PORT = process.env.PORT || 4000; // use port from .env or default to 4000

// start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
