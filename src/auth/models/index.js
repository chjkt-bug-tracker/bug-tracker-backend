'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./userModel');

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

module.exports = {
  db: sequelize,
  users: userModel(sequelize, DataTypes),
};
