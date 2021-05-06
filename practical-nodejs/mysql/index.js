const express = require('express');
const config = require('../config');
const userRouter = require('./network');
const app = express();

app.use(express.json());

// ROUTES
app.use('/', userRouter);

app.listen(config.mysqlService.port, () => {
  console.log(`MySQL service listening at https://localhost:${config.mysqlService.port}`);
});
