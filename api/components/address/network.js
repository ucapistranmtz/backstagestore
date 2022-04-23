const express = require('express');

const response = require('../../../network/responses');
const controller = require('./index');
const router = express.Router();
const auth = require('../../../auth');

router.post('/', function (req, res) {
  controller
    .addAddress(req.body, req.context)
    .then(token => {
      response.success(req, res, token, 200);
    })
    .catch(err => {
      console.error(err.message);
      response.error(req, res, err.message, 400);
    });
});

router.put('/:id', function (req, res) {
  controller
    .updateAddress(req.params.id, req.body)
    .then(token => {
      response.success(req, res, token, 200);
    })
    .catch(err => {
      response.error(req, res, 'Wrong info', 400);
    });
});

router.get('/', function (req, res) {
  controller
    .getAddresses(req.context)
    .then(data => {
      response.success(req, res, data, 200);
    })
    .catch(err => {
      response.error(req, res, 'Wrong info', 400);
    });
});

router.get('/:id', function (req, res) {
  controller
    .getAddressId(req.context, req.params.id)
    .then(data => {
      response.success(req, res, data, 200);
    })
    .catch(err => {
      response.error(req, res, 'Wrong info', 400);
    });
});

router.delete('/:id', function (req, res) {
  controller
    .dropAddress(req.params.id)
    .then(token => {
      response.success(req, res, token, 201);
    })
    .catch(err => {
      response.error(req, res, 'Wrong info', 400);
    });
});

module.exports = router;
