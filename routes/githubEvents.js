const chalk = require('chalk');
const { succeed, failed } = require('../utils');

module.exports = function(app) {

  app.post('/github_events', (req, res) => {
    console.log(chalk.blue(JSON.stringify(req.body)));
    res.json(succeed('ok'));
  });

}