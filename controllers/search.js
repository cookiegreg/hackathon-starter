const Database = require('../models/Database');
const Deliverypath = require('../models/Deliverypath');
const Refreshpath = require('../models/Refreshpath');

exports.index = (req, res) => {
  res.render('search/index');
};

exports.query = (req, res) => {
  console.log(req.params.dbname);
  Database.find(req.query, (err, database) => {
    res.render('search', {
      database,
      title: 'My Search results',
    });
  })
    .catch((err) => {
      console.log(err);
    });
};
