const { succeed, failed } = require('../utils');

module.exports = function(app) {

  app.post('/github_events', (req, res) => {
    console.log(res);
    res.json(succeed('ok'));
  });

}