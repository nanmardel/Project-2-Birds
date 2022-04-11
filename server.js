require('dotenv').config();  // this allows our server to read from the env.
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
// session middleware
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');

console.log(process.env.GOOGLE_CLIENT_ID);
console.log(process.env.GOOGLE_SECRET);
console.log(process.env.GOOGLE_CALLBACK);

// connect to the MongoDB with mongoose
require('./config/database');   
require('./config/passport');  // configure Passport
const indexRouter = require('./routes/index');
const locationsRouter = require('./routes/locations');
const imagesRouter = require('./routes/locations');

// create the Express app
const app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// setting up our session cookie
// is going to be sent back and forth on every http request response
// inside it were going to end storing logged in users database id
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());   //set up passport after session
app.use(passport.session());   // gives us req.user
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());




// Add this middleware BELOW passport middleware and BEFORE your controller
app.use(function (req, res, next) {
  res.locals.user = req.user; // assinging a property to res.locals, makes that said property (user) availiable in every
  next();                     // single ejs view
});

// mount all routes with appropriate base paths
app.use('/', indexRouter); // Localhost:3000
app.use('/locations', locationsRouter); // every route in the locationsRoute is starting with /locations
app.use('/', imagesRouter);

// invalid request, send 404 page
app.use(function(req, res) {
  res.status(404).send('Cant find that!');
});

module.exports = app;
