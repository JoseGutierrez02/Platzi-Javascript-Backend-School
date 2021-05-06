const express = require('express');
const response = require('../network/response');
const Store = require('../store/mysql');
const router = express.Router();

router.get('/:table', async (req, res) => {
  const { table } = req.params;
  const data = await Store.list(table);
  response.success(req, res, data, 200);
});

router.get('/:table/:id', async (req, res) => {
  const { id } = req.params;
  const { table } = req.params;
  const data = await Store.get(table, id);
  response.success(req, res, data, 200);
});

router.post('/:table', async (req, res) => {
  const { table } = req.params;
  const { body } = req;
  const data = await Store.upsert(table, body);
  response.success(req, res, data, 200);
});

router.put('/:table', async (req, res) => {
  const { table } = req.params;
  const { body } = req;
  const data = await Store.upsert(table, body);
  response.success(req, res, data, 200);
});

router.post('/:table/query', async (req, res) => {
  const { table } = req.params;
  const { query, join } = req.body
  const data = await Store.query(table, query, join)
  response.success(req, res, data, 200);
});

module.exports = router;