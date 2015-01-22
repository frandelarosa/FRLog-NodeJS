/*-------------------------------------------------------------------------
*
*   FRLog v0.1
*   17-01-15
*   Francisco de la Rosa (c)
*
*   Server application to get log objects that are being sent by iOS client.
*
*   DEPENDENCIES
*    - none
*
*-------------------------------------------------------------------------*/

var commands = {
	help: "Show this screen",
	autoscroll: "Enable or disable console autoscroll",
	config: "Show current settings of FRLog",
	quit: "Shutdown FRLog"
}

module.exports = {

	getHelp:function(){
		return commands;	
	}
  
};