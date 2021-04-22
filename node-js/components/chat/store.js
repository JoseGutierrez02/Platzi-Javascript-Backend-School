const Model = require('./model');

async function addChat(chat) {
  const myChat = new Model(chat);
  return myChat.save();
}

function getChats(userId) {
  return new Promise((resolve, reject) => {
    let filter = {};
    if(userId) {
      filter = {
        users: userId,
      }
    }
    Model.find()
      .populate('users')
      .exec((error, populatedData) => {
        if(error) {
          return reject(error);
        }
        resolve(populatedData);
      })
  });
}

module.exports = {
  add: addChat,
  list: getChats,
}
