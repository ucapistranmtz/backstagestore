const express = require('express');

const response = require('../../../network/responses');
const controller = require('./index');
const router = express.Router();

router.post('/login', function (req, res) {
  controller
    .login(req.body.userName, req.body.password)
    .then(token => {
      response.success(req, res, token, 200);
    })
    .catch(err => {
      response.error(req, res, 'Wrong info', 400);
    });
});

router.post('/', function (req, res) {
  console.log(req.body);
  controller
    .signUp(req.body)
    .then(token => {
      response.success(req, res, token, 201);
    })
    .catch(err => {
      response.error(req, res, 'Wrong info', 400);
    });
});

module.exports = router;
