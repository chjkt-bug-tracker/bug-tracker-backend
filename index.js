'use strict';

require('dotenv').config();
const app = require('./src/server.js');
const { db } = require('./src/models');

// starts the Express server on localhost
// use { force: true } to force Sequelize to create the tables and drop them if they already existed;
// this is helpful to reset the tables every time we sync
// but NOT helpful for actual deployment since we want the data to eventually persist
db.sync({ force: true }).then(() => {
  console.log('successful connection');
  app.start(process.env.PORT || 3002);
});