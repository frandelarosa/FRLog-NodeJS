/*-------------------------------------------------------------------------
*
*   FRLog v0.1
*   17-01-15
*   Francisco de la Rosa (c)
*
*   Server application to get log objects that are being sent by iOS client.
*
*   DEPENDENCIES
*    - colorizer.js
*    - dump.js
*
*-------------------------------------------------------------------------*/

var colorizer = require('./colorizer');

module.exports = {

  parseObject: function(data) {
  
  	// Dump log to file
  	
  	
  	// Print output
  	colorizer.colorize(data);
    
  },
};