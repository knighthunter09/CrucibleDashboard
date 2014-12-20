// server.js

// set up ========================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var morgan = require('morgan'); 			// log requests to the console (express4)
var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

var router = express.Router();
//Application related
var pullData = require("./app/handlers/pullData");
var altassian = require("./app/handlers/altassianConnect");
var helper = require("./app/handlers/helpers");

app.use(morgan('dev')); 										// log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.set('views', __dirname + '\\app\\templates');
app.set('view engine', 'hjs');

app.get('*', function (req, res, next) {
    console.log('Time: %d', Date.now());
    next();
});

app.get('/admin', function (req, res, next) {
    res.render("admin-login",{"title":"Crucible Dashboard"});
});

app.post('/adminValidation', function (req, res, next) {
    if (!req.body.userName && !req.body.password && !req.body.host && !req.body.port) {
        res.render("admin-login",{"title":"Crucible Dashboard"});
    } else {
        altassian.authenticate(req,res,next,app);
    }
});

app.all("*",function(req,res,next) {
    if (!app.get("token") && !req.path.match(/bower_components/g)
            && !req.path.match(/stylesheets/g)) {
        console.log("User needs to be authenticated : " + req.path);
        //res.render("admin-login",{"title":"Crucible Dashboard"});
        res.redirect("/admin");
    } else {
        console.log("User is authenticated : " + req.path);
        next();
    }
});

app.get('/config/:config_name', function(req,res,next){
    console.log(req.url + " " +req.path + "logging..." + req.params.config_name);
    next();
});

app.get('/config/rest/all', function(req,res,next){
    console.log("Retrieving all data: " + req.url + " " + req.path);
    altassian.getAllReviews(req,res,next,app.get("token"), app.get("host"), app.get("port"));
    //pullData.readDataFromFile(req,res,next);
});

app.get('/config/rest/drafts',function(req,res,next){
    console.log("Pull all drafts review: " + req.url + " " + req.path);
    altassian.getDraftReviews(req,res,next,app.get("token"), app.get("host"), app.get("port"));
});

app.get('/config/rest/closed',function(req,res,next){
    console.log("Pull all closed review: " + req.url + " " + req.path);
    altassian.getAllClosedReviews(req,res,next,app.get("token"),app.get("host"),app.get("port"));
});

app.get('/config/rest/trash',function(req,res,next){
    console.log("Pull all abandoned review: " + req.url + " " + req.path);
    altassian.getTrashReviews(req,res,next,app.get("token"),app.get("host"),app.get("port"));
});

app.post('/config/rest/closeReview', function(req,res,next){
    altassian.transitionReview(req, res, next, req.body.data,'closeReview',app.get("token"),app.get("host"),app.get("port"));
});

app.post('/config/rest/reopenReview', function(req,res,next){
    altassian.transitionReview(req, res, next, req.body.data,'reopenReview',app.get("token"),app.get("host"),app.get("port"));
});

app.post('/config/rest/abandonReview', function(req,res,next){
    altassian.transitionReview(req, res, next, req.body.data,'abandonReview',app.get("token"),app.get("host"),app.get("port"));
});

app.post('/config/rest/recoverReview', function(req,res,next){
    altassian.transitionReview(req, res, next, req.body.data,'recoverReview',app.get("token"),app.get("host"),app.get("port"));
});

app.post('/config/rest/deleteReview', function(req,res,next){
    altassian.transitionReview(req, res, next, req.body.data,'deleteReview',app.get("token"),app.get("host"),app.get("port"));
});

app.use(express.static(__dirname + '/app')); 				// set the static files location /public/img will be /img for users

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");