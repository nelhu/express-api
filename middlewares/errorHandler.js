const { succeed, failed } = require('../utils');

module.exports = function(err, req, res, next) {
  if (res.headerSent) {
    return next(err);
  }
  res.status(500).json(failed(err));
}