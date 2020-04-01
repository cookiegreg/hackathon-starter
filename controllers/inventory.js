const Database = require('../models/Database');

/**
 * GET /inventory
 * Login page.
 */

// Find all databases
exports.getDatabaseList = (req, res, next) => {
  Database.find()
    .then((databases) => {
      res.render('inventory', {
        databases: databases,
        title: 'All Databases',
        path: '/'
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// FindOne database
exports.getDatabase = (req, res, next) => {
  Database.findOne()
    .then((databases) => {
      console.log(databases);
      res.render('inventory', {
        databases: databases,
        title: 'A Database',
        path: '/'
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
