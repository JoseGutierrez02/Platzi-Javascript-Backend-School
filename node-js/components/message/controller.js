const { socket } = require('../../socket');
const store = require('./store');

function addMessage(chat, user, message, file) {
  return new Promise((resolve, reject) => {
    if(!chat || !user || !message) {
      console.error('[messageController] There is no chat, user or message');
      return reject('Incorrect data');
    }

    let fileUrl = '';
    if(file) {
      fileUrl = 'http://localhost:3000/app/files/' + file.filename;
    }

    const fullMessage = {
      chat:chat,
      user: user,
      message: message,
      date: new Date(),
      file: fileUrl,
    };
  
    store.add(fullMessage);
    socket.io.emit('message', fullMessage);
    resolve(fullMessage);
  });
}

function getMessages(filterUser) {
  return new Promise((resolve, reject) => {
    resolve(store.list(filterUser));
  });
}

function updateMessage(id, message) {
  return new Promise(async (resolve, reject) => {
    if(!id || !message) {
      console.error('[messageController] There is no user or message');
      return reject('Incorrect data');
    }

    const result = await store.updateText(id, message);
    resolve(result);
  });
}

function deleteMessage(id) {
  return new Promise((resolve, reject) => {
    if(!id) {
      reject('Invalid id');
      return false;
    }
    store.remove(id)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  })
}

module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage
};