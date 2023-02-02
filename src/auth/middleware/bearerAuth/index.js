'use strict';

const { users } = require('../../../models');

module.exports = async (req, res, next) => {
  try {

    if (!req.headers.authorization) { next('Invalid Login');}

    console.log('testing in bearer hello hello');
    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateToken(token);

    req.user = validUser;
    req.token = validUser.token;
    next();
    
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }
};