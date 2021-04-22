const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');
const router = express.Router();

router.post('/', (req, res) => {
  controller.addChat(req.body.users)
    .then((chat) => {
      response.success(req, res, chat, 201);
    })
    .catch((err) => {
      response.error(req, res, 'Invalid information', 400, err);
    })
});

router.get('/:userId', (req, res) => {
  controller.listChats(req.params.userId)
    .then((chats) => {
      response.success(req, res, chats, 200);
    })
    .catch((err) => {
      response.error(req, res, 'Internal error', 500, err);
    })
});

module.exports = router;
