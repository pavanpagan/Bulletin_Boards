const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: "50mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:500000}));

require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;
