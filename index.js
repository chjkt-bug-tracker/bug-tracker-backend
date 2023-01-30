'use strict';

require('dotenv').config();
const app = require('./src/server.js');
// const { db } = require('./src/models');

// starts the Express server on localhost
app.start(process.env.PORT || 3002);