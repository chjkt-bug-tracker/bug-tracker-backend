'use strict';

import { Sequelize, DataTypes } from 'sequelize';
const ticketModel = require('./ticketModel');

const DATABASE_URL = process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL);
const ticket = ticketModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  ticket,
};


