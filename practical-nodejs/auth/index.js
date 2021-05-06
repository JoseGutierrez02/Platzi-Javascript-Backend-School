const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');
const secret = config.jwtSecret.secret;

const sign = (data) => {
  return jwt.sign(data, secret);
};

const getToken = (auth) => {
  if (!auth) {
    throw error('No token', 401);
  }

  if (auth.indexOf('Bearer ') === -1) {
    throw error('Invalid format', 401);
  }

  let token = auth.replace('Bearer ', '');
  return token;
};

const verify = (token) => {
  return jwt.verify(token, secret);
};

const decodeHeader = (req) => {
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;

  return decoded;
};

const check = {
  own: (req, owner) => {
    const decoded = decodeHeader(req);
    // console.log(decoded);

    // CHECK IF IT IS OWN
    if (decoded.id !== owner) {
      throw error('You don\'t have enough permissions', 401);
    }
  },
  logged: (req) => {
    const decoded = decodeHeader(req);
  },
};

module.exports = {
  sign,
  check,
};
