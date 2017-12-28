/*
This is a conductor for the possible actions we can take in our cloudant database, this external shell is pemanent while the
functions that are called are mutable, easying the development
*/

var getCred = require('./../../config/credentials.js');
var credentials = getCred.getCredentials();
var insertDoc = require('./create/index.js').insertSingleDoc;
var insertBulk = require('./create/index.js').bulkInsert;
var deleteDoc = require('./delete/index.js').deleteDoc;
var selectGetDoc = require('./read/index.js').selectGetSingleDoc;
var selectFilterDoc = require('./read/index.js').selectFilterDoc;
var updateDoc = require('./update/index.js').updateDoc;
var putDoc = require('./update/index.js').putDoc;

exports.insertPostDoc = function(req,res){
  var params = {
    "db":req.body.db,
    "doc":req.body.doc,
    "url":credentials.url
  }
  insertDoc(params)
  .then((data)=>{
      console.log("response:",data);
      res.status(data.status);
      res.json(data);
  });
};

exports.insertBulkDocs = function(req,res){
  var params = {
    "db":req.body.db,
    "docs":req.body.docs,
    "url":credentials.url
  }
  insertBulk(params)
  .then((data)=>{
      console.log("response:",data);
      res.status(data.status);
      res.json(data);
  });
};

exports.deleteDoc = function(req,res){
  var params = {
    "db":req.body.db,
    "id":req.body.id,
    "rev":req.body.rev,
    "url":credentials.url
  }
  deleteDoc(params)
  .then((data)=>{
      console.log("response:",data);
      res.status(data.status);
      res.json(data);
  });
};

exports.getDoc = function(req,res){
  var params = {
    "db":req.params.db,
    "id":req.params.id,
    "url":credentials.url
  }
  selectGetDoc(params)
  .then((data)=>{
      console.log("response:",data);
      res.status(data.status);
      res.json(data);
  });
};

exports.filterDoc = function(req,res){
  var params = {
    "db":req.body.db,
    "filter":req.body.filter,
    "url":credentials.url
  }
  selectFilterDoc(params)
  .then((data)=>{
      console.log("response:",data);
      res.status(data.status);
      res.json(data);
  });
};

exports.postUpdateDoc = function(req,res){
  var params = {
    "db":req.body.db,
    "doc":req.body.doc,
    "url":credentials.url
  }
  updateDoc(params)
  .then((data)=>{
      console.log("response:",data);
      res.status(data.status);
      res.json(data);
  });
};
