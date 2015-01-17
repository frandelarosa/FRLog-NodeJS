/*-------------------------------------------------------------------------
*
*   FRLog v0.1
*   17-01-15
*   Francisco de la Rosa (c)
*
*   Server application to get log objects that are being sent by iOS client.
*
*   DEPENDENCIES
*    - node http module
*    - parser.js
*    - commandline.js
*    - node chalk module
*
*-------------------------------------------------------------------------*/

var http    = require('http'); // http module
var parser  = require('./parser'); // parser module
var cmdline = require('./commandline'); // commandline module
var chalk   = require('chalk');

var servertPort = 3000;

// Create HTTP Server
http.createServer(function (req, res) {

  // Handle calls
  if (req.method == 'POST') {

	// Handle recieved data
	req.on('data', function(data) {
		var JSONObject = JSON.parse(data.toString());
		parser.parseObject(JSONObject);
		
	});

  }
  
}).listen(servertPort);

console.log("\033[2J");
console.log(chalk.bgBlue('--- FRLOG LISTENING ON', chalk.bold(servertPort) + ' ---'));
console.log("\r");