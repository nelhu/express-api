const uuid = require('uuid/v4');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const { succeed, failed, handleProcess } = require('../utils');

const form = formidable({
  mutiples: true,
  uploadDir: path.resolve(__dirname, './../static'),
  keepExtensions: true,
});

const staticPath = '/www/wwwroot/root/assets';
// const staticPath = '/Users/huxuezhi/Documents/private';

module.exports = function(app) {
  app.post('/raw', function(req, res) {
    console.log(req.headers);
    const socket = req.socket;
    const total = req.get('Content-Length');
    req.on('data', data => {
      const loaded = socket.bytesRead;
      const process = Number((loaded / total) * 100).toFixed(2);
      // console.log(data.toString());
      console.log(process);
    })
    req.on('end', () => {
      res.send('ok')
    });
  });

  app.post('/upload', (req, res, next) => {
    handleProcess(req);
    form.parse(req, (err, fields, _files) => {
      console.log('fields', fields);
      console.log('_files', _files);

      if (err) {
        next(err);
        return;
      }
      const files = Object.keys(_files).reduce((acc, key) => {
        acc.push(_files[key]);
        return acc;
      }, []);
      console.log(files);

      const genFilePath = fileName => {
        const parts = fileName.split(/\./);
        const extension = parts[parts.length - 1];
        return `${uuid()}.${extension}`;
      }
      // move
      const urls = [];
      try {
        files.forEach(file => {
          const fileName = genFilePath(file.name);
          const newPath = `${staticPath}/${fileName}`;
          const url = `${req.protocol}://${req.hostname}/assets/${fileName}`;
          fs.renameSync(file.path, newPath);
          urls.push(url);
        })
        res.json(succeed({ urls }));
        console.log('上传完成');
      } catch (error) {
        console.error(error);
        next(error);
      }

    });

  });
}