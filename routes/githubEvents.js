const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const util = require('util');
const process = require('child_process');
const { succeed, failed } = require('../utils');

const chmod = util.promisify(fs.chmod);
const execFile = util.promisify(process.execFile);

module.exports = function(app) {

  app.post('/github_events', (req, res, next) => {
    try {
      console.log(chalk.blue(JSON.stringify(req.body)));
      const {
        repository,
        pusher,
        ref,
      } = req.body;
      const isAliyunSiteUI = repository.full_name === 'nelhu/aliyun-site-ui';
      const isAliyunExpressApi = repository.full_name === 'nelhu/aliyun-express-api';
      const [, , branchName] = ref.split('/');
      const isProduction = branchName === 'master';
      console.log(isAliyunSiteUI, branchName, isProduction);

      if (isProduction) {
        let shellName = '';
        if (isAliyunSiteUI) {
          shellName = 'deploy-aliyun-site-ui.sh';
        }
        if (isAliyunExpressApi) {
          shellName = 'deploy-express-api.sh';
        }
        const shellPath = path.resolve(__dirname, `../sh/${shellName}`);
        console.log(shellPath);
        chmod(shellPath, '777')
          .then(() => {
            return execFile(shellPath)
            .then(stdout => console.log(stdout))
            .catch(error => console.error(error))
          })
      }
      res.json(succeed('ok'));
    } catch (error) {
      next(error);
    }
  });

}