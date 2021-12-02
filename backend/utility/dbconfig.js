const Sequelize = require('sequelize');

const db = new Sequelize('planeDB', 'postgres', 'password', {
  logging: false,
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = db;
