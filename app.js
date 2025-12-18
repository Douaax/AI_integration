const express = require('express');

function createApp() {

  const app = express();
  app.use(express.json());
  

  // connect books routes
  app.use('/books', require('./routes/books.routes'));

  // connect AI routes
  app.use('/ai', require('./routes/ai.routes'));


  return app;
}

module.exports = createApp;
