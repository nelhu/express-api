const chalk = require('chalk');
const { succeed, failed } = require('../utils');

module.exports = function(app) {

  app.post('/github_events', (req, res) => {
    console.log(req.body);
    console.error(req.body);
    console.log(chalk.blue(req.body));
    res.json(succeed('ok'));
  });

}