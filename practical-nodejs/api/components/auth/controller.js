const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const TABLE = 'auth';

module.exports = (injectedStore) => {
  let store = injectedStore;
  if(!store) {
    store = require('../../../store/dummy');
  }

  const login = async (username, password) => {
    const data = await store.query(TABLE, { username: username });

    return bcrypt.compare(password, data.password)
      .then((areEqual) => {
        if (areEqual) {
          // generate token
          return auth.sign(JSON.parse(JSON.stringify(data)));
        } else {
          throw new Error('Invalid information');
        }
      });
  };

  const upsert = async (data) => {
    const authData = {
      id: data.id,
    };

    if(data.username) {
      authData.username = data.username;
    }

    if(data.password) {
      authData.password = await bcrypt.hash(data.password, 5);
    }

    return store.upsert(TABLE, authData);
  };
  
  return {
    login,
    upsert,
  };
};