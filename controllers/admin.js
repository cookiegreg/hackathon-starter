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
  const database = new Database({
    databaseName: req.body.databaseName,
    instanceName: req.body.instanceName.split(','),
    serverName: req.body.serverName.split(','),
    status: req.body.status,
    job: req.body.job,
    type: req.body.type,
    environment: req.body.environment,
    version: req.body.version,
    port: req.body.port,
    iua: req.body.iua.split(',')
  });
  database
    .save()
    .then((result) => {
      console.log('Database created');
      res.redirect('/admin');
    })
    .catch((err) => {
      console.log(err);
    });
};
