const Deliverypath = require('../models/Deliverypath');

/**
 * GET /delivery/index
 */
exports.getDeliverypath = (req, res) => {
  Deliverypath.find()
    .then((deliverypaths) => {
      res.render('delivery/index', {
        deliverypaths,
        title: 'All deliverypath',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
/**
 * GET /delivery/upload
 * File Upload.
 */

exports.getFileUpload = (req, res) => {
  res.render('delivery/upload', {
    title: 'File Upload'
  });
};

/**
 * POST /delivery/upload
 * File Upload.
 */

exports.postFileUpload = (req, res) => {
  req.flash('success', { msg: 'File was uploaded successfully.' });
  res.redirect('/delivery/upload');
};

/**
 * GET /delivery/upload
 * File Upload.
 */

exports.getNewDelivery = (req, res) => {
  res.render('delivery/new-delivery', {
    title: 'Create a new delivery'
  });
};
