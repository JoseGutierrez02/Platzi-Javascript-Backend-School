const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.post('/', (req, res) => {
  controller.addUser(req.body.name)
    .then((user) => {
      response.success(req, res, user, 201);
    })
    .catch((err) => {
      response.error(req, res, 'Invalid information', 400, err);
    });
});

router.get('/', (req, res) => {
  controller.getUsers()
    .then((users) => {
      response.success(req, res, users);
    })
    .catch((err) => {
      response.error(req, res, 'Internal error', 500, err);
    })
});

module.exports = router;
