/*-------------------------------------------------------------------------
*
*   FRLog v0.1
*   17-01-15
*   Francisco de la Rosa (c)
*
*   Server application to get log objects that are being sent by iOS client.
*
*   DEPENDENCIES
*    - node readline module
*
*-------------------------------------------------------------------------*/

var arrObjects = [];

module.exports = {

	addLogObject:function(log_obj, screen) {
		arrObjects.push(log_obj);		
	},
	
	getLogObjects:function(){
		return arrObjects;
	}
  
};