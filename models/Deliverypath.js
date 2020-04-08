const mongoose = require('mongoose');

const deliverypathSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  iua: {
    type: String,
    required: true
  },
  dbschema: {
    type: String,
    required: true
  },
  configuration: [{
    dbname: String,
    environment: String
  }]
});

const Deliverypath = mongoose.model('Deliverypath', deliverypathSchema);

module.exports = Deliverypath;
