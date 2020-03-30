/**
 * GET /
 * Home page.
 */
exports.getDeploy = (req, res) => {
  res.render('deploy', {
    title: 'HomeDeploy'
  });
};

/**
 * GET /deploy/upload
 * File Upload API example.
 */

exports.getFileUpload = (req, res) => {
  res.render('deploy/upload', {
    title: 'File Upload'
  });
};

/**
 * POST /deploy/upload
 * File Upload API example.
 */

exports.postFileUpload = (req, res) => {
  req.flash('success', { msg: 'File was uploaded successfully.' });
  res.redirect('/deploy/upload');
};
