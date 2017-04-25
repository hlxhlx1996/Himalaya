var path = require('path');
var express = require('express')
, passport = require('passport')
, LocalStrategy = require('passport-local').Strategy
, FacebookStrategy = require('passport-facebook').Strategy
, session = require('express-session')
, bodyParser = require('body-parser')
, cookieParser = require('cookie-parser');
var app = express();

//open folder public for front-end 
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//starts session all
app.use(cookieParser());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
//ends session all
// require path so that we can use path stuff like path.join

app.use('/node_modules',express.static(__dirname + '/node_modules'));
// app.use('/bower_compoenents',express.static(__dirname + '/bower_compoenents'));
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// This goes in our server.js file so that we actually use the mongoose config file!
require('./config/mongoose.js');
// this line requires and runs the code from our routes.js file and passes it app so that we can attach our routing rules to our express application!
require('./config/routes.js')(app);



//var appointments = angular.module('appointments',['angularPayments','ngRoute']);

var mongoose = require('mongoose');
// set up a static file server that points to the "client" directory
app.use(express.static(path.join(__dirname, './client')));

var server=app.listen(8000, function() {
  console.log('cool stuff on: 8000');
});