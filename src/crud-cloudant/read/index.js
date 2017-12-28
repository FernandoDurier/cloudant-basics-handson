var request = require('request');
var Q = require('q');

/*
 * @params contains all the needed parameters to this function to work
 * @params.url - secure url from cloudant server
 * @params.db - docs collection to be modified
 * @params.id - id from the to be deleted doc
 */
exports.selectGetSingleDoc = function(params){
  var selectDefer = Q.defer();
  request(
    {
        "url":params.url+"/"+params.db+"/"+params.id,
        "method":"GET",
    },
    function(error,response,body){
      if(error){
        console.log("Error: ", error);
        selectDefer.reject({"status":response.statusCode,"body":error});
      }
      else{
        console.log("select Success");
        selectDefer.resolve({"status":response.statusCode,"body":JSON.parse(body)});
      }
    }
  )
  return selectDefer.promise;
}

/*
 * @params contains all the needed parameters to this function to work
 * @params.url - secure url from cloudant server
 * @params.db - docs collection to be modified
 * @params.filter - filter json special to be used with cloudant _find endpoint
 */
exports.selectFilterDoc = function(params){
  var selectDefer = Q.defer();
  request(
    {
        "url":params.url+"/"+params.db+"/_find",
        "method":"POST",
        "json":params.filter
    },
    function(error,response,body){
      if(error){
        console.log("Error: ", error);
        selectDefer.reject({"status":response.statusCode,"body":error});
      }
      else{
        console.log("select Success");
        selectDefer.resolve({"status":response.statusCode,"body":JSON.parse(body)});
      }
    }
  )
  return selectDefer.promise;
}
