const mongoose = require('mongoose');

const databaseSchema = new mongoose.Schema({
  databaseName: String,
  instanceName: [String],
  serverName: [String],
  status: String,
  job: String,
  type: String,
  environment: String,
  version: String,
  port: String,
  iua: [String]
});

const Database = mongoose.model('Database', databaseSchema);

module.exports = Database;
