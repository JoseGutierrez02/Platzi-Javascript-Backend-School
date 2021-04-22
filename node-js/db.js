const db = require('mongoose');
const config = require('./config');

const URI = `mongodb+srv://${config.userName}:${config.password}@${config.dbHost}/${config.dbName}`
db.Promise = global.Promise;

async function connect() {
  try {
    await db.connect(URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log('[db] Connected successfully');
  } catch(err) {
    console.log(err.message)
  }
}

module.exports = connect;
