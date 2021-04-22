require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  userName: process.env.USER_NAME,
  password: process.env.PASSWORD,
  dbName: process.env.DB_NAME,
  dbHost: process.env.DB_HOST,
};

module.exports = config;
