var request = require('request');
var Q = require('q');

/*
 * @params contains all the needed parameters to this function to work
 * @params.url - secure url from cloudant server
 * @params.db - docs collection to be modified
 * @params.doc - it is a cloudant preexisting document containing id, rev and new attributes and values
 */
exports.updateDoc = function(params){
  var updateDefer = Q.defer();
  request(
    {
      "url": params.url + "/" + params.db,
      "method": "POST",
      "json": params.doc
    },
    function(error,response,body){
      if(error){
        console.log("Error: ", error);
        updateDefer.reject({"status":response.statusCode,"body":error});
      }
      else{
        console.log("Update Success");
        updateDefer.resolve({"status":response.statusCode,"body":JSON.parse(body)});
      }
    }
  );
  return updateDefer.promise;
}
