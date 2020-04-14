const Refreshpath = require('../models/Refreshpath');

/**
 * GET /dbrefresh
 * dbrefresh form page.
 */

exports.getDbRefresh = (req, res) => {
  Refreshpath.find()
    .then((refreshpaths) => {
      res.render('dbrefresh/index', {
        refreshpaths,
        title: 'All refreshpaths',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
