const Database = require('../models/Database');
/**
 * GET /admin
 * Admin form page.
 */
exports.getAdmin = (req, res) => {
  Database.find()
    .then((databases) => {
      console.log(databases);
      res.render('admin/index', {
        databases,
        title: 'All Databases',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * GET /admin/edit-database
 * Edit Database form page.
 */
exports.getDatabaseList = (req, res, next) => {
  Database.find()
    .then((databases) => {
      console.log(databases);
      res.render('admin/edit-database', {
        databases,
        title: 'All Databases',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Add a database
exports.postAddDatabase = (req, res, next) => {
  const { databaseName } = req.body;
  const { instanceName } = req.body;
  const { serverName } = req.body;
  const database = new Database({
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
  databases
    .save()
    .then((result) => {
      console.log('Database created');
      res.redirect('admin/index');
    })
    .catch((err) => {
      console.log(err);
    });
};
