const store = require('./store');

function addChat(users) {
  if(!users || !Array.isArray(users)) {
    return Promise.reject('Invalid user list');
  }

  const chatUsers = {
    users: users,
  }

  return store.add(chatUsers);
}

function listChats(userId) {
  return store.list(userId);
}

module.exports = {
  addChat,
  listChats,
}
