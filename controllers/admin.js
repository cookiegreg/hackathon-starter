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
 * GET /admin/add-database
 * Edit Database form page.
 */
exports.getAddDatabase = (req, res) => {
  res.render('admin/add-database', {
    title: 'Add Database'
  });
};

/**
 * GET /admin/edit-database
 * Edit Database form page.
 */
exports.getEditDatabase = (req, res) => {
  Database.findById(req.params.id, (err, database) => {
    res.render('admin/edit-database', {
      database,
      title: 'My Database',
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
    instancename: req.body.instancename.split(','),
    servername: req.body.servername.split(','),
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

// POST Edit a database
exports.postEditDatabase = (req, res) => {
  console.log(req.body.id);
  Database.findByIdAndUpdate(req.body.id, {
    $set: {
      dbname: req.body.dbname,
      instancename: req.body.instancename.split(','),
      servername: req.body.servername.split(','),
      status: req.body.status,
      job: req.body.job,
      type: req.body.type,
      environment: req.body.environment,
      version: req.body.version,
      port: req.body.port,
      iua: req.body.iua.split(',')
    }
  }, (err) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/admin');
  });
};

// Remove a database
exports.getRemoveDatabase = (req, res) => {
  Database.findById(req.params.id, (err, database) => {
    res.render('admin/remove-database', {
      database,
      title: 'Remove Database',
      path: '/'
    });
  })
    .catch((err) => {
      console.log(err);
    });
};

exports.postRemoveDatabase = (req, res) => {
  console.log(req.body.id);
  Database.findByIdAndRemove(req.body.id, (err) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/admin');
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