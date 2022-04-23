const Model = require('./model');

function addAuth(auth) {
  const myAuth = new Model(auth);
  return myAuth.save();
}

async function getUser(userName) {
  return await Model.findOne({ userName }).exec();
}
module.exports = {
  addAuth,
  getUser,
};
