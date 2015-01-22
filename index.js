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
*    - node chalk module
*    - parser.js
*    - commandline.js
*
*-------------------------------------------------------------------------*/

var http    = require('http'); // http module
var parser  = require('./parser'); // parser module
var screen  = require('./screen');
var manager = require('./manager');

var servertPort = 3000;

// Create HTTP Server
http.createServer(function (req, res) {

  // Handle calls
  if (req.method == 'POST') {

	// Handle recieved data
	req.on('data', function(data) {
	
		var JSONObject = JSON.parse(data.toString());
		
		parser.parseObject(JSONObject);
		manager.addLogObject(JSONObject, screen);
		
		
	});

  }
  
}).listen(servertPort);

/*
console.log("\033[2J");
console.log(chalk.bgBlue('--- FRLOG LISTENING ON', chalk.bold(servertPort) + ' ---'));
console.log("\r");
*/

screen.drawScreens();