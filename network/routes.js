const auth = require('../api/components/auth/network');
const address = require('../api/components/address/network');
const authContext = require('../auth');

function buildContext(req, res, next) {
  const context = authContext.decodeHeader(req);
  req.context = context;

  next();
}

const routes = function (server) {
  server.use('/auth', auth);
  server.use('/address', buildContext, address);
};

module.exports = routes;
