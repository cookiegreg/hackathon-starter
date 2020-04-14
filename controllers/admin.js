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

// DATABASE ADMIN
/**
 * GET /admin/add-database
 * Add Database form page.
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


// DELIVERY PATH ADMIN
/**
 * GET /admin/add-deliverypath
 * Edit Delivery path form page.
 */
exports.getAddDeliverypath = (req, res) => {
  res.render('admin/add-deliverypath', {
    title: 'Add Deliverypath'
  });
};

// Add a delivery path
exports.postAddDeliverypath = (req, res) => {
  const deliverypath = new Deliverypath({
    name: req.body.name,
    description: req.body.description,
    iua: req.body.iua,
    dbschema: req.body.dbschema,
    type: req.body.type,
    configuration:{
      dbname: req.body.dbname,
      environment: req.body.environment
    }
  });
  deliverypath
    .save()
    .then((result) => {
      req.flash('success', {
        msg: 'Done! Deliverypath created.'
      });
      res.redirect('/admin');
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * GET /admin/edit-deliverypath
 * Edit Deliverypath form page.
 */
exports.getEditDeliverypath = (req, res) => {
  Deliverypath.findById(req.params.id, (err, deliverypath) => {
    res.render('admin/edit-deliverypath', {
      deliverypath,
      title: 'My Deliverypath',
      path: '/'
    });
  })
    .catch((err) => {
      console.log(err);
    });
};

// Remove a deliverypath
exports.getRemoveDeliverypath = (req, res) => {
  Deliverypath.findById(req.params.id, (err, deliverypath) => {
    res.render('admin/remove-deliverypath', {
      deliverypath,
      title: 'Remove Deliverypath',
      path: '/'
    });
  })
    .catch((err) => {
      console.log(err);
    });
};

exports.postRemoveDeliverypath = (req, res) => {
  console.log(req.body.id);
  Deliverypath.findByIdAndRemove(req.body.id, (err) => {
    if (err) {
      console.log(err);
    } else {
      req.flash('success', {
        msg: 'Done! Deliverypath removed.'
      });
    }
    res.redirect('/admin');
  });
};

// REFRESHPATH ADMIN
/**
 * GET /admin/add-refreshpath
 * Add Refreshpath form page.
 */
exports.getAddRefreshpath = (req, res) => {
  res.render('admin/add-refreshpath', {
    title: 'Add Refreshpath'
  });
};

/**
 * GET /admin/edit-refreshpath
 * Edit Refreshpath form page.
 */
exports.getEditRefreshpath = (req, res) => {
  Refreshpath.findById(req.params.id, (err, refreshpath) => {
    res.render('admin/edit-refreshpath', {
      refreshpath,
      title: 'My refreshpath',
      path: '/'
    });
  })
    .catch((err) => {
      console.log(err);
    });
};

// Add a refreshpath
exports.postAddRefreshpath = (req, res) => {
  const refreshpath = new Refreshpath({
    name: req.body.name,
    description: req.body.description,
    iua: req.body.iua,
    source: {
      dbname: req.body.dbname,
      servername: req.body.servername,
      dbschema: req.body.dbschema,
      tbs: req.body.tbs
    },
    destination: {
      dbname: req.body.dbname,
      servername: req.body.servername,
      dbschema: req.body.dbschema,
      tbs: req.body.tbs
    },
    type: req.body.type,
    method: req.body.method,
    prescript: req.body.prescript,
    postscript: req.body.postscript
  });
  refreshpath
    .save()
    .then((result) => {
      req.flash('success', {
        msg: 'Done! Refreshpath created.'
      });
      res.redirect('/admin');
    })
    .catch((err) => {
      console.log(err);
    });
};

// Remove a refreshpath
exports.getRemoveRefreshpath = (req, res) => {
  Refreshpath.findById(req.params.id, (err, refreshpath) => {
    res.render('admin/remove-refreshpath', {
      refreshpath,
      title: 'Remove Refreshpath',
      path: '/'
    });
  })
    .catch((err) => {
      console.log(err);
    });
};

exports.postRemoveRefreshpath = (req, res) => {
  console.log(req.body.id);
  Refreshpath.findByIdAndRemove(req.body.id, (err) => {
    if (err) {
      console.log(err);
    } else {
      req.flash('success', {
        msg: 'Done! Refreshpath removed.'
      });
    }
    res.redirect('/admin');
  });
};
