'use strict';

const express = require('express');
const authRouter = express.Router();
const aclPermissions = require('../middleware/acl');

const basicAuth = require('../middleware/basicAuth');
const bearerAuth = require('../middleware/bearerAuth');
const {
  handleSignin,
  handleSignup,
  handleGetUsers,
  handleGetSecret,
} = require('./handlers.js');

authRouter.post('/signup', handleSignup);
authRouter.post('/signin', basicAuth, handleSignin);
authRouter.get('/users', handleGetUsers);
authRouter.get('/secret', handleGetSecret);

module.exports = authRouter;