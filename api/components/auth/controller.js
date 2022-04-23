const store = require('./store');
const bcrypt = require('bcrypt');
const config = require('../../../config');
const auth = require('../../../auth');

async function signUp(req) {
  try {
    let user = await store.getUser(req.userName);
    if (!user) {
      bcrypt.hash(req.password, config.saltRounds, async function (err, hash) {
        req.password = hash;
        return await store.addAuth(req);
      });
    } else {
      throw new Error('user already exists');
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

async function login(userName, password) {
  const user = await store.getUser(userName);

  return new Promise((resolve, reject) => {
    return bcrypt.compare(password, user.password, function (err, result) {
      if (result === true) {
        resolve(auth.sign({ id: user._id.toString(), userName }, config.jwt.secret));
      } else {
        reject(err);
      }
    });
  });
}

module.exports = { signUp, login };
