const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
  userName: String,
  password: String,
});

const model = mongoose.model('Auth', mySchema);

module.exports = model;
