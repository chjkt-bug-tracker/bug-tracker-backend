'use strict';

const base64 = require('base-64');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { next('authError'); }

  let basic = req.headers.authorization;
  let [username, password] = base64.decode(basic.split(' ')).pop().split(':');

  try {
    // req.users = await users.authenticateBasic(username, password);
    // next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }

};