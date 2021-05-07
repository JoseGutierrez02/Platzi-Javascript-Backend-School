const express = require('express');
const config = require('../config');
const cacheRouter = require('./network');
const app = express();

app.use(express.json());

// ROUTES
app.use('/', cacheRouter);

app.listen(config.cacheService.port, () => {
  console.log(`Cache service listening at https://localhost:${config.cacheService.port}`);
});
