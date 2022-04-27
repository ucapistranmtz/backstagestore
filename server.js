const cluster = require('cluster');
const os = require('os');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

const numCpu = os.cpus().length;

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

if (cluster.isMaster) {
  for (let i = 0; i < numCpu; i++) {
    cluster.fork(); //!create new nodejs instsance
  }
} else {
  app.listen(config.backendPort, function () {
    console.log(`${process.pid} Listening on port ${config.backendPort}`);
  });
}
