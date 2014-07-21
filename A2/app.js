var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var method_override = require('method-override');
var session = require('express-session');
var mysql_conn = require('./models/__mysql_connector__'); //Get the connection cached first
var routes = require('./routes/index');
var parties = require('./routes/parties');

//Authentication
var Users = require('./models/users');
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    Users.find_by('username', username, function(user) {
      if (!user) {
        done(null, false, { message: 'Incorrect username.' });
        console.log("Incorrect username");
      }
      if (user.password != password) {
       done(null, false, { message: 'Incorrect password.' });
       console.log("Incorrect password");
      }
      done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
    console.log('serializeUser: ' + user.id);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    console.log('deserializeUser: ', id);
    Users.find(id, function(user){
        console.log(user);
        done(null, user);
    });
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.disable('view cache'); //Development only: Disable caching of faulty pages

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'jba09wejralkuq92ijvjf209vjasd0fw2k',
    saveUninitialized: true,
    resave: true
}));
app.use(method_override('X-HTTP-Method-Override'));
app.use(passport.initialize());
app.use(passport.session());

//Helpers
app.use(function(req, res, next) {
    res.locals.current_user = req.user; //Current user
    res.locals.logged_in = req.isAuthenticated(); //Whether user is logged in
    next();
});

app.use('/', routes);
app.use('/parties', parties);

/* POST login */
app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/register_login',
        //failureFlash: true
    }),
    function(req, res) {
        res.redirect('/');
    }
);

/* POST logout */
app.post('/logout',
    function(req, res) {
        req.logout();
        res.redirect('/');
    }
);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
