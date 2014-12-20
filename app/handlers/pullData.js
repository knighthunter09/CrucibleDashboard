/**
 * Created by VIJETA on 22/10/2014.
 */
var async = require("async"), fs = require("fs"),
    helper = require("./helpers.js"), underscore = require("underscore"),
    paths = require("./path.js");

var resultData = [];

exports.readDataFromFile = function (req, res, next) {
    resultData.length = 0;
    loadLocalData(function (err, data) {
        if (err) {
            console.log(err);
            helper.send_failure(res, 500, err);
        }
        var result = [];
        for (var x in data) {
            result = result.concat(JSON.parse(data[x])["reviewData"].slice(0));
        }
        //console.log(result);
        //helper.send_success(res, data);
        helper.send_success(res, result);
    });
};

function loadLocalData(cb) {
    fs.readdir(paths.pathConfigData, function (err, files) {
        if (err) {
            cb(helper.make_error("file_error", JSON.stringify(err)));
            return;
        } else {
            console.log(files);
            for (var x in files) {
                readFile(paths.pathConfigData + "/" + files[x] + "", callbackFunc);
            }
            cb(null, resultData);
        }

    });
}

var callbackFunc = function (result) {
    resultData.push(JSON.parse(result));
    console.log("PUSHING .... " + resultData.length );
};
var readFile = function (filePath, cb) {
    cb(JSON.stringify(fs.readFileSync(filePath).toString()));
};


/*
 var readFile = function(file) {
 var fileDesc;
 var result;
 console.log("READ " + file);
 fs.open(file,'r',function(err, fd){
 fileDesc = fd;
 console.log("FILE1 : " + file + " - FD " + fd );
 fs.stat(file,function(err, stats){
 var buffer = new Buffer(100000000);
 if (stats.isFile()) {
 console.log("FILE2 : ");
 fs.read(fileDesc, buffer, 0,100000000,function(err, bytesRead,buffer){
 console.log("FILE2.5 : " + result);
 result = buffer.toString('utf8', 0, bytesRead);
 console.log("FILE3 : " + result);
 fs.close(fileDesc,function(err) {
 if (err) {
 console.log(err);
 } else {
 console.log("RESULT: " + result);
 //return result;
 }
 });
 });
 }
 });
 });
 };*/


/*    fs.readFile(filePath,function(err, data){
 if(err) {
 console.log(">>>" + err);
 } else {
 //console.log(JSON.stringify(data.toString()));
 console.log("sending" + filePath + resultData);
 try {
 cb(JSON.stringify(data.toString()));
 } catch(err) {
 console.log("Exception " + err);
 }
 }*/