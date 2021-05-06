const express = require('express');
const secure = require('./secure');
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
  const { id } = req.params;
  Controller.get(id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  const { id, name, username, password } = req.body;
  Controller.upsert(id, name, username, password)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
});

router.put('/', secure('update'), (req, res, next) => {
  const { id, name, username, password } = req.body;
  Controller.upsert(id, name, username, password)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
});

router.post('/follow/:id', secure('follow'), (req, res, next) => {
  Controller.follow(req.user.id, req.params.id)
    .then(data => {
      response.success(req, res, data, 201);
    })
    .catch(next);
});

router.get('/:id/following', (req, res, next) => {
	return Controller.following(req.params.id)
		.then( (data) => {
			return response.success(req, res, data, 200);
		})
		.catch(next);
});

module.exports = router;
