const store = require('./store');
const bcrypt = require('bcrypt');
const config = require('../../../config');

async function addAddress(req, context) {
  req.owner = context.id;
  return store.addAddress(req);
}
async function updateAddress(owner, address) {}
async function dropAddress(context, addressId) {
  return store.dropAddress();
}
async function getAddresses(context) {
  return store.getAddress(context.id);
}

async function getAddressId(context, addressId) {
  console.log(context, addressId);
  return store.getAddressId(context.id, addressId);
}

module.exports = { addAddress, updateAddress, dropAddress, getAddresses, getAddressId };
