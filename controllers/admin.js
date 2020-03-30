const Database = require('../models/Database');
const Deploypath = require('../models/Deploypath');
const Refreshpath = require('../models/Refreshpath');

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
exports.getAddDatabase = (req, res) => {
  res.render('admin/edit-database', {
    title: 'Add/Edit Database'
  });
};

/**
 * GET /admin/
 * Edit Database form page.
 */
/* exports.getDatabaseList = (req, res, next) => {
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
}; */

exports.getDatabase = (req, res, next) => {
  Database.find()
    .then((databases) => {
      console.log(databases);
      res.render('admin', {
        databases,
        databaseName: databases.dbname,
        title: databases.dbname,
        path: '/'
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// POST Add a database
exports.postAddDatabase = (req, res, next) => {
  const database = new Database({
    dbname: req.body.dbname,
    instancename: req.body.instancename,
    servername: req.body.servername,
    status: req.body.status,
    job: req.body.job,
    type: req.body.type,
    environment: req.body.environment,
    version: req.body.version,
    port: req.body.port,
    iua: req.body.iua
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

/**
 * GET /admin/edit-deploypath
 * Edit Deploy path form page.
 */
exports.getDeploypathList = (req, res, next) => {
  Deploypath.find()
    .then((deploypaths) => {
      console.log(deploypaths);
      res.render('admin/edit-deploypath', {
        deploypaths,
        title: 'Edit Deploy path',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Add a deploy path
exports.postAddDeploypath = (req, res, next) => {
  const deploypath = new Deploypath({
    deploypathName: req.body.name,
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
  deploypath
    .save()
    .then((result) => {
      console.log('Deploy path created');
      res.redirect('/admin');
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * GET /admin/edit-refreshpath
 * Edit Refresh path form page.
 */
exports.getRefreshpathList = (req, res, next) => {
  Refreshpath.find()
    .then((refreshpaths) => {
      console.log(refreshpaths);
      res.render('admin/edit-refreshpath', {
        refreshpaths,
        title: 'Edit Refresh path',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Add a refresh path
exports.postAddRefreshpath = (req, res, next) => {
  const refreshpath = new Refreshpath({
    refreshpathName: req.body.refreshpathName,
    instanceName: req.body.instanceName.split(','),
    serverName: req.body.serverName.split(','),
    status: req.body.status,
    job: req.body.job,
    type: req.body.type,
    environment: req.body.environment,
    iua: req.body.iua
  });
  refreshpath
    .save()
    .then((result) => {
      console.log('Refresh path created');
      res.redirect('/admin');
    })
    .catch((err) => {
      console.log(err);
    });
};