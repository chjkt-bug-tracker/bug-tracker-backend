'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const ticketModel = require('./ticketModel');
const userModel = require('../auth/models/userModel');
const Collection = require('./data-collection.js');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory' : process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL);

// const sequelize = new Sequelize(DATABASE_URL, {
//   dialect: 'postgres',
//   protocol: 'postgres',
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//     native: true,
//   },
// });

const ticket = ticketModel(sequelize, DataTypes);
const users = userModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  ticket: new Collection(ticket),
  users,
};


