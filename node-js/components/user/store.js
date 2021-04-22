const Model = require('./model');

function addUser(user) {
  const myUser = new Model(user);
  return myUser.save();
}

async function getUsers() {
  const usersList = await Model.find()
  return usersList;
}

module.exports = {
  add: addUser,
  list: getUsers,
}