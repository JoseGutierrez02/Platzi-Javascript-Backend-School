const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const userSchema = Schema({
  name: String,
});

const model =  mongoose.model('User', userSchema);
module.exports = model;
