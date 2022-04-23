const mongoose = require('mongoose');
const Schema = mongoose.schema();

const mySchema = new Schema({
  userName: String,
  password: String,
});

const model = mongoose.model('User', mySchema);

module.exports = model;
