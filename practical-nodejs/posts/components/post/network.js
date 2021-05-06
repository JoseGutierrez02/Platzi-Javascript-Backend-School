const express = require('express');
const response = require('../../../network/response');
const Controller = require('./index');
const router = express.Router();

router.get('/', (req, res, next) => {
  Controller.list()
    .then((list) => {
      response.success(req, res, list, 200);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params
  Controller.get(id)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
});

module.exports = router;
