'use strict';

const express = require('express');
const { users } = require('../models/userModel');
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
authRouter.get('/users', bearerAuth, aclPermissions('delete'), handleGetUsers);
authRouter.get('/secret', bearerAuth, handleGetSecret);

module.exports = authRouter;