const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
  owner: Schema.Types.ObjectId,
  addressLocality: String,
  postalCode: String,
  streetAddress: String,
});

const model = mongoose.model('Address', mySchema);

module.exports = model;
