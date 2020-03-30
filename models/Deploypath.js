const mongoose = require('mongoose');

const deploypathSchema = new mongoose.Schema({
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

const Deploypath = mongoose.model('Deploypath', deploypathSchema);

module.exports = Deploypath;
