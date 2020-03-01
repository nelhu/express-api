const { succeed, failed } = require('../utils');

module.exports = function(app) {
  app.get('/', (req, res) => {
    res.json(succeed('main page'));
  });

  app.get('/time', (req, res) => {
    res.json(succeed(Date.now()))
  });

  app.get('/error', (req, res) => {
    throw new Error('occurred');
  });

}