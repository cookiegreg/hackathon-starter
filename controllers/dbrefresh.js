/**
 * GET /dbrefresh
 * dbrefresh form page.
 */
exports.getDbRefresh = (req, res) => {
  const unknownUser = !req.user;

  res.render('dbrefresh', {
    title: 'DB Refresh',
    unknownUser
  });
};
