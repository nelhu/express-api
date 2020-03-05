const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const staticHandler = require('./middlewares/staticHandler');

const app = express();
const port = 9000;

app.use(cors());
app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: true })) // parse application/x-www-form-urlencoded
app.use('/static', staticHandler); // handle static assets

routes(app);

app.get('/test', (req, res) => {
  res.json({name: 'tom'});
});

// handle error
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running at ${port}...`);
});