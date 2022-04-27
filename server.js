const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const logEvents = require('./logger');

const db = require('./db');
const config = require('./config');

db.connect(config.dbUrl);

const router = require('./network/routes');

const app = express();
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router(app);
app.use(express.static('public'));

app.listen(config.backendPort, function () {
  console.log(`Listening on port ${config.backendPort}`);
});
