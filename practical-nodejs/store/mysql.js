const mysql = require('mysql');
const config = require('../config');

const dbConfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let connection;

const handleConnection = () => {
  connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if (err) {
      console.error('[db error]', err);
      setTimeout(handleConnection, 2000);
    } else {
      console.log('[db] Connected successfully');
    }
  });

  connection.on('error', err => {
    console.error('[db error]', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleConnection();
    } else {
      throw err;
    }
  });
};

handleConnection();

const list = (table) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

const get = (table, id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

const insert = (table, data) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const update = (table, data) => {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const upsert = async (table, data) => {
  let exist = [];
  if (data.id) {
    exist = await get(table, data.id);
  }

  if(exist.length > 0) {
    return update(table, data);
  } else {
    return insert(table, data);
  }
};

const query = (table, query, join) => {
  let joinQuery = '';
  if (join) {
    const key = Object.keys(join)[0];
    const value = join[key];
    joinQuery = `JOIN ${key} ON ${table}.${value} = ${key}.id`;
  }
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, res) => {
      if (err) return reject(err);
      (joinQuery) ? resolve(res || null) : resolve(res[0] || null);  
    });
  });
};

module.exports = {
  list,
  get,
  upsert,
  query,
};
