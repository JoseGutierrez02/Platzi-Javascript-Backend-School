const TABLE = 'posts';

module.exports = (injectedStore) => {
  let store = injectedStore;
  if(!store) {
    store = require('../../../store/dummy');
  }

  const list = () => {
    return store.list(TABLE)
  };

  const get = (id) => {
    return store.get(TABLE, id);
  };

  return {
    list,
    get,
  };
};
