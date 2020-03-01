const express = require('express');
// const errorHandler = require('./middlewares/errorHandler');

const app = express();
const port = 9000;

app.use('/static', express.static('static'));


app.get('/', (req, res) => {
  res.send(`hello world`);
});

app.get('/time', (req, res) => {
  res.send(Date.now());
});

app.get('/a', (req, res) => {
  res.send(`a`);
});

app.get('/error', (req, res) => {
  throw new Error('error occurred');
});

// app.use(errorHandler);

app.listen(port, () => {
  console.log(`app running at ${port}`);
});