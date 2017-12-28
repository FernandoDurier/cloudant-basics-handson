/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var conductor = require('./src/crud-cloudant/index.js');
var bodyParser = require('body-parser');
var cors = require('cors')
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.post('/insert/doc',conductor.insertPostDoc);
app.post('/bulk/insert',conductor.insertBulkDocs);
app.get('/get/doc/:id/from/:db',conductor.getDoc);
app.post('/select/doc',conductor.filterDoc);
app.post('/update/doc',conductor.postUpdateDoc);
app.delete('/delete/doc',conductor.deleteDoc);

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
