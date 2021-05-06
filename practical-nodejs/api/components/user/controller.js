const auth = require('../auth');

const TABLE = 'users';

module.exports = (injectedStore) => {
  let store = injectedStore;
  if(!store) {
    store = require('../../../store/dummy');
  }
  
  const list = () => {
    return store.list(TABLE);
  };

  const get = (id) => {
    return store.get(TABLE, id);
  };

  const upsert = async (id, name, username, password) => {
    const user = {
      id,
      name,
      username,
    };

    if(password || username) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: password,
      });
    }
    
    return store.upsert(TABLE, user);
  };

  const follow = (fromUser, toUser) => {
    return store.upsert('user_follow', {
      user_from: fromUser,
      user_to: toUser,
    });
  };

  const following = async (user) => {
    const join = {};
    join[TABLE] = 'user_to'; // { users: 'user_to' }
    const query = { user_from: user };
    return await store.query('user_follow', query, join);
  };

  return {
    list,
    get,
    upsert,
    follow,
    following,
  }
};
