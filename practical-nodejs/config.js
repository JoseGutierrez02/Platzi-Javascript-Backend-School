require('dotenv').config();

module.exports = {
  remoteDB: process.env.REMOTE_DB || false,
  api: {
    port: process.env.PORT || 3000,
  },
  post: {
    port: process.env.POST_SERVICE_PORT || 3002,
  },
  jwtSecret: {
    secret: process.env.JWT_SECRET || 'notasecret!',
  },
  mysql: {
    host: process.env.MYSQL_HOST || '',
    user: process.env.MYSQL_USER || '',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DB || '',
  },
  mysqlService: {
    host: process.env.MYSQL_SERVICE_HOST || 'localhost',
    port: process.env.MYSQL_SERVICE_PORT || 3001,
  },
  cacheService: {
    host: process.env.CACHE_SERVICE_HOST || 'localhost',
    port: process.env.CACHE_SERVICE_PORT || 3003,
  },
  redis: {
    host: process.env.REDIS_HOST || '',
    port: process.env.REDIS_PORT || '',
    password: process.env.REDIS_PASSWORD || '',
  }
};