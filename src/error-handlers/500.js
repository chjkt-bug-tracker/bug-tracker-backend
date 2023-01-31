'use strict';

module.exports = (err, req, res, next) => {
  res.status(500).send({
    error: 500,
    message: `SERVER ERROR: ${err}`,
  });
};