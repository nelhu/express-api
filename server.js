const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const staticHandler = require('./middlewares/staticHandler');

const app = express();
const port = 9000;

app.use(cors());
// handle static assets
app.use('/static', staticHandler);

routes(app);

app.get('/test', (req, res) => {
  res.json({name: 'tom'});
});

// handle error
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running at ${port}...`);
});