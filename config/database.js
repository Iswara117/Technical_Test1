const dotenv = require('dotenv');
// const { Sequelize } = require('sequelize');

dotenv.config();
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, } = process.env;

const db = {
    development: {
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      host: DB_HOST,
      port: DB_PORT,
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    },
    
  };
module.exports = db;