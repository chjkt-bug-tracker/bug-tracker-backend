'use strict';

const express = require('express');
const authRouter = express.Router();

const basicAuth = require('../middleware/basicAuth');
const bearerAuth = require('../middleware/bearerAuth');
const {
  handleSignin,
  handleSignup,
  handleGetUsers,
} = require('./handlers.js');

authRouter.post('/signup', handleSignup);
authRouter.post('/signin', basicAuth, handleSignin);
authRouter.get('/users', bearerAuth, handleGetUsers);

module.exports = authRouter;