const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = Schema({
  users: [{
    type: Schema.ObjectId,
    ref: 'User',
  }]
});

const model = mongoose.model('chat', chatSchema);
module.exports = model;
