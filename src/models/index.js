'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('../auth/models/userModel');
const ticketModel = require('./ticketModel');
const Collection = require('./data-collection.js');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory' : process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    native: true,
  },
});

const tickets = ticketModel(sequelize, DataTypes);
const users = userModel(sequelize, DataTypes);


module.exports = {
  db: sequelize,
  tickets: new Collection(tickets),
  users,
};


