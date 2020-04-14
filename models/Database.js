const mongoose = require('mongoose');

const databaseSchema = new mongoose.Schema({
  dbname: {
    type: String,
    required: true
  },
  instancename: [{
    type: String,
    required: true
  }],
  servername: [{
    type: String,
    required: true
  }],
  status: {
    type: String,
    required: true
  },
  job: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  environment: {
    type: String,
    required: true
  },
  version: {
    type: String,
    required: true
  },
  port: {
    type: String
  },
  iua: [{
    type: String,
    required: true
  }]
});

const Database = mongoose.model('Database', databaseSchema);

module.exports = Database;
