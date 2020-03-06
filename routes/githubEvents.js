const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const util = require('util');
const process = require('child_process');
const { succeed, failed } = require('../utils');

const chmod = util.promisify(fs.chmod);
const execFile = util.promisify(process.execFile);

module.exports = function(app) {

  app.post('/github_events', (req, res) => {
    console.log(chalk.blue(JSON.stringify(req.body)));
    const {
      repository,
      pusher,
      ref,
    } = request.body;
    const isAliyunSiteUI = repository.full_name === 'nelhu/aliyun-site-ui';
    const [, , branchName] = ref.split('/');
    const isProduction = branchName === 'master';
    console.log(isAliyunSiteUI, branchName, isProduction);

    if (isAliyunSiteUI && isProduction) {
      const shellPath = path.resolve(__dirname, '../sh/deploy-aliyun-site-ui.sh');
      console.log(shellPath);
      chmod(shellPath, '777')
        .then(() => {
          return execFile(shellPath)
          .then(stdout => console.log(stdout))
          .catch(error => console.error(error))
        })
    }
    res.json(succeed('ok'));
  });

}