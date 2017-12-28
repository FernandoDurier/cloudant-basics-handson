var request = require('request');
var Q = require('q');

/*
 * @params contains all the needed parameters to this function to work
 * @params.url - secure url from cloudant server
 * @params.db - docs collection to be modified
 * @params.doc - new doc that will be inserted
 */
exports.insertSingleDoc = function(params){
  var insertDefer = Q.defer();
  request(
    {
      "url": params.url + "/" + params.db,
      "method": "POST",
      "json": params.doc
    },
    function(error,response,body){
      if(error){
        console.log("Error: ", error);
        insertDefer.reject({"status":response.statusCode,"body":error});
      }
      else{
        console.log("Insert Success");
        insertDefer.resolve({"status":response.statusCode,"body":JSON.parse(body)});
      }
    }
  );
  return insertDefer.promise;
}

/*
 * @params contains all the needed parameters to this function to work
 * @params.url - secure url from cloudant server
 * @params.db - docs collection to be modified
 * @params.docs - array of docs that will be inserted at once
 */
exports.bulkInsert = function(params){
  var bulkDefer = Q.defer();
  var bulkJson =  {"docs":params.docs};
  request(
    {
      "url": params.url + "/" + params.db + "/_bulk_docs",
      "method": "POST",
      "json": bulkJson
    },
    function(error,response,body){
      if(error){
        console.log("Error: ", error);
        bulkDefer.reject({"status":response.statusCode,"body":error});
      }
      else{
        console.log("Insert Success");
        bulkDefer.resolve({"status":response.statusCode,"body":body});
      }
    }
  );
  return bulkDefer.promise;
}
