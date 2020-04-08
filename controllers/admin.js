const Database = require('../models/Database');
const Deliverypath = require('../models/Deliverypath');
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
      req.flash('success', {
        msg: 'Done! Database created.'
      });
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
    } else {
      req.flash('success', {
        msg: 'Done! Database modified.'
      });
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
    } else {
      req.flash('success', {
        msg: 'Done! Database removed.'
      });
    }
    res.redirect('/admin');
  });
};

/**
 * GET /admin/edit-deliverypath
 * Edit Delivery path form page.
 */
exports.getDeliverypathList = (req, res, next) => {
  Deliverypath.find()
    .then((deliverypaths) => {
      console.log(deliverypaths);
      res.render('admin/edit-deliverypath', {
        deliverypaths,
        title: 'Edit Delivery path',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Add a delivery path
exports.postAddDeliverypath = (req, res, next) => {
  const deliverypath = new Deliverypath({
    deliverypathName: req.body.name,
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
  deliverypath
    .save()
    .then((result) => {
      console.log('Delivery path created');
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