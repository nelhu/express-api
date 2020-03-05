const common = require('./common');
const upload = require('./upload');
const githubEvents = require('./githubEvents');
module.exports = function(app) {
  common(app);
  upload(app);
  githubEvents(app);
}