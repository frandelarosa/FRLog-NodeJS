/*-------------------------------------------------------------------------
*
*   FRLog v0.1
*   17-01-15
*   Francisco de la Rosa (c)
*
*   Server application to get log objects that are being sent by iOS client.
*
*   DEPENDENCIES
*    - node request-json module
*
*-------------------------------------------------------------------------*/

var request = require('request-json');

module.exports = {

	getDataFromURL:function(url, screen){
		
		var client = request.createClient(url);
		
		client.get('', function(err, res, body) {
		
			var formatted = screen.makeTextBasedJSON(body, 'Request');
			screen.appendLineToBoxJSON(formatted);
			
		});
		
			
	}
  
};