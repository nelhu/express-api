const { succeed, failed } = require('../utils');

module.exports = function(app) {

  app.post('/github_events', (req, res) => {
    res.json(succeed('ok'));
  });

}