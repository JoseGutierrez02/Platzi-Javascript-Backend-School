const request = require('request');

function createRemoteDB(host, port) {
  const URL = `http://${host}:${port}`;

  const list = (table) => {
    return req('GET', table);
  };

  const get = (table, id) => {
    return req('GET', table, id);
  };

  const insert = (table, data) => {
		return req('POST', table, data);
	};

  const update = (table, data) => {
		return req('PUT', table, data);
	};

  const upsert = async (table, data) => {
    const exist = await req('GET', table, data.id);
    if (exist.length > 0) {
      return update(table, data);
    } else {
      return insert(table, data);
    }
  };

  const query = (table, query, join) => {
		return req('POST', table + '/query', { query, join });
	}

  const req = (method, table, data) => {
    let url = `${URL}/${table}`;
    let body = '';

    if(data && method === 'GET') {
      url += `/${data}`;
    } else if(data) {
      body = JSON.stringify(data);
    }

    return new Promise((resolve, reject) => {
      request({
        method,
        headers: {
          'content-type': 'application/json'
        },
        url,
        body,
      }, (err, req, body) => {
        if (err) {
          console.error('Remote DB error', err);
          return reject(err.message);
        }

        const resp = JSON.parse(body);
        return resolve(resp.body)
      });
    });
  };

  return {
    list,
    get,
    upsert,
    query,
  }
};

module.exports = createRemoteDB;
