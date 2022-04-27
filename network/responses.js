const logger = require('../logger');
exports.success = function (req, res, message, status) {
  res.status(status || 200).send({ error: '', body: message });
};

exports.error = function (req, res, message, status) {
  const logEvent = {
    req: {
      url: req.baseUrl,
      method: req.method,
      body: req.body,
    },
    res: {
      data: message,
    },

    status: status,
  };
  logger(JSON.stringify(logEvent));
  res.status(status || 500).send({ error: message, body: '' });
};
