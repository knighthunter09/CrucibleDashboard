var helper = require("./helpers.js"),
    underscore = require("underscore"),
    paths = require("./path.js"),
    http = require("http"),
    querystring = require('querystring'),
    globalVar = require("./global"),
    requestMod = require("request");

exports.getDraftReviews = function (req, res, next, apiKey,host,port) {

    var request = http.request({
        'host': host,
        'port': port,
        'path': paths.filterDraft + apiKey,
        'headers': {'accept': "application/json"},
        'method': 'GET'
    }, function (resp) {
        //console.log('STATUS: ' + resp.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(resp.headers));
        resp.setEncoding('utf8');
        resp.on('data', function (chunk) {
            //console.log('BODY: ' + chunk);
            helper.send_success(res, chunk);
        });
    });
    request.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

// write data to request body
    request.write('data\n');
    request.write('data\n');
    request.end();
};


exports.getAllReviews = function (req, res, next, apiKey, host, port) {

    var request = http.request({
        'host': host,
        'port': port,
        'path': paths.filterAllReviews + apiKey,
        'headers': {'accept': "application/json"},
        'method': 'GET'
    }, function (resp) {
        //console.log('STATUS: ' + resp.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(resp.headers));
        resp.setEncoding('utf8');
        resp.on('data', function (chunk) {
            //console.log('BODY: ' + chunk);
            helper.send_success(res, chunk);
        });
    });
    request.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

// write data to request body
    request.write('data\n');
    request.write('data\n');
    request.end();
};

exports.getAllClosedReviews = function (req, res, next, apiKey, host, port) {

    var request = http.request({
        'host': host,
        'port': port,
        'path': paths.filterClosed + apiKey,
        'headers': {'accept': "application/json"},
        'method': 'GET'
    }, function (resp) {
        //console.log('STATUS: ' + resp.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(resp.headers));
        resp.setEncoding('utf8');
        resp.on('data', function (chunk) {
            //console.log('BODY: ' + chunk);
            helper.send_success(res, chunk);
        });
    });
    request.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

// write data to request body
    request.write('data\n');
    request.write('data\n');
    request.end();
};

exports.getTrashReviews = function (req, res, next, apiKey, host, port) {

    var request = http.request({
        'host': host,
        'port': port,
        'path': paths.filterTrash + apiKey,
        'headers': {'accept': "application/json"},
        'method': 'GET'
    }, function (resp) {
        //console.log('STATUS: ' + resp.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(resp.headers));
        resp.setEncoding('utf8');
        resp.on('data', function (chunk) {
            //console.log('BODY: ' + chunk);
            helper.send_success(res, chunk);
        });
    });
    request.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

// write data to request body
    request.write('data\n');
    request.write('data\n');
    request.end();
};

exports.transitionReview = function (req, res, next, reqCR, action, apiKey, host, port) {
    if (!reqCR) {
        next();
    }
    var actionParam = 'action:' + action;
    var queryParam = querystring.stringify({FEAUTH: apiKey, action: actionParam});

    var pathVar = paths.transitionPath + reqCR + paths.transitionAction + queryParam;

    var request = http.request({
        'host': host,
        'port': port,
        'path': pathVar,
        'headers': {'accept': "application/json"},
        'method': 'POST'
    }, function (resp) {
        resp.setEncoding('utf8');
        resp.on('data', function (chunk) {
            helper.send_success(res, chunk);
        });
    });
    request.on('error', function (e) {
        helper.send_failure(resp, null, e.message);
    });

// write data to request body
    request.write('data\n');
    request.write('data\n');
    request.end();
};

//login
exports.authenticate = function (req, res, next,app) {
    var url = "http://" + req.body.host + ":" + req.body.port + paths.authenticateUser;
    app.set("host",req.body.host);
    app.set("port",req.body.port);
    requestMod.post({
            url: url,
            form: {'userName': req.body.username, 'password': req.body.password},
            headers: {'accept': "application/json"}
        },
        function (err, httpResponse, body) {
            console.log(err + httpResponse + body);
            app.set("token",JSON.parse(body)["token"]);
            console.log("Set api key to " + JSON.parse(body)["token"]);
            res.redirect("index.html");
        });
};
