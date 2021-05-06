const db = {
  'user': [
    { id: '1', name: 'Jose' },
    { id: '2', name: 'Jesus' },
  ],
};

const list = async (table) => {
  const data = await db[table] || [];
  return data;
};

const get = async (table, id) => {
  let collection = await list(table);
  const foundItem = await collection.find(item => item.id === id) || null;
  return foundItem;
};

const upsert = async (table, data) => {
  if (!db[table]) {
    db[table] = [];
  }

  db[table].push(data);

  console.log(db);
};

const remove = async(table, id) => {
  return true;
};

const query = async (table, q) => {
  let collection = await list(table);
  let keys = Object.keys(q);
  let key = keys[0];
  const foundItem = collection.find(item => item[key] === q[key]) || null;
  return foundItem;
}

module.exports = { 
  list,
  get,
  upsert,
  remove,
  query,
};
