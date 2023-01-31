'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const ticketModel = require('./ticketModel');
const Collection = require('./data-collection.js');

const DATABASE_URL = process.env.DATABASE_URL;

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

const ticket = ticketModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  ticket: new Collection(ticket),
};


