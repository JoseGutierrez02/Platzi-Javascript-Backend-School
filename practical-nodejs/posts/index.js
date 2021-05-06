const express = require('express');
const config = require('../config');
const postRouter = require('./components/post/network');
const errors = require('../network/errors');
const app = express();

app.use(express.json());
// ROUTER
app.use('/api/post', postRouter);
app.use(errors);

app.listen(config.post.port, () => {
  console.log(`Posts service listening at http://localhost:${config.post.port}`);
});
