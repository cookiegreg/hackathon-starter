const mongoose = require('mongoose');

const refreshpathSchema = new mongoose.Schema({
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
  source: {
    dbname: String,
    servername: String,
    dbschema: String,
    tbs: String
  },
  destination: {
    dbname: String,
    servername: String,
    dbschema: String,
    tbs: String
  },
  type: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  prescript: {
    type: String,
    required: true
  },
  postscript: {
    type: String,
    required: true
  }
});

const Refreshpath = mongoose.model('Refreshpath', refreshpathSchema);

module.exports = Refreshpath;