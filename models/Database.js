const mongoose = require('mongoose');

const databaseSchema = new mongoose.Schema({
  databaseName: { type: String, required: true },
  instanceName: [{ type: String, required: true }],
  serverName: [{ type: String, required: true }],
  status: { type: String, required: true },
  job: { type: String, required: true },
  type: { type: String, required: true },
  environment: { type: String, required: true },
  version: { type: String, required: true },
  port: String,
  iua: [{ type: String, required: true }]
});

const Database = mongoose.model('Database', databaseSchema);

module.exports = Database;
