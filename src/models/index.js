'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('../auth/models/userModel');
const ticketModel = require('./ticketModel');
const Collection = require('./data-collection.js');

const DATABASE_URL = process.env.DATABASE_URL;

const seq uelize = new Sequelize(DATABASE_URL, {
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


