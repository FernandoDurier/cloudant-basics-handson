var request = require('request');
var Q = require('q');
/*
 * @params contains all the needed parameters to this function to work
 * @params.url - secure url from cloudant server
 * @params.db - docs collection to be modified
 * @params.id - id from the to be deleted doc
 * @params.rev - revision number of the deletable doc
 */
exports.deleteDoc = function(params){
  var insertDefer = Q.defer();
  request(
    {
      "url": params.url + "/" + params.db + "/" + params.id +"?rev="+params.rev,
      "method": "DELETE"
    },
    function(error,response,body){
      if(error){
        console.log("Error: ", error);
        insertDefer.reject({"status":response.statusCode,"body":error});
      }
      else{
        console.log("Delete Success");
        insertDefer.resolve({"status":response.statusCode,"body":JSON.parse(body)});
      }
    }
  );
  return insertDefer.promise;
}
