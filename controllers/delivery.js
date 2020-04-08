/**
 * GET /
 * Home page.
 */
exports.getDelivery = (req, res) => {
  res.render('delivery', {
    title: 'HomeDelivery'
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

exports.getAddDelivery = (req, res) => {
  res.render('delivery/add-delivery', {
    title: 'Create a new delivery'
  });
};
