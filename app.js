/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressStatusMonitor = require('express-status-monitor');
const sass = require('node-sass-middleware');
const multer = require('multer');

/**
 * Multer storage configuration
 */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads');
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.originalname}-${uniqueSuffix}`);
  }
});

const upload = multer({ storage });

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({
  path: '.env.example'
});

/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/home');
const userController = require('./controllers/user');
// const searchController = require('./controllers/search');
const deliveryController = require('./controllers/delivery');
const inventoryController = require('./controllers/inventory');
const adminController = require('./controllers/admin');
const dbrefreshController = require('./controllers/dbrefresh');

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport');

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(expressStatusMonitor());
app.use(compression());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 1209600000
  }, // two weeks in milliseconds
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    autoReconnect: true,
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  if (req.path === '/delivery/upload') {
    // Multer multipart/form-data handling needs to occur before the Lusca CSRF check.
    next();
  } else {
    lusca.csrf()(req, res, next);
  }
});
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use('/', express.static(path.join(__dirname, 'public'), {
  maxAge: 31557600000
}));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/chart.js/dist'), {
  maxAge: 31557600000
}));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/popper.js/dist/umd'), {
  maxAge: 31557600000
}));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'), {
  maxAge: 31557600000
}));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/jquery/dist'), {
  maxAge: 31557600000
}));
app.use('/webfonts', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free/webfonts'), {
  maxAge: 31557600000
}));

/**
 * Primary app routes.
 */
// Home route
app.get('/', homeController.index);
// User routes
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);
// Search routes
// app.get('/search', searchController.index);
// app.get('/search/:dbname', searchController.query);
// Admin routes
//    Database Admin routes
app.get('/admin', passportConfig.isAuthenticated, adminController.getAdmin);
app.get('/admin/add-database', passportConfig.isAuthenticated, adminController.getAddDatabase);
app.post('/admin/add-database', passportConfig.isAuthenticated, adminController.postAddDatabase);
app.get('/admin/edit-database/:id', passportConfig.isAuthenticated, adminController.getEditDatabase);
app.post('/admin/edit-database', passportConfig.isAuthenticated, adminController.postEditDatabase);
app.get('/admin/remove-database/:id', passportConfig.isAuthenticated, adminController.getRemoveDatabase);
app.post('/admin/remove-database', passportConfig.isAuthenticated, adminController.postRemoveDatabase);
//    Refreshpath Admin routes
app.get('/admin/add-refreshpath', passportConfig.isAuthenticated, adminController.getRefreshpathList);
app.post('/admin/add-refreshpath', passportConfig.isAuthenticated, adminController.postAddRefreshpath);
//    Deliverypath Admin routes
app.get('/admin/add-deliverypath', passportConfig.isAuthenticated, adminController.getDeliverypathList);
app.post('/admin/add-deliverypath', passportConfig.isAuthenticated, adminController.postAddDeliverypath);
// Menu routes
app.get('/inventory', inventoryController.getDatabaseList);
app.get('/delivery', deliveryController.getDelivery);
app.get('/delivery/add-delivery', deliveryController.getAddDelivery);
app.get('/dbrefresh', dbrefreshController.getDbRefresh);
// Account routes
app.get('/account/verify', passportConfig.isAuthenticated, userController.getVerifyEmail);
app.get('/account/verify/:token', passportConfig.isAuthenticated, userController.getVerifyEmailToken);
app.get('/account', passportConfig.isAuthenticated, userController.getAccount);
app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);

/**
 * File Upload routes.
 */
app.get('/delivery/upload', lusca({ csrf: true }), deliveryController.getFileUpload);
app.post('/delivery/upload', upload.single('myFile'), lusca({ csrf: true }), deliveryController.postFileUpload);

/**
 * Error Handler.
 */
// 404 error handler
app.use((req, res, next) => {
  res.status(404).render('404');
});

// 500 error handler
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server Error');
  });
}

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
