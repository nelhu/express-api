const common = require('./common');
const upload = require('./upload');
module.exports = function(app) {
  common(app);
  upload(app);
}